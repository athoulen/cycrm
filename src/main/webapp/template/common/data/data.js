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
		login:'cycrm/api/login/login',//登陆
		zdList:'cycrm/api/hosp/query/list',//终端列表
		queryZd:'cycrm/api/hosp//query/one',//查询终端详情
		getAreasList:'cycrm/api/zone/queryForAllZones',//获取大区列表
		getCityList:'cycrm/api/zone/queryCityByZone',//获取城市列表
		bjZd:'cycrm/api/hosp//update/one',//编辑终端信息
		addZd:'cycrm/api/hosp/insert/one',//新增终端信息
		khList:'cycrm/api/customer/query/list',//客户列表
		addKh:'cycrm/api/customer/insert/one',//添加客户
		queryKh:'cycrm/api/customer/query/one',//查询客户详情
		bjKh:'cycrm/api/customer//update/one',//编辑客户信息
		flowList:'cycrm/api/flow/query/list',//查询流向列表
		getsettlementList:'cycrm/api/rebateProcess/list',//获取结算列表
		goSettlement:'cycrm/api/rebateProcess/pay',//结算付款
		cancelSettlement:'cycrm/api/rebateProcess/pay/cancel',//取消结算
		handleSettlement:'cycrm/api/rebateProcess/deal',//结算处理
		uploadFlowFile:'cycrm/api/upload/file',//上传结算文件
		importFlowFile:'cycrm/api/flow/import',//导入流向文件

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
