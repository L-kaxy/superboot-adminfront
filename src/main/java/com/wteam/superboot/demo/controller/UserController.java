package com.wteam.superboot.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wteam.superboot.core.entity.po.UserPo;
import com.wteam.superboot.core.result.ResultMessage;
import com.wteam.superboot.demo.controller.param.Param;
import com.wteam.superboot.demo.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService service;

	@PostMapping("/addUser")
	public ResultMessage addUser(@RequestBody Param param) throws Exception {
		UserPo userPo = param.getUser().voToPo(UserPo.class);
		return service.addUser(userPo);
	}

	@DeleteMapping("/removeUser")
	public ResultMessage removeUser(@RequestBody Param param) throws Exception {
		UserPo userPo = param.getUser().voToPo(UserPo.class);
		return service.removeUser(userPo);
	}

	@PostMapping("/editUser")
	public ResultMessage editUser(@RequestBody Param param) throws Exception {
		UserPo userPo = param.getUser().voToPo(UserPo.class);
		return service.editUser(userPo);
	}

	@GetMapping("/getUsers")
	public ResultMessage getUsers(@RequestBody Param param) throws Exception {
		return service.getUsers();
	}

	@PostMapping("/getUser")
	public ResultMessage getUser(@RequestBody Param param) throws Exception {
		UserPo userPo = param.getUser().voToPo(UserPo.class);
		return service.getUser(userPo);
	}

}
