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
@RequestMapping("upload")
public class UploadController extends BaseController {
	/**
	 * 上传文件
	 * 
	 * @return
	 * @throws IOException
	 * @throws IllegalStateException
	 */
	@RequestMapping("/file")
	public ModelMap uploadFile(HttpServletRequest request) throws IllegalStateException, IOException {
		// 将当前上下文初始化给 CommonsMutipartResolver （多部分解析器）
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		//用于存储上传文件列表
		ModelMap map = new ModelMap();
		//上传文件列表list
		List<String> pathList = new ArrayList<String>();
		// 检查form中是否有enctype="multipart/form-data"
		if (multipartResolver.isMultipart(request)) {
			// 将request变成多部分request
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			// 获取multiRequest 中所有的文件名
			Iterator iter = multiRequest.getFileNames();
			//循环遍历
			while (iter.hasNext()) {
				// 一次遍历所有文件
				MultipartFile file = multiRequest.getFile(iter.next().toString());
				if (file != null) {
					//服务路径
					String uploadPath = PropertiesUtil.getString("system", "uploadPath");
					//上传路径 
					String path = uploadPath + file.getOriginalFilename();
					// 上传
					file.transferTo(new File(path));
					pathList.add(path);
				}
			}
		}
		map.put("pathList", JsonUtil.convertObject2Json(pathList));
		return rightResult(map, "上传成功！");
	}
}
