/**
 * Copyright (c) 2017-2018 Tianxin.  All rights reserved. 广州天新网络科技有限公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */
package com.wteam.superboot.demo.repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.QueryHint;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;

import com.wteam.superboot.core.repository.SuperRepository;
import com.wteam.superboot.security.entity.po.UserkeyPo;

/**
 * 用户登录凭证Repository.
 * 
 * @author 罗佳欣
 */
public interface UserkeyRepository2 extends SuperRepository<UserkeyPo, Long>  {

	/**
	 * 优先使用: 不需声明, 默认开启二级缓存.
	 * 
	 * 添加实体: 					void addEntity(T, UserPo) 
	 * 删除实体: 					void deleteEntity(T) 
	 * 逻辑删除实体: 				void logicDeleteEntity(T, UserPo) 
	 * 冻结实体: 					void lockUpEntity(T, UserPo) 
	 * 解冻实体: 					void unLockUpEntity(T, UserPo) 
	 * 修改实体: 					void editEntity(T, UserPo) 
	 * ID请求实体: 				T getEntityById(Class<T>, Long) 
	 * 查询实体列表: 				List<T> queryList(T, T) 
	 * 查询实体列表: 				List<T> queryList(T) 
	 * 查询非删除实体列表: 			List<T> queryNonDeleteList(T, T)
	 * 查询非删除实体列表: 			List<T> queryNonDeleteList(T) 
	 * 查询非删除非冻结实体列表: 	List <T> queryNonDeleteNonLockupList(T, T) 
	 * 查询非删除非冻结实体列表: 	List <T> queryNonDeleteNonLockupList(T) 
	 * 查询单一实体: 				T queryEntity(T) 
	 * 查询条目数: 				Long queryCount(T, T) 
	 * 查询条目数: 				Long queryCount(T) 
	 * 查询非删除条目数: 			Long queryNonDeleteCount(T, T) 
	 * 查询非删除条目数: 			Long queryNonDeleteCount(T)
	 * 查询非删除非冻结条目数: 		Long queryNonDeleteNonLockupCount(T, T) 
	 * 查询非删除非冻结条目数: 		Long queryNonDeleteNonLockupCount(T) 
	 * 查询是否有结果: 			Boolean hasEntity(T, T) 
	 * 查询是否有结果: 			Boolean hasEntity(T) 
	 * 查询是否有非删除结果: 		Boolean hasNonDeleteEntity(T, T)
	 * 查询是否有非删除结果: 		Boolean hasNonDeleteEntity(T) 
	 * 查询是否有非删除非冻结结果: 	Boolean hasNonDeleteNonLockupEntity(T, T) 
	 * 查询是否有非删除非冻结结果: 	Boolean hasNonDeleteNonLockupEntity(T) 
	 * 查询分页列表: 				Page<T> pageEntity(Date, Integer, Integer, T, T, String, Boolean) 
	 * 查询分页列表: 				Page<T> pageEntity(Date, Integer, Integer, T, String, Boolean) 
	 * 查询非删除分页列表: 			Page<T> pageNonDeleteEntity(Date, Integer, Integer, T, T, String, Boolean) 
	 * 查询非删除分页列表: 			Page<T> pageNonDeleteEntity(Date, Integer, Integer, T, String, Boolean)
	 * 查询非删除非冻结分页列表: 	Page<T> pageNonDeleteNonLockupEntity(Date, Integer, Integer, T, T, String, Boolean) 
	 * 查询非删除非冻结分页列表: 	Page<T> pageNonDeleteNonLockupEntity(Date, Integer, Integer, T, String, Boolean)
	 */

	/**
	 * 接口方法定义示例: 更多查看官方文档
	 * {@link https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods}
	 * 
	 * 根据loginmsg获取UserkeyPo. 也可以直接使用上面的: T queryEntity(T).
	 * 
	 * 开启二级
	 */
	@QueryHints({ @QueryHint(name = "org.hibernate.cacheable", value = "true") })
	UserkeyPo getByLoginmsg(String loginmsg);

	/**
	 * 查询方法以 find/read/get开头
	 * 
	 * 使用 And 连接
	 */
	UserkeyPo findByLoginmsgAndCredential(String loginmsg, String credential);

	/**
	 * 使用 Or 连接
	 */
	List<UserkeyPo> readByLoginmsgOrCredential(String loginmsg, String credential);

	/**
	 * 使用 Between
	 */
	List<UserkeyPo> getByCreatetimeBetween(Date startTime, Date endTime);

	/**
	 * 使用 LessThen
	 */
	List<UserkeyPo> findByUserkeyidLessThan(Long userkeyid);

