package com.blueair.service.impl;

import org.springframework.stereotype.Service;

import com.blueair.bean.User;
import com.blueair.service.IUserService;
@Service("userService")
public class UserServiceImpl extends BaseServiceImpl implements IUserService {

	@Override
	public User getUserInfo(String username) {
		
		return null;
	}

}
