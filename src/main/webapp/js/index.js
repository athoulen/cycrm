angular.module("app",["ui.router",'router','pubulic','tm.pagination'])
.directive('dialog',function(){
	return {
		restrict:'EAC',
		templateUrl:'views/common/modal.html'
	}
})
.directive('tipalert',function(){
	return {
		restrict:'EAC',
		replace:true,
		template:"<div class='tip-alert' ng-show='tip_alert_show'>"+
			"<div class='tip-cover'></div>"+
			"<span ng-bind='tip_alert_msg' ng-></span>"+
		"</div>",
		link:function(scope,element,attrs){
			scope.tip_alert_show=false;
		}
	}
})
.directive('tipLog',['$rootScope','$timeout',function($rootScope,$timeout){
	return {
		restrict:'EAC',
		replace:true,
		template:"<div class='tip-alert' ng-show='tip_alert_show'>"+
			"<div class='tip-cover'></div>"+
			"<span ng-bind='tip_alert_msg' ng-></span>"+
		"</div>",
		link:function(scope,element,attrs){
			scope.tip_alert_show=false;
			$rootScope.$on('tiplog',function(e,data){
				if(data&&typeof data == "string"){
					scope.tip_alert_show = true;
					scope.tip_alert_msg = data;
					$timeout(function(){
						scope.tip_alert_show=false;
					},2000)
				}
			})
		}
	}
}])
.directive('citys',['Http','Url',function(Http,Url){
	return {
		restrict:'EAC',
		templateUrl:'citys',
		scope:{
			area:'=myArea',
			city:'=myCity'
		},
		link:function(scope,ele,attrs){
			console.log(attrs);
			scope.$watch('area',function(){
				Http.get({
					url:Url.getUrl('getCityList')+'/'+scope.area
				}).success(function(data){
					console.log(data);
					if(data.code == 1){
						scope.cityList = data.cities;
					}
				})
			})
			Http.postF({
				url:Url.getUrl('getAreasList')
			}).success(function(data){
				console.log(data);
				if(data.code == 1){
					scope.areasList = data.zones;
				}
			})
		}
	}
}])
angular.module('pubulic',[])
.factory('Http',['$http','$state','$rootScope',function($http,$state,$rootScope){
	return {
		get:function(json){
			var data = json.params||'',url = json.url;		
			var promise = $http({
				method:'get',
				params:data,
				url:url
			})
			promise.then(function(msg){
				if(msg.data.code==6666){
					$state.go('loginCompany');
				}else if(msg.data.code==2222){
				}
			})
			return promise;
		},
		post:function(json){
			var data = json.data||'',url = json.url;
			var promise = $http({
				method:'post',
				data:data,
				url:url
			})
			promise.then(function(msg){
				if(msg.data.code==6666){
					$state.go('loginCompany');
				}else if(msg.data.code==2222){
				}
			})
			return promise;
		},
		postF:function(json){
			var data = json.data||'',url = json.url;
			var promise = $http({
				method:'post',
				data:data,
				url:url,
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
                transformRequest: function(obj) {  
                    var str = [];  
                    for(var p in obj){  
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
                    }  
                    return str.join("&");  
                }
			})
			promise.then(function(msg){
				if(msg.data.code==6666){
					$state.go('loginCompany');
				}else if(msg.data.code==2222){
				}
			})
			return promise;
		},
		byForm:function(json){
			var f = document.createElement('form');
			f.method = "post";
			f.enctype = "multipart/form-data";
			f.style.display = "none";
			scope = json.scope||{};
			var f_in = {};
			if(json.data){
				for(var i in json.data){
					f_in[i] = document.createElement('input');
					f_in[i].name = i;
					f_in[i].value = json.data[i];
					f.appendChild(f_in[i]);
				}
			}
			var f_i = document.createElement('input');
			f_i.type = "file";
			f_i.name = json.fileName||'';
			f_i.accept = json.accept||'';
			f_i.multiple = json.multiple||'';
			console.log(f_i);
			(function(json){
				f_i.onchange = function(){
					$http({
						url:json.url,
						method:'post',
						headers: {
							'Content-Type': undefined
						},
						transformRequest: function() {
							var D_ata = new FormData(f);
							return D_ata
						}
					}).success(function(data){
						data.ykf_e_file = f_i.files[0];
						document.body.removeChild(f);
						json.success&&json.success(data);
					}).error(function(e){
						json.success.error&&json.success.error(e);
					})
				}
			})(json)
			f.appendChild(f_i);
			document.body.appendChild(f);
			f_i.click();
		}
	}
}])
.factory('Tip',['$timeout','$rootScope',function($timeout,$rootScope){
	return {
		//弹窗提示，第一个参数为提示内容，若改变title和宽度第一个参数需传含有title和msg两个参数的对象
		//第二参数为回调函数
		Alert:function(massage,callback){
			var dialogTit,dialogMsg,dialogWidth;
			if(typeof massage =='object'){
				dialogTit = massage.title?massage.title:'来自'+window.location.host+'的提示';
				dialogMsg = massage.msg?massage.msg:'';
				dialogWidth = massage.width?massage.width:false;
			}else if(typeof massage =='string'){
				dialogTit = '来自'+window.location.host+'的提示';
				dialogMsg = massage;
			}
			$('#dialogChange').hide();
			$('#dialogClose').text('确认');
			$('#dialogTitle').text(dialogTit);
			$('#dialogMsg').text(dialogMsg);
			$('#myDialog').one('hidden.bs.modal',function(){
				callback&&callback();
				$('#dialogClose').text('取消');
				$('#dialogChange').show();
				$('.modal-content').attr("style","");
			});
			if(dialogWidth) $('.modal-content').css({width:parseInt(width),margin:'0 auto'});
			$('#myDialog').modal({
				backdrop: 'static'
			})
		},
		//对话框，传参为对话信息，确认之后的动作，关闭之后的动作
		Confirm:function(massage,callback1,callback2){
			var dialogTit,dialogMsg,dialogWidth;
			if(typeof massage =='object'){
				dialogTit = massage.title?massage.title:'来自'+window.location.host+'的提示';
				dialogMsg = massage.msg?massage.msg:'';
				dialogWidth = massage.width?massage.width:false;
			}else if(typeof massage =='string'){
				dialogTit = '来自'+window.location.host+'的提示';
				dialogMsg = massage;
			}
			$('#dialogTitle').text(dialogTit);
			$('#dialogMsg').text(dialogMsg);
			$('#dialogClose').unbind('click').bind('click',function(){
				callback2&&callback2();
			})
			$('#dialogCloseT').unbind('click').bind('click',function(){
				callback2&&callback2();
			})
			$('#dialogChange').unbind('click').bind('click',function(){
				$('#myDialog').modal('hide');
				callback1&&callback1();
			})
			$('#myDialog').one('hidden.bs.modal',function(){
				$('#dialogClose').unbind('click');
				$('#dialogCloseT').unbind('click');
				$('#dialogChange').unbind('click');
				$('.modal-content').attr("style","");
			});
			if(dialogWidth) $('.modal-content').css({width:parseInt(dialogWidth),margin:'0 auto'});
			$('#myDialog').modal({
				backdrop: 'static'
			})
		},
		Check:function(callback1,callback2){
			var dialogTit,dialogMsg,dialogWidth=400;
			dialogMsg='<div class="checkbox">'+
					    '<label>'+
					      '<input type="radio" name="sq" value="kfz" class="wechat_radio"> 公众号开发者授权'+
					    '</label>'+
					  '</div>'+
					  '<div class="checkbox">'+
					    '<label>'+
					      '<input type="radio" name="sq" value="pt" class="wechat_radio"> 公众号第三方平台授权'+
					    '</label>'+
					  '</div>';
			dialogTit='选择绑定方式';
			$('#dialogTitle').html(dialogTit);
			$('#dialogMsg').html(dialogMsg);
			$('#dialogClose').unbind('click').bind('click',function(){
				callback2&&callback2();
			})
			$('#dialogCloseT').unbind('click').bind('click',function(){
				callback2&&callback2();
			})
			$('#dialogChange').unbind('click').bind('click',function(){
				$('#myDialog').modal('hide');
				callback1&&callback1();
				$('#dialogTitle').html('');
				$('#dialogMsg').html('');
			})
			$('#myDialog').one('hidden.bs.modal',function(){
				$('#dialogClose').unbind('click');
				$('#dialogCloseT').unbind('click');
				$('#dialogChange').unbind('click');
				$('.modal-content').attr("style","");
			});
			if(dialogWidth) $('.modal-content').css({width:parseInt(dialogWidth),margin:'0 auto'});
			$('#myDialog').modal({
				backdrop: 'static'
			})
		},
		Checkbox:function(callback1,callback2){
			var dialogTit,dialogMsg,dialogWidth=400;
			dialogMsg='<div class="checkbox">'+
					    '<label>'+
					      '<span class="Acceptname">受理客服组：</span>'+'<select name="" class="Acceptkf">'+'<option value="受理客服组">受理客服组</option>'+'<lect>'+
					    '</label>'+
					  '</div>'+
					  '<div class="checkbox">'+
					    '<label>'+
					      '<span class="Acceptname">受理客服：</span>'+'<select name="" class="Acceptkf">'+'<option value="受理客服">受理客服</option>'+'<lect>'+
					    '</label>'+
					  '</div>';
			dialogTit='转移工单';
			$('#dialogTitle').html(dialogTit);
			$('#dialogMsg').html(dialogMsg);
			$('#dialogClose').unbind('click').bind('click',function(){
				callback2&&callback2();
			})
			$('#dialogCloseT').unbind('click').bind('click',function(){
				callback2&&callback2();
			})
			$('#dialogChange').unbind('click').bind('click',function(){
				$('#myDialog').modal('hide');
				callback1&&callback1();
				$('#dialogTitle').html('');
				$('#dialogMsg').html('');
			})
			$('#myDialog').one('hidden.bs.modal',function(){
				$('#dialogClose').unbind('click');
				$('#dialogCloseT').unbind('click');
				$('#dialogChange').unbind('click');
				$('.modal-content').attr("style","");
			});
			if(dialogWidth) $('.modal-content').css({width:parseInt(dialogWidth),margin:'0 auto'});
			$('#myDialog').modal({
				backdrop: 'static'
			})
		},
		Log:function(msg,cb){
			$rootScope.$broadcast('tiplog',msg);
			cb&&cb();
		}
	}
}])
//列表查询服务封装
.factory('GetList',['$http','$timeout','Tip',function($http,$timeout,Tip){
	return{ Get:function(opt){
			var url = opt.url;
			var data = opt.data;
			var scope = opt.scope;
			var callback = opt.success;
			scope.pagShow=false;
			scope.paginationConf = {
				url:url,
				data:data,
		        currentPage: 1,//默认页
		        totalItems: 80,//总页数
		        itemsPerPage: 10,//每页展示数据条数 默认15条
		        pagesLength: 15,//分页条目长度
		        perPageOptions: [5, 10, 20],
		        init:true,
		        onChange: function(fn){
		        	scope.paginationConf.data.page=scope.paginationConf.currentPage;
		        	scope.paginationConf.data.pageSize=scope.paginationConf.itemsPerPage;
		        	if(this.init==true){
		        		this.init=false;
		        		return false;
		        	}
		 			$http({
		 				url:scope.paginationConf.url,
		 				params:scope.paginationConf.data
		 			}).success(function(data){
		 				if(!data.code==1){
		 					Tip.Alert(data.message);
		 				}
		 				$timeout(function(){
		 					scope.data=data;
		 					scope.paginationConf.totalItems=data.totalCount;
		 					callback&&callback(data);
		 				})
		 			}).error(function(e){
		 				console.log(e);
		 			})
		        }
		    };
		    scope.paginationConf.data.page=1;
		    scope.paginationConf.data.pageSize=10;
		    $http({
		    	url:url,
		    	params:scope.paginationConf.data
		    }).success(function(data){
		    	$timeout(function(){
		    		scope.pagShow=true;
		    		scope.data=data;
 					scope.paginationConf.totalItems=data.totalCount;
 					callback&&callback(data);
		    	})
		    })
		},
		Post:function(opt){
			var url = opt.url;
			var data = opt.data;
			var scope = opt.scope;
			var callback = opt.success;
			scope.pagShow=false;
			scope.paginationConf = {
				url:url,
				data:data,
		        currentPage: 1,//默认页
		        totalItems: 80,//总页数
		        itemsPerPage: 10,//每页展示数据条数 默认15条
		        pagesLength: 15,//分页条目长度
		        perPageOptions: [5, 10, 20],
		        init:true,
		        onChange: function(fn){
		        	scope.paginationConf.data.page=scope.paginationConf.currentPage;
		        	scope.paginationConf.data.pageSize=scope.paginationConf.itemsPerPage;
		        	if(this.init==true){
		        		this.init=false;
		        		return false;
		        	}
		 			$http({
		 				url:url,
		 				method:'post',
		 				data:scope.paginationConf.data,
		 				headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
		                transformRequest: function(obj) {  
		                    var str = [];  
		                    for(var p in obj){  
		                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		                    }  
		                    return str.join("&");  
		                }
		 			}).success(function(data){
		 				if(!data.code==1){
		 					Tip.Alert(data.message);
		 				}
		 				$timeout(function(){
		 					scope.pagShow=true;
		 					scope.data=data;
		 					scope.paginationConf.totalItems=data.totalCount;
		 					callback&&callback(data);
		 				})
		 			}).error(function(e){
		 				console.log(e);
		 			})
		        }
		    };
		    scope.paginationConf.data.page=1;
		    scope.paginationConf.data.pageSize=10;
		    $http({
		    	url:url,
		    	method:'post',
		    	data:scope.paginationConf.data,
		    	headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
                transformRequest: function(obj) {  
                    var str = [];  
                    for(var p in obj){  
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
                    }  
                    return str.join("&");  
                }
		    }).success(function(data){
		    	$timeout(function(){
		    		scope.pagShow=true;
		    		scope.data=data;
 					scope.paginationConf.totalItems=data.totalCount;
 					callback&&callback(data);
		    	})
		    })
		}
	}
}])
.factory('TestChat',function(){
	var msg ={
		
	}
	return {
		chat:function(){
			setInterval(function(){

			},3000)
		}
	}
})
.factory('groupsRoles',['$http','Url','$timeout',function($http,Url,$timeout){//获取所有客服组以及角色列表（无分页）
	//缓存所有客服组和角色的promise对象
	return {
		get:function(scope,cb1,cb2){//cb1为获取客服组的回调函数,cb2为获取角色列表的回调函数
			var pro1 = $http({
				url:Url.getUrl('allGroups'),
				params:{
					userPrivateUrl:scope.userPrivateUrl
				}
			}).success(function(data){
				console.log(data);
				if(data.code==1){
					$timeout(function(){
						scope.groupData=data.groups;
						cb1&&cb1();
					})	
				}else{
					console.warn('获取客服组数据失败');
				}
			})
			var pro2 = $http({
				url:Url.getUrl('allRoles'),
				params:{
					userPrivateUrl:scope.userPrivateUrl
				}
			}).success(function(data){
				if(data.code==1){
					$timeout(function(){
						scope.roleData=data.roles;
						cb2&&cb2();
					})		
				}else{
					console.warn('获取角色数据失败');
				}
			})
		}
	}
			
}])
.factory('indexedDB',function(){
	function openDB (myDB,scope,cb) {//打开聊天数据库
		if(scope.DB){//判断是否在scope中缓存了DB对象,如果缓存了，就将对象的result赋给myDB.db
			myDB.db = scope.DB.result;
			cb&&cb();
		}else{//如果未缓存DB对象，或者与数据库的链接中断，则重新打开数据库
			var version=myDB.version || 1;
			scope.DB={};
	        scope.DB=window.indexedDB.open(myDB.name,version);//打开数据库
	        scope.DB.onerror=function(e){
	            console.log(e.currentTarget.error.message);
	        };
	        scope.DB.onsuccess=function(e){
	        	scope.DB.result=e.target.result;
	            myDB.db=e.target.result;
	            cb&&cb();
	        };
	        scope.DB.onupgradeneeded=function(e){
	            var db=e.target.result;
	            if(!db.objectStoreNames.contains(myDB.name)){
	                var store=db.createObjectStore(myDB.name,{keyPath: "msgId"});//第一次创建数据表，表名与数据库名相同
	                store.createIndex('chatIdIndex','chatId',{unique:false}); 
	                store.createIndex('toIdIndex','toId',{unique:false});
	                store.createIndex('fromIdIndex','fromId',{unique:false});
	                store.createIndex('timeIndex','time',{unique:false});
	            	console.log('DB version changed to '+version);
	        	};
	        }
		}
	        
    }
    function closeDB(db){//关闭聊天数据库
        db.close();
    }
    function getDataByIndex(db,storeName,indexType,x,scope,cb){//通过index查询
        var transaction=db.transaction(storeName);
        var store=transaction.objectStore(storeName);
        var index = store.index(indexType);
        var request=index.openCursor(IDBKeyRange.only(x));
        scope.dbQueryData = [];//在scope.dbQueryData中存储数据
        request.onsuccess = null;
        request.onsuccess=function(e){
            var cursor=e.target.result;
            if(cursor){
                var json=cursor.value;
                scope.dbQueryData.push(json);
                cursor.continue();
            }else{
            	cb&&cb();//执行回调函数
            }
        }
    }
    function addData(myDB,data,cb){//添加数据,data必须为Array类型
        var transaction=myDB.db.transaction(myDB.name,'readwrite'); 
        var store=transaction.objectStore(myDB.name); 
        for(var i=0;i<data.length;i++){
            store.add(data[i]);
        }
        cb&&cb();//全部数据添加完成后执行回调
    }
    function deleteDataByKey(myDB,value){//根据保存的键值删除数据
        var transaction=myDB.db.transaction(myDB.name,'readwrite'); 
        var store=transaction.objectStore(myDB.name); 
        store.delete(value); 
    }
    return {
    	init:function(scope,cb){//初始化数据库
    		var myDB = {
    			name:"chatMsg",
    			db:null,
    			version:1
    		}
			openDB (myDB,scope,cb)
    	},
    	get:function(scope,chatId,cb){//获取数据
    		var myDB = {
    			name:"chatMsg",
    			db:null,
    			version:1
    		}
    		openDB(myDB,scope,function(){
    			getDataByIndex(myDB.db,myDB.name,"chatIdIndex",chatId,scope,cb);
    		})
    	},
    	add:function(scope,data,cb){//添加数据，参数data必须为Array类型数据
    		var myDB = {
    			name:"chatMsg",
    			db:null,
    			version:1
    		}
    		openDB(myDB,scope,function(){
    			addData(myDB,data,cb);
    		})
    	},
    	delete:function(scope,chatId,cb){
    		var myDB = {
    			name:"chatMsg",
    			db:null,
    			version:1
    		}
    		openDB(myDB,scope,function(){
    			getDataByIndex(myDB.db,myDB.name,chatId,scope,function(){//获取要删除的数据
    				var deleData = scope.dbQueryData;
	    			for(var i=0;i<deleData.length;i++){//遍历所有的待删除的数据，进行删除操作
	    				var request = deleteDataByKey(myDB,deleData[i].msgId);
	    			}
	    			request.onsuccess = function(){
	    				console.log("delete success!");
	    			}
    			});
    		})
    	}
    }
})
/**
 * name: tm.pagination
 * Version: 1.0.0 beta
 */
