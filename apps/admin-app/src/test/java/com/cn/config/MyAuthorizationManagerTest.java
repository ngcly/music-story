package com.cn.config;

import com.cn.security.ManagerService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MyAuthorizationManagerTest {
    private ManagerService managerService;
    private MyAuthorizationManager authorizationManager;
    private HttpServletRequest request;

    @BeforeEach
    void setUp() {
        managerService = mock(ManagerService.class);
        authorizationManager = new MyAuthorizationManager(managerService);
        request = mock(HttpServletRequest.class);
        when(request.getMethod()).thenReturn("GET");
        when(request.getServletPath()).thenReturn("/sys/manager");
    }

    @Test
    void deniesAnonymousRequests() {
        AnonymousAuthenticationToken anonymous = new AnonymousAuthenticationToken(
                "key", "anonymousUser", List.of(new SimpleGrantedAuthority("ROLE_ANONYMOUS")));

        AuthorizationResult result = authorizationManager.authorize(
                () -> anonymous, new RequestAuthorizationContext(request));

        assertThat(result.isGranted()).isFalse();
    }

    @Test
    void deniesAuthenticatedRequestsToUnregisteredUrls() {
        var authentication = UsernamePasswordAuthenticationToken.authenticated(
                "manager", "password", List.of(new SimpleGrantedAuthority("GET_/sys/manager")));
        when(managerService.getUrlPermissionMetadata()).thenReturn(List.of());

        AuthorizationResult result = authorizationManager.authorize(
                () -> authentication, new RequestAuthorizationContext(request));

        assertThat(result.isGranted()).isFalse();
    }

    @Test
    void grantsOnlyRegisteredUrlsWithMatchingAuthority() {
        var authentication = UsernamePasswordAuthenticationToken.authenticated(
                "manager", "password", List.of(new SimpleGrantedAuthority("GET_/sys/manager")));
        when(managerService.getUrlPermissionMetadata()).thenReturn(List.of("GET_/sys/manager"));

        AuthorizationResult result = authorizationManager.authorize(
                () -> authentication, new RequestAuthorizationContext(request));

        assertThat(result.isGranted()).isTrue();
    }
}
