package com.cn.config;

import cn.hutool.core.date.DateUtil;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTUtil;
import cn.hutool.jwt.RegisteredPayload;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;

/**
 * 请求校验
 *
 * @author chenning
 */
@Slf4j
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil,
                                   UserDetailsServiceImpl userDetailsService) {
        super(authenticationManager);
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = JwtTokenUtil.getToken(request);
        if (StringUtils.hasLength(token)) {
            SecurityUser securityUser = null;
            Instant issuedAt = null;
            try {
                JWT jwt = JWTUtil.parseToken(token);
                if (jwtTokenUtil.verify(jwt)) {
                    String username = jwt.getPayloads().getStr(JWT.SUBJECT);
                    securityUser = (SecurityUser) userDetailsService.loadUserByUsername(username);
                    issuedAt = DateUtil.toInstant(jwt.getPayloads().getDate(RegisteredPayload.ISSUED_AT));
                }
            } catch (Exception e) {
                log.info("token 无效:{}", e.getMessage());
            }

            if (validUserAuthenticated(securityUser, issuedAt)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        UsernamePasswordAuthenticationToken.authenticated(securityUser, null, securityUser.getAuthorities());
                log.info("authenticated user:{}", authenticationToken);
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        chain.doFilter(request, response);
    }

    /**
     * 判断是否已授权
     *
     * @param userDetail 用户信息
     * @param issuedAt   jwt有效期
     * @return boolean
     */
    public boolean validUserAuthenticated(SecurityUser userDetail, Instant issuedAt) {
        if (userDetail == null
                || SecurityContextHolder.getContext().getAuthentication() != null
                || issuedAt == null
                || !userDetail.isEnabled()
                || !userDetail.isAccountNonLocked()) {
            return false;
        }
        Instant passwordChangedAt = userDetail.getUser().getPwdAlt();
        return passwordChangedAt == null || issuedAt.isAfter(passwordChangedAt);
    }
}
