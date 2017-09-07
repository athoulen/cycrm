package com.blueair.bean;

public class MerchandiserDetail extends Merchandiser {

	private MerchandiserKey parent;

	public MerchandiserKey getParent() {
		return parent;
	}

	public void setParent(MerchandiserKey parent) {
		this.parent = parent;
	}
	
}
