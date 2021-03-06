package com.blueair.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SpringContextHolder implements ApplicationContextAware {

	private static ApplicationContext applicationContext = null;

	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	public static Object getBean(String name) {
		return getApplicationContext().getBean(name);
	}

	@Override
	public void setApplicationContext(ApplicationContext context)
			throws BeansException {
		if (applicationContext == null) {
			applicationContext = context;
		}
	}
}