angular.module('tm.pagination', []).directive('tmPagination',[function(){
    return {
        restrict: 'EA',
        template: '<div class="page-list">' +
            '<ul class="pagination" ng-show="conf.totalItems > 0">' +
            '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li>' +
            '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
            'ng-click="changeCurrentPage(item)">' +
            '<span>{{ item }}</span>' +
            '</li>' +
            '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li>' +
            '</ul>' +
            '<div class="page-total" ng-show="conf.totalItems > 0">' +
            '每页<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>' +
            '/共<strong>{{ conf.totalItems }}</strong>条 ' +
            '跳转至<input type="text" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)"/>' +
            '</div>' +
            '<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
            '</div>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {
            
            var conf = scope.conf;

            // 默认分页长度
            var defaultPagesLength = 9;

            // 默认分页选项可调整每页显示的条数
            var defaultPerPageOptions = [10, 15, 20, 30, 50];

            // 默认每页的个数
            var defaultPerPage = 15;

            // 获取分页长度
            if(conf.pagesLength) {
                // 判断一下分页长度
                conf.pagesLength = parseInt(conf.pagesLength, 10);

                if(!conf.pagesLength) {
                    conf.pagesLength = defaultPagesLength;
                }

                // 分页长度必须为奇数，如果传偶数时，自动处理
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }

            } else {
                conf.pagesLength = defaultPagesLength
            }

            // 分页选项可调整每页显示的条数
            if(!conf.perPageOptions){
                conf.perPageOptions = defaultPagesLength;
            }

            // pageList数组
            function getPagination(newValue, oldValue) {
                
                // conf.currentPage
                if(conf.currentPage) {
                    conf.currentPage = parseInt(scope.conf.currentPage, 10);
                }

                if(!conf.currentPage) {
                    conf.currentPage = 1;
                }

                // conf.totalItems
                if(conf.totalItems) {
                    conf.totalItems = parseInt(conf.totalItems, 10);
                }

                // conf.totalItems
                if(!conf.totalItems) {
                    conf.totalItems = 0;
                    return;
                }
                
                // conf.itemsPerPage 
                if(conf.itemsPerPage) {
                    conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                }
                if(!conf.itemsPerPage) {
                    conf.itemsPerPage = defaultPerPage;
                }

                // numberOfPages
                conf.numberOfPages = Math.ceil(scope.conf.totalItems/conf.itemsPerPage);

                // 如果分页总数>0，并且当前页大于分页总数
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }

                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                var perPageOptionsLength = scope.conf.perPageOptions.length;

                // 定义状态
                var perPageOptionsStatus;
                for(var i = 0; i < perPageOptionsLength; i++){
                    if(conf.perPageOptions[i] == conf.itemsPerPage){
                        perPageOptionsStatus = true;
                    }
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                if(!perPageOptionsStatus){
                    conf.perPageOptions.push(conf.itemsPerPage);
                }

                // 对选项进行sort
                conf.perPageOptions.sort(function(a, b) {return a - b});
                

                // 页码相关
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                    for(i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // 左边没有...
                        for(i = 1; i <= offset + 1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }else if(conf.currentPage > conf.numberOfPages - offset){
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(conf.numberOfPages - i);
                        }
                        scope.pageList.push(conf.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
                            scope.pageList.push(conf.currentPage - i);
                        }
                        scope.pageList.push(conf.currentPage);
                        for(i = 1; i <= offset / 2; i++){
                            scope.pageList.push(conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }
                }

                scope.$parent.conf = conf;
            }

            // prevPage
            scope.prevPage = function() {
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                    if(conf.onChange) {    
                        conf.onChange();
                    }
                }
            };

            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                    if(conf.onChange) {    
                        conf.onChange();
                    }
                }
            };

            // 变更当前页
            scope.changeCurrentPage = function(item) {
                if(item == '...'){
                    return;
                }else{
                    conf.currentPage = item;
                    scope.conf.currentPage =item;
                    getPagination();
                    // conf.onChange()函数
                    if(conf.onChange) {    
                        conf.onChange();
                    }
                }
            };

            // 修改每页展示的条数
            scope.changeItemsPerPage = function() {

                // 一发展示条数变更，当前页将重置为1
                scope.conf.currentPage = 1;
                console.log(conf);
                getPagination();
                // conf.onChange()函数
                if(conf.onChange) {    
                    conf.onChange();
                }
            };

            // 跳转页
            scope.jumpToPage = function() {
                num = scope.jumpPageNum;
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);
                
                    if(num && num != conf.currentPage) {
                        if(num > conf.numberOfPages) {
                            num = conf.numberOfPages;
                        }

                        // 跳转
                        conf.currentPage = num;
                        getPagination();
                        // conf.onChange()函数
                        if(conf.onChange) {    
                            conf.onChange();
                        }
                        scope.jumpPageNum = '';
                    }
                }
                
            };

            scope.jumpPageKeyUp = function(e) {
                var keycode = window.event ? e.keyCode :e.which;
                
                if(keycode == 13) {
                    scope.jumpToPage();
                }
            }

            scope.$watch('conf.totalItems', function(value, oldValue) {
                
                // 在无值或值相等的时候，去执行onChange事件
                if(!value || value == oldValue) {   
                    if(conf.onChange) {    
                        conf.onChange();
                    }
                }
                getPagination();
            })
            
        }
    };
}]);
angular.module('router',[
	'home.router',
	'kf.router',
	'login.router',
	'register.router',
	'flow.router',
])
.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
	// $locationProvider.html5Mode({
	//     enabled: true,
	//     requireBase: false
	// });
	$urlRouterProvider.otherwise('login');
}]);

angular.module('flow.ctrl',['pubulic','data'])
.controller('flowCtrl',['$scope','Data','$timeout','Tip',function($scope,Data,$timeout,Tip){
	$scope.list = Data.getData('flowData').list;
}])
.controller('flowglCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http){
	$scope.searchMsg = {};
	$scope.searchMsg.startDate = '';
	function getlist(){
		GetList.Post({
			url:Url.getUrl('flowList'),
			data:{
				json:JSON.stringify($scope.searchMsg)
			},
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList = data.result;
				}
			}
		})
	}
	getlist();
	$scope.search = function(){
		getlist();
	}
	$scope.bjZd = function(x){
		$state.go('home.flow.bjflow',{
			id:x.flowId,
			obj:x
		})
	}
}])
.controller('addflowCtrl',['$scope','Tip','$state','Url','$http','Tip','groupsRoles','Http',function($scope,Tip,$state,Url,$http,Tip,groupsRoles,Http){
	$scope.yearsList = [];
	$scope.monthList = [];
	$scope.myMsg = {
		impType:'',
		impYear:'',
		impMonth:'',
		delFlag:'0',
		pathList:''
	};
	for(var i = 2017;i<=2050;i++){
		$scope.yearsList.push(i);
	}
	for(var i = 1;i<=12;i++){
		$scope.monthList.push(i);
	}
	$scope.upload = function(){
		Http.byForm({
			url:Url.getUrl('uploadFlowFile'),
			fileName:'file',
			multiple:"multipart",
			success:function(data){
				console.log(data);
				Tip.Log(data.message);
				if(data.code == 1){
					$scope.pathList = JSON.parse(data.pathList);
				}
			}
		})
	}
	$scope.flow = function(){
		if(!$scope.myMsg.impType||!$scope.myMsg.impYear||!$scope.myMsg.impMonth||!$scope.myMsg.pathList){
			Tip.Log('请先选择条件');
			return;
		}
		Http.postF({
			url:Url.getUrl("importFlowFile"),
			data:{
				json:JSON.stringify($scope.myMsg)
			}
		}).success(function(data){
			Tip.Log(data.message);
			if(data.code == 1){
				$state.go("home.flow.flowgl");
			}
		})
	}
}])
.controller('bjflowCtrl',['$scope','$stateParams','Tip','$state','Url','$http','Tip','groupsRoles','Http',function($scope,$stateParams,Tip,$state,Url,$http,Tip,groupsRoles,Http){
	console.log($stateParams);
	$scope.myMsg = $stateParams.obj||{};
}])
.controller('settlementCtrl',['$scope','Tip','$state','Url','$http','Tip','groupsRoles','Http','GetList',function($scope,Tip,$state,Url,$http,Tip,groupsRoles,Http,GetList){
	$scope.searchMsg = {};
	$scope.searchMsg.startDate = '';
	function getlist(){
		GetList.Post({
			url:Url.getUrl('getsettlementList'),
			data:{
				json:JSON.stringify($scope.searchMsg)
			},
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList = data.result;
				}
			}
		})
	}
	getlist();
	$scope.search = function(){
		getlist();
	}
	$scope.settlement = function(x){
		Http.get({
			url:Url.getUrl('goSettlement')+'/'+x.rebateId
		}).success(function(data){
			Tip.Log(data.message);
			if(data.code == 1){
				getlist();
			}else{

			}
		})
	}
	$scope.cancelSettlement = function(x){
		Http.get({
			url:Url.getUrl('cancelSettlement')+'/'+x.rebateId
		}).success(function(data){
			Tip.Log(data.message);
			if(data.code == 1){
				getlist();
			}else{

			}
		})
	}
	$scope.handleSettle = function(){
		Http.postF({
			url:Url.getUrl('handleSettlement')
		}).success(function(data){
			Tip.Log(data.message);
			if(data.code == 1){
				getlist();
			}
		})
	}
}])

angular.module('flow.router',['flow.ctrl'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('home.flow',{
		url:'/flow',
		templateUrl: 'views/flowto/flow.html',
		controller:'flowCtrl'
	})
	.state('home.flow.flowgl',{
		url:'/flowgl',
		templateUrl: 'views/flowto/flow/flowGl.html',
		controller:'flowglCtrl'
	})
	.state('home.flow.addflow',{
		url:'/flowgl/addflow',
		templateUrl: 'views/flowto/flow/addFlow.html',
		controller:'addflowCtrl'
	})
	.state('home.flow.bjflow',{
		url:'/flowgl/:id',
		templateUrl: 'views/flowto/flow/bjFlow.html',
		controller:'bjflowCtrl',
		params:{
			obj:null
		}
	})
	.state('home.flow.settlement',{
		url:'/settlement',
		templateUrl: 'views/flowto/settlement/settlement.html',
		controller:'settlementCtrl',
		params:{
			obj:null
		}
	})
}])
angular.module("home.ctrl",["pubulic",'data'])
.controller("homeCtrl",['$scope','Data','$stateParams','$http','Url',"$timeout",function($scope,Data,$stateParams,$http,Url,$timeout){
	//用户信息缓存
	// if($stateParams.user){
	// 	$scope.userPrivateUrl=$stateParams.user.userPrivateUrl;
	// 	$scope.userId=$stateParams.user.employeeId;
	// 	var str = JSON.stringify($stateParams);
	// 	sessionStorage.setItem('stateParams',str);
	// }else{	
	// 	var json = JSON.parse(sessionStorage.getItem('stateParams'));
	// 	$scope.userPrivateUrl=json.user.userPrivateUrl;
	// 	$scope.userId=json.user.employeeId;
	// }
	$scope.menu={};
	$scope.menu.kf = Data.getData('kfData').title;
	$scope.menu.flow = Data.getData('flowData').title;
}]);

angular.module('data',[])
.factory('Data',function(){
	var data={
		kfData:
		{
			'title':'客服中心',
			'state':'.KF',
			'list':[
				{
					'title':'客服管理',
					'list':[
						{
							'title':'客服列表',
							'state':'.KF_KF_lb'
						},
						{
							'title':'添加客服',
							'state':'.KF_KF_addKfz'
						}
					]
				},
				{
					'title':'客服组',
					'list':[
						{
							'title':'客服组列表',
							'state':'.KF_KFZ_lb'
						},
						{
							'title':'添加客服组',
							'state':'.KF_KFZ_addKfz'
						}
					]
				},
				{
					'title':'角色管理',
					'list':[
						{
							'title':'角色列表',
							'state':'.KF_JS_lb'
						},
						{
							'title':'添加客服组',
							'state':'.KF_JS_addJs'
						}
					]
				}
			]				
		},
		gdData:
		{
			'title':'工单管理',
			'state':'.GD',
			'list':[
				{
					'title':'我的未解决工单',
					'list':[
						{
							'title':'优先未解决工单',
							'state':'KF_GD_yxwjj'
						},
						{
							'title':'一般未解决工单',
							'state':'KF_GD_ybwjj'
						}
					]
				},
				{
					'title':'组内未解决工单',
					'list':[
						
					]
				},
				{
					'title':'所有未解决工单',
					'list':[
						
					]
				},
				{
					'title':'我的已解决工单',
					'list':[
						
					]
				},
				{
					'title':'所有工单',
					'list':[
						
					]
				}
			]				
		},
		chatData:
		{
			'title':'IM即时通讯',
			'state':'.chat',
			'list':[
				{
					'title':'当前会话',
					//'list':chat.currentMessage(scope)
				},
				{
					'title':'历史会话',
					//'list':chat.historyMessage(scope)
				}
			]				
		},
		config:
		{
			'title':'配置',
			'state':'.config',
			'list':[
				{
					'title':'渠道配置',
					//'list':chat.currentMessage(scope)
				},
				{
					'title':'配置选项',
					//'list':chat.historyMessage(scope)
				}
			]				
		}
	}
		
	return {
		getData:function(id){
			for(x in data){
				if(id==x){
					return data[x];
				}
			}
		}
	}
		

	
})
angular.module('home.router',['home.ctrl'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl',
        params:{
        	user:null,
        	permissions:null,
          groupData:null,
          roleData:null
        }
      })
}]);

angular.module('kf.ctrl',['pubulic','data'])
.controller('kfCtrl',['$scope','Data','$timeout','Tip',function($scope,Data,$timeout,Tip){
	$scope.list = Data.getData('kfData').list;
}])
.controller('kfglCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http){
	$scope.queryHospitalTxt = "";	
	function getlist(){
		GetList.Post({
			url:Url.getUrl('zdList'),
			data:{
				hospitalName:$scope.queryHospitalTxt,
				flag:1
			},
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList = data.hospitals;
				}
			}
		})
	}
	getlist();
	$scope.search = function(){
		getlist();
	}
	$scope.bjZd = function(x){
		$state.go('home.kf.bjkf',{
			id:x.hospitalId
		})
	}
}])
.controller('addkfCtrl',['$scope','Tip','$state','Url','$http','Tip','groupsRoles','Http',function($scope,Tip,$state,Url,$http,Tip,groupsRoles,Http){
	$scope.myMsg = {};
	$scope.saveMsg = function(){
		$scope.myMsg.zoneId = $scope.myArea;
		$scope.myMsg.cityId = $scope.myCity;
		Http.postF({
			url:Url.getUrl('addZd'),
			data:{json:JSON.stringify($scope.myMsg)}
		}).success(function(data){
			if(data.code == 1){
				Tip.Log(data.message);
				$state.go("home.kf.kfgl");
			}else{
				Tip.Log(data.message);
			}
		})
	}
}])
.controller('bjkfCtrl',['$scope','$stateParams','Tip','$state','Url','$http','Tip','groupsRoles','Http',function($scope,$stateParams,Tip,$state,Url,$http,Tip,groupsRoles,Http){
	console.log($stateParams);
	$scope.myMsg = {};
	Http.get({
		url:Url.getUrl('queryZd')+'/'+$stateParams.id
	}).success(function(data){
		console.log(data);
		if(data.code == 1){
			$scope.myMsg.hospitalName = data.hospital.hospitalName;
			$scope.myMsg.hospitalId = data.hospital.hospitalId;
			$scope.myMsg.type = JSON.stringify(data.hospital.type);
			$scope.myArea = data.hospital.zoneId;
			$scope.myCity = data.hospital.cityId;
		}else{
			Tip.Log('服务端异常');
		}
	})
	$scope.saveMsg = function(){
		$scope.myMsg.zoneId = $scope.myArea;
		$scope.myMsg.cityId = $scope.myCity;
		Http.postF({
			url:Url.getUrl('bjZd'),
			data:{json:JSON.stringify($scope.myMsg)}
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log(data.message);
				$state.go("home.kf.kfgl");
			}else{
				Tip.Log(data.message);
			}
		})
	}
}])
.controller('kfzglCtrl',['$scope','$stateParams','Tip','$state','Url','$http','GetList','$timeout',function($scope,$stateParams,Tip,$state,Url,$http,GetList,$timeout){
   $scope.queryCustomerTxt = "";	
	function getlist(){
		GetList.Post({
			url:Url.getUrl('khList'),
			data:{
				customerName:$scope.queryCustomerTxt,
				phone:'',
				flag:1
			},
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList = data.customers;
				}
			}
		})
	}
	getlist();
	$scope.search = function(){
		getlist();
	}
	$scope.bjZd = function(x){
		$state.go('home.kf.bjkfz',{
			id:x.customerId
		})
	}
}])
.controller('bjkfzCtrl',['$scope','GetList','Url','$timeout','$stateParams','$state','$http','Tip','Http',function($scope,GetList,Url,$timeout,$stateParams,$state,$http,Tip,Http){
	$scope.myMsg = {};
	Http.get({
		url:Url.getUrl('queryKh')+'/'+$stateParams.id
	}).success(function(data){
		console.log(data);
		if(data.code == 1){
			$scope.myMsg.customerName = data.customer.customerName;
			$scope.myMsg.customerId = data.customer.customerId;
			$scope.myMsg.depositBank = data.customer.depositBank;
			$scope.myMsg.desc = data.customer.desc;
			$scope.myMsg.phone = data.customer.phone;
			$scope.myMsg.isCorp = data.customer.isCorp;
			$scope.myMsg.serialCode = data.customer.serialCode;
			$scope.myMsg.accountCode = data.customer.accountCode;
			$scope.myMsg.accountName = data.customer.accountName;
		}else{
			Tip.Log('服务端异常');
		}
	})
	$scope.saveMsg = function(){
		Http.postF({
			url:Url.getUrl('bjKh'),
			data:{json:JSON.stringify($scope.myMsg)}
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log(data.message);
				$state.go("home.kf.kfzgl");
			}else{
				Tip.Log(data.message);
			}
		})
	}
}])
.controller('addkfzCtrl',['$scope','GetList','Url','$timeout','$http','Tip','$state','Http',function($scope,GetList,Url,$timeout,$http,Tip,$state,Http){
	$scope.myMsg = {};
	$scope.saveMsg = function(){
		Http.postF({
			url:Url.getUrl('addKh'),
			data:{json:JSON.stringify($scope.myMsg)}
		}).success(function(data){
			if(data.code == 1){
				Tip.Log(data.message);
				$state.go("home.kf.kfzgl");
			}else{
				Tip.Log(data.message);
			}
		})
	}
}])

