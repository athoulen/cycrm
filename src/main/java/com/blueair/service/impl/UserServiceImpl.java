package com.blueair.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blueair.bean.User;
import com.blueair.service.IUserService;
@Service(value="userService")
public class UserServiceImpl extends BaseServiceImpl implements IUserService {

	@Override
	public User getUserInfo(String username) {
		Map<String, Object> params=new HashMap<>();
		params.put("username", username);
		User user=getBaseDao().queryForObject("UserMapper.userLogInfo", params, User.class);
		return user;
	}

	@Override
	public int registerUser(User user){
		Map<String, Object> params=new HashMap<>();
		params.put("username", user.getUsername());
		//查询是否有用户名重名
		int duplicateCount=getBaseDao().queryForObject("UserMapper.duplicateName", params, Integer.class);
		if(duplicateCount>0){
			return -1;
		}
		int result = getBaseDao().insert("UserMapper.registerUser", user);
		if(result>0){
			return 1;
		}
		return 0;
	}

	@Override
	public void refreshUserInfo(String username) {
		Map<String, Object> params=new HashMap<>();
		params.put("username", username);
		params.put("lastLog", System.currentTimeMillis());
		getBaseDao().update("UserMapper.refreshUserInfo", params);
	}
}
