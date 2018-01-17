package com.wteam.superboot.demo.controller.param;

import com.wteam.superboot.core.controller.param.CoreParam;
import com.wteam.superboot.core.entity.vo.UserVo;

/**
 * 返回参数.
 * 
 * @author 罗佳欣
 *
 */
public class Param extends CoreParam {
	private UserVo user;

	public UserVo getUser() {
		return user;
	}

	public void setUser(UserVo user) {
		this.user = user;
	}

}
