/**
 * Copyright (c) 2007-2017 Wteam.  All rights reserved. 网维网络技术创业团队 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */
package com.wteam.superboot.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wteam.superboot.core.entity.po.UserPo;
import com.wteam.superboot.core.enums.ResultEnum;
import com.wteam.superboot.core.exception.SuperException;
import com.wteam.superboot.core.helper.ResultHelper;
import com.wteam.superboot.core.repository.UserRepository;
import com.wteam.superboot.core.result.ResultMessage;

/**
 * 用户模块Servcie类(单例).
 * 
 * @author 罗佳欣
 * @version 1.2.0
 */
@Service
@Transactional
public class UserService {

	/**
	 * 注入userDao.
	 */
	@Autowired
	private UserRepository userRepository;

	/**
	 * 获取所有的用户.
	 * 
	 * @throws Exception
	 *             异常抛出.
	 * @return 结果集.
	 * 
	 * @author 罗佳欣
	 * @since 1.2.0
	 */
	public ResultMessage getUsers() throws Exception {

		List<UserPo> users = userRepository.findAll();

		Map<String, Object> resultParm = new HashMap<>();
		resultParm.put("userList", users);

		ResultMessage rs = ResultHelper.result(ResultEnum.GET_SUCCESS, resultParm);

		return rs;
	}

	/**
	 * 添加用户.
	 * 
	 * @param userPo
	 *            用户凭证实例.
	 * @throws Exception
	 *             异常抛出.
	 * @return 结果集.
	 * 
	 * @author 罗佳欣
	 * @since 1.2.0
	 */
	public ResultMessage addUser(final UserPo userPo) throws Exception {
		if (userPo.getUsername() == null) {
			throw new SuperException(ResultEnum.EMPTY_USERNAME);
		}

		UserPo userPo2 = new UserPo();
		userPo2.setUsername(userPo.getUsername());

		if (userRepository.hasEntity(userPo2)) {
			throw new SuperException(ResultEnum.EXIST_USERNAME);
		}

		UserPo currentUser = new UserPo();
		currentUser.setUserid(1L);
		userRepository.addEntity(userPo, currentUser);
		
		ResultMessage rs = ResultHelper.result(ResultEnum.ADD_SUCCESS);

		return rs;
	}

	/**
	 * 删除用户.
	 * 
	 * @param userPo
	 *            用户凭证实例.
	 * @throws Exception
	 *             异常抛出.
	 * @return 结果集.
	 * 
	 * @author 罗佳欣
	 * @since 1.2.0
	 */
	public ResultMessage removeUser(final UserPo userPo) throws Exception {
		if (userPo.getUserid() == null) {
			throw new SuperException(ResultEnum.EMPTY_USERID);
		}

		UserPo delPo = new UserPo();
		delPo.setUserid(userPo.getUserid());
		userRepository.deleteEntity(delPo);

		ResultMessage rs = ResultHelper.result(ResultEnum.DEL_SUCCESS);

		return rs;
	}

	/**
	 * 修改用户.
	 * 
	 * @param userPo
	 *            用户凭证实例.
	 * @throws Exception
	 *             异常抛出.
	 * @return 结果集.
	 * 
	 * @author 罗佳欣
	 * @since 1.2.0
	 */
	public ResultMessage editUser(final UserPo userPo) throws Exception {
		if (userPo.getUserid() == null) {
			throw new SuperException(ResultEnum.EMPTY_USERID);
		}

		UserPo currentUser = new UserPo();
		currentUser.setUserid(1L);
		userRepository.editEntity(userPo, currentUser);

		ResultMessage rs = ResultHelper.result(ResultEnum.EDIT_SUCCESS);

		return rs;
	}

	/**
	 * 修改用户信息.
	 * 
	 * @param userPo
	 *            用户凭证实例.
	 * @throws Exception
	 *             异常抛出.
	 * @return 结果集.
	 * 
	 * @author 罗佳欣
	 * @since 1.2.0
	 */
	public ResultMessage getUser(final UserPo userPo) throws Exception {
		if (userPo.getUserid() == null) {
			throw new SuperException(ResultEnum.EMPTY_USERID);
		}

		UserPo userPo2 = userRepository.getEntityById(UserPo.class, userPo.getUserid());

		Map<String, Object> resultParm = new HashMap<>();
		resultParm.put("user", userPo2);

		ResultMessage rs = ResultHelper.result(ResultEnum.GET_SUCCESS, resultParm);

		return rs;
	}

}