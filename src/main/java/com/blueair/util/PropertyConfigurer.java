package com.blueair.util;

import java.io.IOException;
import java.util.Properties;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;


/**
 * Decrypt the password to the properties file
 * 
 */
public class PropertyConfigurer extends	PropertyPlaceholderConfigurer {

	protected void loadProperties(Properties props) throws IOException {
		super.loadProperties(props);
		try {
			String password = props.getProperty("password");
			String decryPassword = new String(EncryptionUtil.decode(
					EncryptionUtil.hex2byte(password), "cmoscmos".getBytes()));
			props.setProperty("password", decryPassword);
		} catch (Exception e) {
			logger.error("decode password in properties error!", e);
		}
	}

}