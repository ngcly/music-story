package com.cn.dao;

import com.cn.entity.Manager;
import com.cn.enums.GenderEnum;
import com.cn.enums.UserStatusEnum;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.LockModeType;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * @author ngcly
 * @since 2018-01-02 17:11
 */
@Repository
public interface ManagerRepository extends JpaRepository<Manager,Long>,JpaSpecificationExecutor<Manager> {
    @EntityGraph(value = "Role.Graph", type = EntityGraph.EntityGraphType.FETCH)
    Optional<Manager> findManagerById(Long id);

    /**
     * 根据用户名查询
     * @param username 用户名
     * @return Manager
     */
    @EntityGraph(value = "Role.Graph", type = EntityGraph.EntityGraphType.FETCH)
    Optional<Manager> findManagerByUsername(String username);

    /**
     * 锁定并返回所有仍可登录的超级管理员，防止并发操作同时移除最后的授权根。
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
            select distinct manager
            from Manager manager
            join manager.roleList role
            where role.roleCode = :roleCode
              and role.roleType = :roleType
              and role.available = true
              and manager.state <> :lockedState
            """)
    List<Manager> findActiveSuperAdministratorsForUpdate(
            @Param("roleCode") String roleCode,
            @Param("roleType") com.cn.enums.UserTypeEnum roleType,
            @Param("lockedState") UserStatusEnum lockedState);

    /**
     * 判断用户名是否存在
     * @param username 用户名
     * @param userId 用户id
     * @return boolean
     */
    boolean existsByUsernameAndIdIsNot(String username,Long userId);

    /**
     * 动态查询管理员数据
     * @param username 用户名
     * @param state 状态
     * @param gender 性别
     * @param beginTime 开始时间
     * @param endTime 结束时间
     * @return Specification<Manager>
     */
    static Specification<Manager> getManagerList(String username, UserStatusEnum state, GenderEnum gender, LocalDateTime beginTime, LocalDateTime endTime){
        return (Root<Manager> root, CriteriaQuery<?> query, CriteriaBuilder cb)->{
                List<Predicate> predicates = new ArrayList<>();
                if(StringUtils.hasLength(username)) {
                    predicates.add(cb.like(root.get("username"),"%"+username+"%"));
                }

                if(Objects.nonNull(state)) {
                    predicates.add(cb.equal(root.get("state"), state));
                }

                if(Objects.nonNull(gender)) {
                    predicates.add(cb.equal(root.get("gender"), gender));
                }

                if(Objects.nonNull(beginTime)){
                    predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), beginTime));
                }

                if(Objects.nonNull(endTime)){
                    predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"), endTime));
                }
                return query.where(cb.and(predicates.toArray(new Predicate[0]))).getRestriction();
        };
    }
}
