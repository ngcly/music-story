package com.cn.security;

import com.cn.dao.ManagerRepository;
import com.cn.entity.Manager;
import com.cn.entity.Role;
import com.cn.enums.UserStatusEnum;
import com.cn.enums.UserTypeEnum;
import com.cn.exception.GlobalException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ManagerServiceTest {
    private ManagerRepository managerRepository;
    private ManagerService managerService;
    private Role superAdministratorRole;
    private Manager lastSuperAdministrator;

    @BeforeEach
    void setUp() {
        managerRepository = mock(ManagerRepository.class);
        managerService = new ManagerService(
                managerRepository,
                mock(RoleService.class),
                mock(RequestMappingHandlerMapping.class));

        superAdministratorRole = new Role();
        superAdministratorRole.setId(1L);
        superAdministratorRole.setRoleCode("admin");
        superAdministratorRole.setRoleType(UserTypeEnum.ADMIN);
        superAdministratorRole.setAvailable(true);

        lastSuperAdministrator = manager(1L, UserStatusEnum.NORMAL, Set.of(superAdministratorRole));
        when(managerRepository.findActiveSuperAdministratorsForUpdate(
                "admin", UserTypeEnum.ADMIN, UserStatusEnum.LOCKED))
                .thenReturn(List.of(lastSuperAdministrator));
    }

    @Test
    void refusesToDeleteTheLastActiveSuperAdministrator() {
        assertThatThrownBy(() -> managerService.delManager(1L))
                .isInstanceOf(GlobalException.class)
                .hasMessageContaining("至少一个有效的超级管理员");

        verify(managerRepository, never()).deleteById(1L);
    }

    @Test
    void allowsDeletingOneSuperAdministratorWhenAnotherRemains() {
        Manager another = manager(2L, UserStatusEnum.NORMAL, Set.of(superAdministratorRole));
        when(managerRepository.findActiveSuperAdministratorsForUpdate(
                "admin", UserTypeEnum.ADMIN, UserStatusEnum.LOCKED))
                .thenReturn(List.of(lastSuperAdministrator, another));

        assertThatCode(() -> managerService.delManager(1L)).doesNotThrowAnyException();

        verify(managerRepository).deleteById(1L);
    }

    @Test
    void refusesToLockTheLastActiveSuperAdministrator() {
        Manager currentManager = manager(99L, UserStatusEnum.NORMAL, Set.of(superAdministratorRole));
        Manager persistedManager = manager(1L, UserStatusEnum.NORMAL, Set.of(superAdministratorRole));
        persistedManager.setUsername("admin");
        Manager update = manager(1L, UserStatusEnum.LOCKED, Set.of());
        update.setRoleIds(new Long[]{1L});
        update.setUsername("admin");
        when(managerRepository.getReferenceById(1L)).thenReturn(persistedManager);
        when(managerRepository.existsByUsernameAndIdIsNot("admin", 1L)).thenReturn(false);

        assertThatThrownBy(() -> managerService.saveManager(currentManager, update))
                .isInstanceOf(GlobalException.class)
                .hasMessageContaining("至少一个有效的超级管理员");

        verify(managerRepository, never()).save(update);
    }

    @Test
    void refusesToRemoveTheLastSuperAdministratorRole() {
        Manager currentManager = manager(99L, UserStatusEnum.NORMAL, Set.of(superAdministratorRole));
        Manager persistedManager = manager(1L, UserStatusEnum.NORMAL, Set.of(superAdministratorRole));
        persistedManager.setUsername("admin");
        Manager update = manager(1L, UserStatusEnum.NORMAL, Set.of());
        update.setRoleIds(new Long[0]);
        update.setUsername("admin");
        when(managerRepository.getReferenceById(1L)).thenReturn(persistedManager);
        when(managerRepository.existsByUsernameAndIdIsNot("admin", 1L)).thenReturn(false);

        assertThatThrownBy(() -> managerService.saveManager(currentManager, update))
                .isInstanceOf(GlobalException.class)
                .hasMessageContaining("至少一个有效的超级管理员");

        verify(managerRepository, never()).save(update);
    }

    private Manager manager(Long id, UserStatusEnum state, Set<Role> roles) {
        Manager manager = new Manager();
        manager.setId(id);
        manager.setState(state);
        manager.setRoleList(new java.util.HashSet<>(roles));
        return manager;
    }
}