	/**
	 * 使用 LessThanEqual
	 */
	List<UserkeyPo> getByUserkeyidLessThanEqual(Long userkeyid);

	/**
	 * 使用 GreateThen
	 */
	List<UserkeyPo> getByUserkeyidGreaterThan(Long userkeyid);

	/**
	 * 使用 After
	 */
	List<UserkeyPo> getByCreatetimeAfter(Date startTime);

	/**
	 * 使用 Before
	 */
	List<UserkeyPo> getByCreatetimeBefore(Date endTime);

	/**
	 * 使用 isNull
	 */
	List<UserkeyPo> getByEditoridIsNull();

	/**
	 * 使用 (is)NotNull
	 */
	List<UserkeyPo> getByEditoridNotNull();

	/**
	 * 使用 Like
	 */
	List<UserkeyPo> getByLoginmsgLike(String loginmsg);

	/**
	 * 使用 NotLike
	 */
	List<UserkeyPo> getByLoginmsgNotLike(String loginmsg);

	/**
	 * 使用 StartingWith ('xxx%')
	 */
	List<UserkeyPo> getByLoginmsgStartingWith(String loginmsg);

	/**
	 * 使用 EndingWith ('%xxx')
	 */
	List<UserkeyPo> getByLoginmsgEndingWith(String loginmsg);

	/**
	 * 使用 Containing ('%xxx%')
	 */
	List<UserkeyPo> getByLoginmsgContaining(String loginmsg);

	/**
	 * 使用 OrderBy
	 */
	List<UserkeyPo> findAllByOrderByEditetimeDesc();

	/**
	 * 使用 Not
	 */
	List<UserkeyPo> getByLoginmsgNot(String loginmsg);

	/**
	 * 使用 In
	 */
	List<UserkeyPo> getByLoginmsgIn(Collection<String> loginmsgs);

	/**
	 * 使用 NotIn
	 */
	List<UserkeyPo> getByLoginmsgNotIn(Collection<String> loginmsgs);

	/**
	 * 使用 True
	 */
	List<UserkeyPo> getByIsdeleteTrue();

	/**
	 * 使用 False
	 */
	List<UserkeyPo> getByIslockupFalse();

	/**
	 * 使用 IgnoreCase
	 */
	List<UserkeyPo> getByLoginmsgIgnoreCase(String loginmsg);

	/**
	 * 使用 AllIgnoreCase
	 */
	List<UserkeyPo> getByLoginmsgAndCredentialAllIgnoreCase(String loginmsg, String credential);

	/**
	 * 使用 count
	 */
	Long countByCreatorid(Long creatorid);

	/**
	 * 使用 delete
	 */
	Long deleteByLoginmsg(String loginmsg);

	/**
	 * 使用 remove
	 */
	List<UserkeyPo> removeByLoginmsg(String loginmsg);

	/**
	 * 使用 First/Top
	 */
	UserkeyPo findFirstByOrderByLoginmsgAsc();

	/**
	 * Page 查询
	 */
	Page<UserkeyPo> findTop10ByIsdeleteFalse(Pageable pageable);

	/**
	 * @Query 使用 JPQL 来实现查询.
	 */
	@Query("FROM UserkeyPo u WHERE u.loginmsg LIKE %?1")
	List<UserkeyPo> findByLoginmsgEndsWith(String loginmsg);

	/**
	 * @Query 使用 JPQL 来实现查询.
	 */
	@Query("FROM UserkeyPo u WHERE u.loginmsg LIKE %:loginmsg")
	List<UserkeyPo> getByLoginmsgEndsWith(@Param("loginmsg") String loginmsg);

	/**
	 * @Query 使用 SQL 来实现查询.
	 */
	@Query(value = "SELECT * FROM t_userkey WHERE loginmsg = ?1", nativeQuery = true)
	UserkeyPo findByLoginmsg(String loginmsg);

	/**
	 * @Query 使用 JPQL 来实现分页查询.
	 */
	@Query(value = "FROM UserkeyPo u WHERE u.loginmsg = ?1", countQuery = "SELECT count(*) FROM UserkeyPo u WHERE u.loginmsg = ?1")
	Page<UserkeyPo> findByLoginmsg(String loginmsg, Pageable pageable);

	/**
	 * @Modifying @Query 进行HQL更新操作
	 */
	@Modifying
	@Query("update UserkeyPo u set u.loginmsg = ?1 where u.userkeyid = ?2")
	Integer setLoginmsgByUserkeyid(String loginmsg, Long userkeyid);
	
}
