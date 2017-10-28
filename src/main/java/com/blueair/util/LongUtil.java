package com.blueair.util;

public class LongUtil {

	public static boolean isEmpty(Long l){
		return l==null||l==0;
	}
	
	public static void main(String[] args) {
		System.out.println(isEmpty(1l));
	}
}