angular.module('kf.router',['kf.ctrl'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('home.kf',{
		url:'/zd',
		templateUrl: 'views/kf/kf.html',
		controller:'kfCtrl'
	})
	.state('home.kf.kfgl',{
		url:'/zdgl',
		templateUrl: 'views/kf/kfgl/KFGL.html',
		controller:'kfglCtrl'
	})
	.state('home.kf.addKf',{
		url:'/kfzd/addzd',
		templateUrl: 'views/kf/kfgl/addKf.html',
		controller:'addkfCtrl'
	})
	.state('home.kf.bjkf',{
		url:'/zdgl/:id',
		templateUrl: 'views/kf/kfgl/bjkf.html',
		controller:'bjkfCtrl',
	})
	.state('home.kf.kfzgl',{
		url:'/khgl',
		templateUrl: 'views/kf/kfzgl/KFZGL.html',
		controller:'kfzglCtrl'
	})
	.state('home.kf.addkfz',{
		url:'/khgl/addkh',
		templateUrl: 'views/kf/kfzgl/addkfz.html',
		controller:'addkfzCtrl'
	})
	.state('home.kf.bjkfz',{
		url:'/khgl/:id',
		templateUrl: 'views/kf/kfzgl/bjkfz.html',
		controller:'bjkfzCtrl',
	})
}])
angular.module('login.ctrl',['data','pubulic'])
.controller('loginCtrl',['$scope','$http','$state','Url','Tip','$timeout',function($scope,$http,$state,Url,Tip,$timeout){
	$scope.username=localStorage.getItem('loginID')||'';
	$scope.password=localStorage.getItem('loginPASS')||'';
	$scope.test_style1="";
	$scope.test_style2="";
	$scope.rememberID=false;
	$scope.login_submit = '登录'
	$scope.$watch('rememberID',function(){
		if($scope.rememberID){
			Tip.Log('账号密码将存入cookie！');
		}
	})
	document.getElementById('username').onblur=function(){
		$scope.$apply(function(){
			if($scope.username==""){
				$scope.test_style1="has-error";
			}
		})
		console.log($scope.rememberID)		
	}
	document.getElementById('username').onfocus=function(){
		$scope.test_style1="";
		$scope.error_username="";
	}
	document.getElementById('password').onblur=function(){
		$scope.$apply(function(){
			if($scope.password==""){
				$scope.test_style2="has-error";
			}
		})		
	}
	document.getElementById('password').onfocus=function(){
		$scope.test_style2="";
		$scope.error_password="";
	}
	$scope.login=function(){
		$timeout(function(){
			$scope.login_submit='登录中...';
		})
		if($scope.rememberID){
			localStorage.setItem('loginID',$scope.username);
			localStorage.setItem('loginPASS',$scope.password);
		}
		$http({
			url:Url.getUrl('login'),
			method:'post',
			data:{
				username:$scope.username,
				password:$scope.password
			},
			headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
		  	 transformRequest: function(obj) {  
		     var str = [];  
		     for(var p in obj){  
		       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		     }  
		     return str.join("&");  
		   	 }	
		}).success(function(data){
			Tip.Log(data.message);
			if(data.code==1){
				$state.go('home');
			}else{
				$timeout(function(){
					$scope.login_submit='登录';
				})
			}
		}).error(function(data){
			console.log(data);
			$timeout(function(){
				$scope.login_submit='登录';
			})
		})
		
	}
}])
angular.module('login.router',['login.ctrl'])
.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){
	$stateProvider
	.state('login',{
		url:'/login',
		templateUrl: 'views/login/login.html',
		controller:'loginCtrl'
	})
}])
angular.module('register.router',['register.ctrl'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('register',{
		url:'/register',
		templateUrl:'views/register/register.html',
		controller:"registerCtrl"
	})
	.state('register.step1',{
		url:'/1',
		templateUrl:'views/register/step1.html',
		controller:'registerStep1Ctrl'
	})
	.state('register.step2',{
		url:'/2',
		templateUrl:'views/register/step2.html',
		controller:'registerStep2Ctrl',
		params:{
			obj:null
		}
	})
	.state('register.step3',{
		url:'/3',
		templateUrl:'views/register/step3.html',
		controller:'registerStep3Ctrl',
		params:{
			obj:null
		}
	})
}])
angular.module('register.ctrl',['pubulic','data'])
.controller('registerCtrl',['$scope','Url','$http','$timeout','Tip','$state',function($scope,Url,$http,$timeout,Tip,$state){
	$scope.registerMsg={};
}])
.controller('registerStep1Ctrl',['$scope','Url','$http','$timeout','Tip','$state',function($scope,Url,$http,$timeout,Tip,$state){
	$scope.goNextStep=false;
	$scope.msg_yzm='';
	$scope.phonenum='';
	$scope.yzm_submit='发送验证码';
	$scope.goNext=false;
	$scope.submit_msg=function(){
		$timeout(function(){
			$scope.yzm_submit='已发送...';
		})
		$http({
			url:Url.getUrl('verifyNumber'),
			params:{
				"verifyField":'phone',
				"verifyValue":$scope.phonenum
			}
		}).then(function(msg){
			var data = msg.data;
			if(data.code==1){
				if(data.verifyResult==0){
					Tip.Log($scope,'手机号校验成功！',function(){
						$scope.goNext=true;
					});
				}else{
					Tip.Log($scope,'该手机号重复！',function(){
						document.getElementById("register_phonenumber").focus();
						$timeout(function(){
							$scope.yzm_submit='发送验证码';
						})
					});		
				}	
			}else{
				Tip.Log($scope,'失败'+data.code);
			}
		})
	}
	$scope.nextStep = function(){
		if($scope.goNext){
			if($scope.phonenumber){
				var promise=$http({
					url:Url.getUrl('verifySms'),
					params:{
						phone:$scope.phonenumber,
						SMScode:$scope.msg_yzm
					}
				}).then(function(msg){
					var data = msg.data;
					if(data.code==0){
						$state.go('.register.step2');
					}else{
						Tip.Alert('操作失败!');
					}
				})
				console.log(promise);
			}
			if($scope.phonenum){
				$scope.registerMsg.phone=$scope.phonenum;
				$state.go('register.step2',{
					obj:{
						phone:$scope.phonenum
					}
				});
			}
		}		
	}
}])
.controller('registerStep2Ctrl',['$scope','$timeout','$http','$stateParams','Tip','$state',function($scope,$timeout,$http,$stateParams,Tip,$state){
	$scope.email='';
	$scope.passWord = '';
	$scope.password_again = '';
	$scope.password_strong='';
	var ruo = /[0-9 a-z ]/;
	function check(str){
		return (/\d+/i.test(str) ? 1 : 0) + (/[a-z]+/i.test(str) ? 1 : 0) + ( str.replace(/\d+/g).replace(/[a-z]+/ig)=='undefined' ? 0 : 1);
	}
	document.getElementById('password').onfocus=function(){
		$timeout(function(){
			document.onkeydown=function(){
				var str = document.getElementById('password').value;
				switch(check(str)){
					case 0:
					 $scope.ruo='';
					 $scope.zhong='';
					 $scope.qiang=''; 
					 $scope.password_strong='';
					 break;
					case 1:
					 $scope.ruo='password_bg';
					 $scope.zhong='';
					 $scope.qiang=''; 
					 $scope.password_strong='弱';
					 break;
					case 2:
					 $scope.ruo='password_bg';
					 $scope.zhong='password_bg';
					 $scope.qiang=''; 
					 $scope.password_strong='中'; 
					 break;
					case 3:
					 $scope.ruo='password_bg';
					 $scope.zhong='password_bg';
					 $scope.qiang='password_bg'; 
					 $scope.password_strong='强';
					break;
				}
			}
		})
	}
	$scope.submitRegister=function(){
		if($scope.passWord!=$scope.password_again){
			Tip.Alert('确认密码不一致！');
			return false;
		}
		if($scope.passWord){
			$state.go('register.step3',{
				obj:{
					phone:$stateParams.obj.phone,
					email:$scope.email,
					password:$scope.passWord
				}
			})
		}
	}
}])
.controller('registerStep3Ctrl',['$scope','$timeout','$http','$stateParams','Url','Tip','$state',function($scope,$timeout,$http,$stateParams,Url,Tip,$state){
	console.log($stateParams);
	$scope.conSize=50;
	$scope.conName="";
	$scope.conWorld="";
	$scope.register=function(){
		var json = {
			userPrivateUrl:$scope.conWorld+'.cmcc.com',
			email:$stateParams.obj.email,
			phone:$stateParams.obj.phone,
			objectType:2,
			name:$scope.conName,
			companyScale:$scope.conSize,
			password:$stateParams.obj.password
		}
		$http({
			url:Url.getUrl('register'),
			method:'post',
			data:json
		}).success(function(data){
			console.log(data);
			if(data.code==1){
				Tip.Log($scope,"注册成功!",function(){
					$state.go('login');
				})
			}else{
				Tip.Log($scope,data.message);
			}
		})
	}
}])
angular.module('data',[])
.factory('Data',['$timeout',function($timeout){
	var data={
		kfData:
		{
			'title':'终端',
			'state':'.KF',
			'list':[
				{
					'title':'终端管理',
					'state':'.kfgl',
					'list':[
						{
							'title':'终端列表',
							'state':'.KF_KF_lb'
						},
						{
							'title':'添加终端',
							'state':'.KF_KF_addKfz'
						}
					]
				},
				{
					'title':'客户列表',
					'state':'.kfzgl',
					'list':[
						{
							'title':'客户列表',
							'state':'.KF_KFZ_lb'
						},
						{
							'title':'添加客户',
							'state':'.KF_KFZ_addKfz'
						}
					]
				}
			]				
		},
		flowData:
		{
			'title':'流向',
			'state':'.flow',
			'list':[
				{
					'title':'流向管理',
					'state':'.flowgl',
					'list':[
						{
							'title':'流向列表',
							'state':'.flow_flow_lb'
						},
						{
							'title':'导入流向',
							'state':'.flow_flow_addflow'
						}
					]
				},
				{
					'title':'结算管理',
					'state':'.settlement',
					'list':[
						
					]
				}
			]				
		},
	}
		
	return {
		getData:function(id){
			for(x in data){
				if(id==x){
					return data[x];
				}
			}
		},
		getChat:function(scope){
			chatServe.msg(scope);			
		}
	}
}])
.factory('Url',function(){
	var urlData={
		login:'api/login/login',//登陆
		zdList:'api/hosp/query/list',//终端列表
		queryZd:'api/hosp//query/one',//查询终端详情
		getAreasList:'api/zone/queryForAllZones',//获取大区列表
		getCityList:'api/zone/queryCityByZone',//获取城市列表
		bjZd:'api/hosp//update/one',//编辑终端信息
		addZd:'api/hosp/insert/one',//新增终端信息
		khList:'api/customer/query/list',//客户列表
		addKh:'api/customer/insert/one',//添加客户
		queryKh:'api/customer/query/one',//查询客户详情
		bjKh:'api/customer//update/one',//编辑客户信息
		flowList:'api/flow/query/list',//查询流向列表
		getsettlementList:'api/rebateProcess/list',//获取结算列表
		goSettlement:'api/rebateProcess/pay',//结算付款
		cancelSettlement:'api/rebateProcess/pay/cancel',//取消结算
		handleSettlement:'api/rebateProcess/deal',//结算处理
		uploadFlowFile:'api/upload/file',//上传结算文件
		importFlowFile:'api/flow/import',//导入流向文件

	}
	return {
		getUrl:function(url){
			for(i in urlData){
				if(url==i){
					 return urlData[i];
					// return "http://192.168.92.12:28074/"+urlData[i];
					//return "http://192.168.92.23:28074/"+urlData[i];
					//return "http://ykf.tunnel.qydev.com/"+urlData[i];
				}
			}
		}
	}
})

