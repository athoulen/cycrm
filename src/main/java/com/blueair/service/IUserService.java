package com.blueair.service;

import com.blueair.bean.User;

public interface IUserService {

	/**
	 * 用户登录获取信息用于验证
	 * @param username
	 * @return
	 */
	public User getUserInfo(String username);

	/**
	 * 用户注册，只有管理员可以注册用户
	 * @param user
	 * @return
	 */
	public int registerUser(User user);
	
	/**
	 * 用户登录信息更新
	 * @param username
	 */
	public void refreshUserInfo(String username);
}
