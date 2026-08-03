package com.cn.config;

import cn.hutool.core.date.DateUtil;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTUtil;
import cn.hutool.jwt.RegisteredPayload;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.time.Instant;

@Configuration
@RequiredArgsConstructor
public class WebSocketAuthenticationConfig implements WebSocketMessageBrokerConfigurer {
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
                if (StompCommand.CONNECT == accessor.getCommand()) {
                    accessor.setUser(authenticate(accessor.getFirstNativeHeader("Authorization")));
                }
                return message;
            }
        });
    }

    private UsernamePasswordAuthenticationToken authenticate(String authorization) {
        if (authorization == null || !authorization.startsWith(BEARER_PREFIX)) {
            throw new AuthenticationCredentialsNotFoundException("WebSocket 缺少 Bearer token");
        }

        try {
            JWT jwt = JWTUtil.parseToken(authorization.substring(BEARER_PREFIX.length()));
            if (!jwtTokenUtil.verify(jwt)) {
                throw new AuthenticationCredentialsNotFoundException("WebSocket token 无效");
            }

            SecurityUser securityUser = (SecurityUser) userDetailsService.loadUserByUsername(
                    jwt.getPayloads().getStr(JWT.SUBJECT));
            Instant issuedAt = DateUtil.toInstant(jwt.getPayloads().getDate(RegisteredPayload.ISSUED_AT));
            Instant passwordChangedAt = securityUser.getUser().getPwdAlt();
            if (!securityUser.isEnabled()
                    || !securityUser.isAccountNonLocked()
                    || issuedAt == null
                    || (passwordChangedAt != null && !issuedAt.isAfter(passwordChangedAt))) {
                throw new AuthenticationCredentialsNotFoundException("WebSocket 用户状态无效");
            }

            return UsernamePasswordAuthenticationToken.authenticated(
                    securityUser.getUser().getId().toString(),
                    null,
                    securityUser.getAuthorities());
        } catch (AuthenticationCredentialsNotFoundException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new AuthenticationCredentialsNotFoundException("WebSocket token 无效", exception);
        }
    }
}
