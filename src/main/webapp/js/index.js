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
.directive('msgTip',['Http','Url','$timeout','Tip',function(Http,Url,$timeout,Tip){
	return {
		restrict:'E',
		templateUrl:"window_tip",
		// template:'<ul style="width:60%;position:absolute;top:0;left:20%;" id= "tplModel"><ul>',
		// template:'<div><tip-confirm></tip-confirm><tipalert></tipalert><div>',
		link:function(scope,ele,attr){
			console.log(scope);
			scope.msg = {};
			scope.config = {
				// socketAddress:"ws://192.168.92.72:8080/cycrm/websocketTest",
				socketAddress:"ws://192.168.1.135:8080/cycrm/websocketTest",
				init:false
			}
			scope.username='';
			if(localStorage.getItem('loginID')){
				scope.username=localStorage.getItem('loginID');
			}
			scope.connectWs = function(){
				var ws={};
				var _this = this;
				scope.msg = [ 
					{
						name:'库存异常',
						type:20001,
						list:[],
						router:'home.outboundTask',
						show:false
					},
					{
						name:'佣金返利异常',
						type:20002,
						list:[],
						router:'home.chat',
						show:false
					},
					// {
					// 	name:'其他消息',
					// 	type:20003,
					// 	list:[],
					// 	router:'',
					// 	show:false
					// }
				];
				if ('WebSocket' in window) {
					try{
						console.log(scope.config.socketAddress)
						ws = new WebSocket(scope.config.socketAddress);
					}catch(e){
						// console.log(e);
					}   
				} else if ('MozWebSocket' in window) {
					ws = new WebSocket(scope.config.socketAddress);
				} else {
					console.log('WebSocket is not supported by this browser.');
					return;
				}
				ws.onopen = function() {
					console.log("connect success!");
					ws.send(scope.username);
					// setTimeout(function(){
					// 	ws.send("alive");
					// },180000)
				};
				ws.onmessage=function(ev){
					console.log(ev.data);
					if(ev.data){
						console.log(JSON.parse(ev.data));
						var msg=JSON.parse(ev.data);
						scope.windowTipShow = true;
						for(var i=0;i<scope.msg.length;i++){
							if(scope.msg[i].type == msg.alertCode){
								var ind=i;
								$timeout(function() {
									scope.msg[ind].list=msg.beans;
								});
							}
						}
					}
				}
				ws.onclose = function() {
					console.log('------------websocket关闭,尝试重新连接------------');
					try{
						var timer = setTimeout(function(){
							_this.connectWs(scope.config.socketAddress);
							clearInterval(timer);
							timer = null;
						},10000)
						
					}catch(e){
						console.log(e);
					}
				};
				this.ws = ws;
			}
			scope.init = function(){
				Http.postF({
					url:Url.getUrl('wsAddress'),
					data:{}
				}).success(function(data){
					console.log(data)
					if(data.code==1){
						scope.config.socketAddress="ws:"+data.ip+":8080/cycrm/websocketTest";
						console.info('init success!');
						scope.connectWs();

					}
				})
				
			}
			scope.init();
			scope.TipTableShow = false;
			scope.closeWindowTip = function(){
				scope.windowTipShow = false;
			}
			scope.openTipTable = function(x,index){
				scope.tipTableTit=x.name;
				scope.tipTableList=x.list;
				// scope.windowTipShow = false;
				scope.TipTableShow = true;
				console.log(scope.tipTableList)
			}	
			function closeTip (data,url){
				Http.postF({
					url:url,
					data:{'json':JSON.stringify(data)}
				}).success(function(data){
					console.log(data)
					if(data.code==1){
						Tip.Log(scope,{txt:data.message,type:1},function(){
							scope.TipTableShow = false;
						})
					}
				})
			}	
			scope.idList=[];
			// scope.TipTableShow = true;		
			scope.closeTipTable = function(){
				scope.TipTableShow = false;
			}
			scope.closeTips = function(){
				var data = {},
					url  = '';
				scope.idList =	scope.tipTableList.map(function(v){
					if(v.hospitalId){
						data={
							hospitalId:v.hospitalId,
							productId:v.productId
						}
					}
					if(v.merchanId){
						data={
							merchanId:v.merchanId,
							productId:v.productId
						};
					}
					return data;
				})
				switch(scope.tipTableTit){
					case '库存异常':
						url=Url.getUrl('stockClose');
						break;
					case '佣金返利异常':
						url=Url.getUrl('promoteClose');
						break;
				}
				closeTip (scope.idList,url)
			}
			scope.closeTip = function(x){
				var data,url;
				switch(scope.tipTableTit){
					case '库存异常':
						data={
							merchanId:x.merchanId||'',
							productId:x.productId||''
						};
						url=Url.getUrl('stockClose');
						break;
					case '佣金返利异常':
						data={
							productId:x.productId||'',
							hospitalId:x.hospitalId||''
						};
						url=Url.getUrl('promoteClose');
						break;
				}
				scope.idList.push(data);
				closeTip (scope.idList,url)
			}
			// scope.closePromoteTip = function(x){
			// 	var data={
			// 		productId:x.productId||'',
			// 		hospitalId:x.hospitalId||''
			// 	};
			// 	Http.postF({
			// 		url:Url.getUrl('promoteClose'),
			// 		data:data
			// 	}).success(function(data){
			// 		console.log(data)
			// 		if(data.code==1){

			// 		}
			// 	})
			// 	scope.TipTableShow = false;
			// }
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
		$timeout(function(){
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
		localStorage.setItem('loginID',$scope.username);
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
		promoteFee:'',
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
		productPrice:'',
		manufacture:'',
		bidPrice:'',
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
		productPrice:'',
		manufacture:'',
		bidPrice:'',
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
		stockClose:'api/stock/update/state',//关闭库存状态推送
		promoteClose:'api/promote/update/state',//关闭推广费返利推送
		wsAddress:'api/websocket/inetAddress',//ws地址

	}
	return {
		getUrl:function(url){
			for(i in urlData){
				if(url==i){
				    // return 'cycrm/'+urlData[i];//测试使用
				    return urlData[i];//发布使用
				}
			}
		}
	}
})

angular.module('addKf.ctrl',[])
.controller('addkfCtrl',['$rootScope',function($rootScopes){
	
}])
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFncmVlbWVudC9hZ3JlZW1lbnQtY3RybC5qcyIsImFncmVlbWVudC9hZ3JlZW1lbnQtcm91dGVyLmpzIiwiY29tbW9uL2FwcC5qcyIsImNvbW1vbi9jb21tb24uanMiLCJjb21tb24vcGFnaW5hdGlvbi5qcyIsImNvbW1vbi9yb3V0ZXIuanMiLCJjb21wYW55L2NvbXBhbnktY3RybC5qcyIsImNvbXBhbnkvY29tcGFueS1yb3V0ZXIuanMiLCJmbG93dG8vZmxvdy1jdHJsLmpzIiwiZmxvd3RvL2Zsb3ctcm91dGVyLmpzIiwiaG9tZS9ob21lLWN0cmwuanMiLCJob21lL2hvbWUtZGF0YS5qcyIsImhvbWUvaG9tZS1yb3V0ZXIuanMiLCJrZi9rZi1jdHJsLmpzIiwia2Yva2Ytcm91dGVyLmpzIiwibG9naW4vbG9naW4tY3RybC5qcyIsImxvZ2luL2xvZ2luLXJvdXRlci5qcyIsInByb2R1Y3QvcHJvZHVjdC1jdHJsLmpzIiwicHJvZHVjdC9wcm9kdWN0LXJvdXRlci5qcyIsInJlZ2lzdGVyL3JlZ2lzdGVyLXJvdXRlci5qcyIsInJlZ2lzdGVyL3JlZ2lzdGVyQ3RybC5qcyIsImNvbW1vbi9kYXRhL2RhdGEuanMiLCJrZi9rZmdsL2FkZEtmLWN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xMQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhZ3JlZW1lbnQuY3RybCcsW10pXHJcbi5jb250cm9sbGVyKCdhZ3JlZW1lbnRDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhKXtcclxuXHQkc2NvcGUubGlzdCA9IERhdGEuZ2V0RGF0YSgnYWdyZWVtZW50JykubGlzdDtcclxufV0pXHJcbi5jb250cm9sbGVyKCdidXNpbmVzc0FncmVlbWVudEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3Qpe1xyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0cHJvdG9jb2xDb2RlOicnLFxyXG5cdFx0cHJvZHVjdE5hbWU6JycsXHJcblx0XHRob3NwaXRhbDonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdGZsYWc6MSxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2g9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnbWVyY2hhblByb3RMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEucHJvdG9jb2xzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlYXJjaCgkc2NvcGUuc2VhcmNoS2V5KTtcclxufV0pXHJcbi5jb250cm9sbGVyKCdhZGRBZ3JlZW1lbnRDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuYWdyZWVtZW50PXtcclxuXHRcdGJhY2tQZXJpb2RTdHlsZTonMScsXHJcblx0XHRwcm90b2NvbENvZGU6JycsXHJcblx0XHRwcm9kdWN0SWQ6JycsXHJcblx0XHR6b25lSWQ6JycsXHJcblx0XHRjaXR5SWQ6JycsXHJcblx0XHRiaWRQcmljZTonJyxcclxuXHRcdHVwTWVyY2hhbjonJyxcclxuXHRcdGxvTWVyY2hhbjonJyxcclxuXHRcdGhvc3BpdGFsSWQ6JycsXHJcblx0XHR1cEJhY2s6JycsXHJcblx0XHRsb0JhY2s6JycsXHJcblx0XHRzdGFydFRpbWU6JycsXHJcblx0XHRlbmRUaW1lOicnLFxyXG5cdFx0Y29udGFjdG9yOicnLFxyXG5cdFx0cGhvbmU6JycsXHJcblx0XHRxcTonJyxcclxuXHRcdGlzVmFsaWQ6JzEnLFxyXG5cdH07XHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblxyXG5cdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaD1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3c9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT8kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3Byb2R1Y3RMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5wZGF0YUxpc3QgPSBkYXRhLnByb2R1Y3RzLmxpc3Q7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdD1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9eC5wcm9kdWN0TmFtZSsnLycreC5wcm9kdWN0Tm9ybXMrJy8nK3gubWFudWZhY3R1cmU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnByb2R1Y3RJZD14LmlkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuIDnuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5MT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjFcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMT1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cxPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPSRzY29wZS5zZWFyY2hLZXkxLm5hbWU/JHNjb3BlLnNlYXJjaEtleTEubmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjb21wYW55TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QxID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0MT1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9eC5uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC51cE1lcmNoYW49eC5tZXJjaElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5LqM57qn5ZWG5Lia5YWs5Y+4XHJcblx0JHNjb3BlLnNlYXJjaEtleTI9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRjbGFzc1R5cGU6XCIyXCIsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHJcblx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDI9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93Mj10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT0kc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPyRzY29wZS5zZWFyY2hLZXkyLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MiA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDI9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQubG9NZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdH1cclxuXHQvL+WMu+mZou+8iOe7iOerr++8iVxyXG5cdCRzY29wZS5zZWFyY2hLZXkzPXtcclxuXHRcdGhvc3BpdGFsTmFtZTonJyxcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMz1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3czPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPyRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdob3NwTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QzID0gZGF0YS5ob3NwaXRhbHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDM9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9eC5ob3NwaXRhbE5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9eC5ob3NwaXRhbElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0fVxyXG5cdC8v6L+U5Yip5pa55byPXHJcblx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDQ9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5pc1Nob3c0PXRydWU7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmViYXRlU3R5bGUnKSxcclxuXHRcdFx0ZGF0YTp7fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDQgPSBkYXRhLnJlc3VsdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0ND1mdW5jdGlvbihiKXtcclxuXHRcdCRzY29wZS5iYWNrX3BlcmlvZF9zdHlsZT1iLmJhY2tfcGVyaW9kX25hbWUrJy8nK2IuYmFja19zdHlsZV9uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9Yi5iYWNrX2lkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0fVxyXG5cdCRzY29wZS5zYXZlPWZ1bmN0aW9uKCl7XHJcblx0XHRpZigkc2NvcGUuc3RhcnRUaW1lKXtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zdGFydFRpbWU9JHNjb3BlLnN0YXJ0VGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHRpZigkc2NvcGUuZW5kVGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuZW5kVGltZT0kc2NvcGUuZW5kVGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT0kc2NvcGUuYmFja1BlcmlvZFN0eWxlLmJhY2tfaWQ7XHJcblx0XHRjb25zb2xlLmxvZygkc2NvcGUpXHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZE1lcmNoYW5Qcm90JyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmFncmVlbWVudCl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50Jyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0ZG9jdW1lbnQub25jbGljaz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufV0pXHJcbi5jb250cm9sbGVyKCdlZGl0QWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JywnJHN0YXRlUGFyYW1zJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCwkc3RhdGVQYXJhbXMpe1xyXG5cdCRzY29wZS5nZXREZXRhaWw9ZnVuY3Rpb24oeCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2J1c2luZXNzQWdyZWVtZW50JykreCxcclxuXHRcdFx0Ly8gZGF0YTp7aWQ6fSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb3RvY29sSWQ9ZGF0YS5wcm90b2NvbC5wcm90b2NvbElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT1kYXRhLnByb3RvY29sLmJhY2tQZXJpb2RTdHlsZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5wcm90b2NvbENvZGU9ZGF0YS5wcm90b2NvbC5wcm90b2NvbENvZGU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPWRhdGEucHJvdG9jb2wucHJvZHVjdElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnpvbmVJZD1kYXRhLnByb3RvY29sLnpvbmVJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5jaXR5SWQ9ZGF0YS5wcm90b2NvbC5jaXR5SWQ7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuYmlkUHJpY2U9ZGF0YS5wcm90b2NvbC5iaWRQcmljZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC51cE1lcmNoYW49ZGF0YS5wcm90b2NvbC51cE1lcmNoYW47XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQubG9NZXJjaGFuPWRhdGEucHJvdG9jb2wubG9NZXJjaGFuO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9ZGF0YS5wcm90b2NvbC5ob3NwaXRhbElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnVwQmFjaz1kYXRhLnByb3RvY29sLnVwQmFjaztcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5sb0JhY2s9ZGF0YS5wcm90b2NvbC5sb0JhY2s7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPWRhdGEucHJvdG9jb2wuc3RhcnRUaW1lO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmVuZFRpbWU9ZGF0YS5wcm90b2NvbC5lbmRUaW1lO1xyXG5cdFx0XHQkc2NvcGUuc3RhcnRUaW1lPW5ldyBEYXRlKE51bWJlcihkYXRhLnByb3RvY29sLnN0YXJ0VGltZSkpO1xyXG5cdFx0XHQkc2NvcGUuZW5kVGltZT1uZXcgRGF0ZShOdW1iZXIoZGF0YS5wcm90b2NvbC5lbmRUaW1lKSk7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuY29udGFjdG9yPWRhdGEucHJvdG9jb2wuY29udGFjdG9yO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnBob25lPWRhdGEucHJvdG9jb2wucGhvbmU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQucXE9ZGF0YS5wcm90b2NvbC5xcTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5pc1ZhbGlkPWRhdGEucHJvdG9jb2wuaXNWYWxpZDtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPWRhdGEucHJvdG9jb2wuaG9zcGl0YWwuaG9zcGl0YWxOYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPWRhdGEucHJvdG9jb2wubG9NZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPWRhdGEucHJvdG9jb2wudXBNZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPWRhdGEucHJvdG9jb2wucHJvZHVjdC5wcm9kdWN0TmFtZSsnLycrZGF0YS5wcm90b2NvbC5wcm9kdWN0LnByb2R1Y3ROb3JtcysnLycrZGF0YS5wcm90b2NvbC5wcm9kdWN0Lm1hbnVmYWN0dXJlO1xyXG5cdFx0XHQkc2NvcGUuYmFja19wZXJpb2Rfc3R5bGU9ZGF0YS5wcm90b2NvbC5iYWNrUGVyaW9kU3R5bGVNYXAuYmFja19wZXJpb2RfbmFtZSsnLycrZGF0YS5wcm90b2NvbC5iYWNrUGVyaW9kU3R5bGVNYXAuYmFja19zdHlsZV9uYW1lO1xyXG5cdFx0XHRjb25zb2xlLmxvZygkc2NvcGUpXHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuYWdyZWVtZW50PXtcclxuXHRcdHByb3RvY29sSWQ6JycsXHJcblx0XHRiYWNrUGVyaW9kU3R5bGU6JzEnLFxyXG5cdFx0cHJvdG9jb2xDb2RlOicnLFxyXG5cdFx0cHJvZHVjdElkOicnLFxyXG5cdFx0em9uZUlkOicnLFxyXG5cdFx0Y2l0eUlkOicnLFxyXG5cdFx0YmlkUHJpY2U6JycsXHJcblx0XHR1cE1lcmNoYW46JycsXHJcblx0XHRsb01lcmNoYW46JycsXHJcblx0XHRob3NwaXRhbElkOicnLFxyXG5cdFx0dXBCYWNrOicnLFxyXG5cdFx0bG9CYWNrOicnLFxyXG5cdFx0c3RhcnRUaW1lOicnLFxyXG5cdFx0ZW5kVGltZTonJyxcclxuXHRcdGNvbnRhY3RvcjonJyxcclxuXHRcdHBob25lOicnLFxyXG5cdFx0cXE6JycsXHJcblx0XHRpc1ZhbGlkOicxJyxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0cHJvZHVjdE5hbWU6JycsXHJcblx0XHRwcm9kdWN0Tm9ybXM6JycsXHJcblx0XHRtYW51ZmFjdHVyZTonJyxcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cdC8v5LiA57qn5ZWG5Lia5YWs5Y+4XHJcblx0JHNjb3BlLnNlYXJjaEtleTE9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRjbGFzc1R5cGU6XCIxXCIsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHQvL+S6jOe6p+WVhuS4muWFrOWPuFxyXG5cdCRzY29wZS5zZWFyY2hLZXkyPXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOlwiMlwiLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0Ly/ljLvpmaLvvIjnu4jnq6/vvIlcclxuXHQkc2NvcGUuc2VhcmNoS2V5Mz17XHJcblx0XHRob3NwaXRhbE5hbWU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMub2JqKVxyXG5cdGlmKCRzdGF0ZVBhcmFtcy5vYmope1xyXG5cdFx0JHNjb3BlLmdldERldGFpbCgkc3RhdGVQYXJhbXMub2JqLnByb3RvY29sSWQpO1xyXG5cclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucHJvdG9jb2xJZD0kc3RhdGVQYXJhbXMub2JqLnByb3RvY29sSWQ7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT0kc3RhdGVQYXJhbXMub2JqLmJhY2tQZXJpb2RTdHlsZTtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucHJvdG9jb2xDb2RlPSRzdGF0ZVBhcmFtcy5vYmoucHJvdG9jb2xDb2RlO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5wcm9kdWN0SWQ9JHN0YXRlUGFyYW1zLm9iai5wcm9kdWN0SWQ7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LnpvbmVJZD0kc3RhdGVQYXJhbXMub2JqLnpvbmVJZDtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQuY2l0eUlkPSRzdGF0ZVBhcmFtcy5vYmouY2l0eUlkO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5iaWRQcmljZT0kc3RhdGVQYXJhbXMub2JqLmJpZFByaWNlO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC51cE1lcmNoYW49JHN0YXRlUGFyYW1zLm9iai51cE1lcmNoYW47XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmxvTWVyY2hhbj0kc3RhdGVQYXJhbXMub2JqLmxvTWVyY2hhbjtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQuaG9zcGl0YWxJZD0kc3RhdGVQYXJhbXMub2JqLmhvc3BpdGFsSWQ7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LnVwQmFjaz0kc3RhdGVQYXJhbXMub2JqLnVwQmFjaztcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQubG9CYWNrPSRzdGF0ZVBhcmFtcy5vYmoubG9CYWNrO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5zdGFydFRpbWU9bmV3IERhdGUoJHN0YXRlUGFyYW1zLm9iai5zdGFydFRpbWUpO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5lbmRUaW1lPW5ldyBEYXRlKCRzdGF0ZVBhcmFtcy5vYmouZW5kVGltZSk7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmNvbnRhY3Rvcj0kc3RhdGVQYXJhbXMub2JqLmNvbnRhY3RvcjtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucGhvbmU9JHN0YXRlUGFyYW1zLm9iai5waG9uZTtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucXE9JHN0YXRlUGFyYW1zLm9iai5xcTtcclxuXHRcdC8vIC8vICRzY29wZS5hZ3JlZW1lbnQuaXNWYWxpZD1TdHJpbmcoJHN0YXRlUGFyYW1zLm9iai5pc1ZhbGlkKTtcclxuXHRcdC8vICRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT0kc3RhdGVQYXJhbXMub2JqLmhvc3BpdGFsLmhvc3BpdGFsTmFtZTtcclxuXHRcdC8vICRzY29wZS5zZWFyY2hLZXkyLm5hbWU9JHN0YXRlUGFyYW1zLm9iai5sb01lcmNoYW5JbmZvLm5hbWU7XHJcblx0XHQvLyAkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPSRzdGF0ZVBhcmFtcy5vYmoudXBNZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0Ly8gJHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT0kc3RhdGVQYXJhbXMub2JqLnByb2R1Y3QucHJvZHVjdE5hbWU7XHJcblx0XHQvLyAkc2NvcGUuYmFja1BlcmlvZFN0eWxlPSRzdGF0ZVBhcmFtcy5vYmoucHJvZHVjdC5wcm9kdWN0TmFtZTtcclxuXHJcblx0fVxyXG5cclxuXHJcblx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdz10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT0kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPyRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncHJvZHVjdExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLnBkYXRhTGlzdCA9IGRhdGEucHJvZHVjdHMubGlzdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0PWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT14LnByb2R1Y3ROYW1lKycvJyt4LnByb2R1Y3ROb3JtcysnLycreC5tYW51ZmFjdHVyZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPXguaWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdH1cclxuXHQvL+S4gOe6p+WVhuS4muWFrOWPuFxyXG5cclxuXHJcblx0JHNjb3BlLmlzU2hvdzE9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDE9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93MT10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT0kc2NvcGUuc2VhcmNoS2V5MS5uYW1lPyRzY29wZS5zZWFyY2hLZXkxLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MSA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDE9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQudXBNZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdH1cclxuXHQvL+S6jOe6p+WVhuS4muWFrOWPuFxyXG5cclxuXHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMj1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cyPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPSRzY29wZS5zZWFyY2hLZXkyLm5hbWU/JHNjb3BlLnNlYXJjaEtleTIubmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjb21wYW55TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QyID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0Mj1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkyLm5hbWU9eC5uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5sb01lcmNoYW49eC5tZXJjaElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5Yy76Zmi77yI57uI56uv77yJXHJcblxyXG5cdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gzPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT0kc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU/JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2hvc3BMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDMgPSBkYXRhLmhvc3BpdGFscztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0Mz1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT14Lmhvc3BpdGFsTmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuaG9zcGl0YWxJZD14Lmhvc3BpdGFsSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHR9XHJcblx0Ly/ov5TliKnmlrnlvI9cclxuXHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoND1mdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9dHJ1ZTtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdyZWJhdGVTdHlsZScpLFxyXG5cdFx0XHRkYXRhOnt9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0NCA9IGRhdGEucmVzdWx0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3Q0PWZ1bmN0aW9uKGIpe1xyXG5cdFx0JHNjb3BlLmJhY2tfcGVyaW9kX3N0eWxlPWIuYmFja19wZXJpb2RfbmFtZSsnLycrYi5iYWNrX3N0eWxlX25hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT1iLmJhY2tfaWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHR9XHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5zdGFydFRpbWUpe1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnN0YXJ0VGltZT0kc2NvcGUuc3RhcnRUaW1lLmdldFRpbWUoKTtcclxuXHRcdH1cclxuXHRcdGlmKCRzY29wZS5lbmRUaW1lKXtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5lbmRUaW1lPSRzY29wZS5lbmRUaW1lLmdldFRpbWUoKTtcclxuXHRcdH1cclxuXHRcdGNvbnNvbGUubG9nKCRzY29wZSlcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZWRpdE1lcmNoYW5Qcm90JyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmFncmVlbWVudCl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50Jyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0ZG9jdW1lbnQub25jbGljaz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2d1ZXN0QWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCl7XHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRjdXN0b21lck5hbWU6JycsXHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdGhvc3BpdGFsOicnLFxyXG5cdFx0ZmxhZzoxLFxyXG5cdH07XHJcblx0JHNjb3BlLnNlYXJjaD1mdW5jdGlvbihkYXRhKXtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdwcm90b2NvbExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0ZGF0YS5wcm90b2NvbHMubWFwKGZ1bmN0aW9uKHYpe1xyXG5cdFx0XHRcdFx0XHR2LnZhbGlkRGF0ZT1uZXcgRGF0ZShOdW1iZXIodi5zdGFydFRpbWUpKS50b0xvY2FsZURhdGVTdHJpbmcoKSsnLS0nK25ldyBEYXRlKE51bWJlcih2LmVuZFRpbWUpKS50b0xvY2FsZURhdGVTdHJpbmcoKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHY7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5wcm90b2NvbHM7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygkc2NvcGUuZGF0YUxpc3QpO1xyXG5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWFyY2goJHNjb3BlLnNlYXJjaEtleSk7XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRkR3Vlc3RBZ3JlZW1lbnRDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuYWdyZWVtZW50PXtcclxuXHRcdHByb3RvY29sQ29kZTonJyxcclxuXHRcdHByb2R1Y3RJZDonJyxcclxuXHRcdHpvbmVJZDonJyxcclxuXHRcdGNpdHlJZDonJyxcclxuXHRcdHVwcGVyTWVyY2hhbjonJyxcclxuXHRcdGxvd2VyTWVyY2hhbjonJyxcclxuXHRcdGhvc3BpdGFsSWQ6JycsXHJcblx0XHRwcm9tb3Rpb25FeHBlbnNlOicnLFxyXG5cdFx0YmFpbDonJyxcclxuXHRcdGJhaWxEZXNjOicnLFxyXG5cdFx0c3RhcnRUaW1lOicnLFxyXG5cdFx0ZW5kVGltZTonJyxcclxuXHRcdGlzVmFsaWQ6JzEnLFxyXG5cdFx0dHlwZTonMScsXHJcblx0XHRpc0hvbm91cjonMScsXHJcblx0XHRzd2l0Y2hTdGFuZGFyZDonMCcsXHJcblx0XHRzd2l0Y2hBbW91bnQ6JycsXHJcblx0XHRzd2l0Y2hFeHBlbnNlOicnLFxyXG5cdFx0cmViYXRlUGVyaW9kOicxJyxcclxuXHRcdHJlYmF0ZVBheWVyOicxJyxcclxuXHRcdHJlYmF0ZTonJyxcclxuXHRcdGN1c3RvbWVySWQ6JzEnLFxyXG5cdH07XHJcblx0JHNjb3BlLnNlYXJjaEtleTA9e1xyXG5cdFx0Y3VzdG9tZXJOYW1lOicnLFxyXG5cdFx0cGhvbmU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHJcblx0JHNjb3BlLmlzU2hvdzA9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDA9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93MD10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lPSRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZT8kc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY3VzdG9tZXJMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDAgPSBkYXRhLmN1c3RvbWVycy5saXN0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QwPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lPXguY3VzdG9tZXJOYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5jdXN0b21lcklkPXguY3VzdG9tZXJJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cwPWZhbHNlO1xyXG5cdH1cclxuXHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdz10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT0kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPyRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncHJvZHVjdExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLnBkYXRhTGlzdCA9IGRhdGEucHJvZHVjdHMubGlzdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0PWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT14LnByb2R1Y3ROYW1lKycvJyt4LnByb2R1Y3ROb3JtcysnLycreC5tYW51ZmFjdHVyZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPXguaWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdH1cclxuXHQvL+S4gOe6p+WVhuS4muWFrOWPuFxyXG5cdCRzY29wZS5zZWFyY2hLZXkxPXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOlwiMVwiLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblxyXG5cdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gxPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9JHNjb3BlLnNlYXJjaEtleTEubmFtZT8kc2NvcGUuc2VhcmNoS2V5MS5uYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDEgPSBkYXRhLm1lcmNoYW5zO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QxPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT14Lm5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnVwcGVyTWVyY2hhbj14Lm1lcmNoSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuoznuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5Mj17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjJcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMj1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cyPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPSRzY29wZS5zZWFyY2hLZXkyLm5hbWU/JHNjb3BlLnNlYXJjaEtleTIubmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjb21wYW55TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QyID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0Mj1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkyLm5hbWU9eC5uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5sb3dlck1lcmNoYW49eC5tZXJjaElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5Yy76Zmi77yI57uI56uv77yJXHJcblx0JHNjb3BlLnNlYXJjaEtleTM9e1xyXG5cdFx0aG9zcGl0YWxOYW1lOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblxyXG5cdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gzPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT0kc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU/JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2hvc3BMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDMgPSBkYXRhLmhvc3BpdGFscztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0Mz1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT14Lmhvc3BpdGFsTmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuaG9zcGl0YWxJZD14Lmhvc3BpdGFsSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHR9XHJcblx0Ly/ov5TliKnmlrnlvI9cclxuXHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoND1mdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9dHJ1ZTtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdyZWJhdGVTdHlsZScpLFxyXG5cdFx0XHRkYXRhOnt9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0NCA9IGRhdGEucmVzdWx0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3Q0PWZ1bmN0aW9uKGIpe1xyXG5cdFx0JHNjb3BlLmJhY2tfcGVyaW9kX3N0eWxlPWIuYmFja19wZXJpb2RfbmFtZSsnLycrYi5iYWNrX3N0eWxlX25hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9Yi5ob3NwaXRhbElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0fVxyXG5cdCRzY29wZS5zYXZlPWZ1bmN0aW9uKCl7XHJcblx0XHRpZigkc2NvcGUuc3RhcnRUaW1lKXtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zdGFydFRpbWU9JHNjb3BlLnN0YXJ0VGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHRpZigkc2NvcGUuZW5kVGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuZW5kVGltZT0kc2NvcGUuZW5kVGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmJhY2tQZXJpb2RTdHlsZT0kc2NvcGUuYmFja1BlcmlvZFN0eWxlLmJhY2tfaWQ7XHJcblx0XHRjb25zb2xlLmxvZygkc2NvcGUpXHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZHByb3RvY29sJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmFncmVlbWVudCl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50Lmd1ZXN0QWdyZWVtZW50Jyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0ZG9jdW1lbnQub25jbGljaz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cwPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn1dKVxyXG4uY29udHJvbGxlcignZWRpdEd1ZXN0QWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JywnJHN0YXRlUGFyYW1zJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCwkc3RhdGVQYXJhbXMpe1xyXG5cdCRzY29wZS5hZ3JlZW1lbnQ9e1xyXG5cdFx0cHJvdG9jb2xDb2RlOicnLFxyXG5cdFx0cHJvZHVjdElkOicnLFxyXG5cdFx0em9uZUlkOicnLFxyXG5cdFx0Y2l0eUlkOicnLFxyXG5cdFx0dXBwZXJNZXJjaGFuOicnLFxyXG5cdFx0bG93ZXJNZXJjaGFuOicnLFxyXG5cdFx0aG9zcGl0YWxJZDonJyxcclxuXHRcdHByb21vdGlvbkV4cGVuc2U6JycsXHJcblx0XHRiYWlsOicnLFxyXG5cdFx0YmFpbERlc2M6JycsXHJcblx0XHRzdGFydFRpbWU6JycsXHJcblx0XHRlbmRUaW1lOicnLFxyXG5cdFx0aXNWYWxpZDonMScsXHJcblx0XHR0eXBlOicxJyxcclxuXHRcdGlzSG9ub3VyOicxJyxcclxuXHRcdHN3aXRjaFN0YW5kYXJkOicwJyxcclxuXHRcdHN3aXRjaEFtb3VudDonJyxcclxuXHRcdHN3aXRjaEV4cGVuc2U6JycsXHJcblx0XHRyZWJhdGVQZXJpb2Q6JzEnLFxyXG5cdFx0cmViYXRlUGF5ZXI6JzEnLFxyXG5cdFx0cmViYXRlOicnLFxyXG5cdFx0Y3VzdG9tZXJJZDonMScsXHJcblx0fTtcclxuXHQkc2NvcGUucmViYXRlUGVyaW9kTGlzdD1bXHJcblx0XHR7dmFsdWU6XCIxXCIsbmFtZTpcIuaciOe7k1wifSxcclxuICAgICAgICB7dmFsdWU6XCIyXCIsbmFtZTpcIuWOi+aJueWOi+aciFwifSxcclxuICAgICAgICB7dmFsdWU6XCIzXCIsbmFtZTpcIjYw5aSpXCJ9LFxyXG4gICAgICAgIHt2YWx1ZTpcIjRcIixuYW1lOlwiOTDlpKlcIn0sXHJcbiAgICAgICAge3ZhbHVlOlwiNVwiLG5hbWU6XCIxMjDlpKlcIn1cclxuXHRdO1xyXG5cdCRzY29wZS5nZXREZXRhaWw9ZnVuY3Rpb24oeCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2d1ZXN0QWdyZWVtZW50JykreCxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb3RvY29sSWQ9ZGF0YS5wcm90b2NvbC5wcm90b2NvbElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb3RvY29sQ29kZT1kYXRhLnByb3RvY29sLnByb3RvY29sQ29kZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5wcm9kdWN0SWQ9ZGF0YS5wcm90b2NvbC5wcm9kdWN0SWQ7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuem9uZUlkPWRhdGEucHJvdG9jb2wuem9uZUlkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmNpdHlJZD1kYXRhLnByb3RvY29sLmNpdHlJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC51cHBlck1lcmNoYW49ZGF0YS5wcm90b2NvbC51cHBlck1lcmNoYW47XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQubG93ZXJNZXJjaGFuPWRhdGEucHJvdG9jb2wubG93ZXJNZXJjaGFuO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9ZGF0YS5wcm90b2NvbC5ob3NwaXRhbElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb21vdGlvbkV4cGVuc2U9ZGF0YS5wcm90b2NvbC5wcm9tb3Rpb25FeHBlbnNlO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmJhaWw9ZGF0YS5wcm90b2NvbC5iYWlsO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmJhaWxEZXNjPWRhdGEucHJvdG9jb2wuYmFpbERlc2M7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPWRhdGEucHJvdG9jb2wuc3RhcnRUaW1lO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmVuZFRpbWU9ZGF0YS5wcm90b2NvbC5lbmRUaW1lO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmlzVmFsaWQ9ZGF0YS5wcm90b2NvbC5pc1ZhbGlkO1xyXG5cdFx0XHQkc2NvcGUuc3RhcnRUaW1lPW5ldyBEYXRlKE51bWJlcihkYXRhLnByb3RvY29sLnN0YXJ0VGltZSkpO1xyXG5cdFx0XHQkc2NvcGUuZW5kVGltZT1uZXcgRGF0ZShOdW1iZXIoZGF0YS5wcm90b2NvbC5lbmRUaW1lKSk7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQudHlwZT1kYXRhLnByb3RvY29sLnR5cGU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuaXNIb25vdXI9ZGF0YS5wcm90b2NvbC5pc0hvbm91cjtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zd2l0Y2hTdGFuZGFyZD1kYXRhLnByb3RvY29sLnN3aXRjaFN0YW5kYXJkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnN3aXRjaEFtb3VudD1kYXRhLnByb3RvY29sLnN3aXRjaEFtb3VudDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zd2l0Y2hFeHBlbnNlPWRhdGEucHJvdG9jb2wuc3dpdGNoRXhwZW5zZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5yZWJhdGVQZXJpb2Q9U3RyaW5nKGRhdGEucHJvdG9jb2wucmViYXRlUGVyaW9kKTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5yZWJhdGVQYXllcj1kYXRhLnByb3RvY29sLnJlYmF0ZVBheWVyO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnJlYmF0ZT1kYXRhLnByb3RvY29sLnJlYmF0ZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5jdXN0b21lcklkPWRhdGEucHJvdG9jb2wuY3VzdG9tZXJJZDtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPWRhdGEucHJvdG9jb2wuaG9zcGl0YWwuaG9zcGl0YWxOYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPWRhdGEucHJvdG9jb2wubG93ZXJNZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPWRhdGEucHJvdG9jb2wudXBwZXJNZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU9ZGF0YS5wcm90b2NvbC5jdXN0b21lci5jdXN0b21lck5hbWU7XHJcblx0XHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9ZGF0YS5wcm90b2NvbC5wcm9kdWN0LnByb2R1Y3ROYW1lKycvJytkYXRhLnByb3RvY29sLnByb2R1Y3QucHJvZHVjdE5vcm1zKycvJytkYXRhLnByb3RvY29sLnByb2R1Y3QubWFudWZhY3R1cmU7XHJcblx0XHRcdGNvbnNvbGUubG9nKCRzY29wZS5hZ3JlZW1lbnQucmViYXRlUGVyaW9kKVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlYXJjaEtleTA9e1xyXG5cdFx0Y3VzdG9tZXJOYW1lOicnLFxyXG5cdFx0cGhvbmU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHQkc2NvcGUuc2VhcmNoS2V5PXtcclxuXHRcdHByb2R1Y3ROYW1lOicnLFxyXG5cdFx0cHJvZHVjdE5vcm1zOicnLFxyXG5cdFx0bWFudWZhY3R1cmU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHQvL+S4gOe6p+WVhuS4muWFrOWPuFxyXG5cdCRzY29wZS5zZWFyY2hLZXkxPXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOlwiMVwiLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0Ly/kuoznuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5Mj17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjJcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cdC8v5Yy76Zmi77yI57uI56uv77yJXHJcblx0JHNjb3BlLnNlYXJjaEtleTM9e1xyXG5cdFx0aG9zcGl0YWxOYW1lOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0aWYoJHN0YXRlUGFyYW1zLm9iail7XHJcblx0XHQkc2NvcGUuZ2V0RGV0YWlsKCRzdGF0ZVBhcmFtcy5vYmoucHJvdG9jb2xJZCk7XHJcblx0fVxyXG5cdCRzY29wZS5pc1Nob3cwPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gwPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzA9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZT0kc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU/JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2N1c3RvbWVyTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QwID0gZGF0YS5jdXN0b21lcnMubGlzdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0MD1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZT14LmN1c3RvbWVyTmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuY3VzdG9tZXJJZD14LmN1c3RvbWVySWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93MD1mYWxzZTtcclxuXHR9XHJcblxyXG5cclxuXHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2g9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93PXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPSRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU/JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdwcm9kdWN0TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUucGRhdGFMaXN0ID0gZGF0YS5wcm9kdWN0cy5saXN0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3Q9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPXgucHJvZHVjdE5hbWUrJy8nK3gucHJvZHVjdE5vcm1zKycvJyt4Lm1hbnVmYWN0dXJlO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5wcm9kdWN0SWQ9eC5pZDtcclxuXHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5LiA57qn5ZWG5Lia5YWs5Y+4XHJcblxyXG5cdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gxPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9JHNjb3BlLnNlYXJjaEtleTEubmFtZT8kc2NvcGUuc2VhcmNoS2V5MS5uYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDEgPSBkYXRhLm1lcmNoYW5zO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QxPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT14Lm5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnVwcGVyTWVyY2hhbj14Lm1lcmNoSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuoznuqfllYbkuJrlhazlj7hcclxuXHJcblx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDI9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93Mj10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT0kc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPyRzY29wZS5zZWFyY2hLZXkyLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MiA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDI9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQubG93ZXJNZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdH1cclxuXHQvL+WMu+mZou+8iOe7iOerr++8iVxyXG5cclxuXHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMz1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3czPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPyRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdob3NwTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QzID0gZGF0YS5ob3NwaXRhbHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDM9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9eC5ob3NwaXRhbE5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9eC5ob3NwaXRhbElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0fVxyXG5cdC8v6L+U5Yip5pa55byPXHJcblx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDQ9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5pc1Nob3c0PXRydWU7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmViYXRlU3R5bGUnKSxcclxuXHRcdFx0ZGF0YTp7fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDQgPSBkYXRhLnJlc3VsdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0ND1mdW5jdGlvbihiKXtcclxuXHRcdCRzY29wZS5iYWNrX3BlcmlvZF9zdHlsZT1iLmJhY2tfcGVyaW9kX25hbWUrJy8nK2IuYmFja19zdHlsZV9uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5ob3NwaXRhbElkPWIuaG9zcGl0YWxJZDtcclxuXHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdH1cclxuXHQkc2NvcGUuc2F2ZT1mdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLnN0YXJ0VGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPSRzY29wZS5zdGFydFRpbWUuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoJHNjb3BlLmVuZFRpbWUpe1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmVuZFRpbWU9JHNjb3BlLmVuZFRpbWUuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9JHNjb3BlLmJhY2tQZXJpb2RTdHlsZS5iYWNrX2lkO1xyXG5cdFx0Y29uc29sZS5sb2coJHNjb3BlKVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdlZGl0cHJvdG9jb2wnKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUuYWdyZWVtZW50KX0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5hZ3JlZW1lbnQuZ3Vlc3RBZ3JlZW1lbnQnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHRkb2N1bWVudC5vbmNsaWNrPWZ1bmN0aW9uKCl7XHJcblx0XHQkdGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzA9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2FncmVlbWVudC5yb3V0ZXInLFsnYWdyZWVtZW50LmN0cmwnXSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJyxmdW5jdGlvbigkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudCcse1xyXG5cdFx0dXJsOicvYWdyZWVtZW50JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvYWdyZWVtZW50L2FncmVlbWVudC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FncmVlbWVudEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50Jyx7XHJcblx0XHR1cmw6Jy9idXNpbmVzc0FncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9idXNpbmVzc0FncmVlbWVudC9idXNpbmVzc0FncmVlbWVudC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2J1c2luZXNzQWdyZWVtZW50Q3RybCcsXHJcblx0XHRwYXJhbXM6e1xyXG5cdFx0XHRvYmo6bnVsbFxyXG5cdFx0fVxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5hZGRBZ3JlZW1lbnQnLHtcclxuXHRcdHVybDonL2FkZEFncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9idXNpbmVzc0FncmVlbWVudC9hZGRBZ3JlZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidhZGRBZ3JlZW1lbnRDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5lZGl0QWdyZWVtZW50Jyx7XHJcblx0XHR1cmw6Jy9lZGl0YWdyZWVtZW50JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvYWdyZWVtZW50L2J1c2luZXNzQWdyZWVtZW50L2FncmVlbWVudEVkaXQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidlZGl0QWdyZWVtZW50Q3RybCcsXHJcblx0XHRwYXJhbXM6IHtcclxuXHQgICAgICAgIG9iajogbnVsbCBcclxuXHQgICAgfVxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5ndWVzdEFncmVlbWVudCcse1xyXG5cdFx0dXJsOicvZ3Vlc3RBZ3JlZW1lbnQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9hZ3JlZW1lbnQvZ3Vlc3RBZ3JlZW1lbnQvZ3Vlc3RBZ3JlZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidndWVzdEFncmVlbWVudEN0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5hZ3JlZW1lbnQuYWRkR3Vlc3RBZ3JlZW1lbnQnLHtcclxuXHRcdHVybDonL2FkZEd1ZXN0QWdyZWVtZW50JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvYWdyZWVtZW50L2d1ZXN0QWdyZWVtZW50L2FkZEd1ZXN0QWdyZWVtZW50Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRkR3Vlc3RBZ3JlZW1lbnRDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5lZGl0R3Vlc3RBZ3JlZW1lbnQnLHtcclxuXHRcdHVybDonL2VkaXRHdWVzdEFncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9ndWVzdEFncmVlbWVudC9lZGl0R3Vlc3RBZ3JlZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidlZGl0R3Vlc3RBZ3JlZW1lbnRDdHJsJyxcclxuXHRcdHBhcmFtczoge1xyXG5cdCAgICAgICAgb2JqOiBudWxsIFxyXG5cdCAgICB9XHJcblx0fSlcclxuXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKFwiYXBwXCIsW1widWkucm91dGVyXCIsJ3JvdXRlcicsJ3B1YnVsaWMnLCd0bS5wYWdpbmF0aW9uJ10pXHJcbi8vIC5kaXJlY3RpdmUoJ2RpYWxvZycsZnVuY3Rpb24oKXtcclxuLy8gXHRyZXR1cm4ge1xyXG4vLyBcdFx0cmVzdHJpY3Q6J0VBQycsXHJcbi8vIFx0XHR0ZW1wbGF0ZVVybDondmlld3MvY29tbW9uL21vZGFsLmh0bWwnXHJcbi8vIFx0fVxyXG4vLyB9KVxyXG4vLyAuZGlyZWN0aXZlKCd0aXBhbGVydCcsZnVuY3Rpb24oKXtcclxuLy8gXHRyZXR1cm4ge1xyXG4vLyBcdFx0cmVzdHJpY3Q6J0VBQycsXHJcbi8vIFx0XHRyZXBsYWNlOnRydWUsXHJcbi8vIFx0XHR0ZW1wbGF0ZTpcIjxkaXYgY2xhc3M9J3RpcC1hbGVydCcgbmctc2hvdz0ndGlwX2FsZXJ0X3Nob3cnPlwiK1xyXG4vLyBcdFx0XHRcIjxkaXYgY2xhc3M9J3RpcC1jb3Zlcic+PC9kaXY+XCIrXHJcbi8vIFx0XHRcdFwiPHNwYW4gbmctYmluZD0ndGlwX2FsZXJ0X21zZycgbmctPjwvc3Bhbj5cIitcclxuLy8gXHRcdFwiPC9kaXY+XCIsXHJcbi8vIFx0XHRsaW5rOmZ1bmN0aW9uKHNjb3BlLGVsZW1lbnQsYXR0cnMpe1xyXG4vLyBcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz1mYWxzZTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcbi8vIH0pXHJcbi8vIC5kaXJlY3RpdmUoJ3RpcExvZycsWyckcm9vdFNjb3BlJywnJHRpbWVvdXQnLGZ1bmN0aW9uKCRyb290U2NvcGUsJHRpbWVvdXQpe1xyXG4vLyBcdHJldHVybiB7XHJcbi8vIFx0XHRyZXN0cmljdDonRUFDJyxcclxuLy8gXHRcdHJlcGxhY2U6dHJ1ZSxcclxuLy8gXHRcdHRlbXBsYXRlOlwiPGRpdiBjbGFzcz0ndGlwLWFsZXJ0JyBuZy1zaG93PSd0aXBfYWxlcnRfc2hvdyc+XCIrXHJcbi8vIFx0XHRcdFwiPGRpdiBjbGFzcz0ndGlwLWNvdmVyJz48L2Rpdj5cIitcclxuLy8gXHRcdFx0XCI8c3BhbiBuZy1iaW5kPSd0aXBfYWxlcnRfbXNnJyBuZy0+PC9zcGFuPlwiK1xyXG4vLyBcdFx0XCI8L2Rpdj5cIixcclxuLy8gXHRcdGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbWVudCxhdHRycyl7XHJcbi8vIFx0XHRcdHNjb3BlLnRpcF9hbGVydF9zaG93PWZhbHNlO1xyXG4vLyBcdFx0XHQkcm9vdFNjb3BlLiRvbigndGlwbG9nJyxmdW5jdGlvbihlLGRhdGEpe1xyXG4vLyBcdFx0XHRcdGlmKGRhdGEmJnR5cGVvZiBkYXRhID09IFwic3RyaW5nXCIpe1xyXG4vLyBcdFx0XHRcdFx0c2NvcGUudGlwX2FsZXJ0X3Nob3cgPSB0cnVlO1xyXG4vLyBcdFx0XHRcdFx0c2NvcGUudGlwX2FsZXJ0X21zZyA9IGRhdGE7XHJcbi8vIFx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz1mYWxzZTtcclxuLy8gXHRcdFx0XHRcdH0sMjAwMClcclxuLy8gXHRcdFx0XHR9XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG4vLyB9XSlcclxuLy8gLmRpcmVjdGl2ZSgnZGlhbG9nJyxmdW5jdGlvbigpe1xyXG4vLyBcdHJldHVybiB7XHJcbi8vIFx0XHRyZXN0cmljdDonRUFDJyxcclxuLy8gXHRcdHRlbXBsYXRlVXJsOidzcmMvZGlzdC92aWV3cy9jb21tb24vbW9kYWwuaHRtbCdcclxuLy8gXHR9XHJcbi8vIH0pXHJcbi5kaXJlY3RpdmUoJ3RpcGFsZXJ0JyxmdW5jdGlvbigpe1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDonRUFDJyxcclxuXHRcdHJlcGxhY2U6dHJ1ZSxcclxuXHRcdHRlbXBsYXRlOlwiPGRpdiBjbGFzcz0ndGlwLWFsZXJ0JyBuZy1jbGFzcz0ndGlwX2FsZXJ0X3R5cGUnIG5nLXNob3c9J3RpcF9hbGVydF9zaG93Jz5cIitcclxuXHRcdFx0XCI8c3BhbiBuZy1iaW5kPSd0aXBfYWxlcnRfbXNnLnR4dCcgbmctY2xpY2s9J2Nsb3NlQWxlcnQoKSc+PC9zcGFuPlwiK1xyXG5cdFx0XHRcIjxpPjwvaT5cIitcclxuXHRcdFx0XCI8L2Rpdj5cIixcclxuXHRcdGxpbms6ZnVuY3Rpb24oc2NvcGUsZWxlbWVudCxhdHRycyl7XHJcblx0XHRcdHNjb3BlLmNsb3NlQWxlcnQ9ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdyA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4uZGlyZWN0aXZlKFwiYWxlcnRNb2RhbFwiLGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OidFQUMnLFxyXG5cdFx0cmVwbGFjZTp0cnVlLFxyXG5cdFx0dGVtcGxhdGVVcmw6XCJ5a2ZfdHBsX2FsZXJ0X21vZGFsXCIsXHJcblx0XHRsaW5rOmZ1bmN0aW9uKHNjb3BlKXtcclxuXHRcdFx0c2NvcGUueWtmX2FsZXJ0X3Nob3cgPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcbn0pXHJcbi5kaXJlY3RpdmUoJ2NpdHlzJyxbJ0h0dHAnLCdVcmwnLGZ1bmN0aW9uKEh0dHAsVXJsKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6J0VBQycsXHJcblx0XHR0ZW1wbGF0ZVVybDonY2l0eXMnLFxyXG5cdFx0c2NvcGU6e1xyXG5cdFx0XHRhcmVhOic9bXlBcmVhJyxcclxuXHRcdFx0Y2l0eTonPW15Q2l0eSdcclxuXHRcdH0sXHJcblx0XHRsaW5rOmZ1bmN0aW9uKHNjb3BlLGVsZSxhdHRycyl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGF0dHJzKTtcclxuXHRcdFx0c2NvcGUuJHdhdGNoKCdhcmVhJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdEh0dHAuZ2V0KHtcclxuXHRcdFx0XHRcdHVybDpVcmwuZ2V0VXJsKCdnZXRDaXR5TGlzdCcpKycvJytzY29wZS5hcmVhXHJcblx0XHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0XHRzY29wZS5jaXR5TGlzdCA9IGRhdGEuY2l0aWVzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHRcdHVybDpVcmwuZ2V0VXJsKCdnZXRBcmVhc0xpc3QnKVxyXG5cdFx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdHNjb3BlLmFyZWFzTGlzdCA9IGRhdGEuem9uZXM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxufV0pXHJcbi5kaXJlY3RpdmUoJ21zZ1RpcCcsWydIdHRwJywnVXJsJywnJHRpbWVvdXQnLCdUaXAnLGZ1bmN0aW9uKEh0dHAsVXJsLCR0aW1lb3V0LFRpcCl7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OidFJyxcclxuXHRcdHRlbXBsYXRlVXJsOlwid2luZG93X3RpcFwiLFxyXG5cdFx0Ly8gdGVtcGxhdGU6Jzx1bCBzdHlsZT1cIndpZHRoOjYwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjIwJTtcIiBpZD0gXCJ0cGxNb2RlbFwiPjx1bD4nLFxyXG5cdFx0Ly8gdGVtcGxhdGU6JzxkaXY+PHRpcC1jb25maXJtPjwvdGlwLWNvbmZpcm0+PHRpcGFsZXJ0PjwvdGlwYWxlcnQ+PGRpdj4nLFxyXG5cdFx0bGluazpmdW5jdGlvbihzY29wZSxlbGUsYXR0cil7XHJcblx0XHRcdGNvbnNvbGUubG9nKHNjb3BlKTtcclxuXHRcdFx0c2NvcGUubXNnID0ge307XHJcblx0XHRcdHNjb3BlLmNvbmZpZyA9IHtcclxuXHRcdFx0XHQvLyBzb2NrZXRBZGRyZXNzOlwid3M6Ly8xOTIuMTY4LjkyLjcyOjgwODAvY3ljcm0vd2Vic29ja2V0VGVzdFwiLFxyXG5cdFx0XHRcdHNvY2tldEFkZHJlc3M6XCJ3czovLzE5Mi4xNjguMS4xMzU6ODA4MC9jeWNybS93ZWJzb2NrZXRUZXN0XCIsXHJcblx0XHRcdFx0aW5pdDpmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHRcdHNjb3BlLnVzZXJuYW1lPScnO1xyXG5cdFx0XHRpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9naW5JRCcpKXtcclxuXHRcdFx0XHRzY29wZS51c2VybmFtZT1sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9naW5JRCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNjb3BlLmNvbm5lY3RXcyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIHdzPXt9O1xyXG5cdFx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdFx0c2NvcGUubXNnID0gWyBcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bmFtZTon5bqT5a2Y5byC5bi4JyxcclxuXHRcdFx0XHRcdFx0dHlwZToyMDAwMSxcclxuXHRcdFx0XHRcdFx0bGlzdDpbXSxcclxuXHRcdFx0XHRcdFx0cm91dGVyOidob21lLm91dGJvdW5kVGFzaycsXHJcblx0XHRcdFx0XHRcdHNob3c6ZmFsc2VcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG5hbWU6J+S9o+mHkei/lOWIqeW8guW4uCcsXHJcblx0XHRcdFx0XHRcdHR5cGU6MjAwMDIsXHJcblx0XHRcdFx0XHRcdGxpc3Q6W10sXHJcblx0XHRcdFx0XHRcdHJvdXRlcjonaG9tZS5jaGF0JyxcclxuXHRcdFx0XHRcdFx0c2hvdzpmYWxzZVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdC8vIHtcclxuXHRcdFx0XHRcdC8vIFx0bmFtZTon5YW25LuW5raI5oGvJyxcclxuXHRcdFx0XHRcdC8vIFx0dHlwZToyMDAwMyxcclxuXHRcdFx0XHRcdC8vIFx0bGlzdDpbXSxcclxuXHRcdFx0XHRcdC8vIFx0cm91dGVyOicnLFxyXG5cdFx0XHRcdFx0Ly8gXHRzaG93OmZhbHNlXHJcblx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XTtcclxuXHRcdFx0XHRpZiAoJ1dlYlNvY2tldCcgaW4gd2luZG93KSB7XHJcblx0XHRcdFx0XHR0cnl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHNjb3BlLmNvbmZpZy5zb2NrZXRBZGRyZXNzKVxyXG5cdFx0XHRcdFx0XHR3cyA9IG5ldyBXZWJTb2NrZXQoc2NvcGUuY29uZmlnLnNvY2tldEFkZHJlc3MpO1xyXG5cdFx0XHRcdFx0fWNhdGNoKGUpe1xyXG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhlKTtcclxuXHRcdFx0XHRcdH0gICBcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCdNb3pXZWJTb2NrZXQnIGluIHdpbmRvdykge1xyXG5cdFx0XHRcdFx0d3MgPSBuZXcgV2ViU29ja2V0KHNjb3BlLmNvbmZpZy5zb2NrZXRBZGRyZXNzKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1dlYlNvY2tldCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci4nKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0d3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImNvbm5lY3Qgc3VjY2VzcyFcIik7XHJcblx0XHRcdFx0XHR3cy5zZW5kKHNjb3BlLnVzZXJuYW1lKTtcclxuXHRcdFx0XHRcdC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdC8vIFx0d3Muc2VuZChcImFsaXZlXCIpO1xyXG5cdFx0XHRcdFx0Ly8gfSwxODAwMDApXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR3cy5vbm1lc3NhZ2U9ZnVuY3Rpb24oZXYpe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZXYuZGF0YSk7XHJcblx0XHRcdFx0XHRpZihldi5kYXRhKXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coSlNPTi5wYXJzZShldi5kYXRhKSk7XHJcblx0XHRcdFx0XHRcdHZhciBtc2c9SlNPTi5wYXJzZShldi5kYXRhKTtcclxuXHRcdFx0XHRcdFx0c2NvcGUud2luZG93VGlwU2hvdyA9IHRydWU7XHJcblx0XHRcdFx0XHRcdGZvcih2YXIgaT0wO2k8c2NvcGUubXNnLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRcdFx0XHRcdGlmKHNjb3BlLm1zZ1tpXS50eXBlID09IG1zZy5hbGVydENvZGUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGluZD1pO1xyXG5cdFx0XHRcdFx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNjb3BlLm1zZ1tpbmRdLmxpc3Q9bXNnLmJlYW5zO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHdzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS13ZWJzb2NrZXTlhbPpl60s5bCd6K+V6YeN5paw6L+e5o6lLS0tLS0tLS0tLS0tJyk7XHJcblx0XHRcdFx0XHR0cnl7XHJcblx0XHRcdFx0XHRcdHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5jb25uZWN0V3Moc2NvcGUuY29uZmlnLnNvY2tldEFkZHJlc3MpO1xyXG5cdFx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHRcdFx0XHRcdHRpbWVyID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0fSwxMDAwMClcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dGhpcy53cyA9IHdzO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNjb3BlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHRcdFx0dXJsOlVybC5nZXRVcmwoJ3dzQWRkcmVzcycpLFxyXG5cdFx0XHRcdFx0ZGF0YTp7fVxyXG5cdFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0XHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRcdFx0c2NvcGUuY29uZmlnLnNvY2tldEFkZHJlc3M9XCJ3czpcIitkYXRhLmlwK1wiOjgwODAvY3ljcm0vd2Vic29ja2V0VGVzdFwiO1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmluZm8oJ2luaXQgc3VjY2VzcyEnKTtcclxuXHRcdFx0XHRcdFx0c2NvcGUuY29ubmVjdFdzKCk7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdFx0c2NvcGUuaW5pdCgpO1xyXG5cdFx0XHRzY29wZS5UaXBUYWJsZVNob3cgPSBmYWxzZTtcclxuXHRcdFx0c2NvcGUuY2xvc2VXaW5kb3dUaXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHNjb3BlLndpbmRvd1RpcFNob3cgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzY29wZS5vcGVuVGlwVGFibGUgPSBmdW5jdGlvbih4LGluZGV4KXtcclxuXHRcdFx0XHRzY29wZS50aXBUYWJsZVRpdD14Lm5hbWU7XHJcblx0XHRcdFx0c2NvcGUudGlwVGFibGVMaXN0PXgubGlzdDtcclxuXHRcdFx0XHQvLyBzY29wZS53aW5kb3dUaXBTaG93ID0gZmFsc2U7XHJcblx0XHRcdFx0c2NvcGUuVGlwVGFibGVTaG93ID0gdHJ1ZTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhzY29wZS50aXBUYWJsZUxpc3QpXHJcblx0XHRcdH1cdFxyXG5cdFx0XHRmdW5jdGlvbiBjbG9zZVRpcCAoZGF0YSx1cmwpe1xyXG5cdFx0XHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRcdGRhdGE6eydqc29uJzpKU09OLnN0cmluZ2lmeShkYXRhKX1cclxuXHRcdFx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHRcdGlmKGRhdGEuY29kZT09MSl7XHJcblx0XHRcdFx0XHRcdFRpcC5Mb2coc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdHNjb3BlLlRpcFRhYmxlU2hvdyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cdFxyXG5cdFx0XHRzY29wZS5pZExpc3Q9W107XHJcblx0XHRcdC8vIHNjb3BlLlRpcFRhYmxlU2hvdyA9IHRydWU7XHRcdFxyXG5cdFx0XHRzY29wZS5jbG9zZVRpcFRhYmxlID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRzY29wZS5UaXBUYWJsZVNob3cgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzY29wZS5jbG9zZVRpcHMgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHZhciBkYXRhID0ge30sXHJcblx0XHRcdFx0XHR1cmwgID0gJyc7XHJcblx0XHRcdFx0c2NvcGUuaWRMaXN0ID1cdHNjb3BlLnRpcFRhYmxlTGlzdC5tYXAoZnVuY3Rpb24odil7XHJcblx0XHRcdFx0XHRpZih2Lmhvc3BpdGFsSWQpe1xyXG5cdFx0XHRcdFx0XHRkYXRhPXtcclxuXHRcdFx0XHRcdFx0XHRob3NwaXRhbElkOnYuaG9zcGl0YWxJZCxcclxuXHRcdFx0XHRcdFx0XHRwcm9kdWN0SWQ6di5wcm9kdWN0SWRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYodi5tZXJjaGFuSWQpe1xyXG5cdFx0XHRcdFx0XHRkYXRhPXtcclxuXHRcdFx0XHRcdFx0XHRtZXJjaGFuSWQ6di5tZXJjaGFuSWQsXHJcblx0XHRcdFx0XHRcdFx0cHJvZHVjdElkOnYucHJvZHVjdElkXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHN3aXRjaChzY29wZS50aXBUYWJsZVRpdCl7XHJcblx0XHRcdFx0XHRjYXNlICflupPlrZjlvILluLgnOlxyXG5cdFx0XHRcdFx0XHR1cmw9VXJsLmdldFVybCgnc3RvY2tDbG9zZScpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ+S9o+mHkei/lOWIqeW8guW4uCc6XHJcblx0XHRcdFx0XHRcdHVybD1VcmwuZ2V0VXJsKCdwcm9tb3RlQ2xvc2UnKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNsb3NlVGlwIChzY29wZS5pZExpc3QsdXJsKVxyXG5cdFx0XHR9XHJcblx0XHRcdHNjb3BlLmNsb3NlVGlwID0gZnVuY3Rpb24oeCl7XHJcblx0XHRcdFx0dmFyIGRhdGEsdXJsO1xyXG5cdFx0XHRcdHN3aXRjaChzY29wZS50aXBUYWJsZVRpdCl7XHJcblx0XHRcdFx0XHRjYXNlICflupPlrZjlvILluLgnOlxyXG5cdFx0XHRcdFx0XHRkYXRhPXtcclxuXHRcdFx0XHRcdFx0XHRtZXJjaGFuSWQ6eC5tZXJjaGFuSWR8fCcnLFxyXG5cdFx0XHRcdFx0XHRcdHByb2R1Y3RJZDp4LnByb2R1Y3RJZHx8JydcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0dXJsPVVybC5nZXRVcmwoJ3N0b2NrQ2xvc2UnKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICfkvaPph5Hov5TliKnlvILluLgnOlxyXG5cdFx0XHRcdFx0XHRkYXRhPXtcclxuXHRcdFx0XHRcdFx0XHRwcm9kdWN0SWQ6eC5wcm9kdWN0SWR8fCcnLFxyXG5cdFx0XHRcdFx0XHRcdGhvc3BpdGFsSWQ6eC5ob3NwaXRhbElkfHwnJ1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR1cmw9VXJsLmdldFVybCgncHJvbW90ZUNsb3NlJyk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY29wZS5pZExpc3QucHVzaChkYXRhKTtcclxuXHRcdFx0XHRjbG9zZVRpcCAoc2NvcGUuaWRMaXN0LHVybClcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBzY29wZS5jbG9zZVByb21vdGVUaXAgPSBmdW5jdGlvbih4KXtcclxuXHRcdFx0Ly8gXHR2YXIgZGF0YT17XHJcblx0XHRcdC8vIFx0XHRwcm9kdWN0SWQ6eC5wcm9kdWN0SWR8fCcnLFxyXG5cdFx0XHQvLyBcdFx0aG9zcGl0YWxJZDp4Lmhvc3BpdGFsSWR8fCcnXHJcblx0XHRcdC8vIFx0fTtcclxuXHRcdFx0Ly8gXHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0Ly8gXHRcdHVybDpVcmwuZ2V0VXJsKCdwcm9tb3RlQ2xvc2UnKSxcclxuXHRcdFx0Ly8gXHRcdGRhdGE6ZGF0YVxyXG5cdFx0XHQvLyBcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdC8vIFx0XHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0XHQvLyBcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHJcblx0XHRcdC8vIFx0XHR9XHJcblx0XHRcdC8vIFx0fSlcclxuXHRcdFx0Ly8gXHRzY29wZS5UaXBUYWJsZVNob3cgPSBmYWxzZTtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0fVxyXG5cdH1cclxufV0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdwdWJ1bGljJyxbXSlcclxuLmZhY3RvcnkoJ0h0dHAnLFsnJGh0dHAnLCckc3RhdGUnLCckcm9vdFNjb3BlJyxmdW5jdGlvbigkaHR0cCwkc3RhdGUsJHJvb3RTY29wZSl7XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldDpmdW5jdGlvbihqc29uKXtcclxuXHRcdFx0dmFyIGRhdGEgPSBqc29uLnBhcmFtc3x8JycsdXJsID0ganNvbi51cmw7XHRcdFxyXG5cdFx0XHR2YXIgcHJvbWlzZSA9ICRodHRwKHtcclxuXHRcdFx0XHRtZXRob2Q6J2dldCcsXHJcblx0XHRcdFx0cGFyYW1zOmRhdGEsXHJcblx0XHRcdFx0dXJsOnVybFxyXG5cdFx0XHR9KVxyXG5cdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0XHRpZihtc2cuZGF0YS5jb2RlPT02NjY2KXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW5Db21wYW55Jyk7XHJcblx0XHRcdFx0fWVsc2UgaWYobXNnLmRhdGEuY29kZT09MjIyMil7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRwb3N0OmZ1bmN0aW9uKGpzb24pe1xyXG5cdFx0XHR2YXIgZGF0YSA9IGpzb24uZGF0YXx8JycsdXJsID0ganNvbi51cmw7XHJcblx0XHRcdHZhciBwcm9taXNlID0gJGh0dHAoe1xyXG5cdFx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRcdHVybDp1cmxcclxuXHRcdFx0fSlcclxuXHRcdFx0cHJvbWlzZS50aGVuKGZ1bmN0aW9uKG1zZyl7XHJcblx0XHRcdFx0aWYobXNnLmRhdGEuY29kZT09NjY2Nil7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2xvZ2luQ29tcGFueScpO1xyXG5cdFx0XHRcdH1lbHNlIGlmKG1zZy5kYXRhLmNvZGU9PTIyMjIpe1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHR9LFxyXG5cdFx0cG9zdEY6ZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdHZhciBkYXRhID0ganNvbi5kYXRhfHwnJyx1cmwgPSBqc29uLnVybDtcclxuXHRcdFx0dmFyIHByb21pc2UgPSAkaHR0cCh7XHJcblx0XHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LCAgXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcCBpbiBvYmopeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTsgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0XHRpZihtc2cuZGF0YS5jb2RlPT02NjY2KXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW5Db21wYW55Jyk7XHJcblx0XHRcdFx0fWVsc2UgaWYobXNnLmRhdGEuY29kZT09MjIyMil7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRieUZvcm06ZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdHZhciBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG5cdFx0XHRmLm1ldGhvZCA9IFwicG9zdFwiO1xyXG5cdFx0XHRmLmVuY3R5cGUgPSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjtcclxuXHRcdFx0Zi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdHNjb3BlID0ganNvbi5zY29wZXx8e307XHJcblx0XHRcdHZhciBmX2luID0ge307XHJcblx0XHRcdGlmKGpzb24uZGF0YSl7XHJcblx0XHRcdFx0Zm9yKHZhciBpIGluIGpzb24uZGF0YSl7XHJcblx0XHRcdFx0XHRmX2luW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHRcdFx0XHRcdGZfaW5baV0ubmFtZSA9IGk7XHJcblx0XHRcdFx0XHRmX2luW2ldLnZhbHVlID0ganNvbi5kYXRhW2ldO1xyXG5cdFx0XHRcdFx0Zi5hcHBlbmRDaGlsZChmX2luW2ldKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGZfaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblx0XHRcdGZfaS50eXBlID0gXCJmaWxlXCI7XHJcblx0XHRcdGZfaS5uYW1lID0ganNvbi5maWxlTmFtZXx8Jyc7XHJcblx0XHRcdGZfaS5hY2NlcHQgPSBqc29uLmFjY2VwdHx8Jyc7XHJcblx0XHRcdGZfaS5tdWx0aXBsZSA9IGpzb24ubXVsdGlwbGV8fCcnO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhmX2kpO1xyXG5cdFx0XHQoZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdFx0Zl9pLm9uY2hhbmdlID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRodHRwKHtcclxuXHRcdFx0XHRcdFx0dXJsOmpzb24udXJsLFxyXG5cdFx0XHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgRF9hdGEgPSBuZXcgRm9ybURhdGEoZik7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIERfYXRhXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdGRhdGEueWtmX2VfZmlsZSA9IGZfaS5maWxlc1swXTtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmKTtcclxuXHRcdFx0XHRcdFx0anNvbi5zdWNjZXNzJiZqc29uLnN1Y2Nlc3MoZGF0YSk7XHJcblx0XHRcdFx0XHR9KS5lcnJvcihmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdFx0anNvbi5zdWNjZXNzLmVycm9yJiZqc29uLnN1Y2Nlc3MuZXJyb3IoZSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkoanNvbilcclxuXHRcdFx0Zi5hcHBlbmRDaGlsZChmX2kpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGYpO1xyXG5cdFx0XHRmX2kuY2xpY2soKTtcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uZmFjdG9yeShcIkVsZVwiLGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHtcclxuXHRcdGU6ZnVuY3Rpb24ob2JqLGNvbnRlbnQpe1xyXG5cdFx0XHR2YXIgZmlyc3RDaGFyPW9iai5jaGFyQXQoMCk7XHJcblx0XHRcdHZhciBjb250ZW50PWNvbnRlbnR8fGRvY3VtZW50O1xyXG5cdFx0XHRpZihmaXJzdENoYXI9PVwiI1wiKXtcclxuXHRcdFx0XHRyZXR1cm4gY29udGVudC5nZXRFbGVtZW50QnlJZChvYmouc3Vic3RyaW5nKDEpKTtcclxuXHRcdFx0fWVsc2UgaWYoZmlyc3RDaGFyPT1cIi5cIil7XHJcblx0XHRcdFx0dmFyIGFycj1bXTtcclxuXHRcdFx0XHR2YXIgYUVscz1jb250ZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKTtcclxuXHRcdFx0XHRcdGZvcih2YXIgaT0wO2k8YUVscy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0XHRcdFx0XHR2YXIgYUNsYXNzTmFtZT1cdGFFbHNbaV0uY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcclxuXHRcdFx0XHRcdFx0XHRcdCBmb3IodmFyIGo9MDtqPGFDbGFzc05hbWUubGVuZ3RoO2orKyl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGFDbGFzc05hbWVbal09PW9iai5zbGljZSgxKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2goYUVsc1tpXSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHQgfVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gYXJyO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUob2JqKTtcclxuXHRcdFx0fVxyXG5cdFx0XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4uZmFjdG9yeSgnVGlwJyxbJyR0aW1lb3V0JyxcIkVsZVwiLGZ1bmN0aW9uKCR0aW1lb3V0LEVsZSl7XHJcblx0cmV0dXJuIHtcclxuXHRcdC8v5a+56K+d5qGG77yM5Lyg5Y+C5Li65a+56K+d5L+h5oGv77yM56Gu6K6k5LmL5ZCO55qE5Yqo5L2c77yM5YWz6Zet5LmL5ZCO55qE5Yqo5L2cXHJcblx0XHRDb25maXJtOmZ1bmN0aW9uKHNjb3BlLG1hc3NhZ2UsY2FsbGJhY2sxLGNhbGxiYWNrMil7XHJcblx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fc2hvdz10cnVlO1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBtYXNzYWdlPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRcdGlmKG1hc3NhZ2UudGl0bGUpe1xyXG5cdFx0XHRcdFx0XHRzY29wZS55a2ZfY29uZmlybV90aXRsZV9zaG93PXRydWU7XHJcblx0XHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX3RpdGxlID0gbWFzc2FnZS50aXRsZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX21zZyA9IG1hc3NhZ2UubXNnO1xyXG5cdFx0XHRcdH1lbHNlIGlmKHR5cGVvZiBtYXNzYWdlPT1cInN0cmluZ1wiKXtcclxuXHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX21zZyA9IG1hc3NhZ2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVx0XHJcblx0XHRcdHNjb3BlLmNvbmZpcm1fc2hvdyA9ICdjb25maXJtLXNob3cnO1xyXG5cdFx0XHRzY29wZS55a2ZfbW9kYWxfc3VyZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHNjb3BlLmNvbmZpcm1fc2hvdyA9ICdjb25maXJtLW91dCc7XHJcblx0XHRcdFx0XHRzY29wZS55a2ZfY29uZmlybV9zaG93PWZhbHNlO1xyXG5cdFx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fdGl0bGVfc2hvdz1mYWxzZTtcclxuXHRcdFx0XHR9KVx0XHJcblx0XHRcdFx0Y2FsbGJhY2sxJiZjYWxsYmFjazEoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzY29wZS55a2ZfbW9kYWxfY2xvc2UgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRzY29wZS5jb25maXJtX3Nob3cgPSAnY29uZmlybS1vdXQnO1xyXG5cdFx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fc2hvdz1mYWxzZTtcclxuXHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX3RpdGxlX3Nob3c9ZmFsc2U7XHJcblx0XHRcdFx0fSlcdFxyXG5cdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRMb2c6ZnVuY3Rpb24oc2NvcGUsbXNnLGNiKXtcclxuXHRcdFx0Y29uc29sZS5sb2coKVxyXG5cdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHNjb3BlLnRpcF9hbGVydF9tc2c9bXNnO1xyXG5cdFx0XHRcdGlmKHNjb3BlLnRpcF9hbGVydF9tc2cudHlwZT09MSl7XHJcblx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfdHlwZT1cInRpcC1hbGVydC1zdWNjZXNzXCI7XHJcblx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz1mYWxzZTtcclxuXHRcdFx0XHRcdFx0Y2ImJmNiKCk7XHJcblx0XHRcdFx0XHR9LDEwMDApXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfdHlwZT1cInRpcC1hbGVydC1lcnJvclwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz10cnVlO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHRcdEFsZXJ0OmZ1bmN0aW9uKHNjb3BlLG1lc3NhZ2UsY2Ipe1xyXG5cdFx0XHRzY29wZS55a2ZfYWxlcnRfc2hvdyA9IHRydWU7XHJcblx0XHRcdHNjb3BlLnlrZl9hbGVydF9tc2cgPSBtZXNzYWdlO1xyXG5cdFx0XHRzY29wZS55a2ZfYWxlcnRfc3VyZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2NvcGUueWtmX2FsZXJ0X3Nob3cgPSBmYWxzZTtcclxuXHRcdFx0XHRjYiYmY2IoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcbn1dKVxyXG4vLyAuZmFjdG9yeSgnVGlwJyxbJyR0aW1lb3V0JywnJHJvb3RTY29wZScsZnVuY3Rpb24oJHRpbWVvdXQsJHJvb3RTY29wZSl7XHJcbi8vIFx0cmV0dXJuIHtcclxuLy8gXHRcdC8v5by556qX5o+Q56S677yM56ys5LiA5Liq5Y+C5pWw5Li65o+Q56S65YaF5a6577yM6Iul5pS55Y+YdGl0bGXlkozlrr3luqbnrKzkuIDkuKrlj4LmlbDpnIDkvKDlkKvmnIl0aXRsZeWSjG1zZ+S4pOS4quWPguaVsOeahOWvueixoVxyXG4vLyBcdFx0Ly/nrKzkuozlj4LmlbDkuLrlm57osIPlh73mlbBcclxuLy8gXHRcdEFsZXJ0OmZ1bmN0aW9uKG1hc3NhZ2UsY2FsbGJhY2spe1xyXG4vLyBcdFx0XHR2YXIgZGlhbG9nVGl0LGRpYWxvZ01zZyxkaWFsb2dXaWR0aDtcclxuLy8gXHRcdFx0aWYodHlwZW9mIG1hc3NhZ2UgPT0nb2JqZWN0Jyl7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nVGl0ID0gbWFzc2FnZS50aXRsZT9tYXNzYWdlLnRpdGxlOifmnaXoh6onK3dpbmRvdy5sb2NhdGlvbi5ob3N0KyfnmoTmj5DnpLonO1xyXG4vLyBcdFx0XHRcdGRpYWxvZ01zZyA9IG1hc3NhZ2UubXNnP21hc3NhZ2UubXNnOicnO1xyXG4vLyBcdFx0XHRcdGRpYWxvZ1dpZHRoID0gbWFzc2FnZS53aWR0aD9tYXNzYWdlLndpZHRoOmZhbHNlO1xyXG4vLyBcdFx0XHR9ZWxzZSBpZih0eXBlb2YgbWFzc2FnZSA9PSdzdHJpbmcnKXtcclxuLy8gXHRcdFx0XHRkaWFsb2dUaXQgPSAn5p2l6IeqJyt3aW5kb3cubG9jYXRpb24uaG9zdCsn55qE5o+Q56S6JztcclxuLy8gXHRcdFx0XHRkaWFsb2dNc2cgPSBtYXNzYWdlO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS5oaWRlKCk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnRleHQoJ+ehruiupCcpO1xyXG4vLyBcdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS50ZXh0KGRpYWxvZ1RpdCk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dNc2cnKS50ZXh0KGRpYWxvZ01zZyk7XHJcbi8vIFx0XHRcdCQoJyNteURpYWxvZycpLm9uZSgnaGlkZGVuLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrJiZjYWxsYmFjaygpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnRleHQoJ+WPlua2iCcpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS5zaG93KCk7XHJcbi8vIFx0XHRcdFx0JCgnLm1vZGFsLWNvbnRlbnQnKS5hdHRyKFwic3R5bGVcIixcIlwiKTtcclxuLy8gXHRcdFx0fSk7XHJcbi8vIFx0XHRcdGlmKGRpYWxvZ1dpZHRoKSAkKCcubW9kYWwtY29udGVudCcpLmNzcyh7d2lkdGg6cGFyc2VJbnQod2lkdGgpLG1hcmdpbjonMCBhdXRvJ30pO1xyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCh7XHJcbi8vIFx0XHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnXHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHR9LFxyXG4vLyBcdFx0Ly/lr7nor53moYbvvIzkvKDlj4LkuLrlr7nor53kv6Hmga/vvIznoa7orqTkuYvlkI7nmoTliqjkvZzvvIzlhbPpl63kuYvlkI7nmoTliqjkvZxcclxuLy8gXHRcdENvbmZpcm06ZnVuY3Rpb24obWFzc2FnZSxjYWxsYmFjazEsY2FsbGJhY2syKXtcclxuLy8gXHRcdFx0dmFyIGRpYWxvZ1RpdCxkaWFsb2dNc2csZGlhbG9nV2lkdGg7XHJcbi8vIFx0XHRcdGlmKHR5cGVvZiBtYXNzYWdlID09J29iamVjdCcpe1xyXG4vLyBcdFx0XHRcdGRpYWxvZ1RpdCA9IG1hc3NhZ2UudGl0bGU/bWFzc2FnZS50aXRsZTon5p2l6IeqJyt3aW5kb3cubG9jYXRpb24uaG9zdCsn55qE5o+Q56S6JztcclxuLy8gXHRcdFx0XHRkaWFsb2dNc2cgPSBtYXNzYWdlLm1zZz9tYXNzYWdlLm1zZzonJztcclxuLy8gXHRcdFx0XHRkaWFsb2dXaWR0aCA9IG1hc3NhZ2Uud2lkdGg/bWFzc2FnZS53aWR0aDpmYWxzZTtcclxuLy8gXHRcdFx0fWVsc2UgaWYodHlwZW9mIG1hc3NhZ2UgPT0nc3RyaW5nJyl7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nVGl0ID0gJ+adpeiHqicrd2luZG93LmxvY2F0aW9uLmhvc3QrJ+eahOaPkOekuic7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nTXNnID0gbWFzc2FnZTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS50ZXh0KGRpYWxvZ1RpdCk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dNc2cnKS50ZXh0KGRpYWxvZ01zZyk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazImJmNhbGxiYWNrMigpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjZGlhbG9nQ2xvc2VUJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoJ2hpZGUnKTtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazEmJmNhbGxiYWNrMSgpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlVCcpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2hhbmdlJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJy5tb2RhbC1jb250ZW50JykuYXR0cihcInN0eWxlXCIsXCJcIik7XHJcbi8vIFx0XHRcdH0pO1xyXG4vLyBcdFx0XHRpZihkaWFsb2dXaWR0aCkgJCgnLm1vZGFsLWNvbnRlbnQnKS5jc3Moe3dpZHRoOnBhcnNlSW50KGRpYWxvZ1dpZHRoKSxtYXJnaW46JzAgYXV0byd9KTtcclxuLy8gXHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoe1xyXG4vLyBcdFx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJ1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSxcclxuLy8gXHRcdENoZWNrOmZ1bmN0aW9uKGNhbGxiYWNrMSxjYWxsYmFjazIpe1xyXG4vLyBcdFx0XHR2YXIgZGlhbG9nVGl0LGRpYWxvZ01zZyxkaWFsb2dXaWR0aD00MDA7XHJcbi8vIFx0XHRcdGRpYWxvZ01zZz0nPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+JytcclxuLy8gXHRcdFx0XHRcdCAgICAnPGxhYmVsPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgICAnPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJzcVwiIHZhbHVlPVwia2Z6XCIgY2xhc3M9XCJ3ZWNoYXRfcmFkaW9cIj4g5YWs5LyX5Y+35byA5Y+R6ICF5o6I5p2DJytcclxuLy8gXHRcdFx0XHRcdCAgICAnPC9sYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAnPC9kaXY+JytcclxuLy8gXHRcdFx0XHRcdCAgJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgJzxsYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICAgJzxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwic3FcIiB2YWx1ZT1cInB0XCIgY2xhc3M9XCJ3ZWNoYXRfcmFkaW9cIj4g5YWs5LyX5Y+356ys5LiJ5pa55bmz5Y+w5o6I5p2DJytcclxuLy8gXHRcdFx0XHRcdCAgICAnPC9sYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAnPC9kaXY+JztcclxuLy8gXHRcdFx0ZGlhbG9nVGl0PSfpgInmi6nnu5HlrprmlrnlvI8nO1xyXG4vLyBcdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS5odG1sKGRpYWxvZ1RpdCk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dNc2cnKS5odG1sKGRpYWxvZ01zZyk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazImJmNhbGxiYWNrMigpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjZGlhbG9nQ2xvc2VUJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoJ2hpZGUnKTtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazEmJmNhbGxiYWNrMSgpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLmh0bWwoJycpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dNc2cnKS5odG1sKCcnKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdFx0JCgnI215RGlhbG9nJykub25lKCdoaWRkZW4uYnMubW9kYWwnLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDbG9zZVQnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcubW9kYWwtY29udGVudCcpLmF0dHIoXCJzdHlsZVwiLFwiXCIpO1xyXG4vLyBcdFx0XHR9KTtcclxuLy8gXHRcdFx0aWYoZGlhbG9nV2lkdGgpICQoJy5tb2RhbC1jb250ZW50JykuY3NzKHt3aWR0aDpwYXJzZUludChkaWFsb2dXaWR0aCksbWFyZ2luOicwIGF1dG8nfSk7XHJcbi8vIFx0XHRcdCQoJyNteURpYWxvZycpLm1vZGFsKHtcclxuLy8gXHRcdFx0XHRiYWNrZHJvcDogJ3N0YXRpYydcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdH0sXHJcbi8vIFx0XHRDaGVja2JveDpmdW5jdGlvbihjYWxsYmFjazEsY2FsbGJhY2syKXtcclxuLy8gXHRcdFx0dmFyIGRpYWxvZ1RpdCxkaWFsb2dNc2csZGlhbG9nV2lkdGg9NDAwO1xyXG4vLyBcdFx0XHRkaWFsb2dNc2c9JzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgJzxsYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICAgJzxzcGFuIGNsYXNzPVwiQWNjZXB0bmFtZVwiPuWPl+eQhuWuouacjee7hO+8mjwvc3Bhbj4nKyc8c2VsZWN0IG5hbWU9XCJcIiBjbGFzcz1cIkFjY2VwdGtmXCI+JysnPG9wdGlvbiB2YWx1ZT1cIuWPl+eQhuWuouacjee7hFwiPuWPl+eQhuWuouacjee7hDwvb3B0aW9uPicrJzxsZWN0PicrXHJcbi8vIFx0XHRcdFx0XHQgICAgJzwvbGFiZWw+JytcclxuLy8gXHRcdFx0XHRcdCAgJzwvZGl2PicrXHJcbi8vIFx0XHRcdFx0XHQgICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICc8bGFiZWw+JytcclxuLy8gXHRcdFx0XHRcdCAgICAgICc8c3BhbiBjbGFzcz1cIkFjY2VwdG5hbWVcIj7lj5fnkIblrqLmnI3vvJo8L3NwYW4+JysnPHNlbGVjdCBuYW1lPVwiXCIgY2xhc3M9XCJBY2NlcHRrZlwiPicrJzxvcHRpb24gdmFsdWU9XCLlj5fnkIblrqLmnI1cIj7lj5fnkIblrqLmnI08L29wdGlvbj4nKyc8bGVjdD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICc8L2xhYmVsPicrXHJcbi8vIFx0XHRcdFx0XHQgICc8L2Rpdj4nO1xyXG4vLyBcdFx0XHRkaWFsb2dUaXQ9J+i9rOenu+W3peWNlSc7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLmh0bWwoZGlhbG9nVGl0KTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ01zZycpLmh0bWwoZGlhbG9nTXNnKTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZVQnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0Y2FsbGJhY2syJiZjYWxsYmFjazIoKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCgnaGlkZScpO1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMSYmY2FsbGJhY2sxKCk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ1RpdGxlJykuaHRtbCgnJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ01zZycpLmh0bWwoJycpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlVCcpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2hhbmdlJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJy5tb2RhbC1jb250ZW50JykuYXR0cihcInN0eWxlXCIsXCJcIik7XHJcbi8vIFx0XHRcdH0pO1xyXG4vLyBcdFx0XHRpZihkaWFsb2dXaWR0aCkgJCgnLm1vZGFsLWNvbnRlbnQnKS5jc3Moe3dpZHRoOnBhcnNlSW50KGRpYWxvZ1dpZHRoKSxtYXJnaW46JzAgYXV0byd9KTtcclxuLy8gXHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoe1xyXG4vLyBcdFx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJ1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSxcclxuLy8gXHRcdExvZzpmdW5jdGlvbihtc2csY2Ipe1xyXG4vLyBcdFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3RpcGxvZycsbXNnKTtcclxuLy8gXHRcdFx0Y2ImJmNiKCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG4vLyB9XSlcclxuLy/liJfooajmn6Xor6LmnI3liqHlsIHoo4VcclxuLmZhY3RvcnkoJ0dldExpc3QnLFsnJGh0dHAnLCckdGltZW91dCcsJ1RpcCcsZnVuY3Rpb24oJGh0dHAsJHRpbWVvdXQsVGlwKXtcclxuXHRyZXR1cm57IEdldDpmdW5jdGlvbihvcHQpe1xyXG5cdFx0XHR2YXIgdXJsID0gb3B0LnVybDtcclxuXHRcdFx0dmFyIGRhdGEgPSBvcHQuZGF0YTtcclxuXHRcdFx0dmFyIHNjb3BlID0gb3B0LnNjb3BlO1xyXG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBvcHQuc3VjY2VzcztcclxuXHRcdFx0c2NvcGUucGFnU2hvdz1mYWxzZTtcclxuXHRcdFx0c2NvcGUucGFnaW5hdGlvbkNvbmYgPSB7XHJcblx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHQgICAgICAgIGN1cnJlbnRQYWdlOiAxLC8v6buY6K6k6aG1XHJcblx0XHQgICAgICAgIHRvdGFsSXRlbXM6IDgwLC8v5oC76aG15pWwXHJcblx0XHQgICAgICAgIGl0ZW1zUGVyUGFnZTogMTAsLy/mr4/pobXlsZXnpLrmlbDmja7mnaHmlbAg6buY6K6kMTXmnaFcclxuXHRcdCAgICAgICAgcGFnZXNMZW5ndGg6IDE1LC8v5YiG6aG15p2h55uu6ZW/5bqmXHJcblx0XHQgICAgICAgIHBlclBhZ2VPcHRpb25zOiBbNSwgMTAsIDIwXSxcclxuXHRcdCAgICAgICAgaW5pdDp0cnVlLFxyXG5cdFx0ICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZm4pe1xyXG5cdFx0ICAgICAgICBcdHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT1zY29wZS5wYWdpbmF0aW9uQ29uZi5jdXJyZW50UGFnZTtcclxuXHRcdCAgICAgICAgXHRzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2VTaXplPXNjb3BlLnBhZ2luYXRpb25Db25mLml0ZW1zUGVyUGFnZTtcclxuXHRcdCAgICAgICAgXHRpZih0aGlzLmluaXQ9PXRydWUpe1xyXG5cdFx0ICAgICAgICBcdFx0dGhpcy5pbml0PWZhbHNlO1xyXG5cdFx0ICAgICAgICBcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0ICAgICAgICBcdH1cclxuXHRcdCBcdFx0XHQkaHR0cCh7XHJcblx0XHQgXHRcdFx0XHR1cmw6c2NvcGUucGFnaW5hdGlvbkNvbmYudXJsLFxyXG5cdFx0IFx0XHRcdFx0cGFyYW1zOnNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGFcclxuXHRcdCBcdFx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0IFx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0IFx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQgXHRcdFx0XHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuXHRcdFx0IFx0XHRcdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZi50b3RhbEl0ZW1zPWRhdGEudG90YWxDb3VudDtcclxuXHRcdFx0IFx0XHRcdFx0XHRjYWxsYmFjayYmY2FsbGJhY2soZGF0YSk7XHJcblx0XHRcdCBcdFx0XHRcdH0pXHJcblx0XHQgXHRcdFx0XHR9XHJcblx0XHQgXHRcdFx0fSkuZXJyb3IoZnVuY3Rpb24oZSl7XHJcblx0XHQgXHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcclxuXHRcdCBcdFx0XHR9KVxyXG5cdFx0ICAgICAgICB9XHJcblx0XHQgICAgfTtcclxuXHRcdCAgICBzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2U9MTtcclxuXHRcdCAgICBzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2VTaXplPTEwO1xyXG5cdFx0ICAgICRodHRwKHtcclxuXHRcdCAgICBcdHVybDp1cmwsXHJcblx0XHQgICAgXHRwYXJhbXM6c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YVxyXG5cdFx0ICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQgICAgXHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHQgICAgXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCAgICBcdFx0c2NvcGUucGFnU2hvdz10cnVlO1xyXG5cdFx0XHQgICAgXHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuXHQgXHRcdFx0XHRcdHNjb3BlLnBhZ2luYXRpb25Db25mLnRvdGFsSXRlbXM9ZGF0YS50b3RhbENvdW50O1xyXG5cdCBcdFx0XHRcdFx0Y2FsbGJhY2smJmNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0XHQgICAgXHR9KVxyXG5cdFx0ICAgIFx0fVxyXG5cdFx0ICAgIH0pXHJcblx0XHR9LFxyXG5cdFx0UG9zdDpmdW5jdGlvbihvcHQpe1xyXG5cdFx0XHR2YXIgdXJsID0gb3B0LnVybDtcclxuXHRcdFx0dmFyIGRhdGEgPSBvcHQuZGF0YTtcclxuXHRcdFx0dmFyIHNjb3BlID0gb3B0LnNjb3BlO1xyXG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBvcHQuc3VjY2VzcztcclxuXHRcdFx0c2NvcGUucGFnU2hvdz1mYWxzZTtcclxuXHRcdFx0c2NvcGUucGFnaW5hdGlvbkNvbmYgPSB7XHJcblx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHQgICAgICAgIGN1cnJlbnRQYWdlOiAxLC8v6buY6K6k6aG1XHJcblx0XHQgICAgICAgIHRvdGFsSXRlbXM6IDgwLC8v5oC76aG15pWwXHJcblx0XHQgICAgICAgIGl0ZW1zUGVyUGFnZTogMTAsLy/mr4/pobXlsZXnpLrmlbDmja7mnaHmlbAg6buY6K6kMTXmnaFcclxuXHRcdCAgICAgICAgcGFnZXNMZW5ndGg6IDE1LC8v5YiG6aG15p2h55uu6ZW/5bqmXHJcblx0XHQgICAgICAgIHBlclBhZ2VPcHRpb25zOiBbNSwgMTAsIDIwXSxcclxuXHRcdCAgICAgICAgaW5pdDp0cnVlLFxyXG5cdFx0ICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZm4pe1xyXG5cdFx0ICAgICAgICBcdHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT1zY29wZS5wYWdpbmF0aW9uQ29uZi5jdXJyZW50UGFnZTtcclxuXHRcdCAgICAgICAgXHRzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2VTaXplPXNjb3BlLnBhZ2luYXRpb25Db25mLml0ZW1zUGVyUGFnZTtcclxuXHRcdCAgICAgICAgXHRpZih0aGlzLmluaXQ9PXRydWUpe1xyXG5cdFx0ICAgICAgICBcdFx0dGhpcy5pbml0PWZhbHNlO1xyXG5cdFx0ICAgICAgICBcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0ICAgICAgICBcdH1cclxuXHRcdCBcdFx0XHQkaHR0cCh7XHJcblx0XHQgXHRcdFx0XHR1cmw6dXJsLFxyXG5cdFx0IFx0XHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdCBcdFx0XHRcdGRhdGE6c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YSxcclxuXHRcdCBcdFx0XHRcdGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sICBcclxuXHRcdCAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gW107ICBcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBwIGluIG9iail7ICBcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIH0gIFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpOyAgXHJcblx0XHQgICAgICAgICAgICAgICAgfVxyXG5cdFx0IFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQgXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0ICAgIFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0ICAgIFx0XHRzY29wZS5wYWdTaG93PXRydWU7XHJcblx0XHRcdFx0XHQgICAgXHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuXHRcdFx0IFx0XHRcdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZi50b3RhbEl0ZW1zPWRhdGEudG90YWxDb3VudDtcclxuXHRcdFx0IFx0XHRcdFx0XHRjYWxsYmFjayYmY2FsbGJhY2soZGF0YSk7XHJcblx0XHRcdFx0XHQgICAgXHR9KVxyXG5cdFx0XHRcdCAgICBcdH1cclxuXHRcdCBcdFx0XHR9KS5lcnJvcihmdW5jdGlvbihlKXtcclxuXHRcdCBcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0IFx0XHRcdH0pXHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9O1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT0xO1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZVNpemU9MTA7XHJcblx0XHQgICAgJGh0dHAoe1xyXG5cdFx0ICAgIFx0dXJsOnVybCxcclxuXHRcdCAgICBcdG1ldGhvZDoncG9zdCcsXHJcblx0XHQgICAgXHRkYXRhOnNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEsXHJcblx0XHQgICAgXHRoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LCAgXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcCBpbiBvYmopeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTsgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0ICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQgICAgXHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHQgICAgXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCAgICBcdFx0c2NvcGUucGFnU2hvdz10cnVlO1xyXG5cdFx0XHQgICAgXHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuXHQgXHRcdFx0XHRcdHNjb3BlLnBhZ2luYXRpb25Db25mLnRvdGFsSXRlbXM9ZGF0YS50b3RhbENvdW50O1xyXG5cdCBcdFx0XHRcdFx0Y2FsbGJhY2smJmNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0XHQgICAgXHR9KVxyXG5cdFx0ICAgIFx0fWVsc2V7XHJcblx0XHRcdFx0XHRUaXAuTG9nKHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdFx0fVx0XHJcblx0XHQgICAgfSlcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uZmFjdG9yeSgnVGVzdENoYXQnLGZ1bmN0aW9uKCl7XHJcblx0dmFyIG1zZyA9e1xyXG5cdFx0XHJcblx0fVxyXG5cdHJldHVybiB7XHJcblx0XHRjaGF0OmZ1bmN0aW9uKCl7XHJcblx0XHRcdHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0XHR9LDMwMDApXHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4uZmFjdG9yeSgnZ3JvdXBzUm9sZXMnLFsnJGh0dHAnLCdVcmwnLCckdGltZW91dCcsZnVuY3Rpb24oJGh0dHAsVXJsLCR0aW1lb3V0KXsvL+iOt+WPluaJgOacieWuouacjee7hOS7peWPiuinkuiJsuWIl+ihqO+8iOaXoOWIhumhte+8iVxyXG5cdC8v57yT5a2Y5omA5pyJ5a6i5pyN57uE5ZKM6KeS6Imy55qEcHJvbWlzZeWvueixoVxyXG5cdHJldHVybiB7XHJcblx0XHRnZXQ6ZnVuY3Rpb24oc2NvcGUsY2IxLGNiMil7Ly9jYjHkuLrojrflj5blrqLmnI3nu4TnmoTlm57osIPlh73mlbAsY2Iy5Li66I635Y+W6KeS6Imy5YiX6KGo55qE5Zue6LCD5Ye95pWwXHJcblx0XHRcdHZhciBwcm8xID0gJGh0dHAoe1xyXG5cdFx0XHRcdHVybDpVcmwuZ2V0VXJsKCdhbGxHcm91cHMnKSxcclxuXHRcdFx0XHRwYXJhbXM6e1xyXG5cdFx0XHRcdFx0dXNlclByaXZhdGVVcmw6c2NvcGUudXNlclByaXZhdGVVcmxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHNjb3BlLmdyb3VwRGF0YT1kYXRhLmdyb3VwcztcclxuXHRcdFx0XHRcdFx0Y2IxJiZjYjEoKTtcclxuXHRcdFx0XHRcdH0pXHRcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybign6I635Y+W5a6i5pyN57uE5pWw5o2u5aSx6LSlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR2YXIgcHJvMiA9ICRodHRwKHtcclxuXHRcdFx0XHR1cmw6VXJsLmdldFVybCgnYWxsUm9sZXMnKSxcclxuXHRcdFx0XHRwYXJhbXM6e1xyXG5cdFx0XHRcdFx0dXNlclByaXZhdGVVcmw6c2NvcGUudXNlclByaXZhdGVVcmxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHNjb3BlLnJvbGVEYXRhPWRhdGEucm9sZXM7XHJcblx0XHRcdFx0XHRcdGNiMiYmY2IyKCk7XHJcblx0XHRcdFx0XHR9KVx0XHRcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybign6I635Y+W6KeS6Imy5pWw5o2u5aSx6LSlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcdFx0XHJcbn1dKVxyXG4uZmFjdG9yeSgnaW5kZXhlZERCJyxmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIG9wZW5EQiAobXlEQixzY29wZSxjYikgey8v5omT5byA6IGK5aSp5pWw5o2u5bqTXHJcblx0XHRpZihzY29wZS5EQil7Ly/liKTmlq3mmK/lkKblnKhzY29wZeS4ree8k+WtmOS6hkRC5a+56LGhLOWmguaenOe8k+WtmOS6hu+8jOWwseWwhuWvueixoeeahHJlc3VsdOi1i+e7mW15REIuZGJcclxuXHRcdFx0bXlEQi5kYiA9IHNjb3BlLkRCLnJlc3VsdDtcclxuXHRcdFx0Y2ImJmNiKCk7XHJcblx0XHR9ZWxzZXsvL+WmguaenOacque8k+WtmERC5a+56LGh77yM5oiW6ICF5LiO5pWw5o2u5bqT55qE6ZO+5o6l5Lit5pat77yM5YiZ6YeN5paw5omT5byA5pWw5o2u5bqTXHJcblx0XHRcdHZhciB2ZXJzaW9uPW15REIudmVyc2lvbiB8fCAxO1xyXG5cdFx0XHRzY29wZS5EQj17fTtcclxuXHQgICAgICAgIHNjb3BlLkRCPXdpbmRvdy5pbmRleGVkREIub3BlbihteURCLm5hbWUsdmVyc2lvbik7Ly/miZPlvIDmlbDmja7lupNcclxuXHQgICAgICAgIHNjb3BlLkRCLm9uZXJyb3I9ZnVuY3Rpb24oZSl7XHJcblx0ICAgICAgICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmVycm9yLm1lc3NhZ2UpO1xyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICAgIHNjb3BlLkRCLm9uc3VjY2Vzcz1mdW5jdGlvbihlKXtcclxuXHQgICAgICAgIFx0c2NvcGUuREIucmVzdWx0PWUudGFyZ2V0LnJlc3VsdDtcclxuXHQgICAgICAgICAgICBteURCLmRiPWUudGFyZ2V0LnJlc3VsdDtcclxuXHQgICAgICAgICAgICBjYiYmY2IoKTtcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgICBzY29wZS5EQi5vbnVwZ3JhZGVuZWVkZWQ9ZnVuY3Rpb24oZSl7XHJcblx0ICAgICAgICAgICAgdmFyIGRiPWUudGFyZ2V0LnJlc3VsdDtcclxuXHQgICAgICAgICAgICBpZighZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhteURCLm5hbWUpKXtcclxuXHQgICAgICAgICAgICAgICAgdmFyIHN0b3JlPWRiLmNyZWF0ZU9iamVjdFN0b3JlKG15REIubmFtZSx7a2V5UGF0aDogXCJtc2dJZFwifSk7Ly/nrKzkuIDmrKHliJvlu7rmlbDmja7ooajvvIzooajlkI3kuI7mlbDmja7lupPlkI3nm7jlkIxcclxuXHQgICAgICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ2NoYXRJZEluZGV4JywnY2hhdElkJyx7dW5pcXVlOmZhbHNlfSk7IFxyXG5cdCAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgndG9JZEluZGV4JywndG9JZCcse3VuaXF1ZTpmYWxzZX0pO1xyXG5cdCAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnZnJvbUlkSW5kZXgnLCdmcm9tSWQnLHt1bmlxdWU6ZmFsc2V9KTtcclxuXHQgICAgICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ3RpbWVJbmRleCcsJ3RpbWUnLHt1bmlxdWU6ZmFsc2V9KTtcclxuXHQgICAgICAgICAgICBcdGNvbnNvbGUubG9nKCdEQiB2ZXJzaW9uIGNoYW5nZWQgdG8gJyt2ZXJzaW9uKTtcclxuXHQgICAgICAgIFx0fTtcclxuXHQgICAgICAgIH1cclxuXHRcdH1cclxuXHQgICAgICAgIFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY2xvc2VEQihkYil7Ly/lhbPpl63ogYrlpKnmlbDmja7lupNcclxuICAgICAgICBkYi5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YUJ5SW5kZXgoZGIsc3RvcmVOYW1lLGluZGV4VHlwZSx4LHNjb3BlLGNiKXsvL+mAmui/h2luZGV45p+l6K+iXHJcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uPWRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgdmFyIHN0b3JlPXRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gc3RvcmUuaW5kZXgoaW5kZXhUeXBlKTtcclxuICAgICAgICB2YXIgcmVxdWVzdD1pbmRleC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoeCkpO1xyXG4gICAgICAgIHNjb3BlLmRiUXVlcnlEYXRhID0gW107Ly/lnKhzY29wZS5kYlF1ZXJ5RGF0YeS4reWtmOWCqOaVsOaNrlxyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gbnVsbDtcclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2Vzcz1mdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdmFyIGN1cnNvcj1lLnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmKGN1cnNvcil7XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbj1jdXJzb3IudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5kYlF1ZXJ5RGF0YS5wdXNoKGpzb24pO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBcdGNiJiZjYigpOy8v5omn6KGM5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhZGREYXRhKG15REIsZGF0YSxjYil7Ly/mt7vliqDmlbDmja4sZGF0YeW/hemhu+S4ukFycmF557G75Z6LXHJcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uPW15REIuZGIudHJhbnNhY3Rpb24obXlEQi5uYW1lLCdyZWFkd3JpdGUnKTsgXHJcbiAgICAgICAgdmFyIHN0b3JlPXRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG15REIubmFtZSk7IFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgc3RvcmUuYWRkKGRhdGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYiYmY2IoKTsvL+WFqOmDqOaVsOaNrua3u+WKoOWujOaIkOWQjuaJp+ihjOWbnuiwg1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGVsZXRlRGF0YUJ5S2V5KG15REIsdmFsdWUpey8v5qC55o2u5L+d5a2Y55qE6ZSu5YC85Yig6Zmk5pWw5o2uXHJcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uPW15REIuZGIudHJhbnNhY3Rpb24obXlEQi5uYW1lLCdyZWFkd3JpdGUnKTsgXHJcbiAgICAgICAgdmFyIHN0b3JlPXRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG15REIubmFtZSk7IFxyXG4gICAgICAgIHN0b3JlLmRlbGV0ZSh2YWx1ZSk7IFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgIFx0aW5pdDpmdW5jdGlvbihzY29wZSxjYil7Ly/liJ3lp4vljJbmlbDmja7lupNcclxuICAgIFx0XHR2YXIgbXlEQiA9IHtcclxuICAgIFx0XHRcdG5hbWU6XCJjaGF0TXNnXCIsXHJcbiAgICBcdFx0XHRkYjpudWxsLFxyXG4gICAgXHRcdFx0dmVyc2lvbjoxXHJcbiAgICBcdFx0fVxyXG5cdFx0XHRvcGVuREIgKG15REIsc2NvcGUsY2IpXHJcbiAgICBcdH0sXHJcbiAgICBcdGdldDpmdW5jdGlvbihzY29wZSxjaGF0SWQsY2Ipey8v6I635Y+W5pWw5o2uXHJcbiAgICBcdFx0dmFyIG15REIgPSB7XHJcbiAgICBcdFx0XHRuYW1lOlwiY2hhdE1zZ1wiLFxyXG4gICAgXHRcdFx0ZGI6bnVsbCxcclxuICAgIFx0XHRcdHZlcnNpb246MVxyXG4gICAgXHRcdH1cclxuICAgIFx0XHRvcGVuREIobXlEQixzY29wZSxmdW5jdGlvbigpe1xyXG4gICAgXHRcdFx0Z2V0RGF0YUJ5SW5kZXgobXlEQi5kYixteURCLm5hbWUsXCJjaGF0SWRJbmRleFwiLGNoYXRJZCxzY29wZSxjYik7XHJcbiAgICBcdFx0fSlcclxuICAgIFx0fSxcclxuICAgIFx0YWRkOmZ1bmN0aW9uKHNjb3BlLGRhdGEsY2Ipey8v5re75Yqg5pWw5o2u77yM5Y+C5pWwZGF0YeW/hemhu+S4ukFycmF557G75Z6L5pWw5o2uXHJcbiAgICBcdFx0dmFyIG15REIgPSB7XHJcbiAgICBcdFx0XHRuYW1lOlwiY2hhdE1zZ1wiLFxyXG4gICAgXHRcdFx0ZGI6bnVsbCxcclxuICAgIFx0XHRcdHZlcnNpb246MVxyXG4gICAgXHRcdH1cclxuICAgIFx0XHRvcGVuREIobXlEQixzY29wZSxmdW5jdGlvbigpe1xyXG4gICAgXHRcdFx0YWRkRGF0YShteURCLGRhdGEsY2IpO1xyXG4gICAgXHRcdH0pXHJcbiAgICBcdH0sXHJcbiAgICBcdGRlbGV0ZTpmdW5jdGlvbihzY29wZSxjaGF0SWQsY2Ipe1xyXG4gICAgXHRcdHZhciBteURCID0ge1xyXG4gICAgXHRcdFx0bmFtZTpcImNoYXRNc2dcIixcclxuICAgIFx0XHRcdGRiOm51bGwsXHJcbiAgICBcdFx0XHR2ZXJzaW9uOjFcclxuICAgIFx0XHR9XHJcbiAgICBcdFx0b3BlbkRCKG15REIsc2NvcGUsZnVuY3Rpb24oKXtcclxuICAgIFx0XHRcdGdldERhdGFCeUluZGV4KG15REIuZGIsbXlEQi5uYW1lLGNoYXRJZCxzY29wZSxmdW5jdGlvbigpey8v6I635Y+W6KaB5Yig6Zmk55qE5pWw5o2uXHJcbiAgICBcdFx0XHRcdHZhciBkZWxlRGF0YSA9IHNjb3BlLmRiUXVlcnlEYXRhO1xyXG5cdCAgICBcdFx0XHRmb3IodmFyIGk9MDtpPGRlbGVEYXRhLmxlbmd0aDtpKyspey8v6YGN5Y6G5omA5pyJ55qE5b6F5Yig6Zmk55qE5pWw5o2u77yM6L+b6KGM5Yig6Zmk5pON5L2cXHJcblx0ICAgIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBkZWxldGVEYXRhQnlLZXkobXlEQixkZWxlRGF0YVtpXS5tc2dJZCk7XHJcblx0ICAgIFx0XHRcdH1cclxuXHQgICAgXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpe1xyXG5cdCAgICBcdFx0XHRcdGNvbnNvbGUubG9nKFwiZGVsZXRlIHN1Y2Nlc3MhXCIpO1xyXG5cdCAgICBcdFx0XHR9XHJcbiAgICBcdFx0XHR9KTtcclxuICAgIFx0XHR9KVxyXG4gICAgXHR9XHJcbiAgICB9XHJcbn0pIiwiLyoqXHJcbiAqIG5hbWU6IHRtLnBhZ2luYXRpb25cclxuICogVmVyc2lvbjogMS4wLjAgYmV0YVxyXG4gKi9cclxuYW5ndWxhci5tb2R1bGUoJ3RtLnBhZ2luYXRpb24nLCBbXSkuZGlyZWN0aXZlKCd0bVBhZ2luYXRpb24nLFtmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJwYWdlLWxpc3RcIj4nICtcclxuICAgICAgICAgICAgJzx1bCBjbGFzcz1cInBhZ2luYXRpb25cIiBuZy1zaG93PVwiY29uZi50b3RhbEl0ZW1zID4gMFwiPicgK1xyXG4gICAgICAgICAgICAnPGxpIG5nLWNsYXNzPVwie2Rpc2FibGVkOiBjb25mLmN1cnJlbnRQYWdlID09IDF9XCIgbmctY2xpY2s9XCJwcmV2UGFnZSgpXCI+PHNwYW4+JmxhcXVvOzwvc3Bhbj48L2xpPicgK1xyXG4gICAgICAgICAgICAnPGxpIG5nLXJlcGVhdD1cIml0ZW0gaW4gcGFnZUxpc3QgdHJhY2sgYnkgJGluZGV4XCIgbmctY2xhc3M9XCJ7YWN0aXZlOiBpdGVtID09IGNvbmYuY3VycmVudFBhZ2UsIHNlcGFyYXRlOiBpdGVtID09IFxcJy4uLlxcJ31cIiAnICtcclxuICAgICAgICAgICAgJ25nLWNsaWNrPVwiY2hhbmdlQ3VycmVudFBhZ2UoaXRlbSlcIj4nICtcclxuICAgICAgICAgICAgJzxzcGFuPnt7IGl0ZW0gfX08L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8L2xpPicgK1xyXG4gICAgICAgICAgICAnPGxpIG5nLWNsYXNzPVwie2Rpc2FibGVkOiBjb25mLmN1cnJlbnRQYWdlID09IGNvbmYubnVtYmVyT2ZQYWdlc31cIiBuZy1jbGljaz1cIm5leHRQYWdlKClcIj48c3Bhbj4mcmFxdW87PC9zcGFuPjwvbGk+JyArXHJcbiAgICAgICAgICAgICc8L3VsPicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhZ2UtdG90YWxcIiBuZy1zaG93PVwiY29uZi50b3RhbEl0ZW1zID4gMFwiPicgK1xyXG4gICAgICAgICAgICAn5q+P6aG1PHNlbGVjdCBuZy1tb2RlbD1cImNvbmYuaXRlbXNQZXJQYWdlXCIgbmctb3B0aW9ucz1cIm9wdGlvbiBmb3Igb3B0aW9uIGluIGNvbmYucGVyUGFnZU9wdGlvbnMgXCIgbmctY2hhbmdlPVwiY2hhbmdlSXRlbXNQZXJQYWdlKClcIj48L3NlbGVjdD4nICtcclxuICAgICAgICAgICAgJy/lhbE8c3Ryb25nPnt7IGNvbmYudG90YWxJdGVtcyB9fTwvc3Ryb25nPuadoSAnICtcclxuICAgICAgICAgICAgJ+i3s+i9rOiHszxpbnB1dCB0eXBlPVwidGV4dFwiIG5nLW1vZGVsPVwianVtcFBhZ2VOdW1cIiBuZy1rZXl1cD1cImp1bXBQYWdlS2V5VXAoJGV2ZW50KVwiLz4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm5vLWl0ZW1zXCIgbmctc2hvdz1cImNvbmYudG90YWxJdGVtcyA8PSAwXCI+5pqC5peg5pWw5o2uPC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nLFxyXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgY29uZjogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjb25mID0gc2NvcGUuY29uZjtcclxuXHJcbiAgICAgICAgICAgIC8vIOm7mOiupOWIhumhtemVv+W6plxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdFBhZ2VzTGVuZ3RoID0gOTtcclxuXHJcbiAgICAgICAgICAgIC8vIOm7mOiupOWIhumhtemAiemhueWPr+iwg+aVtOavj+mhteaYvuekuueahOadoeaVsFxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdFBlclBhZ2VPcHRpb25zID0gWzEwLCAxNSwgMjAsIDMwLCA1MF07XHJcblxyXG4gICAgICAgICAgICAvLyDpu5jorqTmr4/pobXnmoTkuKrmlbBcclxuICAgICAgICAgICAgdmFyIGRlZmF1bHRQZXJQYWdlID0gMTU7XHJcblxyXG4gICAgICAgICAgICAvLyDojrflj5bliIbpobXplb/luqZcclxuICAgICAgICAgICAgaWYoY29uZi5wYWdlc0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5LiA5LiL5YiG6aG16ZW/5bqmXHJcbiAgICAgICAgICAgICAgICBjb25mLnBhZ2VzTGVuZ3RoID0gcGFyc2VJbnQoY29uZi5wYWdlc0xlbmd0aCwgMTApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFjb25mLnBhZ2VzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5wYWdlc0xlbmd0aCA9IGRlZmF1bHRQYWdlc0xlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDliIbpobXplb/luqblv4XpobvkuLrlpYfmlbDvvIzlpoLmnpzkvKDlgbbmlbDml7bvvIzoh6rliqjlpITnkIZcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYucGFnZXNMZW5ndGggJSAyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5wYWdlc0xlbmd0aCArPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbmYucGFnZXNMZW5ndGggPSBkZWZhdWx0UGFnZXNMZW5ndGhcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5YiG6aG16YCJ6aG55Y+v6LCD5pW05q+P6aG15pi+56S655qE5p2h5pWwXHJcbiAgICAgICAgICAgIGlmKCFjb25mLnBlclBhZ2VPcHRpb25zKXtcclxuICAgICAgICAgICAgICAgIGNvbmYucGVyUGFnZU9wdGlvbnMgPSBkZWZhdWx0UGFnZXNMZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHBhZ2VMaXN05pWw57uEXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBhZ2luYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGNvbmYuY3VycmVudFBhZ2VcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYuY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlID0gcGFyc2VJbnQoc2NvcGUuY29uZi5jdXJyZW50UGFnZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFjb25mLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uZi50b3RhbEl0ZW1zXHJcbiAgICAgICAgICAgICAgICBpZihjb25mLnRvdGFsSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLnRvdGFsSXRlbXMgPSBwYXJzZUludChjb25mLnRvdGFsSXRlbXMsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25mLnRvdGFsSXRlbXNcclxuICAgICAgICAgICAgICAgIGlmKCFjb25mLnRvdGFsSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLnRvdGFsSXRlbXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gY29uZi5pdGVtc1BlclBhZ2UgXHJcbiAgICAgICAgICAgICAgICBpZihjb25mLml0ZW1zUGVyUGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuaXRlbXNQZXJQYWdlID0gcGFyc2VJbnQoY29uZi5pdGVtc1BlclBhZ2UsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCFjb25mLml0ZW1zUGVyUGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuaXRlbXNQZXJQYWdlID0gZGVmYXVsdFBlclBhZ2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbnVtYmVyT2ZQYWdlc1xyXG4gICAgICAgICAgICAgICAgY29uZi5udW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHNjb3BlLmNvbmYudG90YWxJdGVtcy9jb25mLml0ZW1zUGVyUGFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5YiG6aG15oC75pWwPjDvvIzlubbkuJTlvZPliY3pobXlpKfkuo7liIbpobXmgLvmlbBcclxuICAgICAgICAgICAgICAgIGlmKHNjb3BlLmNvbmYubnVtYmVyT2ZQYWdlcyA+IDAgJiYgc2NvcGUuY29uZi5jdXJyZW50UGFnZSA+IHNjb3BlLmNvbmYubnVtYmVyT2ZQYWdlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZi5jdXJyZW50UGFnZSA9IHNjb3BlLmNvbmYubnVtYmVyT2ZQYWdlcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpxpdGVtc1BlclBhZ2XlnKjkuI3lnKhwZXJQYWdlT3B0aW9uc+aVsOe7hOS4re+8jOWwseaKiml0ZW1zUGVyUGFnZeWKoOWFpei/meS4quaVsOe7hOS4rVxyXG4gICAgICAgICAgICAgICAgdmFyIHBlclBhZ2VPcHRpb25zTGVuZ3RoID0gc2NvcGUuY29uZi5wZXJQYWdlT3B0aW9ucy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5a6a5LmJ54q25oCBXHJcbiAgICAgICAgICAgICAgICB2YXIgcGVyUGFnZU9wdGlvbnNTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcGVyUGFnZU9wdGlvbnNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5wZXJQYWdlT3B0aW9uc1tpXSA9PSBjb25mLml0ZW1zUGVyUGFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlclBhZ2VPcHRpb25zU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpxpdGVtc1BlclBhZ2XlnKjkuI3lnKhwZXJQYWdlT3B0aW9uc+aVsOe7hOS4re+8jOWwseaKiml0ZW1zUGVyUGFnZeWKoOWFpei/meS4quaVsOe7hOS4rVxyXG4gICAgICAgICAgICAgICAgaWYoIXBlclBhZ2VPcHRpb25zU3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLnBlclBhZ2VPcHRpb25zLnB1c2goY29uZi5pdGVtc1BlclBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWvuemAiemhuei/m+ihjHNvcnRcclxuICAgICAgICAgICAgICAgIGNvbmYucGVyUGFnZU9wdGlvbnMuc29ydChmdW5jdGlvbihhLCBiKSB7cmV0dXJuIGEgLSBifSk7XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDpobXnoIHnm7jlhbNcclxuICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpZihjb25mLm51bWJlck9mUGFnZXMgPD0gY29uZi5wYWdlc0xlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Yik5pat5oC76aG15pWw5aaC5p6c5bCP5LqO562J5LqO5YiG6aG155qE6ZW/5bqm77yM6Iul5bCP5LqO5YiZ55u05o6l5pi+56S6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGkgPTE7IGkgPD0gY29uZi5udW1iZXJPZlBhZ2VzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaAu+mhteaVsOWkp+S6juWIhumhtemVv+W6pu+8iOatpOaXtuWIhuS4uuS4ieenjeaDheWGte+8mjEu5bem6L655rKh5pyJLi4uMi7lj7PovrnmsqHmnIkuLi4zLuW3puWPs+mDveaciS4uLu+8iVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuoeeul+S4reW/g+WBj+enu+mHj1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAoY29uZi5wYWdlc0xlbmd0aCAtIDEpIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25mLmN1cnJlbnRQYWdlIDw9IG9mZnNldCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW3pui+ueayoeaciS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gb2Zmc2V0ICsgMTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgnLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5udW1iZXJPZlBhZ2VzKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb25mLmN1cnJlbnRQYWdlID4gY29uZi5udW1iZXJPZlBhZ2VzIC0gb2Zmc2V0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgnLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihpID0gb2Zmc2V0ICsgMTsgaSA+PSAxOyBpLS0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLm51bWJlck9mUGFnZXMgLSBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYubnVtYmVyT2ZQYWdlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOacgOWQjuS4gOenjeaDheWGte+8jOS4pOi+uemDveaciS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKCcuLi4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihpID0gTWF0aC5jZWlsKG9mZnNldCAvIDIpIDsgaSA+PSAxOyBpLS0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLmN1cnJlbnRQYWdlIC0gaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDw9IG9mZnNldCAvIDI7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYuY3VycmVudFBhZ2UgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgnLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5udW1iZXJPZlBhZ2VzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudC5jb25mID0gY29uZjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcHJldlBhZ2VcclxuICAgICAgICAgICAgc2NvcGUucHJldlBhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYuY3VycmVudFBhZ2UgPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5leHRQYWdlXHJcbiAgICAgICAgICAgIHNjb3BlLm5leHRQYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjb25mLmN1cnJlbnRQYWdlIDwgY29uZi5udW1iZXJPZlBhZ2VzKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIOWPmOabtOW9k+WJjemhtVxyXG4gICAgICAgICAgICBzY29wZS5jaGFuZ2VDdXJyZW50UGFnZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0gPT0gJy4uLicpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuY3VycmVudFBhZ2UgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmNvbmYuY3VycmVudFBhZ2UgPWl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbmYub25DaGFuZ2UoKeWHveaVsFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmYub25DaGFuZ2UpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYub25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyDkv67mlLnmr4/pobXlsZXnpLrnmoTmnaHmlbBcclxuICAgICAgICAgICAgc2NvcGUuY2hhbmdlSXRlbXNQZXJQYWdlID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5LiA5Y+R5bGV56S65p2h5pWw5Y+Y5pu077yM5b2T5YmN6aG15bCG6YeN572u5Li6MVxyXG4gICAgICAgICAgICAgICAgc2NvcGUuY29uZi5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb25mKTtcclxuICAgICAgICAgICAgICAgIGdldFBhZ2luYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbmYub25DaGFuZ2UoKeWHveaVsFxyXG4gICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25mLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyDot7PovazpobVcclxuICAgICAgICAgICAgc2NvcGUuanVtcFRvUGFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbnVtID0gc2NvcGUuanVtcFBhZ2VOdW07XHJcbiAgICAgICAgICAgICAgICBpZihudW0ubWF0Y2goL1xcZCsvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSA9IHBhcnNlSW50KG51bSwgMTApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobnVtICYmIG51bSAhPSBjb25mLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG51bSA+IGNvbmYubnVtYmVyT2ZQYWdlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gY29uZi5udW1iZXJPZlBhZ2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDot7PovaxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25mLm9uQ2hhbmdlKCnlh73mlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYub25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5qdW1wUGFnZU51bSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2NvcGUuanVtcFBhZ2VLZXlVcCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXljb2RlID0gd2luZG93LmV2ZW50ID8gZS5rZXlDb2RlIDplLndoaWNoO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuanVtcFRvUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ2NvbmYudG90YWxJdGVtcycsIGZ1bmN0aW9uKHZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyDlnKjml6DlgLzmiJblgLznm7jnrYnnmoTml7blgJnvvIzljrvmiafooYxvbkNoYW5nZeS6i+S7tlxyXG4gICAgICAgICAgICAgICAgaWYoIXZhbHVlIHx8IHZhbHVlID09IG9sZFZhbHVlKSB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdldFBhZ2luYXRpb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdyb3V0ZXInLFtcclxuXHQnaG9tZS5yb3V0ZXInLFxyXG5cdCdrZi5yb3V0ZXInLFxyXG5cdCdsb2dpbi5yb3V0ZXInLFxyXG5cdCdyZWdpc3Rlci5yb3V0ZXInLFxyXG5cdCdmbG93LnJvdXRlcicsXHJcblx0J2NvbXBhbnkucm91dGVyJyxcclxuXHQncHJvZHVjdC5yb3V0ZXInLFxyXG5cdCdhZ3JlZW1lbnQucm91dGVyJyxcclxuXSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJywnJGxvY2F0aW9uUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlciwkbG9jYXRpb25Qcm92aWRlcil7XHJcblx0Ly8gJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcclxuXHQvLyAgICAgZW5hYmxlZDogdHJ1ZSxcclxuXHQvLyAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXHJcblx0Ly8gfSk7XHJcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnbG9naW4nKTtcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY29tcGFueS5jdHJsJyxbXSlcclxuLmNvbnRyb2xsZXIoJ2NvbXBhbnlDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhKXtcclxuXHQkc2NvcGUubGlzdCA9IERhdGEuZ2V0RGF0YSgnY29tcGFueScpLmxpc3Q7XHJcbn1dKVxyXG4uY29udHJvbGxlcignY29tcGFueU1hbmFnZUN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3Qpe1xyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRmbGFnOjEsXHJcblx0fTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VhcmNoKCRzY29wZS5zZWFyY2hLZXkpO1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZENvbXBhbnlDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuY29tcGFueT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdC8vIGFyZWE6JycsXHJcblx0XHQvLyBjaXR5OicnLFxyXG5cdFx0Y2xhc3NUeXBlOicnLFxyXG5cdH07XHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnYWRkQ29tcGFueScpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5jb21wYW55KX0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5jb21wYW55LmNvbXBhbnlNYW5hZ2UnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdlZGl0Q29tcGFueUN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsJyRzdGF0ZVBhcmFtcycsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3QsJHN0YXRlUGFyYW1zKXtcclxuXHQkc2NvcGUuY29tcGFueT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTonJyxcclxuXHRcdC8vIGFyZWE6JycsXHJcblx0XHQvLyBjaXR5OicnLFxyXG5cdFx0bWVyY2hJZDonJ1xyXG5cdH07XHJcblx0aWYoJHN0YXRlUGFyYW1zLm9iail7XHJcblx0XHQkc2NvcGUuY29tcGFueT0kc3RhdGVQYXJhbXMub2JqO1xyXG5cdFx0JHNjb3BlLmNvbXBhbnkuY2xhc3NUeXBlPVN0cmluZygkc2NvcGUuY29tcGFueS5jbGFzc1R5cGUpO1xyXG5cdH1cclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMub2JqKVxyXG5cdCRzY29wZS5zYXZlPWZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2VkaXRDb21wYW55JyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmNvbXBhbnkpfSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmNvbXBhbnkuY29tcGFueU1hbmFnZScpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHJcblx0XHR9KVxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2NvbXBhbnkucm91dGVyJyxbJ2NvbXBhbnkuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ2hvbWUuY29tcGFueScse1xyXG5cdFx0dXJsOicvY29tcGFueScsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NvbXBhbnkvY29tcGFueS5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2NvbXBhbnlDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmNvbXBhbnkuY29tcGFueU1hbmFnZScse1xyXG5cdFx0dXJsOicvY29tcGFueU1hbmFnZScsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NvbXBhbnkvY29tcGFueU1hbmFnZS5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2NvbXBhbnlNYW5hZ2VDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuY29tcGFueS5hZGRDb21wYW55Jyx7XHJcblx0XHR1cmw6Jy9hZGRDb21wYW55JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvY29tcGFueS9hZGRDb21wYW55Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRkQ29tcGFueUN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuY29tcGFueS5lZGl0Q29tcGFueScse1xyXG5cdFx0dXJsOicvZWRpdENvbXBhbnknLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9jb21wYW55L2NvbXBhbnlFZGl0Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZWRpdENvbXBhbnlDdHJsJyxcclxuXHRcdHBhcmFtczoge1xyXG5cdCAgICAgICAgb2JqOiBudWxsIFxyXG5cdCAgICB9XHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2Zsb3cuY3RybCcsWydwdWJ1bGljJywnZGF0YSddKVxyXG4uY29udHJvbGxlcignZmxvd0N0cmwnLFsnJHNjb3BlJywnRGF0YScsJyR0aW1lb3V0JywnVGlwJyxmdW5jdGlvbigkc2NvcGUsRGF0YSwkdGltZW91dCxUaXApe1xyXG5cdCRzY29wZS5saXN0ID0gRGF0YS5nZXREYXRhKCdmbG93RGF0YScpLmxpc3Q7XHJcbn1dKVxyXG4uY29udHJvbGxlcignZmxvd2dsQ3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCl7XHJcblx0JHNjb3BlLnNlYXJjaE1zZyA9IHt9O1xyXG5cdCRzY29wZS5zZWFyY2hNc2cuc3RhcnREYXRlID0gJyc7XHJcblx0ZnVuY3Rpb24gZ2V0bGlzdCgpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2Zsb3dMaXN0JyksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGpzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLnNlYXJjaE1zZylcclxuXHRcdFx0fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEucmVzdWx0O1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGdldGxpc3QoKTtcclxuXHQkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKXtcclxuXHRcdGdldGxpc3QoKTtcclxuXHR9XHJcblx0JHNjb3BlLmJqWmQgPSBmdW5jdGlvbih4KXtcclxuXHRcdCRzdGF0ZS5nbygnaG9tZS5mbG93LmJqZmxvdycse1xyXG5cdFx0XHRpZDp4LmZsb3dJZCxcclxuXHRcdFx0b2JqOnhcclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZGZsb3dDdHJsJyxbJyRzY29wZScsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnVGlwJywnZ3JvdXBzUm9sZXMnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsVGlwLCRzdGF0ZSxVcmwsJGh0dHAsVGlwLGdyb3Vwc1JvbGVzLEh0dHApe1xyXG5cdCRzY29wZS55ZWFyc0xpc3QgPSBbXTtcclxuXHQkc2NvcGUubW9udGhMaXN0ID0gW107XHJcblx0JHNjb3BlLm15TXNnID0ge1xyXG5cdFx0aW1wVHlwZTonJyxcclxuXHRcdGltcFllYXI6JycsXHJcblx0XHRpbXBNb250aDonJyxcclxuXHRcdGRlbEZsYWc6JzAnLFxyXG5cdFx0cGF0aExpc3Q6JydcclxuXHR9O1xyXG5cdGZvcih2YXIgaSA9IDIwMTc7aTw9MjA1MDtpKyspe1xyXG5cdFx0JHNjb3BlLnllYXJzTGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHRmb3IodmFyIGkgPSAxO2k8PTEyO2krKyl7XHJcblx0XHQkc2NvcGUubW9udGhMaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdCRzY29wZS5kZWxlZmxvdyA9IGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbXlkZWxlTXNnID0ge1xyXG5cdFx0XHRpbXBUeXBlOiRzY29wZS5teU1zZy5pbXBUeXBlLFxyXG5cdFx0XHRpbXBZZWFyOiRzY29wZS5teU1zZy5pbXBZZWFyLFxyXG5cdFx0XHRpbXBNb250aDokc2NvcGUubXlNc2cuaW1wTW9udGgsXHJcblx0XHRcdGRlbEZsYWc6JzEnLFxyXG5cdFx0XHRwYXRoTGlzdDokc2NvcGUubXlNc2cucGF0aExpc3RcclxuXHRcdH07XHJcblx0XHRpZighJHNjb3BlLm15TXNnLmltcFR5cGV8fCEkc2NvcGUubXlNc2cuaW1wWWVhcnx8ISRzY29wZS5teU1zZy5pbXBNb250aCl7XHJcblx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6J+ivt+WFiOmAieaLqeadoeS7ticsdHlwZTowfSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybChcImltcG9ydEZsb3dGaWxlXCIpLFxyXG5cdFx0XHRkYXRhOntcclxuXHRcdFx0XHRqc29uOkpTT04uc3RyaW5naWZ5KG15ZGVsZU1zZylcclxuXHRcdFx0fVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5mbG93LmZsb3dnbCcpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS51cGxvYWQgPSBmdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5ieUZvcm0oe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgndXBsb2FkRmxvd0ZpbGUnKSxcclxuXHRcdFx0ZmlsZU5hbWU6J2ZpbGUnLFxyXG5cdFx0XHRtdWx0aXBsZTpcIm11bHRpcGFydFwiLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5wYXRoTGlzdCA9IEpTT04ucGFyc2UoZGF0YS5wYXRoTGlzdCk7XHJcblx0XHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9KTtcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuZmxvdyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZighJHNjb3BlLm15TXNnLmltcFR5cGV8fCEkc2NvcGUubXlNc2cuaW1wWWVhcnx8ISRzY29wZS5teU1zZy5pbXBNb250aHx8ISRzY29wZS5teU1zZy5wYXRoTGlzdCl7XHJcblx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6J+ivt+WFiOmAieaLqeadoeS7ticsdHlwZTowfSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybChcImltcG9ydEZsb3dGaWxlXCIpLFxyXG5cdFx0XHRkYXRhOntcclxuXHRcdFx0XHRqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5teU1zZylcclxuXHRcdFx0fVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5mbG93LmZsb3dnbCcpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2JqZmxvd0N0cmwnLFsnJHNjb3BlJywnJHN0YXRlUGFyYW1zJywnVGlwJywnJHN0YXRlJywnVXJsJywnJGh0dHAnLCdUaXAnLCdncm91cHNSb2xlcycsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSwkc3RhdGVQYXJhbXMsVGlwLCRzdGF0ZSxVcmwsJGh0dHAsVGlwLGdyb3Vwc1JvbGVzLEh0dHApe1xyXG5cdGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcyk7XHJcblx0JHNjb3BlLm15TXNnID0gJHN0YXRlUGFyYW1zLm9ianx8e307XHJcbn1dKVxyXG4uY29udHJvbGxlcignc2V0dGxlbWVudEN0cmwnLFsnJHNjb3BlJywnVGlwJywnJHN0YXRlJywnVXJsJywnJGh0dHAnLCdUaXAnLCdncm91cHNSb2xlcycsJ0h0dHAnLCdHZXRMaXN0JyxmdW5jdGlvbigkc2NvcGUsVGlwLCRzdGF0ZSxVcmwsJGh0dHAsVGlwLGdyb3Vwc1JvbGVzLEh0dHAsR2V0TGlzdCl7XHJcblx0JHNjb3BlLnNlYXJjaE1zZyA9IHt9O1xyXG5cdCRzY29wZS5zZWFyY2hNc2cuc3RhcnREYXRlID0gJyc7XHJcblx0ZnVuY3Rpb24gZ2V0bGlzdCgpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2dldHNldHRsZW1lbnRMaXN0JyksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGpzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLnNlYXJjaE1zZylcclxuXHRcdFx0fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEucmVzdWx0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Z2V0bGlzdCgpO1xyXG5cdCRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0Z2V0bGlzdCgpO1xyXG5cdH1cclxuXHQvL+S4iuasoee7k+eul+aXtumXtFxyXG5cdCRzY29wZS5zZXR0bGVtZW50RGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLmdldCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdsYXRlc3QnKVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdCRzY29wZS5sYXN0RGF0ZT1kYXRhLmRhdGU7XHJcblx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNldHRsZW1lbnREYXRlKCk7XHJcblx0JHNjb3BlLnNldHRsZW1lbnQgPSBmdW5jdGlvbih4KXtcclxuXHRcdEh0dHAuZ2V0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2dvU2V0dGxlbWVudCcpKycvJyt4LnJlYmF0ZUlkXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Z2V0bGlzdCgpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLmNhbmNlbFNldHRsZW1lbnQgPSBmdW5jdGlvbih4KXtcclxuXHRcdEh0dHAuZ2V0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NhbmNlbFNldHRsZW1lbnQnKSsnLycreC5yZWJhdGVJZFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGdldGxpc3QoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5oYW5kbGVTZXR0bGUgPSBmdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdoYW5kbGVTZXR0bGVtZW50JylcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRnZXRsaXN0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnZmxvdy5yb3V0ZXInLFsnZmxvdy5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnaG9tZS5mbG93Jyx7XHJcblx0XHR1cmw6Jy9mbG93JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL2Zsb3cuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidmbG93Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5mbG93LmZsb3dnbCcse1xyXG5cdFx0dXJsOicvZmxvd2dsJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL2Zsb3cvZmxvd0dsLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZmxvd2dsQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5mbG93LmFkZGZsb3cnLHtcclxuXHRcdHVybDonL2Zsb3dnbC9hZGRmbG93JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL2Zsb3cvYWRkRmxvdy5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FkZGZsb3dDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmZsb3cuYmpmbG93Jyx7XHJcblx0XHR1cmw6Jy9mbG93Z2wvOmlkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZmxvd3RvL2Zsb3cvYmpGbG93Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYmpmbG93Q3RybCcsXHJcblx0XHRwYXJhbXM6e1xyXG5cdFx0XHRvYmo6bnVsbFxyXG5cdFx0fVxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmZsb3cuc2V0dGxlbWVudCcse1xyXG5cdFx0dXJsOicvc2V0dGxlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Zsb3d0by9zZXR0bGVtZW50L3NldHRsZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidzZXR0bGVtZW50Q3RybCcsXHJcblx0XHRwYXJhbXM6e1xyXG5cdFx0XHRvYmo6bnVsbFxyXG5cdFx0fVxyXG5cdH0pXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKFwiaG9tZS5jdHJsXCIsW1wicHVidWxpY1wiLCdkYXRhJ10pXHJcbi5jb250cm9sbGVyKFwiaG9tZUN0cmxcIixbJyRzY29wZScsJ0RhdGEnLCckc3RhdGVQYXJhbXMnLCckaHR0cCcsJ1VybCcsXCIkdGltZW91dFwiLCdIdHRwJywnVGlwJywnJHN0YXRlJyxmdW5jdGlvbigkc2NvcGUsRGF0YSwkc3RhdGVQYXJhbXMsJGh0dHAsVXJsLCR0aW1lb3V0LEh0dHAsVGlwLCRzdGF0ZSl7XHJcblx0Ly/nlKjmiLfkv6Hmga/nvJPlrZhcclxuXHQvLyBpZigkc3RhdGVQYXJhbXMudXNlcil7XHJcblx0Ly8gXHQkc2NvcGUudXNlclByaXZhdGVVcmw9JHN0YXRlUGFyYW1zLnVzZXIudXNlclByaXZhdGVVcmw7XHJcblx0Ly8gXHQkc2NvcGUudXNlcklkPSRzdGF0ZVBhcmFtcy51c2VyLmVtcGxveWVlSWQ7XHJcblx0Ly8gXHR2YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkoJHN0YXRlUGFyYW1zKTtcclxuXHQvLyBcdHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3N0YXRlUGFyYW1zJyxzdHIpO1xyXG5cdC8vIH1lbHNle1x0XHJcblx0Ly8gXHR2YXIganNvbiA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc3RhdGVQYXJhbXMnKSk7XHJcblx0Ly8gXHQkc2NvcGUudXNlclByaXZhdGVVcmw9anNvbi51c2VyLnVzZXJQcml2YXRlVXJsO1xyXG5cdC8vIFx0JHNjb3BlLnVzZXJJZD1qc29uLnVzZXIuZW1wbG95ZWVJZDtcclxuXHQvLyB9XHJcblx0JHNjb3BlLm1lbnU9e307XHJcblx0JHNjb3BlLm1lbnUua2YgPSBEYXRhLmdldERhdGEoJ2tmRGF0YScpLnRpdGxlO1xyXG5cdCRzY29wZS5tZW51LmZsb3cgPSBEYXRhLmdldERhdGEoJ2Zsb3dEYXRhJykudGl0bGU7XHJcblx0JHNjb3BlLm1lbnUucHJvZHVjdCA9IERhdGEuZ2V0RGF0YSgncHJvZHVjdCcpLnRpdGxlO1xyXG5cdCRzY29wZS5tZW51LmFncmVlbWVudCA9IERhdGEuZ2V0RGF0YSgnYWdyZWVtZW50JykudGl0bGU7XHJcblx0JHNjb3BlLm1lbnUuY29tcGFueSA9IERhdGEuZ2V0RGF0YSgnY29tcGFueScpLnRpdGxlO1xyXG5cdCRzY29wZS5nZXR1c2VybmFtZT1mdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCd1c2VybmFtZScpLFxyXG5cdFx0XHRkYXRhOnt9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHQkc2NvcGUudXNlcm5hbWU9ZGF0YS51c2VybmFtZTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0Ly8gVGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdC8vIFx0JHN0YXRlLmdvKCdob21lLmxvZ2luJyk7XHJcblx0XHRcdFx0Ly8gfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLmdldHVzZXJuYW1lKCk7XHJcblx0JHNjb3BlLmxvZ2lub3V0PWZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2xvZ291dCcpLFxyXG5cdFx0XHRkYXRhOnt9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW4nKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2xvZ2luJyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2RhdGEnLFtdKVxyXG4uZmFjdG9yeSgnRGF0YScsZnVuY3Rpb24oKXtcclxuXHR2YXIgZGF0YT17XHJcblx0XHRrZkRhdGE6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J+WuouacjeS4reW/gycsXHJcblx0XHRcdCdzdGF0ZSc6Jy5LRicsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5a6i5pyN566h55CGJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOiflrqLmnI3liJfooagnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRl9sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a3u+WKoOWuouacjScsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGX2FkZEtmeidcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5a6i5pyN57uEJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOiflrqLmnI3nu4TliJfooagnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRlpfbGInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifmt7vliqDlrqLmnI3nu4QnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRlpfYWRkS2Z6J1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifop5LoibLnrqHnkIYnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+inkuiJsuWIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0pTX2xiJ1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5re75Yqg5a6i5pyN57uEJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfSlNfYWRkSnMnXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGdkRGF0YTpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon5bel5Y2V566h55CGJyxcclxuXHRcdFx0J3N0YXRlJzonLkdEJyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmiJHnmoTmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+S8mOWFiOacquino+WGs+W3peWNlScsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonS0ZfR0RfeXh3amonXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifkuIDoiKzmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6J0tGX0dEX3lid2pqJ1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifnu4TlhoXmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmiYDmnInmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmiJHnmoTlt7Lop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmiYDmnInlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRjaGF0RGF0YTpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzonSU3ljbPml7bpgJrorq8nLFxyXG5cdFx0XHQnc3RhdGUnOicuY2hhdCcsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5b2T5YmN5Lya6K+dJyxcclxuXHRcdFx0XHRcdC8vJ2xpc3QnOmNoYXQuY3VycmVudE1lc3NhZ2Uoc2NvcGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifljoblj7LkvJror50nLFxyXG5cdFx0XHRcdFx0Ly8nbGlzdCc6Y2hhdC5oaXN0b3J5TWVzc2FnZShzY29wZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGNvbmZpZzpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon6YWN572uJyxcclxuXHRcdFx0J3N0YXRlJzonLmNvbmZpZycsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5rig6YGT6YWN572uJyxcclxuXHRcdFx0XHRcdC8vJ2xpc3QnOmNoYXQuY3VycmVudE1lc3NhZ2Uoc2NvcGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifphY3nva7pgInpobknLFxyXG5cdFx0XHRcdFx0Ly8nbGlzdCc6Y2hhdC5oaXN0b3J5TWVzc2FnZShzY29wZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRcdFxyXG5cdHJldHVybiB7XHJcblx0XHRnZXREYXRhOmZ1bmN0aW9uKGlkKXtcclxuXHRcdFx0Zm9yKHggaW4gZGF0YSl7XHJcblx0XHRcdFx0aWYoaWQ9PXgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRhdGFbeF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFx0XHJcblxyXG5cdFxyXG59KSIsImFuZ3VsYXIubW9kdWxlKCdob21lLnJvdXRlcicsWydob21lLmN0cmwnXSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJyxmdW5jdGlvbigkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgIC5zdGF0ZSgnaG9tZScsIHtcclxuICAgICAgICB1cmw6ICcvaG9tZScsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9ob21lL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcclxuICAgICAgICBwYXJhbXM6e1xyXG4gICAgICAgIFx0dXNlcjpudWxsLFxyXG4gICAgICAgIFx0cGVybWlzc2lvbnM6bnVsbCxcclxuICAgICAgICAgIGdyb3VwRGF0YTpudWxsLFxyXG4gICAgICAgICAgcm9sZURhdGE6bnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgna2YuY3RybCcsWydwdWJ1bGljJywnZGF0YSddKVxyXG4uY29udHJvbGxlcigna2ZDdHJsJyxbJyRzY29wZScsJ0RhdGEnLCckdGltZW91dCcsJ1RpcCcsZnVuY3Rpb24oJHNjb3BlLERhdGEsJHRpbWVvdXQsVGlwKXtcclxuXHQkc2NvcGUubGlzdCA9IERhdGEuZ2V0RGF0YSgna2ZEYXRhJykubGlzdDtcclxufV0pXHJcbi5jb250cm9sbGVyKCdrZmdsQ3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCl7XHJcblx0JHNjb3BlLnF1ZXJ5SG9zcGl0YWxUeHQgPSBcIlwiO1x0XHJcblx0ZnVuY3Rpb24gZ2V0bGlzdCgpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3pkTGlzdCcpLFxyXG5cdFx0XHRkYXRhOntcclxuXHRcdFx0XHRob3NwaXRhbE5hbWU6JHNjb3BlLnF1ZXJ5SG9zcGl0YWxUeHQsXHJcblx0XHRcdFx0ZmxhZzoxXHJcblx0XHRcdH0sXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QgPSBkYXRhLmhvc3BpdGFscztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGdldGxpc3QoKTtcclxuXHQkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKXtcclxuXHRcdGdldGxpc3QoKTtcclxuXHR9XHJcblx0JHNjb3BlLmJqWmQgPSBmdW5jdGlvbih4KXtcclxuXHRcdCRzdGF0ZS5nbygnaG9tZS5rZi5iamtmJyx7XHJcblx0XHRcdGlkOnguaG9zcGl0YWxJZFxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRka2ZDdHJsJyxbJyRzY29wZScsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnVGlwJywnZ3JvdXBzUm9sZXMnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsVGlwLCRzdGF0ZSxVcmwsJGh0dHAsVGlwLGdyb3Vwc1JvbGVzLEh0dHApe1xyXG5cdCRzY29wZS5teU1zZyA9IHt9O1xyXG5cdCRzY29wZS5zYXZlTXNnID0gZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5teU1zZy56b25lSWQgPSAkc2NvcGUubXlBcmVhO1xyXG5cdFx0JHNjb3BlLm15TXNnLmNpdHlJZCA9ICRzY29wZS5teUNpdHk7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZFpkJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKX1cclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUua2Yua2ZnbCcpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2Jqa2ZDdHJsJyxbJyRzY29wZScsJyRzdGF0ZVBhcmFtcycsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnVGlwJywnZ3JvdXBzUm9sZXMnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsJHN0YXRlUGFyYW1zLFRpcCwkc3RhdGUsVXJsLCRodHRwLFRpcCxncm91cHNSb2xlcyxIdHRwKXtcclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xyXG5cdCRzY29wZS5teU1zZyA9IHt9O1xyXG5cdEh0dHAuZ2V0KHtcclxuXHRcdHVybDpVcmwuZ2V0VXJsKCdxdWVyeVpkJykrJy8nKyRzdGF0ZVBhcmFtcy5pZFxyXG5cdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmhvc3BpdGFsTmFtZSA9IGRhdGEuaG9zcGl0YWwuaG9zcGl0YWxOYW1lO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuaG9zcGl0YWxJZCA9IGRhdGEuaG9zcGl0YWwuaG9zcGl0YWxJZDtcclxuXHRcdFx0JHNjb3BlLm15TXNnLnR5cGUgPSBKU09OLnN0cmluZ2lmeShkYXRhLmhvc3BpdGFsLnR5cGUpO1xyXG5cdFx0XHQkc2NvcGUubXlBcmVhID0gZGF0YS5ob3NwaXRhbC56b25lSWQ7XHJcblx0XHRcdCRzY29wZS5teUNpdHkgPSBkYXRhLmhvc3BpdGFsLmNpdHlJZDtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OifmnI3liqHnq6/lvILluLgnLHR5cGU6MH0pXHJcblx0XHR9XHJcblx0fSlcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUubXlNc2cuem9uZUlkID0gJHNjb3BlLm15QXJlYTtcclxuXHRcdCRzY29wZS5teU1zZy5jaXR5SWQgPSAkc2NvcGUubXlDaXR5O1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdialpkJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKX1cclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKFwiaG9tZS5rZi5rZmdsXCIpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2tmemdsQ3RybCcsWyckc2NvcGUnLCckc3RhdGVQYXJhbXMnLCdUaXAnLCckc3RhdGUnLCdVcmwnLCckaHR0cCcsJ0dldExpc3QnLCckdGltZW91dCcsZnVuY3Rpb24oJHNjb3BlLCRzdGF0ZVBhcmFtcyxUaXAsJHN0YXRlLFVybCwkaHR0cCxHZXRMaXN0LCR0aW1lb3V0KXtcclxuICAgJHNjb3BlLnF1ZXJ5Q3VzdG9tZXJUeHQgPSBcIlwiO1x0XHJcblx0ZnVuY3Rpb24gZ2V0bGlzdCgpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2toTGlzdCcpLFxyXG5cdFx0XHRkYXRhOntcclxuXHRcdFx0XHRjdXN0b21lck5hbWU6JHNjb3BlLnF1ZXJ5Q3VzdG9tZXJUeHQsXHJcblx0XHRcdFx0cGhvbmU6JycsXHJcblx0XHRcdFx0ZmxhZzoxXHJcblx0XHRcdH0sXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QgPSBkYXRhLmN1c3RvbWVycztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGdldGxpc3QoKTtcclxuXHQkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKXtcclxuXHRcdGdldGxpc3QoKTtcclxuXHR9XHJcblx0JHNjb3BlLmJqWmQgPSBmdW5jdGlvbih4KXtcclxuXHRcdCRzdGF0ZS5nbygnaG9tZS5rZi5iamtmeicse1xyXG5cdFx0XHRpZDp4LmN1c3RvbWVySWRcclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2Jqa2Z6Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJHRpbWVvdXQnLCckc3RhdGVQYXJhbXMnLCckc3RhdGUnLCckaHR0cCcsJ1RpcCcsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkdGltZW91dCwkc3RhdGVQYXJhbXMsJHN0YXRlLCRodHRwLFRpcCxIdHRwKXtcclxuXHQkc2NvcGUubXlNc2cgPSB7fTtcclxuXHRIdHRwLmdldCh7XHJcblx0XHR1cmw6VXJsLmdldFVybCgncXVlcnlLaCcpKycvJyskc3RhdGVQYXJhbXMuaWRcclxuXHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdCRzY29wZS5teU1zZy5jdXN0b21lck5hbWUgPSBkYXRhLmN1c3RvbWVyLmN1c3RvbWVyTmFtZTtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmN1c3RvbWVySWQgPSBkYXRhLmN1c3RvbWVyLmN1c3RvbWVySWQ7XHJcblx0XHRcdCRzY29wZS5teU1zZy5kZXBvc2l0QmFuayA9IGRhdGEuY3VzdG9tZXIuZGVwb3NpdEJhbms7XHJcblx0XHRcdCRzY29wZS5teU1zZy5kZXNjID0gZGF0YS5jdXN0b21lci5kZXNjO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cucGhvbmUgPSBkYXRhLmN1c3RvbWVyLnBob25lO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuaXNDb3JwID0gZGF0YS5jdXN0b21lci5pc0NvcnA7XHJcblx0XHRcdCRzY29wZS5teU1zZy5zZXJpYWxDb2RlID0gZGF0YS5jdXN0b21lci5zZXJpYWxDb2RlO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuYWNjb3VudENvZGUgPSBkYXRhLmN1c3RvbWVyLmFjY291bnRDb2RlO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuYWNjb3VudE5hbWUgPSBkYXRhLmN1c3RvbWVyLmFjY291bnROYW1lO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6J+acjeWKoeerr+W8guW4uCcsdHlwZTowfSk7XHJcblx0XHR9XHJcblx0fSlcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2JqS2gnKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUubXlNc2cpfVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oXCJob21lLmtmLmtmemdsXCIpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZGtmekN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyR0aW1lb3V0JywnJGh0dHAnLCdUaXAnLCckc3RhdGUnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJHRpbWVvdXQsJGh0dHAsVGlwLCRzdGF0ZSxIdHRwKXtcclxuXHQkc2NvcGUubXlNc2cgPSB7fTtcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZEtoJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKX1cclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oXCJob21lLmtmLmtmemdsXCIpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2tmLnJvdXRlcicsWydrZi5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnaG9tZS5rZicse1xyXG5cdFx0dXJsOicvemQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9rZi9rZi5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2tmQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5rZi5rZmdsJyx7XHJcblx0XHR1cmw6Jy96ZGdsJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2ZnbC9LRkdMLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjona2ZnbEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUua2YuYWRkS2YnLHtcclxuXHRcdHVybDonL2tmemQvYWRkemQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9rZi9rZmdsL2FkZEtmLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRka2ZDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmtmLmJqa2YnLHtcclxuXHRcdHVybDonL3pkZ2wvOmlkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2ZnbC9iamtmLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYmprZkN0cmwnLFxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmtmLmtmemdsJyx7XHJcblx0XHR1cmw6Jy9raGdsJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2Z6Z2wvS0ZaR0wuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidrZnpnbEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUua2YuYWRka2Z6Jyx7XHJcblx0XHR1cmw6Jy9raGdsL2FkZGtoJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2Z6Z2wvYWRka2Z6Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRka2Z6Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5rZi5iamtmeicse1xyXG5cdFx0dXJsOicva2hnbC86aWQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9rZi9rZnpnbC9iamtmei5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2Jqa2Z6Q3RybCcsXHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2xvZ2luLmN0cmwnLFsnZGF0YScsJ3B1YnVsaWMnXSlcclxuLmNvbnRyb2xsZXIoJ2xvZ2luQ3RybCcsWyckc2NvcGUnLCckaHR0cCcsJyRzdGF0ZScsJ1VybCcsJ1RpcCcsJyR0aW1lb3V0JyxmdW5jdGlvbigkc2NvcGUsJGh0dHAsJHN0YXRlLFVybCxUaXAsJHRpbWVvdXQpe1xyXG5cdCRzY29wZS51c2VybmFtZT1sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9naW5JRCcpfHwnJztcclxuXHQkc2NvcGUucGFzc3dvcmQ9bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2luUEFTUycpfHwnJztcclxuXHQkc2NvcGUudGVzdF9zdHlsZTE9XCJcIjtcclxuXHQkc2NvcGUudGVzdF9zdHlsZTI9XCJcIjtcclxuXHQkc2NvcGUucmVtZW1iZXJJRD1mYWxzZTtcclxuXHQkc2NvcGUubG9naW5fc3VibWl0ID0gJ+eZu+W9lSdcclxuXHQkc2NvcGUuJHdhdGNoKCdyZW1lbWJlcklEJyxmdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLnJlbWVtYmVySUQpe1xyXG5cdFx0XHRUaXAuTG9nKCfotKblj7flr4bnoIHlsIblrZjlhaVjb29raWXvvIEnKTtcclxuXHRcdH1cclxuXHR9KVxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VybmFtZScpLm9uYmx1cj1mdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xyXG5cdFx0XHRpZigkc2NvcGUudXNlcm5hbWU9PVwiXCIpe1xyXG5cdFx0XHRcdCRzY29wZS50ZXN0X3N0eWxlMT1cImhhcy1lcnJvclwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0Y29uc29sZS5sb2coJHNjb3BlLnJlbWVtYmVySUQpXHRcdFxyXG5cdH1cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5vbmZvY3VzPWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUudGVzdF9zdHlsZTE9XCJcIjtcclxuXHRcdCRzY29wZS5lcnJvcl91c2VybmFtZT1cIlwiO1xyXG5cdH1cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS5vbmJsdXI9ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCRzY29wZS5wYXNzd29yZD09XCJcIil7XHJcblx0XHRcdFx0JHNjb3BlLnRlc3Rfc3R5bGUyPVwiaGFzLWVycm9yXCI7XHJcblx0XHRcdH1cclxuXHRcdH0pXHRcdFxyXG5cdH1cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS5vbmZvY3VzPWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUudGVzdF9zdHlsZTI9XCJcIjtcclxuXHRcdCRzY29wZS5lcnJvcl9wYXNzd29yZD1cIlwiO1xyXG5cdH1cclxuXHQkc2NvcGUubG9naW49ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRzY29wZS5sb2dpbl9zdWJtaXQ9J+eZu+W9leS4rS4uLic7XHJcblx0XHR9KVxyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2luSUQnLCRzY29wZS51c2VybmFtZSk7XHJcblx0XHRpZigkc2NvcGUucmVtZW1iZXJJRCl7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dpbklEJywkc2NvcGUudXNlcm5hbWUpO1xyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9naW5QQVNTJywkc2NvcGUucGFzc3dvcmQpO1xyXG5cdFx0fVxyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnbG9naW4nKSxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0dXNlcm5hbWU6JHNjb3BlLnVzZXJuYW1lLFxyXG5cdFx0XHRcdHBhc3N3b3JkOiRzY29wZS5wYXNzd29yZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LCAgXHJcblx0XHQgIFx0IHRyYW5zZm9ybVJlcXVlc3Q6IGZ1bmN0aW9uKG9iaikgeyAgXHJcblx0XHQgICAgIHZhciBzdHIgPSBbXTsgIFxyXG5cdFx0ICAgICBmb3IodmFyIHAgaW4gb2JqKXsgIFxyXG5cdFx0ICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcblx0XHQgICAgIH0gIFxyXG5cdFx0ICAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpOyAgXHJcblx0XHQgICBcdCB9XHRcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdC8vIFRpcC5Mb2coZGF0YS5tZXNzYWdlKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50Jyk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc2NvcGUubG9naW5fc3VibWl0PSfnmbvlvZUnO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pLmVycm9yKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQkc2NvcGUubG9naW5fc3VibWl0PSfnmbvlvZUnO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2xvZ2luLnJvdXRlcicsWydsb2dpbi5jdHJsJ10pXHJcbi5jb25maWcoWyckdXJsUm91dGVyUHJvdmlkZXInLCckc3RhdGVQcm92aWRlcicsZnVuY3Rpb24oJHVybFJvdXRlclByb3ZpZGVyLCRzdGF0ZVByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnbG9naW4nLHtcclxuXHRcdHVybDonL2xvZ2luJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvbG9naW4vbG9naW4uaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidsb2dpbkN0cmwnXHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3Byb2R1Y3QuY3RybCcsW10pXHJcbi5jb250cm9sbGVyKCdwcm9kdWN0Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSl7XHJcblx0JHNjb3BlLmxpc3QgPSBEYXRhLmdldERhdGEoJ3Byb2R1Y3QnKS5saXN0O1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3Byb2R1Y3RNYW5hZ2VDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuc2VhcmNoS2V5PXtcclxuXHRcdHByb2R1Y3ROYW1lOicnLFxyXG5cdFx0cHJvZHVjdE5vcm1zOicnLFxyXG5cdFx0cHJvbW90ZUZlZTonJyxcclxuXHRcdGZsYWc6MSxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2g9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncHJvZHVjdExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5wcm9kdWN0cztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWFyY2goJHNjb3BlLnNlYXJjaEtleSk7XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRkUHJvZHVjdEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3Qpe1xyXG5cdCRzY29wZS5wcm9kdWN0PXtcclxuXHRcdHByb2R1Y3ROYW1lOicnLFxyXG5cdFx0cHJvZHVjdE5vcm1zOicnLFxyXG5cdFx0bWFudWZhY3R1cmU6JycsXHJcblx0XHRwcm9kdWN0UHJpY2U6JycsXHJcblx0XHRtYW51ZmFjdHVyZTonJyxcclxuXHRcdGJpZFByaWNlOicnLFxyXG5cdH07XHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnYWRkUHJvZHVjdCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5wcm9kdWN0KX0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5wcm9kdWN0LnByb2R1Y3RNYW5hZ2UnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdlZGl0UHJvZHVjdEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsJyRzdGF0ZVBhcmFtcycsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3QsJHN0YXRlUGFyYW1zKXtcclxuXHQkc2NvcGUucHJvZHVjdD17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0cHJvZHVjdFByaWNlOicnLFxyXG5cdFx0bWFudWZhY3R1cmU6JycsXHJcblx0XHRiaWRQcmljZTonJyxcclxuXHR9O1xyXG5cdCRzY29wZS5wcm9kdWN0PSRzdGF0ZVBhcmFtcy5vYmo7XHJcblx0Ly8gJHNjb3BlLmdldERldGFpbD1mdW5jdGlvbih4KXtcclxuXHQvLyBcdEh0dHAucG9zdEYoe1xyXG5cdC8vIFx0XHR1cmw6VXJsLmdldFVybCgncHJvZHVjdERldGFpbCcpLFxyXG5cdC8vIFx0XHRkYXRhOntpZDp4fSxcclxuXHQvLyBcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0Ly8gXHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdC8vIFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0Ly8gXHRcdFx0VGlwLmxvZyhkYXRhLm1hc3NhZ2UsZnVuY3Rpb24oKXtcclxuXHQvLyBcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5wcm9kdWN0LnByb2R1Y3RNYW5hZ2UnKTtcclxuXHQvLyBcdFx0XHR9KVxyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHR9KVxyXG5cdC8vIH1cclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMub2JqKVxyXG5cdC8vICRzY29wZS5nZXREZXRhaWwoJHN0YXRlUGFyYW1zLm9iailcclxuXHQkc2NvcGUuc2F2ZT1mdW5jdGlvbigpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdlZGl0UHJvZHVjdCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5wcm9kdWN0KX0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5wcm9kdWN0LnByb2R1Y3RNYW5hZ2UnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3Byb2R1Y3Qucm91dGVyJyxbJ3Byb2R1Y3QuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ2hvbWUucHJvZHVjdCcse1xyXG5cdFx0dXJsOicvcHJvZHVjdCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3QvcHJvZHVjdC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J3Byb2R1Y3RDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLnByb2R1Y3QucHJvZHVjdE1hbmFnZScse1xyXG5cdFx0dXJsOicvcHJvZHVjdE1hbmFnZScsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3QvcHJvZHVjdE1hbmFnZS5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J3Byb2R1Y3RNYW5hZ2VDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUucHJvZHVjdC5hZGRQcm9kdWN0Jyx7XHJcblx0XHR1cmw6Jy9wcm9kdWN0TWFuYWdlJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvcHJvZHVjdC9hZGRQcm9kdWN0Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRkUHJvZHVjdEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUucHJvZHVjdC5lZGl0UHJvZHVjdCcse1xyXG5cdFx0dXJsOicvZWRpdFByb2R1Y3QnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0L3Byb2R1Y3RFZGl0Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZWRpdFByb2R1Y3RDdHJsJyxcclxuXHRcdHBhcmFtczoge1xyXG5cdCAgICAgICAgb2JqOiBudWxsIFxyXG5cdCAgICB9XHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3JlZ2lzdGVyLnJvdXRlcicsWydyZWdpc3Rlci5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgncmVnaXN0ZXInLHtcclxuXHRcdHVybDonL3JlZ2lzdGVyJyxcclxuXHRcdHRlbXBsYXRlVXJsOid2aWV3cy9yZWdpc3Rlci9yZWdpc3Rlci5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6XCJyZWdpc3RlckN0cmxcIlxyXG5cdH0pXHJcblx0LnN0YXRlKCdyZWdpc3Rlci5zdGVwMScse1xyXG5cdFx0dXJsOicvMScsXHJcblx0XHR0ZW1wbGF0ZVVybDondmlld3MvcmVnaXN0ZXIvc3RlcDEuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidyZWdpc3RlclN0ZXAxQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgncmVnaXN0ZXIuc3RlcDInLHtcclxuXHRcdHVybDonLzInLFxyXG5cdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL3JlZ2lzdGVyL3N0ZXAyLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjoncmVnaXN0ZXJTdGVwMkN0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgncmVnaXN0ZXIuc3RlcDMnLHtcclxuXHRcdHVybDonLzMnLFxyXG5cdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL3JlZ2lzdGVyL3N0ZXAzLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjoncmVnaXN0ZXJTdGVwM0N0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZSgncmVnaXN0ZXIuY3RybCcsWydwdWJ1bGljJywnZGF0YSddKVxyXG4uY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJyxbJyRzY29wZScsJ1VybCcsJyRodHRwJywnJHRpbWVvdXQnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSxVcmwsJGh0dHAsJHRpbWVvdXQsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLnJlZ2lzdGVyTXNnPXt9O1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyU3RlcDFDdHJsJyxbJyRzY29wZScsJ1VybCcsJyRodHRwJywnJHRpbWVvdXQnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSxVcmwsJGh0dHAsJHRpbWVvdXQsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLmdvTmV4dFN0ZXA9ZmFsc2U7XHJcblx0JHNjb3BlLm1zZ195em09Jyc7XHJcblx0JHNjb3BlLnBob25lbnVtPScnO1xyXG5cdCRzY29wZS55em1fc3VibWl0PSflj5HpgIHpqozor4HnoIEnO1xyXG5cdCRzY29wZS5nb05leHQ9ZmFsc2U7XHJcblx0JHNjb3BlLnN1Ym1pdF9tc2c9ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRzY29wZS55em1fc3VibWl0PSflt7Llj5HpgIEuLi4nO1xyXG5cdFx0fSlcclxuXHRcdCRodHRwKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3ZlcmlmeU51bWJlcicpLFxyXG5cdFx0XHRwYXJhbXM6e1xyXG5cdFx0XHRcdFwidmVyaWZ5RmllbGRcIjoncGhvbmUnLFxyXG5cdFx0XHRcdFwidmVyaWZ5VmFsdWVcIjokc2NvcGUucGhvbmVudW1cclxuXHRcdFx0fVxyXG5cdFx0fSkudGhlbihmdW5jdGlvbihtc2cpe1xyXG5cdFx0XHR2YXIgZGF0YSA9IG1zZy5kYXRhO1xyXG5cdFx0XHRpZihkYXRhLmNvZGU9PTEpe1xyXG5cdFx0XHRcdGlmKGRhdGEudmVyaWZ5UmVzdWx0PT0wKXtcclxuXHRcdFx0XHRcdFRpcC5Mb2coJHNjb3BlLCfmiYvmnLrlj7fmoKHpqozmiJDlip/vvIEnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5nb05leHQ9dHJ1ZTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0VGlwLkxvZygkc2NvcGUsJ+ivpeaJi+acuuWPt+mHjeWkje+8gScsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdpc3Rlcl9waG9uZW51bWJlclwiKS5mb2N1cygpO1xyXG5cdFx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRcdCRzY29wZS55em1fc3VibWl0PSflj5HpgIHpqozor4HnoIEnO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSk7XHRcdFxyXG5cdFx0XHRcdH1cdFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSwn5aSx6LSlJytkYXRhLmNvZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUubmV4dFN0ZXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLmdvTmV4dCl7XHJcblx0XHRcdGlmKCRzY29wZS5waG9uZW51bWJlcil7XHJcblx0XHRcdFx0dmFyIHByb21pc2U9JGh0dHAoe1xyXG5cdFx0XHRcdFx0dXJsOlVybC5nZXRVcmwoJ3ZlcmlmeVNtcycpLFxyXG5cdFx0XHRcdFx0cGFyYW1zOntcclxuXHRcdFx0XHRcdFx0cGhvbmU6JHNjb3BlLnBob25lbnVtYmVyLFxyXG5cdFx0XHRcdFx0XHRTTVNjb2RlOiRzY29wZS5tc2dfeXptXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSkudGhlbihmdW5jdGlvbihtc2cpe1xyXG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBtc2cuZGF0YTtcclxuXHRcdFx0XHRcdGlmKGRhdGEuY29kZT09MCl7XHJcblx0XHRcdFx0XHRcdCRzdGF0ZS5nbygnLnJlZ2lzdGVyLnN0ZXAyJyk7XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0VGlwLkFsZXJ0KCfmk43kvZzlpLHotKUhJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhwcm9taXNlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZigkc2NvcGUucGhvbmVudW0pe1xyXG5cdFx0XHRcdCRzY29wZS5yZWdpc3Rlck1zZy5waG9uZT0kc2NvcGUucGhvbmVudW07XHJcblx0XHRcdFx0JHN0YXRlLmdvKCdyZWdpc3Rlci5zdGVwMicse1xyXG5cdFx0XHRcdFx0b2JqOntcclxuXHRcdFx0XHRcdFx0cGhvbmU6JHNjb3BlLnBob25lbnVtXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFx0XHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyU3RlcDJDdHJsJyxbJyRzY29wZScsJyR0aW1lb3V0JywnJGh0dHAnLCckc3RhdGVQYXJhbXMnLCdUaXAnLCckc3RhdGUnLGZ1bmN0aW9uKCRzY29wZSwkdGltZW91dCwkaHR0cCwkc3RhdGVQYXJhbXMsVGlwLCRzdGF0ZSl7XHJcblx0JHNjb3BlLmVtYWlsPScnO1xyXG5cdCRzY29wZS5wYXNzV29yZCA9ICcnO1xyXG5cdCRzY29wZS5wYXNzd29yZF9hZ2FpbiA9ICcnO1xyXG5cdCRzY29wZS5wYXNzd29yZF9zdHJvbmc9Jyc7XHJcblx0dmFyIHJ1byA9IC9bMC05IGEteiBdLztcclxuXHRmdW5jdGlvbiBjaGVjayhzdHIpe1xyXG5cdFx0cmV0dXJuICgvXFxkKy9pLnRlc3Qoc3RyKSA/IDEgOiAwKSArICgvW2Etel0rL2kudGVzdChzdHIpID8gMSA6IDApICsgKCBzdHIucmVwbGFjZSgvXFxkKy9nKS5yZXBsYWNlKC9bYS16XSsvaWcpPT0ndW5kZWZpbmVkJyA/IDAgOiAxKTtcclxuXHR9XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykub25mb2N1cz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0ZG9jdW1lbnQub25rZXlkb3duPWZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIHN0ciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLnZhbHVlO1xyXG5cdFx0XHRcdHN3aXRjaChjaGVjayhzdHIpKXtcclxuXHRcdFx0XHRcdGNhc2UgMDpcclxuXHRcdFx0XHRcdCAkc2NvcGUucnVvPScnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0nJztcclxuXHRcdFx0XHRcdCAkc2NvcGUucWlhbmc9Jyc7IFxyXG5cdFx0XHRcdFx0ICRzY29wZS5wYXNzd29yZF9zdHJvbmc9Jyc7XHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDE6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0nJztcclxuXHRcdFx0XHRcdCAkc2NvcGUucWlhbmc9Jyc7IFxyXG5cdFx0XHRcdFx0ICRzY29wZS5wYXNzd29yZF9zdHJvbmc9J+W8sSc7XHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDI6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS5xaWFuZz0nJzsgXHJcblx0XHRcdFx0XHQgJHNjb3BlLnBhc3N3b3JkX3N0cm9uZz0n5LitJzsgXHJcblx0XHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIDM6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS56aG9uZz0ncGFzc3dvcmRfYmcnO1xyXG5cdFx0XHRcdFx0ICRzY29wZS5xaWFuZz0ncGFzc3dvcmRfYmcnOyBcclxuXHRcdFx0XHRcdCAkc2NvcGUucGFzc3dvcmRfc3Ryb25nPSflvLonO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc3VibWl0UmVnaXN0ZXI9ZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5wYXNzV29yZCE9JHNjb3BlLnBhc3N3b3JkX2FnYWluKXtcclxuXHRcdFx0VGlwLkFsZXJ0KCfnoa7orqTlr4bnoIHkuI3kuIDoh7TvvIEnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoJHNjb3BlLnBhc3NXb3JkKXtcclxuXHRcdFx0JHN0YXRlLmdvKCdyZWdpc3Rlci5zdGVwMycse1xyXG5cdFx0XHRcdG9iajp7XHJcblx0XHRcdFx0XHRwaG9uZTokc3RhdGVQYXJhbXMub2JqLnBob25lLFxyXG5cdFx0XHRcdFx0ZW1haWw6JHNjb3BlLmVtYWlsLFxyXG5cdFx0XHRcdFx0cGFzc3dvcmQ6JHNjb3BlLnBhc3NXb3JkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdyZWdpc3RlclN0ZXAzQ3RybCcsWyckc2NvcGUnLCckdGltZW91dCcsJyRodHRwJywnJHN0YXRlUGFyYW1zJywnVXJsJywnVGlwJywnJHN0YXRlJyxmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsJGh0dHAsJHN0YXRlUGFyYW1zLFVybCxUaXAsJHN0YXRlKXtcclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xyXG5cdCRzY29wZS5jb25TaXplPTUwO1xyXG5cdCRzY29wZS5jb25OYW1lPVwiXCI7XHJcblx0JHNjb3BlLmNvbldvcmxkPVwiXCI7XHJcblx0JHNjb3BlLnJlZ2lzdGVyPWZ1bmN0aW9uKCl7XHJcblx0XHR2YXIganNvbiA9IHtcclxuXHRcdFx0dXNlclByaXZhdGVVcmw6JHNjb3BlLmNvbldvcmxkKycuY21jYy5jb20nLFxyXG5cdFx0XHRlbWFpbDokc3RhdGVQYXJhbXMub2JqLmVtYWlsLFxyXG5cdFx0XHRwaG9uZTokc3RhdGVQYXJhbXMub2JqLnBob25lLFxyXG5cdFx0XHRvYmplY3RUeXBlOjIsXHJcblx0XHRcdG5hbWU6JHNjb3BlLmNvbk5hbWUsXHJcblx0XHRcdGNvbXBhbnlTY2FsZTokc2NvcGUuY29uU2l6ZSxcclxuXHRcdFx0cGFzc3dvcmQ6JHN0YXRlUGFyYW1zLm9iai5wYXNzd29yZFxyXG5cdFx0fVxyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmVnaXN0ZXInKSxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTpqc29uXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSxcIuazqOWGjOaIkOWKnyFcIixmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdsb2dpbicpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZSgnZGF0YScsW10pXHJcbi5mYWN0b3J5KCdEYXRhJyxbJyR0aW1lb3V0JyxmdW5jdGlvbigkdGltZW91dCl7XHJcblx0dmFyIGRhdGE9e1xyXG5cdFx0a2ZEYXRhOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOifnu4jnq68nLFxyXG5cdFx0XHQnc3RhdGUnOicuS0YnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+e7iOerr+euoeeQhicsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicua2ZnbCcsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon57uI56uv5YiX6KGoJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfS0ZfbGInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifmt7vliqDnu4jnq68nLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRl9hZGRLZnonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+WuouaIt+WIl+ihqCcsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicua2Z6Z2wnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+WuouaIt+WIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGWl9sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a3u+WKoOWuouaItycsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGWl9hZGRLZnonXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdFx0XHRjb21wYW55OlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOifllYbkuJonLFxyXG5cdFx0XHQnc3RhdGUnOicuY29tcGFueScsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5ZWG5Lia566h55CGJyxcclxuXHRcdFx0XHRcdCdzdGF0ZSc6Jy5jb21wYW55TWFuYWdlJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVx0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0cHJvZHVjdDpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon5Lqn5ZOBJyxcclxuXHRcdFx0J3N0YXRlJzonLnByb2R1Y3QnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+S6p+WTgeeuoeeQhicsXHJcblx0XHRcdFx0XHQnc3RhdGUnOidob21lLnByb2R1Y3QucHJvZHVjdE1hbmFnZSdcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGFncmVlbWVudDpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon5Y2P6K6uJyxcclxuXHRcdFx0J3N0YXRlJzonLmFncmVlbWVudCcsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5ZWG5Lia5Y2P6K6uJyxcclxuXHRcdFx0XHRcdCdzdGF0ZSc6J2hvbWUuYWdyZWVtZW50LmJ1c2luZXNzQWdyZWVtZW50J1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5a6i5oi35Y2P6K6uJyxcclxuXHRcdFx0XHRcdCdzdGF0ZSc6J2hvbWUuYWdyZWVtZW50Lmd1ZXN0QWdyZWVtZW50J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVx0XHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Zmxvd0RhdGE6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J+a1geWQkScsXHJcblx0XHRcdCdzdGF0ZSc6Jy5mbG93JyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmtYHlkJHnrqHnkIYnLFxyXG5cdFx0XHRcdFx0J3N0YXRlJzonLmZsb3dnbCcsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5rWB5ZCR5YiX6KGoJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuZmxvd19mbG93X2xiJ1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5a+85YWl5rWB5ZCRJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuZmxvd19mbG93X2FkZGZsb3cnXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+e7k+eul+euoeeQhicsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicuc2V0dGxlbWVudCcsXHJcblx0XHRcdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHR9XHJcblx0XHRcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0RGF0YTpmdW5jdGlvbihpZCl7XHJcblx0XHRcdGZvcih4IGluIGRhdGEpe1xyXG5cdFx0XHRcdGlmKGlkPT14KXtcclxuXHRcdFx0XHRcdHJldHVybiBkYXRhW3hdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGdldENoYXQ6ZnVuY3Rpb24oc2NvcGUpe1xyXG5cdFx0XHRjaGF0U2VydmUubXNnKHNjb3BlKTtcdFx0XHRcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uZmFjdG9yeSgnVXJsJyxmdW5jdGlvbigpe1xyXG5cdHZhciB1cmxEYXRhPXtcclxuXHRcdGxvZ2luOidhcGkvbG9naW4vbG9naW4nLC8v55m76ZmGXHJcblx0XHR6ZExpc3Q6J2FwaS9ob3NwL3F1ZXJ5L2xpc3QnLC8v57uI56uv5YiX6KGoXHJcblx0XHRxdWVyeVpkOidhcGkvaG9zcC8vcXVlcnkvb25lJywvL+afpeivoue7iOerr+ivpuaDhVxyXG5cdFx0Z2V0QXJlYXNMaXN0OidhcGkvem9uZS9xdWVyeUZvckFsbFpvbmVzJywvL+iOt+WPluWkp+WMuuWIl+ihqFxyXG5cdFx0Z2V0Q2l0eUxpc3Q6J2FwaS96b25lL3F1ZXJ5Q2l0eUJ5Wm9uZScsLy/ojrflj5bln47luILliJfooahcclxuXHRcdGJqWmQ6J2FwaS9ob3NwLy91cGRhdGUvb25lJywvL+e8lui+kee7iOerr+S/oeaBr1xyXG5cdFx0YWRkWmQ6J2FwaS9ob3NwL2luc2VydC9vbmUnLC8v5paw5aKe57uI56uv5L+h5oGvXHJcblx0XHRraExpc3Q6J2FwaS9jdXN0b21lci9xdWVyeS9saXN0JywvL+WuouaIt+WIl+ihqFxyXG5cdFx0YWRkS2g6J2FwaS9jdXN0b21lci9pbnNlcnQvb25lJywvL+a3u+WKoOWuouaIt1xyXG5cdFx0cXVlcnlLaDonYXBpL2N1c3RvbWVyL3F1ZXJ5L29uZScsLy/mn6Xor6LlrqLmiLfor6bmg4VcclxuXHRcdGJqS2g6J2FwaS9jdXN0b21lci8vdXBkYXRlL29uZScsLy/nvJbovpHlrqLmiLfkv6Hmga9cclxuXHRcdGZsb3dMaXN0OidhcGkvZmxvdy9xdWVyeS9saXN0JywvL+afpeivoua1geWQkeWIl+ihqFxyXG5cdFx0Z2V0c2V0dGxlbWVudExpc3Q6J2FwaS9yZWJhdGVQcm9jZXNzL2xpc3QnLC8v6I635Y+W57uT566X5YiX6KGoXHJcblx0XHRnb1NldHRsZW1lbnQ6J2FwaS9yZWJhdGVQcm9jZXNzL3BheScsLy/nu5Pnrpfku5jmrL5cclxuXHRcdGNhbmNlbFNldHRsZW1lbnQ6J2FwaS9yZWJhdGVQcm9jZXNzL3BheS9jYW5jZWwnLC8v5Y+W5raI57uT566XXHJcblx0XHRoYW5kbGVTZXR0bGVtZW50OidhcGkvcmViYXRlUHJvY2Vzcy9kZWFsJywvL+e7k+eul+WkhOeQhlxyXG5cdFx0dXBsb2FkRmxvd0ZpbGU6J2FwaS91cGxvYWQvZmlsZScsLy/kuIrkvKDnu5Pnrpfmlofku7ZcclxuXHRcdGltcG9ydEZsb3dGaWxlOidhcGkvZmxvdy9pbXBvcnQnLC8v5a+85YWl5rWB5ZCR5paH5Lu2XHJcblx0XHQvL2xrbVxyXG5cdFx0aG9zcExpc3Q6J2FwaS9ob3NwL3F1ZXJ5L2xpc3QnLC8v57uI56uv5YiX6KGoXHJcblx0XHRjdXN0b21lckxpc3Q6J2FwaS9jdXN0b21lci9xdWVyeS9saXN0JywvL+WuouaIt+WIl+ihqFxyXG5cdFx0cHJvZHVjdExpc3Q6J2FwaS9wcm9kdWN0L3F1ZXJ5L2xpc3QnLC8v6I635Y+W5Lqn5ZOB5YiX6KGoXHJcblx0XHRhZGRQcm9kdWN0OidhcGkvcHJvZHVjdC9pbnNlcnQvb25lJywvL+a3u+WKoOS6p+WTgVxyXG5cdFx0ZWRpdFByb2R1Y3Q6J2FwaS9wcm9kdWN0L3VwZGF0ZS9vbmUnLC8v57yW6L6R5Lqn5ZOBXHJcblx0XHRwcm9kdWN0RGV0YWlsOidhcGkvcHJvZHVjdC9xdWVyeS9vbmUnLC8v5p+l55yL5Lqn5ZOB6K+m5oOFXHJcblx0XHRtZXJjaGFuUHJvdExpc3Q6J2FwaS9tZXJjaGFuUHJvdC9xdWVyeS9saXN0JywvL+iOt+WPluWVhuS4muWNj+iuruWIl+ihqFxyXG5cdFx0YWRkTWVyY2hhblByb3Q6J2FwaS9tZXJjaGFuUHJvdC9pbnNlcnQvb25lJywvL+a3u+WKoOWVhuS4muWNj+iurlxyXG5cdFx0ZWRpdE1lcmNoYW5Qcm90OidhcGkvbWVyY2hhblByb3QvdXBkYXRlL29uZScsLy/nvJbovpHllYbkuJrljY/orq5cclxuXHRcdGJ1c2luZXNzQWdyZWVtZW50OidhcGkvbWVyY2hhblByb3QvcXVlcnkvb25lLycsLy/mn6XnnIvllYbkuJrljY/orq7or6bmg4VcclxuXHRcdHByb3RvY29sTGlzdDonYXBpL3Byb3RvY29sL3F1ZXJ5L2xpc3QvdmFsaWQnLC8v6I635Y+W5a6i5oi35Y2P6K6u5YiX6KGoXHJcblx0XHR1c2luZ0FncmVlbWVudDonYXBpL3Byb3RvY29sL3F1ZXJ5L2xpc3QvdmFsaWQnLC8v5a6i5oi36K+m5oOF5Zyo55So5Y2P6K6uXHJcblx0XHRhZGRwcm90b2NvbDonYXBpL3Byb3RvY29sL2luc2VydC9vbmUnLC8v5re75Yqg5a6i5oi35Y2P6K6uXHJcblx0XHRlZGl0cHJvdG9jb2w6J2FwaS9wcm90b2NvbC91cGRhdGUvb25lJywvL+e8lui+keWuouaIt+WNj+iurlxyXG5cdFx0Z3Vlc3RBZ3JlZW1lbnQ6J2FwaS9wcm90b2NvbC9xdWVyeS9vbmUvJywvL+afpeeci+WuouaIt+WNj+iuruivpuaDhVxyXG5cdFx0Y29tcGFueUxpc3Q6J2FwaS9tZXJjaGFuL21lcmNoYW4vbGlzdCAnLC8v6I635Y+W5YWs5Y+45YiX6KGoXHJcblx0XHRhZGRDb21wYW55OidhcGkvbWVyY2hhbi9tZXJjaGFuL2FkZCcsLy/mt7vliqDlhazlj7hcclxuXHRcdGVkaXRDb21wYW55OidhcGkvbWVyY2hhbi9tZXJjaGFuL3VwZGF0ZScsLy/nvJbovpHlhazlj7hcclxuXHRcdG1lcmNoYW5Qcm90RGV0YWlsOidhcGkvbWVyY2hhbi9tZXJjaGFuL29uZScsLy/mn6XnnIvlhazlj7jor6bmg4VcclxuXHRcdHJlYmF0ZVN0eWxlOidhcGkvcmViYXRlU3R5bGUvbGlzdCcsLy/mn6XnnIvov5TliKnmlrnlvI9cclxuXHRcdGxvZ291dDonYXBpL2xvZ2luL2xvZ291dCcsLy/pgIDlh7rnmbvlvZVcclxuXHRcdHVzZXJuYW1lOidhcGkvdXNlci91c2VybmFtZScsLy/nlKjmiLflkI1cclxuXHRcdGxhdGVzdDonYXBpL3JlYmF0ZVByb2Nlc3MvdGltZS9sYXRlc3QnLC8v5LiK5qyh57uT566X5pe26Ze0XHJcblx0XHRzdG9ja0Nsb3NlOidhcGkvc3RvY2svdXBkYXRlL3N0YXRlJywvL+WFs+mXreW6k+WtmOeKtuaAgeaOqOmAgVxyXG5cdFx0cHJvbW90ZUNsb3NlOidhcGkvcHJvbW90ZS91cGRhdGUvc3RhdGUnLC8v5YWz6Zet5o6o5bm/6LS56L+U5Yip5o6o6YCBXHJcblx0XHR3c0FkZHJlc3M6J2FwaS93ZWJzb2NrZXQvaW5ldEFkZHJlc3MnLC8vd3PlnLDlnYBcclxuXHJcblx0fVxyXG5cdHJldHVybiB7XHJcblx0XHRnZXRVcmw6ZnVuY3Rpb24odXJsKXtcclxuXHRcdFx0Zm9yKGkgaW4gdXJsRGF0YSl7XHJcblx0XHRcdFx0aWYodXJsPT1pKXtcclxuXHRcdFx0XHQgICAgLy8gcmV0dXJuICdjeWNybS8nK3VybERhdGFbaV07Ly/mtYvor5Xkvb/nlKhcclxuXHRcdFx0XHQgICAgcmV0dXJuIHVybERhdGFbaV07Ly/lj5HluIPkvb/nlKhcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhZGRLZi5jdHJsJyxbXSlcclxuLmNvbnRyb2xsZXIoJ2FkZGtmQ3RybCcsWyckcm9vdFNjb3BlJyxmdW5jdGlvbigkcm9vdFNjb3Blcyl7XHJcblx0XHJcbn1dKSJdfQ==
