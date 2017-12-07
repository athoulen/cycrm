angular.module('agreement.ctrl',[])
.controller('agreementCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data){
	$scope.list = Data.getData('agreement').list;
}])
.controller('businessAgreementCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList){
	$scope.searchKey={
		protocolCode:'',
		productName:'',
		hospital:'',
		productNorms:'',
		flag:1,
	};
	$scope.search=function(data){
		GetList.Post({
			url:Url.getUrl('merchanProtList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList = data.protocols;
				}
			}
		})
	}
	$scope.search($scope.searchKey);
}])
.controller('addAgreementCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList){
	$scope.agreement={
		backPeriodStyle:'1',
		protocolCode:'',
		productId:'',
		zoneId:'',
		cityId:'',
		bidPrice:'',
		upMerchan:'',
		loMerchan:'',
		hospitalId:'',
		upBack:'',
		loBack:'',
		startTime:'',
		endTime:'',
		contactor:'',
		phone:'',
		qq:'',
		isValid:'1',
	};
	$scope.searchKey={
		productName:'',
		productNorms:'',
		manufacture:'',
		flag:0,
	};

	$scope.isShow=false;
	$scope.search=function(data){
		$scope.isShow=true;
		$scope.searchKey.productName=$scope.searchKey.productName?$scope.searchKey.productName:'';
		GetList.Post({
			url:Url.getUrl('productList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.pdataList = data.products.list;
				}
			}
		})
	}
	$scope.selectProduct=function(x){
		$scope.searchKey.productName=x.productName+'/'+x.productNorms+'/'+x.manufacture;
		$scope.agreement.productId=x.id;
		$scope.isShow=false;
	}
	//一级商业公司
	$scope.searchKey1={
		name:'',
		desc:'',
		classType:"1",
		flag:0,
	};

	$scope.isShow1=false;
	$scope.search1=function(data){
		$scope.isShow1=true;
		$scope.searchKey1.name=$scope.searchKey1.name?$scope.searchKey1.name:'';
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList1 = data.merchans;
				}
			}
		})
	}
	$scope.selectProduct1=function(x){
		$scope.searchKey1.name=x.name;
		$scope.agreement.upMerchan=x.merchId;
		$scope.isShow1=false;
	}
	//二级商业公司
	$scope.searchKey2={
		name:'',
		desc:'',
		classType:"2",
		flag:0,
	};

	$scope.isShow2=false;
	$scope.search2=function(data){
		$scope.isShow2=true;
		$scope.searchKey2.name=$scope.searchKey2.name?$scope.searchKey2.name:'';
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList2 = data.merchans;
				}
			}
		})
	}
	$scope.selectProduct2=function(x){
		$scope.searchKey2.name=x.name;
		$scope.agreement.loMerchan=x.merchId;
		$scope.isShow2=false;
	}
	//医院（终端）
	$scope.searchKey3={
		hospitalName:'',
		flag:0,
	};

	$scope.isShow3=false;
	$scope.search3=function(data){
		$scope.isShow3=true;
		$scope.searchKey3.hospitalName=$scope.searchKey3.hospitalName?$scope.searchKey3.hospitalName:'';
		GetList.Post({
			url:Url.getUrl('hospList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList3 = data.hospitals;
				}
			}
		})
	}
	$scope.selectProduct3=function(x){
		$scope.searchKey3.hospitalName=x.hospitalName;
		$scope.agreement.hospitalId=x.hospitalId;
		$scope.isShow3=false;
	}
	//返利方式
	$scope.isShow4=false;
	$scope.search4=function(){
		$scope.isShow4=true;
		GetList.Post({
			url:Url.getUrl('rebateStyle'),
			data:{},
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList4 = data.result;
				}
			}
		})
	}
	$scope.selectProduct4=function(b){
		$scope.back_period_style=b.back_period_name+'/'+b.back_style_name;
		$scope.agreement.backPeriodStyle=b.back_id;
		$scope.isShow4=false;
	}
	$scope.save=function(){
		if($scope.startTime){
			$scope.agreement.startTime=$scope.startTime.getTime();
		}
		if($scope.endTime){
			$scope.agreement.endTime=$scope.endTime.getTime();
		}
		// $scope.agreement.backPeriodStyle=$scope.backPeriodStyle.back_id;
		console.log($scope)
		Http.postF({
			url:Url.getUrl('addMerchanProt'),
			data:{json:JSON.stringify($scope.agreement)},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.agreement.businessAgreement');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}
		})
	}
	document.onclick=function(){
		$timeout(function() {
			$scope.isShow=false;
			$scope.isShow1=false;
			$scope.isShow2=false;
			$scope.isShow3=false;
			$scope.isShow4=false;
		});
	}

}])
.controller('editAgreementCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList','$stateParams',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList,$stateParams){
	$scope.getDetail=function(x){
		Http.postF({
			url:Url.getUrl('businessAgreement')+x,
			// data:{id:},
		}).success(function(data){
			console.log(data);
			$scope.agreement.protocolId=data.protocol.protocolId;
			$scope.agreement.backPeriodStyle=data.protocol.backPeriodStyle;
			$scope.agreement.protocolCode=data.protocol.protocolCode;
			$scope.agreement.productId=data.protocol.productId;
			$scope.agreement.zoneId=data.protocol.zoneId;
			$scope.agreement.cityId=data.protocol.cityId;
			$scope.agreement.bidPrice=data.protocol.bidPrice;
			$scope.agreement.upMerchan=data.protocol.upMerchan;
			$scope.agreement.loMerchan=data.protocol.loMerchan;
			$scope.agreement.hospitalId=data.protocol.hospitalId;
			$scope.agreement.upBack=data.protocol.upBack;
			$scope.agreement.loBack=data.protocol.loBack;
			$scope.agreement.startTime=data.protocol.startTime;
			$scope.agreement.endTime=data.protocol.endTime;
			$scope.startTime=new Date(Number(data.protocol.startTime));
			$scope.endTime=new Date(Number(data.protocol.endTime));
			$scope.agreement.contactor=data.protocol.contactor;
			$scope.agreement.phone=data.protocol.phone;
			$scope.agreement.qq=data.protocol.qq;
			$scope.agreement.isValid=data.protocol.isValid;
			$scope.searchKey3.hospitalName=data.protocol.hospital.hospitalName;
			$scope.searchKey2.name=data.protocol.loMerchanInfo.name;
			$scope.searchKey1.name=data.protocol.upMerchanInfo.name;
			$scope.searchKey.productName=data.protocol.product.productName+'/'+data.protocol.product.productNorms+'/'+data.protocol.product.manufacture;
			$scope.back_period_style=data.protocol.backPeriodStyleMap.back_period_name+'/'+data.protocol.backPeriodStyleMap.back_style_name;
			console.log($scope)
		})
	}
	$scope.agreement={
		protocolId:'',
		backPeriodStyle:'1',
		protocolCode:'',
		productId:'',
		zoneId:'',
		cityId:'',
		bidPrice:'',
		upMerchan:'',
		loMerchan:'',
		hospitalId:'',
		upBack:'',
		loBack:'',
		startTime:'',
		endTime:'',
		contactor:'',
		phone:'',
		qq:'',
		isValid:'1',
	};
	$scope.searchKey={
		productName:'',
		productNorms:'',
		manufacture:'',
		flag:0,
	};
	//一级商业公司
	$scope.searchKey1={
		name:'',
		desc:'',
		classType:"1",
		flag:0,
	};
	//二级商业公司
	$scope.searchKey2={
		name:'',
		desc:'',
		classType:"2",
		flag:0,
	};
	//医院（终端）
	$scope.searchKey3={
		hospitalName:'',
		flag:0,
	};
	console.log($stateParams.obj)
	if($stateParams.obj){
		$scope.getDetail($stateParams.obj.protocolId);

		// $scope.agreement.protocolId=$stateParams.obj.protocolId;
		// $scope.agreement.backPeriodStyle=$stateParams.obj.backPeriodStyle;
		// $scope.agreement.protocolCode=$stateParams.obj.protocolCode;
		// $scope.agreement.productId=$stateParams.obj.productId;
		// $scope.agreement.zoneId=$stateParams.obj.zoneId;
		// $scope.agreement.cityId=$stateParams.obj.cityId;
		// $scope.agreement.bidPrice=$stateParams.obj.bidPrice;
		// $scope.agreement.upMerchan=$stateParams.obj.upMerchan;
		// $scope.agreement.loMerchan=$stateParams.obj.loMerchan;
		// $scope.agreement.hospitalId=$stateParams.obj.hospitalId;
		// $scope.agreement.upBack=$stateParams.obj.upBack;
		// $scope.agreement.loBack=$stateParams.obj.loBack;
		// $scope.agreement.startTime=new Date($stateParams.obj.startTime);
		// $scope.agreement.endTime=new Date($stateParams.obj.endTime);
		// $scope.agreement.contactor=$stateParams.obj.contactor;
		// $scope.agreement.phone=$stateParams.obj.phone;
		// $scope.agreement.qq=$stateParams.obj.qq;
		// // $scope.agreement.isValid=String($stateParams.obj.isValid);
		// $scope.searchKey3.hospitalName=$stateParams.obj.hospital.hospitalName;
		// $scope.searchKey2.name=$stateParams.obj.loMerchanInfo.name;
		// $scope.searchKey1.name=$stateParams.obj.upMerchanInfo.name;
		// $scope.searchKey.productName=$stateParams.obj.product.productName;
		// $scope.backPeriodStyle=$stateParams.obj.product.productName;

	}


	$scope.isShow=false;
	$scope.search=function(data){
		$scope.isShow=true;
		$scope.searchKey.productName=$scope.searchKey.productName?$scope.searchKey.productName:'';
		GetList.Post({
			url:Url.getUrl('productList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.pdataList = data.products.list;
				}
			}
		})
	}
	$scope.selectProduct=function(x){
		$scope.searchKey.productName=x.productName+'/'+x.productNorms+'/'+x.manufacture;
		$scope.agreement.productId=x.id;
		$scope.isShow=false;
	}
	//一级商业公司


	$scope.isShow1=false;
	$scope.search1=function(data){
		$scope.isShow1=true;
		$scope.searchKey1.name=$scope.searchKey1.name?$scope.searchKey1.name:'';
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList1 = data.merchans;
				}
			}
		})
	}
	$scope.selectProduct1=function(x){
		$scope.searchKey1.name=x.name;
		$scope.agreement.upMerchan=x.merchId;
		$scope.isShow1=false;
	}
	//二级商业公司

	$scope.isShow2=false;
	$scope.search2=function(data){
		$scope.isShow2=true;
		$scope.searchKey2.name=$scope.searchKey2.name?$scope.searchKey2.name:'';
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList2 = data.merchans;
				}
			}
		})
	}
	$scope.selectProduct2=function(x){
		$scope.searchKey2.name=x.name;
		$scope.agreement.loMerchan=x.merchId;
		$scope.isShow2=false;
	}
	//医院（终端）

	$scope.isShow3=false;
	$scope.search3=function(data){
		$scope.isShow3=true;
		$scope.searchKey3.hospitalName=$scope.searchKey3.hospitalName?$scope.searchKey3.hospitalName:'';
		GetList.Post({
			url:Url.getUrl('hospList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList3 = data.hospitals;
				}
			}
		})
	}
	$scope.selectProduct3=function(x){
		$scope.searchKey3.hospitalName=x.hospitalName;
		$scope.agreement.hospitalId=x.hospitalId;
		$scope.isShow3=false;
	}
	//返利方式
	$scope.isShow4=false;
	$scope.search4=function(){
		$scope.isShow4=true;
		GetList.Post({
			url:Url.getUrl('rebateStyle'),
			data:{},
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList4 = data.result;
				}
			}
		})
	}
	$scope.selectProduct4=function(b){
		$scope.back_period_style=b.back_period_name+'/'+b.back_style_name;
		$scope.agreement.backPeriodStyle=b.back_id;
		$scope.isShow4=false;
	}
	$scope.save=function(){
		if($scope.startTime){
			$scope.agreement.startTime=$scope.startTime.getTime();
		}
		if($scope.endTime){
			$scope.agreement.endTime=$scope.endTime.getTime();
		}
		console.log($scope)
		Http.postF({
			url:Url.getUrl('editMerchanProt'),
			data:{json:JSON.stringify($scope.agreement)},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.agreement.businessAgreement');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}
		})
	}
	document.onclick=function(){
		$timeout(function() {
			$scope.isShow=false;
			$scope.isShow1=false;
			$scope.isShow2=false;
			$scope.isShow3=false;
			$scope.isShow4=false;
		});
	}
}])
.controller('guestAgreementCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList){
	$scope.searchKey={
		customerName:'',
		productName:'',
		hospital:'',
		flag:1,
	};
	$scope.search=function(data){
		GetList.Post({
			url:Url.getUrl('protocolList'),
			data:data,
			scope:$scope,
			success:function(data){
				if(data.code == 1){
					data.protocols.map(function(v){
						v.validDate=new Date(Number(v.startTime)).toLocaleDateString()+'--'+new Date(Number(v.endTime)).toLocaleDateString();
						return v;
					})
					$scope.dataList = data.protocols;
					console.log($scope.dataList);

				}
			}
		})
	}
	$scope.search($scope.searchKey);
}])
.controller('addGuestAgreementCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList){
	$scope.agreement={
		protocolCode:'',
		productId:'',
		zoneId:'',
		cityId:'',
		upperMerchan:'',
		lowerMerchan:'',
		hospitalId:'',
		promotionExpense:'',
		bail:'',
		bailDesc:'',
		startTime:'',
		endTime:'',
		isValid:'1',
		type:'1',
		isHonour:'1',
		switchStandard:'0',
		switchAmount:'',
		switchExpense:'',
		rebatePeriod:'1',
		rebatePayer:'1',
		rebate:'',
		customerId:'1',
	};
	$scope.searchKey0={
		customerName:'',
		phone:'',
		flag:0,
	};

	$scope.isShow0=false;
	$scope.search0=function(data){
		$scope.isShow0=true;
		$scope.searchKey0.customerName=$scope.searchKey0.customerName?$scope.searchKey0.customerName:'';
		GetList.Post({
			url:Url.getUrl('customerList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList0 = data.customers.list;
				}
			}
		})
	}
	$scope.selectProduct0=function(x){
		$scope.searchKey0.customerName=x.customerName;
		$scope.agreement.customerId=x.customerId;
		$scope.isShow0=false;
	}

	$scope.searchKey={
		productName:'',
		productNorms:'',
		manufacture:'',
		flag:0,
	};
	$scope.isShow=false;
	$scope.search=function(data){
		$scope.isShow=true;
		$scope.searchKey.productName=$scope.searchKey.productName?$scope.searchKey.productName:'';
		GetList.Post({
			url:Url.getUrl('productList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.pdataList = data.products.list;
				}
			}
		})
	}
	$scope.selectProduct=function(x){
		$scope.searchKey.productName=x.productName+'/'+x.productNorms+'/'+x.manufacture;
		$scope.agreement.productId=x.id;
		$scope.isShow=false;
	}
	//一级商业公司
	$scope.searchKey1={
		name:'',
		desc:'',
		classType:"1",
		flag:0,
	};

	$scope.isShow1=false;
	$scope.search1=function(data){
		$scope.isShow1=true;
		$scope.searchKey1.name=$scope.searchKey1.name?$scope.searchKey1.name:'';
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList1 = data.merchans;
				}
			}
		})
	}
	$scope.selectProduct1=function(x){
		$scope.searchKey1.name=x.name;
		$scope.agreement.upperMerchan=x.merchId;
		$scope.isShow1=false;
	}
	//二级商业公司
	$scope.searchKey2={
		name:'',
		desc:'',
		classType:"2",
		flag:0,
	};

	$scope.isShow2=false;
	$scope.search2=function(data){
		$scope.isShow2=true;
		$scope.searchKey2.name=$scope.searchKey2.name?$scope.searchKey2.name:'';
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList2 = data.merchans;
				}
			}
		})
	}
	$scope.selectProduct2=function(x){
		$scope.searchKey2.name=x.name;
		$scope.agreement.lowerMerchan=x.merchId;
		$scope.isShow2=false;
	}
	//医院（终端）
	$scope.searchKey3={
		hospitalName:'',
		flag:0,
	};

	$scope.isShow3=false;
	$scope.search3=function(data){
		$scope.isShow3=true;
		$scope.searchKey3.hospitalName=$scope.searchKey3.hospitalName?$scope.searchKey3.hospitalName:'';
		GetList.Post({
			url:Url.getUrl('hospList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList3 = data.hospitals;
				}
			}
		})
	}
	$scope.selectProduct3=function(x){
		$scope.searchKey3.hospitalName=x.hospitalName;
		$scope.agreement.hospitalId=x.hospitalId;
		$scope.isShow3=false;
	}
	//返利方式
	$scope.isShow4=false;
	$scope.search4=function(){
		$scope.isShow4=true;
		GetList.Post({
			url:Url.getUrl('rebateStyle'),
			data:{},
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList4 = data.result;
				}
			}
		})
	}
	$scope.selectProduct4=function(b){
		$scope.back_period_style=b.back_period_name+'/'+b.back_style_name;
		$scope.agreement.hospitalId=b.hospitalId;
		$scope.isShow4=false;
	}
	$scope.save=function(){
		if($scope.startTime){
			$scope.agreement.startTime=$scope.startTime.getTime();
		}
		if($scope.endTime){
			$scope.agreement.endTime=$scope.endTime.getTime();
		}
		// $scope.agreement.backPeriodStyle=$scope.backPeriodStyle.back_id;
		console.log($scope)
		Http.postF({
			url:Url.getUrl('addprotocol'),
			data:{json:JSON.stringify($scope.agreement)},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.agreement.guestAgreement');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}
		})
	}
	document.onclick=function(){
		$timeout(function() {
			$scope.isShow=false;
			$scope.isShow0=false;
			$scope.isShow1=false;
			$scope.isShow2=false;
			$scope.isShow3=false;
			$scope.isShow4=false;
		});
	}

}])
.controller('editGuestAgreementCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList','$stateParams',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList,$stateParams){
	$scope.agreement={
		protocolCode:'',
		productId:'',
		zoneId:'',
		cityId:'',
		upperMerchan:'',
		lowerMerchan:'',
		hospitalId:'',
		promotionExpense:'',
		bail:'',
		bailDesc:'',
		startTime:'',
		endTime:'',
		isValid:'1',
		type:'1',
		isHonour:'1',
		switchStandard:'0',
		switchAmount:'',
		switchExpense:'',
		rebatePeriod:'1',
		rebatePayer:'1',
		rebate:'',
		customerId:'1',
	};
	$scope.rebatePeriodList=[
		{value:"1",name:"月结"},
        {value:"2",name:"压批压月"},
        {value:"3",name:"60天"},
        {value:"4",name:"90天"},
        {value:"5",name:"120天"}
	];
	$scope.getDetail=function(x){
		Http.postF({
			url:Url.getUrl('guestAgreement')+x,
		}).success(function(data){
			console.log(data);
			$scope.agreement.protocolId=data.protocol.protocolId;
			$scope.agreement.protocolCode=data.protocol.protocolCode;
			$scope.agreement.productId=data.protocol.productId;
			$scope.agreement.zoneId=data.protocol.zoneId;
			$scope.agreement.cityId=data.protocol.cityId;
			$scope.agreement.upperMerchan=data.protocol.upperMerchan;
			$scope.agreement.lowerMerchan=data.protocol.lowerMerchan;
			$scope.agreement.hospitalId=data.protocol.hospitalId;
			$scope.agreement.promotionExpense=data.protocol.promotionExpense;
			$scope.agreement.bail=data.protocol.bail;
			$scope.agreement.bailDesc=data.protocol.bailDesc;
			$scope.agreement.startTime=data.protocol.startTime;
			$scope.agreement.endTime=data.protocol.endTime;
			$scope.agreement.isValid=data.protocol.isValid;
			$scope.startTime=new Date(Number(data.protocol.startTime));
			$scope.endTime=new Date(Number(data.protocol.endTime));
			$scope.agreement.type=data.protocol.type;
			$scope.agreement.isHonour=data.protocol.isHonour;
			$scope.agreement.switchStandard=data.protocol.switchStandard;
			$scope.agreement.switchAmount=data.protocol.switchAmount;
			$scope.agreement.switchExpense=data.protocol.switchExpense;
			$scope.agreement.rebatePeriod=String(data.protocol.rebatePeriod);
			$scope.agreement.rebatePayer=data.protocol.rebatePayer;
			$scope.agreement.rebate=data.protocol.rebate;
			$scope.agreement.customerId=data.protocol.customerId;
			$scope.searchKey3.hospitalName=data.protocol.hospital.hospitalName;
			$scope.searchKey2.name=data.protocol.lowerMerchanInfo.name;
			$scope.searchKey1.name=data.protocol.upperMerchanInfo.name;
			$scope.searchKey0.customerName=data.protocol.customer.customerName;
			$scope.searchKey.productName=data.protocol.product.productName+'/'+data.protocol.product.productNorms+'/'+data.protocol.product.manufacture;
			console.log($scope.agreement.rebatePeriod)
		})
	}
	$scope.searchKey0={
		customerName:'',
		phone:'',
		flag:0,
	};
	$scope.searchKey={
		productName:'',
		productNorms:'',
		manufacture:'',
		flag:0,
	};
	//一级商业公司
	$scope.searchKey1={
		name:'',
		desc:'',
		classType:"1",
		flag:0,
	};
	//二级商业公司
	$scope.searchKey2={
		name:'',
		desc:'',
		classType:"2",
		flag:0,
	};
	//医院（终端）
	$scope.searchKey3={
		hospitalName:'',
		flag:0,
	};
	if($stateParams.obj){
		$scope.getDetail($stateParams.obj.protocolId);
	}
	$scope.isShow0=false;
	$scope.search0=function(data){
		$scope.isShow0=true;
		$scope.searchKey0.customerName=$scope.searchKey0.customerName?$scope.searchKey0.customerName:'';
		GetList.Post({
			url:Url.getUrl('customerList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList0 = data.customers.list;
				}
			}
		})
	}
	$scope.selectProduct0=function(x){
		$scope.searchKey0.customerName=x.customerName;
		$scope.agreement.customerId=x.customerId;
		$scope.isShow0=false;
	}


	$scope.isShow=false;
	$scope.search=function(data){
		$scope.isShow=true;
		$scope.searchKey.productName=$scope.searchKey.productName?$scope.searchKey.productName:'';
		GetList.Post({
			url:Url.getUrl('productList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.pdataList = data.products.list;
				}
			}
		})
	}
	$scope.selectProduct=function(x){
		$scope.searchKey.productName=x.productName+'/'+x.productNorms+'/'+x.manufacture;
		$scope.agreement.productId=x.id;
		$scope.isShow=false;
	}
	//一级商业公司

	$scope.isShow1=false;
	$scope.search1=function(data){
		$scope.isShow1=true;
		$scope.searchKey1.name=$scope.searchKey1.name?$scope.searchKey1.name:'';
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList1 = data.merchans;
				}
			}
		})
	}
	$scope.selectProduct1=function(x){
		$scope.searchKey1.name=x.name;
		$scope.agreement.upperMerchan=x.merchId;
		$scope.isShow1=false;
	}
	//二级商业公司

	$scope.isShow2=false;
	$scope.search2=function(data){
		$scope.isShow2=true;
		$scope.searchKey2.name=$scope.searchKey2.name?$scope.searchKey2.name:'';
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList2 = data.merchans;
				}
			}
		})
	}
	$scope.selectProduct2=function(x){
		$scope.searchKey2.name=x.name;
		$scope.agreement.lowerMerchan=x.merchId;
		$scope.isShow2=false;
	}
	//医院（终端）

	$scope.isShow3=false;
	$scope.search3=function(data){
		$scope.isShow3=true;
		$scope.searchKey3.hospitalName=$scope.searchKey3.hospitalName?$scope.searchKey3.hospitalName:'';
		GetList.Post({
			url:Url.getUrl('hospList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList3 = data.hospitals;
				}
			}
		})
	}
	$scope.selectProduct3=function(x){
		$scope.searchKey3.hospitalName=x.hospitalName;
		$scope.agreement.hospitalId=x.hospitalId;
		$scope.isShow3=false;
	}
	//返利方式
	$scope.isShow4=false;
	$scope.search4=function(){
		$scope.isShow4=true;
		GetList.Post({
			url:Url.getUrl('rebateStyle'),
			data:{},
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList4 = data.result;
				}
			}
		})
	}
	$scope.selectProduct4=function(b){
		$scope.back_period_style=b.back_period_name+'/'+b.back_style_name;
		$scope.agreement.hospitalId=b.hospitalId;
		$scope.isShow4=false;
	}
	$scope.save=function(){
		if($scope.startTime){
			$scope.agreement.startTime=$scope.startTime.getTime();
		}
		if($scope.endTime){
			$scope.agreement.endTime=$scope.endTime.getTime();
		}
		// $scope.agreement.backPeriodStyle=$scope.backPeriodStyle.back_id;
		console.log($scope)
		Http.postF({
			url:Url.getUrl('editprotocol'),
			data:{json:JSON.stringify($scope.agreement)},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.agreement.guestAgreement');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}
		})
	}
	document.onclick=function(){
		$timeout(function() {
			$scope.isShow=false;
			$scope.isShow0=false;
			$scope.isShow1=false;
			$scope.isShow2=false;
			$scope.isShow3=false;
			$scope.isShow4=false;
		});
	}

}])
angular.module('agreement.router',['agreement.ctrl'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('home.agreement',{
		url:'/agreement',
		templateUrl: 'views/agreement/agreement.html',
		controller:'agreementCtrl'
	})
	.state('home.agreement.businessAgreement',{
		url:'/businessAgreement',
		templateUrl: 'views/agreement/businessAgreement/businessAgreement.html',
		controller:'businessAgreementCtrl',
		params:{
			obj:null
		}
	})
	.state('home.agreement.addAgreement',{
		url:'/addAgreement',
		templateUrl: 'views/agreement/businessAgreement/addAgreement.html',
		controller:'addAgreementCtrl'
	})
	.state('home.agreement.editAgreement',{
		url:'/editagreement',
		templateUrl: 'views/agreement/businessAgreement/agreementEdit.html',
		controller:'editAgreementCtrl',
		params: {
	        obj: null 
	    }
	})
	.state('home.agreement.guestAgreement',{
		url:'/guestAgreement',
		templateUrl: 'views/agreement/guestAgreement/guestAgreement.html',
		controller:'guestAgreementCtrl',
		params:{
			obj:null
		}
	})
	.state('home.agreement.addGuestAgreement',{
		url:'/addGuestAgreement',
		templateUrl: 'views/agreement/guestAgreement/addGuestAgreement.html',
		controller:'addGuestAgreementCtrl'
	})
	.state('home.agreement.editGuestAgreement',{
		url:'/editGuestAgreement',
		templateUrl: 'views/agreement/guestAgreement/editGuestAgreement.html',
		controller:'editGuestAgreementCtrl',
		params: {
	        obj: null 
	    }
	})

}])
angular.module("app",["ui.router",'router','pubulic','tm.pagination'])
// .directive('dialog',function(){
// 	return {
// 		restrict:'EAC',
// 		templateUrl:'views/common/modal.html'
// 	}
// })
// .directive('tipalert',function(){
// 	return {
// 		restrict:'EAC',
// 		replace:true,
// 		template:"<div class='tip-alert' ng-show='tip_alert_show'>"+
// 			"<div class='tip-cover'></div>"+
// 			"<span ng-bind='tip_alert_msg' ng-></span>"+
// 		"</div>",
// 		link:function(scope,element,attrs){
// 			scope.tip_alert_show=false;
// 		}
// 	}
// })
// .directive('tipLog',['$rootScope','$timeout',function($rootScope,$timeout){
// 	return {
// 		restrict:'EAC',
// 		replace:true,
// 		template:"<div class='tip-alert' ng-show='tip_alert_show'>"+
// 			"<div class='tip-cover'></div>"+
// 			"<span ng-bind='tip_alert_msg' ng-></span>"+
// 		"</div>",
// 		link:function(scope,element,attrs){
// 			scope.tip_alert_show=false;
// 			$rootScope.$on('tiplog',function(e,data){
// 				if(data&&typeof data == "string"){
// 					scope.tip_alert_show = true;
// 					scope.tip_alert_msg = data;
// 					$timeout(function(){
// 						scope.tip_alert_show=false;
// 					},2000)
// 				}
// 			})
// 		}
// 	}
// }])
// .directive('dialog',function(){
// 	return {
// 		restrict:'EAC',
// 		templateUrl:'src/dist/views/common/modal.html'
// 	}
// })
.directive('tipalert',function(){
	return {
		restrict:'EAC',
		replace:true,
		template:"<div class='tip-alert' ng-class='tip_alert_type' ng-show='tip_alert_show'>"+
			"<span ng-bind='tip_alert_msg.txt' ng-click='closeAlert()'></span>"+
			"<i></i>"+
			"</div>",
		link:function(scope,element,attrs){
			scope.closeAlert=function(){
				scope.tip_alert_show = false;
			}
		}
	}
})
.directive("alertModal",function(){
	return {
		restrict:'EAC',
		replace:true,
		templateUrl:"ykf_tpl_alert_modal",
		link:function(scope){
			scope.ykf_alert_show = false;
		}
	}
})
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
.factory("Ele",function(){
	return {
		e:function(obj,content){
			var firstChar=obj.charAt(0);
			var content=content||document;
			if(firstChar=="#"){
				return content.getElementById(obj.substring(1));
			}else if(firstChar=="."){
				var arr=[];
				var aEls=content.getElementsByTagName("*");
					for(var i=0;i<aEls.length;i++){
							var aClassName=	aEls[i].className.split(" ");
								 for(var j=0;j<aClassName.length;j++){
									if(aClassName[j]==obj.slice(1)){
										arr.push(aEls[i]);
										break;
									}
									
								 }
							}
				return arr;
			}else{
				return document.getElementsByTagName(obj);
			}
		
		}
	}
})
.factory('Tip',['$timeout',"Ele",function($timeout,Ele){
	return {
		//对话框，传参为对话信息，确认之后的动作，关闭之后的动作
		Confirm:function(scope,massage,callback1,callback2){
			$timeout(function(){
				scope.ykf_confirm_show=true;
				if(typeof massage=="object"){
					if(massage.title){
						scope.ykf_confirm_title_show=true;
						scope.ykf_confirm_title = massage.title;
					}
					scope.ykf_confirm_msg = massage.msg;
				}else if(typeof massage=="string"){
					scope.ykf_confirm_msg = massage;
				}
			})	
			scope.confirm_show = 'confirm-show';
			scope.ykf_modal_sure = function(){
				$timeout(function(){
					scope.confirm_show = 'confirm-out';
					scope.ykf_confirm_show=false;
					scope.ykf_confirm_title_show=false;
				})	
				callback1&&callback1();
			}
			scope.ykf_modal_close = function(){
				$timeout(function(){
					scope.confirm_show = 'confirm-out';
					scope.ykf_confirm_show=false;
					scope.ykf_confirm_title_show=false;
				})	
				callback2&&callback2();
			}
		},
		Log:function(scope,msg,cb){
			console.log()
			$timeout(function(){
				scope.tip_alert_msg=msg;
				if(scope.tip_alert_msg.type==1){
					scope.tip_alert_type="tip-alert-success";
					$timeout(function(){
						scope.tip_alert_show=false;
						cb&&cb();
					},1000)
				}else{
					scope.tip_alert_type="tip-alert-error";
				}
				scope.tip_alert_show=true;
			})
		},
		Alert:function(scope,message,cb){
			scope.ykf_alert_show = true;
			scope.ykf_alert_msg = message;
			scope.ykf_alert_sure = function(){
				scope.ykf_alert_show = false;
				cb&&cb();
			}
		}

	}
}])
// .factory('Tip',['$timeout','$rootScope',function($timeout,$rootScope){
// 	return {
// 		//弹窗提示，第一个参数为提示内容，若改变title和宽度第一个参数需传含有title和msg两个参数的对象
// 		//第二参数为回调函数
// 		Alert:function(massage,callback){
// 			var dialogTit,dialogMsg,dialogWidth;
// 			if(typeof massage =='object'){
// 				dialogTit = massage.title?massage.title:'来自'+window.location.host+'的提示';
// 				dialogMsg = massage.msg?massage.msg:'';
// 				dialogWidth = massage.width?massage.width:false;
// 			}else if(typeof massage =='string'){
// 				dialogTit = '来自'+window.location.host+'的提示';
// 				dialogMsg = massage;
// 			}
// 			$('#dialogChange').hide();
// 			$('#dialogClose').text('确认');
// 			$('#dialogTitle').text(dialogTit);
// 			$('#dialogMsg').text(dialogMsg);
// 			$('#myDialog').one('hidden.bs.modal',function(){
// 				callback&&callback();
// 				$('#dialogClose').text('取消');
// 				$('#dialogChange').show();
// 				$('.modal-content').attr("style","");
// 			});
// 			if(dialogWidth) $('.modal-content').css({width:parseInt(width),margin:'0 auto'});
// 			$('#myDialog').modal({
// 				backdrop: 'static'
// 			})
// 		},
// 		//对话框，传参为对话信息，确认之后的动作，关闭之后的动作
// 		Confirm:function(massage,callback1,callback2){
// 			var dialogTit,dialogMsg,dialogWidth;
// 			if(typeof massage =='object'){
// 				dialogTit = massage.title?massage.title:'来自'+window.location.host+'的提示';
// 				dialogMsg = massage.msg?massage.msg:'';
// 				dialogWidth = massage.width?massage.width:false;
// 			}else if(typeof massage =='string'){
// 				dialogTit = '来自'+window.location.host+'的提示';
// 				dialogMsg = massage;
// 			}
// 			$('#dialogTitle').text(dialogTit);
// 			$('#dialogMsg').text(dialogMsg);
// 			$('#dialogClose').unbind('click').bind('click',function(){
// 				callback2&&callback2();
// 			})
// 			$('#dialogCloseT').unbind('click').bind('click',function(){
// 				callback2&&callback2();
// 			})
// 			$('#dialogChange').unbind('click').bind('click',function(){
// 				$('#myDialog').modal('hide');
// 				callback1&&callback1();
// 			})
// 			$('#myDialog').one('hidden.bs.modal',function(){
// 				$('#dialogClose').unbind('click');
// 				$('#dialogCloseT').unbind('click');
// 				$('#dialogChange').unbind('click');
// 				$('.modal-content').attr("style","");
// 			});
// 			if(dialogWidth) $('.modal-content').css({width:parseInt(dialogWidth),margin:'0 auto'});
// 			$('#myDialog').modal({
// 				backdrop: 'static'
// 			})
// 		},
// 		Check:function(callback1,callback2){
// 			var dialogTit,dialogMsg,dialogWidth=400;
// 			dialogMsg='<div class="checkbox">'+
// 					    '<label>'+
// 					      '<input type="radio" name="sq" value="kfz" class="wechat_radio"> 公众号开发者授权'+
// 					    '</label>'+
// 					  '</div>'+
// 					  '<div class="checkbox">'+
// 					    '<label>'+
// 					      '<input type="radio" name="sq" value="pt" class="wechat_radio"> 公众号第三方平台授权'+
// 					    '</label>'+
// 					  '</div>';
// 			dialogTit='选择绑定方式';
// 			$('#dialogTitle').html(dialogTit);
// 			$('#dialogMsg').html(dialogMsg);
// 			$('#dialogClose').unbind('click').bind('click',function(){
// 				callback2&&callback2();
// 			})
// 			$('#dialogCloseT').unbind('click').bind('click',function(){
// 				callback2&&callback2();
// 			})
// 			$('#dialogChange').unbind('click').bind('click',function(){
// 				$('#myDialog').modal('hide');
// 				callback1&&callback1();
// 				$('#dialogTitle').html('');
// 				$('#dialogMsg').html('');
// 			})
// 			$('#myDialog').one('hidden.bs.modal',function(){
// 				$('#dialogClose').unbind('click');
// 				$('#dialogCloseT').unbind('click');
// 				$('#dialogChange').unbind('click');
// 				$('.modal-content').attr("style","");
// 			});
// 			if(dialogWidth) $('.modal-content').css({width:parseInt(dialogWidth),margin:'0 auto'});
// 			$('#myDialog').modal({
// 				backdrop: 'static'
// 			})
// 		},
// 		Checkbox:function(callback1,callback2){
// 			var dialogTit,dialogMsg,dialogWidth=400;
// 			dialogMsg='<div class="checkbox">'+
// 					    '<label>'+
// 					      '<span class="Acceptname">受理客服组：</span>'+'<select name="" class="Acceptkf">'+'<option value="受理客服组">受理客服组</option>'+'<lect>'+
// 					    '</label>'+
// 					  '</div>'+
// 					  '<div class="checkbox">'+
// 					    '<label>'+
// 					      '<span class="Acceptname">受理客服：</span>'+'<select name="" class="Acceptkf">'+'<option value="受理客服">受理客服</option>'+'<lect>'+
// 					    '</label>'+
// 					  '</div>';
// 			dialogTit='转移工单';
// 			$('#dialogTitle').html(dialogTit);
// 			$('#dialogMsg').html(dialogMsg);
// 			$('#dialogClose').unbind('click').bind('click',function(){
// 				callback2&&callback2();
// 			})
// 			$('#dialogCloseT').unbind('click').bind('click',function(){
// 				callback2&&callback2();
// 			})
// 			$('#dialogChange').unbind('click').bind('click',function(){
// 				$('#myDialog').modal('hide');
// 				callback1&&callback1();
// 				$('#dialogTitle').html('');
// 				$('#dialogMsg').html('');
// 			})
// 			$('#myDialog').one('hidden.bs.modal',function(){
// 				$('#dialogClose').unbind('click');
// 				$('#dialogCloseT').unbind('click');
// 				$('#dialogChange').unbind('click');
// 				$('.modal-content').attr("style","");
// 			});
// 			if(dialogWidth) $('.modal-content').css({width:parseInt(dialogWidth),margin:'0 auto'});
// 			$('#myDialog').modal({
// 				backdrop: 'static'
// 			})
// 		},
// 		Log:function(msg,cb){
// 			$rootScope.$broadcast('tiplog',msg);
// 			cb&&cb();
// 		}
// 	}
// }])
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
		 				if(data.code == 1){
		 					$timeout(function(){
			 					scope.data=data;
			 					scope.paginationConf.totalItems=data.totalCount;
			 					callback&&callback(data);
			 				})
		 				}
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
		    	if(data.code == 1){
		    		$timeout(function(){
			    		scope.pagShow=true;
			    		scope.data=data;
	 					scope.paginationConf.totalItems=data.totalCount;
	 					callback&&callback(data);
			    	})
		    	}
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
		 				if(data.code == 1){
				    		$timeout(function(){
					    		scope.pagShow=true;
					    		scope.data=data;
			 					scope.paginationConf.totalItems=data.totalCount;
			 					callback&&callback(data);
					    	})
				    	}
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
		    	if(data.code == 1){
		    		$timeout(function(){
			    		scope.pagShow=true;
			    		scope.data=data;
	 					scope.paginationConf.totalItems=data.totalCount;
	 					callback&&callback(data);
			    	})
		    	}else{
					Tip.Log(scope,{txt:data.message,type:0})
				}	
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
	'company.router',
	'product.router',
	'agreement.router',
])
.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
	// $locationProvider.html5Mode({
	//     enabled: true,
	//     requireBase: false
	// });
	$urlRouterProvider.otherwise('login');
}]);

