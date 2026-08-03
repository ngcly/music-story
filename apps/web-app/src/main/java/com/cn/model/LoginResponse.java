package com.cn.model;

import com.cn.user.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 登录成功后的统一响应。
 */
public record LoginResponse(
        @JsonProperty("access_token") String accessToken,
        @JsonProperty("token_type") String tokenType,
        User user
) {
    public static LoginResponse bearer(String accessToken, User user) {
        return new LoginResponse(accessToken, "Bearer", user);
    }
}
