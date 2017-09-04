package com.blueair.util;

import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EncryptionUtil {
	private static Logger log = LoggerFactory.getLogger(EncryptionUtil.class);
	private EncryptionUtil(){}
	private static final String ALGORITHM = "DES";

	/**
	 * Get Des Key
	 */
	public static byte[] getKey(){
		byte[] result = null;
		try {
			KeyGenerator keygen = KeyGenerator.getInstance(ALGORITHM);
			SecretKey deskey = keygen.generateKey();
			result = deskey.getEncoded();
		} catch (NoSuchAlgorithmException e) {
			log.error("getKey", e);
		}
		return result;
	}

	/**
	 * Encrypt Messages
	 */
	public static byte[] encode(byte[] input, byte[] key){
		byte[] result = null;
		try{
			SecretKey deskey = new javax.crypto.spec.SecretKeySpec(key, ALGORITHM);
			Cipher c1 = Cipher.getInstance(ALGORITHM);
			c1.init(Cipher.ENCRYPT_MODE, deskey);
			result = c1.doFinal(input);
		}catch(Exception e){
			log.error("encode", e);
		}
		return result;
	}

	/**
	 * Decrypt Messages
	 */
	public static byte[] decode(byte[] input, byte[] key) {
		byte[] result = null;
		try{
			SecretKey deskey = new javax.crypto.spec.SecretKeySpec(key, ALGORITHM);
			Cipher c1 = Cipher.getInstance(ALGORITHM);
			c1.init(Cipher.DECRYPT_MODE, deskey);
			result = c1.doFinal(input);
		}catch(Exception e){
			log.error("encode", e);
		}
		return result;
	}

	/**
	 * MD5
	 */
	public static byte[] md5(byte[] input){
		byte[] result = null;
		try{
			java.security.MessageDigest alg = java.security.MessageDigest.getInstance("MD5"); // or "SHA-1"
			alg.update(input);
			result = alg.digest();
		}catch(Exception e){
			log.error("encode", e);
		}
		return result;
	}

	/**
	 * Convert byte[] to String
	 */
	public static String byte2hex(byte[] b) {
		String hs = "";
		String stmp;
		for (int n = 0; n < b.length; n++) {
			stmp = (java.lang.Integer.toHexString(b[n] & 0XFF));
			if (stmp.length() == 1) {
				hs = hs + "0" + stmp;
			} else {
				hs = hs + stmp;
			}
		}
		return hs.toUpperCase();
	}
	
	/**
	 * Convert String to byte[]
	 */
	public static byte[] hex2byte(String hex){
		if (hex.length() % 2 != 0) {
			throw new IllegalArgumentException();
		}
		char[] arr = hex.toCharArray();
		byte[] b = new byte[hex.length() / 2];
		for (int i = 0, j = 0, l = hex.length(); i < l; i++, j++) {
			String swap = Character.toString(arr[i++]) + arr[i];
			Integer byteint = Integer.parseInt(swap, 16) & 0xFF;
			b[j] = byteint.byteValue();
		}
		return b;
	}

	public static void main(String[] args){
		String jiami = byte2hex(encode("admin".getBytes(),"cmoscmos".getBytes()));
		System.out.println(jiami);
		String jiemi = new String(decode(hex2byte(jiami), "cmoscmos".getBytes()));
		System.out.println(jiemi);
	}
}
