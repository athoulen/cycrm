package com.blueair.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.blueair.util.JsonUtil;
import com.blueair.util.PropertiesUtil;

@RestController
@RequestMapping("flow")
public class FlowImpController extends BaseController {
	/**
	 * 上传文件
	 * @param request
	 * @param json
	 * @return
	 * @throws IOException
	 * @throws IllegalStateException
	 */
	@RequestMapping("/import")
	public ModelMap importFile(HttpServletRequest request,String json) throws IllegalStateException, IOException {
		List<String> pathList = JsonUtil.convertJson2Object(json, List.class);
		return rightResult(null, "上传成功！");
	}
}
