package com.cn.user;

import com.cn.enums.SocialEnum;
import com.cn.user.domain.SocialInfo;
import com.cn.user.domain.User;
import com.cn.user.domain.repository.RoleRepositoryPort;
import com.cn.user.domain.repository.SocialInfoRepositoryPort;
import com.cn.user.domain.repository.UserRepositoryPort;
import com.cn.util.MailUtil;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.client.RestClient;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;

class UserServiceTest {

    @Test
    void socialLoginReturnsThePreviouslyBoundUser() {
        UserRepositoryPort userRepository = mock(UserRepositoryPort.class);
        SocialInfoRepositoryPort socialInfoRepository = mock(SocialInfoRepositoryPort.class);
        UserService userService = spy(new UserService(
                userRepository,
                socialInfoRepository,
                mock(RoleRepositoryPort.class),
                mock(RabbitTemplate.class),
                mock(RestClient.class),
                mock(MailUtil.class)));

        SocialInfo loginInfo = new SocialInfo();
        loginInfo.setOpenId("third-party-open-id");
        SocialInfo persistedInfo = new SocialInfo();
        User boundUser = new User();
        boundUser.setUsername("bound-user");
        persistedInfo.setUser(boundUser);

        doReturn(loginInfo).when(userService).getSocialInfo(SocialEnum.QQ, "authorization-code");
        when(socialInfoRepository.findBySourceAndOpenId("qq", "third-party-open-id"))
                .thenReturn(Optional.of(persistedInfo));

        User result = userService.socialLogin(
                SocialEnum.QQ.getSource(), "authorization-code", SocialEnum.STATE);

        assertThat(result).isSameAs(boundUser);
    }
}
