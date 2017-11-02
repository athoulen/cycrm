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