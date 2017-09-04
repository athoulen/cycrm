package com.blueair.shiro.listener;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.blueair.shiro.session.ShiroSessionRepository;

public class ShiroSessionListener implements SessionListener {
	private static final Logger LOGGER = LoggerFactory.getLogger(ShiroSessionListener.class);

	private ShiroSessionRepository shiroSessionRepository;

	@Override
	public void onStart(Session session) {
		// 会话创建时触发
		LOGGER.error("ShiroSessionListener session {} on start", session.getId());
	}

	@Override
	public void onStop(Session session) {
		// 会话被停止时触发
		shiroSessionRepository.deleteSession(session.getId());
		LOGGER.error("ShiroSessionListener session {} on stop", session.getId());
	}

	@Override
	public void onExpiration(Session session) {
		// 会话过期时触发
		shiroSessionRepository.deleteSession(session.getId());
		LOGGER.error("ShiroSessionListener session {} on expiration", session.getId());
	}

	public ShiroSessionRepository getShiroSessionRepository() {
		return shiroSessionRepository;
	}

	public void setShiroSessionRepository(
			ShiroSessionRepository shiroSessionRepository) {
		this.shiroSessionRepository = shiroSessionRepository;
	}

}
