package com.cn.config;

import com.cn.security.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;

import java.util.Collection;
import java.util.List;
import java.util.function.Supplier;

/**
 * @author ngcly
 */
@RequiredArgsConstructor
public class MyAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {
    private final ManagerService managerService;

    @Override
    public AuthorizationResult authorize(Supplier<? extends Authentication> authentication, RequestAuthorizationContext context) {
        Authentication currentAuthentication = authentication.get();
        if (currentAuthentication == null
                || !currentAuthentication.isAuthenticated()
                || currentAuthentication instanceof AnonymousAuthenticationToken) {
            return new AuthorizationDecision(false);
        }

        //当前用户权限信息
        Collection<? extends GrantedAuthority> authorities = currentAuthentication.getAuthorities();

        //获取当前url
        String currentUrl = context.getRequest().getServletPath();
        String requestMethod = context.getRequest().getMethod();

        String currentUrlKey = String.join("_", requestMethod, currentUrl);

        //url权限 元数据
        List<String> permissionMetadata = managerService.getUrlPermissionMetadata();

        // 未登记的 URL 默认拒绝，避免新增后台接口绕过权限控制
        if (!permissionMetadata.contains(currentUrlKey)) {
            return new AuthorizationDecision(false);
        }

        boolean isGranted = authorities.stream().anyMatch(grantedAuthority ->
        currentUrlKey.equals(grantedAuthority.getAuthority()));

        return new AuthorizationDecision(isGranted);
    }

}
