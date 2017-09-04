package com.blueair.shiro.source;
/*package com.cmos.ykf.shiro.source;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.shiro.web.filter.mgt.DefaultFilterChainManager;
import org.apache.shiro.web.filter.mgt.NamedFilterList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.cmos.ykf.shiro.bean.UrlInfo;

@Component 
public class ShiroFilerChainManager {  
    @Autowired 
    private DefaultFilterChainManager filterChainManager;  
    private Map<String, NamedFilterList> defaultFilterChains;  
    @PostConstruct  
    public void init() {  
        defaultFilterChains =    new HashMap<String, NamedFilterList>(filterChainManager.getFilterChains());  
    }  
    public void initFilterChains(List<UrlInfo> urlFilters) {  
        //1、首先删除以前老的filter chain并注册默认的  
        filterChainManager.getFilterChains().clear();  
        if(defaultFilterChains != null) {  
            filterChainManager.getFilterChains().putAll(defaultFilterChains);  
        }  
        //2、循环URL Filter 注册filter chain  
        for (UrlInfo urlFilter : urlFilters) {  
            String url = urlFilter.getUrl();  
            //注册roles filter  
            if (!StringUtils.isEmpty(urlFilter.getRoles())) {  
                filterChainManager.addToChain(url, "roles", urlFilter.getRoles());  
            }  
            //注册perms filter  
            if (!StringUtils.isEmpty(urlFilter.getPermissions())) {  
                filterChainManager.addToChain(url, "perms", urlFilter.getPermissions());  
            }  
        }  
    }  
}*/