package com.cn.config;

import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTUtil;
import com.cn.user.domain.Role;
import com.cn.user.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class JwtTokenUtilTest {

    @Test
    void tokenContainsIdentityButNotMutableUserOrRoleSnapshots() {
        JwtTokenUtil tokenUtil = new JwtTokenUtil();
        ReflectionTestUtils.setField(tokenUtil, "secret", "test-secret-with-sufficient-entropy");
        ReflectionTestUtils.setField(tokenUtil, "expiration", 3600);
        User user = new User();
        user.setId(1L);
        user.setUsername("listener");
        user.setPassword("must-not-leak");
        Role role = new Role();
        role.setRoleCode("vip");
        user.setRoleList(Set.of(role));

        JWT jwt = JWTUtil.parseToken(tokenUtil.generateToken(user));

        assertThat(jwt.getPayloads().getStr(JWT.SUBJECT)).isEqualTo("listener");
        assertThat(jwt.getPayloads().containsKey("password")).isFalse();
        assertThat(jwt.getPayloads().containsKey("roleList")).isFalse();
        assertThat(jwt.getPayloads().containsKey("state")).isFalse();
        assertThat(jwt.getPayloads().containsKey("pwdAlt")).isFalse();
    }
}
