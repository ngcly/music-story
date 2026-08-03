package com.cn.model;

import com.cn.user.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class LoginResponseTest {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void serializesTheFrontendTokenContract() throws Exception {
        User user = new User();
        user.setUsername("listener");

        String json = objectMapper.writeValueAsString(LoginResponse.bearer("signed-token", user));

        assertThat(json)
                .contains("\"access_token\":\"signed-token\"")
                .contains("\"token_type\":\"Bearer\"")
                .contains("\"user\"");
    }
}