angular.module('addKf.ctrl',[])
.controller('addkfCtrl',['$rootScope',function($rootScopes){
	
}])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9hcHAuanMiLCJjb21tb24vY29tbW9uLmpzIiwiY29tbW9uL3BhZ2luYXRpb24uanMiLCJjb21tb24vcm91dGVyLmpzIiwiZmxvd3RvL2Zsb3ctY3RybC5qcyIsImZsb3d0by9mbG93LXJvdXRlci5qcyIsImhvbWUvaG9tZS1jdHJsLmpzIiwiaG9tZS9ob21lLWRhdGEuanMiLCJob21lL2hvbWUtcm91dGVyLmpzIiwia2Yva2YtY3RybC5qcyIsImtmL2tmLXJvdXRlci5qcyIsImxvZ2luL2xvZ2luLWN0cmwuanMiLCJsb2dpbi9sb2dpbi1yb3V0ZXIuanMiLCJyZWdpc3Rlci9yZWdpc3Rlci1yb3V0ZXIuanMiLCJyZWdpc3Rlci9yZWdpc3RlckN0cmwuanMiLCJjb21tb24vZGF0YS9kYXRhLmpzIiwia2Yva2ZnbC9hZGRLZi1jdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzloQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEhBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoXCJhcHBcIixbXCJ1aS5yb3V0ZXJcIiwncm91dGVyJywncHVidWxpYycsJ3RtLnBhZ2luYXRpb24nXSlcclxuLmRpcmVjdGl2ZSgnZGlhbG9nJyxmdW5jdGlvbigpe1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDonRUFDJyxcclxuXHRcdHRlbXBsYXRlVXJsOid2aWV3cy9jb21tb24vbW9kYWwuaHRtbCdcclxuXHR9XHJcbn0pXHJcbi5kaXJlY3RpdmUoJ3RpcGFsZXJ0JyxmdW5jdGlvbigpe1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDonRUFDJyxcclxuXHRcdHJlcGxhY2U6dHJ1ZSxcclxuXHRcdHRlbXBsYXRlOlwiPGRpdiBjbGFzcz0ndGlwLWFsZXJ0JyBuZy1zaG93PSd0aXBfYWxlcnRfc2hvdyc+XCIrXHJcblx0XHRcdFwiPGRpdiBjbGFzcz0ndGlwLWNvdmVyJz48L2Rpdj5cIitcclxuXHRcdFx0XCI8c3BhbiBuZy1iaW5kPSd0aXBfYWxlcnRfbXNnJyBuZy0+PC9zcGFuPlwiK1xyXG5cdFx0XCI8L2Rpdj5cIixcclxuXHRcdGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbWVudCxhdHRycyl7XHJcblx0XHRcdHNjb3BlLnRpcF9hbGVydF9zaG93PWZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxufSlcclxuLmRpcmVjdGl2ZSgndGlwTG9nJyxbJyRyb290U2NvcGUnLCckdGltZW91dCcsZnVuY3Rpb24oJHJvb3RTY29wZSwkdGltZW91dCl7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OidFQUMnLFxyXG5cdFx0cmVwbGFjZTp0cnVlLFxyXG5cdFx0dGVtcGxhdGU6XCI8ZGl2IGNsYXNzPSd0aXAtYWxlcnQnIG5nLXNob3c9J3RpcF9hbGVydF9zaG93Jz5cIitcclxuXHRcdFx0XCI8ZGl2IGNsYXNzPSd0aXAtY292ZXInPjwvZGl2PlwiK1xyXG5cdFx0XHRcIjxzcGFuIG5nLWJpbmQ9J3RpcF9hbGVydF9tc2cnIG5nLT48L3NwYW4+XCIrXHJcblx0XHRcIjwvZGl2PlwiLFxyXG5cdFx0bGluazpmdW5jdGlvbihzY29wZSxlbGVtZW50LGF0dHJzKXtcclxuXHRcdFx0c2NvcGUudGlwX2FsZXJ0X3Nob3c9ZmFsc2U7XHJcblx0XHRcdCRyb290U2NvcGUuJG9uKCd0aXBsb2cnLGZ1bmN0aW9uKGUsZGF0YSl7XHJcblx0XHRcdFx0aWYoZGF0YSYmdHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIil7XHJcblx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdyA9IHRydWU7XHJcblx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfbXNnID0gZGF0YTtcclxuXHRcdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHNjb3BlLnRpcF9hbGVydF9zaG93PWZhbHNlO1xyXG5cdFx0XHRcdFx0fSwyMDAwKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uZGlyZWN0aXZlKCdjaXR5cycsWydIdHRwJywnVXJsJyxmdW5jdGlvbihIdHRwLFVybCl7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OidFQUMnLFxyXG5cdFx0dGVtcGxhdGVVcmw6J2NpdHlzJyxcclxuXHRcdHNjb3BlOntcclxuXHRcdFx0YXJlYTonPW15QXJlYScsXHJcblx0XHRcdGNpdHk6Jz1teUNpdHknXHJcblx0XHR9LFxyXG5cdFx0bGluazpmdW5jdGlvbihzY29wZSxlbGUsYXR0cnMpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhhdHRycyk7XHJcblx0XHRcdHNjb3BlLiR3YXRjaCgnYXJlYScsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRIdHRwLmdldCh7XHJcblx0XHRcdFx0XHR1cmw6VXJsLmdldFVybCgnZ2V0Q2l0eUxpc3QnKSsnLycrc2NvcGUuYXJlYVxyXG5cdFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdFx0c2NvcGUuY2l0eUxpc3QgPSBkYXRhLmNpdGllcztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0XHR1cmw6VXJsLmdldFVybCgnZ2V0QXJlYXNMaXN0JylcclxuXHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHRzY29wZS5hcmVhc0xpc3QgPSBkYXRhLnpvbmVzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdwdWJ1bGljJyxbXSlcclxuLmZhY3RvcnkoJ0h0dHAnLFsnJGh0dHAnLCckc3RhdGUnLCckcm9vdFNjb3BlJyxmdW5jdGlvbigkaHR0cCwkc3RhdGUsJHJvb3RTY29wZSl7XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldDpmdW5jdGlvbihqc29uKXtcclxuXHRcdFx0dmFyIGRhdGEgPSBqc29uLnBhcmFtc3x8JycsdXJsID0ganNvbi51cmw7XHRcdFxyXG5cdFx0XHR2YXIgcHJvbWlzZSA9ICRodHRwKHtcclxuXHRcdFx0XHRtZXRob2Q6J2dldCcsXHJcblx0XHRcdFx0cGFyYW1zOmRhdGEsXHJcblx0XHRcdFx0dXJsOnVybFxyXG5cdFx0XHR9KVxyXG5cdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0XHRpZihtc2cuZGF0YS5jb2RlPT02NjY2KXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW5Db21wYW55Jyk7XHJcblx0XHRcdFx0fWVsc2UgaWYobXNnLmRhdGEuY29kZT09MjIyMil7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRwb3N0OmZ1bmN0aW9uKGpzb24pe1xyXG5cdFx0XHR2YXIgZGF0YSA9IGpzb24uZGF0YXx8JycsdXJsID0ganNvbi51cmw7XHJcblx0XHRcdHZhciBwcm9taXNlID0gJGh0dHAoe1xyXG5cdFx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRcdHVybDp1cmxcclxuXHRcdFx0fSlcclxuXHRcdFx0cHJvbWlzZS50aGVuKGZ1bmN0aW9uKG1zZyl7XHJcblx0XHRcdFx0aWYobXNnLmRhdGEuY29kZT09NjY2Nil7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2xvZ2luQ29tcGFueScpO1xyXG5cdFx0XHRcdH1lbHNlIGlmKG1zZy5kYXRhLmNvZGU9PTIyMjIpe1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHR9LFxyXG5cdFx0cG9zdEY6ZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdHZhciBkYXRhID0ganNvbi5kYXRhfHwnJyx1cmwgPSBqc29uLnVybDtcclxuXHRcdFx0dmFyIHByb21pc2UgPSAkaHR0cCh7XHJcblx0XHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LCAgXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcCBpbiBvYmopeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTsgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0XHRpZihtc2cuZGF0YS5jb2RlPT02NjY2KXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW5Db21wYW55Jyk7XHJcblx0XHRcdFx0fWVsc2UgaWYobXNnLmRhdGEuY29kZT09MjIyMil7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRieUZvcm06ZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdHZhciBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG5cdFx0XHRmLm1ldGhvZCA9IFwicG9zdFwiO1xyXG5cdFx0XHRmLmVuY3R5cGUgPSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjtcclxuXHRcdFx0Zi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdHNjb3BlID0ganNvbi5zY29wZXx8e307XHJcblx0XHRcdHZhciBmX2luID0ge307XHJcblx0XHRcdGlmKGpzb24uZGF0YSl7XHJcblx0XHRcdFx0Zm9yKHZhciBpIGluIGpzb24uZGF0YSl7XHJcblx0XHRcdFx0XHRmX2luW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHRcdFx0XHRcdGZfaW5baV0ubmFtZSA9IGk7XHJcblx0XHRcdFx0XHRmX2luW2ldLnZhbHVlID0ganNvbi5kYXRhW2ldO1xyXG5cdFx0XHRcdFx0Zi5hcHBlbmRDaGlsZChmX2luW2ldKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGZfaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblx0XHRcdGZfaS50eXBlID0gXCJmaWxlXCI7XHJcblx0XHRcdGZfaS5uYW1lID0ganNvbi5maWxlTmFtZXx8Jyc7XHJcblx0XHRcdGZfaS5hY2NlcHQgPSBqc29uLmFjY2VwdHx8Jyc7XHJcblx0XHRcdGZfaS5tdWx0aXBsZSA9IGpzb24ubXVsdGlwbGV8fCcnO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhmX2kpO1xyXG5cdFx0XHQoZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdFx0Zl9pLm9uY2hhbmdlID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRodHRwKHtcclxuXHRcdFx0XHRcdFx0dXJsOmpzb24udXJsLFxyXG5cdFx0XHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgRF9hdGEgPSBuZXcgRm9ybURhdGEoZik7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIERfYXRhXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdGRhdGEueWtmX2VfZmlsZSA9IGZfaS5maWxlc1swXTtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmKTtcclxuXHRcdFx0XHRcdFx0anNvbi5zdWNjZXNzJiZqc29uLnN1Y2Nlc3MoZGF0YSk7XHJcblx0XHRcdFx0XHR9KS5lcnJvcihmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdFx0anNvbi5zdWNjZXNzLmVycm9yJiZqc29uLnN1Y2Nlc3MuZXJyb3IoZSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkoanNvbilcclxuXHRcdFx0Zi5hcHBlbmRDaGlsZChmX2kpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGYpO1xyXG5cdFx0XHRmX2kuY2xpY2soKTtcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uZmFjdG9yeSgnVGlwJyxbJyR0aW1lb3V0JywnJHJvb3RTY29wZScsZnVuY3Rpb24oJHRpbWVvdXQsJHJvb3RTY29wZSl7XHJcblx0cmV0dXJuIHtcclxuXHRcdC8v5by556qX5o+Q56S677yM56ys5LiA5Liq5Y+C5pWw5Li65o+Q56S65YaF5a6577yM6Iul5pS55Y+YdGl0bGXlkozlrr3luqbnrKzkuIDkuKrlj4LmlbDpnIDkvKDlkKvmnIl0aXRsZeWSjG1zZ+S4pOS4quWPguaVsOeahOWvueixoVxyXG5cdFx0Ly/nrKzkuozlj4LmlbDkuLrlm57osIPlh73mlbBcclxuXHRcdEFsZXJ0OmZ1bmN0aW9uKG1hc3NhZ2UsY2FsbGJhY2spe1xyXG5cdFx0XHR2YXIgZGlhbG9nVGl0LGRpYWxvZ01zZyxkaWFsb2dXaWR0aDtcclxuXHRcdFx0aWYodHlwZW9mIG1hc3NhZ2UgPT0nb2JqZWN0Jyl7XHJcblx0XHRcdFx0ZGlhbG9nVGl0ID0gbWFzc2FnZS50aXRsZT9tYXNzYWdlLnRpdGxlOifmnaXoh6onK3dpbmRvdy5sb2NhdGlvbi5ob3N0KyfnmoTmj5DnpLonO1xyXG5cdFx0XHRcdGRpYWxvZ01zZyA9IG1hc3NhZ2UubXNnP21hc3NhZ2UubXNnOicnO1xyXG5cdFx0XHRcdGRpYWxvZ1dpZHRoID0gbWFzc2FnZS53aWR0aD9tYXNzYWdlLndpZHRoOmZhbHNlO1xyXG5cdFx0XHR9ZWxzZSBpZih0eXBlb2YgbWFzc2FnZSA9PSdzdHJpbmcnKXtcclxuXHRcdFx0XHRkaWFsb2dUaXQgPSAn5p2l6IeqJyt3aW5kb3cubG9jYXRpb24uaG9zdCsn55qE5o+Q56S6JztcclxuXHRcdFx0XHRkaWFsb2dNc2cgPSBtYXNzYWdlO1xyXG5cdFx0XHR9XHJcblx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS5oaWRlKCk7XHJcblx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnRleHQoJ+ehruiupCcpO1xyXG5cdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS50ZXh0KGRpYWxvZ1RpdCk7XHJcblx0XHRcdCQoJyNkaWFsb2dNc2cnKS50ZXh0KGRpYWxvZ01zZyk7XHJcblx0XHRcdCQoJyNteURpYWxvZycpLm9uZSgnaGlkZGVuLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGNhbGxiYWNrJiZjYWxsYmFjaygpO1xyXG5cdFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnRleHQoJ+WPlua2iCcpO1xyXG5cdFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS5zaG93KCk7XHJcblx0XHRcdFx0JCgnLm1vZGFsLWNvbnRlbnQnKS5hdHRyKFwic3R5bGVcIixcIlwiKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmKGRpYWxvZ1dpZHRoKSAkKCcubW9kYWwtY29udGVudCcpLmNzcyh7d2lkdGg6cGFyc2VJbnQod2lkdGgpLG1hcmdpbjonMCBhdXRvJ30pO1xyXG5cdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCh7XHJcblx0XHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnXHJcblx0XHRcdH0pXHJcblx0XHR9LFxyXG5cdFx0Ly/lr7nor53moYbvvIzkvKDlj4LkuLrlr7nor53kv6Hmga/vvIznoa7orqTkuYvlkI7nmoTliqjkvZzvvIzlhbPpl63kuYvlkI7nmoTliqjkvZxcclxuXHRcdENvbmZpcm06ZnVuY3Rpb24obWFzc2FnZSxjYWxsYmFjazEsY2FsbGJhY2syKXtcclxuXHRcdFx0dmFyIGRpYWxvZ1RpdCxkaWFsb2dNc2csZGlhbG9nV2lkdGg7XHJcblx0XHRcdGlmKHR5cGVvZiBtYXNzYWdlID09J29iamVjdCcpe1xyXG5cdFx0XHRcdGRpYWxvZ1RpdCA9IG1hc3NhZ2UudGl0bGU/bWFzc2FnZS50aXRsZTon5p2l6IeqJyt3aW5kb3cubG9jYXRpb24uaG9zdCsn55qE5o+Q56S6JztcclxuXHRcdFx0XHRkaWFsb2dNc2cgPSBtYXNzYWdlLm1zZz9tYXNzYWdlLm1zZzonJztcclxuXHRcdFx0XHRkaWFsb2dXaWR0aCA9IG1hc3NhZ2Uud2lkdGg/bWFzc2FnZS53aWR0aDpmYWxzZTtcclxuXHRcdFx0fWVsc2UgaWYodHlwZW9mIG1hc3NhZ2UgPT0nc3RyaW5nJyl7XHJcblx0XHRcdFx0ZGlhbG9nVGl0ID0gJ+adpeiHqicrd2luZG93LmxvY2F0aW9uLmhvc3QrJ+eahOaPkOekuic7XHJcblx0XHRcdFx0ZGlhbG9nTXNnID0gbWFzc2FnZTtcclxuXHRcdFx0fVxyXG5cdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS50ZXh0KGRpYWxvZ1RpdCk7XHJcblx0XHRcdCQoJyNkaWFsb2dNc2cnKS50ZXh0KGRpYWxvZ01zZyk7XHJcblx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRjYWxsYmFjazImJmNhbGxiYWNrMigpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQkKCcjZGlhbG9nQ2xvc2VUJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcblx0XHRcdH0pXHJcblx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRjYWxsYmFjazEmJmNhbGxiYWNrMSgpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQkKCcjbXlEaWFsb2cnKS5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcblx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlVCcpLnVuYmluZCgnY2xpY2snKTtcclxuXHRcdFx0XHQkKCcjZGlhbG9nQ2hhbmdlJykudW5iaW5kKCdjbGljaycpO1xyXG5cdFx0XHRcdCQoJy5tb2RhbC1jb250ZW50JykuYXR0cihcInN0eWxlXCIsXCJcIik7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihkaWFsb2dXaWR0aCkgJCgnLm1vZGFsLWNvbnRlbnQnKS5jc3Moe3dpZHRoOnBhcnNlSW50KGRpYWxvZ1dpZHRoKSxtYXJnaW46JzAgYXV0byd9KTtcclxuXHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoe1xyXG5cdFx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJ1xyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHRcdENoZWNrOmZ1bmN0aW9uKGNhbGxiYWNrMSxjYWxsYmFjazIpe1xyXG5cdFx0XHR2YXIgZGlhbG9nVGl0LGRpYWxvZ01zZyxkaWFsb2dXaWR0aD00MDA7XHJcblx0XHRcdGRpYWxvZ01zZz0nPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+JytcclxuXHRcdFx0XHRcdCAgICAnPGxhYmVsPicrXHJcblx0XHRcdFx0XHQgICAgICAnPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJzcVwiIHZhbHVlPVwia2Z6XCIgY2xhc3M9XCJ3ZWNoYXRfcmFkaW9cIj4g5YWs5LyX5Y+35byA5Y+R6ICF5o6I5p2DJytcclxuXHRcdFx0XHRcdCAgICAnPC9sYWJlbD4nK1xyXG5cdFx0XHRcdFx0ICAnPC9kaXY+JytcclxuXHRcdFx0XHRcdCAgJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicrXHJcblx0XHRcdFx0XHQgICAgJzxsYWJlbD4nK1xyXG5cdFx0XHRcdFx0ICAgICAgJzxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwic3FcIiB2YWx1ZT1cInB0XCIgY2xhc3M9XCJ3ZWNoYXRfcmFkaW9cIj4g5YWs5LyX5Y+356ys5LiJ5pa55bmz5Y+w5o6I5p2DJytcclxuXHRcdFx0XHRcdCAgICAnPC9sYWJlbD4nK1xyXG5cdFx0XHRcdFx0ICAnPC9kaXY+JztcclxuXHRcdFx0ZGlhbG9nVGl0PSfpgInmi6nnu5HlrprmlrnlvI8nO1xyXG5cdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS5odG1sKGRpYWxvZ1RpdCk7XHJcblx0XHRcdCQoJyNkaWFsb2dNc2cnKS5odG1sKGRpYWxvZ01zZyk7XHJcblx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRjYWxsYmFjazImJmNhbGxiYWNrMigpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQkKCcjZGlhbG9nQ2xvc2VUJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcblx0XHRcdH0pXHJcblx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRjYWxsYmFjazEmJmNhbGxiYWNrMSgpO1xyXG5cdFx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLmh0bWwoJycpO1xyXG5cdFx0XHRcdCQoJyNkaWFsb2dNc2cnKS5odG1sKCcnKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0JCgnI215RGlhbG9nJykub25lKCdoaWRkZW4uYnMubW9kYWwnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudW5iaW5kKCdjbGljaycpO1xyXG5cdFx0XHRcdCQoJyNkaWFsb2dDbG9zZVQnKS51bmJpbmQoJ2NsaWNrJyk7XHJcblx0XHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnVuYmluZCgnY2xpY2snKTtcclxuXHRcdFx0XHQkKCcubW9kYWwtY29udGVudCcpLmF0dHIoXCJzdHlsZVwiLFwiXCIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYoZGlhbG9nV2lkdGgpICQoJy5tb2RhbC1jb250ZW50JykuY3NzKHt3aWR0aDpwYXJzZUludChkaWFsb2dXaWR0aCksbWFyZ2luOicwIGF1dG8nfSk7XHJcblx0XHRcdCQoJyNteURpYWxvZycpLm1vZGFsKHtcclxuXHRcdFx0XHRiYWNrZHJvcDogJ3N0YXRpYydcclxuXHRcdFx0fSlcclxuXHRcdH0sXHJcblx0XHRDaGVja2JveDpmdW5jdGlvbihjYWxsYmFjazEsY2FsbGJhY2syKXtcclxuXHRcdFx0dmFyIGRpYWxvZ1RpdCxkaWFsb2dNc2csZGlhbG9nV2lkdGg9NDAwO1xyXG5cdFx0XHRkaWFsb2dNc2c9JzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicrXHJcblx0XHRcdFx0XHQgICAgJzxsYWJlbD4nK1xyXG5cdFx0XHRcdFx0ICAgICAgJzxzcGFuIGNsYXNzPVwiQWNjZXB0bmFtZVwiPuWPl+eQhuWuouacjee7hO+8mjwvc3Bhbj4nKyc8c2VsZWN0IG5hbWU9XCJcIiBjbGFzcz1cIkFjY2VwdGtmXCI+JysnPG9wdGlvbiB2YWx1ZT1cIuWPl+eQhuWuouacjee7hFwiPuWPl+eQhuWuouacjee7hDwvb3B0aW9uPicrJzxsZWN0PicrXHJcblx0XHRcdFx0XHQgICAgJzwvbGFiZWw+JytcclxuXHRcdFx0XHRcdCAgJzwvZGl2PicrXHJcblx0XHRcdFx0XHQgICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nK1xyXG5cdFx0XHRcdFx0ICAgICc8bGFiZWw+JytcclxuXHRcdFx0XHRcdCAgICAgICc8c3BhbiBjbGFzcz1cIkFjY2VwdG5hbWVcIj7lj5fnkIblrqLmnI3vvJo8L3NwYW4+JysnPHNlbGVjdCBuYW1lPVwiXCIgY2xhc3M9XCJBY2NlcHRrZlwiPicrJzxvcHRpb24gdmFsdWU9XCLlj5fnkIblrqLmnI1cIj7lj5fnkIblrqLmnI08L29wdGlvbj4nKyc8bGVjdD4nK1xyXG5cdFx0XHRcdFx0ICAgICc8L2xhYmVsPicrXHJcblx0XHRcdFx0XHQgICc8L2Rpdj4nO1xyXG5cdFx0XHRkaWFsb2dUaXQ9J+i9rOenu+W3peWNlSc7XHJcblx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLmh0bWwoZGlhbG9nVGl0KTtcclxuXHRcdFx0JCgnI2RpYWxvZ01zZycpLmh0bWwoZGlhbG9nTXNnKTtcclxuXHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcblx0XHRcdH0pXHJcblx0XHRcdCQoJyNkaWFsb2dDbG9zZVQnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Y2FsbGJhY2syJiZjYWxsYmFjazIoKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRcdGNhbGxiYWNrMSYmY2FsbGJhY2sxKCk7XHJcblx0XHRcdFx0JCgnI2RpYWxvZ1RpdGxlJykuaHRtbCgnJyk7XHJcblx0XHRcdFx0JCgnI2RpYWxvZ01zZycpLmh0bWwoJycpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQkKCcjbXlEaWFsb2cnKS5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcblx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlVCcpLnVuYmluZCgnY2xpY2snKTtcclxuXHRcdFx0XHQkKCcjZGlhbG9nQ2hhbmdlJykudW5iaW5kKCdjbGljaycpO1xyXG5cdFx0XHRcdCQoJy5tb2RhbC1jb250ZW50JykuYXR0cihcInN0eWxlXCIsXCJcIik7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihkaWFsb2dXaWR0aCkgJCgnLm1vZGFsLWNvbnRlbnQnKS5jc3Moe3dpZHRoOnBhcnNlSW50KGRpYWxvZ1dpZHRoKSxtYXJnaW46JzAgYXV0byd9KTtcclxuXHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoe1xyXG5cdFx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJ1xyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHRcdExvZzpmdW5jdGlvbihtc2csY2Ipe1xyXG5cdFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3RpcGxvZycsbXNnKTtcclxuXHRcdFx0Y2ImJmNiKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XSlcclxuLy/liJfooajmn6Xor6LmnI3liqHlsIHoo4VcclxuLmZhY3RvcnkoJ0dldExpc3QnLFsnJGh0dHAnLCckdGltZW91dCcsJ1RpcCcsZnVuY3Rpb24oJGh0dHAsJHRpbWVvdXQsVGlwKXtcclxuXHRyZXR1cm57IEdldDpmdW5jdGlvbihvcHQpe1xyXG5cdFx0XHR2YXIgdXJsID0gb3B0LnVybDtcclxuXHRcdFx0dmFyIGRhdGEgPSBvcHQuZGF0YTtcclxuXHRcdFx0dmFyIHNjb3BlID0gb3B0LnNjb3BlO1xyXG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBvcHQuc3VjY2VzcztcclxuXHRcdFx0c2NvcGUucGFnU2hvdz1mYWxzZTtcclxuXHRcdFx0c2NvcGUucGFnaW5hdGlvbkNvbmYgPSB7XHJcblx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHQgICAgICAgIGN1cnJlbnRQYWdlOiAxLC8v6buY6K6k6aG1XHJcblx0XHQgICAgICAgIHRvdGFsSXRlbXM6IDgwLC8v5oC76aG15pWwXHJcblx0XHQgICAgICAgIGl0ZW1zUGVyUGFnZTogMTAsLy/mr4/pobXlsZXnpLrmlbDmja7mnaHmlbAg6buY6K6kMTXmnaFcclxuXHRcdCAgICAgICAgcGFnZXNMZW5ndGg6IDE1LC8v5YiG6aG15p2h55uu6ZW/5bqmXHJcblx0XHQgICAgICAgIHBlclBhZ2VPcHRpb25zOiBbNSwgMTAsIDIwXSxcclxuXHRcdCAgICAgICAgaW5pdDp0cnVlLFxyXG5cdFx0ICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZm4pe1xyXG5cdFx0ICAgICAgICBcdHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT1zY29wZS5wYWdpbmF0aW9uQ29uZi5jdXJyZW50UGFnZTtcclxuXHRcdCAgICAgICAgXHRzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2VTaXplPXNjb3BlLnBhZ2luYXRpb25Db25mLml0ZW1zUGVyUGFnZTtcclxuXHRcdCAgICAgICAgXHRpZih0aGlzLmluaXQ9PXRydWUpe1xyXG5cdFx0ICAgICAgICBcdFx0dGhpcy5pbml0PWZhbHNlO1xyXG5cdFx0ICAgICAgICBcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0ICAgICAgICBcdH1cclxuXHRcdCBcdFx0XHQkaHR0cCh7XHJcblx0XHQgXHRcdFx0XHR1cmw6c2NvcGUucGFnaW5hdGlvbkNvbmYudXJsLFxyXG5cdFx0IFx0XHRcdFx0cGFyYW1zOnNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGFcclxuXHRcdCBcdFx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0IFx0XHRcdFx0aWYoIWRhdGEuY29kZT09MSl7XHJcblx0XHQgXHRcdFx0XHRcdFRpcC5BbGVydChkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0IFx0XHRcdFx0fVxyXG5cdFx0IFx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdCBcdFx0XHRcdFx0c2NvcGUuZGF0YT1kYXRhO1xyXG5cdFx0IFx0XHRcdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZi50b3RhbEl0ZW1zPWRhdGEudG90YWxDb3VudDtcclxuXHRcdCBcdFx0XHRcdFx0Y2FsbGJhY2smJmNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0IFx0XHRcdFx0fSlcclxuXHRcdCBcdFx0XHR9KS5lcnJvcihmdW5jdGlvbihlKXtcclxuXHRcdCBcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0IFx0XHRcdH0pXHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9O1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT0xO1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZVNpemU9MTA7XHJcblx0XHQgICAgJGh0dHAoe1xyXG5cdFx0ICAgIFx0dXJsOnVybCxcclxuXHRcdCAgICBcdHBhcmFtczpzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhXHJcblx0XHQgICAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdCAgICBcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHQgICAgXHRcdHNjb3BlLnBhZ1Nob3c9dHJ1ZTtcclxuXHRcdCAgICBcdFx0c2NvcGUuZGF0YT1kYXRhO1xyXG4gXHRcdFx0XHRcdHNjb3BlLnBhZ2luYXRpb25Db25mLnRvdGFsSXRlbXM9ZGF0YS50b3RhbENvdW50O1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrJiZjYWxsYmFjayhkYXRhKTtcclxuXHRcdCAgICBcdH0pXHJcblx0XHQgICAgfSlcclxuXHRcdH0sXHJcblx0XHRQb3N0OmZ1bmN0aW9uKG9wdCl7XHJcblx0XHRcdHZhciB1cmwgPSBvcHQudXJsO1xyXG5cdFx0XHR2YXIgZGF0YSA9IG9wdC5kYXRhO1xyXG5cdFx0XHR2YXIgc2NvcGUgPSBvcHQuc2NvcGU7XHJcblx0XHRcdHZhciBjYWxsYmFjayA9IG9wdC5zdWNjZXNzO1xyXG5cdFx0XHRzY29wZS5wYWdTaG93PWZhbHNlO1xyXG5cdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZiA9IHtcclxuXHRcdFx0XHR1cmw6dXJsLFxyXG5cdFx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdCAgICAgICAgY3VycmVudFBhZ2U6IDEsLy/pu5jorqTpobVcclxuXHRcdCAgICAgICAgdG90YWxJdGVtczogODAsLy/mgLvpobXmlbBcclxuXHRcdCAgICAgICAgaXRlbXNQZXJQYWdlOiAxMCwvL+avj+mhteWxleekuuaVsOaNruadoeaVsCDpu5jorqQxNeadoVxyXG5cdFx0ICAgICAgICBwYWdlc0xlbmd0aDogMTUsLy/liIbpobXmnaHnm67plb/luqZcclxuXHRcdCAgICAgICAgcGVyUGFnZU9wdGlvbnM6IFs1LCAxMCwgMjBdLFxyXG5cdFx0ICAgICAgICBpbml0OnRydWUsXHJcblx0XHQgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihmbil7XHJcblx0XHQgICAgICAgIFx0c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YS5wYWdlPXNjb3BlLnBhZ2luYXRpb25Db25mLmN1cnJlbnRQYWdlO1xyXG5cdFx0ICAgICAgICBcdHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZVNpemU9c2NvcGUucGFnaW5hdGlvbkNvbmYuaXRlbXNQZXJQYWdlO1xyXG5cdFx0ICAgICAgICBcdGlmKHRoaXMuaW5pdD09dHJ1ZSl7XHJcblx0XHQgICAgICAgIFx0XHR0aGlzLmluaXQ9ZmFsc2U7XHJcblx0XHQgICAgICAgIFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHQgICAgICAgIFx0fVxyXG5cdFx0IFx0XHRcdCRodHRwKHtcclxuXHRcdCBcdFx0XHRcdHVybDp1cmwsXHJcblx0XHQgXHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0IFx0XHRcdFx0ZGF0YTpzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLFxyXG5cdFx0IFx0XHRcdFx0aGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSwgIFxyXG5cdFx0ICAgICAgICAgICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGZ1bmN0aW9uKG9iaikgeyAgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTsgIFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHAgaW4gb2JqKXsgIFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW3BdKSk7ICBcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgfSAgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHIuam9pbihcIiZcIik7ICBcclxuXHRcdCAgICAgICAgICAgICAgICB9XHJcblx0XHQgXHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdCBcdFx0XHRcdGlmKCFkYXRhLmNvZGU9PTEpe1xyXG5cdFx0IFx0XHRcdFx0XHRUaXAuQWxlcnQoZGF0YS5tZXNzYWdlKTtcclxuXHRcdCBcdFx0XHRcdH1cclxuXHRcdCBcdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHQgXHRcdFx0XHRcdHNjb3BlLnBhZ1Nob3c9dHJ1ZTtcclxuXHRcdCBcdFx0XHRcdFx0c2NvcGUuZGF0YT1kYXRhO1xyXG5cdFx0IFx0XHRcdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZi50b3RhbEl0ZW1zPWRhdGEudG90YWxDb3VudDtcclxuXHRcdCBcdFx0XHRcdFx0Y2FsbGJhY2smJmNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0IFx0XHRcdFx0fSlcclxuXHRcdCBcdFx0XHR9KS5lcnJvcihmdW5jdGlvbihlKXtcclxuXHRcdCBcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0IFx0XHRcdH0pXHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9O1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT0xO1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZVNpemU9MTA7XHJcblx0XHQgICAgJGh0dHAoe1xyXG5cdFx0ICAgIFx0dXJsOnVybCxcclxuXHRcdCAgICBcdG1ldGhvZDoncG9zdCcsXHJcblx0XHQgICAgXHRkYXRhOnNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEsXHJcblx0XHQgICAgXHRoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LCAgXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcCBpbiBvYmopeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTsgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0ICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQgICAgXHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0ICAgIFx0XHRzY29wZS5wYWdTaG93PXRydWU7XHJcblx0XHQgICAgXHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuIFx0XHRcdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZi50b3RhbEl0ZW1zPWRhdGEudG90YWxDb3VudDtcclxuIFx0XHRcdFx0XHRjYWxsYmFjayYmY2FsbGJhY2soZGF0YSk7XHJcblx0XHQgICAgXHR9KVxyXG5cdFx0ICAgIH0pXHJcblx0XHR9XHJcblx0fVxyXG59XSlcclxuLmZhY3RvcnkoJ1Rlc3RDaGF0JyxmdW5jdGlvbigpe1xyXG5cdHZhciBtc2cgPXtcclxuXHRcdFxyXG5cdH1cclxuXHRyZXR1cm4ge1xyXG5cdFx0Y2hhdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cclxuXHRcdFx0fSwzMDAwKVxyXG5cdFx0fVxyXG5cdH1cclxufSlcclxuLmZhY3RvcnkoJ2dyb3Vwc1JvbGVzJyxbJyRodHRwJywnVXJsJywnJHRpbWVvdXQnLGZ1bmN0aW9uKCRodHRwLFVybCwkdGltZW91dCl7Ly/ojrflj5bmiYDmnInlrqLmnI3nu4Tku6Xlj4rop5LoibLliJfooajvvIjml6DliIbpobXvvIlcclxuXHQvL+e8k+WtmOaJgOacieWuouacjee7hOWSjOinkuiJsueahHByb21pc2Xlr7nosaFcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0OmZ1bmN0aW9uKHNjb3BlLGNiMSxjYjIpey8vY2Ix5Li66I635Y+W5a6i5pyN57uE55qE5Zue6LCD5Ye95pWwLGNiMuS4uuiOt+WPluinkuiJsuWIl+ihqOeahOWbnuiwg+WHveaVsFxyXG5cdFx0XHR2YXIgcHJvMSA9ICRodHRwKHtcclxuXHRcdFx0XHR1cmw6VXJsLmdldFVybCgnYWxsR3JvdXBzJyksXHJcblx0XHRcdFx0cGFyYW1zOntcclxuXHRcdFx0XHRcdHVzZXJQcml2YXRlVXJsOnNjb3BlLnVzZXJQcml2YXRlVXJsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZT09MSl7XHJcblx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRzY29wZS5ncm91cERhdGE9ZGF0YS5ncm91cHM7XHJcblx0XHRcdFx0XHRcdGNiMSYmY2IxKCk7XHJcblx0XHRcdFx0XHR9KVx0XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ+iOt+WPluWuouacjee7hOaVsOaNruWksei0pScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0dmFyIHBybzIgPSAkaHR0cCh7XHJcblx0XHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FsbFJvbGVzJyksXHJcblx0XHRcdFx0cGFyYW1zOntcclxuXHRcdFx0XHRcdHVzZXJQcml2YXRlVXJsOnNjb3BlLnVzZXJQcml2YXRlVXJsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZT09MSl7XHJcblx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRzY29wZS5yb2xlRGF0YT1kYXRhLnJvbGVzO1xyXG5cdFx0XHRcdFx0XHRjYjImJmNiMigpO1xyXG5cdFx0XHRcdFx0fSlcdFx0XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ+iOt+WPluinkuiJsuaVsOaNruWksei0pScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblx0XHRcdFxyXG59XSlcclxuLmZhY3RvcnkoJ2luZGV4ZWREQicsZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBvcGVuREIgKG15REIsc2NvcGUsY2IpIHsvL+aJk+W8gOiBiuWkqeaVsOaNruW6k1xyXG5cdFx0aWYoc2NvcGUuREIpey8v5Yik5pat5piv5ZCm5Zyoc2NvcGXkuK3nvJPlrZjkuoZEQuWvueixoSzlpoLmnpznvJPlrZjkuobvvIzlsLHlsIblr7nosaHnmoRyZXN1bHTotYvnu5lteURCLmRiXHJcblx0XHRcdG15REIuZGIgPSBzY29wZS5EQi5yZXN1bHQ7XHJcblx0XHRcdGNiJiZjYigpO1xyXG5cdFx0fWVsc2V7Ly/lpoLmnpzmnKrnvJPlrZhEQuWvueixoe+8jOaIluiAheS4juaVsOaNruW6k+eahOmTvuaOpeS4reaWre+8jOWImemHjeaWsOaJk+W8gOaVsOaNruW6k1xyXG5cdFx0XHR2YXIgdmVyc2lvbj1teURCLnZlcnNpb24gfHwgMTtcclxuXHRcdFx0c2NvcGUuREI9e307XHJcblx0ICAgICAgICBzY29wZS5EQj13aW5kb3cuaW5kZXhlZERCLm9wZW4obXlEQi5uYW1lLHZlcnNpb24pOy8v5omT5byA5pWw5o2u5bqTXHJcblx0ICAgICAgICBzY29wZS5EQi5vbmVycm9yPWZ1bmN0aW9uKGUpe1xyXG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldC5lcnJvci5tZXNzYWdlKTtcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgICBzY29wZS5EQi5vbnN1Y2Nlc3M9ZnVuY3Rpb24oZSl7XHJcblx0ICAgICAgICBcdHNjb3BlLkRCLnJlc3VsdD1lLnRhcmdldC5yZXN1bHQ7XHJcblx0ICAgICAgICAgICAgbXlEQi5kYj1lLnRhcmdldC5yZXN1bHQ7XHJcblx0ICAgICAgICAgICAgY2ImJmNiKCk7XHJcblx0ICAgICAgICB9O1xyXG5cdCAgICAgICAgc2NvcGUuREIub251cGdyYWRlbmVlZGVkPWZ1bmN0aW9uKGUpe1xyXG5cdCAgICAgICAgICAgIHZhciBkYj1lLnRhcmdldC5yZXN1bHQ7XHJcblx0ICAgICAgICAgICAgaWYoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMobXlEQi5uYW1lKSl7XHJcblx0ICAgICAgICAgICAgICAgIHZhciBzdG9yZT1kYi5jcmVhdGVPYmplY3RTdG9yZShteURCLm5hbWUse2tleVBhdGg6IFwibXNnSWRcIn0pOy8v56ys5LiA5qyh5Yib5bu65pWw5o2u6KGo77yM6KGo5ZCN5LiO5pWw5o2u5bqT5ZCN55u45ZCMXHJcblx0ICAgICAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KCdjaGF0SWRJbmRleCcsJ2NoYXRJZCcse3VuaXF1ZTpmYWxzZX0pOyBcclxuXHQgICAgICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ3RvSWRJbmRleCcsJ3RvSWQnLHt1bmlxdWU6ZmFsc2V9KTtcclxuXHQgICAgICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ2Zyb21JZEluZGV4JywnZnJvbUlkJyx7dW5pcXVlOmZhbHNlfSk7XHJcblx0ICAgICAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KCd0aW1lSW5kZXgnLCd0aW1lJyx7dW5pcXVlOmZhbHNlfSk7XHJcblx0ICAgICAgICAgICAgXHRjb25zb2xlLmxvZygnREIgdmVyc2lvbiBjaGFuZ2VkIHRvICcrdmVyc2lvbik7XHJcblx0ICAgICAgICBcdH07XHJcblx0ICAgICAgICB9XHJcblx0XHR9XHJcblx0ICAgICAgICBcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNsb3NlREIoZGIpey8v5YWz6Zet6IGK5aSp5pWw5o2u5bqTXHJcbiAgICAgICAgZGIuY2xvc2UoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldERhdGFCeUluZGV4KGRiLHN0b3JlTmFtZSxpbmRleFR5cGUseCxzY29wZSxjYil7Ly/pgJrov4dpbmRleOafpeivolxyXG4gICAgICAgIHZhciB0cmFuc2FjdGlvbj1kYi50cmFuc2FjdGlvbihzdG9yZU5hbWUpO1xyXG4gICAgICAgIHZhciBzdG9yZT10cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHN0b3JlLmluZGV4KGluZGV4VHlwZSk7XHJcbiAgICAgICAgdmFyIHJlcXVlc3Q9aW5kZXgub3BlbkN1cnNvcihJREJLZXlSYW5nZS5vbmx5KHgpKTtcclxuICAgICAgICBzY29wZS5kYlF1ZXJ5RGF0YSA9IFtdOy8v5Zyoc2NvcGUuZGJRdWVyeURhdGHkuK3lrZjlgqjmlbDmja5cclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IG51bGw7XHJcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3M9ZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHZhciBjdXJzb3I9ZS50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgICBpZihjdXJzb3Ipe1xyXG4gICAgICAgICAgICAgICAgdmFyIGpzb249Y3Vyc29yLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuZGJRdWVyeURhdGEucHVzaChqc29uKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgXHRjYiYmY2IoKTsvL+aJp+ihjOWbnuiwg+WHveaVsFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYWRkRGF0YShteURCLGRhdGEsY2Ipey8v5re75Yqg5pWw5o2uLGRhdGHlv4XpobvkuLpBcnJheeexu+Wei1xyXG4gICAgICAgIHZhciB0cmFuc2FjdGlvbj1teURCLmRiLnRyYW5zYWN0aW9uKG15REIubmFtZSwncmVhZHdyaXRlJyk7IFxyXG4gICAgICAgIHZhciBzdG9yZT10cmFuc2FjdGlvbi5vYmplY3RTdG9yZShteURCLm5hbWUpOyBcclxuICAgICAgICBmb3IodmFyIGk9MDtpPGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZChkYXRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2ImJmNiKCk7Ly/lhajpg6jmlbDmja7mt7vliqDlrozmiJDlkI7miafooYzlm57osINcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZURhdGFCeUtleShteURCLHZhbHVlKXsvL+agueaNruS/neWtmOeahOmUruWAvOWIoOmZpOaVsOaNrlxyXG4gICAgICAgIHZhciB0cmFuc2FjdGlvbj1teURCLmRiLnRyYW5zYWN0aW9uKG15REIubmFtZSwncmVhZHdyaXRlJyk7IFxyXG4gICAgICAgIHZhciBzdG9yZT10cmFuc2FjdGlvbi5vYmplY3RTdG9yZShteURCLm5hbWUpOyBcclxuICAgICAgICBzdG9yZS5kZWxldGUodmFsdWUpOyBcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICBcdGluaXQ6ZnVuY3Rpb24oc2NvcGUsY2Ipey8v5Yid5aeL5YyW5pWw5o2u5bqTXHJcbiAgICBcdFx0dmFyIG15REIgPSB7XHJcbiAgICBcdFx0XHRuYW1lOlwiY2hhdE1zZ1wiLFxyXG4gICAgXHRcdFx0ZGI6bnVsbCxcclxuICAgIFx0XHRcdHZlcnNpb246MVxyXG4gICAgXHRcdH1cclxuXHRcdFx0b3BlbkRCIChteURCLHNjb3BlLGNiKVxyXG4gICAgXHR9LFxyXG4gICAgXHRnZXQ6ZnVuY3Rpb24oc2NvcGUsY2hhdElkLGNiKXsvL+iOt+WPluaVsOaNrlxyXG4gICAgXHRcdHZhciBteURCID0ge1xyXG4gICAgXHRcdFx0bmFtZTpcImNoYXRNc2dcIixcclxuICAgIFx0XHRcdGRiOm51bGwsXHJcbiAgICBcdFx0XHR2ZXJzaW9uOjFcclxuICAgIFx0XHR9XHJcbiAgICBcdFx0b3BlbkRCKG15REIsc2NvcGUsZnVuY3Rpb24oKXtcclxuICAgIFx0XHRcdGdldERhdGFCeUluZGV4KG15REIuZGIsbXlEQi5uYW1lLFwiY2hhdElkSW5kZXhcIixjaGF0SWQsc2NvcGUsY2IpO1xyXG4gICAgXHRcdH0pXHJcbiAgICBcdH0sXHJcbiAgICBcdGFkZDpmdW5jdGlvbihzY29wZSxkYXRhLGNiKXsvL+a3u+WKoOaVsOaNru+8jOWPguaVsGRhdGHlv4XpobvkuLpBcnJheeexu+Wei+aVsOaNrlxyXG4gICAgXHRcdHZhciBteURCID0ge1xyXG4gICAgXHRcdFx0bmFtZTpcImNoYXRNc2dcIixcclxuICAgIFx0XHRcdGRiOm51bGwsXHJcbiAgICBcdFx0XHR2ZXJzaW9uOjFcclxuICAgIFx0XHR9XHJcbiAgICBcdFx0b3BlbkRCKG15REIsc2NvcGUsZnVuY3Rpb24oKXtcclxuICAgIFx0XHRcdGFkZERhdGEobXlEQixkYXRhLGNiKTtcclxuICAgIFx0XHR9KVxyXG4gICAgXHR9LFxyXG4gICAgXHRkZWxldGU6ZnVuY3Rpb24oc2NvcGUsY2hhdElkLGNiKXtcclxuICAgIFx0XHR2YXIgbXlEQiA9IHtcclxuICAgIFx0XHRcdG5hbWU6XCJjaGF0TXNnXCIsXHJcbiAgICBcdFx0XHRkYjpudWxsLFxyXG4gICAgXHRcdFx0dmVyc2lvbjoxXHJcbiAgICBcdFx0fVxyXG4gICAgXHRcdG9wZW5EQihteURCLHNjb3BlLGZ1bmN0aW9uKCl7XHJcbiAgICBcdFx0XHRnZXREYXRhQnlJbmRleChteURCLmRiLG15REIubmFtZSxjaGF0SWQsc2NvcGUsZnVuY3Rpb24oKXsvL+iOt+WPluimgeWIoOmZpOeahOaVsOaNrlxyXG4gICAgXHRcdFx0XHR2YXIgZGVsZURhdGEgPSBzY29wZS5kYlF1ZXJ5RGF0YTtcclxuXHQgICAgXHRcdFx0Zm9yKHZhciBpPTA7aTxkZWxlRGF0YS5sZW5ndGg7aSsrKXsvL+mBjeWOhuaJgOacieeahOW+heWIoOmZpOeahOaVsOaNru+8jOi/m+ihjOWIoOmZpOaTjeS9nFxyXG5cdCAgICBcdFx0XHRcdHZhciByZXF1ZXN0ID0gZGVsZXRlRGF0YUJ5S2V5KG15REIsZGVsZURhdGFbaV0ubXNnSWQpO1xyXG5cdCAgICBcdFx0XHR9XHJcblx0ICAgIFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKXtcclxuXHQgICAgXHRcdFx0XHRjb25zb2xlLmxvZyhcImRlbGV0ZSBzdWNjZXNzIVwiKTtcclxuXHQgICAgXHRcdFx0fVxyXG4gICAgXHRcdFx0fSk7XHJcbiAgICBcdFx0fSlcclxuICAgIFx0fVxyXG4gICAgfVxyXG59KSIsIi8qKlxyXG4gKiBuYW1lOiB0bS5wYWdpbmF0aW9uXHJcbiAqIFZlcnNpb246IDEuMC4wIGJldGFcclxuICovXHJcbmFuZ3VsYXIubW9kdWxlKCd0bS5wYWdpbmF0aW9uJywgW10pLmRpcmVjdGl2ZSgndG1QYWdpbmF0aW9uJyxbZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwicGFnZS1saXN0XCI+JyArXHJcbiAgICAgICAgICAgICc8dWwgY2xhc3M9XCJwYWdpbmF0aW9uXCIgbmctc2hvdz1cImNvbmYudG90YWxJdGVtcyA+IDBcIj4nICtcclxuICAgICAgICAgICAgJzxsaSBuZy1jbGFzcz1cIntkaXNhYmxlZDogY29uZi5jdXJyZW50UGFnZSA9PSAxfVwiIG5nLWNsaWNrPVwicHJldlBhZ2UoKVwiPjxzcGFuPiZsYXF1bzs8L3NwYW4+PC9saT4nICtcclxuICAgICAgICAgICAgJzxsaSBuZy1yZXBlYXQ9XCJpdGVtIGluIHBhZ2VMaXN0IHRyYWNrIGJ5ICRpbmRleFwiIG5nLWNsYXNzPVwie2FjdGl2ZTogaXRlbSA9PSBjb25mLmN1cnJlbnRQYWdlLCBzZXBhcmF0ZTogaXRlbSA9PSBcXCcuLi5cXCd9XCIgJyArXHJcbiAgICAgICAgICAgICduZy1jbGljaz1cImNoYW5nZUN1cnJlbnRQYWdlKGl0ZW0pXCI+JyArXHJcbiAgICAgICAgICAgICc8c3Bhbj57eyBpdGVtIH19PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAnPC9saT4nICtcclxuICAgICAgICAgICAgJzxsaSBuZy1jbGFzcz1cIntkaXNhYmxlZDogY29uZi5jdXJyZW50UGFnZSA9PSBjb25mLm51bWJlck9mUGFnZXN9XCIgbmctY2xpY2s9XCJuZXh0UGFnZSgpXCI+PHNwYW4+JnJhcXVvOzwvc3Bhbj48L2xpPicgK1xyXG4gICAgICAgICAgICAnPC91bD4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLXRvdGFsXCIgbmctc2hvdz1cImNvbmYudG90YWxJdGVtcyA+IDBcIj4nICtcclxuICAgICAgICAgICAgJ+avj+mhtTxzZWxlY3QgbmctbW9kZWw9XCJjb25mLml0ZW1zUGVyUGFnZVwiIG5nLW9wdGlvbnM9XCJvcHRpb24gZm9yIG9wdGlvbiBpbiBjb25mLnBlclBhZ2VPcHRpb25zIFwiIG5nLWNoYW5nZT1cImNoYW5nZUl0ZW1zUGVyUGFnZSgpXCI+PC9zZWxlY3Q+JyArXHJcbiAgICAgICAgICAgICcv5YWxPHN0cm9uZz57eyBjb25mLnRvdGFsSXRlbXMgfX08L3N0cm9uZz7mnaEgJyArXHJcbiAgICAgICAgICAgICfot7Povazoh7M8aW5wdXQgdHlwZT1cInRleHRcIiBuZy1tb2RlbD1cImp1bXBQYWdlTnVtXCIgbmcta2V5dXA9XCJqdW1wUGFnZUtleVVwKCRldmVudClcIi8+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJuby1pdGVtc1wiIG5nLXNob3c9XCJjb25mLnRvdGFsSXRlbXMgPD0gMFwiPuaaguaXoOaVsOaNrjwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JyxcclxuICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGNvbmY6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgY29uZiA9IHNjb3BlLmNvbmY7XHJcblxyXG4gICAgICAgICAgICAvLyDpu5jorqTliIbpobXplb/luqZcclxuICAgICAgICAgICAgdmFyIGRlZmF1bHRQYWdlc0xlbmd0aCA9IDk7XHJcblxyXG4gICAgICAgICAgICAvLyDpu5jorqTliIbpobXpgInpobnlj6/osIPmlbTmr4/pobXmmL7npLrnmoTmnaHmlbBcclxuICAgICAgICAgICAgdmFyIGRlZmF1bHRQZXJQYWdlT3B0aW9ucyA9IFsxMCwgMTUsIDIwLCAzMCwgNTBdO1xyXG5cclxuICAgICAgICAgICAgLy8g6buY6K6k5q+P6aG155qE5Liq5pWwXHJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0UGVyUGFnZSA9IDE1O1xyXG5cclxuICAgICAgICAgICAgLy8g6I635Y+W5YiG6aG16ZW/5bqmXHJcbiAgICAgICAgICAgIGlmKGNvbmYucGFnZXNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIOWIpOaWreS4gOS4i+WIhumhtemVv+W6plxyXG4gICAgICAgICAgICAgICAgY29uZi5wYWdlc0xlbmd0aCA9IHBhcnNlSW50KGNvbmYucGFnZXNMZW5ndGgsIDEwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighY29uZi5wYWdlc0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYucGFnZXNMZW5ndGggPSBkZWZhdWx0UGFnZXNMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5YiG6aG16ZW/5bqm5b+F6aG75Li65aWH5pWw77yM5aaC5p6c5Lyg5YG25pWw5pe277yM6Ieq5Yqo5aSE55CGXHJcbiAgICAgICAgICAgICAgICBpZihjb25mLnBhZ2VzTGVuZ3RoICUgMiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYucGFnZXNMZW5ndGggKz0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25mLnBhZ2VzTGVuZ3RoID0gZGVmYXVsdFBhZ2VzTGVuZ3RoXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOWIhumhtemAiemhueWPr+iwg+aVtOavj+mhteaYvuekuueahOadoeaVsFxyXG4gICAgICAgICAgICBpZighY29uZi5wZXJQYWdlT3B0aW9ucyl7XHJcbiAgICAgICAgICAgICAgICBjb25mLnBlclBhZ2VPcHRpb25zID0gZGVmYXVsdFBhZ2VzTGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBwYWdlTGlzdOaVsOe7hFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQYWdpbmF0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjb25mLmN1cnJlbnRQYWdlXHJcbiAgICAgICAgICAgICAgICBpZihjb25mLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5jdXJyZW50UGFnZSA9IHBhcnNlSW50KHNjb3BlLmNvbmYuY3VycmVudFBhZ2UsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZighY29uZi5jdXJyZW50UGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbmYudG90YWxJdGVtc1xyXG4gICAgICAgICAgICAgICAgaWYoY29uZi50b3RhbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi50b3RhbEl0ZW1zID0gcGFyc2VJbnQoY29uZi50b3RhbEl0ZW1zLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uZi50b3RhbEl0ZW1zXHJcbiAgICAgICAgICAgICAgICBpZighY29uZi50b3RhbEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi50b3RhbEl0ZW1zID0gMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGNvbmYuaXRlbXNQZXJQYWdlIFxyXG4gICAgICAgICAgICAgICAgaWYoY29uZi5pdGVtc1BlclBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLml0ZW1zUGVyUGFnZSA9IHBhcnNlSW50KGNvbmYuaXRlbXNQZXJQYWdlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZighY29uZi5pdGVtc1BlclBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLml0ZW1zUGVyUGFnZSA9IGRlZmF1bHRQZXJQYWdlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG51bWJlck9mUGFnZXNcclxuICAgICAgICAgICAgICAgIGNvbmYubnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbChzY29wZS5jb25mLnRvdGFsSXRlbXMvY29uZi5pdGVtc1BlclBhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWmguaenOWIhumhteaAu+aVsD4w77yM5bm25LiU5b2T5YmN6aG15aSn5LqO5YiG6aG15oC75pWwXHJcbiAgICAgICAgICAgICAgICBpZihzY29wZS5jb25mLm51bWJlck9mUGFnZXMgPiAwICYmIHNjb3BlLmNvbmYuY3VycmVudFBhZ2UgPiBzY29wZS5jb25mLm51bWJlck9mUGFnZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmNvbmYuY3VycmVudFBhZ2UgPSBzY29wZS5jb25mLm51bWJlck9mUGFnZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6caXRlbXNQZXJQYWdl5Zyo5LiN5ZyocGVyUGFnZU9wdGlvbnPmlbDnu4TkuK3vvIzlsLHmioppdGVtc1BlclBhZ2XliqDlhaXov5nkuKrmlbDnu4TkuK1cclxuICAgICAgICAgICAgICAgIHZhciBwZXJQYWdlT3B0aW9uc0xlbmd0aCA9IHNjb3BlLmNvbmYucGVyUGFnZU9wdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWumuS5ieeKtuaAgVxyXG4gICAgICAgICAgICAgICAgdmFyIHBlclBhZ2VPcHRpb25zU3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHBlclBhZ2VPcHRpb25zTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmYucGVyUGFnZU9wdGlvbnNbaV0gPT0gY29uZi5pdGVtc1BlclBhZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJQYWdlT3B0aW9uc1N0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6caXRlbXNQZXJQYWdl5Zyo5LiN5ZyocGVyUGFnZU9wdGlvbnPmlbDnu4TkuK3vvIzlsLHmioppdGVtc1BlclBhZ2XliqDlhaXov5nkuKrmlbDnu4TkuK1cclxuICAgICAgICAgICAgICAgIGlmKCFwZXJQYWdlT3B0aW9uc1N0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5wZXJQYWdlT3B0aW9ucy5wdXNoKGNvbmYuaXRlbXNQZXJQYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDlr7npgInpobnov5vooYxzb3J0XHJcbiAgICAgICAgICAgICAgICBjb25mLnBlclBhZ2VPcHRpb25zLnNvcnQoZnVuY3Rpb24oYSwgYikge3JldHVybiBhIC0gYn0pO1xyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgLy8g6aG156CB55u45YWzXHJcbiAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYoY29uZi5udW1iZXJPZlBhZ2VzIDw9IGNvbmYucGFnZXNMZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWIpOaWreaAu+mhteaVsOWmguaenOWwj+S6juetieS6juWIhumhteeahOmVv+W6pu+8jOiLpeWwj+S6juWImeebtOaOpeaYvuekulxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihpID0xOyBpIDw9IGNvbmYubnVtYmVyT2ZQYWdlczsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmgLvpobXmlbDlpKfkuo7liIbpobXplb/luqbvvIjmraTml7bliIbkuLrkuInnp43mg4XlhrXvvJoxLuW3pui+ueayoeaciS4uLjIu5Y+z6L655rKh5pyJLi4uMy7lt6blj7Ppg73mnIkuLi7vvIlcclxuICAgICAgICAgICAgICAgICAgICAvLyDorqHnrpfkuK3lv4PlgY/np7vph49cclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gKGNvbmYucGFnZXNMZW5ndGggLSAxKSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5jdXJyZW50UGFnZSA8PSBvZmZzZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlt6bovrnmsqHmnIkuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDw9IG9mZnNldCArIDE7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goJy4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYubnVtYmVyT2ZQYWdlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY29uZi5jdXJyZW50UGFnZSA+IGNvbmYubnVtYmVyT2ZQYWdlcyAtIG9mZnNldCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goJy4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IG9mZnNldCArIDE7IGkgPj0gMTsgaS0tKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5udW1iZXJPZlBhZ2VzIC0gaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLm51bWJlck9mUGFnZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmnIDlkI7kuIDnp43mg4XlhrXvvIzkuKTovrnpg73mnIkuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgnLi4uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IE1hdGguY2VpbChvZmZzZXQgLyAyKSA7IGkgPj0gMTsgaS0tKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5jdXJyZW50UGFnZSAtIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSBvZmZzZXQgLyAyOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLmN1cnJlbnRQYWdlICsgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goJy4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYubnVtYmVyT2ZQYWdlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLiRwYXJlbnQuY29uZiA9IGNvbmY7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHByZXZQYWdlXHJcbiAgICAgICAgICAgIHNjb3BlLnByZXZQYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjb25mLmN1cnJlbnRQYWdlID4gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5jdXJyZW50UGFnZSAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmYub25DaGFuZ2UpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYub25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBuZXh0UGFnZVxyXG4gICAgICAgICAgICBzY29wZS5uZXh0UGFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoY29uZi5jdXJyZW50UGFnZSA8IGNvbmYubnVtYmVyT2ZQYWdlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5jdXJyZW50UGFnZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmYub25DaGFuZ2UpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYub25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyDlj5jmm7TlvZPliY3pobVcclxuICAgICAgICAgICAgc2NvcGUuY2hhbmdlQ3VycmVudFBhZ2UgPSBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtID09ICcuLi4nKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25mLmN1cnJlbnRQYWdlID1pdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFBhZ2luYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25mLm9uQ2hhbmdlKCnlh73mlbBcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25mLm9uQ2hhbmdlKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8g5L+u5pS55q+P6aG15bGV56S655qE5p2h5pWwXHJcbiAgICAgICAgICAgIHNjb3BlLmNoYW5nZUl0ZW1zUGVyUGFnZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOS4gOWPkeWxleekuuadoeaVsOWPmOabtO+8jOW9k+WJjemhteWwhumHjee9ruS4ujFcclxuICAgICAgICAgICAgICAgIHNjb3BlLmNvbmYuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY29uZik7XHJcbiAgICAgICAgICAgICAgICBnZXRQYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25mLm9uQ2hhbmdlKCnlh73mlbBcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYub25DaGFuZ2UpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8g6Lez6L2s6aG1XHJcbiAgICAgICAgICAgIHNjb3BlLmp1bXBUb1BhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG51bSA9IHNjb3BlLmp1bXBQYWdlTnVtO1xyXG4gICAgICAgICAgICAgICAgaWYobnVtLm1hdGNoKC9cXGQrLykpIHtcclxuICAgICAgICAgICAgICAgICAgICBudW0gPSBwYXJzZUludChudW0sIDEwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG51bSAmJiBudW0gIT0gY29uZi5jdXJyZW50UGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihudW0gPiBjb25mLm51bWJlck9mUGFnZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IGNvbmYubnVtYmVyT2ZQYWdlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L2sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFBhZ2luYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uZi5vbkNoYW5nZSgp5Ye95pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvbmYub25DaGFuZ2UpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25mLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuanVtcFBhZ2VOdW0gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNjb3BlLmp1bXBQYWdlS2V5VXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5Y29kZSA9IHdpbmRvdy5ldmVudCA/IGUua2V5Q29kZSA6ZS53aGljaDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoa2V5Y29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmp1bXBUb1BhZ2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdjb25mLnRvdGFsSXRlbXMnLCBmdW5jdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8g5Zyo5peg5YC85oiW5YC855u4562J55qE5pe25YCZ77yM5Y675omn6KGMb25DaGFuZ2Xkuovku7ZcclxuICAgICAgICAgICAgICAgIGlmKCF2YWx1ZSB8fCB2YWx1ZSA9PSBvbGRWYWx1ZSkgeyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmYub25DaGFuZ2UpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYub25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZXRQYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1dKTsiLCJhbmd1bGFyLm1vZHVsZSgncm91dGVyJyxbXHJcblx0J2hvbWUucm91dGVyJyxcclxuXHQna2Yucm91dGVyJyxcclxuXHQnbG9naW4ucm91dGVyJyxcclxuXHQncmVnaXN0ZXIucm91dGVyJyxcclxuXHQnZmxvdy5yb3V0ZXInLFxyXG5dKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLCckbG9jYXRpb25Qcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyLCRsb2NhdGlvblByb3ZpZGVyKXtcclxuXHQvLyAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xyXG5cdC8vICAgICBlbmFibGVkOiB0cnVlLFxyXG5cdC8vICAgICByZXF1aXJlQmFzZTogZmFsc2VcclxuXHQvLyB9KTtcclxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdsb2dpbicpO1xyXG59XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdmbG93LmN0cmwnLFsncHVidWxpYycsJ2RhdGEnXSlcclxuLmNvbnRyb2xsZXIoJ2Zsb3dDdHJsJyxbJyRzY29wZScsJ0RhdGEnLCckdGltZW91dCcsJ1RpcCcsZnVuY3Rpb24oJHNjb3BlLERhdGEsJHRpbWVvdXQsVGlwKXtcclxuXHQkc2NvcGUubGlzdCA9IERhdGEuZ2V0RGF0YSgnZmxvd0RhdGEnKS5saXN0O1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2Zsb3dnbEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHApe1xyXG5cdCRzY29wZS5zZWFyY2hNc2cgPSB7fTtcclxuXHQkc2NvcGUuc2VhcmNoTXNnLnN0YXJ0RGF0ZSA9ICcnO1xyXG5cdGZ1bmN0aW9uIGdldGxpc3QoKXtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdmbG93TGlzdCcpLFxyXG5cdFx0XHRkYXRhOntcclxuXHRcdFx0XHRqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5zZWFyY2hNc2cpXHJcblx0XHRcdH0sXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QgPSBkYXRhLnJlc3VsdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGdldGxpc3QoKTtcclxuXHQkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKXtcclxuXHRcdGdldGxpc3QoKTtcclxuXHR9XHJcblx0JHNjb3BlLmJqWmQgPSBmdW5jdGlvbih4KXtcclxuXHRcdCRzdGF0ZS5nbygnaG9tZS5mbG93LmJqZmxvdycse1xyXG5cdFx0XHRpZDp4LmZsb3dJZCxcclxuXHRcdFx0b2JqOnhcclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZGZsb3dDdHJsJyxbJyRzY29wZScsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnVGlwJywnZ3JvdXBzUm9sZXMnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsVGlwLCRzdGF0ZSxVcmwsJGh0dHAsVGlwLGdyb3Vwc1JvbGVzLEh0dHApe1xyXG5cdCRzY29wZS55ZWFyc0xpc3QgPSBbXTtcclxuXHQkc2NvcGUubW9udGhMaXN0ID0gW107XHJcblx0JHNjb3BlLm15TXNnID0ge1xyXG5cdFx0aW1wVHlwZTonJyxcclxuXHRcdGltcFllYXI6JycsXHJcblx0XHRpbXBNb250aDonJyxcclxuXHRcdGRlbEZsYWc6JzAnLFxyXG5cdFx0cGF0aExpc3Q6JydcclxuXHR9O1xyXG5cdGZvcih2YXIgaSA9IDIwMTc7aTw9MjA1MDtpKyspe1xyXG5cdFx0JHNjb3BlLnllYXJzTGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHRmb3IodmFyIGkgPSAxO2k8PTEyO2krKyl7XHJcblx0XHQkc2NvcGUubW9udGhMaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdCRzY29wZS51cGxvYWQgPSBmdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5ieUZvcm0oe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgndXBsb2FkRmxvd0ZpbGUnKSxcclxuXHRcdFx0ZmlsZU5hbWU6J2ZpbGUnLFxyXG5cdFx0XHRtdWx0aXBsZTpcIm11bHRpcGFydFwiLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFRpcC5Mb2coZGF0YS5tZXNzYWdlKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUucGF0aExpc3QgPSBKU09OLnBhcnNlKGRhdGEucGF0aExpc3QpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLmZsb3cgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoISRzY29wZS5teU1zZy5pbXBUeXBlfHwhJHNjb3BlLm15TXNnLmltcFllYXJ8fCEkc2NvcGUubXlNc2cuaW1wTW9udGh8fCEkc2NvcGUubXlNc2cucGF0aExpc3Qpe1xyXG5cdFx0XHRUaXAuTG9nKCfor7flhYjpgInmi6nmnaHku7YnKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKFwiaW1wb3J0Rmxvd0ZpbGVcIiksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGpzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKVxyXG5cdFx0XHR9XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRUaXAuTG9nKGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHQkc3RhdGUuZ28oXCJob21lLmZsb3cuZmxvd2dsXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdiamZsb3dDdHJsJyxbJyRzY29wZScsJyRzdGF0ZVBhcmFtcycsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnVGlwJywnZ3JvdXBzUm9sZXMnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsJHN0YXRlUGFyYW1zLFRpcCwkc3RhdGUsVXJsLCRodHRwLFRpcCxncm91cHNSb2xlcyxIdHRwKXtcclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xyXG5cdCRzY29wZS5teU1zZyA9ICRzdGF0ZVBhcmFtcy5vYmp8fHt9O1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3NldHRsZW1lbnRDdHJsJyxbJyRzY29wZScsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnVGlwJywnZ3JvdXBzUm9sZXMnLCdIdHRwJywnR2V0TGlzdCcsZnVuY3Rpb24oJHNjb3BlLFRpcCwkc3RhdGUsVXJsLCRodHRwLFRpcCxncm91cHNSb2xlcyxIdHRwLEdldExpc3Qpe1xyXG5cdCRzY29wZS5zZWFyY2hNc2cgPSB7fTtcclxuXHQkc2NvcGUuc2VhcmNoTXNnLnN0YXJ0RGF0ZSA9ICcnO1xyXG5cdGZ1bmN0aW9uIGdldGxpc3QoKXtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdnZXRzZXR0bGVtZW50TGlzdCcpLFxyXG5cdFx0XHRkYXRhOntcclxuXHRcdFx0XHRqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5zZWFyY2hNc2cpXHJcblx0XHRcdH0sXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QgPSBkYXRhLnJlc3VsdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGdldGxpc3QoKTtcclxuXHQkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKXtcclxuXHRcdGdldGxpc3QoKTtcclxuXHR9XHJcblx0JHNjb3BlLnNldHRsZW1lbnQgPSBmdW5jdGlvbih4KXtcclxuXHRcdEh0dHAuZ2V0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2dvU2V0dGxlbWVudCcpKycvJyt4LnJlYmF0ZUlkXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRUaXAuTG9nKGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRnZXRsaXN0KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLmNhbmNlbFNldHRsZW1lbnQgPSBmdW5jdGlvbih4KXtcclxuXHRcdEh0dHAuZ2V0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NhbmNlbFNldHRsZW1lbnQnKSsnLycreC5yZWJhdGVJZFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0VGlwLkxvZyhkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0Z2V0bGlzdCgpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5oYW5kbGVTZXR0bGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdoYW5kbGVTZXR0bGVtZW50JylcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFRpcC5Mb2coZGF0YS5tZXNzYWdlKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdGdldGxpc3QoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnZmxvdy5yb3V0ZXInLFsnZmxvdy5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnaG9tZS5mbG93Jyx7XHJcblx0XHR1cmw6Jy9mbG93JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL2Zsb3cuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidmbG93Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5mbG93LmZsb3dnbCcse1xyXG5cdFx0dXJsOicvZmxvd2dsJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL2Zsb3cvZmxvd0dsLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZmxvd2dsQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5mbG93LmFkZGZsb3cnLHtcclxuXHRcdHVybDonL2Zsb3dnbC9hZGRmbG93JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL2Zsb3cvYWRkRmxvdy5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FkZGZsb3dDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmZsb3cuYmpmbG93Jyx7XHJcblx0XHR1cmw6Jy9mbG93Z2wvOmlkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL2Zsb3cvYmpGbG93Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYmpmbG93Q3RybCcsXHJcblx0XHRwYXJhbXM6e1xyXG5cdFx0XHRvYmo6bnVsbFxyXG5cdFx0fVxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmZsb3cuc2V0dGxlbWVudCcse1xyXG5cdFx0dXJsOicvc2V0dGxlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Zsb3d0by9zZXR0bGVtZW50L3NldHRsZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidzZXR0bGVtZW50Q3RybCcsXHJcblx0XHRwYXJhbXM6e1xyXG5cdFx0XHRvYmo6bnVsbFxyXG5cdFx0fVxyXG5cdH0pXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKFwiaG9tZS5jdHJsXCIsW1wicHVidWxpY1wiLCdkYXRhJ10pXHJcbi5jb250cm9sbGVyKFwiaG9tZUN0cmxcIixbJyRzY29wZScsJ0RhdGEnLCckc3RhdGVQYXJhbXMnLCckaHR0cCcsJ1VybCcsXCIkdGltZW91dFwiLGZ1bmN0aW9uKCRzY29wZSxEYXRhLCRzdGF0ZVBhcmFtcywkaHR0cCxVcmwsJHRpbWVvdXQpe1xyXG5cdC8v55So5oi35L+h5oGv57yT5a2YXHJcblx0Ly8gaWYoJHN0YXRlUGFyYW1zLnVzZXIpe1xyXG5cdC8vIFx0JHNjb3BlLnVzZXJQcml2YXRlVXJsPSRzdGF0ZVBhcmFtcy51c2VyLnVzZXJQcml2YXRlVXJsO1xyXG5cdC8vIFx0JHNjb3BlLnVzZXJJZD0kc3RhdGVQYXJhbXMudXNlci5lbXBsb3llZUlkO1xyXG5cdC8vIFx0dmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KCRzdGF0ZVBhcmFtcyk7XHJcblx0Ly8gXHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdzdGF0ZVBhcmFtcycsc3RyKTtcclxuXHQvLyB9ZWxzZXtcdFxyXG5cdC8vIFx0dmFyIGpzb24gPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3N0YXRlUGFyYW1zJykpO1xyXG5cdC8vIFx0JHNjb3BlLnVzZXJQcml2YXRlVXJsPWpzb24udXNlci51c2VyUHJpdmF0ZVVybDtcclxuXHQvLyBcdCRzY29wZS51c2VySWQ9anNvbi51c2VyLmVtcGxveWVlSWQ7XHJcblx0Ly8gfVxyXG5cdCRzY29wZS5tZW51PXt9O1xyXG5cdCRzY29wZS5tZW51LmtmID0gRGF0YS5nZXREYXRhKCdrZkRhdGEnKS50aXRsZTtcclxuXHQkc2NvcGUubWVudS5mbG93ID0gRGF0YS5nZXREYXRhKCdmbG93RGF0YScpLnRpdGxlO1xyXG59XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdkYXRhJyxbXSlcclxuLmZhY3RvcnkoJ0RhdGEnLGZ1bmN0aW9uKCl7XHJcblx0dmFyIGRhdGE9e1xyXG5cdFx0a2ZEYXRhOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOiflrqLmnI3kuK3lv4MnLFxyXG5cdFx0XHQnc3RhdGUnOicuS0YnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+WuouacjeeuoeeQhicsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5a6i5pyN5YiX6KGoJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfS0ZfbGInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifmt7vliqDlrqLmnI0nLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRl9hZGRLZnonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+Wuouacjee7hCcsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5a6i5pyN57uE5YiX6KGoJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfS0ZaX2xiJ1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5re75Yqg5a6i5pyN57uEJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfS0ZaX2FkZEtmeidcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon6KeS6Imy566h55CGJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifop5LoibLliJfooagnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9KU19sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a3u+WKoOWuouacjee7hCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0pTX2FkZEpzJ1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRnZERhdGE6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J+W3peWNleeuoeeQhicsXHJcblx0XHRcdCdzdGF0ZSc6Jy5HRCcsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5oiR55qE5pyq6Kej5Yaz5bel5Y2VJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifkvJjlhYjmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6J0tGX0dEX3l4d2pqJ1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5LiA6Iis5pyq6Kej5Yaz5bel5Y2VJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOidLRl9HRF95YndqaidcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon57uE5YaF5pyq6Kej5Yaz5bel5Y2VJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5omA5pyJ5pyq6Kej5Yaz5bel5Y2VJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5oiR55qE5bey6Kej5Yaz5bel5Y2VJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5omA5pyJ5bel5Y2VJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVx0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Y2hhdERhdGE6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J0lN5Y2z5pe26YCa6K6vJyxcclxuXHRcdFx0J3N0YXRlJzonLmNoYXQnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+W9k+WJjeS8muivnScsXHJcblx0XHRcdFx0XHQvLydsaXN0JzpjaGF0LmN1cnJlbnRNZXNzYWdlKHNjb3BlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5Y6G5Y+y5Lya6K+dJyxcclxuXHRcdFx0XHRcdC8vJ2xpc3QnOmNoYXQuaGlzdG9yeU1lc3NhZ2Uoc2NvcGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRjb25maWc6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J+mFjee9ricsXHJcblx0XHRcdCdzdGF0ZSc6Jy5jb25maWcnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+a4oOmBk+mFjee9ricsXHJcblx0XHRcdFx0XHQvLydsaXN0JzpjaGF0LmN1cnJlbnRNZXNzYWdlKHNjb3BlKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon6YWN572u6YCJ6aG5JyxcclxuXHRcdFx0XHRcdC8vJ2xpc3QnOmNoYXQuaGlzdG9yeU1lc3NhZ2Uoc2NvcGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcblx0XHRcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0RGF0YTpmdW5jdGlvbihpZCl7XHJcblx0XHRcdGZvcih4IGluIGRhdGEpe1xyXG5cdFx0XHRcdGlmKGlkPT14KXtcclxuXHRcdFx0XHRcdHJldHVybiBkYXRhW3hdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcdFxyXG5cclxuXHRcclxufSkiLCJhbmd1bGFyLm1vZHVsZSgnaG9tZS5yb3V0ZXInLFsnaG9tZS5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG4gICAgICAuc3RhdGUoJ2hvbWUnLCB7XHJcbiAgICAgICAgdXJsOiAnL2hvbWUnLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvaG9tZS9ob21lLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCcsXHJcbiAgICAgICAgcGFyYW1zOntcclxuICAgICAgICBcdHVzZXI6bnVsbCxcclxuICAgICAgICBcdHBlcm1pc3Npb25zOm51bGwsXHJcbiAgICAgICAgICBncm91cERhdGE6bnVsbCxcclxuICAgICAgICAgIHJvbGVEYXRhOm51bGxcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbn1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2tmLmN0cmwnLFsncHVidWxpYycsJ2RhdGEnXSlcclxuLmNvbnRyb2xsZXIoJ2tmQ3RybCcsWyckc2NvcGUnLCdEYXRhJywnJHRpbWVvdXQnLCdUaXAnLGZ1bmN0aW9uKCRzY29wZSxEYXRhLCR0aW1lb3V0LFRpcCl7XHJcblx0JHNjb3BlLmxpc3QgPSBEYXRhLmdldERhdGEoJ2tmRGF0YScpLmxpc3Q7XHJcbn1dKVxyXG4uY29udHJvbGxlcigna2ZnbEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHApe1xyXG5cdCRzY29wZS5xdWVyeUhvc3BpdGFsVHh0ID0gXCJcIjtcdFxyXG5cdGZ1bmN0aW9uIGdldGxpc3QoKXtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCd6ZExpc3QnKSxcclxuXHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0aG9zcGl0YWxOYW1lOiRzY29wZS5xdWVyeUhvc3BpdGFsVHh0LFxyXG5cdFx0XHRcdGZsYWc6MVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5ob3NwaXRhbHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHRnZXRsaXN0KCk7XHJcblx0JHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRnZXRsaXN0KCk7XHJcblx0fVxyXG5cdCRzY29wZS5ialpkID0gZnVuY3Rpb24oeCl7XHJcblx0XHQkc3RhdGUuZ28oJ2hvbWUua2YuYmprZicse1xyXG5cdFx0XHRpZDp4Lmhvc3BpdGFsSWRcclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZGtmQ3RybCcsWyckc2NvcGUnLCdUaXAnLCckc3RhdGUnLCdVcmwnLCckaHR0cCcsJ1RpcCcsJ2dyb3Vwc1JvbGVzJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLFRpcCwkc3RhdGUsVXJsLCRodHRwLFRpcCxncm91cHNSb2xlcyxIdHRwKXtcclxuXHQkc2NvcGUubXlNc2cgPSB7fTtcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUubXlNc2cuem9uZUlkID0gJHNjb3BlLm15QXJlYTtcclxuXHRcdCRzY29wZS5teU1zZy5jaXR5SWQgPSAkc2NvcGUubXlDaXR5O1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdhZGRaZCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5teU1zZyl9XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZyhkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdCRzdGF0ZS5nbyhcImhvbWUua2Yua2ZnbFwiKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZyhkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdiamtmQ3RybCcsWyckc2NvcGUnLCckc3RhdGVQYXJhbXMnLCdUaXAnLCckc3RhdGUnLCdVcmwnLCckaHR0cCcsJ1RpcCcsJ2dyb3Vwc1JvbGVzJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLCRzdGF0ZVBhcmFtcyxUaXAsJHN0YXRlLFVybCwkaHR0cCxUaXAsZ3JvdXBzUm9sZXMsSHR0cCl7XHJcblx0Y29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcclxuXHQkc2NvcGUubXlNc2cgPSB7fTtcclxuXHRIdHRwLmdldCh7XHJcblx0XHR1cmw6VXJsLmdldFVybCgncXVlcnlaZCcpKycvJyskc3RhdGVQYXJhbXMuaWRcclxuXHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdCRzY29wZS5teU1zZy5ob3NwaXRhbE5hbWUgPSBkYXRhLmhvc3BpdGFsLmhvc3BpdGFsTmFtZTtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmhvc3BpdGFsSWQgPSBkYXRhLmhvc3BpdGFsLmhvc3BpdGFsSWQ7XHJcblx0XHRcdCRzY29wZS5teU1zZy50eXBlID0gSlNPTi5zdHJpbmdpZnkoZGF0YS5ob3NwaXRhbC50eXBlKTtcclxuXHRcdFx0JHNjb3BlLm15QXJlYSA9IGRhdGEuaG9zcGl0YWwuem9uZUlkO1xyXG5cdFx0XHQkc2NvcGUubXlDaXR5ID0gZGF0YS5ob3NwaXRhbC5jaXR5SWQ7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0VGlwLkxvZygn5pyN5Yqh56uv5byC5bi4Jyk7XHJcblx0XHR9XHJcblx0fSlcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUubXlNc2cuem9uZUlkID0gJHNjb3BlLm15QXJlYTtcclxuXHRcdCRzY29wZS5teU1zZy5jaXR5SWQgPSAkc2NvcGUubXlDaXR5O1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdialpkJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKX1cclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZyhkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdCRzdGF0ZS5nbyhcImhvbWUua2Yua2ZnbFwiKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZyhkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdrZnpnbEN0cmwnLFsnJHNjb3BlJywnJHN0YXRlUGFyYW1zJywnVGlwJywnJHN0YXRlJywnVXJsJywnJGh0dHAnLCdHZXRMaXN0JywnJHRpbWVvdXQnLGZ1bmN0aW9uKCRzY29wZSwkc3RhdGVQYXJhbXMsVGlwLCRzdGF0ZSxVcmwsJGh0dHAsR2V0TGlzdCwkdGltZW91dCl7XHJcbiAgICRzY29wZS5xdWVyeUN1c3RvbWVyVHh0ID0gXCJcIjtcdFxyXG5cdGZ1bmN0aW9uIGdldGxpc3QoKXtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdraExpc3QnKSxcclxuXHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0Y3VzdG9tZXJOYW1lOiRzY29wZS5xdWVyeUN1c3RvbWVyVHh0LFxyXG5cdFx0XHRcdHBob25lOicnLFxyXG5cdFx0XHRcdGZsYWc6MVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5jdXN0b21lcnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHRnZXRsaXN0KCk7XHJcblx0JHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRnZXRsaXN0KCk7XHJcblx0fVxyXG5cdCRzY29wZS5ialpkID0gZnVuY3Rpb24oeCl7XHJcblx0XHQkc3RhdGUuZ28oJ2hvbWUua2YuYmprZnonLHtcclxuXHRcdFx0aWQ6eC5jdXN0b21lcklkXHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdiamtmekN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyR0aW1lb3V0JywnJHN0YXRlUGFyYW1zJywnJHN0YXRlJywnJGh0dHAnLCdUaXAnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJHRpbWVvdXQsJHN0YXRlUGFyYW1zLCRzdGF0ZSwkaHR0cCxUaXAsSHR0cCl7XHJcblx0JHNjb3BlLm15TXNnID0ge307XHJcblx0SHR0cC5nZXQoe1xyXG5cdFx0dXJsOlVybC5nZXRVcmwoJ3F1ZXJ5S2gnKSsnLycrJHN0YXRlUGFyYW1zLmlkXHJcblx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuY3VzdG9tZXJOYW1lID0gZGF0YS5jdXN0b21lci5jdXN0b21lck5hbWU7XHJcblx0XHRcdCRzY29wZS5teU1zZy5jdXN0b21lcklkID0gZGF0YS5jdXN0b21lci5jdXN0b21lcklkO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuZGVwb3NpdEJhbmsgPSBkYXRhLmN1c3RvbWVyLmRlcG9zaXRCYW5rO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuZGVzYyA9IGRhdGEuY3VzdG9tZXIuZGVzYztcclxuXHRcdFx0JHNjb3BlLm15TXNnLnBob25lID0gZGF0YS5jdXN0b21lci5waG9uZTtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmlzQ29ycCA9IGRhdGEuY3VzdG9tZXIuaXNDb3JwO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuc2VyaWFsQ29kZSA9IGRhdGEuY3VzdG9tZXIuc2VyaWFsQ29kZTtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmFjY291bnRDb2RlID0gZGF0YS5jdXN0b21lci5hY2NvdW50Q29kZTtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmFjY291bnROYW1lID0gZGF0YS5jdXN0b21lci5hY2NvdW50TmFtZTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRUaXAuTG9nKCfmnI3liqHnq6/lvILluLgnKTtcclxuXHRcdH1cclxuXHR9KVxyXG5cdCRzY29wZS5zYXZlTXNnID0gZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnYmpLaCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5teU1zZyl9XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coZGF0YS5tZXNzYWdlKTtcclxuXHRcdFx0XHQkc3RhdGUuZ28oXCJob21lLmtmLmtmemdsXCIpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZGtmekN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyR0aW1lb3V0JywnJGh0dHAnLCdUaXAnLCckc3RhdGUnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJHRpbWVvdXQsJGh0dHAsVGlwLCRzdGF0ZSxIdHRwKXtcclxuXHQkc2NvcGUubXlNc2cgPSB7fTtcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZEtoJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKX1cclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdFx0JHN0YXRlLmdvKFwiaG9tZS5rZi5rZnpnbFwiKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZyhkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdrZi5yb3V0ZXInLFsna2YuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ2hvbWUua2YnLHtcclxuXHRcdHVybDonL3pkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2YuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidrZkN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUua2Yua2ZnbCcse1xyXG5cdFx0dXJsOicvemRnbCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2tmL2tmZ2wvS0ZHTC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2tmZ2xDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmtmLmFkZEtmJyx7XHJcblx0XHR1cmw6Jy9rZnpkL2FkZHpkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2ZnbC9hZGRLZi5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FkZGtmQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5rZi5iamtmJyx7XHJcblx0XHR1cmw6Jy96ZGdsLzppZCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2tmL2tmZ2wvYmprZi5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2Jqa2ZDdHJsJyxcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5rZi5rZnpnbCcse1xyXG5cdFx0dXJsOicva2hnbCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2tmL2tmemdsL0tGWkdMLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjona2Z6Z2xDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmtmLmFkZGtmeicse1xyXG5cdFx0dXJsOicva2hnbC9hZGRraCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2tmL2tmemdsL2FkZGtmei5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FkZGtmekN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUua2YuYmprZnonLHtcclxuXHRcdHVybDonL2toZ2wvOmlkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2Z6Z2wvYmprZnouaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidiamtmekN0cmwnLFxyXG5cdH0pXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdsb2dpbi5jdHJsJyxbJ2RhdGEnLCdwdWJ1bGljJ10pXHJcbi5jb250cm9sbGVyKCdsb2dpbkN0cmwnLFsnJHNjb3BlJywnJGh0dHAnLCckc3RhdGUnLCdVcmwnLCdUaXAnLCckdGltZW91dCcsZnVuY3Rpb24oJHNjb3BlLCRodHRwLCRzdGF0ZSxVcmwsVGlwLCR0aW1lb3V0KXtcclxuXHQkc2NvcGUudXNlcm5hbWU9bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2luSUQnKXx8Jyc7XHJcblx0JHNjb3BlLnBhc3N3b3JkPWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dpblBBU1MnKXx8Jyc7XHJcblx0JHNjb3BlLnRlc3Rfc3R5bGUxPVwiXCI7XHJcblx0JHNjb3BlLnRlc3Rfc3R5bGUyPVwiXCI7XHJcblx0JHNjb3BlLnJlbWVtYmVySUQ9ZmFsc2U7XHJcblx0JHNjb3BlLmxvZ2luX3N1Ym1pdCA9ICfnmbvlvZUnXHJcblx0JHNjb3BlLiR3YXRjaCgncmVtZW1iZXJJRCcsZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5yZW1lbWJlcklEKXtcclxuXHRcdFx0VGlwLkxvZygn6LSm5Y+35a+G56CB5bCG5a2Y5YWlY29va2ll77yBJyk7XHJcblx0XHR9XHJcblx0fSlcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5vbmJsdXI9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYoJHNjb3BlLnVzZXJuYW1lPT1cIlwiKXtcclxuXHRcdFx0XHQkc2NvcGUudGVzdF9zdHlsZTE9XCJoYXMtZXJyb3JcIjtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdGNvbnNvbGUubG9nKCRzY29wZS5yZW1lbWJlcklEKVx0XHRcclxuXHR9XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykub25mb2N1cz1mdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLnRlc3Rfc3R5bGUxPVwiXCI7XHJcblx0XHQkc2NvcGUuZXJyb3JfdXNlcm5hbWU9XCJcIjtcclxuXHR9XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykub25ibHVyPWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCRzY29wZS5wYXNzd29yZD09XCJcIil7XHJcblx0XHRcdFx0JHNjb3BlLnRlc3Rfc3R5bGUyPVwiaGFzLWVycm9yXCI7XHJcblx0XHRcdH1cclxuXHRcdH0pXHRcdFxyXG5cdH1cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS5vbmZvY3VzPWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUudGVzdF9zdHlsZTI9XCJcIjtcclxuXHRcdCRzY29wZS5lcnJvcl9wYXNzd29yZD1cIlwiO1xyXG5cdH1cclxuXHQkc2NvcGUubG9naW49ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRzY29wZS5sb2dpbl9zdWJtaXQ9J+eZu+W9leS4rS4uLic7XHJcblx0XHR9KVxyXG5cdFx0aWYoJHNjb3BlLnJlbWVtYmVySUQpe1xyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9naW5JRCcsJHNjb3BlLnVzZXJuYW1lKTtcclxuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2luUEFTUycsJHNjb3BlLnBhc3N3b3JkKTtcclxuXHRcdH1cclxuXHRcdCRodHRwKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2xvZ2luJyksXHJcblx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdHVzZXJuYW1lOiRzY29wZS51c2VybmFtZSxcclxuXHRcdFx0XHRwYXNzd29yZDokc2NvcGUucGFzc3dvcmRcclxuXHRcdFx0fSxcclxuXHRcdFx0aGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSwgIFxyXG5cdFx0ICBcdCB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG5cdFx0ICAgICB2YXIgc3RyID0gW107ICBcclxuXHRcdCAgICAgZm9yKHZhciBwIGluIG9iail7ICBcclxuXHRcdCAgICAgICBzdHIucHVzaChlbmNvZGVVUklDb21wb25lbnQocCkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbcF0pKTsgIFxyXG5cdFx0ICAgICB9ICBcclxuXHRcdCAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTsgIFxyXG5cdFx0ICAgXHQgfVx0XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRUaXAuTG9nKGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZT09MSl7XHJcblx0XHRcdFx0JHN0YXRlLmdvKCdob21lJyk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc2NvcGUubG9naW5fc3VibWl0PSfnmbvlvZUnO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pLmVycm9yKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkc2NvcGUubG9naW5fc3VibWl0PSfnmbvlvZUnO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2xvZ2luLnJvdXRlcicsWydsb2dpbi5jdHJsJ10pXHJcbi5jb25maWcoWyckdXJsUm91dGVyUHJvdmlkZXInLCckc3RhdGVQcm92aWRlcicsZnVuY3Rpb24oJHVybFJvdXRlclByb3ZpZGVyLCRzdGF0ZVByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnbG9naW4nLHtcclxuXHRcdHVybDonL2xvZ2luJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvbG9naW4vbG9naW4uaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidsb2dpbkN0cmwnXHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3JlZ2lzdGVyLnJvdXRlcicsWydyZWdpc3Rlci5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgncmVnaXN0ZXInLHtcclxuXHRcdHVybDonL3JlZ2lzdGVyJyxcclxuXHRcdHRlbXBsYXRlVXJsOid2aWV3cy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6XCJyZWdpc3RlckN0cmxcIlxyXG5cdH0pXHJcblx0LnN0YXRlKCdyZWdpc3Rlci5zdGVwMScse1xyXG5cdFx0dXJsOicvMScsXHJcblx0XHR0ZW1wbGF0ZVVybDondmlld3MvcmVnaXN0ZXIvc3RlcDEuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidyZWdpc3RlclN0ZXAxQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgncmVnaXN0ZXIuc3RlcDInLHtcclxuXHRcdHVybDonLzInLFxyXG5cdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL3JlZ2lzdGVyL3N0ZXAyLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjoncmVnaXN0ZXJTdGVwMkN0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgncmVnaXN0ZXIuc3RlcDMnLHtcclxuXHRcdHVybDonLzMnLFxyXG5cdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL3JlZ2lzdGVyL3N0ZXAzLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjoncmVnaXN0ZXJTdGVwM0N0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZSgncmVnaXN0ZXIuY3RybCcsWydwdWJ1bGljJywnZGF0YSddKVxyXG4uY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJyxbJyRzY29wZScsJ1VybCcsJyRodHRwJywnJHRpbWVvdXQnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSxVcmwsJGh0dHAsJHRpbWVvdXQsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLnJlZ2lzdGVyTXNnPXt9O1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyU3RlcDFDdHJsJyxbJyRzY29wZScsJ1VybCcsJyRodHRwJywnJHRpbWVvdXQnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSxVcmwsJGh0dHAsJHRpbWVvdXQsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLmdvTmV4dFN0ZXA9ZmFsc2U7XHJcblx0JHNjb3BlLm1zZ195em09Jyc7XHJcblx0JHNjb3BlLnBob25lbnVtPScnO1xyXG5cdCRzY29wZS55em1fc3VibWl0PSflj5HpgIHpqozor4HnoIEnO1xyXG5cdCRzY29wZS5nb05leHQ9ZmFsc2U7XHJcblx0JHNjb3BlLnN1Ym1pdF9tc2c9ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRzY29wZS55em1fc3VibWl0PSflt7Llj5HpgIEuLi4nO1xyXG5cdFx0fSlcclxuXHRcdCRodHRwKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3ZlcmlmeU51bWJlcicpLFxyXG5cdFx0XHRwYXJhbXM6e1xyXG5cdFx0XHRcdFwidmVyaWZ5RmllbGRcIjoncGhvbmUnLFxyXG5cdFx0XHRcdFwidmVyaWZ5VmFsdWVcIjokc2NvcGUucGhvbmVudW1cclxuXHRcdFx0fVxyXG5cdFx0fSkudGhlbihmdW5jdGlvbihtc2cpe1xyXG5cdFx0XHR2YXIgZGF0YSA9IG1zZy5kYXRhO1xyXG5cdFx0XHRpZihkYXRhLmNvZGU9PTEpe1xyXG5cdFx0XHRcdGlmKGRhdGEudmVyaWZ5UmVzdWx0PT0wKXtcclxuXHRcdFx0XHRcdFRpcC5Mb2coJHNjb3BlLCfmiYvmnLrlj7fmoKHpqozmiJDlip/vvIEnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5nb05leHQ9dHJ1ZTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0VGlwLkxvZygkc2NvcGUsJ+ivpeaJi+acuuWPt+mHjeWkje+8gScsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdpc3Rlcl9waG9uZW51bWJlclwiKS5mb2N1cygpO1xyXG5cdFx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdCRzY29wZS55em1fc3VibWl0PSflj5HpgIHpqozor4HnoIEnO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSk7XHRcdFxyXG5cdFx0XHRcdH1cdFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSwn5aSx6LSlJytkYXRhLmNvZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUubmV4dFN0ZXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLmdvTmV4dCl7XHJcblx0XHRcdGlmKCRzY29wZS5waG9uZW51bWJlcil7XHJcblx0XHRcdFx0dmFyIHByb21pc2U9JGh0dHAoe1xyXG5cdFx0XHRcdFx0dXJsOlVybC5nZXRVcmwoJ3ZlcmlmeVNtcycpLFxyXG5cdFx0XHRcdFx0cGFyYW1zOntcclxuXHRcdFx0XHRcdFx0cGhvbmU6JHNjb3BlLnBob25lbnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRTTVNjb2RlOiRzY29wZS5tc2dfeXptXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkudGhlbihmdW5jdGlvbihtc2cpe1xyXG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBtc2cuZGF0YTtcclxuXHRcdFx0XHRcdGlmKGRhdGEuY29kZT09MCl7XHJcblx0XHRcdFx0XHRcdCRzdGF0ZS5nbygnLnJlZ2lzdGVyLnN0ZXAyJyk7XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0VGlwLkFsZXJ0KCfmk43kvZzlpLHotKUhJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhwcm9taXNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZigkc2NvcGUucGhvbmVudW0pe1xyXG5cdFx0XHRcdCRzY29wZS5yZWdpc3Rlck1zZy5waG9uZT0kc2NvcGUucGhvbmVudW07XHJcblx0XHRcdFx0JHN0YXRlLmdvKCdyZWdpc3Rlci5zdGVwMicse1xyXG5cdFx0XHRcdFx0b2JqOntcclxuXHRcdFx0XHRcdFx0cGhvbmU6JHNjb3BlLnBob25lbnVtXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFx0XHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyU3RlcDJDdHJsJyxbJyRzY29wZScsJyR0aW1lb3V0JywnJGh0dHAnLCckc3RhdGVQYXJhbXMnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSwkdGltZW91dCwkaHR0cCwkc3RhdGVQYXJhbXMsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLmVtYWlsPScnO1xyXG5cdCRzY29wZS5wYXNzV29yZCA9ICcnO1xyXG5cdCRzY29wZS5wYXNzd29yZF9hZ2FpbiA9ICcnO1xyXG5cdCRzY29wZS5wYXNzd29yZF9zdHJvbmc9Jyc7XHJcblx0dmFyIHJ1byA9IC9bMC05IGEteiBdLztcclxuXHRmdW5jdGlvbiBjaGVjayhzdHIpe1xyXG5cdFx0cmV0dXJuICgvXFxkKy9pLnRlc3Qoc3RyKSA/IDEgOiAwKSArICgvW2Etel0rL2kudGVzdChzdHIpID8gMSA6IDApICsgKCBzdHIucmVwbGFjZSgvXFxkKy9nKS5yZXBsYWNlKC9bYS16XSsvaWcpPT0ndW5kZWZpbmVkJyA/IDAgOiAxKTtcclxuXHR9XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykub25mb2N1cz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0ZG9jdW1lbnQub25rZXlkb3duPWZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIHN0ciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLnZhbHVlO1xyXG5cdFx0XHRcdHN3aXRjaChjaGVjayhzdHIpKXtcclxuXHRcdFx0XHRcdGNhc2UgMDpcclxuXHRcdFx0XHRcdCAkc2NvcGUucnVvPScnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0nJztcclxuXHRcdFx0XHRcdCAkc2NvcGUucWlhbmc9Jyc7IFxyXG5cdFx0XHRcdFx0ICRzY29wZS5wYXNzd29yZF9zdHJvbmc9Jyc7XHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDE6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0nJztcclxuXHRcdFx0XHRcdCAkc2NvcGUucWlhbmc9Jyc7IFxyXG5cdFx0XHRcdFx0ICRzY29wZS5wYXNzd29yZF9zdHJvbmc9J+W8sSc7XHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDI6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS5xaWFuZz0nJzsgXHJcblx0XHRcdFx0XHQgJHNjb3BlLnBhc3N3b3JkX3N0cm9uZz0n5LitJzsgXHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDM6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS5xaWFuZz0ncGFzc3dvcmRfYmcnOyBcclxuXHRcdFx0XHRcdCAkc2NvcGUucGFzc3dvcmRfc3Ryb25nPSflvLonO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc3VibWl0UmVnaXN0ZXI9ZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5wYXNzV29yZCE9JHNjb3BlLnBhc3N3b3JkX2FnYWluKXtcclxuXHRcdFx0VGlwLkFsZXJ0KCfnoa7orqTlr4bnoIHkuI3kuIDoh7TvvIEnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoJHNjb3BlLnBhc3NXb3JkKXtcclxuXHRcdFx0JHN0YXRlLmdvKCdyZWdpc3Rlci5zdGVwMycse1xyXG5cdFx0XHRcdG9iajp7XHJcblx0XHRcdFx0XHRwaG9uZTokc3RhdGVQYXJhbXMub2JqLnBob25lLFxyXG5cdFx0XHRcdFx0ZW1haWw6JHNjb3BlLmVtYWlsLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQ6JHNjb3BlLnBhc3NXb3JkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdyZWdpc3RlclN0ZXAzQ3RybCcsWyckc2NvcGUnLCckdGltZW91dCcsJyRodHRwJywnJHN0YXRlUGFyYW1zJywnVXJsJywnVGlwJywnJHN0YXRlJyxmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsJGh0dHAsJHN0YXRlUGFyYW1zLFVybCxUaXAsJHN0YXRlKXtcclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xyXG5cdCRzY29wZS5jb25TaXplPTUwO1xyXG5cdCRzY29wZS5jb25OYW1lPVwiXCI7XHJcblx0JHNjb3BlLmNvbldvcmxkPVwiXCI7XHJcblx0JHNjb3BlLnJlZ2lzdGVyPWZ1bmN0aW9uKCl7XHJcblx0XHR2YXIganNvbiA9IHtcclxuXHRcdFx0dXNlclByaXZhdGVVcmw6JHNjb3BlLmNvbldvcmxkKycuY21jYy5jb20nLFxyXG5cdFx0XHRlbWFpbDokc3RhdGVQYXJhbXMub2JqLmVtYWlsLFxyXG5cdFx0XHRwaG9uZTokc3RhdGVQYXJhbXMub2JqLnBob25lLFxyXG5cdFx0XHRvYmplY3RUeXBlOjIsXHJcblx0XHRcdG5hbWU6JHNjb3BlLmNvbk5hbWUsXHJcblx0XHRcdGNvbXBhbnlTY2FsZTokc2NvcGUuY29uU2l6ZSxcclxuXHRcdFx0cGFzc3dvcmQ6JHN0YXRlUGFyYW1zLm9iai5wYXNzd29yZFxyXG5cdFx0fVxyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmVnaXN0ZXInKSxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTpqc29uXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSxcIuazqOWGjOaIkOWKnyFcIixmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdsb2dpbicpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZSgnZGF0YScsW10pXHJcbi5mYWN0b3J5KCdEYXRhJyxbJyR0aW1lb3V0JyxmdW5jdGlvbigkdGltZW91dCl7XHJcblx0dmFyIGRhdGE9e1xyXG5cdFx0a2ZEYXRhOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOifnu4jnq68nLFxyXG5cdFx0XHQnc3RhdGUnOicuS0YnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+e7iOerr+euoeeQhicsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicua2ZnbCcsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon57uI56uv5YiX6KGoJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfS0ZfbGInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifmt7vliqDnu4jnq68nLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRl9hZGRLZnonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+WuouaIt+WIl+ihqCcsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicua2Z6Z2wnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+WuouaIt+WIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGWl9sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a3u+WKoOWuouaItycsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGWl9hZGRLZnonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGZsb3dEYXRhOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOifmtYHlkJEnLFxyXG5cdFx0XHQnc3RhdGUnOicuZmxvdycsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5rWB5ZCR566h55CGJyxcclxuXHRcdFx0XHRcdCdzdGF0ZSc6Jy5mbG93Z2wnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a1geWQkeWIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLmZsb3dfZmxvd19sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+WvvOWFpea1geWQkScsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLmZsb3dfZmxvd19hZGRmbG93J1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifnu5PnrpfnrqHnkIYnLFxyXG5cdFx0XHRcdFx0J3N0YXRlJzonLnNldHRsZW1lbnQnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH0sXHJcblx0fVxyXG5cdFx0XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldERhdGE6ZnVuY3Rpb24oaWQpe1xyXG5cdFx0XHRmb3IoeCBpbiBkYXRhKXtcclxuXHRcdFx0XHRpZihpZD09eCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZGF0YVt4XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRnZXRDaGF0OmZ1bmN0aW9uKHNjb3BlKXtcclxuXHRcdFx0Y2hhdFNlcnZlLm1zZyhzY29wZSk7XHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG59XSlcclxuLmZhY3RvcnkoJ1VybCcsZnVuY3Rpb24oKXtcclxuXHR2YXIgdXJsRGF0YT17XHJcblx0XHRsb2dpbjonY3ljcm0vYXBpL2xvZ2luL2xvZ2luJywvL+eZu+mZhlxyXG5cdFx0emRMaXN0OidjeWNybS9hcGkvaG9zcC9xdWVyeS9saXN0JywvL+e7iOerr+WIl+ihqFxyXG5cdFx0cXVlcnlaZDonY3ljcm0vYXBpL2hvc3AvL3F1ZXJ5L29uZScsLy/mn6Xor6Lnu4jnq6/or6bmg4VcclxuXHRcdGdldEFyZWFzTGlzdDonY3ljcm0vYXBpL3pvbmUvcXVlcnlGb3JBbGxab25lcycsLy/ojrflj5blpKfljLrliJfooahcclxuXHRcdGdldENpdHlMaXN0OidjeWNybS9hcGkvem9uZS9xdWVyeUNpdHlCeVpvbmUnLC8v6I635Y+W5Z+O5biC5YiX6KGoXHJcblx0XHRialpkOidjeWNybS9hcGkvaG9zcC8vdXBkYXRlL29uZScsLy/nvJbovpHnu4jnq6/kv6Hmga9cclxuXHRcdGFkZFpkOidjeWNybS9hcGkvaG9zcC9pbnNlcnQvb25lJywvL+aWsOWinue7iOerr+S/oeaBr1xyXG5cdFx0a2hMaXN0OidjeWNybS9hcGkvY3VzdG9tZXIvcXVlcnkvbGlzdCcsLy/lrqLmiLfliJfooahcclxuXHRcdGFkZEtoOidjeWNybS9hcGkvY3VzdG9tZXIvaW5zZXJ0L29uZScsLy/mt7vliqDlrqLmiLdcclxuXHRcdHF1ZXJ5S2g6J2N5Y3JtL2FwaS9jdXN0b21lci9xdWVyeS9vbmUnLC8v5p+l6K+i5a6i5oi36K+m5oOFXHJcblx0XHRiaktoOidjeWNybS9hcGkvY3VzdG9tZXIvL3VwZGF0ZS9vbmUnLC8v57yW6L6R5a6i5oi35L+h5oGvXHJcblx0XHRmbG93TGlzdDonY3ljcm0vYXBpL2Zsb3cvcXVlcnkvbGlzdCcsLy/mn6Xor6LmtYHlkJHliJfooahcclxuXHRcdGdldHNldHRsZW1lbnRMaXN0OidjeWNybS9hcGkvcmViYXRlUHJvY2Vzcy9saXN0JywvL+iOt+WPlue7k+eul+WIl+ihqFxyXG5cdFx0Z29TZXR0bGVtZW50OidjeWNybS9hcGkvcmViYXRlUHJvY2Vzcy9wYXknLC8v57uT566X5LuY5qy+XHJcblx0XHRjYW5jZWxTZXR0bGVtZW50OidjeWNybS9hcGkvcmViYXRlUHJvY2Vzcy9wYXkvY2FuY2VsJywvL+WPlua2iOe7k+eul1xyXG5cdFx0aGFuZGxlU2V0dGxlbWVudDonY3ljcm0vYXBpL3JlYmF0ZVByb2Nlc3MvZGVhbCcsLy/nu5PnrpflpITnkIZcclxuXHRcdHVwbG9hZEZsb3dGaWxlOidjeWNybS9hcGkvdXBsb2FkL2ZpbGUnLC8v5LiK5Lyg57uT566X5paH5Lu2XHJcblx0XHRpbXBvcnRGbG93RmlsZTonY3ljcm0vYXBpL2Zsb3cvaW1wb3J0JywvL+WvvOWFpea1geWQkeaWh+S7tlxyXG5cclxuXHR9XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldFVybDpmdW5jdGlvbih1cmwpe1xyXG5cdFx0XHRmb3IoaSBpbiB1cmxEYXRhKXtcclxuXHRcdFx0XHRpZih1cmw9PWkpe1xyXG5cdFx0XHRcdFx0IHJldHVybiB1cmxEYXRhW2ldO1xyXG5cdFx0XHRcdFx0Ly8gcmV0dXJuIFwiaHR0cDovLzE5Mi4xNjguOTIuMTI6MjgwNzQvXCIrdXJsRGF0YVtpXTtcclxuXHRcdFx0XHRcdC8vcmV0dXJuIFwiaHR0cDovLzE5Mi4xNjguOTIuMjM6MjgwNzQvXCIrdXJsRGF0YVtpXTtcclxuXHRcdFx0XHRcdC8vcmV0dXJuIFwiaHR0cDovL3lrZi50dW5uZWwucXlkZXYuY29tL1wiK3VybERhdGFbaV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYWRkS2YuY3RybCcsW10pXHJcbi5jb250cm9sbGVyKCdhZGRrZkN0cmwnLFsnJHJvb3RTY29wZScsZnVuY3Rpb24oJHJvb3RTY29wZXMpe1xyXG5cdFxyXG59XSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
