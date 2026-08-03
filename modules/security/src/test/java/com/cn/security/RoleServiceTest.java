package com.cn.security;

import com.cn.dao.PermissionRepository;
import com.cn.dao.RoleRepository;
import com.cn.entity.Permission;
import com.cn.entity.Role;
import com.cn.enums.UserTypeEnum;
import com.cn.exception.GlobalException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class RoleServiceTest {
    private RoleRepository roleRepository;
    private PermissionRepository permissionRepository;
    private RoleService roleService;
    private Role superAdministratorRole;

    @BeforeEach
    void setUp() {
        roleRepository = mock(RoleRepository.class);
        permissionRepository = mock(PermissionRepository.class);
        roleService = new RoleService(roleRepository, permissionRepository);

        Permission existingPermission = new Permission();
        existingPermission.setId(10L);
        superAdministratorRole = new Role();
        superAdministratorRole.setId(1L);
        superAdministratorRole.setRoleCode("admin");
        superAdministratorRole.setRoleType(UserTypeEnum.ADMIN);
        superAdministratorRole.setAvailable(true);
        superAdministratorRole.setPermissions(Set.of(existingPermission));
        when(roleRepository.getReferenceById(1L)).thenReturn(superAdministratorRole);
    }

    @Test
    void refusesToDisableTheSuperAdministratorRole() {
        assertThatThrownBy(() -> roleService.altAvailable(1L))
                .isInstanceOf(GlobalException.class)
                .hasMessageContaining("系统授权根");
    }

    @Test
    void refusesToDeleteTheSuperAdministratorRole() {
        assertThatThrownBy(() -> roleService.delRole(1L))
                .isInstanceOf(GlobalException.class)
                .hasMessageContaining("系统授权根");

        verify(roleRepository, never()).deleteById(1L);
    }

    @Test
    void refusesToRemoveExistingPermissionsFromTheSuperAdministratorRole() {
        when(permissionRepository.findAllById(List.of(20L))).thenReturn(List.of());

        assertThatThrownBy(() -> roleService.saveGrant(1L, "20"))
                .isInstanceOf(GlobalException.class)
                .hasMessageContaining("系统授权根");
    }
}
