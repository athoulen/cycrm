package com.blueair.common.exception;

/**
 * 自定义异常
 * @author admin
 *
 */
public class CyException extends Exception {
	private static final long serialVersionUID = 1915716353804182465L;

	/**
	 * @param message
	 */
	public CyException(String message) 
	{
		super(message);
	}

	/**
	 * @param message
	 * @param cause
	 */
	public CyException(String message, Throwable cause) {
		super(message, cause);	
	}
}