angular.module('company.ctrl',[])
.controller('companyCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data){
	$scope.list = Data.getData('company').list;
}])
.controller('companyManageCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList){
	$scope.searchKey={
		name:'',
		desc:'',
		flag:1,
	};
	$scope.search=function(data){
		GetList.Post({
			url:Url.getUrl('companyList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList = data.merchans;
				}
			}
		})
	}
	$scope.search($scope.searchKey);
}])
.controller('addCompanyCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList){
	$scope.company={
		name:'',
		desc:'',
		// area:'',
		// city:'',
		classType:'',
	};
	$scope.save=function(){
		Http.postF({
			url:Url.getUrl('addCompany'),
			data:{json:JSON.stringify($scope.company)},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.company.companyManage');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}
		})
	}
}])
.controller('editCompanyCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList','$stateParams',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList,$stateParams){
	$scope.company={
		name:'',
		desc:'',
		classType:'',
		// area:'',
		// city:'',
		merchId:''
	};
	if($stateParams.obj){
		$scope.company=$stateParams.obj;
		$scope.company.classType=String($scope.company.classType);
	}
	console.log($stateParams.obj)
	$scope.save=function(){
		Http.postF({
			url:Url.getUrl('editCompany'),
			data:{json:JSON.stringify($scope.company)},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.company.companyManage');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}

		})
	}
}])
angular.module('company.router',['company.ctrl'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('home.company',{
		url:'/company',
		templateUrl: 'views/company/company.html',
		controller:'companyCtrl'
	})
	.state('home.company.companyManage',{
		url:'/companyManage',
		templateUrl: 'views/company/companyManage.html',
		controller:'companyManageCtrl',
		params:{
			obj:null
		}
	})
	.state('home.company.addCompany',{
		url:'/addCompany',
		templateUrl: 'views/company/addCompany.html',
		controller:'addCompanyCtrl'
	})
	.state('home.company.editCompany',{
		url:'/editCompany',
		templateUrl: 'views/company/companyEdit.html',
		controller:'editCompanyCtrl',
		params: {
	        obj: null 
	    }
	})
}])
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
				}else{
					Tip.Log($scope,{txt:data.message,type:0})
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
	$scope.deleflow = function(){
		var mydeleMsg = {
			impType:$scope.myMsg.impType,
			impYear:$scope.myMsg.impYear,
			impMonth:$scope.myMsg.impMonth,
			delFlag:'1',
			pathList:$scope.myMsg.pathList
		};
		if(!$scope.myMsg.impType||!$scope.myMsg.impYear||!$scope.myMsg.impMonth){
			Tip.Log($scope,{txt:'请先选择条件',type:0});
			return;
		}
		Http.postF({
			url:Url.getUrl("importFlowFile"),
			data:{
				json:JSON.stringify(mydeleMsg)
			}
		}).success(function(data){
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.flow.flowgl');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}
		})
	}
	$scope.upload = function(){
		Http.byForm({
			url:Url.getUrl('uploadFlowFile'),
			fileName:'file',
			multiple:"multipart",
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.pathList = JSON.parse(data.pathList);
					Tip.Log($scope,{txt:data.message,type:1});
				}else{
					Tip.Log($scope,{txt:data.message,type:0})
				}
			}
		})
	}
	$scope.flow = function(){
		if(!$scope.myMsg.impType||!$scope.myMsg.impYear||!$scope.myMsg.impMonth||!$scope.myMsg.pathList){
			Tip.Log($scope,{txt:'请先选择条件',type:0});
			return;
		}
		Http.postF({
			url:Url.getUrl("importFlowFile"),
			data:{
				json:JSON.stringify($scope.myMsg)
			}
		}).success(function(data){
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.flow.flowgl');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
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
	//上次结算时间
	$scope.settlementDate = function(){
		Http.get({
			url:Url.getUrl('latest')
		}).success(function(data){
			console.log(data)
			if(data.code == 1){
				$scope.lastDate=data.date;
			}else{

			}
		})
	}
	$scope.settlementDate();
	$scope.settlement = function(x){
		Http.get({
			url:Url.getUrl('goSettlement')+'/'+x.rebateId
		}).success(function(data){
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					getlist();
				})
			}else{

			}
		})
	}
	$scope.cancelSettlement = function(x){
		Http.get({
			url:Url.getUrl('cancelSettlement')+'/'+x.rebateId
		}).success(function(data){
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					getlist();
				})
				
			}else{

			}
		})
	}
	$scope.handleSettle = function(){
		Http.postF({
			url:Url.getUrl('handleSettlement')
		}).success(function(data){
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					getlist();
				})
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
.controller("homeCtrl",['$scope','Data','$stateParams','$http','Url',"$timeout",'Http','Tip','$state',function($scope,Data,$stateParams,$http,Url,$timeout,Http,Tip,$state){
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
	$scope.menu.product = Data.getData('product').title;
	$scope.menu.agreement = Data.getData('agreement').title;
	$scope.menu.company = Data.getData('company').title;
	$scope.getusername=function(){
		Http.postF({
			url:Url.getUrl('username'),
			data:{},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				$scope.username=data.username;
			}else{
				// Tip.Log($scope,{txt:data.message,type:0},function(){
				// 	$state.go('home.login');
				// })
			}
		})
	}
	$scope.getusername();
	$scope.loginout=function(){
		Http.postF({
			url:Url.getUrl('logout'),
			data:{},
		}).success(function(data){
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('login');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0},function(){
					$state.go('login');
				})
			}
		})
	}
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
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.kf.kfgl');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
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
			Tip.Log($scope,{txt:'服务端异常',type:0})
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
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go("home.kf.kfgl");
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
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
			Tip.Log($scope,{txt:'服务端异常',type:0});
		}
	})
	$scope.saveMsg = function(){
		Http.postF({
			url:Url.getUrl('bjKh'),
			data:{json:JSON.stringify($scope.myMsg)}
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go("home.kf.kfzgl");
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
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
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go("home.kf.kfzgl");
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
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
			// Tip.Log(data.message);
			if(data.code==1){
				$state.go('home.agreement.businessAgreement');
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
angular.module('product.ctrl',[])
.controller('productCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data){
	$scope.list = Data.getData('product').list;
}])
.controller('productManageCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList){
	$scope.searchKey={
		productName:'',
		productNorms:'',
		manufacture:'',
		flag:1,
	};
	$scope.search=function(data){
		GetList.Post({
			url:Url.getUrl('productList'),
			data:data,
			scope:$scope,
			success:function(data){
				console.log(data);
				if(data.code == 1){
					$scope.dataList = data.products;
				}
			}
		})
	}
	$scope.search($scope.searchKey);
}])
.controller('addProductCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList){
	$scope.product={
		productName:'',
		productNorms:'',
		manufacture:'',
		productPrice:''
	};
	$scope.save=function(){
		Http.postF({
			url:Url.getUrl('addProduct'),
			data:{json:JSON.stringify($scope.product)},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.product.productManage');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}
		})
	}
}])
.controller('editProductCtrl',['$scope','GetList','Url','$http','$state','$timeout','groupsRoles','Tip','Http','Data','GetList','$stateParams',function($scope,GetList,Url,$http,$state,$timeout,groupsRoles,Tip,Http,Data,GetList,$stateParams){
	$scope.product={
		productName:'',
		productNorms:'',
		manufacture:'',
		productPrice:''
	};
	$scope.product=$stateParams.obj;
	// $scope.getDetail=function(x){
	// 	Http.postF({
	// 		url:Url.getUrl('productDetail'),
	// 		data:{id:x},
	// 	}).success(function(data){
	// 		console.log(data);
	// 		if(data.code == 1){
	// 			Tip.log(data.massage,function(){
	// 				$state.go('home.product.productManage');
	// 			})
	// 		}
	// 	})
	// }
	console.log($stateParams.obj)
	// $scope.getDetail($stateParams.obj)
	$scope.save=function(){
		Http.postF({
			url:Url.getUrl('editProduct'),
			data:{json:JSON.stringify($scope.product)},
		}).success(function(data){
			console.log(data);
			if(data.code == 1){
				Tip.Log($scope,{txt:data.message,type:1},function(){
					$state.go('home.product.productManage');
				})
			}else{
				Tip.Log($scope,{txt:data.message,type:0})
			}
		})
	}
}])
angular.module('product.router',['product.ctrl'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('home.product',{
		url:'/product',
		templateUrl: 'views/product/product.html',
		controller:'productCtrl'
	})
	.state('home.product.productManage',{
		url:'/productManage',
		templateUrl: 'views/product/productManage.html',
		controller:'productManageCtrl',
		params:{
			obj:null
		}
	})
	.state('home.product.addProduct',{
		url:'/productManage',
		templateUrl: 'views/product/addProduct.html',
		controller:'addProductCtrl'
	})
	.state('home.product.editProduct',{
		url:'/editProduct',
		templateUrl: 'views/product/productEdit.html',
		controller:'editProductCtrl',
		params: {
	        obj: null 
	    }
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
				company:
		{
			'title':'商业',
			'state':'.company',
			'list':[
				{
					'title':'商业管理',
					'state':'.companyManage'
				}
			]				
		},
		product:
		{
			'title':'产品',
			'state':'.product',
			'list':[
				{
					'title':'产品管理',
					'state':'home.product.productManage'
				}
			]				
		},
		agreement:
		{
			'title':'协议',
			'state':'.agreement',
			'list':[
				{
					'title':'商业协议',
					'state':'home.agreement.businessAgreement'
				},
				{
					'title':'客户协议',
					'state':'home.agreement.guestAgreement'
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
		//lkm
		hospList:'api/hosp/query/list',//终端列表
		customerList:'api/customer/query/list',//客户列表
		productList:'api/product/query/list',//获取产品列表
		addProduct:'api/product/insert/one',//添加产品
		editProduct:'api/product/update/one',//编辑产品
		productDetail:'api/product/query/one',//查看产品详情
		merchanProtList:'api/merchanProt/query/list',//获取商业协议列表
		addMerchanProt:'api/merchanProt/insert/one',//添加商业协议
		editMerchanProt:'api/merchanProt/update/one',//编辑商业协议
		businessAgreement:'api/merchanProt/query/one/',//查看商业协议详情
		protocolList:'api/protocol/query/list/valid',//获取客户协议列表
		usingAgreement:'api/protocol/query/list/valid',//客户详情在用协议
		addprotocol:'api/protocol/insert/one',//添加客户协议
		editprotocol:'api/protocol/update/one',//编辑客户协议
		guestAgreement:'api/protocol/query/one/',//查看客户协议详情
		companyList:'api/merchan/merchan/list ',//获取公司列表
		addCompany:'api/merchan/merchan/add',//添加公司
		editCompany:'api/merchan/merchan/update',//编辑公司
		merchanProtDetail:'api/merchan/merchan/one',//查看公司详情
		rebateStyle:'api/rebateStyle/list',//查看返利方式
		logout:'api/login/logout',//退出登录
		username:'api/user/username',//用户名
		latest:'api/rebateProcess/time/latest',//上次结算时间

	}
	return {
		getUrl:function(url){
			for(i in urlData){
				if(url==i){
					 // return 'cycrm/'+urlData[i];//测试使用
					 return urlData[i];//发布使用
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFncmVlbWVudC9hZ3JlZW1lbnQtY3RybC5qcyIsImFncmVlbWVudC9hZ3JlZW1lbnQtcm91dGVyLmpzIiwiY29tbW9uL2FwcC5qcyIsImNvbW1vbi9jb21tb24uanMiLCJjb21tb24vcGFnaW5hdGlvbi5qcyIsImNvbW1vbi9yb3V0ZXIuanMiLCJjb21wYW55L2NvbXBhbnktY3RybC5qcyIsImNvbXBhbnkvY29tcGFueS1yb3V0ZXIuanMiLCJmbG93dG8vZmxvdy1jdHJsLmpzIiwiZmxvd3RvL2Zsb3ctcm91dGVyLmpzIiwiaG9tZS9ob21lLWN0cmwuanMiLCJob21lL2hvbWUtZGF0YS5qcyIsImhvbWUvaG9tZS1yb3V0ZXIuanMiLCJrZi9rZi1jdHJsLmpzIiwia2Yva2Ytcm91dGVyLmpzIiwibG9naW4vbG9naW4tY3RybC5qcyIsImxvZ2luL2xvZ2luLXJvdXRlci5qcyIsInByb2R1Y3QvcHJvZHVjdC1jdHJsLmpzIiwicHJvZHVjdC9wcm9kdWN0LXJvdXRlci5qcyIsInJlZ2lzdGVyL3JlZ2lzdGVyLXJvdXRlci5qcyIsInJlZ2lzdGVyL3JlZ2lzdGVyQ3RybC5qcyIsImNvbW1vbi9kYXRhL2RhdGEuanMiLCJrZi9rZmdsL2FkZEtmLWN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xMQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhZ3JlZW1lbnQuY3RybCcsW10pXHJcbi5jb250cm9sbGVyKCdhZ3JlZW1lbnRDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhKXtcclxuXHQkc2NvcGUubGlzdCA9IERhdGEuZ2V0RGF0YSgnYWdyZWVtZW50JykubGlzdDtcclxufV0pXHJcbi5jb250cm9sbGVyKCdidXNpbmVzc0FncmVlbWVudEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3Qpe1xyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0cHJvdG9jb2xDb2RlOicnLFxyXG5cdFx0cHJvZHVjdE5hbWU6JycsXHJcblx0XHRob3NwaXRhbDonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdGZsYWc6MSxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2g9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnbWVyY2hhblByb3RMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEucHJvdG9jb2xzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlYXJjaCgkc2NvcGUuc2VhcmNoS2V5KTtcclxufV0pXHJcbi5jb250cm9sbGVyKCdhZGRBZ3JlZW1lbnRDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuYWdyZWVtZW50PXtcclxuXHRcdGJhY2tQZXJpb2RTdHlsZTonMScsXHJcblx0XHRwcm90b2NvbENvZGU6JycsXHJcblx0XHRwcm9kdWN0SWQ6JycsXHJcblx0XHR6b25lSWQ6JycsXHJcblx0XHRjaXR5SWQ6JycsXHJcblx0XHRiaWRQcmljZTonJyxcclxuXHRcdHVwTWVyY2hhbjonJyxcclxuXHRcdGxvTWVyY2hhbjonJyxcclxuXHRcdGhvc3BpdGFsSWQ6JycsXHJcblx0XHR1cEJhY2s6JycsXHJcblx0XHRsb0JhY2s6JycsXHJcblx0XHRzdGFydFRpbWU6JycsXHJcblx0XHRlbmRUaW1lOicnLFxyXG5cdFx0Y29udGFjdG9yOicnLFxyXG5cdFx0cGhvbmU6JycsXHJcblx0XHRxcTonJyxcclxuXHRcdGlzVmFsaWQ6JzEnLFxyXG5cdH07XHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblxyXG5cdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaD1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3c9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT8kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3Byb2R1Y3RMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5wZGF0YUxpc3QgPSBkYXRhLnByb2R1Y3RzLmxpc3Q7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdD1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9eC5wcm9kdWN0TmFtZSsnLycreC5wcm9kdWN0Tm9ybXMrJy8nK3gubWFudWZhY3R1cmU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnByb2R1Y3RJZD14LmlkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuIDnuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5MT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjFcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMT1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cxPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPSRzY29wZS5zZWFyY2hLZXkxLm5hbWU/JHNjb3BlLnNlYXJjaEtleTEubmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjb21wYW55TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QxID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0MT1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9eC5uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC51cE1lcmNoYW49eC5tZXJjaElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5LqM57qn5ZWG5Lia5YWs5Y+4XHJcblx0JHNjb3BlLnNlYXJjaEtleTI9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRjbGFzc1R5cGU6XCIyXCIsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHJcblx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDI9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93Mj10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT0kc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPyRzY29wZS5zZWFyY2hLZXkyLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MiA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDI9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQubG9NZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdH1cclxuXHQvL+WMu+mZou+8iOe7iOerr++8iVxyXG5cdCRzY29wZS5zZWFyY2hLZXkzPXtcclxuXHRcdGhvc3BpdGFsTmFtZTonJyxcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMz1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3czPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPyRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdob3NwTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QzID0gZGF0YS5ob3NwaXRhbHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDM9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9eC5ob3NwaXRhbE5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9eC5ob3NwaXRhbElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0fVxyXG5cdC8v6L+U5Yip5pa55byPXHJcblx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDQ9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5pc1Nob3c0PXRydWU7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmViYXRlU3R5bGUnKSxcclxuXHRcdFx0ZGF0YTp7fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDQgPSBkYXRhLnJlc3VsdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0ND1mdW5jdGlvbihiKXtcclxuXHRcdCRzY29wZS5iYWNrX3BlcmlvZF9zdHlsZT1iLmJhY2tfcGVyaW9kX25hbWUrJy8nK2IuYmFja19zdHlsZV9uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9Yi5iYWNrX2lkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0fVxyXG5cdCRzY29wZS5zYXZlPWZ1bmN0aW9uKCl7XHJcblx0XHRpZigkc2NvcGUuc3RhcnRUaW1lKXtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zdGFydFRpbWU9JHNjb3BlLnN0YXJ0VGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHRpZigkc2NvcGUuZW5kVGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuZW5kVGltZT0kc2NvcGUuZW5kVGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT0kc2NvcGUuYmFja1BlcmlvZFN0eWxlLmJhY2tfaWQ7XHJcblx0XHRjb25zb2xlLmxvZygkc2NvcGUpXHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZE1lcmNoYW5Qcm90JyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmFncmVlbWVudCl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50Jyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0ZG9jdW1lbnQub25jbGljaz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufV0pXHJcbi5jb250cm9sbGVyKCdlZGl0QWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JywnJHN0YXRlUGFyYW1zJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCwkc3RhdGVQYXJhbXMpe1xyXG5cdCRzY29wZS5nZXREZXRhaWw9ZnVuY3Rpb24oeCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2J1c2luZXNzQWdyZWVtZW50JykreCxcclxuXHRcdFx0Ly8gZGF0YTp7aWQ6fSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb3RvY29sSWQ9ZGF0YS5wcm90b2NvbC5wcm90b2NvbElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT1kYXRhLnByb3RvY29sLmJhY2tQZXJpb2RTdHlsZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5wcm90b2NvbENvZGU9ZGF0YS5wcm90b2NvbC5wcm90b2NvbENvZGU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPWRhdGEucHJvdG9jb2wucHJvZHVjdElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnpvbmVJZD1kYXRhLnByb3RvY29sLnpvbmVJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5jaXR5SWQ9ZGF0YS5wcm90b2NvbC5jaXR5SWQ7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuYmlkUHJpY2U9ZGF0YS5wcm90b2NvbC5iaWRQcmljZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC51cE1lcmNoYW49ZGF0YS5wcm90b2NvbC51cE1lcmNoYW47XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQubG9NZXJjaGFuPWRhdGEucHJvdG9jb2wubG9NZXJjaGFuO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9ZGF0YS5wcm90b2NvbC5ob3NwaXRhbElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnVwQmFjaz1kYXRhLnByb3RvY29sLnVwQmFjaztcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5sb0JhY2s9ZGF0YS5wcm90b2NvbC5sb0JhY2s7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPWRhdGEucHJvdG9jb2wuc3RhcnRUaW1lO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmVuZFRpbWU9ZGF0YS5wcm90b2NvbC5lbmRUaW1lO1xyXG5cdFx0XHQkc2NvcGUuc3RhcnRUaW1lPW5ldyBEYXRlKE51bWJlcihkYXRhLnByb3RvY29sLnN0YXJ0VGltZSkpO1xyXG5cdFx0XHQkc2NvcGUuZW5kVGltZT1uZXcgRGF0ZShOdW1iZXIoZGF0YS5wcm90b2NvbC5lbmRUaW1lKSk7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuY29udGFjdG9yPWRhdGEucHJvdG9jb2wuY29udGFjdG9yO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnBob25lPWRhdGEucHJvdG9jb2wucGhvbmU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQucXE9ZGF0YS5wcm90b2NvbC5xcTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5pc1ZhbGlkPWRhdGEucHJvdG9jb2wuaXNWYWxpZDtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPWRhdGEucHJvdG9jb2wuaG9zcGl0YWwuaG9zcGl0YWxOYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPWRhdGEucHJvdG9jb2wubG9NZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPWRhdGEucHJvdG9jb2wudXBNZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPWRhdGEucHJvdG9jb2wucHJvZHVjdC5wcm9kdWN0TmFtZSsnLycrZGF0YS5wcm90b2NvbC5wcm9kdWN0LnByb2R1Y3ROb3JtcysnLycrZGF0YS5wcm90b2NvbC5wcm9kdWN0Lm1hbnVmYWN0dXJlO1xyXG5cdFx0XHQkc2NvcGUuYmFja19wZXJpb2Rfc3R5bGU9ZGF0YS5wcm90b2NvbC5iYWNrUGVyaW9kU3R5bGVNYXAuYmFja19wZXJpb2RfbmFtZSsnLycrZGF0YS5wcm90b2NvbC5iYWNrUGVyaW9kU3R5bGVNYXAuYmFja19zdHlsZV9uYW1lO1xyXG5cdFx0XHRjb25zb2xlLmxvZygkc2NvcGUpXHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuYWdyZWVtZW50PXtcclxuXHRcdHByb3RvY29sSWQ6JycsXHJcblx0XHRiYWNrUGVyaW9kU3R5bGU6JzEnLFxyXG5cdFx0cHJvdG9jb2xDb2RlOicnLFxyXG5cdFx0cHJvZHVjdElkOicnLFxyXG5cdFx0em9uZUlkOicnLFxyXG5cdFx0Y2l0eUlkOicnLFxyXG5cdFx0YmlkUHJpY2U6JycsXHJcblx0XHR1cE1lcmNoYW46JycsXHJcblx0XHRsb01lcmNoYW46JycsXHJcblx0XHRob3NwaXRhbElkOicnLFxyXG5cdFx0dXBCYWNrOicnLFxyXG5cdFx0bG9CYWNrOicnLFxyXG5cdFx0c3RhcnRUaW1lOicnLFxyXG5cdFx0ZW5kVGltZTonJyxcclxuXHRcdGNvbnRhY3RvcjonJyxcclxuXHRcdHBob25lOicnLFxyXG5cdFx0cXE6JycsXHJcblx0XHRpc1ZhbGlkOicxJyxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0cHJvZHVjdE5hbWU6JycsXHJcblx0XHRwcm9kdWN0Tm9ybXM6JycsXHJcblx0XHRtYW51ZmFjdHVyZTonJyxcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cdC8v5LiA57qn5ZWG5Lia5YWs5Y+4XHJcblx0JHNjb3BlLnNlYXJjaEtleTE9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRjbGFzc1R5cGU6XCIxXCIsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHQvL+S6jOe6p+WVhuS4muWFrOWPuFxyXG5cdCRzY29wZS5zZWFyY2hLZXkyPXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOlwiMlwiLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0Ly/ljLvpmaLvvIjnu4jnq6/vvIlcclxuXHQkc2NvcGUuc2VhcmNoS2V5Mz17XHJcblx0XHRob3NwaXRhbE5hbWU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMub2JqKVxyXG5cdGlmKCRzdGF0ZVBhcmFtcy5vYmope1xyXG5cdFx0JHNjb3BlLmdldERldGFpbCgkc3RhdGVQYXJhbXMub2JqLnByb3RvY29sSWQpO1xyXG5cclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucHJvdG9jb2xJZD0kc3RhdGVQYXJhbXMub2JqLnByb3RvY29sSWQ7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT0kc3RhdGVQYXJhbXMub2JqLmJhY2tQZXJpb2RTdHlsZTtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucHJvdG9jb2xDb2RlPSRzdGF0ZVBhcmFtcy5vYmoucHJvdG9jb2xDb2RlO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5wcm9kdWN0SWQ9JHN0YXRlUGFyYW1zLm9iai5wcm9kdWN0SWQ7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LnpvbmVJZD0kc3RhdGVQYXJhbXMub2JqLnpvbmVJZDtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQuY2l0eUlkPSRzdGF0ZVBhcmFtcy5vYmouY2l0eUlkO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5iaWRQcmljZT0kc3RhdGVQYXJhbXMub2JqLmJpZFByaWNlO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC51cE1lcmNoYW49JHN0YXRlUGFyYW1zLm9iai51cE1lcmNoYW47XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmxvTWVyY2hhbj0kc3RhdGVQYXJhbXMub2JqLmxvTWVyY2hhbjtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQuaG9zcGl0YWxJZD0kc3RhdGVQYXJhbXMub2JqLmhvc3BpdGFsSWQ7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LnVwQmFjaz0kc3RhdGVQYXJhbXMub2JqLnVwQmFjaztcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQubG9CYWNrPSRzdGF0ZVBhcmFtcy5vYmoubG9CYWNrO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5zdGFydFRpbWU9bmV3IERhdGUoJHN0YXRlUGFyYW1zLm9iai5zdGFydFRpbWUpO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5lbmRUaW1lPW5ldyBEYXRlKCRzdGF0ZVBhcmFtcy5vYmouZW5kVGltZSk7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmNvbnRhY3Rvcj0kc3RhdGVQYXJhbXMub2JqLmNvbnRhY3RvcjtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucGhvbmU9JHN0YXRlUGFyYW1zLm9iai5waG9uZTtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucXE9JHN0YXRlUGFyYW1zLm9iai5xcTtcclxuXHRcdC8vIC8vICRzY29wZS5hZ3JlZW1lbnQuaXNWYWxpZD1TdHJpbmcoJHN0YXRlUGFyYW1zLm9iai5pc1ZhbGlkKTtcclxuXHRcdC8vICRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT0kc3RhdGVQYXJhbXMub2JqLmhvc3BpdGFsLmhvc3BpdGFsTmFtZTtcclxuXHRcdC8vICRzY29wZS5zZWFyY2hLZXkyLm5hbWU9JHN0YXRlUGFyYW1zLm9iai5sb01lcmNoYW5JbmZvLm5hbWU7XHJcblx0XHQvLyAkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPSRzdGF0ZVBhcmFtcy5vYmoudXBNZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0Ly8gJHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT0kc3RhdGVQYXJhbXMub2JqLnByb2R1Y3QucHJvZHVjdE5hbWU7XHJcblx0XHQvLyAkc2NvcGUuYmFja1BlcmlvZFN0eWxlPSRzdGF0ZVBhcmFtcy5vYmoucHJvZHVjdC5wcm9kdWN0TmFtZTtcclxuXHJcblx0fVxyXG5cclxuXHJcblx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdz10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT0kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPyRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncHJvZHVjdExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLnBkYXRhTGlzdCA9IGRhdGEucHJvZHVjdHMubGlzdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0PWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT14LnByb2R1Y3ROYW1lKycvJyt4LnByb2R1Y3ROb3JtcysnLycreC5tYW51ZmFjdHVyZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPXguaWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdH1cclxuXHQvL+S4gOe6p+WVhuS4muWFrOWPuFxyXG5cclxuXHJcblx0JHNjb3BlLmlzU2hvdzE9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDE9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93MT10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT0kc2NvcGUuc2VhcmNoS2V5MS5uYW1lPyRzY29wZS5zZWFyY2hLZXkxLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MSA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDE9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQudXBNZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdH1cclxuXHQvL+S6jOe6p+WVhuS4muWFrOWPuFxyXG5cclxuXHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMj1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cyPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPSRzY29wZS5zZWFyY2hLZXkyLm5hbWU/JHNjb3BlLnNlYXJjaEtleTIubmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjb21wYW55TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QyID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0Mj1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkyLm5hbWU9eC5uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5sb01lcmNoYW49eC5tZXJjaElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5Yy76Zmi77yI57uI56uv77yJXHJcblxyXG5cdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gzPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT0kc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU/JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2hvc3BMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDMgPSBkYXRhLmhvc3BpdGFscztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0Mz1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT14Lmhvc3BpdGFsTmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuaG9zcGl0YWxJZD14Lmhvc3BpdGFsSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHR9XHJcblx0Ly/ov5TliKnmlrnlvI9cclxuXHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoND1mdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9dHJ1ZTtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdyZWJhdGVTdHlsZScpLFxyXG5cdFx0XHRkYXRhOnt9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0NCA9IGRhdGEucmVzdWx0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3Q0PWZ1bmN0aW9uKGIpe1xyXG5cdFx0JHNjb3BlLmJhY2tfcGVyaW9kX3N0eWxlPWIuYmFja19wZXJpb2RfbmFtZSsnLycrYi5iYWNrX3N0eWxlX25hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT1iLmJhY2tfaWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHR9XHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5zdGFydFRpbWUpe1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnN0YXJ0VGltZT0kc2NvcGUuc3RhcnRUaW1lLmdldFRpbWUoKTtcclxuXHRcdH1cclxuXHRcdGlmKCRzY29wZS5lbmRUaW1lKXtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5lbmRUaW1lPSRzY29wZS5lbmRUaW1lLmdldFRpbWUoKTtcclxuXHRcdH1cclxuXHRcdGNvbnNvbGUubG9nKCRzY29wZSlcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZWRpdE1lcmNoYW5Qcm90JyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmFncmVlbWVudCl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50Jyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0ZG9jdW1lbnQub25jbGljaz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2d1ZXN0QWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCl7XHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRjdXN0b21lck5hbWU6JycsXHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdGhvc3BpdGFsOicnLFxyXG5cdFx0ZmxhZzoxLFxyXG5cdH07XHJcblx0JHNjb3BlLnNlYXJjaD1mdW5jdGlvbihkYXRhKXtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdwcm90b2NvbExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0ZGF0YS5wcm90b2NvbHMubWFwKGZ1bmN0aW9uKHYpe1xyXG5cdFx0XHRcdFx0XHR2LnZhbGlkRGF0ZT1uZXcgRGF0ZShOdW1iZXIodi5zdGFydFRpbWUpKS50b0xvY2FsZURhdGVTdHJpbmcoKSsnLS0nK25ldyBEYXRlKE51bWJlcih2LmVuZFRpbWUpKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHY7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5wcm90b2NvbHM7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygkc2NvcGUuZGF0YUxpc3QpO1xyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWFyY2goJHNjb3BlLnNlYXJjaEtleSk7XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRkR3Vlc3RBZ3JlZW1lbnRDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuYWdyZWVtZW50PXtcclxuXHRcdHByb3RvY29sQ29kZTonJyxcclxuXHRcdHByb2R1Y3RJZDonJyxcclxuXHRcdHpvbmVJZDonJyxcclxuXHRcdGNpdHlJZDonJyxcclxuXHRcdHVwcGVyTWVyY2hhbjonJyxcclxuXHRcdGxvd2VyTWVyY2hhbjonJyxcclxuXHRcdGhvc3BpdGFsSWQ6JycsXHJcblx0XHRwcm9tb3Rpb25FeHBlbnNlOicnLFxyXG5cdFx0YmFpbDonJyxcclxuXHRcdGJhaWxEZXNjOicnLFxyXG5cdFx0c3RhcnRUaW1lOicnLFxyXG5cdFx0ZW5kVGltZTonJyxcclxuXHRcdGlzVmFsaWQ6JzEnLFxyXG5cdFx0dHlwZTonMScsXHJcblx0XHRpc0hvbm91cjonMScsXHJcblx0XHRzd2l0Y2hTdGFuZGFyZDonMCcsXHJcblx0XHRzd2l0Y2hBbW91bnQ6JycsXHJcblx0XHRzd2l0Y2hFeHBlbnNlOicnLFxyXG5cdFx0cmViYXRlUGVyaW9kOicxJyxcclxuXHRcdHJlYmF0ZVBheWVyOicxJyxcclxuXHRcdHJlYmF0ZTonJyxcclxuXHRcdGN1c3RvbWVySWQ6JzEnLFxyXG5cdH07XHJcblx0JHNjb3BlLnNlYXJjaEtleTA9e1xyXG5cdFx0Y3VzdG9tZXJOYW1lOicnLFxyXG5cdFx0cGhvbmU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHJcblx0JHNjb3BlLmlzU2hvdzA9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDA9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93MD10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lPSRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZT8kc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY3VzdG9tZXJMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDAgPSBkYXRhLmN1c3RvbWVycy5saXN0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QwPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lPXguY3VzdG9tZXJOYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5jdXN0b21lcklkPXguY3VzdG9tZXJJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cwPWZhbHNlO1xyXG5cdH1cclxuXHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdz10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT0kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPyRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncHJvZHVjdExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLnBkYXRhTGlzdCA9IGRhdGEucHJvZHVjdHMubGlzdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0PWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT14LnByb2R1Y3ROYW1lKycvJyt4LnByb2R1Y3ROb3JtcysnLycreC5tYW51ZmFjdHVyZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPXguaWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdH1cclxuXHQvL+S4gOe6p+WVhuS4muWFrOWPuFxyXG5cdCRzY29wZS5zZWFyY2hLZXkxPXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOlwiMVwiLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblxyXG5cdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gxPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9JHNjb3BlLnNlYXJjaEtleTEubmFtZT8kc2NvcGUuc2VhcmNoS2V5MS5uYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDEgPSBkYXRhLm1lcmNoYW5zO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QxPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT14Lm5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnVwcGVyTWVyY2hhbj14Lm1lcmNoSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuoznuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5Mj17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjJcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMj1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cyPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPSRzY29wZS5zZWFyY2hLZXkyLm5hbWU/JHNjb3BlLnNlYXJjaEtleTIubmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjb21wYW55TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QyID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0Mj1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkyLm5hbWU9eC5uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5sb3dlck1lcmNoYW49eC5tZXJjaElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5Yy76Zmi77yI57uI56uv77yJXHJcblx0JHNjb3BlLnNlYXJjaEtleTM9e1xyXG5cdFx0aG9zcGl0YWxOYW1lOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblxyXG5cdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gzPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT0kc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU/JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2hvc3BMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDMgPSBkYXRhLmhvc3BpdGFscztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0Mz1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT14Lmhvc3BpdGFsTmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuaG9zcGl0YWxJZD14Lmhvc3BpdGFsSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHR9XHJcblx0Ly/ov5TliKnmlrnlvI9cclxuXHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoND1mdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9dHJ1ZTtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdyZWJhdGVTdHlsZScpLFxyXG5cdFx0XHRkYXRhOnt9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0NCA9IGRhdGEucmVzdWx0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3Q0PWZ1bmN0aW9uKGIpe1xyXG5cdFx0JHNjb3BlLmJhY2tfcGVyaW9kX3N0eWxlPWIuYmFja19wZXJpb2RfbmFtZSsnLycrYi5iYWNrX3N0eWxlX25hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9Yi5ob3NwaXRhbElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0fVxyXG5cdCRzY29wZS5zYXZlPWZ1bmN0aW9uKCl7XHJcblx0XHRpZigkc2NvcGUuc3RhcnRUaW1lKXtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zdGFydFRpbWU9JHNjb3BlLnN0YXJ0VGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHRpZigkc2NvcGUuZW5kVGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuZW5kVGltZT0kc2NvcGUuZW5kVGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT0kc2NvcGUuYmFja1BlcmlvZFN0eWxlLmJhY2tfaWQ7XHJcblx0XHRjb25zb2xlLmxvZygkc2NvcGUpXHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZHByb3RvY29sJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmFncmVlbWVudCl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50Lmd1ZXN0QWdyZWVtZW50Jyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0ZG9jdW1lbnQub25jbGljaz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cwPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn1dKVxyXG4uY29udHJvbGxlcignZWRpdEd1ZXN0QWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JywnJHN0YXRlUGFyYW1zJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCwkc3RhdGVQYXJhbXMpe1xyXG5cdCRzY29wZS5hZ3JlZW1lbnQ9e1xyXG5cdFx0cHJvdG9jb2xDb2RlOicnLFxyXG5cdFx0cHJvZHVjdElkOicnLFxyXG5cdFx0em9uZUlkOicnLFxyXG5cdFx0Y2l0eUlkOicnLFxyXG5cdFx0dXBwZXJNZXJjaGFuOicnLFxyXG5cdFx0bG93ZXJNZXJjaGFuOicnLFxyXG5cdFx0aG9zcGl0YWxJZDonJyxcclxuXHRcdHByb21vdGlvbkV4cGVuc2U6JycsXHJcblx0XHRiYWlsOicnLFxyXG5cdFx0YmFpbERlc2M6JycsXHJcblx0XHRzdGFydFRpbWU6JycsXHJcblx0XHRlbmRUaW1lOicnLFxyXG5cdFx0aXNWYWxpZDonMScsXHJcblx0XHR0eXBlOicxJyxcclxuXHRcdGlzSG9ub3VyOicxJyxcclxuXHRcdHN3aXRjaFN0YW5kYXJkOicwJyxcclxuXHRcdHN3aXRjaEFtb3VudDonJyxcclxuXHRcdHN3aXRjaEV4cGVuc2U6JycsXHJcblx0XHRyZWJhdGVQZXJpb2Q6JzEnLFxyXG5cdFx0cmViYXRlUGF5ZXI6JzEnLFxyXG5cdFx0cmViYXRlOicnLFxyXG5cdFx0Y3VzdG9tZXJJZDonMScsXHJcblx0fTtcclxuXHQkc2NvcGUucmViYXRlUGVyaW9kTGlzdD1bXHJcblx0XHR7dmFsdWU6XCIxXCIsbmFtZTpcIuaciOe7k1wifSxcclxuICAgICAgICB7dmFsdWU6XCIyXCIsbmFtZTpcIuWOi+aJueWOi+aciFwifSxcclxuICAgICAgICB7dmFsdWU6XCIzXCIsbmFtZTpcIjYw5aSpXCJ9LFxyXG4gICAgICAgIHt2YWx1ZTpcIjRcIixuYW1lOlwiOTDlpKlcIn0sXHJcbiAgICAgICAge3ZhbHVlOlwiNVwiLG5hbWU6XCIxMjDlpKlcIn1cclxuXHRdO1xyXG5cdCRzY29wZS5nZXREZXRhaWw9ZnVuY3Rpb24oeCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2d1ZXN0QWdyZWVtZW50JykreCxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb3RvY29sSWQ9ZGF0YS5wcm90b2NvbC5wcm90b2NvbElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb3RvY29sQ29kZT1kYXRhLnByb3RvY29sLnByb3RvY29sQ29kZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5wcm9kdWN0SWQ9ZGF0YS5wcm90b2NvbC5wcm9kdWN0SWQ7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuem9uZUlkPWRhdGEucHJvdG9jb2wuem9uZUlkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmNpdHlJZD1kYXRhLnByb3RvY29sLmNpdHlJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC51cHBlck1lcmNoYW49ZGF0YS5wcm90b2NvbC51cHBlck1lcmNoYW47XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQubG93ZXJNZXJjaGFuPWRhdGEucHJvdG9jb2wubG93ZXJNZXJjaGFuO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9ZGF0YS5wcm90b2NvbC5ob3NwaXRhbElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb21vdGlvbkV4cGVuc2U9ZGF0YS5wcm90b2NvbC5wcm9tb3Rpb25FeHBlbnNlO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmJhaWw9ZGF0YS5wcm90b2NvbC5iYWlsO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmJhaWxEZXNjPWRhdGEucHJvdG9jb2wuYmFpbERlc2M7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPWRhdGEucHJvdG9jb2wuc3RhcnRUaW1lO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmVuZFRpbWU9ZGF0YS5wcm90b2NvbC5lbmRUaW1lO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmlzVmFsaWQ9ZGF0YS5wcm90b2NvbC5pc1ZhbGlkO1xyXG5cdFx0XHQkc2NvcGUuc3RhcnRUaW1lPW5ldyBEYXRlKE51bWJlcihkYXRhLnByb3RvY29sLnN0YXJ0VGltZSkpO1xyXG5cdFx0XHQkc2NvcGUuZW5kVGltZT1uZXcgRGF0ZShOdW1iZXIoZGF0YS5wcm90b2NvbC5lbmRUaW1lKSk7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQudHlwZT1kYXRhLnByb3RvY29sLnR5cGU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuaXNIb25vdXI9ZGF0YS5wcm90b2NvbC5pc0hvbm91cjtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zd2l0Y2hTdGFuZGFyZD1kYXRhLnByb3RvY29sLnN3aXRjaFN0YW5kYXJkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnN3aXRjaEFtb3VudD1kYXRhLnByb3RvY29sLnN3aXRjaEFtb3VudDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zd2l0Y2hFeHBlbnNlPWRhdGEucHJvdG9jb2wuc3dpdGNoRXhwZW5zZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5yZWJhdGVQZXJpb2Q9U3RyaW5nKGRhdGEucHJvdG9jb2wucmViYXRlUGVyaW9kKTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5yZWJhdGVQYXllcj1kYXRhLnByb3RvY29sLnJlYmF0ZVBheWVyO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnJlYmF0ZT1kYXRhLnByb3RvY29sLnJlYmF0ZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5jdXN0b21lcklkPWRhdGEucHJvdG9jb2wuY3VzdG9tZXJJZDtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPWRhdGEucHJvdG9jb2wuaG9zcGl0YWwuaG9zcGl0YWxOYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPWRhdGEucHJvdG9jb2wubG93ZXJNZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPWRhdGEucHJvdG9jb2wudXBwZXJNZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU9ZGF0YS5wcm90b2NvbC5jdXN0b21lci5jdXN0b21lck5hbWU7XHJcblx0XHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9ZGF0YS5wcm90b2NvbC5wcm9kdWN0LnByb2R1Y3ROYW1lKycvJytkYXRhLnByb3RvY29sLnByb2R1Y3QucHJvZHVjdE5vcm1zKycvJytkYXRhLnByb3RvY29sLnByb2R1Y3QubWFudWZhY3R1cmU7XHJcblx0XHRcdGNvbnNvbGUubG9nKCRzY29wZS5hZ3JlZW1lbnQucmViYXRlUGVyaW9kKVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlYXJjaEtleTA9e1xyXG5cdFx0Y3VzdG9tZXJOYW1lOicnLFxyXG5cdFx0cGhvbmU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHQkc2NvcGUuc2VhcmNoS2V5PXtcclxuXHRcdHByb2R1Y3ROYW1lOicnLFxyXG5cdFx0cHJvZHVjdE5vcm1zOicnLFxyXG5cdFx0bWFudWZhY3R1cmU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHQvL+S4gOe6p+WVhuS4muWFrOWPuFxyXG5cdCRzY29wZS5zZWFyY2hLZXkxPXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOlwiMVwiLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0Ly/kuoznuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5Mj17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjJcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cdC8v5Yy76Zmi77yI57uI56uv77yJXHJcblx0JHNjb3BlLnNlYXJjaEtleTM9e1xyXG5cdFx0aG9zcGl0YWxOYW1lOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0aWYoJHN0YXRlUGFyYW1zLm9iail7XHJcblx0XHQkc2NvcGUuZ2V0RGV0YWlsKCRzdGF0ZVBhcmFtcy5vYmoucHJvdG9jb2xJZCk7XHJcblx0fVxyXG5cdCRzY29wZS5pc1Nob3cwPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gwPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzA9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZT0kc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU/JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2N1c3RvbWVyTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QwID0gZGF0YS5jdXN0b21lcnMubGlzdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0MD1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZT14LmN1c3RvbWVyTmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuY3VzdG9tZXJJZD14LmN1c3RvbWVySWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93MD1mYWxzZTtcclxuXHR9XHJcblxyXG5cclxuXHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2g9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93PXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPSRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU/JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdwcm9kdWN0TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUucGRhdGFMaXN0ID0gZGF0YS5wcm9kdWN0cy5saXN0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3Q9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPXgucHJvZHVjdE5hbWUrJy8nK3gucHJvZHVjdE5vcm1zKycvJyt4Lm1hbnVmYWN0dXJlO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5wcm9kdWN0SWQ9eC5pZDtcclxuXHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5LiA57qn5ZWG5Lia5YWs5Y+4XHJcblxyXG5cdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gxPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9JHNjb3BlLnNlYXJjaEtleTEubmFtZT8kc2NvcGUuc2VhcmNoS2V5MS5uYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDEgPSBkYXRhLm1lcmNoYW5zO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QxPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT14Lm5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnVwcGVyTWVyY2hhbj14Lm1lcmNoSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuoznuqfllYbkuJrlhazlj7hcclxuXHJcblx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDI9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93Mj10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT0kc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPyRzY29wZS5zZWFyY2hLZXkyLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MiA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDI9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQubG93ZXJNZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdH1cclxuXHQvL+WMu+mZou+8iOe7iOerr++8iVxyXG5cclxuXHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMz1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3czPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPyRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdob3NwTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QzID0gZGF0YS5ob3NwaXRhbHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDM9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9eC5ob3NwaXRhbE5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9eC5ob3NwaXRhbElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0fVxyXG5cdC8v6L+U5Yip5pa55byPXHJcblx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDQ9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5pc1Nob3c0PXRydWU7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmViYXRlU3R5bGUnKSxcclxuXHRcdFx0ZGF0YTp7fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDQgPSBkYXRhLnJlc3VsdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0ND1mdW5jdGlvbihiKXtcclxuXHRcdCRzY29wZS5iYWNrX3BlcmlvZF9zdHlsZT1iLmJhY2tfcGVyaW9kX25hbWUrJy8nK2IuYmFja19zdHlsZV9uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5ob3NwaXRhbElkPWIuaG9zcGl0YWxJZDtcclxuXHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdH1cclxuXHQkc2NvcGUuc2F2ZT1mdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLnN0YXJ0VGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPSRzY29wZS5zdGFydFRpbWUuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoJHNjb3BlLmVuZFRpbWUpe1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmVuZFRpbWU9JHNjb3BlLmVuZFRpbWUuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9JHNjb3BlLmJhY2tQZXJpb2RTdHlsZS5iYWNrX2lkO1xyXG5cdFx0Y29uc29sZS5sb2coJHNjb3BlKVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdlZGl0cHJvdG9jb2wnKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUuYWdyZWVtZW50KX0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5hZ3JlZW1lbnQuZ3Vlc3RBZ3JlZW1lbnQnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHRkb2N1bWVudC5vbmNsaWNrPWZ1bmN0aW9uKCl7XHJcblx0XHQkdGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzA9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FncmVlbWVudC5yb3V0ZXInLFsnYWdyZWVtZW50LmN0cmwnXSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJyxmdW5jdGlvbigkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudCcse1xyXG5cdFx0dXJsOicvYWdyZWVtZW50JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvYWdyZWVtZW50L2FncmVlbWVudC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FncmVlbWVudEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50Jyx7XHJcblx0XHR1cmw6Jy9idXNpbmVzc0FncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9idXNpbmVzc0FncmVlbWVudC9idXNpbmVzc0FncmVlbWVudC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2J1c2luZXNzQWdyZWVtZW50Q3RybCcsXHJcblx0XHRwYXJhbXM6e1xyXG5cdFx0XHRvYmo6bnVsbFxyXG5cdFx0fVxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5hZGRBZ3JlZW1lbnQnLHtcclxuXHRcdHVybDonL2FkZEFncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9idXNpbmVzc0FncmVlbWVudC9hZGRBZ3JlZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidhZGRBZ3JlZW1lbnRDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5lZGl0QWdyZWVtZW50Jyx7XHJcblx0XHR1cmw6Jy9lZGl0YWdyZWVtZW50JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvYWdyZWVtZW50L2J1c2luZXNzQWdyZWVtZW50L2FncmVlbWVudEVkaXQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidlZGl0QWdyZWVtZW50Q3RybCcsXHJcblx0XHRwYXJhbXM6IHtcclxuXHQgICAgICAgIG9iajogbnVsbCBcclxuXHQgICAgfVxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5ndWVzdEFncmVlbWVudCcse1xyXG5cdFx0dXJsOicvZ3Vlc3RBZ3JlZW1lbnQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9hZ3JlZW1lbnQvZ3Vlc3RBZ3JlZW1lbnQvZ3Vlc3RBZ3JlZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidndWVzdEFncmVlbWVudEN0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5hZ3JlZW1lbnQuYWRkR3Vlc3RBZ3JlZW1lbnQnLHtcclxuXHRcdHVybDonL2FkZEd1ZXN0QWdyZWVtZW50JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvYWdyZWVtZW50L2d1ZXN0QWdyZWVtZW50L2FkZEd1ZXN0QWdyZWVtZW50Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRkR3Vlc3RBZ3JlZW1lbnRDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5lZGl0R3Vlc3RBZ3JlZW1lbnQnLHtcclxuXHRcdHVybDonL2VkaXRHdWVzdEFncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9ndWVzdEFncmVlbWVudC9lZGl0R3Vlc3RBZ3JlZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidlZGl0R3Vlc3RBZ3JlZW1lbnRDdHJsJyxcclxuXHRcdHBhcmFtczoge1xyXG5cdCAgICAgICAgb2JqOiBudWxsIFxyXG5cdCAgICB9XHJcblx0fSlcclxuXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKFwiYXBwXCIsW1widWkucm91dGVyXCIsJ3JvdXRlcicsJ3B1YnVsaWMnLCd0bS5wYWdpbmF0aW9uJ10pXHJcbi8vIC5kaXJlY3RpdmUoJ2RpYWxvZycsZnVuY3Rpb24oKXtcclxuLy8gXHRyZXR1cm4ge1xyXG4vLyBcdFx0cmVzdHJpY3Q6J0VBQycsXHJcbi8vIFx0XHR0ZW1wbGF0ZVVybDondmlld3MvY29tbW9uL21vZGFsLmh0bWwnXHJcbi8vIFx0fVxyXG4vLyB9KVxyXG4vLyAuZGlyZWN0aXZlKCd0aXBhbGVydCcsZnVuY3Rpb24oKXtcclxuLy8gXHRyZXR1cm4ge1xyXG4vLyBcdFx0cmVzdHJpY3Q6J0VBQycsXHJcbi8vIFx0XHRyZXBsYWNlOnRydWUsXHJcbi8vIFx0XHR0ZW1wbGF0ZTpcIjxkaXYgY2xhc3M9J3RpcC1hbGVydCcgbmctc2hvdz0ndGlwX2FsZXJ0X3Nob3cnPlwiK1xyXG4vLyBcdFx0XHRcIjxkaXYgY2xhc3M9J3RpcC1jb3Zlcic+PC9kaXY+XCIrXHJcbi8vIFx0XHRcdFwiPHNwYW4gbmctYmluZD0ndGlwX2FsZXJ0X21zZycgbmctPjwvc3Bhbj5cIitcclxuLy8gXHRcdFwiPC9kaXY+XCIsXHJcbi8vIFx0XHRsaW5rOmZ1bmN0aW9uKHNjb3BlLGVsZW1lbnQsYXR0cnMpe1xyXG4vLyBcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz1mYWxzZTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcbi8vIH0pXHJcbi8vIC5kaXJlY3RpdmUoJ3RpcExvZycsWyckcm9vdFNjb3BlJywnJHRpbWVvdXQnLGZ1bmN0aW9uKCRyb290U2NvcGUsJHRpbWVvdXQpe1xyXG4vLyBcdHJldHVybiB7XHJcbi8vIFx0XHRyZXN0cmljdDonRUFDJyxcclxuLy8gXHRcdHJlcGxhY2U6dHJ1ZSxcclxuLy8gXHRcdHRlbXBsYXRlOlwiPGRpdiBjbGFzcz0ndGlwLWFsZXJ0JyBuZy1zaG93PSd0aXBfYWxlcnRfc2hvdyc+XCIrXHJcbi8vIFx0XHRcdFwiPGRpdiBjbGFzcz0ndGlwLWNvdmVyJz48L2Rpdj5cIitcclxuLy8gXHRcdFx0XCI8c3BhbiBuZy1iaW5kPSd0aXBfYWxlcnRfbXNnJyBuZy0+PC9zcGFuPlwiK1xyXG4vLyBcdFx0XCI8L2Rpdj5cIixcclxuLy8gXHRcdGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbWVudCxhdHRycyl7XHJcbi8vIFx0XHRcdHNjb3BlLnRpcF9hbGVydF9zaG93PWZhbHNlO1xyXG4vLyBcdFx0XHQkcm9vdFNjb3BlLiRvbigndGlwbG9nJyxmdW5jdGlvbihlLGRhdGEpe1xyXG4vLyBcdFx0XHRcdGlmKGRhdGEmJnR5cGVvZiBkYXRhID09IFwic3RyaW5nXCIpe1xyXG4vLyBcdFx0XHRcdFx0c2NvcGUudGlwX2FsZXJ0X3Nob3cgPSB0cnVlO1xyXG4vLyBcdFx0XHRcdFx0c2NvcGUudGlwX2FsZXJ0X21zZyA9IGRhdGE7XHJcbi8vIFx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz1mYWxzZTtcclxuLy8gXHRcdFx0XHRcdH0sMjAwMClcclxuLy8gXHRcdFx0XHR9XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG4vLyB9XSlcclxuLy8gLmRpcmVjdGl2ZSgnZGlhbG9nJyxmdW5jdGlvbigpe1xyXG4vLyBcdHJldHVybiB7XHJcbi8vIFx0XHRyZXN0cmljdDonRUFDJyxcclxuLy8gXHRcdHRlbXBsYXRlVXJsOidzcmMvZGlzdC92aWV3cy9jb21tb24vbW9kYWwuaHRtbCdcclxuLy8gXHR9XHJcbi8vIH0pXHJcbi5kaXJlY3RpdmUoJ3RpcGFsZXJ0JyxmdW5jdGlvbigpe1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDonRUFDJyxcclxuXHRcdHJlcGxhY2U6dHJ1ZSxcclxuXHRcdHRlbXBsYXRlOlwiPGRpdiBjbGFzcz0ndGlwLWFsZXJ0JyBuZy1jbGFzcz0ndGlwX2FsZXJ0X3R5cGUnIG5nLXNob3c9J3RpcF9hbGVydF9zaG93Jz5cIitcclxuXHRcdFx0XCI8c3BhbiBuZy1iaW5kPSd0aXBfYWxlcnRfbXNnLnR4dCcgbmctY2xpY2s9J2Nsb3NlQWxlcnQoKSc+PC9zcGFuPlwiK1xyXG5cdFx0XHRcIjxpPjwvaT5cIitcclxuXHRcdFx0XCI8L2Rpdj5cIixcclxuXHRcdGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbWVudCxhdHRycyl7XHJcblx0XHRcdHNjb3BlLmNsb3NlQWxlcnQ9ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdyA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4uZGlyZWN0aXZlKFwiYWxlcnRNb2RhbFwiLGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OidFQUMnLFxyXG5cdFx0cmVwbGFjZTp0cnVlLFxyXG5cdFx0dGVtcGxhdGVVcmw6XCJ5a2ZfdHBsX2FsZXJ0X21vZGFsXCIsXHJcblx0XHRsaW5rOmZ1bmN0aW9uKHNjb3BlKXtcclxuXHRcdFx0c2NvcGUueWtmX2FsZXJ0X3Nob3cgPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcbn0pXHJcbi5kaXJlY3RpdmUoJ2NpdHlzJyxbJ0h0dHAnLCdVcmwnLGZ1bmN0aW9uKEh0dHAsVXJsKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6J0VBQycsXHJcblx0XHR0ZW1wbGF0ZVVybDonY2l0eXMnLFxyXG5cdFx0c2NvcGU6e1xyXG5cdFx0XHRhcmVhOic9bXlBcmVhJyxcclxuXHRcdFx0Y2l0eTonPW15Q2l0eSdcclxuXHRcdH0sXHJcblx0XHRsaW5rOmZ1bmN0aW9uKHNjb3BlLGVsZSxhdHRycyl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGF0dHJzKTtcclxuXHRcdFx0c2NvcGUuJHdhdGNoKCdhcmVhJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdEh0dHAuZ2V0KHtcclxuXHRcdFx0XHRcdHVybDpVcmwuZ2V0VXJsKCdnZXRDaXR5TGlzdCcpKycvJytzY29wZS5hcmVhXHJcblx0XHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0XHRzY29wZS5jaXR5TGlzdCA9IGRhdGEuY2l0aWVzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHRcdHVybDpVcmwuZ2V0VXJsKCdnZXRBcmVhc0xpc3QnKVxyXG5cdFx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdHNjb3BlLmFyZWFzTGlzdCA9IGRhdGEuem9uZXM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3B1YnVsaWMnLFtdKVxyXG4uZmFjdG9yeSgnSHR0cCcsWyckaHR0cCcsJyRzdGF0ZScsJyRyb290U2NvcGUnLGZ1bmN0aW9uKCRodHRwLCRzdGF0ZSwkcm9vdFNjb3BlKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0OmZ1bmN0aW9uKGpzb24pe1xyXG5cdFx0XHR2YXIgZGF0YSA9IGpzb24ucGFyYW1zfHwnJyx1cmwgPSBqc29uLnVybDtcdFx0XHJcblx0XHRcdHZhciBwcm9taXNlID0gJGh0dHAoe1xyXG5cdFx0XHRcdG1ldGhvZDonZ2V0JyxcclxuXHRcdFx0XHRwYXJhbXM6ZGF0YSxcclxuXHRcdFx0XHR1cmw6dXJsXHJcblx0XHRcdH0pXHJcblx0XHRcdHByb21pc2UudGhlbihmdW5jdGlvbihtc2cpe1xyXG5cdFx0XHRcdGlmKG1zZy5kYXRhLmNvZGU9PTY2NjYpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdsb2dpbkNvbXBhbnknKTtcclxuXHRcdFx0XHR9ZWxzZSBpZihtc2cuZGF0YS5jb2RlPT0yMjIyKXtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0fSxcclxuXHRcdHBvc3Q6ZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdHZhciBkYXRhID0ganNvbi5kYXRhfHwnJyx1cmwgPSBqc29uLnVybDtcclxuXHRcdFx0dmFyIHByb21pc2UgPSAkaHR0cCh7XHJcblx0XHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdFx0dXJsOnVybFxyXG5cdFx0XHR9KVxyXG5cdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0XHRpZihtc2cuZGF0YS5jb2RlPT02NjY2KXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW5Db21wYW55Jyk7XHJcblx0XHRcdFx0fWVsc2UgaWYobXNnLmRhdGEuY29kZT09MjIyMil7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRwb3N0RjpmdW5jdGlvbihqc29uKXtcclxuXHRcdFx0dmFyIGRhdGEgPSBqc29uLmRhdGF8fCcnLHVybCA9IGpzb24udXJsO1xyXG5cdFx0XHR2YXIgcHJvbWlzZSA9ICRodHRwKHtcclxuXHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0XHR1cmw6dXJsLFxyXG5cdFx0XHRcdGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sICBcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGZ1bmN0aW9uKG9iaikgeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9IFtdOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBwIGluIG9iail7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW3BdKSk7ICBcclxuICAgICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpOyAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdH0pXHJcblx0XHRcdHByb21pc2UudGhlbihmdW5jdGlvbihtc2cpe1xyXG5cdFx0XHRcdGlmKG1zZy5kYXRhLmNvZGU9PTY2NjYpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdsb2dpbkNvbXBhbnknKTtcclxuXHRcdFx0XHR9ZWxzZSBpZihtc2cuZGF0YS5jb2RlPT0yMjIyKXtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0fSxcclxuXHRcdGJ5Rm9ybTpmdW5jdGlvbihqc29uKXtcclxuXHRcdFx0dmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcblx0XHRcdGYubWV0aG9kID0gXCJwb3N0XCI7XHJcblx0XHRcdGYuZW5jdHlwZSA9IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiO1xyXG5cdFx0XHRmLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHRcdFx0c2NvcGUgPSBqc29uLnNjb3BlfHx7fTtcclxuXHRcdFx0dmFyIGZfaW4gPSB7fTtcclxuXHRcdFx0aWYoanNvbi5kYXRhKXtcclxuXHRcdFx0XHRmb3IodmFyIGkgaW4ganNvbi5kYXRhKXtcclxuXHRcdFx0XHRcdGZfaW5baV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdFx0XHRcdFx0Zl9pbltpXS5uYW1lID0gaTtcclxuXHRcdFx0XHRcdGZfaW5baV0udmFsdWUgPSBqc29uLmRhdGFbaV07XHJcblx0XHRcdFx0XHRmLmFwcGVuZENoaWxkKGZfaW5baV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgZl9pID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHRcdFx0Zl9pLnR5cGUgPSBcImZpbGVcIjtcclxuXHRcdFx0Zl9pLm5hbWUgPSBqc29uLmZpbGVOYW1lfHwnJztcclxuXHRcdFx0Zl9pLmFjY2VwdCA9IGpzb24uYWNjZXB0fHwnJztcclxuXHRcdFx0Zl9pLm11bHRpcGxlID0ganNvbi5tdWx0aXBsZXx8Jyc7XHJcblx0XHRcdGNvbnNvbGUubG9nKGZfaSk7XHJcblx0XHRcdChmdW5jdGlvbihqc29uKXtcclxuXHRcdFx0XHRmX2kub25jaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JGh0dHAoe1xyXG5cdFx0XHRcdFx0XHR1cmw6anNvbi51cmwsXHJcblx0XHRcdFx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdFx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHRyYW5zZm9ybVJlcXVlc3Q6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBEX2F0YSA9IG5ldyBGb3JtRGF0YShmKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gRF9hdGFcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdFx0ZGF0YS55a2ZfZV9maWxlID0gZl9pLmZpbGVzWzBdO1xyXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGYpO1xyXG5cdFx0XHRcdFx0XHRqc29uLnN1Y2Nlc3MmJmpzb24uc3VjY2VzcyhkYXRhKTtcclxuXHRcdFx0XHRcdH0pLmVycm9yKGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0XHRqc29uLnN1Y2Nlc3MuZXJyb3ImJmpzb24uc3VjY2Vzcy5lcnJvcihlKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KShqc29uKVxyXG5cdFx0XHRmLmFwcGVuZENoaWxkKGZfaSk7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZik7XHJcblx0XHRcdGZfaS5jbGljaygpO1xyXG5cdFx0fVxyXG5cdH1cclxufV0pXHJcbi5mYWN0b3J5KFwiRWxlXCIsZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0ZTpmdW5jdGlvbihvYmosY29udGVudCl7XHJcblx0XHRcdHZhciBmaXJzdENoYXI9b2JqLmNoYXJBdCgwKTtcclxuXHRcdFx0dmFyIGNvbnRlbnQ9Y29udGVudHx8ZG9jdW1lbnQ7XHJcblx0XHRcdGlmKGZpcnN0Q2hhcj09XCIjXCIpe1xyXG5cdFx0XHRcdHJldHVybiBjb250ZW50LmdldEVsZW1lbnRCeUlkKG9iai5zdWJzdHJpbmcoMSkpO1xyXG5cdFx0XHR9ZWxzZSBpZihmaXJzdENoYXI9PVwiLlwiKXtcclxuXHRcdFx0XHR2YXIgYXJyPVtdO1xyXG5cdFx0XHRcdHZhciBhRWxzPWNvbnRlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpO1xyXG5cdFx0XHRcdFx0Zm9yKHZhciBpPTA7aTxhRWxzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRcdFx0XHRcdHZhciBhQ2xhc3NOYW1lPVx0YUVsc1tpXS5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0IGZvcih2YXIgaj0wO2o8YUNsYXNzTmFtZS5sZW5ndGg7aisrKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoYUNsYXNzTmFtZVtqXT09b2JqLnNsaWNlKDEpKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhcnIucHVzaChhRWxzW2ldKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHRcdCB9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBhcnI7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShvYmopO1xyXG5cdFx0XHR9XHJcblx0XHRcclxuXHRcdH1cclxuXHR9XHJcbn0pXHJcbi5mYWN0b3J5KCdUaXAnLFsnJHRpbWVvdXQnLFwiRWxlXCIsZnVuY3Rpb24oJHRpbWVvdXQsRWxlKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Ly/lr7nor53moYbvvIzkvKDlj4LkuLrlr7nor53kv6Hmga/vvIznoa7orqTkuYvlkI7nmoTliqjkvZzvvIzlhbPpl63kuYvlkI7nmoTliqjkvZxcclxuXHRcdENvbmZpcm06ZnVuY3Rpb24oc2NvcGUsbWFzc2FnZSxjYWxsYmFjazEsY2FsbGJhY2syKXtcclxuXHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRzY29wZS55a2ZfY29uZmlybV9zaG93PXRydWU7XHJcblx0XHRcdFx0aWYodHlwZW9mIG1hc3NhZ2U9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdFx0aWYobWFzc2FnZS50aXRsZSl7XHJcblx0XHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX3RpdGxlX3Nob3c9dHJ1ZTtcclxuXHRcdFx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fdGl0bGUgPSBtYXNzYWdlLnRpdGxlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fbXNnID0gbWFzc2FnZS5tc2c7XHJcblx0XHRcdFx0fWVsc2UgaWYodHlwZW9mIG1hc3NhZ2U9PVwic3RyaW5nXCIpe1xyXG5cdFx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fbXNnID0gbWFzc2FnZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHRcclxuXHRcdFx0c2NvcGUuY29uZmlybV9zaG93ID0gJ2NvbmZpcm0tc2hvdyc7XHJcblx0XHRcdHNjb3BlLnlrZl9tb2RhbF9zdXJlID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0c2NvcGUuY29uZmlybV9zaG93ID0gJ2NvbmZpcm0tb3V0JztcclxuXHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX3Nob3c9ZmFsc2U7XHJcblx0XHRcdFx0XHRzY29wZS55a2ZfY29uZmlybV90aXRsZV9zaG93PWZhbHNlO1xyXG5cdFx0XHRcdH0pXHRcclxuXHRcdFx0XHRjYWxsYmFjazEmJmNhbGxiYWNrMSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNjb3BlLnlrZl9tb2RhbF9jbG9zZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHNjb3BlLmNvbmZpcm1fc2hvdyA9ICdjb25maXJtLW91dCc7XHJcblx0XHRcdFx0XHRzY29wZS55a2ZfY29uZmlybV9zaG93PWZhbHNlO1xyXG5cdFx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fdGl0bGVfc2hvdz1mYWxzZTtcclxuXHRcdFx0XHR9KVx0XHJcblx0XHRcdFx0Y2FsbGJhY2syJiZjYWxsYmFjazIoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdExvZzpmdW5jdGlvbihzY29wZSxtc2csY2Ipe1xyXG5cdFx0XHRjb25zb2xlLmxvZygpXHJcblx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2NvcGUudGlwX2FsZXJ0X21zZz1tc2c7XHJcblx0XHRcdFx0aWYoc2NvcGUudGlwX2FsZXJ0X21zZy50eXBlPT0xKXtcclxuXHRcdFx0XHRcdHNjb3BlLnRpcF9hbGVydF90eXBlPVwidGlwLWFsZXJ0LXN1Y2Nlc3NcIjtcclxuXHRcdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHNjb3BlLnRpcF9hbGVydF9zaG93PWZhbHNlO1xyXG5cdFx0XHRcdFx0XHRjYiYmY2IoKTtcclxuXHRcdFx0XHRcdH0sMTAwMClcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHNjb3BlLnRpcF9hbGVydF90eXBlPVwidGlwLWFsZXJ0LWVycm9yXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNjb3BlLnRpcF9hbGVydF9zaG93PXRydWU7XHJcblx0XHRcdH0pXHJcblx0XHR9LFxyXG5cdFx0QWxlcnQ6ZnVuY3Rpb24oc2NvcGUsbWVzc2FnZSxjYil7XHJcblx0XHRcdHNjb3BlLnlrZl9hbGVydF9zaG93ID0gdHJ1ZTtcclxuXHRcdFx0c2NvcGUueWtmX2FsZXJ0X21zZyA9IG1lc3NhZ2U7XHJcblx0XHRcdHNjb3BlLnlrZl9hbGVydF9zdXJlID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRzY29wZS55a2ZfYWxlcnRfc2hvdyA9IGZhbHNlO1xyXG5cdFx0XHRcdGNiJiZjYigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH1cclxufV0pXHJcbi8vIC5mYWN0b3J5KCdUaXAnLFsnJHRpbWVvdXQnLCckcm9vdFNjb3BlJyxmdW5jdGlvbigkdGltZW91dCwkcm9vdFNjb3BlKXtcclxuLy8gXHRyZXR1cm4ge1xyXG4vLyBcdFx0Ly/lvLnnqpfmj5DnpLrvvIznrKzkuIDkuKrlj4LmlbDkuLrmj5DnpLrlhoXlrrnvvIzoi6XmlLnlj5h0aXRsZeWSjOWuveW6puesrOS4gOS4quWPguaVsOmcgOS8oOWQq+aciXRpdGxl5ZKMbXNn5Lik5Liq5Y+C5pWw55qE5a+56LGhXHJcbi8vIFx0XHQvL+esrOS6jOWPguaVsOS4uuWbnuiwg+WHveaVsFxyXG4vLyBcdFx0QWxlcnQ6ZnVuY3Rpb24obWFzc2FnZSxjYWxsYmFjayl7XHJcbi8vIFx0XHRcdHZhciBkaWFsb2dUaXQsZGlhbG9nTXNnLGRpYWxvZ1dpZHRoO1xyXG4vLyBcdFx0XHRpZih0eXBlb2YgbWFzc2FnZSA9PSdvYmplY3QnKXtcclxuLy8gXHRcdFx0XHRkaWFsb2dUaXQgPSBtYXNzYWdlLnRpdGxlP21hc3NhZ2UudGl0bGU6J+adpeiHqicrd2luZG93LmxvY2F0aW9uLmhvc3QrJ+eahOaPkOekuic7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nTXNnID0gbWFzc2FnZS5tc2c/bWFzc2FnZS5tc2c6Jyc7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nV2lkdGggPSBtYXNzYWdlLndpZHRoP21hc3NhZ2Uud2lkdGg6ZmFsc2U7XHJcbi8vIFx0XHRcdH1lbHNlIGlmKHR5cGVvZiBtYXNzYWdlID09J3N0cmluZycpe1xyXG4vLyBcdFx0XHRcdGRpYWxvZ1RpdCA9ICfmnaXoh6onK3dpbmRvdy5sb2NhdGlvbi5ob3N0KyfnmoTmj5DnpLonO1xyXG4vLyBcdFx0XHRcdGRpYWxvZ01zZyA9IG1hc3NhZ2U7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLmhpZGUoKTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudGV4dCgn56Gu6K6kJyk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLnRleHQoZGlhbG9nVGl0KTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ01zZycpLnRleHQoZGlhbG9nTXNnKTtcclxuLy8gXHRcdFx0JCgnI215RGlhbG9nJykub25lKCdoaWRkZW4uYnMubW9kYWwnLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0Y2FsbGJhY2smJmNhbGxiYWNrKCk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudGV4dCgn5Y+W5raIJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnNob3coKTtcclxuLy8gXHRcdFx0XHQkKCcubW9kYWwtY29udGVudCcpLmF0dHIoXCJzdHlsZVwiLFwiXCIpO1xyXG4vLyBcdFx0XHR9KTtcclxuLy8gXHRcdFx0aWYoZGlhbG9nV2lkdGgpICQoJy5tb2RhbC1jb250ZW50JykuY3NzKHt3aWR0aDpwYXJzZUludCh3aWR0aCksbWFyZ2luOicwIGF1dG8nfSk7XHJcbi8vIFx0XHRcdCQoJyNteURpYWxvZycpLm1vZGFsKHtcclxuLy8gXHRcdFx0XHRiYWNrZHJvcDogJ3N0YXRpYydcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdH0sXHJcbi8vIFx0XHQvL+Wvueivneahhu+8jOS8oOWPguS4uuWvueivneS/oeaBr++8jOehruiupOS5i+WQjueahOWKqOS9nO+8jOWFs+mXreS5i+WQjueahOWKqOS9nFxyXG4vLyBcdFx0Q29uZmlybTpmdW5jdGlvbihtYXNzYWdlLGNhbGxiYWNrMSxjYWxsYmFjazIpe1xyXG4vLyBcdFx0XHR2YXIgZGlhbG9nVGl0LGRpYWxvZ01zZyxkaWFsb2dXaWR0aDtcclxuLy8gXHRcdFx0aWYodHlwZW9mIG1hc3NhZ2UgPT0nb2JqZWN0Jyl7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nVGl0ID0gbWFzc2FnZS50aXRsZT9tYXNzYWdlLnRpdGxlOifmnaXoh6onK3dpbmRvdy5sb2NhdGlvbi5ob3N0KyfnmoTmj5DnpLonO1xyXG4vLyBcdFx0XHRcdGRpYWxvZ01zZyA9IG1hc3NhZ2UubXNnP21hc3NhZ2UubXNnOicnO1xyXG4vLyBcdFx0XHRcdGRpYWxvZ1dpZHRoID0gbWFzc2FnZS53aWR0aD9tYXNzYWdlLndpZHRoOmZhbHNlO1xyXG4vLyBcdFx0XHR9ZWxzZSBpZih0eXBlb2YgbWFzc2FnZSA9PSdzdHJpbmcnKXtcclxuLy8gXHRcdFx0XHRkaWFsb2dUaXQgPSAn5p2l6IeqJyt3aW5kb3cubG9jYXRpb24uaG9zdCsn55qE5o+Q56S6JztcclxuLy8gXHRcdFx0XHRkaWFsb2dNc2cgPSBtYXNzYWdlO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLnRleHQoZGlhbG9nVGl0KTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ01zZycpLnRleHQoZGlhbG9nTXNnKTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZVQnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0Y2FsbGJhY2syJiZjYWxsYmFjazIoKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCgnaGlkZScpO1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMSYmY2FsbGJhY2sxKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNteURpYWxvZycpLm9uZSgnaGlkZGVuLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2VUJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnLm1vZGFsLWNvbnRlbnQnKS5hdHRyKFwic3R5bGVcIixcIlwiKTtcclxuLy8gXHRcdFx0fSk7XHJcbi8vIFx0XHRcdGlmKGRpYWxvZ1dpZHRoKSAkKCcubW9kYWwtY29udGVudCcpLmNzcyh7d2lkdGg6cGFyc2VJbnQoZGlhbG9nV2lkdGgpLG1hcmdpbjonMCBhdXRvJ30pO1xyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCh7XHJcbi8vIFx0XHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnXHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHR9LFxyXG4vLyBcdFx0Q2hlY2s6ZnVuY3Rpb24oY2FsbGJhY2sxLGNhbGxiYWNrMil7XHJcbi8vIFx0XHRcdHZhciBkaWFsb2dUaXQsZGlhbG9nTXNnLGRpYWxvZ1dpZHRoPTQwMDtcclxuLy8gXHRcdFx0ZGlhbG9nTXNnPSc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICc8bGFiZWw+JytcclxuLy8gXHRcdFx0XHRcdCAgICAgICc8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInNxXCIgdmFsdWU9XCJrZnpcIiBjbGFzcz1cIndlY2hhdF9yYWRpb1wiPiDlhazkvJflj7flvIDlj5HogIXmjojmnYMnK1xyXG4vLyBcdFx0XHRcdFx0ICAgICc8L2xhYmVsPicrXHJcbi8vIFx0XHRcdFx0XHQgICc8L2Rpdj4nK1xyXG4vLyBcdFx0XHRcdFx0ICAnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+JytcclxuLy8gXHRcdFx0XHRcdCAgICAnPGxhYmVsPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgICAnPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJzcVwiIHZhbHVlPVwicHRcIiBjbGFzcz1cIndlY2hhdF9yYWRpb1wiPiDlhazkvJflj7fnrKzkuInmlrnlubPlj7DmjojmnYMnK1xyXG4vLyBcdFx0XHRcdFx0ICAgICc8L2xhYmVsPicrXHJcbi8vIFx0XHRcdFx0XHQgICc8L2Rpdj4nO1xyXG4vLyBcdFx0XHRkaWFsb2dUaXQ9J+mAieaLqee7keWumuaWueW8jyc7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLmh0bWwoZGlhbG9nVGl0KTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ01zZycpLmh0bWwoZGlhbG9nTXNnKTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZVQnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0Y2FsbGJhY2syJiZjYWxsYmFjazIoKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCgnaGlkZScpO1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMSYmY2FsbGJhY2sxKCk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ1RpdGxlJykuaHRtbCgnJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ01zZycpLmh0bWwoJycpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlVCcpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2hhbmdlJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJy5tb2RhbC1jb250ZW50JykuYXR0cihcInN0eWxlXCIsXCJcIik7XHJcbi8vIFx0XHRcdH0pO1xyXG4vLyBcdFx0XHRpZihkaWFsb2dXaWR0aCkgJCgnLm1vZGFsLWNvbnRlbnQnKS5jc3Moe3dpZHRoOnBhcnNlSW50KGRpYWxvZ1dpZHRoKSxtYXJnaW46JzAgYXV0byd9KTtcclxuLy8gXHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoe1xyXG4vLyBcdFx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJ1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSxcclxuLy8gXHRcdENoZWNrYm94OmZ1bmN0aW9uKGNhbGxiYWNrMSxjYWxsYmFjazIpe1xyXG4vLyBcdFx0XHR2YXIgZGlhbG9nVGl0LGRpYWxvZ01zZyxkaWFsb2dXaWR0aD00MDA7XHJcbi8vIFx0XHRcdGRpYWxvZ01zZz0nPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+JytcclxuLy8gXHRcdFx0XHRcdCAgICAnPGxhYmVsPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgICAnPHNwYW4gY2xhc3M9XCJBY2NlcHRuYW1lXCI+5Y+X55CG5a6i5pyN57uE77yaPC9zcGFuPicrJzxzZWxlY3QgbmFtZT1cIlwiIGNsYXNzPVwiQWNjZXB0a2ZcIj4nKyc8b3B0aW9uIHZhbHVlPVwi5Y+X55CG5a6i5pyN57uEXCI+5Y+X55CG5a6i5pyN57uEPC9vcHRpb24+JysnPGxlY3Q+JytcclxuLy8gXHRcdFx0XHRcdCAgICAnPC9sYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAnPC9kaXY+JytcclxuLy8gXHRcdFx0XHRcdCAgJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgJzxsYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICAgJzxzcGFuIGNsYXNzPVwiQWNjZXB0bmFtZVwiPuWPl+eQhuWuouacje+8mjwvc3Bhbj4nKyc8c2VsZWN0IG5hbWU9XCJcIiBjbGFzcz1cIkFjY2VwdGtmXCI+JysnPG9wdGlvbiB2YWx1ZT1cIuWPl+eQhuWuouacjVwiPuWPl+eQhuWuouacjTwvb3B0aW9uPicrJzxsZWN0PicrXHJcbi8vIFx0XHRcdFx0XHQgICAgJzwvbGFiZWw+JytcclxuLy8gXHRcdFx0XHRcdCAgJzwvZGl2Pic7XHJcbi8vIFx0XHRcdGRpYWxvZ1RpdD0n6L2s56e75bel5Y2VJztcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ1RpdGxlJykuaHRtbChkaWFsb2dUaXQpO1xyXG4vLyBcdFx0XHQkKCcjZGlhbG9nTXNnJykuaHRtbChkaWFsb2dNc2cpO1xyXG4vLyBcdFx0XHQkKCcjZGlhbG9nQ2xvc2UnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0Y2FsbGJhY2syJiZjYWxsYmFjazIoKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0Nsb3NlVCcpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazImJmNhbGxiYWNrMigpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjZGlhbG9nQ2hhbmdlJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdCQoJyNteURpYWxvZycpLm1vZGFsKCdoaWRlJyk7XHJcbi8vIFx0XHRcdFx0Y2FsbGJhY2sxJiZjYWxsYmFjazEoKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS5odG1sKCcnKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nTXNnJykuaHRtbCgnJyk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNteURpYWxvZycpLm9uZSgnaGlkZGVuLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2VUJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnLm1vZGFsLWNvbnRlbnQnKS5hdHRyKFwic3R5bGVcIixcIlwiKTtcclxuLy8gXHRcdFx0fSk7XHJcbi8vIFx0XHRcdGlmKGRpYWxvZ1dpZHRoKSAkKCcubW9kYWwtY29udGVudCcpLmNzcyh7d2lkdGg6cGFyc2VJbnQoZGlhbG9nV2lkdGgpLG1hcmdpbjonMCBhdXRvJ30pO1xyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCh7XHJcbi8vIFx0XHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnXHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHR9LFxyXG4vLyBcdFx0TG9nOmZ1bmN0aW9uKG1zZyxjYil7XHJcbi8vIFx0XHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgndGlwbG9nJyxtc2cpO1xyXG4vLyBcdFx0XHRjYiYmY2IoKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcbi8vIH1dKVxyXG4vL+WIl+ihqOafpeivouacjeWKoeWwgeijhVxyXG4uZmFjdG9yeSgnR2V0TGlzdCcsWyckaHR0cCcsJyR0aW1lb3V0JywnVGlwJyxmdW5jdGlvbigkaHR0cCwkdGltZW91dCxUaXApe1xyXG5cdHJldHVybnsgR2V0OmZ1bmN0aW9uKG9wdCl7XHJcblx0XHRcdHZhciB1cmwgPSBvcHQudXJsO1xyXG5cdFx0XHR2YXIgZGF0YSA9IG9wdC5kYXRhO1xyXG5cdFx0XHR2YXIgc2NvcGUgPSBvcHQuc2NvcGU7XHJcblx0XHRcdHZhciBjYWxsYmFjayA9IG9wdC5zdWNjZXNzO1xyXG5cdFx0XHRzY29wZS5wYWdTaG93PWZhbHNlO1xyXG5cdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZiA9IHtcclxuXHRcdFx0XHR1cmw6dXJsLFxyXG5cdFx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdCAgICAgICAgY3VycmVudFBhZ2U6IDEsLy/pu5jorqTpobVcclxuXHRcdCAgICAgICAgdG90YWxJdGVtczogODAsLy/mgLvpobXmlbBcclxuXHRcdCAgICAgICAgaXRlbXNQZXJQYWdlOiAxMCwvL+avj+mhteWxleekuuaVsOaNruadoeaVsCDpu5jorqQxNeadoVxyXG5cdFx0ICAgICAgICBwYWdlc0xlbmd0aDogMTUsLy/liIbpobXmnaHnm67plb/luqZcclxuXHRcdCAgICAgICAgcGVyUGFnZU9wdGlvbnM6IFs1LCAxMCwgMjBdLFxyXG5cdFx0ICAgICAgICBpbml0OnRydWUsXHJcblx0XHQgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihmbil7XHJcblx0XHQgICAgICAgIFx0c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YS5wYWdlPXNjb3BlLnBhZ2luYXRpb25Db25mLmN1cnJlbnRQYWdlO1xyXG5cdFx0ICAgICAgICBcdHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZVNpemU9c2NvcGUucGFnaW5hdGlvbkNvbmYuaXRlbXNQZXJQYWdlO1xyXG5cdFx0ICAgICAgICBcdGlmKHRoaXMuaW5pdD09dHJ1ZSl7XHJcblx0XHQgICAgICAgIFx0XHR0aGlzLmluaXQ9ZmFsc2U7XHJcblx0XHQgICAgICAgIFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHQgICAgICAgIFx0fVxyXG5cdFx0IFx0XHRcdCRodHRwKHtcclxuXHRcdCBcdFx0XHRcdHVybDpzY29wZS5wYWdpbmF0aW9uQ29uZi51cmwsXHJcblx0XHQgXHRcdFx0XHRwYXJhbXM6c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YVxyXG5cdFx0IFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQgXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHQgXHRcdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCBcdFx0XHRcdFx0c2NvcGUuZGF0YT1kYXRhO1xyXG5cdFx0XHQgXHRcdFx0XHRcdHNjb3BlLnBhZ2luYXRpb25Db25mLnRvdGFsSXRlbXM9ZGF0YS50b3RhbENvdW50O1xyXG5cdFx0XHQgXHRcdFx0XHRcdGNhbGxiYWNrJiZjYWxsYmFjayhkYXRhKTtcclxuXHRcdFx0IFx0XHRcdFx0fSlcclxuXHRcdCBcdFx0XHRcdH1cclxuXHRcdCBcdFx0XHR9KS5lcnJvcihmdW5jdGlvbihlKXtcclxuXHRcdCBcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0IFx0XHRcdH0pXHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9O1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT0xO1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZVNpemU9MTA7XHJcblx0XHQgICAgJGh0dHAoe1xyXG5cdFx0ICAgIFx0dXJsOnVybCxcclxuXHRcdCAgICBcdHBhcmFtczpzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhXHJcblx0XHQgICAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdCAgICBcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdCAgICBcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0ICAgIFx0XHRzY29wZS5wYWdTaG93PXRydWU7XHJcblx0XHRcdCAgICBcdFx0c2NvcGUuZGF0YT1kYXRhO1xyXG5cdCBcdFx0XHRcdFx0c2NvcGUucGFnaW5hdGlvbkNvbmYudG90YWxJdGVtcz1kYXRhLnRvdGFsQ291bnQ7XHJcblx0IFx0XHRcdFx0XHRjYWxsYmFjayYmY2FsbGJhY2soZGF0YSk7XHJcblx0XHRcdCAgICBcdH0pXHJcblx0XHQgICAgXHR9XHJcblx0XHQgICAgfSlcclxuXHRcdH0sXHJcblx0XHRQb3N0OmZ1bmN0aW9uKG9wdCl7XHJcblx0XHRcdHZhciB1cmwgPSBvcHQudXJsO1xyXG5cdFx0XHR2YXIgZGF0YSA9IG9wdC5kYXRhO1xyXG5cdFx0XHR2YXIgc2NvcGUgPSBvcHQuc2NvcGU7XHJcblx0XHRcdHZhciBjYWxsYmFjayA9IG9wdC5zdWNjZXNzO1xyXG5cdFx0XHRzY29wZS5wYWdTaG93PWZhbHNlO1xyXG5cdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZiA9IHtcclxuXHRcdFx0XHR1cmw6dXJsLFxyXG5cdFx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdCAgICAgICAgY3VycmVudFBhZ2U6IDEsLy/pu5jorqTpobVcclxuXHRcdCAgICAgICAgdG90YWxJdGVtczogODAsLy/mgLvpobXmlbBcclxuXHRcdCAgICAgICAgaXRlbXNQZXJQYWdlOiAxMCwvL+avj+mhteWxleekuuaVsOaNruadoeaVsCDpu5jorqQxNeadoVxyXG5cdFx0ICAgICAgICBwYWdlc0xlbmd0aDogMTUsLy/liIbpobXmnaHnm67plb/luqZcclxuXHRcdCAgICAgICAgcGVyUGFnZU9wdGlvbnM6IFs1LCAxMCwgMjBdLFxyXG5cdFx0ICAgICAgICBpbml0OnRydWUsXHJcblx0XHQgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihmbil7XHJcblx0XHQgICAgICAgIFx0c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YS5wYWdlPXNjb3BlLnBhZ2luYXRpb25Db25mLmN1cnJlbnRQYWdlO1xyXG5cdFx0ICAgICAgICBcdHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZVNpemU9c2NvcGUucGFnaW5hdGlvbkNvbmYuaXRlbXNQZXJQYWdlO1xyXG5cdFx0ICAgICAgICBcdGlmKHRoaXMuaW5pdD09dHJ1ZSl7XHJcblx0XHQgICAgICAgIFx0XHR0aGlzLmluaXQ9ZmFsc2U7XHJcblx0XHQgICAgICAgIFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHQgICAgICAgIFx0fVxyXG5cdFx0IFx0XHRcdCRodHRwKHtcclxuXHRcdCBcdFx0XHRcdHVybDp1cmwsXHJcblx0XHQgXHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0IFx0XHRcdFx0ZGF0YTpzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLFxyXG5cdFx0IFx0XHRcdFx0aGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSwgIFxyXG5cdFx0ICAgICAgICAgICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGZ1bmN0aW9uKG9iaikgeyAgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTsgIFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHAgaW4gb2JqKXsgIFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW3BdKSk7ICBcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgfSAgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHIuam9pbihcIiZcIik7ICBcclxuXHRcdCAgICAgICAgICAgICAgICB9XHJcblx0XHQgXHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdCBcdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHQgICAgXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQgICAgXHRcdHNjb3BlLnBhZ1Nob3c9dHJ1ZTtcclxuXHRcdFx0XHRcdCAgICBcdFx0c2NvcGUuZGF0YT1kYXRhO1xyXG5cdFx0XHQgXHRcdFx0XHRcdHNjb3BlLnBhZ2luYXRpb25Db25mLnRvdGFsSXRlbXM9ZGF0YS50b3RhbENvdW50O1xyXG5cdFx0XHQgXHRcdFx0XHRcdGNhbGxiYWNrJiZjYWxsYmFjayhkYXRhKTtcclxuXHRcdFx0XHRcdCAgICBcdH0pXHJcblx0XHRcdFx0ICAgIFx0fVxyXG5cdFx0IFx0XHRcdH0pLmVycm9yKGZ1bmN0aW9uKGUpe1xyXG5cdFx0IFx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHQgXHRcdFx0fSlcclxuXHRcdCAgICAgICAgfVxyXG5cdFx0ICAgIH07XHJcblx0XHQgICAgc2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YS5wYWdlPTE7XHJcblx0XHQgICAgc2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YS5wYWdlU2l6ZT0xMDtcclxuXHRcdCAgICAkaHR0cCh7XHJcblx0XHQgICAgXHR1cmw6dXJsLFxyXG5cdFx0ICAgIFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdCAgICBcdGRhdGE6c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YSxcclxuXHRcdCAgICBcdGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sICBcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGZ1bmN0aW9uKG9iaikgeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9IFtdOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBwIGluIG9iail7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW3BdKSk7ICBcclxuICAgICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpOyAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHQgICAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdCAgICBcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdCAgICBcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0ICAgIFx0XHRzY29wZS5wYWdTaG93PXRydWU7XHJcblx0XHRcdCAgICBcdFx0c2NvcGUuZGF0YT1kYXRhO1xyXG5cdCBcdFx0XHRcdFx0c2NvcGUucGFnaW5hdGlvbkNvbmYudG90YWxJdGVtcz1kYXRhLnRvdGFsQ291bnQ7XHJcblx0IFx0XHRcdFx0XHRjYWxsYmFjayYmY2FsbGJhY2soZGF0YSk7XHJcblx0XHRcdCAgICBcdH0pXHJcblx0XHQgICAgXHR9ZWxzZXtcclxuXHRcdFx0XHRcdFRpcC5Mb2coc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0XHR9XHRcclxuXHRcdCAgICB9KVxyXG5cdFx0fVxyXG5cdH1cclxufV0pXHJcbi5mYWN0b3J5KCdUZXN0Q2hhdCcsZnVuY3Rpb24oKXtcclxuXHR2YXIgbXNnID17XHJcblx0XHRcclxuXHR9XHJcblx0cmV0dXJuIHtcclxuXHRcdGNoYXQ6ZnVuY3Rpb24oKXtcclxuXHRcdFx0c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuXHJcblx0XHRcdH0sMzAwMClcclxuXHRcdH1cclxuXHR9XHJcbn0pXHJcbi5mYWN0b3J5KCdncm91cHNSb2xlcycsWyckaHR0cCcsJ1VybCcsJyR0aW1lb3V0JyxmdW5jdGlvbigkaHR0cCxVcmwsJHRpbWVvdXQpey8v6I635Y+W5omA5pyJ5a6i5pyN57uE5Lul5Y+K6KeS6Imy5YiX6KGo77yI5peg5YiG6aG177yJXHJcblx0Ly/nvJPlrZjmiYDmnInlrqLmnI3nu4Tlkozop5LoibLnmoRwcm9taXNl5a+56LGhXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldDpmdW5jdGlvbihzY29wZSxjYjEsY2IyKXsvL2NiMeS4uuiOt+WPluWuouacjee7hOeahOWbnuiwg+WHveaVsCxjYjLkuLrojrflj5bop5LoibLliJfooajnmoTlm57osIPlh73mlbBcclxuXHRcdFx0dmFyIHBybzEgPSAkaHR0cCh7XHJcblx0XHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FsbEdyb3VwcycpLFxyXG5cdFx0XHRcdHBhcmFtczp7XHJcblx0XHRcdFx0XHR1c2VyUHJpdmF0ZVVybDpzY29wZS51c2VyUHJpdmF0ZVVybFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGU9PTEpe1xyXG5cdFx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0c2NvcGUuZ3JvdXBEYXRhPWRhdGEuZ3JvdXBzO1xyXG5cdFx0XHRcdFx0XHRjYjEmJmNiMSgpO1xyXG5cdFx0XHRcdFx0fSlcdFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCfojrflj5blrqLmnI3nu4TmlbDmja7lpLHotKUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdHZhciBwcm8yID0gJGh0dHAoe1xyXG5cdFx0XHRcdHVybDpVcmwuZ2V0VXJsKCdhbGxSb2xlcycpLFxyXG5cdFx0XHRcdHBhcmFtczp7XHJcblx0XHRcdFx0XHR1c2VyUHJpdmF0ZVVybDpzY29wZS51c2VyUHJpdmF0ZVVybFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGU9PTEpe1xyXG5cdFx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0c2NvcGUucm9sZURhdGE9ZGF0YS5yb2xlcztcclxuXHRcdFx0XHRcdFx0Y2IyJiZjYjIoKTtcclxuXHRcdFx0XHRcdH0pXHRcdFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCfojrflj5bop5LoibLmlbDmja7lpLHotKUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cdFx0XHRcclxufV0pXHJcbi5mYWN0b3J5KCdpbmRleGVkREInLGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gb3BlbkRCIChteURCLHNjb3BlLGNiKSB7Ly/miZPlvIDogYrlpKnmlbDmja7lupNcclxuXHRcdGlmKHNjb3BlLkRCKXsvL+WIpOaWreaYr+WQpuWcqHNjb3Bl5Lit57yT5a2Y5LqGRELlr7nosaEs5aaC5p6c57yT5a2Y5LqG77yM5bCx5bCG5a+56LGh55qEcmVzdWx06LWL57uZbXlEQi5kYlxyXG5cdFx0XHRteURCLmRiID0gc2NvcGUuREIucmVzdWx0O1xyXG5cdFx0XHRjYiYmY2IoKTtcclxuXHRcdH1lbHNley8v5aaC5p6c5pyq57yT5a2YRELlr7nosaHvvIzmiJbogIXkuI7mlbDmja7lupPnmoTpk77mjqXkuK3mlq3vvIzliJnph43mlrDmiZPlvIDmlbDmja7lupNcclxuXHRcdFx0dmFyIHZlcnNpb249bXlEQi52ZXJzaW9uIHx8IDE7XHJcblx0XHRcdHNjb3BlLkRCPXt9O1xyXG5cdCAgICAgICAgc2NvcGUuREI9d2luZG93LmluZGV4ZWREQi5vcGVuKG15REIubmFtZSx2ZXJzaW9uKTsvL+aJk+W8gOaVsOaNruW6k1xyXG5cdCAgICAgICAgc2NvcGUuREIub25lcnJvcj1mdW5jdGlvbihlKXtcclxuXHQgICAgICAgICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZXJyb3IubWVzc2FnZSk7XHJcblx0ICAgICAgICB9O1xyXG5cdCAgICAgICAgc2NvcGUuREIub25zdWNjZXNzPWZ1bmN0aW9uKGUpe1xyXG5cdCAgICAgICAgXHRzY29wZS5EQi5yZXN1bHQ9ZS50YXJnZXQucmVzdWx0O1xyXG5cdCAgICAgICAgICAgIG15REIuZGI9ZS50YXJnZXQucmVzdWx0O1xyXG5cdCAgICAgICAgICAgIGNiJiZjYigpO1xyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICAgIHNjb3BlLkRCLm9udXBncmFkZW5lZWRlZD1mdW5jdGlvbihlKXtcclxuXHQgICAgICAgICAgICB2YXIgZGI9ZS50YXJnZXQucmVzdWx0O1xyXG5cdCAgICAgICAgICAgIGlmKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKG15REIubmFtZSkpe1xyXG5cdCAgICAgICAgICAgICAgICB2YXIgc3RvcmU9ZGIuY3JlYXRlT2JqZWN0U3RvcmUobXlEQi5uYW1lLHtrZXlQYXRoOiBcIm1zZ0lkXCJ9KTsvL+esrOS4gOasoeWIm+W7uuaVsOaNruihqO+8jOihqOWQjeS4juaVsOaNruW6k+WQjeebuOWQjFxyXG5cdCAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnY2hhdElkSW5kZXgnLCdjaGF0SWQnLHt1bmlxdWU6ZmFsc2V9KTsgXHJcblx0ICAgICAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KCd0b0lkSW5kZXgnLCd0b0lkJyx7dW5pcXVlOmZhbHNlfSk7XHJcblx0ICAgICAgICAgICAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KCdmcm9tSWRJbmRleCcsJ2Zyb21JZCcse3VuaXF1ZTpmYWxzZX0pO1xyXG5cdCAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgndGltZUluZGV4JywndGltZScse3VuaXF1ZTpmYWxzZX0pO1xyXG5cdCAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJ0RCIHZlcnNpb24gY2hhbmdlZCB0byAnK3ZlcnNpb24pO1xyXG5cdCAgICAgICAgXHR9O1xyXG5cdCAgICAgICAgfVxyXG5cdFx0fVxyXG5cdCAgICAgICAgXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjbG9zZURCKGRiKXsvL+WFs+mXreiBiuWkqeaVsOaNruW6k1xyXG4gICAgICAgIGRiLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXREYXRhQnlJbmRleChkYixzdG9yZU5hbWUsaW5kZXhUeXBlLHgsc2NvcGUsY2Ipey8v6YCa6L+HaW5kZXjmn6Xor6JcclxuICAgICAgICB2YXIgdHJhbnNhY3Rpb249ZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lKTtcclxuICAgICAgICB2YXIgc3RvcmU9dHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuICAgICAgICB2YXIgaW5kZXggPSBzdG9yZS5pbmRleChpbmRleFR5cGUpO1xyXG4gICAgICAgIHZhciByZXF1ZXN0PWluZGV4Lm9wZW5DdXJzb3IoSURCS2V5UmFuZ2Uub25seSh4KSk7XHJcbiAgICAgICAgc2NvcGUuZGJRdWVyeURhdGEgPSBbXTsvL+WcqHNjb3BlLmRiUXVlcnlEYXRh5Lit5a2Y5YKo5pWw5o2uXHJcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBudWxsO1xyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzPWZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICB2YXIgY3Vyc29yPWUudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgICAgaWYoY3Vyc29yKXtcclxuICAgICAgICAgICAgICAgIHZhciBqc29uPWN1cnNvci52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmRiUXVlcnlEYXRhLnB1c2goanNvbik7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFx0Y2ImJmNiKCk7Ly/miafooYzlm57osIPlh73mlbBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGFkZERhdGEobXlEQixkYXRhLGNiKXsvL+a3u+WKoOaVsOaNrixkYXRh5b+F6aG75Li6QXJyYXnnsbvlnotcclxuICAgICAgICB2YXIgdHJhbnNhY3Rpb249bXlEQi5kYi50cmFuc2FjdGlvbihteURCLm5hbWUsJ3JlYWR3cml0ZScpOyBcclxuICAgICAgICB2YXIgc3RvcmU9dHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobXlEQi5uYW1lKTsgXHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxkYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBzdG9yZS5hZGQoZGF0YVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNiJiZjYigpOy8v5YWo6YOo5pWw5o2u5re75Yqg5a6M5oiQ5ZCO5omn6KGM5Zue6LCDXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZWxldGVEYXRhQnlLZXkobXlEQix2YWx1ZSl7Ly/moLnmja7kv53lrZjnmoTplK7lgLzliKDpmaTmlbDmja5cclxuICAgICAgICB2YXIgdHJhbnNhY3Rpb249bXlEQi5kYi50cmFuc2FjdGlvbihteURCLm5hbWUsJ3JlYWR3cml0ZScpOyBcclxuICAgICAgICB2YXIgc3RvcmU9dHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUobXlEQi5uYW1lKTsgXHJcbiAgICAgICAgc3RvcmUuZGVsZXRlKHZhbHVlKTsgXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgXHRpbml0OmZ1bmN0aW9uKHNjb3BlLGNiKXsvL+WIneWni+WMluaVsOaNruW6k1xyXG4gICAgXHRcdHZhciBteURCID0ge1xyXG4gICAgXHRcdFx0bmFtZTpcImNoYXRNc2dcIixcclxuICAgIFx0XHRcdGRiOm51bGwsXHJcbiAgICBcdFx0XHR2ZXJzaW9uOjFcclxuICAgIFx0XHR9XHJcblx0XHRcdG9wZW5EQiAobXlEQixzY29wZSxjYilcclxuICAgIFx0fSxcclxuICAgIFx0Z2V0OmZ1bmN0aW9uKHNjb3BlLGNoYXRJZCxjYil7Ly/ojrflj5bmlbDmja5cclxuICAgIFx0XHR2YXIgbXlEQiA9IHtcclxuICAgIFx0XHRcdG5hbWU6XCJjaGF0TXNnXCIsXHJcbiAgICBcdFx0XHRkYjpudWxsLFxyXG4gICAgXHRcdFx0dmVyc2lvbjoxXHJcbiAgICBcdFx0fVxyXG4gICAgXHRcdG9wZW5EQihteURCLHNjb3BlLGZ1bmN0aW9uKCl7XHJcbiAgICBcdFx0XHRnZXREYXRhQnlJbmRleChteURCLmRiLG15REIubmFtZSxcImNoYXRJZEluZGV4XCIsY2hhdElkLHNjb3BlLGNiKTtcclxuICAgIFx0XHR9KVxyXG4gICAgXHR9LFxyXG4gICAgXHRhZGQ6ZnVuY3Rpb24oc2NvcGUsZGF0YSxjYil7Ly/mt7vliqDmlbDmja7vvIzlj4LmlbBkYXRh5b+F6aG75Li6QXJyYXnnsbvlnovmlbDmja5cclxuICAgIFx0XHR2YXIgbXlEQiA9IHtcclxuICAgIFx0XHRcdG5hbWU6XCJjaGF0TXNnXCIsXHJcbiAgICBcdFx0XHRkYjpudWxsLFxyXG4gICAgXHRcdFx0dmVyc2lvbjoxXHJcbiAgICBcdFx0fVxyXG4gICAgXHRcdG9wZW5EQihteURCLHNjb3BlLGZ1bmN0aW9uKCl7XHJcbiAgICBcdFx0XHRhZGREYXRhKG15REIsZGF0YSxjYik7XHJcbiAgICBcdFx0fSlcclxuICAgIFx0fSxcclxuICAgIFx0ZGVsZXRlOmZ1bmN0aW9uKHNjb3BlLGNoYXRJZCxjYil7XHJcbiAgICBcdFx0dmFyIG15REIgPSB7XHJcbiAgICBcdFx0XHRuYW1lOlwiY2hhdE1zZ1wiLFxyXG4gICAgXHRcdFx0ZGI6bnVsbCxcclxuICAgIFx0XHRcdHZlcnNpb246MVxyXG4gICAgXHRcdH1cclxuICAgIFx0XHRvcGVuREIobXlEQixzY29wZSxmdW5jdGlvbigpe1xyXG4gICAgXHRcdFx0Z2V0RGF0YUJ5SW5kZXgobXlEQi5kYixteURCLm5hbWUsY2hhdElkLHNjb3BlLGZ1bmN0aW9uKCl7Ly/ojrflj5bopoHliKDpmaTnmoTmlbDmja5cclxuICAgIFx0XHRcdFx0dmFyIGRlbGVEYXRhID0gc2NvcGUuZGJRdWVyeURhdGE7XHJcblx0ICAgIFx0XHRcdGZvcih2YXIgaT0wO2k8ZGVsZURhdGEubGVuZ3RoO2krKyl7Ly/pgY3ljobmiYDmnInnmoTlvoXliKDpmaTnmoTmlbDmja7vvIzov5vooYzliKDpmaTmk43kvZxcclxuXHQgICAgXHRcdFx0XHR2YXIgcmVxdWVzdCA9IGRlbGV0ZURhdGFCeUtleShteURCLGRlbGVEYXRhW2ldLm1zZ0lkKTtcclxuXHQgICAgXHRcdFx0fVxyXG5cdCAgICBcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCl7XHJcblx0ICAgIFx0XHRcdFx0Y29uc29sZS5sb2coXCJkZWxldGUgc3VjY2VzcyFcIik7XHJcblx0ICAgIFx0XHRcdH1cclxuICAgIFx0XHRcdH0pO1xyXG4gICAgXHRcdH0pXHJcbiAgICBcdH1cclxuICAgIH1cclxufSkiLCIvKipcclxuICogbmFtZTogdG0ucGFnaW5hdGlvblxyXG4gKiBWZXJzaW9uOiAxLjAuMCBiZXRhXHJcbiAqL1xyXG5hbmd1bGFyLm1vZHVsZSgndG0ucGFnaW5hdGlvbicsIFtdKS5kaXJlY3RpdmUoJ3RtUGFnaW5hdGlvbicsW2Z1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBhZ2UtbGlzdFwiPicgK1xyXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwicGFnaW5hdGlvblwiIG5nLXNob3c9XCJjb25mLnRvdGFsSXRlbXMgPiAwXCI+JyArXHJcbiAgICAgICAgICAgICc8bGkgbmctY2xhc3M9XCJ7ZGlzYWJsZWQ6IGNvbmYuY3VycmVudFBhZ2UgPT0gMX1cIiBuZy1jbGljaz1cInByZXZQYWdlKClcIj48c3Bhbj4mbGFxdW87PC9zcGFuPjwvbGk+JyArXHJcbiAgICAgICAgICAgICc8bGkgbmctcmVwZWF0PVwiaXRlbSBpbiBwYWdlTGlzdCB0cmFjayBieSAkaW5kZXhcIiBuZy1jbGFzcz1cInthY3RpdmU6IGl0ZW0gPT0gY29uZi5jdXJyZW50UGFnZSwgc2VwYXJhdGU6IGl0ZW0gPT0gXFwnLi4uXFwnfVwiICcgK1xyXG4gICAgICAgICAgICAnbmctY2xpY2s9XCJjaGFuZ2VDdXJyZW50UGFnZShpdGVtKVwiPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4+e3sgaXRlbSB9fTwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzwvbGk+JyArXHJcbiAgICAgICAgICAgICc8bGkgbmctY2xhc3M9XCJ7ZGlzYWJsZWQ6IGNvbmYuY3VycmVudFBhZ2UgPT0gY29uZi5udW1iZXJPZlBhZ2VzfVwiIG5nLWNsaWNrPVwibmV4dFBhZ2UoKVwiPjxzcGFuPiZyYXF1bzs8L3NwYW4+PC9saT4nICtcclxuICAgICAgICAgICAgJzwvdWw+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS10b3RhbFwiIG5nLXNob3c9XCJjb25mLnRvdGFsSXRlbXMgPiAwXCI+JyArXHJcbiAgICAgICAgICAgICfmr4/pobU8c2VsZWN0IG5nLW1vZGVsPVwiY29uZi5pdGVtc1BlclBhZ2VcIiBuZy1vcHRpb25zPVwib3B0aW9uIGZvciBvcHRpb24gaW4gY29uZi5wZXJQYWdlT3B0aW9ucyBcIiBuZy1jaGFuZ2U9XCJjaGFuZ2VJdGVtc1BlclBhZ2UoKVwiPjwvc2VsZWN0PicgK1xyXG4gICAgICAgICAgICAnL+WFsTxzdHJvbmc+e3sgY29uZi50b3RhbEl0ZW1zIH19PC9zdHJvbmc+5p2hICcgK1xyXG4gICAgICAgICAgICAn6Lez6L2s6IezPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmctbW9kZWw9XCJqdW1wUGFnZU51bVwiIG5nLWtleXVwPVwianVtcFBhZ2VLZXlVcCgkZXZlbnQpXCIvPicgK1xyXG4gICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibm8taXRlbXNcIiBuZy1zaG93PVwiY29uZi50b3RhbEl0ZW1zIDw9IDBcIj7mmoLml6DmlbDmja48L2Rpdj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicsXHJcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBjb25mOiAnPSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGNvbmYgPSBzY29wZS5jb25mO1xyXG5cclxuICAgICAgICAgICAgLy8g6buY6K6k5YiG6aG16ZW/5bqmXHJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0UGFnZXNMZW5ndGggPSA5O1xyXG5cclxuICAgICAgICAgICAgLy8g6buY6K6k5YiG6aG16YCJ6aG55Y+v6LCD5pW05q+P6aG15pi+56S655qE5p2h5pWwXHJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0UGVyUGFnZU9wdGlvbnMgPSBbMTAsIDE1LCAyMCwgMzAsIDUwXTtcclxuXHJcbiAgICAgICAgICAgIC8vIOm7mOiupOavj+mhteeahOS4quaVsFxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdFBlclBhZ2UgPSAxNTtcclxuXHJcbiAgICAgICAgICAgIC8vIOiOt+WPluWIhumhtemVv+W6plxyXG4gICAgICAgICAgICBpZihjb25mLnBhZ2VzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDliKTmlq3kuIDkuIvliIbpobXplb/luqZcclxuICAgICAgICAgICAgICAgIGNvbmYucGFnZXNMZW5ndGggPSBwYXJzZUludChjb25mLnBhZ2VzTGVuZ3RoLCAxMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIWNvbmYucGFnZXNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLnBhZ2VzTGVuZ3RoID0gZGVmYXVsdFBhZ2VzTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWIhumhtemVv+W6puW/hemhu+S4uuWlh+aVsO+8jOWmguaenOS8oOWBtuaVsOaXtu+8jOiHquWKqOWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYoY29uZi5wYWdlc0xlbmd0aCAlIDIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLnBhZ2VzTGVuZ3RoICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uZi5wYWdlc0xlbmd0aCA9IGRlZmF1bHRQYWdlc0xlbmd0aFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDliIbpobXpgInpobnlj6/osIPmlbTmr4/pobXmmL7npLrnmoTmnaHmlbBcclxuICAgICAgICAgICAgaWYoIWNvbmYucGVyUGFnZU9wdGlvbnMpe1xyXG4gICAgICAgICAgICAgICAgY29uZi5wZXJQYWdlT3B0aW9ucyA9IGRlZmF1bHRQYWdlc0xlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcGFnZUxpc3TmlbDnu4RcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UGFnaW5hdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gY29uZi5jdXJyZW50UGFnZVxyXG4gICAgICAgICAgICAgICAgaWYoY29uZi5jdXJyZW50UGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuY3VycmVudFBhZ2UgPSBwYXJzZUludChzY29wZS5jb25mLmN1cnJlbnRQYWdlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIWNvbmYuY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25mLnRvdGFsSXRlbXNcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYudG90YWxJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYudG90YWxJdGVtcyA9IHBhcnNlSW50KGNvbmYudG90YWxJdGVtcywgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbmYudG90YWxJdGVtc1xyXG4gICAgICAgICAgICAgICAgaWYoIWNvbmYudG90YWxJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYudG90YWxJdGVtcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjb25mLml0ZW1zUGVyUGFnZSBcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYuaXRlbXNQZXJQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5pdGVtc1BlclBhZ2UgPSBwYXJzZUludChjb25mLml0ZW1zUGVyUGFnZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoIWNvbmYuaXRlbXNQZXJQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5pdGVtc1BlclBhZ2UgPSBkZWZhdWx0UGVyUGFnZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBudW1iZXJPZlBhZ2VzXHJcbiAgICAgICAgICAgICAgICBjb25mLm51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwoc2NvcGUuY29uZi50b3RhbEl0ZW1zL2NvbmYuaXRlbXNQZXJQYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzliIbpobXmgLvmlbA+MO+8jOW5tuS4lOW9k+WJjemhteWkp+S6juWIhumhteaAu+aVsFxyXG4gICAgICAgICAgICAgICAgaWYoc2NvcGUuY29uZi5udW1iZXJPZlBhZ2VzID4gMCAmJiBzY29wZS5jb25mLmN1cnJlbnRQYWdlID4gc2NvcGUuY29uZi5udW1iZXJPZlBhZ2VzKXtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25mLmN1cnJlbnRQYWdlID0gc2NvcGUuY29uZi5udW1iZXJPZlBhZ2VzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWmguaenGl0ZW1zUGVyUGFnZeWcqOS4jeWcqHBlclBhZ2VPcHRpb25z5pWw57uE5Lit77yM5bCx5oqKaXRlbXNQZXJQYWdl5Yqg5YWl6L+Z5Liq5pWw57uE5LitXHJcbiAgICAgICAgICAgICAgICB2YXIgcGVyUGFnZU9wdGlvbnNMZW5ndGggPSBzY29wZS5jb25mLnBlclBhZ2VPcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDlrprkuYnnirbmgIFcclxuICAgICAgICAgICAgICAgIHZhciBwZXJQYWdlT3B0aW9uc1N0YXR1cztcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwZXJQYWdlT3B0aW9uc0xlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25mLnBlclBhZ2VPcHRpb25zW2ldID09IGNvbmYuaXRlbXNQZXJQYWdlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyUGFnZU9wdGlvbnNTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWmguaenGl0ZW1zUGVyUGFnZeWcqOS4jeWcqHBlclBhZ2VPcHRpb25z5pWw57uE5Lit77yM5bCx5oqKaXRlbXNQZXJQYWdl5Yqg5YWl6L+Z5Liq5pWw57uE5LitXHJcbiAgICAgICAgICAgICAgICBpZighcGVyUGFnZU9wdGlvbnNTdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYucGVyUGFnZU9wdGlvbnMucHVzaChjb25mLml0ZW1zUGVyUGFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5a+56YCJ6aG56L+b6KGMc29ydFxyXG4gICAgICAgICAgICAgICAgY29uZi5wZXJQYWdlT3B0aW9ucy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtyZXR1cm4gYSAtIGJ9KTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOmhteeggeebuOWFs1xyXG4gICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYubnVtYmVyT2ZQYWdlcyA8PSBjb25mLnBhZ2VzTGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDliKTmlq3mgLvpobXmlbDlpoLmnpzlsI/kuo7nrYnkuo7liIbpobXnmoTplb/luqbvvIzoi6XlsI/kuo7liJnnm7TmjqXmmL7npLpcclxuICAgICAgICAgICAgICAgICAgICBmb3IoaSA9MTsgaSA8PSBjb25mLm51bWJlck9mUGFnZXM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5oC76aG15pWw5aSn5LqO5YiG6aG16ZW/5bqm77yI5q2k5pe25YiG5Li65LiJ56eN5oOF5Ya177yaMS7lt6bovrnmsqHmnIkuLi4yLuWPs+i+ueayoeaciS4uLjMu5bem5Y+z6YO95pyJLi4u77yJXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6K6h566X5Lit5b+D5YGP56e76YePXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IChjb25mLnBhZ2VzTGVuZ3RoIC0gMSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmYuY3VycmVudFBhZ2UgPD0gb2Zmc2V0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5bem6L655rKh5pyJLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihpID0gMTsgaSA8PSBvZmZzZXQgKyAxOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKCcuLi4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLm51bWJlck9mUGFnZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNvbmYuY3VycmVudFBhZ2UgPiBjb25mLm51bWJlck9mUGFnZXMgLSBvZmZzZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKCcuLi4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGkgPSBvZmZzZXQgKyAxOyBpID49IDE7IGktLSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYubnVtYmVyT2ZQYWdlcyAtIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5udW1iZXJPZlBhZ2VzKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pyA5ZCO5LiA56eN5oOF5Ya177yM5Lik6L656YO95pyJLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goJy4uLicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGkgPSBNYXRoLmNlaWwob2Zmc2V0IC8gMikgOyBpID49IDE7IGktLSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYuY3VycmVudFBhZ2UgLSBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gb2Zmc2V0IC8gMjsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5jdXJyZW50UGFnZSArIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKCcuLi4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLm51bWJlck9mUGFnZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS4kcGFyZW50LmNvbmYgPSBjb25mO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBwcmV2UGFnZVxyXG4gICAgICAgICAgICBzY29wZS5wcmV2UGFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYoY29uZi5jdXJyZW50UGFnZSA+IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuY3VycmVudFBhZ2UgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25mLm9uQ2hhbmdlKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gbmV4dFBhZ2VcclxuICAgICAgICAgICAgc2NvcGUubmV4dFBhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYuY3VycmVudFBhZ2UgPCBjb25mLm51bWJlck9mUGFnZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuY3VycmVudFBhZ2UgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25mLm9uQ2hhbmdlKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8g5Y+Y5pu05b2T5YmN6aG1XHJcbiAgICAgICAgICAgIHNjb3BlLmNoYW5nZUN1cnJlbnRQYWdlID0gZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbSA9PSAnLi4uJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5jdXJyZW50UGFnZSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZi5jdXJyZW50UGFnZSA9aXRlbTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRQYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uZi5vbkNoYW5nZSgp5Ye95pWwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIOS/ruaUueavj+mhteWxleekuueahOadoeaVsFxyXG4gICAgICAgICAgICBzY29wZS5jaGFuZ2VJdGVtc1BlclBhZ2UgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDkuIDlj5HlsZXnpLrmnaHmlbDlj5jmm7TvvIzlvZPliY3pobXlsIbph43nva7kuLoxXHJcbiAgICAgICAgICAgICAgICBzY29wZS5jb25mLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbmYpO1xyXG4gICAgICAgICAgICAgICAgZ2V0UGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uZi5vbkNoYW5nZSgp5Ye95pWwXHJcbiAgICAgICAgICAgICAgICBpZihjb25mLm9uQ2hhbmdlKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYub25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIOi3s+i9rOmhtVxyXG4gICAgICAgICAgICBzY29wZS5qdW1wVG9QYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBudW0gPSBzY29wZS5qdW1wUGFnZU51bTtcclxuICAgICAgICAgICAgICAgIGlmKG51bS5tYXRjaCgvXFxkKy8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtID0gcGFyc2VJbnQobnVtLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihudW0gJiYgbnVtICE9IGNvbmYuY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtID4gY29uZi5udW1iZXJPZlBhZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW0gPSBjb25mLm51bWJlck9mUGFnZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOi3s+i9rFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRQYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbmYub25DaGFuZ2UoKeWHveaVsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjb25mLm9uQ2hhbmdlKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmp1bXBQYWdlTnVtID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzY29wZS5qdW1wUGFnZUtleVVwID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleWNvZGUgPSB3aW5kb3cuZXZlbnQgPyBlLmtleUNvZGUgOmUud2hpY2g7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGtleWNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5qdW1wVG9QYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnY29uZi50b3RhbEl0ZW1zJywgZnVuY3Rpb24odmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIOWcqOaXoOWAvOaIluWAvOebuOetieeahOaXtuWAme+8jOWOu+aJp+ihjG9uQ2hhbmdl5LqL5Lu2XHJcbiAgICAgICAgICAgICAgICBpZighdmFsdWUgfHwgdmFsdWUgPT0gb2xkVmFsdWUpIHsgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25mLm9uQ2hhbmdlKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25mLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2V0UGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ3JvdXRlcicsW1xyXG5cdCdob21lLnJvdXRlcicsXHJcblx0J2tmLnJvdXRlcicsXHJcblx0J2xvZ2luLnJvdXRlcicsXHJcblx0J3JlZ2lzdGVyLnJvdXRlcicsXHJcblx0J2Zsb3cucm91dGVyJyxcclxuXHQnY29tcGFueS5yb3V0ZXInLFxyXG5cdCdwcm9kdWN0LnJvdXRlcicsXHJcblx0J2FncmVlbWVudC5yb3V0ZXInLFxyXG5dKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLCckbG9jYXRpb25Qcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyLCRsb2NhdGlvblByb3ZpZGVyKXtcclxuXHQvLyAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xyXG5cdC8vICAgICBlbmFibGVkOiB0cnVlLFxyXG5cdC8vICAgICByZXF1aXJlQmFzZTogZmFsc2VcclxuXHQvLyB9KTtcclxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdsb2dpbicpO1xyXG59XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdjb21wYW55LmN0cmwnLFtdKVxyXG4uY29udHJvbGxlcignY29tcGFueUN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEpe1xyXG5cdCRzY29wZS5saXN0ID0gRGF0YS5nZXREYXRhKCdjb21wYW55JykubGlzdDtcclxufV0pXHJcbi5jb250cm9sbGVyKCdjb21wYW55TWFuYWdlQ3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCl7XHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGZsYWc6MSxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2g9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWFyY2goJHNjb3BlLnNlYXJjaEtleSk7XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRkQ29tcGFueUN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3Qpe1xyXG5cdCRzY29wZS5jb21wYW55PXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Ly8gYXJlYTonJyxcclxuXHRcdC8vIGNpdHk6JycsXHJcblx0XHRjbGFzc1R5cGU6JycsXHJcblx0fTtcclxuXHQkc2NvcGUuc2F2ZT1mdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdhZGRDb21wYW55JyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmNvbXBhbnkpfSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmNvbXBhbnkuY29tcGFueU1hbmFnZScpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2VkaXRDb21wYW55Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JywnJHN0YXRlUGFyYW1zJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCwkc3RhdGVQYXJhbXMpe1xyXG5cdCRzY29wZS5jb21wYW55PXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOicnLFxyXG5cdFx0Ly8gYXJlYTonJyxcclxuXHRcdC8vIGNpdHk6JycsXHJcblx0XHRtZXJjaElkOicnXHJcblx0fTtcclxuXHRpZigkc3RhdGVQYXJhbXMub2JqKXtcclxuXHRcdCRzY29wZS5jb21wYW55PSRzdGF0ZVBhcmFtcy5vYmo7XHJcblx0XHQkc2NvcGUuY29tcGFueS5jbGFzc1R5cGU9U3RyaW5nKCRzY29wZS5jb21wYW55LmNsYXNzVHlwZSk7XHJcblx0fVxyXG5cdGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5vYmopXHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZWRpdENvbXBhbnknKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUuY29tcGFueSl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuY29tcGFueS5jb21wYW55TWFuYWdlJyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pXHJcblx0fVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZSgnY29tcGFueS5yb3V0ZXInLFsnY29tcGFueS5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnaG9tZS5jb21wYW55Jyx7XHJcblx0XHR1cmw6Jy9jb21wYW55JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvY29tcGFueS9jb21wYW55Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonY29tcGFueUN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuY29tcGFueS5jb21wYW55TWFuYWdlJyx7XHJcblx0XHR1cmw6Jy9jb21wYW55TWFuYWdlJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvY29tcGFueS9jb21wYW55TWFuYWdlLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonY29tcGFueU1hbmFnZUN0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5jb21wYW55LmFkZENvbXBhbnknLHtcclxuXHRcdHVybDonL2FkZENvbXBhbnknLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9jb21wYW55L2FkZENvbXBhbnkuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidhZGRDb21wYW55Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5jb21wYW55LmVkaXRDb21wYW55Jyx7XHJcblx0XHR1cmw6Jy9lZGl0Q29tcGFueScsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NvbXBhbnkvY29tcGFueUVkaXQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidlZGl0Q29tcGFueUN0cmwnLFxyXG5cdFx0cGFyYW1zOiB7XHJcblx0ICAgICAgICBvYmo6IG51bGwgXHJcblx0ICAgIH1cclxuXHR9KVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZSgnZmxvdy5jdHJsJyxbJ3B1YnVsaWMnLCdkYXRhJ10pXHJcbi5jb250cm9sbGVyKCdmbG93Q3RybCcsWyckc2NvcGUnLCdEYXRhJywnJHRpbWVvdXQnLCdUaXAnLGZ1bmN0aW9uKCRzY29wZSxEYXRhLCR0aW1lb3V0LFRpcCl7XHJcblx0JHNjb3BlLmxpc3QgPSBEYXRhLmdldERhdGEoJ2Zsb3dEYXRhJykubGlzdDtcclxufV0pXHJcbi5jb250cm9sbGVyKCdmbG93Z2xDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwKXtcclxuXHQkc2NvcGUuc2VhcmNoTXNnID0ge307XHJcblx0JHNjb3BlLnNlYXJjaE1zZy5zdGFydERhdGUgPSAnJztcclxuXHRmdW5jdGlvbiBnZXRsaXN0KCl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZmxvd0xpc3QnKSxcclxuXHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUuc2VhcmNoTXNnKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5yZXN1bHQ7XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Z2V0bGlzdCgpO1xyXG5cdCRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0Z2V0bGlzdCgpO1xyXG5cdH1cclxuXHQkc2NvcGUuYmpaZCA9IGZ1bmN0aW9uKHgpe1xyXG5cdFx0JHN0YXRlLmdvKCdob21lLmZsb3cuYmpmbG93Jyx7XHJcblx0XHRcdGlkOnguZmxvd0lkLFxyXG5cdFx0XHRvYmo6eFxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRkZmxvd0N0cmwnLFsnJHNjb3BlJywnVGlwJywnJHN0YXRlJywnVXJsJywnJGh0dHAnLCdUaXAnLCdncm91cHNSb2xlcycsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSxUaXAsJHN0YXRlLFVybCwkaHR0cCxUaXAsZ3JvdXBzUm9sZXMsSHR0cCl7XHJcblx0JHNjb3BlLnllYXJzTGlzdCA9IFtdO1xyXG5cdCRzY29wZS5tb250aExpc3QgPSBbXTtcclxuXHQkc2NvcGUubXlNc2cgPSB7XHJcblx0XHRpbXBUeXBlOicnLFxyXG5cdFx0aW1wWWVhcjonJyxcclxuXHRcdGltcE1vbnRoOicnLFxyXG5cdFx0ZGVsRmxhZzonMCcsXHJcblx0XHRwYXRoTGlzdDonJ1xyXG5cdH07XHJcblx0Zm9yKHZhciBpID0gMjAxNztpPD0yMDUwO2krKyl7XHJcblx0XHQkc2NvcGUueWVhcnNMaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdGZvcih2YXIgaSA9IDE7aTw9MTI7aSsrKXtcclxuXHRcdCRzY29wZS5tb250aExpc3QucHVzaChpKTtcclxuXHR9XHJcblx0JHNjb3BlLmRlbGVmbG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBteWRlbGVNc2cgPSB7XHJcblx0XHRcdGltcFR5cGU6JHNjb3BlLm15TXNnLmltcFR5cGUsXHJcblx0XHRcdGltcFllYXI6JHNjb3BlLm15TXNnLmltcFllYXIsXHJcblx0XHRcdGltcE1vbnRoOiRzY29wZS5teU1zZy5pbXBNb250aCxcclxuXHRcdFx0ZGVsRmxhZzonMScsXHJcblx0XHRcdHBhdGhMaXN0OiRzY29wZS5teU1zZy5wYXRoTGlzdFxyXG5cdFx0fTtcclxuXHRcdGlmKCEkc2NvcGUubXlNc2cuaW1wVHlwZXx8ISRzY29wZS5teU1zZy5pbXBZZWFyfHwhJHNjb3BlLm15TXNnLmltcE1vbnRoKXtcclxuXHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDon6K+35YWI6YCJ5oup5p2h5Lu2Jyx0eXBlOjB9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKFwiaW1wb3J0Rmxvd0ZpbGVcIiksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGpzb246SlNPTi5zdHJpbmdpZnkobXlkZWxlTXNnKVxyXG5cdFx0XHR9XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmZsb3cuZmxvd2dsJyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnVwbG9hZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLmJ5Rm9ybSh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCd1cGxvYWRGbG93RmlsZScpLFxyXG5cdFx0XHRmaWxlTmFtZTonZmlsZScsXHJcblx0XHRcdG11bHRpcGxlOlwibXVsdGlwYXJ0XCIsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLnBhdGhMaXN0ID0gSlNPTi5wYXJzZShkYXRhLnBhdGhMaXN0KTtcclxuXHRcdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0pO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5mbG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKCEkc2NvcGUubXlNc2cuaW1wVHlwZXx8ISRzY29wZS5teU1zZy5pbXBZZWFyfHwhJHNjb3BlLm15TXNnLmltcE1vbnRofHwhJHNjb3BlLm15TXNnLnBhdGhMaXN0KXtcclxuXHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDon6K+35YWI6YCJ5oup5p2h5Lu2Jyx0eXBlOjB9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKFwiaW1wb3J0Rmxvd0ZpbGVcIiksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGpzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKVxyXG5cdFx0XHR9XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmZsb3cuZmxvd2dsJyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYmpmbG93Q3RybCcsWyckc2NvcGUnLCckc3RhdGVQYXJhbXMnLCdUaXAnLCckc3RhdGUnLCdVcmwnLCckaHR0cCcsJ1RpcCcsJ2dyb3Vwc1JvbGVzJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLCRzdGF0ZVBhcmFtcyxUaXAsJHN0YXRlLFVybCwkaHR0cCxUaXAsZ3JvdXBzUm9sZXMsSHR0cCl7XHJcblx0Y29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcclxuXHQkc2NvcGUubXlNc2cgPSAkc3RhdGVQYXJhbXMub2JqfHx7fTtcclxufV0pXHJcbi5jb250cm9sbGVyKCdzZXR0bGVtZW50Q3RybCcsWyckc2NvcGUnLCdUaXAnLCckc3RhdGUnLCdVcmwnLCckaHR0cCcsJ1RpcCcsJ2dyb3Vwc1JvbGVzJywnSHR0cCcsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxUaXAsJHN0YXRlLFVybCwkaHR0cCxUaXAsZ3JvdXBzUm9sZXMsSHR0cCxHZXRMaXN0KXtcclxuXHQkc2NvcGUuc2VhcmNoTXNnID0ge307XHJcblx0JHNjb3BlLnNlYXJjaE1zZy5zdGFydERhdGUgPSAnJztcclxuXHRmdW5jdGlvbiBnZXRsaXN0KCl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZ2V0c2V0dGxlbWVudExpc3QnKSxcclxuXHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUuc2VhcmNoTXNnKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5yZXN1bHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHRnZXRsaXN0KCk7XHJcblx0JHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRnZXRsaXN0KCk7XHJcblx0fVxyXG5cdC8v5LiK5qyh57uT566X5pe26Ze0XHJcblx0JHNjb3BlLnNldHRsZW1lbnREYXRlID0gZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAuZ2V0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2xhdGVzdCcpXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0JHNjb3BlLmxhc3REYXRlPWRhdGEuZGF0ZTtcclxuXHRcdFx0fWVsc2V7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2V0dGxlbWVudERhdGUoKTtcclxuXHQkc2NvcGUuc2V0dGxlbWVudCA9IGZ1bmN0aW9uKHgpe1xyXG5cdFx0SHR0cC5nZXQoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZ29TZXR0bGVtZW50JykrJy8nK3gucmViYXRlSWRcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRnZXRsaXN0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuY2FuY2VsU2V0dGxlbWVudCA9IGZ1bmN0aW9uKHgpe1xyXG5cdFx0SHR0cC5nZXQoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY2FuY2VsU2V0dGxlbWVudCcpKycvJyt4LnJlYmF0ZUlkXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Z2V0bGlzdCgpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0XHJcblx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLmhhbmRsZVNldHRsZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2hhbmRsZVNldHRsZW1lbnQnKVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGdldGxpc3QoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdmbG93LnJvdXRlcicsWydmbG93LmN0cmwnXSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJyxmdW5jdGlvbigkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcblx0LnN0YXRlKCdob21lLmZsb3cnLHtcclxuXHRcdHVybDonL2Zsb3cnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9mbG93dG8vZmxvdy5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2Zsb3dDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmZsb3cuZmxvd2dsJyx7XHJcblx0XHR1cmw6Jy9mbG93Z2wnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9mbG93dG8vZmxvdy9mbG93R2wuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidmbG93Z2xDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmZsb3cuYWRkZmxvdycse1xyXG5cdFx0dXJsOicvZmxvd2dsL2FkZGZsb3cnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9mbG93dG8vZmxvdy9hZGRGbG93Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRkZmxvd0N0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuZmxvdy5iamZsb3cnLHtcclxuXHRcdHVybDonL2Zsb3dnbC86aWQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9mbG93dG8vZmxvdy9iakZsb3cuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidiamZsb3dDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuZmxvdy5zZXR0bGVtZW50Jyx7XHJcblx0XHR1cmw6Jy9zZXR0bGVtZW50JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL3NldHRsZW1lbnQvc2V0dGxlbWVudC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J3NldHRsZW1lbnRDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoXCJob21lLmN0cmxcIixbXCJwdWJ1bGljXCIsJ2RhdGEnXSlcclxuLmNvbnRyb2xsZXIoXCJob21lQ3RybFwiLFsnJHNjb3BlJywnRGF0YScsJyRzdGF0ZVBhcmFtcycsJyRodHRwJywnVXJsJyxcIiR0aW1lb3V0XCIsJ0h0dHAnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSxEYXRhLCRzdGF0ZVBhcmFtcywkaHR0cCxVcmwsJHRpbWVvdXQsSHR0cCxUaXAsJHN0YXRlKXtcclxuXHQvL+eUqOaIt+S/oeaBr+e8k+WtmFxyXG5cdC8vIGlmKCRzdGF0ZVBhcmFtcy51c2VyKXtcclxuXHQvLyBcdCRzY29wZS51c2VyUHJpdmF0ZVVybD0kc3RhdGVQYXJhbXMudXNlci51c2VyUHJpdmF0ZVVybDtcclxuXHQvLyBcdCRzY29wZS51c2VySWQ9JHN0YXRlUGFyYW1zLnVzZXIuZW1wbG95ZWVJZDtcclxuXHQvLyBcdHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeSgkc3RhdGVQYXJhbXMpO1xyXG5cdC8vIFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnc3RhdGVQYXJhbXMnLHN0cik7XHJcblx0Ly8gfWVsc2V7XHRcclxuXHQvLyBcdHZhciBqc29uID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzdGF0ZVBhcmFtcycpKTtcclxuXHQvLyBcdCRzY29wZS51c2VyUHJpdmF0ZVVybD1qc29uLnVzZXIudXNlclByaXZhdGVVcmw7XHJcblx0Ly8gXHQkc2NvcGUudXNlcklkPWpzb24udXNlci5lbXBsb3llZUlkO1xyXG5cdC8vIH1cclxuXHQkc2NvcGUubWVudT17fTtcclxuXHQkc2NvcGUubWVudS5rZiA9IERhdGEuZ2V0RGF0YSgna2ZEYXRhJykudGl0bGU7XHJcblx0JHNjb3BlLm1lbnUuZmxvdyA9IERhdGEuZ2V0RGF0YSgnZmxvd0RhdGEnKS50aXRsZTtcclxuXHQkc2NvcGUubWVudS5wcm9kdWN0ID0gRGF0YS5nZXREYXRhKCdwcm9kdWN0JykudGl0bGU7XHJcblx0JHNjb3BlLm1lbnUuYWdyZWVtZW50ID0gRGF0YS5nZXREYXRhKCdhZ3JlZW1lbnQnKS50aXRsZTtcclxuXHQkc2NvcGUubWVudS5jb21wYW55ID0gRGF0YS5nZXREYXRhKCdjb21wYW55JykudGl0bGU7XHJcblx0JHNjb3BlLmdldHVzZXJuYW1lPWZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3VzZXJuYW1lJyksXHJcblx0XHRcdGRhdGE6e30sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdCRzY29wZS51c2VybmFtZT1kYXRhLnVzZXJuYW1lO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHQvLyBUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Ly8gXHQkc3RhdGUuZ28oJ2hvbWUubG9naW4nKTtcclxuXHRcdFx0XHQvLyB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuZ2V0dXNlcm5hbWUoKTtcclxuXHQkc2NvcGUubG9naW5vdXQ9ZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnbG9nb3V0JyksXHJcblx0XHRcdGRhdGE6e30sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdsb2dpbicpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW4nKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnZGF0YScsW10pXHJcbi5mYWN0b3J5KCdEYXRhJyxmdW5jdGlvbigpe1xyXG5cdHZhciBkYXRhPXtcclxuXHRcdGtmRGF0YTpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon5a6i5pyN5Lit5b+DJyxcclxuXHRcdFx0J3N0YXRlJzonLktGJyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOiflrqLmnI3nrqHnkIYnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+WuouacjeWIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGX2xiJ1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5re75Yqg5a6i5pyNJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfS0ZfYWRkS2Z6J1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOiflrqLmnI3nu4QnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+Wuouacjee7hOWIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGWl9sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a3u+WKoOWuouacjee7hCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGWl9hZGRLZnonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+inkuiJsueuoeeQhicsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon6KeS6Imy5YiX6KGoJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfSlNfbGInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifmt7vliqDlrqLmnI3nu4QnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9KU19hZGRKcydcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVx0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Z2REYXRhOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOiflt6XljZXnrqHnkIYnLFxyXG5cdFx0XHQnc3RhdGUnOicuR0QnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+aIkeeahOacquino+WGs+W3peWNlScsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5LyY5YWI5pyq6Kej5Yaz5bel5Y2VJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOidLRl9HRF95eHdqaidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+S4gOiIrOacquino+WGs+W3peWNlScsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonS0ZfR0RfeWJ3amonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+e7hOWGheacquino+WGs+W3peWNlScsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+aJgOacieacquino+WGs+W3peWNlScsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+aIkeeahOW3suino+WGs+W3peWNlScsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+aJgOacieW3peWNlScsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGNoYXREYXRhOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOidJTeWNs+aXtumAmuiurycsXHJcblx0XHRcdCdzdGF0ZSc6Jy5jaGF0JyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOiflvZPliY3kvJror50nLFxyXG5cdFx0XHRcdFx0Ly8nbGlzdCc6Y2hhdC5jdXJyZW50TWVzc2FnZShzY29wZSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+WOhuWPsuS8muivnScsXHJcblx0XHRcdFx0XHQvLydsaXN0JzpjaGF0Lmhpc3RvcnlNZXNzYWdlKHNjb3BlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVx0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Y29uZmlnOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOifphY3nva4nLFxyXG5cdFx0XHQnc3RhdGUnOicuY29uZmlnJyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmuKDpgZPphY3nva4nLFxyXG5cdFx0XHRcdFx0Ly8nbGlzdCc6Y2hhdC5jdXJyZW50TWVzc2FnZShzY29wZSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+mFjee9rumAiemhuScsXHJcblx0XHRcdFx0XHQvLydsaXN0JzpjaGF0Lmhpc3RvcnlNZXNzYWdlKHNjb3BlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVx0XHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG5cdFx0XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldERhdGE6ZnVuY3Rpb24oaWQpe1xyXG5cdFx0XHRmb3IoeCBpbiBkYXRhKXtcclxuXHRcdFx0XHRpZihpZD09eCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZGF0YVt4XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHRcclxuXHJcblx0XHJcbn0pIiwiYW5ndWxhci5tb2R1bGUoJ2hvbWUucm91dGVyJyxbJ2hvbWUuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuICAgICAgLnN0YXRlKCdob21lJywge1xyXG4gICAgICAgIHVybDogJy9ob21lJyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2hvbWUvaG9tZS5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiAnaG9tZUN0cmwnLFxyXG4gICAgICAgIHBhcmFtczp7XHJcbiAgICAgICAgXHR1c2VyOm51bGwsXHJcbiAgICAgICAgXHRwZXJtaXNzaW9uczpudWxsLFxyXG4gICAgICAgICAgZ3JvdXBEYXRhOm51bGwsXHJcbiAgICAgICAgICByb2xlRGF0YTpudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG59XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdrZi5jdHJsJyxbJ3B1YnVsaWMnLCdkYXRhJ10pXHJcbi5jb250cm9sbGVyKCdrZkN0cmwnLFsnJHNjb3BlJywnRGF0YScsJyR0aW1lb3V0JywnVGlwJyxmdW5jdGlvbigkc2NvcGUsRGF0YSwkdGltZW91dCxUaXApe1xyXG5cdCRzY29wZS5saXN0ID0gRGF0YS5nZXREYXRhKCdrZkRhdGEnKS5saXN0O1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2tmZ2xDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwKXtcclxuXHQkc2NvcGUucXVlcnlIb3NwaXRhbFR4dCA9IFwiXCI7XHRcclxuXHRmdW5jdGlvbiBnZXRsaXN0KCl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnemRMaXN0JyksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGhvc3BpdGFsTmFtZTokc2NvcGUucXVlcnlIb3NwaXRhbFR4dCxcclxuXHRcdFx0XHRmbGFnOjFcclxuXHRcdFx0fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEuaG9zcGl0YWxzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Z2V0bGlzdCgpO1xyXG5cdCRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0Z2V0bGlzdCgpO1xyXG5cdH1cclxuXHQkc2NvcGUuYmpaZCA9IGZ1bmN0aW9uKHgpe1xyXG5cdFx0JHN0YXRlLmdvKCdob21lLmtmLmJqa2YnLHtcclxuXHRcdFx0aWQ6eC5ob3NwaXRhbElkXHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdhZGRrZkN0cmwnLFsnJHNjb3BlJywnVGlwJywnJHN0YXRlJywnVXJsJywnJGh0dHAnLCdUaXAnLCdncm91cHNSb2xlcycsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSxUaXAsJHN0YXRlLFVybCwkaHR0cCxUaXAsZ3JvdXBzUm9sZXMsSHR0cCl7XHJcblx0JHNjb3BlLm15TXNnID0ge307XHJcblx0JHNjb3BlLnNhdmVNc2cgPSBmdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLm15TXNnLnpvbmVJZCA9ICRzY29wZS5teUFyZWE7XHJcblx0XHQkc2NvcGUubXlNc2cuY2l0eUlkID0gJHNjb3BlLm15Q2l0eTtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnYWRkWmQnKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUubXlNc2cpfVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5rZi5rZmdsJyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYmprZkN0cmwnLFsnJHNjb3BlJywnJHN0YXRlUGFyYW1zJywnVGlwJywnJHN0YXRlJywnVXJsJywnJGh0dHAnLCdUaXAnLCdncm91cHNSb2xlcycsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSwkc3RhdGVQYXJhbXMsVGlwLCRzdGF0ZSxVcmwsJGh0dHAsVGlwLGdyb3Vwc1JvbGVzLEh0dHApe1xyXG5cdGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcyk7XHJcblx0JHNjb3BlLm15TXNnID0ge307XHJcblx0SHR0cC5nZXQoe1xyXG5cdFx0dXJsOlVybC5nZXRVcmwoJ3F1ZXJ5WmQnKSsnLycrJHN0YXRlUGFyYW1zLmlkXHJcblx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuaG9zcGl0YWxOYW1lID0gZGF0YS5ob3NwaXRhbC5ob3NwaXRhbE5hbWU7XHJcblx0XHRcdCRzY29wZS5teU1zZy5ob3NwaXRhbElkID0gZGF0YS5ob3NwaXRhbC5ob3NwaXRhbElkO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cudHlwZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEuaG9zcGl0YWwudHlwZSk7XHJcblx0XHRcdCRzY29wZS5teUFyZWEgPSBkYXRhLmhvc3BpdGFsLnpvbmVJZDtcclxuXHRcdFx0JHNjb3BlLm15Q2l0eSA9IGRhdGEuaG9zcGl0YWwuY2l0eUlkO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6J+acjeWKoeerr+W8guW4uCcsdHlwZTowfSlcclxuXHRcdH1cclxuXHR9KVxyXG5cdCRzY29wZS5zYXZlTXNnID0gZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5teU1zZy56b25lSWQgPSAkc2NvcGUubXlBcmVhO1xyXG5cdFx0JHNjb3BlLm15TXNnLmNpdHlJZCA9ICRzY29wZS5teUNpdHk7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2JqWmQnKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUubXlNc2cpfVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oXCJob21lLmtmLmtmZ2xcIik7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcigna2Z6Z2xDdHJsJyxbJyRzY29wZScsJyRzdGF0ZVBhcmFtcycsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnR2V0TGlzdCcsJyR0aW1lb3V0JyxmdW5jdGlvbigkc2NvcGUsJHN0YXRlUGFyYW1zLFRpcCwkc3RhdGUsVXJsLCRodHRwLEdldExpc3QsJHRpbWVvdXQpe1xyXG4gICAkc2NvcGUucXVlcnlDdXN0b21lclR4dCA9IFwiXCI7XHRcclxuXHRmdW5jdGlvbiBnZXRsaXN0KCl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgna2hMaXN0JyksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGN1c3RvbWVyTmFtZTokc2NvcGUucXVlcnlDdXN0b21lclR4dCxcclxuXHRcdFx0XHRwaG9uZTonJyxcclxuXHRcdFx0XHRmbGFnOjFcclxuXHRcdFx0fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEuY3VzdG9tZXJzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Z2V0bGlzdCgpO1xyXG5cdCRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0Z2V0bGlzdCgpO1xyXG5cdH1cclxuXHQkc2NvcGUuYmpaZCA9IGZ1bmN0aW9uKHgpe1xyXG5cdFx0JHN0YXRlLmdvKCdob21lLmtmLmJqa2Z6Jyx7XHJcblx0XHRcdGlkOnguY3VzdG9tZXJJZFxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYmprZnpDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckdGltZW91dCcsJyRzdGF0ZVBhcmFtcycsJyRzdGF0ZScsJyRodHRwJywnVGlwJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCR0aW1lb3V0LCRzdGF0ZVBhcmFtcywkc3RhdGUsJGh0dHAsVGlwLEh0dHApe1xyXG5cdCRzY29wZS5teU1zZyA9IHt9O1xyXG5cdEh0dHAuZ2V0KHtcclxuXHRcdHVybDpVcmwuZ2V0VXJsKCdxdWVyeUtoJykrJy8nKyRzdGF0ZVBhcmFtcy5pZFxyXG5cdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmN1c3RvbWVyTmFtZSA9IGRhdGEuY3VzdG9tZXIuY3VzdG9tZXJOYW1lO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuY3VzdG9tZXJJZCA9IGRhdGEuY3VzdG9tZXIuY3VzdG9tZXJJZDtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmRlcG9zaXRCYW5rID0gZGF0YS5jdXN0b21lci5kZXBvc2l0QmFuaztcclxuXHRcdFx0JHNjb3BlLm15TXNnLmRlc2MgPSBkYXRhLmN1c3RvbWVyLmRlc2M7XHJcblx0XHRcdCRzY29wZS5teU1zZy5waG9uZSA9IGRhdGEuY3VzdG9tZXIucGhvbmU7XHJcblx0XHRcdCRzY29wZS5teU1zZy5pc0NvcnAgPSBkYXRhLmN1c3RvbWVyLmlzQ29ycDtcclxuXHRcdFx0JHNjb3BlLm15TXNnLnNlcmlhbENvZGUgPSBkYXRhLmN1c3RvbWVyLnNlcmlhbENvZGU7XHJcblx0XHRcdCRzY29wZS5teU1zZy5hY2NvdW50Q29kZSA9IGRhdGEuY3VzdG9tZXIuYWNjb3VudENvZGU7XHJcblx0XHRcdCRzY29wZS5teU1zZy5hY2NvdW50TmFtZSA9IGRhdGEuY3VzdG9tZXIuYWNjb3VudE5hbWU7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDon5pyN5Yqh56uv5byC5bi4Jyx0eXBlOjB9KTtcclxuXHRcdH1cclxuXHR9KVxyXG5cdCRzY29wZS5zYXZlTXNnID0gZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnYmpLaCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5teU1zZyl9XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbyhcImhvbWUua2Yua2Z6Z2xcIik7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRka2Z6Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJHRpbWVvdXQnLCckaHR0cCcsJ1RpcCcsJyRzdGF0ZScsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkdGltZW91dCwkaHR0cCxUaXAsJHN0YXRlLEh0dHApe1xyXG5cdCRzY29wZS5teU1zZyA9IHt9O1xyXG5cdCRzY29wZS5zYXZlTXNnID0gZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnYWRkS2gnKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUubXlNc2cpfVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbyhcImhvbWUua2Yua2Z6Z2xcIik7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2tmLnJvdXRlcicsWydrZi5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnaG9tZS5rZicse1xyXG5cdFx0dXJsOicvemQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9rZi9rZi5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2tmQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5rZi5rZmdsJyx7XHJcblx0XHR1cmw6Jy96ZGdsJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2ZnbC9LRkdMLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjona2ZnbEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUua2YuYWRkS2YnLHtcclxuXHRcdHVybDonL2tmemQvYWRkemQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9rZi9rZmdsL2FkZEtmLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRka2ZDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmtmLmJqa2YnLHtcclxuXHRcdHVybDonL3pkZ2wvOmlkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2ZnbC9iamtmLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYmprZkN0cmwnLFxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmtmLmtmemdsJyx7XHJcblx0XHR1cmw6Jy9raGdsJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2Z6Z2wvS0ZaR0wuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidrZnpnbEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUua2YuYWRka2Z6Jyx7XHJcblx0XHR1cmw6Jy9raGdsL2FkZGtoJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2Z6Z2wvYWRka2Z6Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRka2Z6Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5rZi5iamtmeicse1xyXG5cdFx0dXJsOicva2hnbC86aWQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9rZi9rZnpnbC9iamtmei5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2Jqa2Z6Q3RybCcsXHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2xvZ2luLmN0cmwnLFsnZGF0YScsJ3B1YnVsaWMnXSlcclxuLmNvbnRyb2xsZXIoJ2xvZ2luQ3RybCcsWyckc2NvcGUnLCckaHR0cCcsJyRzdGF0ZScsJ1VybCcsJ1RpcCcsJyR0aW1lb3V0JyxmdW5jdGlvbigkc2NvcGUsJGh0dHAsJHN0YXRlLFVybCxUaXAsJHRpbWVvdXQpe1xyXG5cdCRzY29wZS51c2VybmFtZT1sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9naW5JRCcpfHwnJztcclxuXHQkc2NvcGUucGFzc3dvcmQ9bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2luUEFTUycpfHwnJztcclxuXHQkc2NvcGUudGVzdF9zdHlsZTE9XCJcIjtcclxuXHQkc2NvcGUudGVzdF9zdHlsZTI9XCJcIjtcclxuXHQkc2NvcGUucmVtZW1iZXJJRD1mYWxzZTtcclxuXHQkc2NvcGUubG9naW5fc3VibWl0ID0gJ+eZu+W9lSdcclxuXHQkc2NvcGUuJHdhdGNoKCdyZW1lbWJlcklEJyxmdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLnJlbWVtYmVySUQpe1xyXG5cdFx0XHRUaXAuTG9nKCfotKblj7flr4bnoIHlsIblrZjlhaVjb29raWXvvIEnKTtcclxuXHRcdH1cclxuXHR9KVxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLm9uYmx1cj1mdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkc2NvcGUudXNlcm5hbWU9PVwiXCIpe1xyXG5cdFx0XHRcdCRzY29wZS50ZXN0X3N0eWxlMT1cImhhcy1lcnJvclwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0Y29uc29sZS5sb2coJHNjb3BlLnJlbWVtYmVySUQpXHRcdFxyXG5cdH1cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5vbmZvY3VzPWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUudGVzdF9zdHlsZTE9XCJcIjtcclxuXHRcdCRzY29wZS5lcnJvcl91c2VybmFtZT1cIlwiO1xyXG5cdH1cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS5vbmJsdXI9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYoJHNjb3BlLnBhc3N3b3JkPT1cIlwiKXtcclxuXHRcdFx0XHQkc2NvcGUudGVzdF9zdHlsZTI9XCJoYXMtZXJyb3JcIjtcclxuXHRcdFx0fVxyXG5cdFx0fSlcdFx0XHJcblx0fVxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLm9uZm9jdXM9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS50ZXN0X3N0eWxlMj1cIlwiO1xyXG5cdFx0JHNjb3BlLmVycm9yX3Bhc3N3b3JkPVwiXCI7XHJcblx0fVxyXG5cdCRzY29wZS5sb2dpbj1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0JHNjb3BlLmxvZ2luX3N1Ym1pdD0n55m75b2V5LitLi4uJztcclxuXHRcdH0pXHJcblx0XHRpZigkc2NvcGUucmVtZW1iZXJJRCl7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dpbklEJywkc2NvcGUudXNlcm5hbWUpO1xyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9naW5QQVNTJywkc2NvcGUucGFzc3dvcmQpO1xyXG5cdFx0fVxyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnbG9naW4nKSxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0dXNlcm5hbWU6JHNjb3BlLnVzZXJuYW1lLFxyXG5cdFx0XHRcdHBhc3N3b3JkOiRzY29wZS5wYXNzd29yZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LCAgXHJcblx0XHQgIFx0IHRyYW5zZm9ybVJlcXVlc3Q6IGZ1bmN0aW9uKG9iaikgeyAgXHJcblx0XHQgICAgIHZhciBzdHIgPSBbXTsgIFxyXG5cdFx0ICAgICBmb3IodmFyIHAgaW4gb2JqKXsgIFxyXG5cdFx0ICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcblx0XHQgICAgIH0gIFxyXG5cdFx0ICAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpOyAgXHJcblx0XHQgICBcdCB9XHRcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdC8vIFRpcC5Mb2coZGF0YS5tZXNzYWdlKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50Jyk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc2NvcGUubG9naW5fc3VibWl0PSfnmbvlvZUnO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pLmVycm9yKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkc2NvcGUubG9naW5fc3VibWl0PSfnmbvlvZUnO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2xvZ2luLnJvdXRlcicsWydsb2dpbi5jdHJsJ10pXHJcbi5jb25maWcoWyckdXJsUm91dGVyUHJvdmlkZXInLCckc3RhdGVQcm92aWRlcicsZnVuY3Rpb24oJHVybFJvdXRlclByb3ZpZGVyLCRzdGF0ZVByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnbG9naW4nLHtcclxuXHRcdHVybDonL2xvZ2luJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvbG9naW4vbG9naW4uaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidsb2dpbkN0cmwnXHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3Byb2R1Y3QuY3RybCcsW10pXHJcbi5jb250cm9sbGVyKCdwcm9kdWN0Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSl7XHJcblx0JHNjb3BlLmxpc3QgPSBEYXRhLmdldERhdGEoJ3Byb2R1Y3QnKS5saXN0O1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3Byb2R1Y3RNYW5hZ2VDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuc2VhcmNoS2V5PXtcclxuXHRcdHByb2R1Y3ROYW1lOicnLFxyXG5cdFx0cHJvZHVjdE5vcm1zOicnLFxyXG5cdFx0bWFudWZhY3R1cmU6JycsXHJcblx0XHRmbGFnOjEsXHJcblx0fTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3Byb2R1Y3RMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEucHJvZHVjdHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VhcmNoKCRzY29wZS5zZWFyY2hLZXkpO1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZFByb2R1Y3RDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUucHJvZHVjdD17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0cHJvZHVjdFByaWNlOicnXHJcblx0fTtcclxuXHQkc2NvcGUuc2F2ZT1mdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdhZGRQcm9kdWN0JyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLnByb2R1Y3QpfSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLnByb2R1Y3QucHJvZHVjdE1hbmFnZScpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2VkaXRQcm9kdWN0Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JywnJHN0YXRlUGFyYW1zJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCwkc3RhdGVQYXJhbXMpe1xyXG5cdCRzY29wZS5wcm9kdWN0PXtcclxuXHRcdHByb2R1Y3ROYW1lOicnLFxyXG5cdFx0cHJvZHVjdE5vcm1zOicnLFxyXG5cdFx0bWFudWZhY3R1cmU6JycsXHJcblx0XHRwcm9kdWN0UHJpY2U6JydcclxuXHR9O1xyXG5cdCRzY29wZS5wcm9kdWN0PSRzdGF0ZVBhcmFtcy5vYmo7XHJcblx0Ly8gJHNjb3BlLmdldERldGFpbD1mdW5jdGlvbih4KXtcclxuXHQvLyBcdEh0dHAucG9zdEYoe1xyXG5cdC8vIFx0XHR1cmw6VXJsLmdldFVybCgncHJvZHVjdERldGFpbCcpLFxyXG5cdC8vIFx0XHRkYXRhOntpZDp4fSxcclxuXHQvLyBcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0Ly8gXHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdC8vIFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0Ly8gXHRcdFx0VGlwLmxvZyhkYXRhLm1hc3NhZ2UsZnVuY3Rpb24oKXtcclxuXHQvLyBcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5wcm9kdWN0LnByb2R1Y3RNYW5hZ2UnKTtcclxuXHQvLyBcdFx0XHR9KVxyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHR9KVxyXG5cdC8vIH1cclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMub2JqKVxyXG5cdC8vICRzY29wZS5nZXREZXRhaWwoJHN0YXRlUGFyYW1zLm9iailcclxuXHQkc2NvcGUuc2F2ZT1mdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdlZGl0UHJvZHVjdCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5wcm9kdWN0KX0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5wcm9kdWN0LnByb2R1Y3RNYW5hZ2UnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3Byb2R1Y3Qucm91dGVyJyxbJ3Byb2R1Y3QuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ2hvbWUucHJvZHVjdCcse1xyXG5cdFx0dXJsOicvcHJvZHVjdCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3QvcHJvZHVjdC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J3Byb2R1Y3RDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLnByb2R1Y3QucHJvZHVjdE1hbmFnZScse1xyXG5cdFx0dXJsOicvcHJvZHVjdE1hbmFnZScsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3QvcHJvZHVjdE1hbmFnZS5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J3Byb2R1Y3RNYW5hZ2VDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUucHJvZHVjdC5hZGRQcm9kdWN0Jyx7XHJcblx0XHR1cmw6Jy9wcm9kdWN0TWFuYWdlJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvcHJvZHVjdC9hZGRQcm9kdWN0Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRkUHJvZHVjdEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUucHJvZHVjdC5lZGl0UHJvZHVjdCcse1xyXG5cdFx0dXJsOicvZWRpdFByb2R1Y3QnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0L3Byb2R1Y3RFZGl0Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZWRpdFByb2R1Y3RDdHJsJyxcclxuXHRcdHBhcmFtczoge1xyXG5cdCAgICAgICAgb2JqOiBudWxsIFxyXG5cdCAgICB9XHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3JlZ2lzdGVyLnJvdXRlcicsWydyZWdpc3Rlci5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgncmVnaXN0ZXInLHtcclxuXHRcdHVybDonL3JlZ2lzdGVyJyxcclxuXHRcdHRlbXBsYXRlVXJsOid2aWV3cy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6XCJyZWdpc3RlckN0cmxcIlxyXG5cdH0pXHJcblx0LnN0YXRlKCdyZWdpc3Rlci5zdGVwMScse1xyXG5cdFx0dXJsOicvMScsXHJcblx0XHR0ZW1wbGF0ZVVybDondmlld3MvcmVnaXN0ZXIvc3RlcDEuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidyZWdpc3RlclN0ZXAxQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgncmVnaXN0ZXIuc3RlcDInLHtcclxuXHRcdHVybDonLzInLFxyXG5cdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL3JlZ2lzdGVyL3N0ZXAyLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjoncmVnaXN0ZXJTdGVwMkN0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgncmVnaXN0ZXIuc3RlcDMnLHtcclxuXHRcdHVybDonLzMnLFxyXG5cdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL3JlZ2lzdGVyL3N0ZXAzLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjoncmVnaXN0ZXJTdGVwM0N0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZSgncmVnaXN0ZXIuY3RybCcsWydwdWJ1bGljJywnZGF0YSddKVxyXG4uY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJyxbJyRzY29wZScsJ1VybCcsJyRodHRwJywnJHRpbWVvdXQnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSxVcmwsJGh0dHAsJHRpbWVvdXQsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLnJlZ2lzdGVyTXNnPXt9O1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyU3RlcDFDdHJsJyxbJyRzY29wZScsJ1VybCcsJyRodHRwJywnJHRpbWVvdXQnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSxVcmwsJGh0dHAsJHRpbWVvdXQsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLmdvTmV4dFN0ZXA9ZmFsc2U7XHJcblx0JHNjb3BlLm1zZ195em09Jyc7XHJcblx0JHNjb3BlLnBob25lbnVtPScnO1xyXG5cdCRzY29wZS55em1fc3VibWl0PSflj5HpgIHpqozor4HnoIEnO1xyXG5cdCRzY29wZS5nb05leHQ9ZmFsc2U7XHJcblx0JHNjb3BlLnN1Ym1pdF9tc2c9ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRzY29wZS55em1fc3VibWl0PSflt7Llj5HpgIEuLi4nO1xyXG5cdFx0fSlcclxuXHRcdCRodHRwKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3ZlcmlmeU51bWJlcicpLFxyXG5cdFx0XHRwYXJhbXM6e1xyXG5cdFx0XHRcdFwidmVyaWZ5RmllbGRcIjoncGhvbmUnLFxyXG5cdFx0XHRcdFwidmVyaWZ5VmFsdWVcIjokc2NvcGUucGhvbmVudW1cclxuXHRcdFx0fVxyXG5cdFx0fSkudGhlbihmdW5jdGlvbihtc2cpe1xyXG5cdFx0XHR2YXIgZGF0YSA9IG1zZy5kYXRhO1xyXG5cdFx0XHRpZihkYXRhLmNvZGU9PTEpe1xyXG5cdFx0XHRcdGlmKGRhdGEudmVyaWZ5UmVzdWx0PT0wKXtcclxuXHRcdFx0XHRcdFRpcC5Mb2coJHNjb3BlLCfmiYvmnLrlj7fmoKHpqozmiJDlip/vvIEnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5nb05leHQ9dHJ1ZTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0VGlwLkxvZygkc2NvcGUsJ+ivpeaJi+acuuWPt+mHjeWkje+8gScsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdpc3Rlcl9waG9uZW51bWJlclwiKS5mb2N1cygpO1xyXG5cdFx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdCRzY29wZS55em1fc3VibWl0PSflj5HpgIHpqozor4HnoIEnO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSk7XHRcdFxyXG5cdFx0XHRcdH1cdFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSwn5aSx6LSlJytkYXRhLmNvZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUubmV4dFN0ZXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLmdvTmV4dCl7XHJcblx0XHRcdGlmKCRzY29wZS5waG9uZW51bWJlcil7XHJcblx0XHRcdFx0dmFyIHByb21pc2U9JGh0dHAoe1xyXG5cdFx0XHRcdFx0dXJsOlVybC5nZXRVcmwoJ3ZlcmlmeVNtcycpLFxyXG5cdFx0XHRcdFx0cGFyYW1zOntcclxuXHRcdFx0XHRcdFx0cGhvbmU6JHNjb3BlLnBob25lbnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRTTVNjb2RlOiRzY29wZS5tc2dfeXptXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkudGhlbihmdW5jdGlvbihtc2cpe1xyXG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBtc2cuZGF0YTtcclxuXHRcdFx0XHRcdGlmKGRhdGEuY29kZT09MCl7XHJcblx0XHRcdFx0XHRcdCRzdGF0ZS5nbygnLnJlZ2lzdGVyLnN0ZXAyJyk7XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0VGlwLkFsZXJ0KCfmk43kvZzlpLHotKUhJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhwcm9taXNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZigkc2NvcGUucGhvbmVudW0pe1xyXG5cdFx0XHRcdCRzY29wZS5yZWdpc3Rlck1zZy5waG9uZT0kc2NvcGUucGhvbmVudW07XHJcblx0XHRcdFx0JHN0YXRlLmdvKCdyZWdpc3Rlci5zdGVwMicse1xyXG5cdFx0XHRcdFx0b2JqOntcclxuXHRcdFx0XHRcdFx0cGhvbmU6JHNjb3BlLnBob25lbnVtXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFx0XHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyU3RlcDJDdHJsJyxbJyRzY29wZScsJyR0aW1lb3V0JywnJGh0dHAnLCckc3RhdGVQYXJhbXMnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSwkdGltZW91dCwkaHR0cCwkc3RhdGVQYXJhbXMsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLmVtYWlsPScnO1xyXG5cdCRzY29wZS5wYXNzV29yZCA9ICcnO1xyXG5cdCRzY29wZS5wYXNzd29yZF9hZ2FpbiA9ICcnO1xyXG5cdCRzY29wZS5wYXNzd29yZF9zdHJvbmc9Jyc7XHJcblx0dmFyIHJ1byA9IC9bMC05IGEteiBdLztcclxuXHRmdW5jdGlvbiBjaGVjayhzdHIpe1xyXG5cdFx0cmV0dXJuICgvXFxkKy9pLnRlc3Qoc3RyKSA/IDEgOiAwKSArICgvW2Etel0rL2kudGVzdChzdHIpID8gMSA6IDApICsgKCBzdHIucmVwbGFjZSgvXFxkKy9nKS5yZXBsYWNlKC9bYS16XSsvaWcpPT0ndW5kZWZpbmVkJyA/IDAgOiAxKTtcclxuXHR9XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykub25mb2N1cz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0ZG9jdW1lbnQub25rZXlkb3duPWZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIHN0ciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLnZhbHVlO1xyXG5cdFx0XHRcdHN3aXRjaChjaGVjayhzdHIpKXtcclxuXHRcdFx0XHRcdGNhc2UgMDpcclxuXHRcdFx0XHRcdCAkc2NvcGUucnVvPScnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0nJztcclxuXHRcdFx0XHRcdCAkc2NvcGUucWlhbmc9Jyc7IFxyXG5cdFx0XHRcdFx0ICRzY29wZS5wYXNzd29yZF9zdHJvbmc9Jyc7XHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDE6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0nJztcclxuXHRcdFx0XHRcdCAkc2NvcGUucWlhbmc9Jyc7IFxyXG5cdFx0XHRcdFx0ICRzY29wZS5wYXNzd29yZF9zdHJvbmc9J+W8sSc7XHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDI6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS5xaWFuZz0nJzsgXHJcblx0XHRcdFx0XHQgJHNjb3BlLnBhc3N3b3JkX3N0cm9uZz0n5LitJzsgXHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDM6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS5xaWFuZz0ncGFzc3dvcmRfYmcnOyBcclxuXHRcdFx0XHRcdCAkc2NvcGUucGFzc3dvcmRfc3Ryb25nPSflvLonO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc3VibWl0UmVnaXN0ZXI9ZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5wYXNzV29yZCE9JHNjb3BlLnBhc3N3b3JkX2FnYWluKXtcclxuXHRcdFx0VGlwLkFsZXJ0KCfnoa7orqTlr4bnoIHkuI3kuIDoh7TvvIEnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoJHNjb3BlLnBhc3NXb3JkKXtcclxuXHRcdFx0JHN0YXRlLmdvKCdyZWdpc3Rlci5zdGVwMycse1xyXG5cdFx0XHRcdG9iajp7XHJcblx0XHRcdFx0XHRwaG9uZTokc3RhdGVQYXJhbXMub2JqLnBob25lLFxyXG5cdFx0XHRcdFx0ZW1haWw6JHNjb3BlLmVtYWlsLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQ6JHNjb3BlLnBhc3NXb3JkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdyZWdpc3RlclN0ZXAzQ3RybCcsWyckc2NvcGUnLCckdGltZW91dCcsJyRodHRwJywnJHN0YXRlUGFyYW1zJywnVXJsJywnVGlwJywnJHN0YXRlJyxmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsJGh0dHAsJHN0YXRlUGFyYW1zLFVybCxUaXAsJHN0YXRlKXtcclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xyXG5cdCRzY29wZS5jb25TaXplPTUwO1xyXG5cdCRzY29wZS5jb25OYW1lPVwiXCI7XHJcblx0JHNjb3BlLmNvbldvcmxkPVwiXCI7XHJcblx0JHNjb3BlLnJlZ2lzdGVyPWZ1bmN0aW9uKCl7XHJcblx0XHR2YXIganNvbiA9IHtcclxuXHRcdFx0dXNlclByaXZhdGVVcmw6JHNjb3BlLmNvbldvcmxkKycuY21jYy5jb20nLFxyXG5cdFx0XHRlbWFpbDokc3RhdGVQYXJhbXMub2JqLmVtYWlsLFxyXG5cdFx0XHRwaG9uZTokc3RhdGVQYXJhbXMub2JqLnBob25lLFxyXG5cdFx0XHRvYmplY3RUeXBlOjIsXHJcblx0XHRcdG5hbWU6JHNjb3BlLmNvbk5hbWUsXHJcblx0XHRcdGNvbXBhbnlTY2FsZTokc2NvcGUuY29uU2l6ZSxcclxuXHRcdFx0cGFzc3dvcmQ6JHN0YXRlUGFyYW1zLm9iai5wYXNzd29yZFxyXG5cdFx0fVxyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmVnaXN0ZXInKSxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTpqc29uXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSxcIuazqOWGjOaIkOWKnyFcIixmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdsb2dpbicpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZSgnZGF0YScsW10pXHJcbi5mYWN0b3J5KCdEYXRhJyxbJyR0aW1lb3V0JyxmdW5jdGlvbigkdGltZW91dCl7XHJcblx0dmFyIGRhdGE9e1xyXG5cdFx0a2ZEYXRhOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOifnu4jnq68nLFxyXG5cdFx0XHQnc3RhdGUnOicuS0YnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+e7iOerr+euoeeQhicsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicua2ZnbCcsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon57uI56uv5YiX6KGoJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfS0ZfbGInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifmt7vliqDnu4jnq68nLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRl9hZGRLZnonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+WuouaIt+WIl+ihqCcsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicua2Z6Z2wnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+WuouaIt+WIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGWl9sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a3u+WKoOWuouaItycsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGWl9hZGRLZnonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdFx0XHRjb21wYW55OlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOifllYbkuJonLFxyXG5cdFx0XHQnc3RhdGUnOicuY29tcGFueScsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5ZWG5Lia566h55CGJyxcclxuXHRcdFx0XHRcdCdzdGF0ZSc6Jy5jb21wYW55TWFuYWdlJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVx0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0cHJvZHVjdDpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon5Lqn5ZOBJyxcclxuXHRcdFx0J3N0YXRlJzonLnByb2R1Y3QnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+S6p+WTgeeuoeeQhicsXHJcblx0XHRcdFx0XHQnc3RhdGUnOidob21lLnByb2R1Y3QucHJvZHVjdE1hbmFnZSdcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGFncmVlbWVudDpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon5Y2P6K6uJyxcclxuXHRcdFx0J3N0YXRlJzonLmFncmVlbWVudCcsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5ZWG5Lia5Y2P6K6uJyxcclxuXHRcdFx0XHRcdCdzdGF0ZSc6J2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50J1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5a6i5oi35Y2P6K6uJyxcclxuXHRcdFx0XHRcdCdzdGF0ZSc6J2hvbWUuYWdyZWVtZW50Lmd1ZXN0QWdyZWVtZW50J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVx0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Zmxvd0RhdGE6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J+a1geWQkScsXHJcblx0XHRcdCdzdGF0ZSc6Jy5mbG93JyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmtYHlkJHnrqHnkIYnLFxyXG5cdFx0XHRcdFx0J3N0YXRlJzonLmZsb3dnbCcsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5rWB5ZCR5YiX6KGoJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuZmxvd19mbG93X2xiJ1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5a+85YWl5rWB5ZCRJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuZmxvd19mbG93X2FkZGZsb3cnXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+e7k+eul+euoeeQhicsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicuc2V0dGxlbWVudCcsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHR9XHJcblx0XHRcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0RGF0YTpmdW5jdGlvbihpZCl7XHJcblx0XHRcdGZvcih4IGluIGRhdGEpe1xyXG5cdFx0XHRcdGlmKGlkPT14KXtcclxuXHRcdFx0XHRcdHJldHVybiBkYXRhW3hdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGdldENoYXQ6ZnVuY3Rpb24oc2NvcGUpe1xyXG5cdFx0XHRjaGF0U2VydmUubXNnKHNjb3BlKTtcdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uZmFjdG9yeSgnVXJsJyxmdW5jdGlvbigpe1xyXG5cdHZhciB1cmxEYXRhPXtcclxuXHRcdGxvZ2luOidhcGkvbG9naW4vbG9naW4nLC8v55m76ZmGXHJcblx0XHR6ZExpc3Q6J2FwaS9ob3NwL3F1ZXJ5L2xpc3QnLC8v57uI56uv5YiX6KGoXHJcblx0XHRxdWVyeVpkOidhcGkvaG9zcC8vcXVlcnkvb25lJywvL+afpeivoue7iOerr+ivpuaDhVxyXG5cdFx0Z2V0QXJlYXNMaXN0OidhcGkvem9uZS9xdWVyeUZvckFsbFpvbmVzJywvL+iOt+WPluWkp+WMuuWIl+ihqFxyXG5cdFx0Z2V0Q2l0eUxpc3Q6J2FwaS96b25lL3F1ZXJ5Q2l0eUJ5Wm9uZScsLy/ojrflj5bln47luILliJfooahcclxuXHRcdGJqWmQ6J2FwaS9ob3NwLy91cGRhdGUvb25lJywvL+e8lui+kee7iOerr+S/oeaBr1xyXG5cdFx0YWRkWmQ6J2FwaS9ob3NwL2luc2VydC9vbmUnLC8v5paw5aKe57uI56uv5L+h5oGvXHJcblx0XHRraExpc3Q6J2FwaS9jdXN0b21lci9xdWVyeS9saXN0JywvL+WuouaIt+WIl+ihqFxyXG5cdFx0YWRkS2g6J2FwaS9jdXN0b21lci9pbnNlcnQvb25lJywvL+a3u+WKoOWuouaIt1xyXG5cdFx0cXVlcnlLaDonYXBpL2N1c3RvbWVyL3F1ZXJ5L29uZScsLy/mn6Xor6LlrqLmiLfor6bmg4VcclxuXHRcdGJqS2g6J2FwaS9jdXN0b21lci8vdXBkYXRlL29uZScsLy/nvJbovpHlrqLmiLfkv6Hmga9cclxuXHRcdGZsb3dMaXN0OidhcGkvZmxvdy9xdWVyeS9saXN0JywvL+afpeivoua1geWQkeWIl+ihqFxyXG5cdFx0Z2V0c2V0dGxlbWVudExpc3Q6J2FwaS9yZWJhdGVQcm9jZXNzL2xpc3QnLC8v6I635Y+W57uT566X5YiX6KGoXHJcblx0XHRnb1NldHRsZW1lbnQ6J2FwaS9yZWJhdGVQcm9jZXNzL3BheScsLy/nu5Pnrpfku5jmrL5cclxuXHRcdGNhbmNlbFNldHRsZW1lbnQ6J2FwaS9yZWJhdGVQcm9jZXNzL3BheS9jYW5jZWwnLC8v5Y+W5raI57uT566XXHJcblx0XHRoYW5kbGVTZXR0bGVtZW50OidhcGkvcmViYXRlUHJvY2Vzcy9kZWFsJywvL+e7k+eul+WkhOeQhlxyXG5cdFx0dXBsb2FkRmxvd0ZpbGU6J2FwaS91cGxvYWQvZmlsZScsLy/kuIrkvKDnu5Pnrpfmlofku7ZcclxuXHRcdGltcG9ydEZsb3dGaWxlOidhcGkvZmxvdy9pbXBvcnQnLC8v5a+85YWl5rWB5ZCR5paH5Lu2XHJcblx0XHQvL2xrbVxyXG5cdFx0aG9zcExpc3Q6J2FwaS9ob3NwL3F1ZXJ5L2xpc3QnLC8v57uI56uv5YiX6KGoXHJcblx0XHRjdXN0b21lckxpc3Q6J2FwaS9jdXN0b21lci9xdWVyeS9saXN0JywvL+WuouaIt+WIl+ihqFxyXG5cdFx0cHJvZHVjdExpc3Q6J2FwaS9wcm9kdWN0L3F1ZXJ5L2xpc3QnLC8v6I635Y+W5Lqn5ZOB5YiX6KGoXHJcblx0XHRhZGRQcm9kdWN0OidhcGkvcHJvZHVjdC9pbnNlcnQvb25lJywvL+a3u+WKoOS6p+WTgVxyXG5cdFx0ZWRpdFByb2R1Y3Q6J2FwaS9wcm9kdWN0L3VwZGF0ZS9vbmUnLC8v57yW6L6R5Lqn5ZOBXHJcblx0XHRwcm9kdWN0RGV0YWlsOidhcGkvcHJvZHVjdC9xdWVyeS9vbmUnLC8v5p+l55yL5Lqn5ZOB6K+m5oOFXHJcblx0XHRtZXJjaGFuUHJvdExpc3Q6J2FwaS9tZXJjaGFuUHJvdC9xdWVyeS9saXN0JywvL+iOt+WPluWVhuS4muWNj+iuruWIl+ihqFxyXG5cdFx0YWRkTWVyY2hhblByb3Q6J2FwaS9tZXJjaGFuUHJvdC9pbnNlcnQvb25lJywvL+a3u+WKoOWVhuS4muWNj+iurlxyXG5cdFx0ZWRpdE1lcmNoYW5Qcm90OidhcGkvbWVyY2hhblByb3QvdXBkYXRlL29uZScsLy/nvJbovpHllYbkuJrljY/orq5cclxuXHRcdGJ1c2luZXNzQWdyZWVtZW50OidhcGkvbWVyY2hhblByb3QvcXVlcnkvb25lLycsLy/mn6XnnIvllYbkuJrljY/orq7or6bmg4VcclxuXHRcdHByb3RvY29sTGlzdDonYXBpL3Byb3RvY29sL3F1ZXJ5L2xpc3QvdmFsaWQnLC8v6I635Y+W5a6i5oi35Y2P6K6u5YiX6KGoXHJcblx0XHR1c2luZ0FncmVlbWVudDonYXBpL3Byb3RvY29sL3F1ZXJ5L2xpc3QvdmFsaWQnLC8v5a6i5oi36K+m5oOF5Zyo55So5Y2P6K6uXHJcblx0XHRhZGRwcm90b2NvbDonYXBpL3Byb3RvY29sL2luc2VydC9vbmUnLC8v5re75Yqg5a6i5oi35Y2P6K6uXHJcblx0XHRlZGl0cHJvdG9jb2w6J2FwaS9wcm90b2NvbC91cGRhdGUvb25lJywvL+e8lui+keWuouaIt+WNj+iurlxyXG5cdFx0Z3Vlc3RBZ3JlZW1lbnQ6J2FwaS9wcm90b2NvbC9xdWVyeS9vbmUvJywvL+afpeeci+WuouaIt+WNj+iuruivpuaDhVxyXG5cdFx0Y29tcGFueUxpc3Q6J2FwaS9tZXJjaGFuL21lcmNoYW4vbGlzdCAnLC8v6I635Y+W5YWs5Y+45YiX6KGoXHJcblx0XHRhZGRDb21wYW55OidhcGkvbWVyY2hhbi9tZXJjaGFuL2FkZCcsLy/mt7vliqDlhazlj7hcclxuXHRcdGVkaXRDb21wYW55OidhcGkvbWVyY2hhbi9tZXJjaGFuL3VwZGF0ZScsLy/nvJbovpHlhazlj7hcclxuXHRcdG1lcmNoYW5Qcm90RGV0YWlsOidhcGkvbWVyY2hhbi9tZXJjaGFuL29uZScsLy/mn6XnnIvlhazlj7jor6bmg4VcclxuXHRcdHJlYmF0ZVN0eWxlOidhcGkvcmViYXRlU3R5bGUvbGlzdCcsLy/mn6XnnIvov5TliKnmlrnlvI9cclxuXHRcdGxvZ291dDonYXBpL2xvZ2luL2xvZ291dCcsLy/pgIDlh7rnmbvlvZVcclxuXHRcdHVzZXJuYW1lOidhcGkvdXNlci91c2VybmFtZScsLy/nlKjmiLflkI1cclxuXHRcdGxhdGVzdDonYXBpL3JlYmF0ZVByb2Nlc3MvdGltZS9sYXRlc3QnLC8v5LiK5qyh57uT566X5pe26Ze0XHJcblxyXG5cdH1cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0VXJsOmZ1bmN0aW9uKHVybCl7XHJcblx0XHRcdGZvcihpIGluIHVybERhdGEpe1xyXG5cdFx0XHRcdGlmKHVybD09aSl7XHJcblx0XHRcdFx0XHQgLy8gcmV0dXJuICdjeWNybS8nK3VybERhdGFbaV07Ly/mtYvor5Xkvb/nlKhcclxuXHRcdFx0XHRcdCByZXR1cm4gdXJsRGF0YVtpXTsvL+WPkeW4g+S9v+eUqFxyXG5cdFx0XHRcdFx0Ly8gcmV0dXJuIFwiaHR0cDovLzE5Mi4xNjguOTIuMTI6MjgwNzQvXCIrdXJsRGF0YVtpXTtcclxuXHRcdFx0XHRcdC8vcmV0dXJuIFwiaHR0cDovLzE5Mi4xNjguOTIuMjM6MjgwNzQvXCIrdXJsRGF0YVtpXTtcclxuXHRcdFx0XHRcdC8vcmV0dXJuIFwiaHR0cDovL3lrZi50dW5uZWwucXlkZXYuY29tL1wiK3VybERhdGFbaV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYWRkS2YuY3RybCcsW10pXHJcbi5jb250cm9sbGVyKCdhZGRrZkN0cmwnLFsnJHJvb3RTY29wZScsZnVuY3Rpb24oJHJvb3RTY29wZXMpe1xyXG5cdFxyXG59XSkiXX0=
