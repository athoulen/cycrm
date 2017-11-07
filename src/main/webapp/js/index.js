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
			console.log(scope,element)
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
	$scope.menu.product = Data.getData('product').title;
	$scope.menu.agreement = Data.getData('agreement').title;
	$scope.menu.company = Data.getData('company').title;
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

	}
	return {
		getUrl:function(url){
			for(i in urlData){
				if(url==i){
					 //return 'cycrm/'+urlData[i];//测试使用
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFncmVlbWVudC9hZ3JlZW1lbnQtY3RybC5qcyIsImFncmVlbWVudC9hZ3JlZW1lbnQtcm91dGVyLmpzIiwiY29tbW9uL2FwcC5qcyIsImNvbW1vbi9jb21tb24uanMiLCJjb21tb24vcGFnaW5hdGlvbi5qcyIsImNvbW1vbi9yb3V0ZXIuanMiLCJjb21wYW55L2NvbXBhbnktY3RybC5qcyIsImNvbXBhbnkvY29tcGFueS1yb3V0ZXIuanMiLCJmbG93dG8vZmxvdy1jdHJsLmpzIiwiZmxvd3RvL2Zsb3ctcm91dGVyLmpzIiwiaG9tZS9ob21lLWN0cmwuanMiLCJob21lL2hvbWUtZGF0YS5qcyIsImhvbWUvaG9tZS1yb3V0ZXIuanMiLCJrZi9rZi1jdHJsLmpzIiwia2Yva2Ytcm91dGVyLmpzIiwibG9naW4vbG9naW4tY3RybC5qcyIsImxvZ2luL2xvZ2luLXJvdXRlci5qcyIsInByb2R1Y3QvcHJvZHVjdC1jdHJsLmpzIiwicHJvZHVjdC9wcm9kdWN0LXJvdXRlci5qcyIsInJlZ2lzdGVyL3JlZ2lzdGVyLXJvdXRlci5qcyIsInJlZ2lzdGVyL3JlZ2lzdGVyQ3RybC5qcyIsImNvbW1vbi9kYXRhL2RhdGEuanMiLCJrZi9rZmdsL2FkZEtmLWN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6bkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvS0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYWdyZWVtZW50LmN0cmwnLFtdKVxyXG4uY29udHJvbGxlcignYWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSl7XHJcblx0JHNjb3BlLmxpc3QgPSBEYXRhLmdldERhdGEoJ2FncmVlbWVudCcpLmxpc3Q7XHJcbn1dKVxyXG4uY29udHJvbGxlcignYnVzaW5lc3NBZ3JlZW1lbnRDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuc2VhcmNoS2V5PXtcclxuXHRcdHByb3RvY29sQ29kZTonJyxcclxuXHRcdHByb2R1Y3ROYW1lOicnLFxyXG5cdFx0aG9zcGl0YWw6JycsXHJcblx0XHRwcm9kdWN0Tm9ybXM6JycsXHJcblx0XHRmbGFnOjEsXHJcblx0fTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ21lcmNoYW5Qcm90TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QgPSBkYXRhLnByb3RvY29scztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWFyY2goJHNjb3BlLnNlYXJjaEtleSk7XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRkQWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCl7XHJcblx0JHNjb3BlLmFncmVlbWVudD17XHJcblx0XHRiYWNrUGVyaW9kU3R5bGU6JzEnLFxyXG5cdFx0cHJvdG9jb2xDb2RlOicnLFxyXG5cdFx0cHJvZHVjdElkOicnLFxyXG5cdFx0em9uZUlkOicnLFxyXG5cdFx0Y2l0eUlkOicnLFxyXG5cdFx0YmlkUHJpY2U6JycsXHJcblx0XHR1cE1lcmNoYW46JycsXHJcblx0XHRsb01lcmNoYW46JycsXHJcblx0XHRob3NwaXRhbElkOicnLFxyXG5cdFx0dXBCYWNrOicnLFxyXG5cdFx0bG9CYWNrOicnLFxyXG5cdFx0c3RhcnRUaW1lOicnLFxyXG5cdFx0ZW5kVGltZTonJyxcclxuXHRcdGNvbnRhY3RvcjonJyxcclxuXHRcdHBob25lOicnLFxyXG5cdFx0cXE6JycsXHJcblx0XHRpc1ZhbGlkOicxJyxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0cHJvZHVjdE5hbWU6JycsXHJcblx0XHRwcm9kdWN0Tm9ybXM6JycsXHJcblx0XHRtYW51ZmFjdHVyZTonJyxcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2g9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93PXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPSRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU/JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdwcm9kdWN0TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUucGRhdGFMaXN0ID0gZGF0YS5wcm9kdWN0cy5saXN0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3Q9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPXgucHJvZHVjdE5hbWUrJy8nK3gucHJvZHVjdE5vcm1zKycvJyt4Lm1hbnVmYWN0dXJlO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5wcm9kdWN0SWQ9eC5pZDtcclxuXHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5LiA57qn5ZWG5Lia5YWs5Y+4XHJcblx0JHNjb3BlLnNlYXJjaEtleTE9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRjbGFzc1R5cGU6XCIxXCIsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHJcblx0JHNjb3BlLmlzU2hvdzE9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDE9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93MT10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT0kc2NvcGUuc2VhcmNoS2V5MS5uYW1lPyRzY29wZS5zZWFyY2hLZXkxLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MSA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDE9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQudXBNZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdH1cclxuXHQvL+S6jOe6p+WVhuS4muWFrOWPuFxyXG5cdCRzY29wZS5zZWFyY2hLZXkyPXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOlwiMlwiLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblxyXG5cdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gyPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzI9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkyLm5hbWU9JHNjb3BlLnNlYXJjaEtleTIubmFtZT8kc2NvcGUuc2VhcmNoS2V5Mi5uYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDIgPSBkYXRhLm1lcmNoYW5zO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QyPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT14Lm5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LmxvTWVyY2hhbj14Lm1lcmNoSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHR9XHJcblx0Ly/ljLvpmaLvvIjnu4jnq6/vvIlcclxuXHQkc2NvcGUuc2VhcmNoS2V5Mz17XHJcblx0XHRob3NwaXRhbE5hbWU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHJcblx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDM9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93Mz10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPSRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT8kc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnaG9zcExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MyA9IGRhdGEuaG9zcGl0YWxzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QzPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPXguaG9zcGl0YWxOYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5ob3NwaXRhbElkPXguaG9zcGl0YWxJZDtcclxuXHRcdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdH1cclxuXHQvL+i/lOWIqeaWueW8j1xyXG5cdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2g0PWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUuaXNTaG93ND10cnVlO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3JlYmF0ZVN0eWxlJyksXHJcblx0XHRcdGRhdGE6e30sXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3Q0ID0gZGF0YS5yZXN1bHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDQ9ZnVuY3Rpb24oYil7XHJcblx0XHQkc2NvcGUuYmFja19wZXJpb2Rfc3R5bGU9Yi5iYWNrX3BlcmlvZF9uYW1lKycvJytiLmJhY2tfc3R5bGVfbmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuYmFja1BlcmlvZFN0eWxlPWIuYmFja19pZDtcclxuXHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdH1cclxuXHQkc2NvcGUuc2F2ZT1mdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLnN0YXJ0VGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPSRzY29wZS5zdGFydFRpbWUuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoJHNjb3BlLmVuZFRpbWUpe1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmVuZFRpbWU9JHNjb3BlLmVuZFRpbWUuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9JHNjb3BlLmJhY2tQZXJpb2RTdHlsZS5iYWNrX2lkO1xyXG5cdFx0Y29uc29sZS5sb2coJHNjb3BlKVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdhZGRNZXJjaGFuUHJvdCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5hZ3JlZW1lbnQpfSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmFncmVlbWVudC5idXNpbmVzc0FncmVlbWVudCcpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGRvY3VtZW50Lm9uY2xpY2s9ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn1dKVxyXG4uY29udHJvbGxlcignZWRpdEFncmVlbWVudEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsJyRzdGF0ZVBhcmFtcycsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3QsJHN0YXRlUGFyYW1zKXtcclxuXHQkc2NvcGUuZ2V0RGV0YWlsPWZ1bmN0aW9uKHgpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdidXNpbmVzc0FncmVlbWVudCcpK3gsXHJcblx0XHRcdC8vIGRhdGE6e2lkOn0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5wcm90b2NvbElkPWRhdGEucHJvdG9jb2wucHJvdG9jb2xJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9ZGF0YS5wcm90b2NvbC5iYWNrUGVyaW9kU3R5bGU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvdG9jb2xDb2RlPWRhdGEucHJvdG9jb2wucHJvdG9jb2xDb2RlO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnByb2R1Y3RJZD1kYXRhLnByb3RvY29sLnByb2R1Y3RJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC56b25lSWQ9ZGF0YS5wcm90b2NvbC56b25lSWQ7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuY2l0eUlkPWRhdGEucHJvdG9jb2wuY2l0eUlkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmJpZFByaWNlPWRhdGEucHJvdG9jb2wuYmlkUHJpY2U7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQudXBNZXJjaGFuPWRhdGEucHJvdG9jb2wudXBNZXJjaGFuO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmxvTWVyY2hhbj1kYXRhLnByb3RvY29sLmxvTWVyY2hhbjtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5ob3NwaXRhbElkPWRhdGEucHJvdG9jb2wuaG9zcGl0YWxJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC51cEJhY2s9ZGF0YS5wcm90b2NvbC51cEJhY2s7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQubG9CYWNrPWRhdGEucHJvdG9jb2wubG9CYWNrO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnN0YXJ0VGltZT1kYXRhLnByb3RvY29sLnN0YXJ0VGltZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5lbmRUaW1lPWRhdGEucHJvdG9jb2wuZW5kVGltZTtcclxuXHRcdFx0JHNjb3BlLnN0YXJ0VGltZT1uZXcgRGF0ZShOdW1iZXIoZGF0YS5wcm90b2NvbC5zdGFydFRpbWUpKTtcclxuXHRcdFx0JHNjb3BlLmVuZFRpbWU9bmV3IERhdGUoTnVtYmVyKGRhdGEucHJvdG9jb2wuZW5kVGltZSkpO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmNvbnRhY3Rvcj1kYXRhLnByb3RvY29sLmNvbnRhY3RvcjtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5waG9uZT1kYXRhLnByb3RvY29sLnBob25lO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnFxPWRhdGEucHJvdG9jb2wucXE7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuaXNWYWxpZD1kYXRhLnByb3RvY29sLmlzVmFsaWQ7XHJcblx0XHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT1kYXRhLnByb3RvY29sLmhvc3BpdGFsLmhvc3BpdGFsTmFtZTtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT1kYXRhLnByb3RvY29sLmxvTWVyY2hhbkluZm8ubmFtZTtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT1kYXRhLnByb3RvY29sLnVwTWVyY2hhbkluZm8ubmFtZTtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT1kYXRhLnByb3RvY29sLnByb2R1Y3QucHJvZHVjdE5hbWUrJy8nK2RhdGEucHJvdG9jb2wucHJvZHVjdC5wcm9kdWN0Tm9ybXMrJy8nK2RhdGEucHJvdG9jb2wucHJvZHVjdC5tYW51ZmFjdHVyZTtcclxuXHRcdFx0JHNjb3BlLmJhY2tfcGVyaW9kX3N0eWxlPWRhdGEucHJvdG9jb2wuYmFja1BlcmlvZFN0eWxlTWFwLmJhY2tfcGVyaW9kX25hbWUrJy8nK2RhdGEucHJvdG9jb2wuYmFja1BlcmlvZFN0eWxlTWFwLmJhY2tfc3R5bGVfbmFtZTtcclxuXHRcdFx0Y29uc29sZS5sb2coJHNjb3BlKVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLmFncmVlbWVudD17XHJcblx0XHRwcm90b2NvbElkOicnLFxyXG5cdFx0YmFja1BlcmlvZFN0eWxlOicxJyxcclxuXHRcdHByb3RvY29sQ29kZTonJyxcclxuXHRcdHByb2R1Y3RJZDonJyxcclxuXHRcdHpvbmVJZDonJyxcclxuXHRcdGNpdHlJZDonJyxcclxuXHRcdGJpZFByaWNlOicnLFxyXG5cdFx0dXBNZXJjaGFuOicnLFxyXG5cdFx0bG9NZXJjaGFuOicnLFxyXG5cdFx0aG9zcGl0YWxJZDonJyxcclxuXHRcdHVwQmFjazonJyxcclxuXHRcdGxvQmFjazonJyxcclxuXHRcdHN0YXJ0VGltZTonJyxcclxuXHRcdGVuZFRpbWU6JycsXHJcblx0XHRjb250YWN0b3I6JycsXHJcblx0XHRwaG9uZTonJyxcclxuXHRcdHFxOicnLFxyXG5cdFx0aXNWYWxpZDonMScsXHJcblx0fTtcclxuXHQkc2NvcGUuc2VhcmNoS2V5PXtcclxuXHRcdHByb2R1Y3ROYW1lOicnLFxyXG5cdFx0cHJvZHVjdE5vcm1zOicnLFxyXG5cdFx0bWFudWZhY3R1cmU6JycsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHQvL+S4gOe6p+WVhuS4muWFrOWPuFxyXG5cdCRzY29wZS5zZWFyY2hLZXkxPXtcclxuXHRcdG5hbWU6JycsXHJcblx0XHRkZXNjOicnLFxyXG5cdFx0Y2xhc3NUeXBlOlwiMVwiLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0Ly/kuoznuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5Mj17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjJcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cdC8v5Yy76Zmi77yI57uI56uv77yJXHJcblx0JHNjb3BlLnNlYXJjaEtleTM9e1xyXG5cdFx0aG9zcGl0YWxOYW1lOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0Y29uc29sZS5sb2coJHN0YXRlUGFyYW1zLm9iailcclxuXHRpZigkc3RhdGVQYXJhbXMub2JqKXtcclxuXHRcdCRzY29wZS5nZXREZXRhaWwoJHN0YXRlUGFyYW1zLm9iai5wcm90b2NvbElkKTtcclxuXHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LnByb3RvY29sSWQ9JHN0YXRlUGFyYW1zLm9iai5wcm90b2NvbElkO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9JHN0YXRlUGFyYW1zLm9iai5iYWNrUGVyaW9kU3R5bGU7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LnByb3RvY29sQ29kZT0kc3RhdGVQYXJhbXMub2JqLnByb3RvY29sQ29kZTtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPSRzdGF0ZVBhcmFtcy5vYmoucHJvZHVjdElkO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC56b25lSWQ9JHN0YXRlUGFyYW1zLm9iai56b25lSWQ7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmNpdHlJZD0kc3RhdGVQYXJhbXMub2JqLmNpdHlJZDtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQuYmlkUHJpY2U9JHN0YXRlUGFyYW1zLm9iai5iaWRQcmljZTtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQudXBNZXJjaGFuPSRzdGF0ZVBhcmFtcy5vYmoudXBNZXJjaGFuO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5sb01lcmNoYW49JHN0YXRlUGFyYW1zLm9iai5sb01lcmNoYW47XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9JHN0YXRlUGFyYW1zLm9iai5ob3NwaXRhbElkO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC51cEJhY2s9JHN0YXRlUGFyYW1zLm9iai51cEJhY2s7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LmxvQmFjaz0kc3RhdGVQYXJhbXMub2JqLmxvQmFjaztcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPW5ldyBEYXRlKCRzdGF0ZVBhcmFtcy5vYmouc3RhcnRUaW1lKTtcclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQuZW5kVGltZT1uZXcgRGF0ZSgkc3RhdGVQYXJhbXMub2JqLmVuZFRpbWUpO1xyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5jb250YWN0b3I9JHN0YXRlUGFyYW1zLm9iai5jb250YWN0b3I7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LnBob25lPSRzdGF0ZVBhcmFtcy5vYmoucGhvbmU7XHJcblx0XHQvLyAkc2NvcGUuYWdyZWVtZW50LnFxPSRzdGF0ZVBhcmFtcy5vYmoucXE7XHJcblx0XHQvLyAvLyAkc2NvcGUuYWdyZWVtZW50LmlzVmFsaWQ9U3RyaW5nKCRzdGF0ZVBhcmFtcy5vYmouaXNWYWxpZCk7XHJcblx0XHQvLyAkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9JHN0YXRlUGFyYW1zLm9iai5ob3NwaXRhbC5ob3NwaXRhbE5hbWU7XHJcblx0XHQvLyAkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPSRzdGF0ZVBhcmFtcy5vYmoubG9NZXJjaGFuSW5mby5uYW1lO1xyXG5cdFx0Ly8gJHNjb3BlLnNlYXJjaEtleTEubmFtZT0kc3RhdGVQYXJhbXMub2JqLnVwTWVyY2hhbkluZm8ubmFtZTtcclxuXHRcdC8vICRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9JHN0YXRlUGFyYW1zLm9iai5wcm9kdWN0LnByb2R1Y3ROYW1lO1xyXG5cdFx0Ly8gJHNjb3BlLmJhY2tQZXJpb2RTdHlsZT0kc3RhdGVQYXJhbXMub2JqLnByb2R1Y3QucHJvZHVjdE5hbWU7XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaD1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3c9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT8kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3Byb2R1Y3RMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5wZGF0YUxpc3QgPSBkYXRhLnByb2R1Y3RzLmxpc3Q7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdD1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9eC5wcm9kdWN0TmFtZSsnLycreC5wcm9kdWN0Tm9ybXMrJy8nK3gubWFudWZhY3R1cmU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnByb2R1Y3RJZD14LmlkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuIDnuqfllYbkuJrlhazlj7hcclxuXHJcblxyXG5cdCRzY29wZS5pc1Nob3cxPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gxPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9JHNjb3BlLnNlYXJjaEtleTEubmFtZT8kc2NvcGUuc2VhcmNoS2V5MS5uYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDEgPSBkYXRhLm1lcmNoYW5zO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QxPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT14Lm5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnVwTWVyY2hhbj14Lm1lcmNoSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuoznuqfllYbkuJrlhazlj7hcclxuXHJcblx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDI9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93Mj10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT0kc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPyRzY29wZS5zZWFyY2hLZXkyLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MiA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDI9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQubG9NZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdH1cclxuXHQvL+WMu+mZou+8iOe7iOerr++8iVxyXG5cclxuXHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMz1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3czPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPyRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdob3NwTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QzID0gZGF0YS5ob3NwaXRhbHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDM9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9eC5ob3NwaXRhbE5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9eC5ob3NwaXRhbElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0fVxyXG5cdC8v6L+U5Yip5pa55byPXHJcblx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDQ9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5pc1Nob3c0PXRydWU7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmViYXRlU3R5bGUnKSxcclxuXHRcdFx0ZGF0YTp7fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDQgPSBkYXRhLnJlc3VsdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0ND1mdW5jdGlvbihiKXtcclxuXHRcdCRzY29wZS5iYWNrX3BlcmlvZF9zdHlsZT1iLmJhY2tfcGVyaW9kX25hbWUrJy8nK2IuYmFja19zdHlsZV9uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9Yi5iYWNrX2lkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0fVxyXG5cdCRzY29wZS5zYXZlPWZ1bmN0aW9uKCl7XHJcblx0XHRpZigkc2NvcGUuc3RhcnRUaW1lKXtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zdGFydFRpbWU9JHNjb3BlLnN0YXJ0VGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHRpZigkc2NvcGUuZW5kVGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuZW5kVGltZT0kc2NvcGUuZW5kVGltZS5nZXRUaW1lKCk7XHJcblx0XHR9XHJcblx0XHRjb25zb2xlLmxvZygkc2NvcGUpXHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2VkaXRNZXJjaGFuUHJvdCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5hZ3JlZW1lbnQpfSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmFncmVlbWVudC5idXNpbmVzc0FncmVlbWVudCcpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGRvY3VtZW50Lm9uY2xpY2s9ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdndWVzdEFncmVlbWVudEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3Qpe1xyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0Y3VzdG9tZXJOYW1lOicnLFxyXG5cdFx0cHJvZHVjdE5hbWU6JycsXHJcblx0XHRob3NwaXRhbDonJyxcclxuXHRcdGZsYWc6MSxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2g9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncHJvdG9jb2xMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdGRhdGEucHJvdG9jb2xzLm1hcChmdW5jdGlvbih2KXtcclxuXHRcdFx0XHRcdFx0di52YWxpZERhdGU9bmV3IERhdGUoTnVtYmVyKHYuc3RhcnRUaW1lKSkudG9Mb2NhbGVEYXRlU3RyaW5nKCkrJy0tJytuZXcgRGF0ZShOdW1iZXIodi5lbmRUaW1lKSkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiB2O1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEucHJvdG9jb2xzO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJHNjb3BlLmRhdGFMaXN0KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VhcmNoKCRzY29wZS5zZWFyY2hLZXkpO1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZEd1ZXN0QWdyZWVtZW50Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCl7XHJcblx0JHNjb3BlLmFncmVlbWVudD17XHJcblx0XHRwcm90b2NvbENvZGU6JycsXHJcblx0XHRwcm9kdWN0SWQ6JycsXHJcblx0XHR6b25lSWQ6JycsXHJcblx0XHRjaXR5SWQ6JycsXHJcblx0XHR1cHBlck1lcmNoYW46JycsXHJcblx0XHRsb3dlck1lcmNoYW46JycsXHJcblx0XHRob3NwaXRhbElkOicnLFxyXG5cdFx0cHJvbW90aW9uRXhwZW5zZTonJyxcclxuXHRcdGJhaWw6JycsXHJcblx0XHRiYWlsRGVzYzonJyxcclxuXHRcdHN0YXJ0VGltZTonJyxcclxuXHRcdGVuZFRpbWU6JycsXHJcblx0XHRpc1ZhbGlkOicxJyxcclxuXHRcdHR5cGU6JzEnLFxyXG5cdFx0aXNIb25vdXI6JzEnLFxyXG5cdFx0c3dpdGNoU3RhbmRhcmQ6JzAnLFxyXG5cdFx0c3dpdGNoQW1vdW50OicnLFxyXG5cdFx0c3dpdGNoRXhwZW5zZTonJyxcclxuXHRcdHJlYmF0ZVBlcmlvZDonMScsXHJcblx0XHRyZWJhdGVQYXllcjonMScsXHJcblx0XHRyZWJhdGU6JycsXHJcblx0XHRjdXN0b21lcklkOicxJyxcclxuXHR9O1xyXG5cdCRzY29wZS5zZWFyY2hLZXkwPXtcclxuXHRcdGN1c3RvbWVyTmFtZTonJyxcclxuXHRcdHBob25lOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblxyXG5cdCRzY29wZS5pc1Nob3cwPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gwPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzA9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZT0kc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU/JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2N1c3RvbWVyTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QwID0gZGF0YS5jdXN0b21lcnMubGlzdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0MD1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZT14LmN1c3RvbWVyTmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuY3VzdG9tZXJJZD14LmN1c3RvbWVySWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93MD1mYWxzZTtcclxuXHR9XHJcblxyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0cHJvZHVjdE5hbWU6JycsXHJcblx0XHRwcm9kdWN0Tm9ybXM6JycsXHJcblx0XHRtYW51ZmFjdHVyZTonJyxcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaD1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3c9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT8kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3Byb2R1Y3RMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5wZGF0YUxpc3QgPSBkYXRhLnByb2R1Y3RzLmxpc3Q7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdD1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU9eC5wcm9kdWN0TmFtZSsnLycreC5wcm9kdWN0Tm9ybXMrJy8nK3gubWFudWZhY3R1cmU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LnByb2R1Y3RJZD14LmlkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHR9XHJcblx0Ly/kuIDnuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5MT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjFcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMT1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cxPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPSRzY29wZS5zZWFyY2hLZXkxLm5hbWU/JHNjb3BlLnNlYXJjaEtleTEubmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjb21wYW55TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QxID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0MT1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9eC5uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC51cHBlck1lcmNoYW49eC5tZXJjaElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5LqM57qn5ZWG5Lia5YWs5Y+4XHJcblx0JHNjb3BlLnNlYXJjaEtleTI9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRjbGFzc1R5cGU6XCIyXCIsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHJcblx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDI9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93Mj10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT0kc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPyRzY29wZS5zZWFyY2hLZXkyLm5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnY29tcGFueUxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MiA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDI9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5Mi5uYW1lPXgubmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQubG93ZXJNZXJjaGFuPXgubWVyY2hJZDtcclxuXHRcdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdH1cclxuXHQvL+WMu+mZou+8iOe7iOerr++8iVxyXG5cdCRzY29wZS5zZWFyY2hLZXkzPXtcclxuXHRcdGhvc3BpdGFsTmFtZTonJyxcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cclxuXHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMz1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3czPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPyRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdob3NwTGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QzID0gZGF0YS5ob3NwaXRhbHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDM9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU9eC5ob3NwaXRhbE5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmhvc3BpdGFsSWQ9eC5ob3NwaXRhbElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0fVxyXG5cdC8v6L+U5Yip5pa55byPXHJcblx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDQ9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5pc1Nob3c0PXRydWU7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncmViYXRlU3R5bGUnKSxcclxuXHRcdFx0ZGF0YTp7fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDQgPSBkYXRhLnJlc3VsdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0ND1mdW5jdGlvbihiKXtcclxuXHRcdCRzY29wZS5iYWNrX3BlcmlvZF9zdHlsZT1iLmJhY2tfcGVyaW9kX25hbWUrJy8nK2IuYmFja19zdHlsZV9uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5ob3NwaXRhbElkPWIuaG9zcGl0YWxJZDtcclxuXHRcdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdH1cclxuXHQkc2NvcGUuc2F2ZT1mdW5jdGlvbigpe1xyXG5cdFx0aWYoJHNjb3BlLnN0YXJ0VGltZSl7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3RhcnRUaW1lPSRzY29wZS5zdGFydFRpbWUuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYoJHNjb3BlLmVuZFRpbWUpe1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmVuZFRpbWU9JHNjb3BlLmVuZFRpbWUuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gJHNjb3BlLmFncmVlbWVudC5iYWNrUGVyaW9kU3R5bGU9JHNjb3BlLmJhY2tQZXJpb2RTdHlsZS5iYWNrX2lkO1xyXG5cdFx0Y29uc29sZS5sb2coJHNjb3BlKVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdhZGRwcm90b2NvbCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5hZ3JlZW1lbnQpfSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmFncmVlbWVudC5ndWVzdEFncmVlbWVudCcpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGRvY3VtZW50Lm9uY2xpY2s9ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93MD1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzE9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93Mz1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzQ9ZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2VkaXRHdWVzdEFncmVlbWVudEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsJyRzdGF0ZVBhcmFtcycsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3QsJHN0YXRlUGFyYW1zKXtcclxuXHQkc2NvcGUuYWdyZWVtZW50PXtcclxuXHRcdHByb3RvY29sQ29kZTonJyxcclxuXHRcdHByb2R1Y3RJZDonJyxcclxuXHRcdHpvbmVJZDonJyxcclxuXHRcdGNpdHlJZDonJyxcclxuXHRcdHVwcGVyTWVyY2hhbjonJyxcclxuXHRcdGxvd2VyTWVyY2hhbjonJyxcclxuXHRcdGhvc3BpdGFsSWQ6JycsXHJcblx0XHRwcm9tb3Rpb25FeHBlbnNlOicnLFxyXG5cdFx0YmFpbDonJyxcclxuXHRcdGJhaWxEZXNjOicnLFxyXG5cdFx0c3RhcnRUaW1lOicnLFxyXG5cdFx0ZW5kVGltZTonJyxcclxuXHRcdGlzVmFsaWQ6JzEnLFxyXG5cdFx0dHlwZTonMScsXHJcblx0XHRpc0hvbm91cjonMScsXHJcblx0XHRzd2l0Y2hTdGFuZGFyZDonMCcsXHJcblx0XHRzd2l0Y2hBbW91bnQ6JycsXHJcblx0XHRzd2l0Y2hFeHBlbnNlOicnLFxyXG5cdFx0cmViYXRlUGVyaW9kOicxJyxcclxuXHRcdHJlYmF0ZVBheWVyOicxJyxcclxuXHRcdHJlYmF0ZTonJyxcclxuXHRcdGN1c3RvbWVySWQ6JzEnLFxyXG5cdH07XHJcblx0JHNjb3BlLnJlYmF0ZVBlcmlvZExpc3Q9W1xyXG5cdFx0e3ZhbHVlOlwiMVwiLG5hbWU6XCLmnIjnu5NcIn0sXHJcbiAgICAgICAge3ZhbHVlOlwiMlwiLG5hbWU6XCLljovmibnljovmnIhcIn0sXHJcbiAgICAgICAge3ZhbHVlOlwiM1wiLG5hbWU6XCI2MOWkqVwifSxcclxuICAgICAgICB7dmFsdWU6XCI0XCIsbmFtZTpcIjkw5aSpXCJ9LFxyXG4gICAgICAgIHt2YWx1ZTpcIjVcIixuYW1lOlwiMTIw5aSpXCJ9XHJcblx0XTtcclxuXHQkc2NvcGUuZ2V0RGV0YWlsPWZ1bmN0aW9uKHgpe1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdndWVzdEFncmVlbWVudCcpK3gsXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5wcm90b2NvbElkPWRhdGEucHJvdG9jb2wucHJvdG9jb2xJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5wcm90b2NvbENvZGU9ZGF0YS5wcm90b2NvbC5wcm90b2NvbENvZGU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPWRhdGEucHJvdG9jb2wucHJvZHVjdElkO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnpvbmVJZD1kYXRhLnByb3RvY29sLnpvbmVJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5jaXR5SWQ9ZGF0YS5wcm90b2NvbC5jaXR5SWQ7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQudXBwZXJNZXJjaGFuPWRhdGEucHJvdG9jb2wudXBwZXJNZXJjaGFuO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50Lmxvd2VyTWVyY2hhbj1kYXRhLnByb3RvY29sLmxvd2VyTWVyY2hhbjtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5ob3NwaXRhbElkPWRhdGEucHJvdG9jb2wuaG9zcGl0YWxJZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5wcm9tb3Rpb25FeHBlbnNlPWRhdGEucHJvdG9jb2wucHJvbW90aW9uRXhwZW5zZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5iYWlsPWRhdGEucHJvdG9jb2wuYmFpbDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5iYWlsRGVzYz1kYXRhLnByb3RvY29sLmJhaWxEZXNjO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnN0YXJ0VGltZT1kYXRhLnByb3RvY29sLnN0YXJ0VGltZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5lbmRUaW1lPWRhdGEucHJvdG9jb2wuZW5kVGltZTtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5pc1ZhbGlkPWRhdGEucHJvdG9jb2wuaXNWYWxpZDtcclxuXHRcdFx0JHNjb3BlLnN0YXJ0VGltZT1uZXcgRGF0ZShOdW1iZXIoZGF0YS5wcm90b2NvbC5zdGFydFRpbWUpKTtcclxuXHRcdFx0JHNjb3BlLmVuZFRpbWU9bmV3IERhdGUoTnVtYmVyKGRhdGEucHJvdG9jb2wuZW5kVGltZSkpO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnR5cGU9ZGF0YS5wcm90b2NvbC50eXBlO1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LmlzSG9ub3VyPWRhdGEucHJvdG9jb2wuaXNIb25vdXI7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3dpdGNoU3RhbmRhcmQ9ZGF0YS5wcm90b2NvbC5zd2l0Y2hTdGFuZGFyZDtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5zd2l0Y2hBbW91bnQ9ZGF0YS5wcm90b2NvbC5zd2l0Y2hBbW91bnQ7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuc3dpdGNoRXhwZW5zZT1kYXRhLnByb3RvY29sLnN3aXRjaEV4cGVuc2U7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQucmViYXRlUGVyaW9kPVN0cmluZyhkYXRhLnByb3RvY29sLnJlYmF0ZVBlcmlvZCk7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQucmViYXRlUGF5ZXI9ZGF0YS5wcm90b2NvbC5yZWJhdGVQYXllcjtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5yZWJhdGU9ZGF0YS5wcm90b2NvbC5yZWJhdGU7XHJcblx0XHRcdCRzY29wZS5hZ3JlZW1lbnQuY3VzdG9tZXJJZD1kYXRhLnByb3RvY29sLmN1c3RvbWVySWQ7XHJcblx0XHRcdCRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT1kYXRhLnByb3RvY29sLmhvc3BpdGFsLmhvc3BpdGFsTmFtZTtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT1kYXRhLnByb3RvY29sLmxvd2VyTWVyY2hhbkluZm8ubmFtZTtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTEubmFtZT1kYXRhLnByb3RvY29sLnVwcGVyTWVyY2hhbkluZm8ubmFtZTtcclxuXHRcdFx0JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lPWRhdGEucHJvdG9jb2wuY3VzdG9tZXIuY3VzdG9tZXJOYW1lO1xyXG5cdFx0XHQkc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPWRhdGEucHJvdG9jb2wucHJvZHVjdC5wcm9kdWN0TmFtZSsnLycrZGF0YS5wcm90b2NvbC5wcm9kdWN0LnByb2R1Y3ROb3JtcysnLycrZGF0YS5wcm90b2NvbC5wcm9kdWN0Lm1hbnVmYWN0dXJlO1xyXG5cdFx0XHRjb25zb2xlLmxvZygkc2NvcGUuYWdyZWVtZW50LnJlYmF0ZVBlcmlvZClcclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWFyY2hLZXkwPXtcclxuXHRcdGN1c3RvbWVyTmFtZTonJyxcclxuXHRcdHBob25lOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0ZmxhZzowLFxyXG5cdH07XHJcblx0Ly/kuIDnuqfllYbkuJrlhazlj7hcclxuXHQkc2NvcGUuc2VhcmNoS2V5MT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTpcIjFcIixcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cdC8v5LqM57qn5ZWG5Lia5YWs5Y+4XHJcblx0JHNjb3BlLnNlYXJjaEtleTI9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRjbGFzc1R5cGU6XCIyXCIsXHJcblx0XHRmbGFnOjAsXHJcblx0fTtcclxuXHQvL+WMu+mZou+8iOe7iOerr++8iVxyXG5cdCRzY29wZS5zZWFyY2hLZXkzPXtcclxuXHRcdGhvc3BpdGFsTmFtZTonJyxcclxuXHRcdGZsYWc6MCxcclxuXHR9O1xyXG5cdGlmKCRzdGF0ZVBhcmFtcy5vYmope1xyXG5cdFx0JHNjb3BlLmdldERldGFpbCgkc3RhdGVQYXJhbXMub2JqLnByb3RvY29sSWQpO1xyXG5cdH1cclxuXHQkc2NvcGUuaXNTaG93MD1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMD1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cwPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU9JHNjb3BlLnNlYXJjaEtleTAuY3VzdG9tZXJOYW1lPyRzY29wZS5zZWFyY2hLZXkwLmN1c3RvbWVyTmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjdXN0b21lckxpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MCA9IGRhdGEuY3VzdG9tZXJzLmxpc3Q7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDA9ZnVuY3Rpb24oeCl7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MC5jdXN0b21lck5hbWU9eC5jdXN0b21lck5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50LmN1c3RvbWVySWQ9eC5jdXN0b21lcklkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzA9ZmFsc2U7XHJcblx0fVxyXG5cclxuXHJcblx0JHNjb3BlLmlzU2hvdz1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdz10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT0kc2NvcGUuc2VhcmNoS2V5LnByb2R1Y3ROYW1lPyRzY29wZS5zZWFyY2hLZXkucHJvZHVjdE5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgncHJvZHVjdExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLnBkYXRhTGlzdCA9IGRhdGEucHJvZHVjdHMubGlzdDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0PWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleS5wcm9kdWN0TmFtZT14LnByb2R1Y3ROYW1lKycvJyt4LnByb2R1Y3ROb3JtcysnLycreC5tYW51ZmFjdHVyZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQucHJvZHVjdElkPXguaWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93PWZhbHNlO1xyXG5cdH1cclxuXHQvL+S4gOe6p+WVhuS4muWFrOWPuFxyXG5cclxuXHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHQkc2NvcGUuc2VhcmNoMT1mdW5jdGlvbihkYXRhKXtcclxuXHRcdCRzY29wZS5pc1Nob3cxPXRydWU7XHJcblx0XHQkc2NvcGUuc2VhcmNoS2V5MS5uYW1lPSRzY29wZS5zZWFyY2hLZXkxLm5hbWU/JHNjb3BlLnNlYXJjaEtleTEubmFtZTonJztcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjb21wYW55TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QxID0gZGF0YS5tZXJjaGFucztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5zZWxlY3RQcm9kdWN0MT1mdW5jdGlvbih4KXtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkxLm5hbWU9eC5uYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC51cHBlck1lcmNoYW49eC5tZXJjaElkO1xyXG5cdFx0JHNjb3BlLmlzU2hvdzE9ZmFsc2U7XHJcblx0fVxyXG5cdC8v5LqM57qn5ZWG5Lia5YWs5Y+4XHJcblxyXG5cdCRzY29wZS5pc1Nob3cyPWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2gyPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0JHNjb3BlLmlzU2hvdzI9dHJ1ZTtcclxuXHRcdCRzY29wZS5zZWFyY2hLZXkyLm5hbWU9JHNjb3BlLnNlYXJjaEtleTIubmFtZT8kc2NvcGUuc2VhcmNoS2V5Mi5uYW1lOicnO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdDIgPSBkYXRhLm1lcmNoYW5zO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QyPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTIubmFtZT14Lm5hbWU7XHJcblx0XHQkc2NvcGUuYWdyZWVtZW50Lmxvd2VyTWVyY2hhbj14Lm1lcmNoSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93Mj1mYWxzZTtcclxuXHR9XHJcblx0Ly/ljLvpmaLvvIjnu4jnq6/vvIlcclxuXHJcblx0JHNjb3BlLmlzU2hvdzM9ZmFsc2U7XHJcblx0JHNjb3BlLnNlYXJjaDM9ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQkc2NvcGUuaXNTaG93Mz10cnVlO1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPSRzY29wZS5zZWFyY2hLZXkzLmhvc3BpdGFsTmFtZT8kc2NvcGUuc2VhcmNoS2V5My5ob3NwaXRhbE5hbWU6Jyc7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnaG9zcExpc3QnKSxcclxuXHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0MyA9IGRhdGEuaG9zcGl0YWxzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlbGVjdFByb2R1Y3QzPWZ1bmN0aW9uKHgpe1xyXG5cdFx0JHNjb3BlLnNlYXJjaEtleTMuaG9zcGl0YWxOYW1lPXguaG9zcGl0YWxOYW1lO1xyXG5cdFx0JHNjb3BlLmFncmVlbWVudC5ob3NwaXRhbElkPXguaG9zcGl0YWxJZDtcclxuXHRcdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdH1cclxuXHQvL+i/lOWIqeaWueW8j1xyXG5cdCRzY29wZS5pc1Nob3c0PWZhbHNlO1xyXG5cdCRzY29wZS5zZWFyY2g0PWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUuaXNTaG93ND10cnVlO1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3JlYmF0ZVN0eWxlJyksXHJcblx0XHRcdGRhdGE6e30sXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3Q0ID0gZGF0YS5yZXN1bHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VsZWN0UHJvZHVjdDQ9ZnVuY3Rpb24oYil7XHJcblx0XHQkc2NvcGUuYmFja19wZXJpb2Rfc3R5bGU9Yi5iYWNrX3BlcmlvZF9uYW1lKycvJytiLmJhY2tfc3R5bGVfbmFtZTtcclxuXHRcdCRzY29wZS5hZ3JlZW1lbnQuaG9zcGl0YWxJZD1iLmhvc3BpdGFsSWQ7XHJcblx0XHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHR9XHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5zdGFydFRpbWUpe1xyXG5cdFx0XHQkc2NvcGUuYWdyZWVtZW50LnN0YXJ0VGltZT0kc2NvcGUuc3RhcnRUaW1lLmdldFRpbWUoKTtcclxuXHRcdH1cclxuXHRcdGlmKCRzY29wZS5lbmRUaW1lKXtcclxuXHRcdFx0JHNjb3BlLmFncmVlbWVudC5lbmRUaW1lPSRzY29wZS5lbmRUaW1lLmdldFRpbWUoKTtcclxuXHRcdH1cclxuXHRcdC8vICRzY29wZS5hZ3JlZW1lbnQuYmFja1BlcmlvZFN0eWxlPSRzY29wZS5iYWNrUGVyaW9kU3R5bGUuYmFja19pZDtcclxuXHRcdGNvbnNvbGUubG9nKCRzY29wZSlcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZWRpdHByb3RvY29sJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmFncmVlbWVudCl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUuYWdyZWVtZW50Lmd1ZXN0QWdyZWVtZW50Jyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0ZG9jdW1lbnQub25jbGljaz1mdW5jdGlvbigpe1xyXG5cdFx0JHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRzY29wZS5pc1Nob3c9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3cwPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93MT1mYWxzZTtcclxuXHRcdFx0JHNjb3BlLmlzU2hvdzI9ZmFsc2U7XHJcblx0XHRcdCRzY29wZS5pc1Nob3czPWZhbHNlO1xyXG5cdFx0XHQkc2NvcGUuaXNTaG93ND1mYWxzZTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdhZ3JlZW1lbnQucm91dGVyJyxbJ2FncmVlbWVudC5jdHJsJ10pXHJcbi5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHQkc3RhdGVQcm92aWRlclxyXG5cdC5zdGF0ZSgnaG9tZS5hZ3JlZW1lbnQnLHtcclxuXHRcdHVybDonL2FncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9hZ3JlZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidhZ3JlZW1lbnRDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmFncmVlbWVudC5idXNpbmVzc0FncmVlbWVudCcse1xyXG5cdFx0dXJsOicvYnVzaW5lc3NBZ3JlZW1lbnQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9hZ3JlZW1lbnQvYnVzaW5lc3NBZ3JlZW1lbnQvYnVzaW5lc3NBZ3JlZW1lbnQuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOididXNpbmVzc0FncmVlbWVudEN0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5hZ3JlZW1lbnQuYWRkQWdyZWVtZW50Jyx7XHJcblx0XHR1cmw6Jy9hZGRBZ3JlZW1lbnQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9hZ3JlZW1lbnQvYnVzaW5lc3NBZ3JlZW1lbnQvYWRkQWdyZWVtZW50Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRkQWdyZWVtZW50Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5hZ3JlZW1lbnQuZWRpdEFncmVlbWVudCcse1xyXG5cdFx0dXJsOicvZWRpdGFncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9idXNpbmVzc0FncmVlbWVudC9hZ3JlZW1lbnRFZGl0Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZWRpdEFncmVlbWVudEN0cmwnLFxyXG5cdFx0cGFyYW1zOiB7XHJcblx0ICAgICAgICBvYmo6IG51bGwgXHJcblx0ICAgIH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5hZ3JlZW1lbnQuZ3Vlc3RBZ3JlZW1lbnQnLHtcclxuXHRcdHVybDonL2d1ZXN0QWdyZWVtZW50JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvYWdyZWVtZW50L2d1ZXN0QWdyZWVtZW50L2d1ZXN0QWdyZWVtZW50Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZ3Vlc3RBZ3JlZW1lbnRDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuYWdyZWVtZW50LmFkZEd1ZXN0QWdyZWVtZW50Jyx7XHJcblx0XHR1cmw6Jy9hZGRHdWVzdEFncmVlbWVudCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FncmVlbWVudC9ndWVzdEFncmVlbWVudC9hZGRHdWVzdEFncmVlbWVudC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FkZEd1ZXN0QWdyZWVtZW50Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5hZ3JlZW1lbnQuZWRpdEd1ZXN0QWdyZWVtZW50Jyx7XHJcblx0XHR1cmw6Jy9lZGl0R3Vlc3RBZ3JlZW1lbnQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9hZ3JlZW1lbnQvZ3Vlc3RBZ3JlZW1lbnQvZWRpdEd1ZXN0QWdyZWVtZW50Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZWRpdEd1ZXN0QWdyZWVtZW50Q3RybCcsXHJcblx0XHRwYXJhbXM6IHtcclxuXHQgICAgICAgIG9iajogbnVsbCBcclxuXHQgICAgfVxyXG5cdH0pXHJcblxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZShcImFwcFwiLFtcInVpLnJvdXRlclwiLCdyb3V0ZXInLCdwdWJ1bGljJywndG0ucGFnaW5hdGlvbiddKVxyXG4vLyAuZGlyZWN0aXZlKCdkaWFsb2cnLGZ1bmN0aW9uKCl7XHJcbi8vIFx0cmV0dXJuIHtcclxuLy8gXHRcdHJlc3RyaWN0OidFQUMnLFxyXG4vLyBcdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL2NvbW1vbi9tb2RhbC5odG1sJ1xyXG4vLyBcdH1cclxuLy8gfSlcclxuLy8gLmRpcmVjdGl2ZSgndGlwYWxlcnQnLGZ1bmN0aW9uKCl7XHJcbi8vIFx0cmV0dXJuIHtcclxuLy8gXHRcdHJlc3RyaWN0OidFQUMnLFxyXG4vLyBcdFx0cmVwbGFjZTp0cnVlLFxyXG4vLyBcdFx0dGVtcGxhdGU6XCI8ZGl2IGNsYXNzPSd0aXAtYWxlcnQnIG5nLXNob3c9J3RpcF9hbGVydF9zaG93Jz5cIitcclxuLy8gXHRcdFx0XCI8ZGl2IGNsYXNzPSd0aXAtY292ZXInPjwvZGl2PlwiK1xyXG4vLyBcdFx0XHRcIjxzcGFuIG5nLWJpbmQ9J3RpcF9hbGVydF9tc2cnIG5nLT48L3NwYW4+XCIrXHJcbi8vIFx0XHRcIjwvZGl2PlwiLFxyXG4vLyBcdFx0bGluazpmdW5jdGlvbihzY29wZSxlbGVtZW50LGF0dHJzKXtcclxuLy8gXHRcdFx0c2NvcGUudGlwX2FsZXJ0X3Nob3c9ZmFsc2U7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG4vLyB9KVxyXG4vLyAuZGlyZWN0aXZlKCd0aXBMb2cnLFsnJHJvb3RTY29wZScsJyR0aW1lb3V0JyxmdW5jdGlvbigkcm9vdFNjb3BlLCR0aW1lb3V0KXtcclxuLy8gXHRyZXR1cm4ge1xyXG4vLyBcdFx0cmVzdHJpY3Q6J0VBQycsXHJcbi8vIFx0XHRyZXBsYWNlOnRydWUsXHJcbi8vIFx0XHR0ZW1wbGF0ZTpcIjxkaXYgY2xhc3M9J3RpcC1hbGVydCcgbmctc2hvdz0ndGlwX2FsZXJ0X3Nob3cnPlwiK1xyXG4vLyBcdFx0XHRcIjxkaXYgY2xhc3M9J3RpcC1jb3Zlcic+PC9kaXY+XCIrXHJcbi8vIFx0XHRcdFwiPHNwYW4gbmctYmluZD0ndGlwX2FsZXJ0X21zZycgbmctPjwvc3Bhbj5cIitcclxuLy8gXHRcdFwiPC9kaXY+XCIsXHJcbi8vIFx0XHRsaW5rOmZ1bmN0aW9uKHNjb3BlLGVsZW1lbnQsYXR0cnMpe1xyXG4vLyBcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz1mYWxzZTtcclxuLy8gXHRcdFx0JHJvb3RTY29wZS4kb24oJ3RpcGxvZycsZnVuY3Rpb24oZSxkYXRhKXtcclxuLy8gXHRcdFx0XHRpZihkYXRhJiZ0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKXtcclxuLy8gXHRcdFx0XHRcdHNjb3BlLnRpcF9hbGVydF9zaG93ID0gdHJ1ZTtcclxuLy8gXHRcdFx0XHRcdHNjb3BlLnRpcF9hbGVydF9tc2cgPSBkYXRhO1xyXG4vLyBcdFx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHRcdFx0c2NvcGUudGlwX2FsZXJ0X3Nob3c9ZmFsc2U7XHJcbi8vIFx0XHRcdFx0XHR9LDIwMDApXHJcbi8vIFx0XHRcdFx0fVxyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fVxyXG4vLyBcdH1cclxuLy8gfV0pXHJcbi8vIC5kaXJlY3RpdmUoJ2RpYWxvZycsZnVuY3Rpb24oKXtcclxuLy8gXHRyZXR1cm4ge1xyXG4vLyBcdFx0cmVzdHJpY3Q6J0VBQycsXHJcbi8vIFx0XHR0ZW1wbGF0ZVVybDonc3JjL2Rpc3Qvdmlld3MvY29tbW9uL21vZGFsLmh0bWwnXHJcbi8vIFx0fVxyXG4vLyB9KVxyXG4uZGlyZWN0aXZlKCd0aXBhbGVydCcsZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6J0VBQycsXHJcblx0XHRyZXBsYWNlOnRydWUsXHJcblx0XHR0ZW1wbGF0ZTpcIjxkaXYgY2xhc3M9J3RpcC1hbGVydCcgbmctY2xhc3M9J3RpcF9hbGVydF90eXBlJyBuZy1zaG93PSd0aXBfYWxlcnRfc2hvdyc+XCIrXHJcblx0XHRcdFwiPHNwYW4gbmctYmluZD0ndGlwX2FsZXJ0X21zZy50eHQnIG5nLWNsaWNrPSdjbG9zZUFsZXJ0KCknPjwvc3Bhbj5cIitcclxuXHRcdFx0XCI8aT48L2k+XCIrXHJcblx0XHRcdFwiPC9kaXY+XCIsXHJcblx0XHRsaW5rOmZ1bmN0aW9uKHNjb3BlLGVsZW1lbnQsYXR0cnMpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhzY29wZSxlbGVtZW50KVxyXG5cdFx0XHRzY29wZS5jbG9zZUFsZXJ0PWZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2NvcGUudGlwX2FsZXJ0X3Nob3cgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSlcclxuLmRpcmVjdGl2ZShcImFsZXJ0TW9kYWxcIixmdW5jdGlvbigpe1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDonRUFDJyxcclxuXHRcdHJlcGxhY2U6dHJ1ZSxcclxuXHRcdHRlbXBsYXRlVXJsOlwieWtmX3RwbF9hbGVydF9tb2RhbFwiLFxyXG5cdFx0bGluazpmdW5jdGlvbihzY29wZSl7XHJcblx0XHRcdHNjb3BlLnlrZl9hbGVydF9zaG93ID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4uZGlyZWN0aXZlKCdjaXR5cycsWydIdHRwJywnVXJsJyxmdW5jdGlvbihIdHRwLFVybCl7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OidFQUMnLFxyXG5cdFx0dGVtcGxhdGVVcmw6J2NpdHlzJyxcclxuXHRcdHNjb3BlOntcclxuXHRcdFx0YXJlYTonPW15QXJlYScsXHJcblx0XHRcdGNpdHk6Jz1teUNpdHknXHJcblx0XHR9LFxyXG5cdFx0bGluazpmdW5jdGlvbihzY29wZSxlbGUsYXR0cnMpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhhdHRycyk7XHJcblx0XHRcdHNjb3BlLiR3YXRjaCgnYXJlYScsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRIdHRwLmdldCh7XHJcblx0XHRcdFx0XHR1cmw6VXJsLmdldFVybCgnZ2V0Q2l0eUxpc3QnKSsnLycrc2NvcGUuYXJlYVxyXG5cdFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdFx0c2NvcGUuY2l0eUxpc3QgPSBkYXRhLmNpdGllcztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0XHR1cmw6VXJsLmdldFVybCgnZ2V0QXJlYXNMaXN0JylcclxuXHRcdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHRzY29wZS5hcmVhc0xpc3QgPSBkYXRhLnpvbmVzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdwdWJ1bGljJyxbXSlcclxuLmZhY3RvcnkoJ0h0dHAnLFsnJGh0dHAnLCckc3RhdGUnLCckcm9vdFNjb3BlJyxmdW5jdGlvbigkaHR0cCwkc3RhdGUsJHJvb3RTY29wZSl7XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldDpmdW5jdGlvbihqc29uKXtcclxuXHRcdFx0dmFyIGRhdGEgPSBqc29uLnBhcmFtc3x8JycsdXJsID0ganNvbi51cmw7XHRcdFxyXG5cdFx0XHR2YXIgcHJvbWlzZSA9ICRodHRwKHtcclxuXHRcdFx0XHRtZXRob2Q6J2dldCcsXHJcblx0XHRcdFx0cGFyYW1zOmRhdGEsXHJcblx0XHRcdFx0dXJsOnVybFxyXG5cdFx0XHR9KVxyXG5cdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0XHRpZihtc2cuZGF0YS5jb2RlPT02NjY2KXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW5Db21wYW55Jyk7XHJcblx0XHRcdFx0fWVsc2UgaWYobXNnLmRhdGEuY29kZT09MjIyMil7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRwb3N0OmZ1bmN0aW9uKGpzb24pe1xyXG5cdFx0XHR2YXIgZGF0YSA9IGpzb24uZGF0YXx8JycsdXJsID0ganNvbi51cmw7XHJcblx0XHRcdHZhciBwcm9taXNlID0gJGh0dHAoe1xyXG5cdFx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdFx0ZGF0YTpkYXRhLFxyXG5cdFx0XHRcdHVybDp1cmxcclxuXHRcdFx0fSlcclxuXHRcdFx0cHJvbWlzZS50aGVuKGZ1bmN0aW9uKG1zZyl7XHJcblx0XHRcdFx0aWYobXNnLmRhdGEuY29kZT09NjY2Nil7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2xvZ2luQ29tcGFueScpO1xyXG5cdFx0XHRcdH1lbHNlIGlmKG1zZy5kYXRhLmNvZGU9PTIyMjIpe1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHR9LFxyXG5cdFx0cG9zdEY6ZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdHZhciBkYXRhID0ganNvbi5kYXRhfHwnJyx1cmwgPSBqc29uLnVybDtcclxuXHRcdFx0dmFyIHByb21pc2UgPSAkaHR0cCh7XHJcblx0XHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LCAgXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcCBpbiBvYmopeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTsgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0XHRpZihtc2cuZGF0YS5jb2RlPT02NjY2KXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW5Db21wYW55Jyk7XHJcblx0XHRcdFx0fWVsc2UgaWYobXNnLmRhdGEuY29kZT09MjIyMil7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdH0sXHJcblx0XHRieUZvcm06ZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdHZhciBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG5cdFx0XHRmLm1ldGhvZCA9IFwicG9zdFwiO1xyXG5cdFx0XHRmLmVuY3R5cGUgPSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjtcclxuXHRcdFx0Zi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdHNjb3BlID0ganNvbi5zY29wZXx8e307XHJcblx0XHRcdHZhciBmX2luID0ge307XHJcblx0XHRcdGlmKGpzb24uZGF0YSl7XHJcblx0XHRcdFx0Zm9yKHZhciBpIGluIGpzb24uZGF0YSl7XHJcblx0XHRcdFx0XHRmX2luW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHRcdFx0XHRcdGZfaW5baV0ubmFtZSA9IGk7XHJcblx0XHRcdFx0XHRmX2luW2ldLnZhbHVlID0ganNvbi5kYXRhW2ldO1xyXG5cdFx0XHRcdFx0Zi5hcHBlbmRDaGlsZChmX2luW2ldKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGZfaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblx0XHRcdGZfaS50eXBlID0gXCJmaWxlXCI7XHJcblx0XHRcdGZfaS5uYW1lID0ganNvbi5maWxlTmFtZXx8Jyc7XHJcblx0XHRcdGZfaS5hY2NlcHQgPSBqc29uLmFjY2VwdHx8Jyc7XHJcblx0XHRcdGZfaS5tdWx0aXBsZSA9IGpzb24ubXVsdGlwbGV8fCcnO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhmX2kpO1xyXG5cdFx0XHQoZnVuY3Rpb24oanNvbil7XHJcblx0XHRcdFx0Zl9pLm9uY2hhbmdlID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRodHRwKHtcclxuXHRcdFx0XHRcdFx0dXJsOmpzb24udXJsLFxyXG5cdFx0XHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgRF9hdGEgPSBuZXcgRm9ybURhdGEoZik7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIERfYXRhXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdGRhdGEueWtmX2VfZmlsZSA9IGZfaS5maWxlc1swXTtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmKTtcclxuXHRcdFx0XHRcdFx0anNvbi5zdWNjZXNzJiZqc29uLnN1Y2Nlc3MoZGF0YSk7XHJcblx0XHRcdFx0XHR9KS5lcnJvcihmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdFx0anNvbi5zdWNjZXNzLmVycm9yJiZqc29uLnN1Y2Nlc3MuZXJyb3IoZSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkoanNvbilcclxuXHRcdFx0Zi5hcHBlbmRDaGlsZChmX2kpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGYpO1xyXG5cdFx0XHRmX2kuY2xpY2soKTtcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uZmFjdG9yeShcIkVsZVwiLGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHtcclxuXHRcdGU6ZnVuY3Rpb24ob2JqLGNvbnRlbnQpe1xyXG5cdFx0XHR2YXIgZmlyc3RDaGFyPW9iai5jaGFyQXQoMCk7XHJcblx0XHRcdHZhciBjb250ZW50PWNvbnRlbnR8fGRvY3VtZW50O1xyXG5cdFx0XHRpZihmaXJzdENoYXI9PVwiI1wiKXtcclxuXHRcdFx0XHRyZXR1cm4gY29udGVudC5nZXRFbGVtZW50QnlJZChvYmouc3Vic3RyaW5nKDEpKTtcclxuXHRcdFx0fWVsc2UgaWYoZmlyc3RDaGFyPT1cIi5cIil7XHJcblx0XHRcdFx0dmFyIGFycj1bXTtcclxuXHRcdFx0XHR2YXIgYUVscz1jb250ZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKTtcclxuXHRcdFx0XHRcdGZvcih2YXIgaT0wO2k8YUVscy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0XHRcdFx0XHR2YXIgYUNsYXNzTmFtZT1cdGFFbHNbaV0uY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcclxuXHRcdFx0XHRcdFx0XHRcdCBmb3IodmFyIGo9MDtqPGFDbGFzc05hbWUubGVuZ3RoO2orKyl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGFDbGFzc05hbWVbal09PW9iai5zbGljZSgxKSl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YXJyLnB1c2goYUVsc1tpXSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHQgfVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gYXJyO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUob2JqKTtcclxuXHRcdFx0fVxyXG5cdFx0XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4uZmFjdG9yeSgnVGlwJyxbJyR0aW1lb3V0JyxcIkVsZVwiLGZ1bmN0aW9uKCR0aW1lb3V0LEVsZSl7XHJcblx0cmV0dXJuIHtcclxuXHRcdC8v5a+56K+d5qGG77yM5Lyg5Y+C5Li65a+56K+d5L+h5oGv77yM56Gu6K6k5LmL5ZCO55qE5Yqo5L2c77yM5YWz6Zet5LmL5ZCO55qE5Yqo5L2cXHJcblx0XHRDb25maXJtOmZ1bmN0aW9uKHNjb3BlLG1hc3NhZ2UsY2FsbGJhY2sxLGNhbGxiYWNrMil7XHJcblx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fc2hvdz10cnVlO1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBtYXNzYWdlPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRcdGlmKG1hc3NhZ2UudGl0bGUpe1xyXG5cdFx0XHRcdFx0XHRzY29wZS55a2ZfY29uZmlybV90aXRsZV9zaG93PXRydWU7XHJcblx0XHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX3RpdGxlID0gbWFzc2FnZS50aXRsZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX21zZyA9IG1hc3NhZ2UubXNnO1xyXG5cdFx0XHRcdH1lbHNlIGlmKHR5cGVvZiBtYXNzYWdlPT1cInN0cmluZ1wiKXtcclxuXHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX21zZyA9IG1hc3NhZ2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVx0XHJcblx0XHRcdHNjb3BlLmNvbmZpcm1fc2hvdyA9ICdjb25maXJtLXNob3cnO1xyXG5cdFx0XHRzY29wZS55a2ZfbW9kYWxfc3VyZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdHNjb3BlLmNvbmZpcm1fc2hvdyA9ICdjb25maXJtLW91dCc7XHJcblx0XHRcdFx0XHRzY29wZS55a2ZfY29uZmlybV9zaG93PWZhbHNlO1xyXG5cdFx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fdGl0bGVfc2hvdz1mYWxzZTtcclxuXHRcdFx0XHR9KVx0XHJcblx0XHRcdFx0Y2FsbGJhY2sxJiZjYWxsYmFjazEoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzY29wZS55a2ZfbW9kYWxfY2xvc2UgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRzY29wZS5jb25maXJtX3Nob3cgPSAnY29uZmlybS1vdXQnO1xyXG5cdFx0XHRcdFx0c2NvcGUueWtmX2NvbmZpcm1fc2hvdz1mYWxzZTtcclxuXHRcdFx0XHRcdHNjb3BlLnlrZl9jb25maXJtX3RpdGxlX3Nob3c9ZmFsc2U7XHJcblx0XHRcdFx0fSlcdFxyXG5cdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRMb2c6ZnVuY3Rpb24oc2NvcGUsbXNnLGNiKXtcclxuXHRcdFx0Y29uc29sZS5sb2coKVxyXG5cdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHNjb3BlLnRpcF9hbGVydF9tc2c9bXNnO1xyXG5cdFx0XHRcdGlmKHNjb3BlLnRpcF9hbGVydF9tc2cudHlwZT09MSl7XHJcblx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfdHlwZT1cInRpcC1hbGVydC1zdWNjZXNzXCI7XHJcblx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz1mYWxzZTtcclxuXHRcdFx0XHRcdFx0Y2ImJmNiKCk7XHJcblx0XHRcdFx0XHR9LDEwMDApXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRzY29wZS50aXBfYWxlcnRfdHlwZT1cInRpcC1hbGVydC1lcnJvclwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzY29wZS50aXBfYWxlcnRfc2hvdz10cnVlO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHRcdEFsZXJ0OmZ1bmN0aW9uKHNjb3BlLG1lc3NhZ2UsY2Ipe1xyXG5cdFx0XHRzY29wZS55a2ZfYWxlcnRfc2hvdyA9IHRydWU7XHJcblx0XHRcdHNjb3BlLnlrZl9hbGVydF9tc2cgPSBtZXNzYWdlO1xyXG5cdFx0XHRzY29wZS55a2ZfYWxlcnRfc3VyZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2NvcGUueWtmX2FsZXJ0X3Nob3cgPSBmYWxzZTtcclxuXHRcdFx0XHRjYiYmY2IoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcbn1dKVxyXG4vLyAuZmFjdG9yeSgnVGlwJyxbJyR0aW1lb3V0JywnJHJvb3RTY29wZScsZnVuY3Rpb24oJHRpbWVvdXQsJHJvb3RTY29wZSl7XHJcbi8vIFx0cmV0dXJuIHtcclxuLy8gXHRcdC8v5by556qX5o+Q56S677yM56ys5LiA5Liq5Y+C5pWw5Li65o+Q56S65YaF5a6577yM6Iul5pS55Y+YdGl0bGXlkozlrr3luqbnrKzkuIDkuKrlj4LmlbDpnIDkvKDlkKvmnIl0aXRsZeWSjG1zZ+S4pOS4quWPguaVsOeahOWvueixoVxyXG4vLyBcdFx0Ly/nrKzkuozlj4LmlbDkuLrlm57osIPlh73mlbBcclxuLy8gXHRcdEFsZXJ0OmZ1bmN0aW9uKG1hc3NhZ2UsY2FsbGJhY2spe1xyXG4vLyBcdFx0XHR2YXIgZGlhbG9nVGl0LGRpYWxvZ01zZyxkaWFsb2dXaWR0aDtcclxuLy8gXHRcdFx0aWYodHlwZW9mIG1hc3NhZ2UgPT0nb2JqZWN0Jyl7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nVGl0ID0gbWFzc2FnZS50aXRsZT9tYXNzYWdlLnRpdGxlOifmnaXoh6onK3dpbmRvdy5sb2NhdGlvbi5ob3N0KyfnmoTmj5DnpLonO1xyXG4vLyBcdFx0XHRcdGRpYWxvZ01zZyA9IG1hc3NhZ2UubXNnP21hc3NhZ2UubXNnOicnO1xyXG4vLyBcdFx0XHRcdGRpYWxvZ1dpZHRoID0gbWFzc2FnZS53aWR0aD9tYXNzYWdlLndpZHRoOmZhbHNlO1xyXG4vLyBcdFx0XHR9ZWxzZSBpZih0eXBlb2YgbWFzc2FnZSA9PSdzdHJpbmcnKXtcclxuLy8gXHRcdFx0XHRkaWFsb2dUaXQgPSAn5p2l6IeqJyt3aW5kb3cubG9jYXRpb24uaG9zdCsn55qE5o+Q56S6JztcclxuLy8gXHRcdFx0XHRkaWFsb2dNc2cgPSBtYXNzYWdlO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS5oaWRlKCk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnRleHQoJ+ehruiupCcpO1xyXG4vLyBcdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS50ZXh0KGRpYWxvZ1RpdCk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dNc2cnKS50ZXh0KGRpYWxvZ01zZyk7XHJcbi8vIFx0XHRcdCQoJyNteURpYWxvZycpLm9uZSgnaGlkZGVuLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrJiZjYWxsYmFjaygpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnRleHQoJ+WPlua2iCcpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS5zaG93KCk7XHJcbi8vIFx0XHRcdFx0JCgnLm1vZGFsLWNvbnRlbnQnKS5hdHRyKFwic3R5bGVcIixcIlwiKTtcclxuLy8gXHRcdFx0fSk7XHJcbi8vIFx0XHRcdGlmKGRpYWxvZ1dpZHRoKSAkKCcubW9kYWwtY29udGVudCcpLmNzcyh7d2lkdGg6cGFyc2VJbnQod2lkdGgpLG1hcmdpbjonMCBhdXRvJ30pO1xyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCh7XHJcbi8vIFx0XHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnXHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHR9LFxyXG4vLyBcdFx0Ly/lr7nor53moYbvvIzkvKDlj4LkuLrlr7nor53kv6Hmga/vvIznoa7orqTkuYvlkI7nmoTliqjkvZzvvIzlhbPpl63kuYvlkI7nmoTliqjkvZxcclxuLy8gXHRcdENvbmZpcm06ZnVuY3Rpb24obWFzc2FnZSxjYWxsYmFjazEsY2FsbGJhY2syKXtcclxuLy8gXHRcdFx0dmFyIGRpYWxvZ1RpdCxkaWFsb2dNc2csZGlhbG9nV2lkdGg7XHJcbi8vIFx0XHRcdGlmKHR5cGVvZiBtYXNzYWdlID09J29iamVjdCcpe1xyXG4vLyBcdFx0XHRcdGRpYWxvZ1RpdCA9IG1hc3NhZ2UudGl0bGU/bWFzc2FnZS50aXRsZTon5p2l6IeqJyt3aW5kb3cubG9jYXRpb24uaG9zdCsn55qE5o+Q56S6JztcclxuLy8gXHRcdFx0XHRkaWFsb2dNc2cgPSBtYXNzYWdlLm1zZz9tYXNzYWdlLm1zZzonJztcclxuLy8gXHRcdFx0XHRkaWFsb2dXaWR0aCA9IG1hc3NhZ2Uud2lkdGg/bWFzc2FnZS53aWR0aDpmYWxzZTtcclxuLy8gXHRcdFx0fWVsc2UgaWYodHlwZW9mIG1hc3NhZ2UgPT0nc3RyaW5nJyl7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nVGl0ID0gJ+adpeiHqicrd2luZG93LmxvY2F0aW9uLmhvc3QrJ+eahOaPkOekuic7XHJcbi8vIFx0XHRcdFx0ZGlhbG9nTXNnID0gbWFzc2FnZTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS50ZXh0KGRpYWxvZ1RpdCk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dNc2cnKS50ZXh0KGRpYWxvZ01zZyk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazImJmNhbGxiYWNrMigpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjZGlhbG9nQ2xvc2VUJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoJ2hpZGUnKTtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazEmJmNhbGxiYWNrMSgpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlVCcpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2hhbmdlJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJy5tb2RhbC1jb250ZW50JykuYXR0cihcInN0eWxlXCIsXCJcIik7XHJcbi8vIFx0XHRcdH0pO1xyXG4vLyBcdFx0XHRpZihkaWFsb2dXaWR0aCkgJCgnLm1vZGFsLWNvbnRlbnQnKS5jc3Moe3dpZHRoOnBhcnNlSW50KGRpYWxvZ1dpZHRoKSxtYXJnaW46JzAgYXV0byd9KTtcclxuLy8gXHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoe1xyXG4vLyBcdFx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJ1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSxcclxuLy8gXHRcdENoZWNrOmZ1bmN0aW9uKGNhbGxiYWNrMSxjYWxsYmFjazIpe1xyXG4vLyBcdFx0XHR2YXIgZGlhbG9nVGl0LGRpYWxvZ01zZyxkaWFsb2dXaWR0aD00MDA7XHJcbi8vIFx0XHRcdGRpYWxvZ01zZz0nPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+JytcclxuLy8gXHRcdFx0XHRcdCAgICAnPGxhYmVsPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgICAnPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJzcVwiIHZhbHVlPVwia2Z6XCIgY2xhc3M9XCJ3ZWNoYXRfcmFkaW9cIj4g5YWs5LyX5Y+35byA5Y+R6ICF5o6I5p2DJytcclxuLy8gXHRcdFx0XHRcdCAgICAnPC9sYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAnPC9kaXY+JytcclxuLy8gXHRcdFx0XHRcdCAgJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgJzxsYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICAgJzxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwic3FcIiB2YWx1ZT1cInB0XCIgY2xhc3M9XCJ3ZWNoYXRfcmFkaW9cIj4g5YWs5LyX5Y+356ys5LiJ5pa55bmz5Y+w5o6I5p2DJytcclxuLy8gXHRcdFx0XHRcdCAgICAnPC9sYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAnPC9kaXY+JztcclxuLy8gXHRcdFx0ZGlhbG9nVGl0PSfpgInmi6nnu5HlrprmlrnlvI8nO1xyXG4vLyBcdFx0XHQkKCcjZGlhbG9nVGl0bGUnKS5odG1sKGRpYWxvZ1RpdCk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dNc2cnKS5odG1sKGRpYWxvZ01zZyk7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazImJmNhbGxiYWNrMigpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjZGlhbG9nQ2xvc2VUJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDaGFuZ2UnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoJ2hpZGUnKTtcclxuLy8gXHRcdFx0XHRjYWxsYmFjazEmJmNhbGxiYWNrMSgpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLmh0bWwoJycpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dNc2cnKS5odG1sKCcnKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdFx0JCgnI215RGlhbG9nJykub25lKCdoaWRkZW4uYnMubW9kYWwnLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJyNkaWFsb2dDbG9zZVQnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcubW9kYWwtY29udGVudCcpLmF0dHIoXCJzdHlsZVwiLFwiXCIpO1xyXG4vLyBcdFx0XHR9KTtcclxuLy8gXHRcdFx0aWYoZGlhbG9nV2lkdGgpICQoJy5tb2RhbC1jb250ZW50JykuY3NzKHt3aWR0aDpwYXJzZUludChkaWFsb2dXaWR0aCksbWFyZ2luOicwIGF1dG8nfSk7XHJcbi8vIFx0XHRcdCQoJyNteURpYWxvZycpLm1vZGFsKHtcclxuLy8gXHRcdFx0XHRiYWNrZHJvcDogJ3N0YXRpYydcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdH0sXHJcbi8vIFx0XHRDaGVja2JveDpmdW5jdGlvbihjYWxsYmFjazEsY2FsbGJhY2syKXtcclxuLy8gXHRcdFx0dmFyIGRpYWxvZ1RpdCxkaWFsb2dNc2csZGlhbG9nV2lkdGg9NDAwO1xyXG4vLyBcdFx0XHRkaWFsb2dNc2c9JzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPicrXHJcbi8vIFx0XHRcdFx0XHQgICAgJzxsYWJlbD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICAgJzxzcGFuIGNsYXNzPVwiQWNjZXB0bmFtZVwiPuWPl+eQhuWuouacjee7hO+8mjwvc3Bhbj4nKyc8c2VsZWN0IG5hbWU9XCJcIiBjbGFzcz1cIkFjY2VwdGtmXCI+JysnPG9wdGlvbiB2YWx1ZT1cIuWPl+eQhuWuouacjee7hFwiPuWPl+eQhuWuouacjee7hDwvb3B0aW9uPicrJzxsZWN0PicrXHJcbi8vIFx0XHRcdFx0XHQgICAgJzwvbGFiZWw+JytcclxuLy8gXHRcdFx0XHRcdCAgJzwvZGl2PicrXHJcbi8vIFx0XHRcdFx0XHQgICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICc8bGFiZWw+JytcclxuLy8gXHRcdFx0XHRcdCAgICAgICc8c3BhbiBjbGFzcz1cIkFjY2VwdG5hbWVcIj7lj5fnkIblrqLmnI3vvJo8L3NwYW4+JysnPHNlbGVjdCBuYW1lPVwiXCIgY2xhc3M9XCJBY2NlcHRrZlwiPicrJzxvcHRpb24gdmFsdWU9XCLlj5fnkIblrqLmnI1cIj7lj5fnkIblrqLmnI08L29wdGlvbj4nKyc8bGVjdD4nK1xyXG4vLyBcdFx0XHRcdFx0ICAgICc8L2xhYmVsPicrXHJcbi8vIFx0XHRcdFx0XHQgICc8L2Rpdj4nO1xyXG4vLyBcdFx0XHRkaWFsb2dUaXQ9J+i9rOenu+W3peWNlSc7XHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dUaXRsZScpLmh0bWwoZGlhbG9nVGl0KTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ01zZycpLmh0bWwoZGlhbG9nTXNnKTtcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0Nsb3NlJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMiYmY2FsbGJhY2syKCk7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHRcdCQoJyNkaWFsb2dDbG9zZVQnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbi8vIFx0XHRcdFx0Y2FsbGJhY2syJiZjYWxsYmFjazIoKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdFx0JCgnI2RpYWxvZ0NoYW5nZScpLnVuYmluZCgnY2xpY2snKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjbXlEaWFsb2cnKS5tb2RhbCgnaGlkZScpO1xyXG4vLyBcdFx0XHRcdGNhbGxiYWNrMSYmY2FsbGJhY2sxKCk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ1RpdGxlJykuaHRtbCgnJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ01zZycpLmh0bWwoJycpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0XHQkKCcjbXlEaWFsb2cnKS5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2xvc2UnKS51bmJpbmQoJ2NsaWNrJyk7XHJcbi8vIFx0XHRcdFx0JCgnI2RpYWxvZ0Nsb3NlVCcpLnVuYmluZCgnY2xpY2snKTtcclxuLy8gXHRcdFx0XHQkKCcjZGlhbG9nQ2hhbmdlJykudW5iaW5kKCdjbGljaycpO1xyXG4vLyBcdFx0XHRcdCQoJy5tb2RhbC1jb250ZW50JykuYXR0cihcInN0eWxlXCIsXCJcIik7XHJcbi8vIFx0XHRcdH0pO1xyXG4vLyBcdFx0XHRpZihkaWFsb2dXaWR0aCkgJCgnLm1vZGFsLWNvbnRlbnQnKS5jc3Moe3dpZHRoOnBhcnNlSW50KGRpYWxvZ1dpZHRoKSxtYXJnaW46JzAgYXV0byd9KTtcclxuLy8gXHRcdFx0JCgnI215RGlhbG9nJykubW9kYWwoe1xyXG4vLyBcdFx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJ1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSxcclxuLy8gXHRcdExvZzpmdW5jdGlvbihtc2csY2Ipe1xyXG4vLyBcdFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3RpcGxvZycsbXNnKTtcclxuLy8gXHRcdFx0Y2ImJmNiKCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG4vLyB9XSlcclxuLy/liJfooajmn6Xor6LmnI3liqHlsIHoo4VcclxuLmZhY3RvcnkoJ0dldExpc3QnLFsnJGh0dHAnLCckdGltZW91dCcsJ1RpcCcsZnVuY3Rpb24oJGh0dHAsJHRpbWVvdXQsVGlwKXtcclxuXHRyZXR1cm57IEdldDpmdW5jdGlvbihvcHQpe1xyXG5cdFx0XHR2YXIgdXJsID0gb3B0LnVybDtcclxuXHRcdFx0dmFyIGRhdGEgPSBvcHQuZGF0YTtcclxuXHRcdFx0dmFyIHNjb3BlID0gb3B0LnNjb3BlO1xyXG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBvcHQuc3VjY2VzcztcclxuXHRcdFx0c2NvcGUucGFnU2hvdz1mYWxzZTtcclxuXHRcdFx0c2NvcGUucGFnaW5hdGlvbkNvbmYgPSB7XHJcblx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHQgICAgICAgIGN1cnJlbnRQYWdlOiAxLC8v6buY6K6k6aG1XHJcblx0XHQgICAgICAgIHRvdGFsSXRlbXM6IDgwLC8v5oC76aG15pWwXHJcblx0XHQgICAgICAgIGl0ZW1zUGVyUGFnZTogMTAsLy/mr4/pobXlsZXnpLrmlbDmja7mnaHmlbAg6buY6K6kMTXmnaFcclxuXHRcdCAgICAgICAgcGFnZXNMZW5ndGg6IDE1LC8v5YiG6aG15p2h55uu6ZW/5bqmXHJcblx0XHQgICAgICAgIHBlclBhZ2VPcHRpb25zOiBbNSwgMTAsIDIwXSxcclxuXHRcdCAgICAgICAgaW5pdDp0cnVlLFxyXG5cdFx0ICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZm4pe1xyXG5cdFx0ICAgICAgICBcdHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT1zY29wZS5wYWdpbmF0aW9uQ29uZi5jdXJyZW50UGFnZTtcclxuXHRcdCAgICAgICAgXHRzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2VTaXplPXNjb3BlLnBhZ2luYXRpb25Db25mLml0ZW1zUGVyUGFnZTtcclxuXHRcdCAgICAgICAgXHRpZih0aGlzLmluaXQ9PXRydWUpe1xyXG5cdFx0ICAgICAgICBcdFx0dGhpcy5pbml0PWZhbHNlO1xyXG5cdFx0ICAgICAgICBcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0ICAgICAgICBcdH1cclxuXHRcdCBcdFx0XHQkaHR0cCh7XHJcblx0XHQgXHRcdFx0XHR1cmw6c2NvcGUucGFnaW5hdGlvbkNvbmYudXJsLFxyXG5cdFx0IFx0XHRcdFx0cGFyYW1zOnNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGFcclxuXHRcdCBcdFx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0IFx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0IFx0XHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQgXHRcdFx0XHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuXHRcdFx0IFx0XHRcdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZi50b3RhbEl0ZW1zPWRhdGEudG90YWxDb3VudDtcclxuXHRcdFx0IFx0XHRcdFx0XHRjYWxsYmFjayYmY2FsbGJhY2soZGF0YSk7XHJcblx0XHRcdCBcdFx0XHRcdH0pXHJcblx0XHQgXHRcdFx0XHR9XHJcblx0XHQgXHRcdFx0fSkuZXJyb3IoZnVuY3Rpb24oZSl7XHJcblx0XHQgXHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcclxuXHRcdCBcdFx0XHR9KVxyXG5cdFx0ICAgICAgICB9XHJcblx0XHQgICAgfTtcclxuXHRcdCAgICBzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2U9MTtcclxuXHRcdCAgICBzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2VTaXplPTEwO1xyXG5cdFx0ICAgICRodHRwKHtcclxuXHRcdCAgICBcdHVybDp1cmwsXHJcblx0XHQgICAgXHRwYXJhbXM6c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YVxyXG5cdFx0ICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQgICAgXHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHQgICAgXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCAgICBcdFx0c2NvcGUucGFnU2hvdz10cnVlO1xyXG5cdFx0XHQgICAgXHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuXHQgXHRcdFx0XHRcdHNjb3BlLnBhZ2luYXRpb25Db25mLnRvdGFsSXRlbXM9ZGF0YS50b3RhbENvdW50O1xyXG5cdCBcdFx0XHRcdFx0Y2FsbGJhY2smJmNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0XHQgICAgXHR9KVxyXG5cdFx0ICAgIFx0fVxyXG5cdFx0ICAgIH0pXHJcblx0XHR9LFxyXG5cdFx0UG9zdDpmdW5jdGlvbihvcHQpe1xyXG5cdFx0XHR2YXIgdXJsID0gb3B0LnVybDtcclxuXHRcdFx0dmFyIGRhdGEgPSBvcHQuZGF0YTtcclxuXHRcdFx0dmFyIHNjb3BlID0gb3B0LnNjb3BlO1xyXG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBvcHQuc3VjY2VzcztcclxuXHRcdFx0c2NvcGUucGFnU2hvdz1mYWxzZTtcclxuXHRcdFx0c2NvcGUucGFnaW5hdGlvbkNvbmYgPSB7XHJcblx0XHRcdFx0dXJsOnVybCxcclxuXHRcdFx0XHRkYXRhOmRhdGEsXHJcblx0XHQgICAgICAgIGN1cnJlbnRQYWdlOiAxLC8v6buY6K6k6aG1XHJcblx0XHQgICAgICAgIHRvdGFsSXRlbXM6IDgwLC8v5oC76aG15pWwXHJcblx0XHQgICAgICAgIGl0ZW1zUGVyUGFnZTogMTAsLy/mr4/pobXlsZXnpLrmlbDmja7mnaHmlbAg6buY6K6kMTXmnaFcclxuXHRcdCAgICAgICAgcGFnZXNMZW5ndGg6IDE1LC8v5YiG6aG15p2h55uu6ZW/5bqmXHJcblx0XHQgICAgICAgIHBlclBhZ2VPcHRpb25zOiBbNSwgMTAsIDIwXSxcclxuXHRcdCAgICAgICAgaW5pdDp0cnVlLFxyXG5cdFx0ICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24oZm4pe1xyXG5cdFx0ICAgICAgICBcdHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT1zY29wZS5wYWdpbmF0aW9uQ29uZi5jdXJyZW50UGFnZTtcclxuXHRcdCAgICAgICAgXHRzY29wZS5wYWdpbmF0aW9uQ29uZi5kYXRhLnBhZ2VTaXplPXNjb3BlLnBhZ2luYXRpb25Db25mLml0ZW1zUGVyUGFnZTtcclxuXHRcdCAgICAgICAgXHRpZih0aGlzLmluaXQ9PXRydWUpe1xyXG5cdFx0ICAgICAgICBcdFx0dGhpcy5pbml0PWZhbHNlO1xyXG5cdFx0ICAgICAgICBcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0ICAgICAgICBcdH1cclxuXHRcdCBcdFx0XHQkaHR0cCh7XHJcblx0XHQgXHRcdFx0XHR1cmw6dXJsLFxyXG5cdFx0IFx0XHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdCBcdFx0XHRcdGRhdGE6c2NvcGUucGFnaW5hdGlvbkNvbmYuZGF0YSxcclxuXHRcdCBcdFx0XHRcdGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sICBcclxuXHRcdCAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gW107ICBcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBwIGluIG9iail7ICBcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcblx0XHQgICAgICAgICAgICAgICAgICAgIH0gIFxyXG5cdFx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpOyAgXHJcblx0XHQgICAgICAgICAgICAgICAgfVxyXG5cdFx0IFx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQgXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0ICAgIFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0ICAgIFx0XHRzY29wZS5wYWdTaG93PXRydWU7XHJcblx0XHRcdFx0XHQgICAgXHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuXHRcdFx0IFx0XHRcdFx0XHRzY29wZS5wYWdpbmF0aW9uQ29uZi50b3RhbEl0ZW1zPWRhdGEudG90YWxDb3VudDtcclxuXHRcdFx0IFx0XHRcdFx0XHRjYWxsYmFjayYmY2FsbGJhY2soZGF0YSk7XHJcblx0XHRcdFx0XHQgICAgXHR9KVxyXG5cdFx0XHRcdCAgICBcdH1cclxuXHRcdCBcdFx0XHR9KS5lcnJvcihmdW5jdGlvbihlKXtcclxuXHRcdCBcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0IFx0XHRcdH0pXHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9O1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZT0xO1xyXG5cdFx0ICAgIHNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEucGFnZVNpemU9MTA7XHJcblx0XHQgICAgJGh0dHAoe1xyXG5cdFx0ICAgIFx0dXJsOnVybCxcclxuXHRcdCAgICBcdG1ldGhvZDoncG9zdCcsXHJcblx0XHQgICAgXHRkYXRhOnNjb3BlLnBhZ2luYXRpb25Db25mLmRhdGEsXHJcblx0XHQgICAgXHRoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LCAgXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTsgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcCBpbiBvYmopeyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtwXSkpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTsgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cdFx0ICAgIH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHQgICAgXHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHQgICAgXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCAgICBcdFx0c2NvcGUucGFnU2hvdz10cnVlO1xyXG5cdFx0XHQgICAgXHRcdHNjb3BlLmRhdGE9ZGF0YTtcclxuXHQgXHRcdFx0XHRcdHNjb3BlLnBhZ2luYXRpb25Db25mLnRvdGFsSXRlbXM9ZGF0YS50b3RhbENvdW50O1xyXG5cdCBcdFx0XHRcdFx0Y2FsbGJhY2smJmNhbGxiYWNrKGRhdGEpO1xyXG5cdFx0XHQgICAgXHR9KVxyXG5cdFx0ICAgIFx0fVx0XHJcblx0XHQgICAgfSlcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uZmFjdG9yeSgnVGVzdENoYXQnLGZ1bmN0aW9uKCl7XHJcblx0dmFyIG1zZyA9e1xyXG5cdFx0XHJcblx0fVxyXG5cdHJldHVybiB7XHJcblx0XHRjaGF0OmZ1bmN0aW9uKCl7XHJcblx0XHRcdHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0XHR9LDMwMDApXHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG4uZmFjdG9yeSgnZ3JvdXBzUm9sZXMnLFsnJGh0dHAnLCdVcmwnLCckdGltZW91dCcsZnVuY3Rpb24oJGh0dHAsVXJsLCR0aW1lb3V0KXsvL+iOt+WPluaJgOacieWuouacjee7hOS7peWPiuinkuiJsuWIl+ihqO+8iOaXoOWIhumhte+8iVxyXG5cdC8v57yT5a2Y5omA5pyJ5a6i5pyN57uE5ZKM6KeS6Imy55qEcHJvbWlzZeWvueixoVxyXG5cdHJldHVybiB7XHJcblx0XHRnZXQ6ZnVuY3Rpb24oc2NvcGUsY2IxLGNiMil7Ly9jYjHkuLrojrflj5blrqLmnI3nu4TnmoTlm57osIPlh73mlbAsY2Iy5Li66I635Y+W6KeS6Imy5YiX6KGo55qE5Zue6LCD5Ye95pWwXHJcblx0XHRcdHZhciBwcm8xID0gJGh0dHAoe1xyXG5cdFx0XHRcdHVybDpVcmwuZ2V0VXJsKCdhbGxHcm91cHMnKSxcclxuXHRcdFx0XHRwYXJhbXM6e1xyXG5cdFx0XHRcdFx0dXNlclByaXZhdGVVcmw6c2NvcGUudXNlclByaXZhdGVVcmxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHNjb3BlLmdyb3VwRGF0YT1kYXRhLmdyb3VwcztcclxuXHRcdFx0XHRcdFx0Y2IxJiZjYjEoKTtcclxuXHRcdFx0XHRcdH0pXHRcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybign6I635Y+W5a6i5pyN57uE5pWw5o2u5aSx6LSlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHR2YXIgcHJvMiA9ICRodHRwKHtcclxuXHRcdFx0XHR1cmw6VXJsLmdldFVybCgnYWxsUm9sZXMnKSxcclxuXHRcdFx0XHRwYXJhbXM6e1xyXG5cdFx0XHRcdFx0dXNlclByaXZhdGVVcmw6c2NvcGUudXNlclByaXZhdGVVcmxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdHNjb3BlLnJvbGVEYXRhPWRhdGEucm9sZXM7XHJcblx0XHRcdFx0XHRcdGNiMiYmY2IyKCk7XHJcblx0XHRcdFx0XHR9KVx0XHRcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2Fybign6I635Y+W6KeS6Imy5pWw5o2u5aSx6LSlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcdFx0XHJcbn1dKVxyXG4uZmFjdG9yeSgnaW5kZXhlZERCJyxmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIG9wZW5EQiAobXlEQixzY29wZSxjYikgey8v5omT5byA6IGK5aSp5pWw5o2u5bqTXHJcblx0XHRpZihzY29wZS5EQil7Ly/liKTmlq3mmK/lkKblnKhzY29wZeS4ree8k+WtmOS6hkRC5a+56LGhLOWmguaenOe8k+WtmOS6hu+8jOWwseWwhuWvueixoeeahHJlc3VsdOi1i+e7mW15REIuZGJcclxuXHRcdFx0bXlEQi5kYiA9IHNjb3BlLkRCLnJlc3VsdDtcclxuXHRcdFx0Y2ImJmNiKCk7XHJcblx0XHR9ZWxzZXsvL+WmguaenOacque8k+WtmERC5a+56LGh77yM5oiW6ICF5LiO5pWw5o2u5bqT55qE6ZO+5o6l5Lit5pat77yM5YiZ6YeN5paw5omT5byA5pWw5o2u5bqTXHJcblx0XHRcdHZhciB2ZXJzaW9uPW15REIudmVyc2lvbiB8fCAxO1xyXG5cdFx0XHRzY29wZS5EQj17fTtcclxuXHQgICAgICAgIHNjb3BlLkRCPXdpbmRvdy5pbmRleGVkREIub3BlbihteURCLm5hbWUsdmVyc2lvbik7Ly/miZPlvIDmlbDmja7lupNcclxuXHQgICAgICAgIHNjb3BlLkRCLm9uZXJyb3I9ZnVuY3Rpb24oZSl7XHJcblx0ICAgICAgICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmVycm9yLm1lc3NhZ2UpO1xyXG5cdCAgICAgICAgfTtcclxuXHQgICAgICAgIHNjb3BlLkRCLm9uc3VjY2Vzcz1mdW5jdGlvbihlKXtcclxuXHQgICAgICAgIFx0c2NvcGUuREIucmVzdWx0PWUudGFyZ2V0LnJlc3VsdDtcclxuXHQgICAgICAgICAgICBteURCLmRiPWUudGFyZ2V0LnJlc3VsdDtcclxuXHQgICAgICAgICAgICBjYiYmY2IoKTtcclxuXHQgICAgICAgIH07XHJcblx0ICAgICAgICBzY29wZS5EQi5vbnVwZ3JhZGVuZWVkZWQ9ZnVuY3Rpb24oZSl7XHJcblx0ICAgICAgICAgICAgdmFyIGRiPWUudGFyZ2V0LnJlc3VsdDtcclxuXHQgICAgICAgICAgICBpZighZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhteURCLm5hbWUpKXtcclxuXHQgICAgICAgICAgICAgICAgdmFyIHN0b3JlPWRiLmNyZWF0ZU9iamVjdFN0b3JlKG15REIubmFtZSx7a2V5UGF0aDogXCJtc2dJZFwifSk7Ly/nrKzkuIDmrKHliJvlu7rmlbDmja7ooajvvIzooajlkI3kuI7mlbDmja7lupPlkI3nm7jlkIxcclxuXHQgICAgICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ2NoYXRJZEluZGV4JywnY2hhdElkJyx7dW5pcXVlOmZhbHNlfSk7IFxyXG5cdCAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgndG9JZEluZGV4JywndG9JZCcse3VuaXF1ZTpmYWxzZX0pO1xyXG5cdCAgICAgICAgICAgICAgICBzdG9yZS5jcmVhdGVJbmRleCgnZnJvbUlkSW5kZXgnLCdmcm9tSWQnLHt1bmlxdWU6ZmFsc2V9KTtcclxuXHQgICAgICAgICAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ3RpbWVJbmRleCcsJ3RpbWUnLHt1bmlxdWU6ZmFsc2V9KTtcclxuXHQgICAgICAgICAgICBcdGNvbnNvbGUubG9nKCdEQiB2ZXJzaW9uIGNoYW5nZWQgdG8gJyt2ZXJzaW9uKTtcclxuXHQgICAgICAgIFx0fTtcclxuXHQgICAgICAgIH1cclxuXHRcdH1cclxuXHQgICAgICAgIFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY2xvc2VEQihkYil7Ly/lhbPpl63ogYrlpKnmlbDmja7lupNcclxuICAgICAgICBkYi5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YUJ5SW5kZXgoZGIsc3RvcmVOYW1lLGluZGV4VHlwZSx4LHNjb3BlLGNiKXsvL+mAmui/h2luZGV45p+l6K+iXHJcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uPWRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgdmFyIHN0b3JlPXRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gc3RvcmUuaW5kZXgoaW5kZXhUeXBlKTtcclxuICAgICAgICB2YXIgcmVxdWVzdD1pbmRleC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoeCkpO1xyXG4gICAgICAgIHNjb3BlLmRiUXVlcnlEYXRhID0gW107Ly/lnKhzY29wZS5kYlF1ZXJ5RGF0YeS4reWtmOWCqOaVsOaNrlxyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gbnVsbDtcclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2Vzcz1mdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdmFyIGN1cnNvcj1lLnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmKGN1cnNvcil7XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbj1jdXJzb3IudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5kYlF1ZXJ5RGF0YS5wdXNoKGpzb24pO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBcdGNiJiZjYigpOy8v5omn6KGM5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhZGREYXRhKG15REIsZGF0YSxjYil7Ly/mt7vliqDmlbDmja4sZGF0YeW/hemhu+S4ukFycmF557G75Z6LXHJcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uPW15REIuZGIudHJhbnNhY3Rpb24obXlEQi5uYW1lLCdyZWFkd3JpdGUnKTsgXHJcbiAgICAgICAgdmFyIHN0b3JlPXRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG15REIubmFtZSk7IFxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgc3RvcmUuYWRkKGRhdGFbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYiYmY2IoKTsvL+WFqOmDqOaVsOaNrua3u+WKoOWujOaIkOWQjuaJp+ihjOWbnuiwg1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGVsZXRlRGF0YUJ5S2V5KG15REIsdmFsdWUpey8v5qC55o2u5L+d5a2Y55qE6ZSu5YC85Yig6Zmk5pWw5o2uXHJcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uPW15REIuZGIudHJhbnNhY3Rpb24obXlEQi5uYW1lLCdyZWFkd3JpdGUnKTsgXHJcbiAgICAgICAgdmFyIHN0b3JlPXRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKG15REIubmFtZSk7IFxyXG4gICAgICAgIHN0b3JlLmRlbGV0ZSh2YWx1ZSk7IFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgIFx0aW5pdDpmdW5jdGlvbihzY29wZSxjYil7Ly/liJ3lp4vljJbmlbDmja7lupNcclxuICAgIFx0XHR2YXIgbXlEQiA9IHtcclxuICAgIFx0XHRcdG5hbWU6XCJjaGF0TXNnXCIsXHJcbiAgICBcdFx0XHRkYjpudWxsLFxyXG4gICAgXHRcdFx0dmVyc2lvbjoxXHJcbiAgICBcdFx0fVxyXG5cdFx0XHRvcGVuREIgKG15REIsc2NvcGUsY2IpXHJcbiAgICBcdH0sXHJcbiAgICBcdGdldDpmdW5jdGlvbihzY29wZSxjaGF0SWQsY2Ipey8v6I635Y+W5pWw5o2uXHJcbiAgICBcdFx0dmFyIG15REIgPSB7XHJcbiAgICBcdFx0XHRuYW1lOlwiY2hhdE1zZ1wiLFxyXG4gICAgXHRcdFx0ZGI6bnVsbCxcclxuICAgIFx0XHRcdHZlcnNpb246MVxyXG4gICAgXHRcdH1cclxuICAgIFx0XHRvcGVuREIobXlEQixzY29wZSxmdW5jdGlvbigpe1xyXG4gICAgXHRcdFx0Z2V0RGF0YUJ5SW5kZXgobXlEQi5kYixteURCLm5hbWUsXCJjaGF0SWRJbmRleFwiLGNoYXRJZCxzY29wZSxjYik7XHJcbiAgICBcdFx0fSlcclxuICAgIFx0fSxcclxuICAgIFx0YWRkOmZ1bmN0aW9uKHNjb3BlLGRhdGEsY2Ipey8v5re75Yqg5pWw5o2u77yM5Y+C5pWwZGF0YeW/hemhu+S4ukFycmF557G75Z6L5pWw5o2uXHJcbiAgICBcdFx0dmFyIG15REIgPSB7XHJcbiAgICBcdFx0XHRuYW1lOlwiY2hhdE1zZ1wiLFxyXG4gICAgXHRcdFx0ZGI6bnVsbCxcclxuICAgIFx0XHRcdHZlcnNpb246MVxyXG4gICAgXHRcdH1cclxuICAgIFx0XHRvcGVuREIobXlEQixzY29wZSxmdW5jdGlvbigpe1xyXG4gICAgXHRcdFx0YWRkRGF0YShteURCLGRhdGEsY2IpO1xyXG4gICAgXHRcdH0pXHJcbiAgICBcdH0sXHJcbiAgICBcdGRlbGV0ZTpmdW5jdGlvbihzY29wZSxjaGF0SWQsY2Ipe1xyXG4gICAgXHRcdHZhciBteURCID0ge1xyXG4gICAgXHRcdFx0bmFtZTpcImNoYXRNc2dcIixcclxuICAgIFx0XHRcdGRiOm51bGwsXHJcbiAgICBcdFx0XHR2ZXJzaW9uOjFcclxuICAgIFx0XHR9XHJcbiAgICBcdFx0b3BlbkRCKG15REIsc2NvcGUsZnVuY3Rpb24oKXtcclxuICAgIFx0XHRcdGdldERhdGFCeUluZGV4KG15REIuZGIsbXlEQi5uYW1lLGNoYXRJZCxzY29wZSxmdW5jdGlvbigpey8v6I635Y+W6KaB5Yig6Zmk55qE5pWw5o2uXHJcbiAgICBcdFx0XHRcdHZhciBkZWxlRGF0YSA9IHNjb3BlLmRiUXVlcnlEYXRhO1xyXG5cdCAgICBcdFx0XHRmb3IodmFyIGk9MDtpPGRlbGVEYXRhLmxlbmd0aDtpKyspey8v6YGN5Y6G5omA5pyJ55qE5b6F5Yig6Zmk55qE5pWw5o2u77yM6L+b6KGM5Yig6Zmk5pON5L2cXHJcblx0ICAgIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBkZWxldGVEYXRhQnlLZXkobXlEQixkZWxlRGF0YVtpXS5tc2dJZCk7XHJcblx0ICAgIFx0XHRcdH1cclxuXHQgICAgXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpe1xyXG5cdCAgICBcdFx0XHRcdGNvbnNvbGUubG9nKFwiZGVsZXRlIHN1Y2Nlc3MhXCIpO1xyXG5cdCAgICBcdFx0XHR9XHJcbiAgICBcdFx0XHR9KTtcclxuICAgIFx0XHR9KVxyXG4gICAgXHR9XHJcbiAgICB9XHJcbn0pIiwiLyoqXHJcbiAqIG5hbWU6IHRtLnBhZ2luYXRpb25cclxuICogVmVyc2lvbjogMS4wLjAgYmV0YVxyXG4gKi9cclxuYW5ndWxhci5tb2R1bGUoJ3RtLnBhZ2luYXRpb24nLCBbXSkuZGlyZWN0aXZlKCd0bVBhZ2luYXRpb24nLFtmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJwYWdlLWxpc3RcIj4nICtcclxuICAgICAgICAgICAgJzx1bCBjbGFzcz1cInBhZ2luYXRpb25cIiBuZy1zaG93PVwiY29uZi50b3RhbEl0ZW1zID4gMFwiPicgK1xyXG4gICAgICAgICAgICAnPGxpIG5nLWNsYXNzPVwie2Rpc2FibGVkOiBjb25mLmN1cnJlbnRQYWdlID09IDF9XCIgbmctY2xpY2s9XCJwcmV2UGFnZSgpXCI+PHNwYW4+JmxhcXVvOzwvc3Bhbj48L2xpPicgK1xyXG4gICAgICAgICAgICAnPGxpIG5nLXJlcGVhdD1cIml0ZW0gaW4gcGFnZUxpc3QgdHJhY2sgYnkgJGluZGV4XCIgbmctY2xhc3M9XCJ7YWN0aXZlOiBpdGVtID09IGNvbmYuY3VycmVudFBhZ2UsIHNlcGFyYXRlOiBpdGVtID09IFxcJy4uLlxcJ31cIiAnICtcclxuICAgICAgICAgICAgJ25nLWNsaWNrPVwiY2hhbmdlQ3VycmVudFBhZ2UoaXRlbSlcIj4nICtcclxuICAgICAgICAgICAgJzxzcGFuPnt7IGl0ZW0gfX08L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8L2xpPicgK1xyXG4gICAgICAgICAgICAnPGxpIG5nLWNsYXNzPVwie2Rpc2FibGVkOiBjb25mLmN1cnJlbnRQYWdlID09IGNvbmYubnVtYmVyT2ZQYWdlc31cIiBuZy1jbGljaz1cIm5leHRQYWdlKClcIj48c3Bhbj4mcmFxdW87PC9zcGFuPjwvbGk+JyArXHJcbiAgICAgICAgICAgICc8L3VsPicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhZ2UtdG90YWxcIiBuZy1zaG93PVwiY29uZi50b3RhbEl0ZW1zID4gMFwiPicgK1xyXG4gICAgICAgICAgICAn5q+P6aG1PHNlbGVjdCBuZy1tb2RlbD1cImNvbmYuaXRlbXNQZXJQYWdlXCIgbmctb3B0aW9ucz1cIm9wdGlvbiBmb3Igb3B0aW9uIGluIGNvbmYucGVyUGFnZU9wdGlvbnMgXCIgbmctY2hhbmdlPVwiY2hhbmdlSXRlbXNQZXJQYWdlKClcIj48L3NlbGVjdD4nICtcclxuICAgICAgICAgICAgJy/lhbE8c3Ryb25nPnt7IGNvbmYudG90YWxJdGVtcyB9fTwvc3Ryb25nPuadoSAnICtcclxuICAgICAgICAgICAgJ+i3s+i9rOiHszxpbnB1dCB0eXBlPVwidGV4dFwiIG5nLW1vZGVsPVwianVtcFBhZ2VOdW1cIiBuZy1rZXl1cD1cImp1bXBQYWdlS2V5VXAoJGV2ZW50KVwiLz4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm5vLWl0ZW1zXCIgbmctc2hvdz1cImNvbmYudG90YWxJdGVtcyA8PSAwXCI+5pqC5peg5pWw5o2uPC9kaXY+JyArXHJcbiAgICAgICAgICAgICc8L2Rpdj4nLFxyXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgY29uZjogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjb25mID0gc2NvcGUuY29uZjtcclxuXHJcbiAgICAgICAgICAgIC8vIOm7mOiupOWIhumhtemVv+W6plxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdFBhZ2VzTGVuZ3RoID0gOTtcclxuXHJcbiAgICAgICAgICAgIC8vIOm7mOiupOWIhumhtemAiemhueWPr+iwg+aVtOavj+mhteaYvuekuueahOadoeaVsFxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdFBlclBhZ2VPcHRpb25zID0gWzEwLCAxNSwgMjAsIDMwLCA1MF07XHJcblxyXG4gICAgICAgICAgICAvLyDpu5jorqTmr4/pobXnmoTkuKrmlbBcclxuICAgICAgICAgICAgdmFyIGRlZmF1bHRQZXJQYWdlID0gMTU7XHJcblxyXG4gICAgICAgICAgICAvLyDojrflj5bliIbpobXplb/luqZcclxuICAgICAgICAgICAgaWYoY29uZi5wYWdlc0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5LiA5LiL5YiG6aG16ZW/5bqmXHJcbiAgICAgICAgICAgICAgICBjb25mLnBhZ2VzTGVuZ3RoID0gcGFyc2VJbnQoY29uZi5wYWdlc0xlbmd0aCwgMTApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFjb25mLnBhZ2VzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5wYWdlc0xlbmd0aCA9IGRlZmF1bHRQYWdlc0xlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDliIbpobXplb/luqblv4XpobvkuLrlpYfmlbDvvIzlpoLmnpzkvKDlgbbmlbDml7bvvIzoh6rliqjlpITnkIZcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYucGFnZXNMZW5ndGggJSAyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5wYWdlc0xlbmd0aCArPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbmYucGFnZXNMZW5ndGggPSBkZWZhdWx0UGFnZXNMZW5ndGhcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5YiG6aG16YCJ6aG55Y+v6LCD5pW05q+P6aG15pi+56S655qE5p2h5pWwXHJcbiAgICAgICAgICAgIGlmKCFjb25mLnBlclBhZ2VPcHRpb25zKXtcclxuICAgICAgICAgICAgICAgIGNvbmYucGVyUGFnZU9wdGlvbnMgPSBkZWZhdWx0UGFnZXNMZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHBhZ2VMaXN05pWw57uEXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBhZ2luYXRpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGNvbmYuY3VycmVudFBhZ2VcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYuY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlID0gcGFyc2VJbnQoc2NvcGUuY29uZi5jdXJyZW50UGFnZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFjb25mLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZi5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uZi50b3RhbEl0ZW1zXHJcbiAgICAgICAgICAgICAgICBpZihjb25mLnRvdGFsSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLnRvdGFsSXRlbXMgPSBwYXJzZUludChjb25mLnRvdGFsSXRlbXMsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25mLnRvdGFsSXRlbXNcclxuICAgICAgICAgICAgICAgIGlmKCFjb25mLnRvdGFsSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLnRvdGFsSXRlbXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gY29uZi5pdGVtc1BlclBhZ2UgXHJcbiAgICAgICAgICAgICAgICBpZihjb25mLml0ZW1zUGVyUGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuaXRlbXNQZXJQYWdlID0gcGFyc2VJbnQoY29uZi5pdGVtc1BlclBhZ2UsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCFjb25mLml0ZW1zUGVyUGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuaXRlbXNQZXJQYWdlID0gZGVmYXVsdFBlclBhZ2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbnVtYmVyT2ZQYWdlc1xyXG4gICAgICAgICAgICAgICAgY29uZi5udW1iZXJPZlBhZ2VzID0gTWF0aC5jZWlsKHNjb3BlLmNvbmYudG90YWxJdGVtcy9jb25mLml0ZW1zUGVyUGFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5YiG6aG15oC75pWwPjDvvIzlubbkuJTlvZPliY3pobXlpKfkuo7liIbpobXmgLvmlbBcclxuICAgICAgICAgICAgICAgIGlmKHNjb3BlLmNvbmYubnVtYmVyT2ZQYWdlcyA+IDAgJiYgc2NvcGUuY29uZi5jdXJyZW50UGFnZSA+IHNjb3BlLmNvbmYubnVtYmVyT2ZQYWdlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZi5jdXJyZW50UGFnZSA9IHNjb3BlLmNvbmYubnVtYmVyT2ZQYWdlcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpxpdGVtc1BlclBhZ2XlnKjkuI3lnKhwZXJQYWdlT3B0aW9uc+aVsOe7hOS4re+8jOWwseaKiml0ZW1zUGVyUGFnZeWKoOWFpei/meS4quaVsOe7hOS4rVxyXG4gICAgICAgICAgICAgICAgdmFyIHBlclBhZ2VPcHRpb25zTGVuZ3RoID0gc2NvcGUuY29uZi5wZXJQYWdlT3B0aW9ucy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5a6a5LmJ54q25oCBXHJcbiAgICAgICAgICAgICAgICB2YXIgcGVyUGFnZU9wdGlvbnNTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcGVyUGFnZU9wdGlvbnNMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5wZXJQYWdlT3B0aW9uc1tpXSA9PSBjb25mLml0ZW1zUGVyUGFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlclBhZ2VPcHRpb25zU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpxpdGVtc1BlclBhZ2XlnKjkuI3lnKhwZXJQYWdlT3B0aW9uc+aVsOe7hOS4re+8jOWwseaKiml0ZW1zUGVyUGFnZeWKoOWFpei/meS4quaVsOe7hOS4rVxyXG4gICAgICAgICAgICAgICAgaWYoIXBlclBhZ2VPcHRpb25zU3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLnBlclBhZ2VPcHRpb25zLnB1c2goY29uZi5pdGVtc1BlclBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWvuemAiemhuei/m+ihjHNvcnRcclxuICAgICAgICAgICAgICAgIGNvbmYucGVyUGFnZU9wdGlvbnMuc29ydChmdW5jdGlvbihhLCBiKSB7cmV0dXJuIGEgLSBifSk7XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDpobXnoIHnm7jlhbNcclxuICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpZihjb25mLm51bWJlck9mUGFnZXMgPD0gY29uZi5wYWdlc0xlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5Yik5pat5oC76aG15pWw5aaC5p6c5bCP5LqO562J5LqO5YiG6aG155qE6ZW/5bqm77yM6Iul5bCP5LqO5YiZ55u05o6l5pi+56S6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGkgPTE7IGkgPD0gY29uZi5udW1iZXJPZlBhZ2VzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaAu+mhteaVsOWkp+S6juWIhumhtemVv+W6pu+8iOatpOaXtuWIhuS4uuS4ieenjeaDheWGte+8mjEu5bem6L655rKh5pyJLi4uMi7lj7PovrnmsqHmnIkuLi4zLuW3puWPs+mDveaciS4uLu+8iVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOiuoeeul+S4reW/g+WBj+enu+mHj1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAoY29uZi5wYWdlc0xlbmd0aCAtIDEpIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICBpZihjb25mLmN1cnJlbnRQYWdlIDw9IG9mZnNldCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOW3pui+ueayoeaciS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IDE7IGkgPD0gb2Zmc2V0ICsgMTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgnLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5udW1iZXJPZlBhZ2VzKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb25mLmN1cnJlbnRQYWdlID4gY29uZi5udW1iZXJPZlBhZ2VzIC0gb2Zmc2V0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgnLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihpID0gb2Zmc2V0ICsgMTsgaSA+PSAxOyBpLS0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLm51bWJlck9mUGFnZXMgLSBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYubnVtYmVyT2ZQYWdlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOacgOWQjuS4gOenjeaDheWGte+8jOS4pOi+uemDveaciS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKCcuLi4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihpID0gTWF0aC5jZWlsKG9mZnNldCAvIDIpIDsgaSA+PSAxOyBpLS0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLmN1cnJlbnRQYWdlIC0gaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaChjb25mLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDw9IG9mZnNldCAvIDI7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5wYWdlTGlzdC5wdXNoKGNvbmYuY3VycmVudFBhZ2UgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUucGFnZUxpc3QucHVzaCgnLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnBhZ2VMaXN0LnB1c2goY29uZi5udW1iZXJPZlBhZ2VzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuJHBhcmVudC5jb25mID0gY29uZjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcHJldlBhZ2VcclxuICAgICAgICAgICAgc2NvcGUucHJldlBhZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmKGNvbmYuY3VycmVudFBhZ2UgPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5leHRQYWdlXHJcbiAgICAgICAgICAgIHNjb3BlLm5leHRQYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZihjb25mLmN1cnJlbnRQYWdlIDwgY29uZi5udW1iZXJPZlBhZ2VzKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25mLmN1cnJlbnRQYWdlICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIOWPmOabtOW9k+WJjemhtVxyXG4gICAgICAgICAgICBzY29wZS5jaGFuZ2VDdXJyZW50UGFnZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0gPT0gJy4uLicpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmYuY3VycmVudFBhZ2UgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmNvbmYuY3VycmVudFBhZ2UgPWl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbmYub25DaGFuZ2UoKeWHveaVsFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbmYub25DaGFuZ2UpIHsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYub25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyDkv67mlLnmr4/pobXlsZXnpLrnmoTmnaHmlbBcclxuICAgICAgICAgICAgc2NvcGUuY2hhbmdlSXRlbXNQZXJQYWdlID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5LiA5Y+R5bGV56S65p2h5pWw5Y+Y5pu077yM5b2T5YmN6aG15bCG6YeN572u5Li6MVxyXG4gICAgICAgICAgICAgICAgc2NvcGUuY29uZi5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb25mKTtcclxuICAgICAgICAgICAgICAgIGdldFBhZ2luYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbmYub25DaGFuZ2UoKeWHveaVsFxyXG4gICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25mLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyDot7PovazpobVcclxuICAgICAgICAgICAgc2NvcGUuanVtcFRvUGFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbnVtID0gc2NvcGUuanVtcFBhZ2VOdW07XHJcbiAgICAgICAgICAgICAgICBpZihudW0ubWF0Y2goL1xcZCsvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSA9IHBhcnNlSW50KG51bSwgMTApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobnVtICYmIG51bSAhPSBjb25mLmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG51bSA+IGNvbmYubnVtYmVyT2ZQYWdlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gY29uZi5udW1iZXJPZlBhZ2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDot7PovaxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0UGFnaW5hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25mLm9uQ2hhbmdlKCnlh73mlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmYub25DaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5qdW1wUGFnZU51bSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2NvcGUuanVtcFBhZ2VLZXlVcCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXljb2RlID0gd2luZG93LmV2ZW50ID8gZS5rZXlDb2RlIDplLndoaWNoO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihrZXljb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuanVtcFRvUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ2NvbmYudG90YWxJdGVtcycsIGZ1bmN0aW9uKHZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyDlnKjml6DlgLzmiJblgLznm7jnrYnnmoTml7blgJnvvIzljrvmiafooYxvbkNoYW5nZeS6i+S7tlxyXG4gICAgICAgICAgICAgICAgaWYoIXZhbHVlIHx8IHZhbHVlID09IG9sZFZhbHVlKSB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29uZi5vbkNoYW5nZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZi5vbkNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdldFBhZ2luYXRpb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufV0pOyIsImFuZ3VsYXIubW9kdWxlKCdyb3V0ZXInLFtcclxuXHQnaG9tZS5yb3V0ZXInLFxyXG5cdCdrZi5yb3V0ZXInLFxyXG5cdCdsb2dpbi5yb3V0ZXInLFxyXG5cdCdyZWdpc3Rlci5yb3V0ZXInLFxyXG5cdCdmbG93LnJvdXRlcicsXHJcblx0J2NvbXBhbnkucm91dGVyJyxcclxuXHQncHJvZHVjdC5yb3V0ZXInLFxyXG5cdCdhZ3JlZW1lbnQucm91dGVyJyxcclxuXSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJywnJGxvY2F0aW9uUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlciwkbG9jYXRpb25Qcm92aWRlcil7XHJcblx0Ly8gJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcclxuXHQvLyAgICAgZW5hYmxlZDogdHJ1ZSxcclxuXHQvLyAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXHJcblx0Ly8gfSk7XHJcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnbG9naW4nKTtcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnY29tcGFueS5jdHJsJyxbXSlcclxuLmNvbnRyb2xsZXIoJ2NvbXBhbnlDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhKXtcclxuXHQkc2NvcGUubGlzdCA9IERhdGEuZ2V0RGF0YSgnY29tcGFueScpLmxpc3Q7XHJcbn1dKVxyXG4uY29udHJvbGxlcignY29tcGFueU1hbmFnZUN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3Qpe1xyXG5cdCRzY29wZS5zZWFyY2hLZXk9e1xyXG5cdFx0bmFtZTonJyxcclxuXHRcdGRlc2M6JycsXHJcblx0XHRmbGFnOjEsXHJcblx0fTtcclxuXHQkc2NvcGUuc2VhcmNoPWZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2NvbXBhbnlMaXN0JyksXHJcblx0XHRcdGRhdGE6ZGF0YSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEubWVyY2hhbnM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuc2VhcmNoKCRzY29wZS5zZWFyY2hLZXkpO1xyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZENvbXBhbnlDdHJsJyxbJyRzY29wZScsJ0dldExpc3QnLCdVcmwnLCckaHR0cCcsJyRzdGF0ZScsJyR0aW1lb3V0JywnZ3JvdXBzUm9sZXMnLCdUaXAnLCdIdHRwJywnRGF0YScsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkaHR0cCwkc3RhdGUsJHRpbWVvdXQsZ3JvdXBzUm9sZXMsVGlwLEh0dHAsRGF0YSxHZXRMaXN0KXtcclxuXHQkc2NvcGUuY29tcGFueT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdC8vIGFyZWE6JycsXHJcblx0XHQvLyBjaXR5OicnLFxyXG5cdFx0Y2xhc3NUeXBlOicnLFxyXG5cdH07XHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnYWRkQ29tcGFueScpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5jb21wYW55KX0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5jb21wYW55LmNvbXBhbnlNYW5hZ2UnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdlZGl0Q29tcGFueUN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsJyRzdGF0ZVBhcmFtcycsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3QsJHN0YXRlUGFyYW1zKXtcclxuXHQkc2NvcGUuY29tcGFueT17XHJcblx0XHRuYW1lOicnLFxyXG5cdFx0ZGVzYzonJyxcclxuXHRcdGNsYXNzVHlwZTonJyxcclxuXHRcdC8vIGFyZWE6JycsXHJcblx0XHQvLyBjaXR5OicnLFxyXG5cdFx0bWVyY2hJZDonJ1xyXG5cdH07XHJcblx0aWYoJHN0YXRlUGFyYW1zLm9iail7XHJcblx0XHQkc2NvcGUuY29tcGFueT0kc3RhdGVQYXJhbXMub2JqO1xyXG5cdFx0JHNjb3BlLmNvbXBhbnkuY2xhc3NUeXBlPVN0cmluZygkc2NvcGUuY29tcGFueS5jbGFzc1R5cGUpO1xyXG5cdH1cclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMub2JqKVxyXG5cdCRzY29wZS5zYXZlPWZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2VkaXRDb21wYW55JyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLmNvbXBhbnkpfSxcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmNvbXBhbnkuY29tcGFueU1hbmFnZScpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHJcblx0XHR9KVxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2NvbXBhbnkucm91dGVyJyxbJ2NvbXBhbnkuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ2hvbWUuY29tcGFueScse1xyXG5cdFx0dXJsOicvY29tcGFueScsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NvbXBhbnkvY29tcGFueS5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2NvbXBhbnlDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmNvbXBhbnkuY29tcGFueU1hbmFnZScse1xyXG5cdFx0dXJsOicvY29tcGFueU1hbmFnZScsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NvbXBhbnkvY29tcGFueU1hbmFnZS5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2NvbXBhbnlNYW5hZ2VDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuY29tcGFueS5hZGRDb21wYW55Jyx7XHJcblx0XHR1cmw6Jy9hZGRDb21wYW55JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvY29tcGFueS9hZGRDb21wYW55Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonYWRkQ29tcGFueUN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuY29tcGFueS5lZGl0Q29tcGFueScse1xyXG5cdFx0dXJsOicvZWRpdENvbXBhbnknLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9jb21wYW55L2NvbXBhbnlFZGl0Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZWRpdENvbXBhbnlDdHJsJyxcclxuXHRcdHBhcmFtczoge1xyXG5cdCAgICAgICAgb2JqOiBudWxsIFxyXG5cdCAgICB9XHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2Zsb3cuY3RybCcsWydwdWJ1bGljJywnZGF0YSddKVxyXG4uY29udHJvbGxlcignZmxvd0N0cmwnLFsnJHNjb3BlJywnRGF0YScsJyR0aW1lb3V0JywnVGlwJyxmdW5jdGlvbigkc2NvcGUsRGF0YSwkdGltZW91dCxUaXApe1xyXG5cdCRzY29wZS5saXN0ID0gRGF0YS5nZXREYXRhKCdmbG93RGF0YScpLmxpc3Q7XHJcbn1dKVxyXG4uY29udHJvbGxlcignZmxvd2dsQ3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCl7XHJcblx0JHNjb3BlLnNlYXJjaE1zZyA9IHt9O1xyXG5cdCRzY29wZS5zZWFyY2hNc2cuc3RhcnREYXRlID0gJyc7XHJcblx0ZnVuY3Rpb24gZ2V0bGlzdCgpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2Zsb3dMaXN0JyksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGpzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLnNlYXJjaE1zZylcclxuXHRcdFx0fSxcclxuXHRcdFx0c2NvcGU6JHNjb3BlLFxyXG5cdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRcdCRzY29wZS5kYXRhTGlzdCA9IGRhdGEucmVzdWx0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Z2V0bGlzdCgpO1xyXG5cdCRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbigpe1xyXG5cdFx0Z2V0bGlzdCgpO1xyXG5cdH1cclxuXHQkc2NvcGUuYmpaZCA9IGZ1bmN0aW9uKHgpe1xyXG5cdFx0JHN0YXRlLmdvKCdob21lLmZsb3cuYmpmbG93Jyx7XHJcblx0XHRcdGlkOnguZmxvd0lkLFxyXG5cdFx0XHRvYmo6eFxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRkZmxvd0N0cmwnLFsnJHNjb3BlJywnVGlwJywnJHN0YXRlJywnVXJsJywnJGh0dHAnLCdUaXAnLCdncm91cHNSb2xlcycsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSxUaXAsJHN0YXRlLFVybCwkaHR0cCxUaXAsZ3JvdXBzUm9sZXMsSHR0cCl7XHJcblx0JHNjb3BlLnllYXJzTGlzdCA9IFtdO1xyXG5cdCRzY29wZS5tb250aExpc3QgPSBbXTtcclxuXHQkc2NvcGUubXlNc2cgPSB7XHJcblx0XHRpbXBUeXBlOicnLFxyXG5cdFx0aW1wWWVhcjonJyxcclxuXHRcdGltcE1vbnRoOicnLFxyXG5cdFx0ZGVsRmxhZzonMCcsXHJcblx0XHRwYXRoTGlzdDonJ1xyXG5cdH07XHJcblx0Zm9yKHZhciBpID0gMjAxNztpPD0yMDUwO2krKyl7XHJcblx0XHQkc2NvcGUueWVhcnNMaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdGZvcih2YXIgaSA9IDE7aTw9MTI7aSsrKXtcclxuXHRcdCRzY29wZS5tb250aExpc3QucHVzaChpKTtcclxuXHR9XHJcblx0JHNjb3BlLmRlbGVmbG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBteWRlbGVNc2cgPSB7XHJcblx0XHRcdGltcFR5cGU6JHNjb3BlLm15TXNnLmltcFR5cGUsXHJcblx0XHRcdGltcFllYXI6JHNjb3BlLm15TXNnLmltcFllYXIsXHJcblx0XHRcdGltcE1vbnRoOiRzY29wZS5teU1zZy5pbXBNb250aCxcclxuXHRcdFx0ZGVsRmxhZzonMScsXHJcblx0XHRcdHBhdGhMaXN0OiRzY29wZS5teU1zZy5wYXRoTGlzdFxyXG5cdFx0fTtcclxuXHRcdGlmKCEkc2NvcGUubXlNc2cuaW1wVHlwZXx8ISRzY29wZS5teU1zZy5pbXBZZWFyfHwhJHNjb3BlLm15TXNnLmltcE1vbnRoKXtcclxuXHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDon6K+35YWI6YCJ5oup5p2h5Lu2Jyx0eXBlOjB9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKFwiaW1wb3J0Rmxvd0ZpbGVcIiksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGpzb246SlNPTi5zdHJpbmdpZnkobXlkZWxlTXNnKVxyXG5cdFx0XHR9XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmZsb3cuZmxvd2dsJyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnVwbG9hZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLmJ5Rm9ybSh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCd1cGxvYWRGbG93RmlsZScpLFxyXG5cdFx0XHRmaWxlTmFtZTonZmlsZScsXHJcblx0XHRcdG11bHRpcGxlOlwibXVsdGlwYXJ0XCIsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLnBhdGhMaXN0ID0gSlNPTi5wYXJzZShkYXRhLnBhdGhMaXN0KTtcclxuXHRcdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0pO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5mbG93ID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKCEkc2NvcGUubXlNc2cuaW1wVHlwZXx8ISRzY29wZS5teU1zZy5pbXBZZWFyfHwhJHNjb3BlLm15TXNnLmltcE1vbnRofHwhJHNjb3BlLm15TXNnLnBhdGhMaXN0KXtcclxuXHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDon6K+35YWI6YCJ5oup5p2h5Lu2Jyx0eXBlOjB9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKFwiaW1wb3J0Rmxvd0ZpbGVcIiksXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdGpzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKVxyXG5cdFx0XHR9XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmZsb3cuZmxvd2dsJyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYmpmbG93Q3RybCcsWyckc2NvcGUnLCckc3RhdGVQYXJhbXMnLCdUaXAnLCckc3RhdGUnLCdVcmwnLCckaHR0cCcsJ1RpcCcsJ2dyb3Vwc1JvbGVzJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLCRzdGF0ZVBhcmFtcyxUaXAsJHN0YXRlLFVybCwkaHR0cCxUaXAsZ3JvdXBzUm9sZXMsSHR0cCl7XHJcblx0Y29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcclxuXHQkc2NvcGUubXlNc2cgPSAkc3RhdGVQYXJhbXMub2JqfHx7fTtcclxufV0pXHJcbi5jb250cm9sbGVyKCdzZXR0bGVtZW50Q3RybCcsWyckc2NvcGUnLCdUaXAnLCckc3RhdGUnLCdVcmwnLCckaHR0cCcsJ1RpcCcsJ2dyb3Vwc1JvbGVzJywnSHR0cCcsJ0dldExpc3QnLGZ1bmN0aW9uKCRzY29wZSxUaXAsJHN0YXRlLFVybCwkaHR0cCxUaXAsZ3JvdXBzUm9sZXMsSHR0cCxHZXRMaXN0KXtcclxuXHQkc2NvcGUuc2VhcmNoTXNnID0ge307XHJcblx0JHNjb3BlLnNlYXJjaE1zZy5zdGFydERhdGUgPSAnJztcclxuXHRmdW5jdGlvbiBnZXRsaXN0KCl7XHJcblx0XHRHZXRMaXN0LlBvc3Qoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZ2V0c2V0dGxlbWVudExpc3QnKSxcclxuXHRcdFx0ZGF0YTp7XHJcblx0XHRcdFx0anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUuc2VhcmNoTXNnKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY29wZTokc2NvcGUsXHJcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmRhdGFMaXN0ID0gZGF0YS5yZXN1bHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHRnZXRsaXN0KCk7XHJcblx0JHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRnZXRsaXN0KCk7XHJcblx0fVxyXG5cdCRzY29wZS5zZXR0bGVtZW50ID0gZnVuY3Rpb24oeCl7XHJcblx0XHRIdHRwLmdldCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdnb1NldHRsZW1lbnQnKSsnLycreC5yZWJhdGVJZFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGdldGxpc3QoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdCRzY29wZS5jYW5jZWxTZXR0bGVtZW50ID0gZnVuY3Rpb24oeCl7XHJcblx0XHRIdHRwLmdldCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdjYW5jZWxTZXR0bGVtZW50JykrJy8nK3gucmViYXRlSWRcclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRnZXRsaXN0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRcclxuXHRcdFx0fWVsc2V7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHQkc2NvcGUuaGFuZGxlU2V0dGxlID0gZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnaGFuZGxlU2V0dGxlbWVudCcpXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Z2V0bGlzdCgpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Zsb3cucm91dGVyJyxbJ2Zsb3cuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ2hvbWUuZmxvdycse1xyXG5cdFx0dXJsOicvZmxvdycsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Zsb3d0by9mbG93Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonZmxvd0N0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuZmxvdy5mbG93Z2wnLHtcclxuXHRcdHVybDonL2Zsb3dnbCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Zsb3d0by9mbG93L2Zsb3dHbC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2Zsb3dnbEN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUuZmxvdy5hZGRmbG93Jyx7XHJcblx0XHR1cmw6Jy9mbG93Z2wvYWRkZmxvdycsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Zsb3d0by9mbG93L2FkZEZsb3cuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidhZGRmbG93Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5mbG93LmJqZmxvdycse1xyXG5cdFx0dXJsOicvZmxvd2dsLzppZCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2Zsb3d0by9mbG93L2JqRmxvdy5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2JqZmxvd0N0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5mbG93LnNldHRsZW1lbnQnLHtcclxuXHRcdHVybDonL3NldHRsZW1lbnQnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9mbG93dG8vc2V0dGxlbWVudC9zZXR0bGVtZW50Lmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonc2V0dGxlbWVudEN0cmwnLFxyXG5cdFx0cGFyYW1zOntcclxuXHRcdFx0b2JqOm51bGxcclxuXHRcdH1cclxuXHR9KVxyXG59XSkiLCJhbmd1bGFyLm1vZHVsZShcImhvbWUuY3RybFwiLFtcInB1YnVsaWNcIiwnZGF0YSddKVxyXG4uY29udHJvbGxlcihcImhvbWVDdHJsXCIsWyckc2NvcGUnLCdEYXRhJywnJHN0YXRlUGFyYW1zJywnJGh0dHAnLCdVcmwnLFwiJHRpbWVvdXRcIixmdW5jdGlvbigkc2NvcGUsRGF0YSwkc3RhdGVQYXJhbXMsJGh0dHAsVXJsLCR0aW1lb3V0KXtcclxuXHQvL+eUqOaIt+S/oeaBr+e8k+WtmFxyXG5cdC8vIGlmKCRzdGF0ZVBhcmFtcy51c2VyKXtcclxuXHQvLyBcdCRzY29wZS51c2VyUHJpdmF0ZVVybD0kc3RhdGVQYXJhbXMudXNlci51c2VyUHJpdmF0ZVVybDtcclxuXHQvLyBcdCRzY29wZS51c2VySWQ9JHN0YXRlUGFyYW1zLnVzZXIuZW1wbG95ZWVJZDtcclxuXHQvLyBcdHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeSgkc3RhdGVQYXJhbXMpO1xyXG5cdC8vIFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnc3RhdGVQYXJhbXMnLHN0cik7XHJcblx0Ly8gfWVsc2V7XHRcclxuXHQvLyBcdHZhciBqc29uID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzdGF0ZVBhcmFtcycpKTtcclxuXHQvLyBcdCRzY29wZS51c2VyUHJpdmF0ZVVybD1qc29uLnVzZXIudXNlclByaXZhdGVVcmw7XHJcblx0Ly8gXHQkc2NvcGUudXNlcklkPWpzb24udXNlci5lbXBsb3llZUlkO1xyXG5cdC8vIH1cclxuXHQkc2NvcGUubWVudT17fTtcclxuXHQkc2NvcGUubWVudS5rZiA9IERhdGEuZ2V0RGF0YSgna2ZEYXRhJykudGl0bGU7XHJcblx0JHNjb3BlLm1lbnUuZmxvdyA9IERhdGEuZ2V0RGF0YSgnZmxvd0RhdGEnKS50aXRsZTtcclxuXHQkc2NvcGUubWVudS5wcm9kdWN0ID0gRGF0YS5nZXREYXRhKCdwcm9kdWN0JykudGl0bGU7XHJcblx0JHNjb3BlLm1lbnUuYWdyZWVtZW50ID0gRGF0YS5nZXREYXRhKCdhZ3JlZW1lbnQnKS50aXRsZTtcclxuXHQkc2NvcGUubWVudS5jb21wYW55ID0gRGF0YS5nZXREYXRhKCdjb21wYW55JykudGl0bGU7XHJcbn1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2RhdGEnLFtdKVxyXG4uZmFjdG9yeSgnRGF0YScsZnVuY3Rpb24oKXtcclxuXHR2YXIgZGF0YT17XHJcblx0XHRrZkRhdGE6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J+WuouacjeS4reW/gycsXHJcblx0XHRcdCdzdGF0ZSc6Jy5LRicsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5a6i5pyN566h55CGJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOiflrqLmnI3liJfooagnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRl9sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a3u+WKoOWuouacjScsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGX2FkZEtmeidcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5a6i5pyN57uEJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOiflrqLmnI3nu4TliJfooagnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRlpfbGInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifmt7vliqDlrqLmnI3nu4QnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRlpfYWRkS2Z6J1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifop5LoibLnrqHnkIYnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+inkuiJsuWIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0pTX2xiJ1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5re75Yqg5a6i5pyN57uEJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfSlNfYWRkSnMnXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGdkRGF0YTpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon5bel5Y2V566h55CGJyxcclxuXHRcdFx0J3N0YXRlJzonLkdEJyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmiJHnmoTmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+S8mOWFiOacquino+WGs+W3peWNlScsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonS0ZfR0RfeXh3amonXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifkuIDoiKzmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6J0tGX0dEX3lid2pqJ1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifnu4TlhoXmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmiYDmnInmnKrop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmiJHnmoTlt7Lop6PlhrPlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifmiYDmnInlt6XljZUnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRjaGF0RGF0YTpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzonSU3ljbPml7bpgJrorq8nLFxyXG5cdFx0XHQnc3RhdGUnOicuY2hhdCcsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5b2T5YmN5Lya6K+dJyxcclxuXHRcdFx0XHRcdC8vJ2xpc3QnOmNoYXQuY3VycmVudE1lc3NhZ2Uoc2NvcGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifljoblj7LkvJror50nLFxyXG5cdFx0XHRcdFx0Ly8nbGlzdCc6Y2hhdC5oaXN0b3J5TWVzc2FnZShzY29wZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGNvbmZpZzpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon6YWN572uJyxcclxuXHRcdFx0J3N0YXRlJzonLmNvbmZpZycsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5rig6YGT6YWN572uJyxcclxuXHRcdFx0XHRcdC8vJ2xpc3QnOmNoYXQuY3VycmVudE1lc3NhZ2Uoc2NvcGUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifphY3nva7pgInpobknLFxyXG5cdFx0XHRcdFx0Ly8nbGlzdCc6Y2hhdC5oaXN0b3J5TWVzc2FnZShzY29wZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRcdFxyXG5cdHJldHVybiB7XHJcblx0XHRnZXREYXRhOmZ1bmN0aW9uKGlkKXtcclxuXHRcdFx0Zm9yKHggaW4gZGF0YSl7XHJcblx0XHRcdFx0aWYoaWQ9PXgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRhdGFbeF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFx0XHJcblxyXG5cdFxyXG59KSIsImFuZ3VsYXIubW9kdWxlKCdob21lLnJvdXRlcicsWydob21lLmN0cmwnXSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJyxmdW5jdGlvbigkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgIC5zdGF0ZSgnaG9tZScsIHtcclxuICAgICAgICB1cmw6ICcvaG9tZScsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9ob21lL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJyxcclxuICAgICAgICBwYXJhbXM6e1xyXG4gICAgICAgIFx0dXNlcjpudWxsLFxyXG4gICAgICAgIFx0cGVybWlzc2lvbnM6bnVsbCxcclxuICAgICAgICAgIGdyb3VwRGF0YTpudWxsLFxyXG4gICAgICAgICAgcm9sZURhdGE6bnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxufV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgna2YuY3RybCcsWydwdWJ1bGljJywnZGF0YSddKVxyXG4uY29udHJvbGxlcigna2ZDdHJsJyxbJyRzY29wZScsJ0RhdGEnLCckdGltZW91dCcsJ1RpcCcsZnVuY3Rpb24oJHNjb3BlLERhdGEsJHRpbWVvdXQsVGlwKXtcclxuXHQkc2NvcGUubGlzdCA9IERhdGEuZ2V0RGF0YSgna2ZEYXRhJykubGlzdDtcclxufV0pXHJcbi5jb250cm9sbGVyKCdrZmdsQ3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCl7XHJcblx0JHNjb3BlLnF1ZXJ5SG9zcGl0YWxUeHQgPSBcIlwiO1x0XHJcblx0ZnVuY3Rpb24gZ2V0bGlzdCgpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3pkTGlzdCcpLFxyXG5cdFx0XHRkYXRhOntcclxuXHRcdFx0XHRob3NwaXRhbE5hbWU6JHNjb3BlLnF1ZXJ5SG9zcGl0YWxUeHQsXHJcblx0XHRcdFx0ZmxhZzoxXHJcblx0XHRcdH0sXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QgPSBkYXRhLmhvc3BpdGFscztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGdldGxpc3QoKTtcclxuXHQkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKXtcclxuXHRcdGdldGxpc3QoKTtcclxuXHR9XHJcblx0JHNjb3BlLmJqWmQgPSBmdW5jdGlvbih4KXtcclxuXHRcdCRzdGF0ZS5nbygnaG9tZS5rZi5iamtmJyx7XHJcblx0XHRcdGlkOnguaG9zcGl0YWxJZFxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcignYWRka2ZDdHJsJyxbJyRzY29wZScsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnVGlwJywnZ3JvdXBzUm9sZXMnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsVGlwLCRzdGF0ZSxVcmwsJGh0dHAsVGlwLGdyb3Vwc1JvbGVzLEh0dHApe1xyXG5cdCRzY29wZS5teU1zZyA9IHt9O1xyXG5cdCRzY29wZS5zYXZlTXNnID0gZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS5teU1zZy56b25lSWQgPSAkc2NvcGUubXlBcmVhO1xyXG5cdFx0JHNjb3BlLm15TXNnLmNpdHlJZCA9ICRzY29wZS5teUNpdHk7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZFpkJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKX1cclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUua2Yua2ZnbCcpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2Jqa2ZDdHJsJyxbJyRzY29wZScsJyRzdGF0ZVBhcmFtcycsJ1RpcCcsJyRzdGF0ZScsJ1VybCcsJyRodHRwJywnVGlwJywnZ3JvdXBzUm9sZXMnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsJHN0YXRlUGFyYW1zLFRpcCwkc3RhdGUsVXJsLCRodHRwLFRpcCxncm91cHNSb2xlcyxIdHRwKXtcclxuXHRjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMpO1xyXG5cdCRzY29wZS5teU1zZyA9IHt9O1xyXG5cdEh0dHAuZ2V0KHtcclxuXHRcdHVybDpVcmwuZ2V0VXJsKCdxdWVyeVpkJykrJy8nKyRzdGF0ZVBhcmFtcy5pZFxyXG5cdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmhvc3BpdGFsTmFtZSA9IGRhdGEuaG9zcGl0YWwuaG9zcGl0YWxOYW1lO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuaG9zcGl0YWxJZCA9IGRhdGEuaG9zcGl0YWwuaG9zcGl0YWxJZDtcclxuXHRcdFx0JHNjb3BlLm15TXNnLnR5cGUgPSBKU09OLnN0cmluZ2lmeShkYXRhLmhvc3BpdGFsLnR5cGUpO1xyXG5cdFx0XHQkc2NvcGUubXlBcmVhID0gZGF0YS5ob3NwaXRhbC56b25lSWQ7XHJcblx0XHRcdCRzY29wZS5teUNpdHkgPSBkYXRhLmhvc3BpdGFsLmNpdHlJZDtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OifmnI3liqHnq6/lvILluLgnLHR5cGU6MH0pXHJcblx0XHR9XHJcblx0fSlcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUubXlNc2cuem9uZUlkID0gJHNjb3BlLm15QXJlYTtcclxuXHRcdCRzY29wZS5teU1zZy5jaXR5SWQgPSAkc2NvcGUubXlDaXR5O1xyXG5cdFx0SHR0cC5wb3N0Rih7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdialpkJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKX1cclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZToxfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHN0YXRlLmdvKFwiaG9tZS5rZi5rZmdsXCIpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2tmemdsQ3RybCcsWyckc2NvcGUnLCckc3RhdGVQYXJhbXMnLCdUaXAnLCckc3RhdGUnLCdVcmwnLCckaHR0cCcsJ0dldExpc3QnLCckdGltZW91dCcsZnVuY3Rpb24oJHNjb3BlLCRzdGF0ZVBhcmFtcyxUaXAsJHN0YXRlLFVybCwkaHR0cCxHZXRMaXN0LCR0aW1lb3V0KXtcclxuICAgJHNjb3BlLnF1ZXJ5Q3VzdG9tZXJUeHQgPSBcIlwiO1x0XHJcblx0ZnVuY3Rpb24gZ2V0bGlzdCgpe1xyXG5cdFx0R2V0TGlzdC5Qb3N0KHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2toTGlzdCcpLFxyXG5cdFx0XHRkYXRhOntcclxuXHRcdFx0XHRjdXN0b21lck5hbWU6JHNjb3BlLnF1ZXJ5Q3VzdG9tZXJUeHQsXHJcblx0XHRcdFx0cGhvbmU6JycsXHJcblx0XHRcdFx0ZmxhZzoxXHJcblx0XHRcdH0sXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QgPSBkYXRhLmN1c3RvbWVycztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdGdldGxpc3QoKTtcclxuXHQkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKXtcclxuXHRcdGdldGxpc3QoKTtcclxuXHR9XHJcblx0JHNjb3BlLmJqWmQgPSBmdW5jdGlvbih4KXtcclxuXHRcdCRzdGF0ZS5nbygnaG9tZS5rZi5iamtmeicse1xyXG5cdFx0XHRpZDp4LmN1c3RvbWVySWRcclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2Jqa2Z6Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJHRpbWVvdXQnLCckc3RhdGVQYXJhbXMnLCckc3RhdGUnLCckaHR0cCcsJ1RpcCcsJ0h0dHAnLGZ1bmN0aW9uKCRzY29wZSxHZXRMaXN0LFVybCwkdGltZW91dCwkc3RhdGVQYXJhbXMsJHN0YXRlLCRodHRwLFRpcCxIdHRwKXtcclxuXHQkc2NvcGUubXlNc2cgPSB7fTtcclxuXHRIdHRwLmdldCh7XHJcblx0XHR1cmw6VXJsLmdldFVybCgncXVlcnlLaCcpKycvJyskc3RhdGVQYXJhbXMuaWRcclxuXHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdCRzY29wZS5teU1zZy5jdXN0b21lck5hbWUgPSBkYXRhLmN1c3RvbWVyLmN1c3RvbWVyTmFtZTtcclxuXHRcdFx0JHNjb3BlLm15TXNnLmN1c3RvbWVySWQgPSBkYXRhLmN1c3RvbWVyLmN1c3RvbWVySWQ7XHJcblx0XHRcdCRzY29wZS5teU1zZy5kZXBvc2l0QmFuayA9IGRhdGEuY3VzdG9tZXIuZGVwb3NpdEJhbms7XHJcblx0XHRcdCRzY29wZS5teU1zZy5kZXNjID0gZGF0YS5jdXN0b21lci5kZXNjO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cucGhvbmUgPSBkYXRhLmN1c3RvbWVyLnBob25lO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuaXNDb3JwID0gZGF0YS5jdXN0b21lci5pc0NvcnA7XHJcblx0XHRcdCRzY29wZS5teU1zZy5zZXJpYWxDb2RlID0gZGF0YS5jdXN0b21lci5zZXJpYWxDb2RlO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuYWNjb3VudENvZGUgPSBkYXRhLmN1c3RvbWVyLmFjY291bnRDb2RlO1xyXG5cdFx0XHQkc2NvcGUubXlNc2cuYWNjb3VudE5hbWUgPSBkYXRhLmN1c3RvbWVyLmFjY291bnROYW1lO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6J+acjeWKoeerr+W8guW4uCcsdHlwZTowfSk7XHJcblx0XHR9XHJcblx0fSlcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2JqS2gnKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUubXlNc2cpfVxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oXCJob21lLmtmLmtmemdsXCIpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XSlcclxuLmNvbnRyb2xsZXIoJ2FkZGtmekN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyR0aW1lb3V0JywnJGh0dHAnLCdUaXAnLCckc3RhdGUnLCdIdHRwJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJHRpbWVvdXQsJGh0dHAsVGlwLCRzdGF0ZSxIdHRwKXtcclxuXHQkc2NvcGUubXlNc2cgPSB7fTtcclxuXHQkc2NvcGUuc2F2ZU1zZyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRIdHRwLnBvc3RGKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2FkZEtoJyksXHJcblx0XHRcdGRhdGE6e2pzb246SlNPTi5zdHJpbmdpZnkoJHNjb3BlLm15TXNnKX1cclxuXHRcdH0pLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oXCJob21lLmtmLmtmemdsXCIpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MH0pXHJcblx0XHRcdH1cclxuXHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdrZi5yb3V0ZXInLFsna2YuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ2hvbWUua2YnLHtcclxuXHRcdHVybDonL3pkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2YuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidrZkN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUua2Yua2ZnbCcse1xyXG5cdFx0dXJsOicvemRnbCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2tmL2tmZ2wvS0ZHTC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2tmZ2xDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmtmLmFkZEtmJyx7XHJcblx0XHR1cmw6Jy9rZnpkL2FkZHpkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2ZnbC9hZGRLZi5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FkZGtmQ3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5rZi5iamtmJyx7XHJcblx0XHR1cmw6Jy96ZGdsLzppZCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2tmL2tmZ2wvYmprZi5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2Jqa2ZDdHJsJyxcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5rZi5rZnpnbCcse1xyXG5cdFx0dXJsOicva2hnbCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2tmL2tmemdsL0tGWkdMLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjona2Z6Z2xDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLmtmLmFkZGtmeicse1xyXG5cdFx0dXJsOicva2hnbC9hZGRraCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2tmL2tmemdsL2FkZGtmei5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FkZGtmekN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ2hvbWUua2YuYmprZnonLHtcclxuXHRcdHVybDonL2toZ2wvOmlkJyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3Mva2Yva2Z6Z2wvYmprZnouaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidiamtmekN0cmwnLFxyXG5cdH0pXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdsb2dpbi5jdHJsJyxbJ2RhdGEnLCdwdWJ1bGljJ10pXHJcbi5jb250cm9sbGVyKCdsb2dpbkN0cmwnLFsnJHNjb3BlJywnJGh0dHAnLCckc3RhdGUnLCdVcmwnLCdUaXAnLCckdGltZW91dCcsZnVuY3Rpb24oJHNjb3BlLCRodHRwLCRzdGF0ZSxVcmwsVGlwLCR0aW1lb3V0KXtcclxuXHQkc2NvcGUudXNlcm5hbWU9bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2luSUQnKXx8Jyc7XHJcblx0JHNjb3BlLnBhc3N3b3JkPWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dpblBBU1MnKXx8Jyc7XHJcblx0JHNjb3BlLnRlc3Rfc3R5bGUxPVwiXCI7XHJcblx0JHNjb3BlLnRlc3Rfc3R5bGUyPVwiXCI7XHJcblx0JHNjb3BlLnJlbWVtYmVySUQ9ZmFsc2U7XHJcblx0JHNjb3BlLmxvZ2luX3N1Ym1pdCA9ICfnmbvlvZUnXHJcblx0JHNjb3BlLiR3YXRjaCgncmVtZW1iZXJJRCcsZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5yZW1lbWJlcklEKXtcclxuXHRcdFx0VGlwLkxvZygn6LSm5Y+35a+G56CB5bCG5a2Y5YWlY29va2ll77yBJyk7XHJcblx0XHR9XHJcblx0fSlcclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5vbmJsdXI9ZnVuY3Rpb24oKXtcclxuXHRcdCRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYoJHNjb3BlLnVzZXJuYW1lPT1cIlwiKXtcclxuXHRcdFx0XHQkc2NvcGUudGVzdF9zdHlsZTE9XCJoYXMtZXJyb3JcIjtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdGNvbnNvbGUubG9nKCRzY29wZS5yZW1lbWJlcklEKVx0XHRcclxuXHR9XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJykub25mb2N1cz1mdW5jdGlvbigpe1xyXG5cdFx0JHNjb3BlLnRlc3Rfc3R5bGUxPVwiXCI7XHJcblx0XHQkc2NvcGUuZXJyb3JfdXNlcm5hbWU9XCJcIjtcclxuXHR9XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykub25ibHVyPWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCRzY29wZS5wYXNzd29yZD09XCJcIil7XHJcblx0XHRcdFx0JHNjb3BlLnRlc3Rfc3R5bGUyPVwiaGFzLWVycm9yXCI7XHJcblx0XHRcdH1cclxuXHRcdH0pXHRcdFxyXG5cdH1cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS5vbmZvY3VzPWZ1bmN0aW9uKCl7XHJcblx0XHQkc2NvcGUudGVzdF9zdHlsZTI9XCJcIjtcclxuXHRcdCRzY29wZS5lcnJvcl9wYXNzd29yZD1cIlwiO1xyXG5cdH1cclxuXHQkc2NvcGUubG9naW49ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCRzY29wZS5sb2dpbl9zdWJtaXQ9J+eZu+W9leS4rS4uLic7XHJcblx0XHR9KVxyXG5cdFx0aWYoJHNjb3BlLnJlbWVtYmVySUQpe1xyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9naW5JRCcsJHNjb3BlLnVzZXJuYW1lKTtcclxuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2luUEFTUycsJHNjb3BlLnBhc3N3b3JkKTtcclxuXHRcdH1cclxuXHRcdCRodHRwKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ2xvZ2luJyksXHJcblx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdGRhdGE6e1xyXG5cdFx0XHRcdHVzZXJuYW1lOiRzY29wZS51c2VybmFtZSxcclxuXHRcdFx0XHRwYXNzd29yZDokc2NvcGUucGFzc3dvcmRcclxuXHRcdFx0fSxcclxuXHRcdFx0aGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSwgIFxyXG5cdFx0ICBcdCB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvYmopIHsgIFxyXG5cdFx0ICAgICB2YXIgc3RyID0gW107ICBcclxuXHRcdCAgICAgZm9yKHZhciBwIGluIG9iail7ICBcclxuXHRcdCAgICAgICBzdHIucHVzaChlbmNvZGVVUklDb21wb25lbnQocCkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbcF0pKTsgIFxyXG5cdFx0ICAgICB9ICBcclxuXHRcdCAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTsgIFxyXG5cdFx0ICAgXHQgfVx0XHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHQvLyBUaXAuTG9nKGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZT09MSl7XHJcblx0XHRcdFx0JHN0YXRlLmdvKCdob21lLmFncmVlbWVudC5idXNpbmVzc0FncmVlbWVudCcpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0JHNjb3BlLmxvZ2luX3N1Ym1pdD0n55m75b2VJztcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KS5lcnJvcihmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JHNjb3BlLmxvZ2luX3N1Ym1pdD0n55m75b2VJztcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0XHRcclxuXHR9XHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdsb2dpbi5yb3V0ZXInLFsnbG9naW4uY3RybCddKVxyXG4uY29uZmlnKFsnJHVybFJvdXRlclByb3ZpZGVyJywnJHN0YXRlUHJvdmlkZXInLGZ1bmN0aW9uKCR1cmxSb3V0ZXJQcm92aWRlciwkc3RhdGVQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ2xvZ2luJyx7XHJcblx0XHR1cmw6Jy9sb2dpbicsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2xvZ2luL2xvZ2luLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjonbG9naW5DdHJsJ1xyXG5cdH0pXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdwcm9kdWN0LmN0cmwnLFtdKVxyXG4uY29udHJvbGxlcigncHJvZHVjdEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEpe1xyXG5cdCRzY29wZS5saXN0ID0gRGF0YS5nZXREYXRhKCdwcm9kdWN0JykubGlzdDtcclxufV0pXHJcbi5jb250cm9sbGVyKCdwcm9kdWN0TWFuYWdlQ3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCl7XHJcblx0JHNjb3BlLnNlYXJjaEtleT17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0ZmxhZzoxLFxyXG5cdH07XHJcblx0JHNjb3BlLnNlYXJjaD1mdW5jdGlvbihkYXRhKXtcclxuXHRcdEdldExpc3QuUG9zdCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCdwcm9kdWN0TGlzdCcpLFxyXG5cdFx0XHRkYXRhOmRhdGEsXHJcblx0XHRcdHNjb3BlOiRzY29wZSxcclxuXHRcdFx0c3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRpZihkYXRhLmNvZGUgPT0gMSl7XHJcblx0XHRcdFx0XHQkc2NvcGUuZGF0YUxpc3QgPSBkYXRhLnByb2R1Y3RzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnNlYXJjaCgkc2NvcGUuc2VhcmNoS2V5KTtcclxufV0pXHJcbi5jb250cm9sbGVyKCdhZGRQcm9kdWN0Q3RybCcsWyckc2NvcGUnLCdHZXRMaXN0JywnVXJsJywnJGh0dHAnLCckc3RhdGUnLCckdGltZW91dCcsJ2dyb3Vwc1JvbGVzJywnVGlwJywnSHR0cCcsJ0RhdGEnLCdHZXRMaXN0JyxmdW5jdGlvbigkc2NvcGUsR2V0TGlzdCxVcmwsJGh0dHAsJHN0YXRlLCR0aW1lb3V0LGdyb3Vwc1JvbGVzLFRpcCxIdHRwLERhdGEsR2V0TGlzdCl7XHJcblx0JHNjb3BlLnByb2R1Y3Q9e1xyXG5cdFx0cHJvZHVjdE5hbWU6JycsXHJcblx0XHRwcm9kdWN0Tm9ybXM6JycsXHJcblx0XHRtYW51ZmFjdHVyZTonJyxcclxuXHRcdHByb2R1Y3RQcmljZTonJ1xyXG5cdH07XHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnYWRkUHJvZHVjdCcpLFxyXG5cdFx0XHRkYXRhOntqc29uOkpTT04uc3RyaW5naWZ5KCRzY29wZS5wcm9kdWN0KX0sXHJcblx0XHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdFx0XHRcdFRpcC5Mb2coJHNjb3BlLHt0eHQ6ZGF0YS5tZXNzYWdlLHR5cGU6MX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnaG9tZS5wcm9kdWN0LnByb2R1Y3RNYW5hZ2UnKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjB9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdlZGl0UHJvZHVjdEN0cmwnLFsnJHNjb3BlJywnR2V0TGlzdCcsJ1VybCcsJyRodHRwJywnJHN0YXRlJywnJHRpbWVvdXQnLCdncm91cHNSb2xlcycsJ1RpcCcsJ0h0dHAnLCdEYXRhJywnR2V0TGlzdCcsJyRzdGF0ZVBhcmFtcycsZnVuY3Rpb24oJHNjb3BlLEdldExpc3QsVXJsLCRodHRwLCRzdGF0ZSwkdGltZW91dCxncm91cHNSb2xlcyxUaXAsSHR0cCxEYXRhLEdldExpc3QsJHN0YXRlUGFyYW1zKXtcclxuXHQkc2NvcGUucHJvZHVjdD17XHJcblx0XHRwcm9kdWN0TmFtZTonJyxcclxuXHRcdHByb2R1Y3ROb3JtczonJyxcclxuXHRcdG1hbnVmYWN0dXJlOicnLFxyXG5cdFx0cHJvZHVjdFByaWNlOicnXHJcblx0fTtcclxuXHQkc2NvcGUucHJvZHVjdD0kc3RhdGVQYXJhbXMub2JqO1xyXG5cdC8vICRzY29wZS5nZXREZXRhaWw9ZnVuY3Rpb24oeCl7XHJcblx0Ly8gXHRIdHRwLnBvc3RGKHtcclxuXHQvLyBcdFx0dXJsOlVybC5nZXRVcmwoJ3Byb2R1Y3REZXRhaWwnKSxcclxuXHQvLyBcdFx0ZGF0YTp7aWQ6eH0sXHJcblx0Ly8gXHR9KS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdC8vIFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHQvLyBcdFx0aWYoZGF0YS5jb2RlID09IDEpe1xyXG5cdC8vIFx0XHRcdFRpcC5sb2coZGF0YS5tYXNzYWdlLGZ1bmN0aW9uKCl7XHJcblx0Ly8gXHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUucHJvZHVjdC5wcm9kdWN0TWFuYWdlJyk7XHJcblx0Ly8gXHRcdFx0fSlcclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0fSlcclxuXHQvLyB9XHJcblx0Y29uc29sZS5sb2coJHN0YXRlUGFyYW1zLm9iailcclxuXHQvLyAkc2NvcGUuZ2V0RGV0YWlsKCRzdGF0ZVBhcmFtcy5vYmopXHJcblx0JHNjb3BlLnNhdmU9ZnVuY3Rpb24oKXtcclxuXHRcdEh0dHAucG9zdEYoe1xyXG5cdFx0XHR1cmw6VXJsLmdldFVybCgnZWRpdFByb2R1Y3QnKSxcclxuXHRcdFx0ZGF0YTp7anNvbjpKU09OLnN0cmluZ2lmeSgkc2NvcGUucHJvZHVjdCl9LFxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZSA9PSAxKXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSx7dHh0OmRhdGEubWVzc2FnZSx0eXBlOjF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQkc3RhdGUuZ28oJ2hvbWUucHJvZHVjdC5wcm9kdWN0TWFuYWdlJyk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUse3R4dDpkYXRhLm1lc3NhZ2UsdHlwZTowfSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdwcm9kdWN0LnJvdXRlcicsWydwcm9kdWN0LmN0cmwnXSlcclxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJyxmdW5jdGlvbigkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcblx0LnN0YXRlKCdob21lLnByb2R1Y3QnLHtcclxuXHRcdHVybDonL3Byb2R1Y3QnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0L3Byb2R1Y3QuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidwcm9kdWN0Q3RybCdcclxuXHR9KVxyXG5cdC5zdGF0ZSgnaG9tZS5wcm9kdWN0LnByb2R1Y3RNYW5hZ2UnLHtcclxuXHRcdHVybDonL3Byb2R1Y3RNYW5hZ2UnLFxyXG5cdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9wcm9kdWN0L3Byb2R1Y3RNYW5hZ2UuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOidwcm9kdWN0TWFuYWdlQ3RybCcsXHJcblx0XHRwYXJhbXM6e1xyXG5cdFx0XHRvYmo6bnVsbFxyXG5cdFx0fVxyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLnByb2R1Y3QuYWRkUHJvZHVjdCcse1xyXG5cdFx0dXJsOicvcHJvZHVjdE1hbmFnZScsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3Byb2R1Y3QvYWRkUHJvZHVjdC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2FkZFByb2R1Y3RDdHJsJ1xyXG5cdH0pXHJcblx0LnN0YXRlKCdob21lLnByb2R1Y3QuZWRpdFByb2R1Y3QnLHtcclxuXHRcdHVybDonL2VkaXRQcm9kdWN0JyxcclxuXHRcdHRlbXBsYXRlVXJsOiAndmlld3MvcHJvZHVjdC9wcm9kdWN0RWRpdC5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J2VkaXRQcm9kdWN0Q3RybCcsXHJcblx0XHRwYXJhbXM6IHtcclxuXHQgICAgICAgIG9iajogbnVsbCBcclxuXHQgICAgfVxyXG5cdH0pXHJcbn1dKSIsImFuZ3VsYXIubW9kdWxlKCdyZWdpc3Rlci5yb3V0ZXInLFsncmVnaXN0ZXIuY3RybCddKVxyXG4uY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHQuc3RhdGUoJ3JlZ2lzdGVyJyx7XHJcblx0XHR1cmw6Jy9yZWdpc3RlcicsXHJcblx0XHR0ZW1wbGF0ZVVybDondmlld3MvcmVnaXN0ZXIvcmVnaXN0ZXIuaHRtbCcsXHJcblx0XHRjb250cm9sbGVyOlwicmVnaXN0ZXJDdHJsXCJcclxuXHR9KVxyXG5cdC5zdGF0ZSgncmVnaXN0ZXIuc3RlcDEnLHtcclxuXHRcdHVybDonLzEnLFxyXG5cdFx0dGVtcGxhdGVVcmw6J3ZpZXdzL3JlZ2lzdGVyL3N0ZXAxLmh0bWwnLFxyXG5cdFx0Y29udHJvbGxlcjoncmVnaXN0ZXJTdGVwMUN0cmwnXHJcblx0fSlcclxuXHQuc3RhdGUoJ3JlZ2lzdGVyLnN0ZXAyJyx7XHJcblx0XHR1cmw6Jy8yJyxcclxuXHRcdHRlbXBsYXRlVXJsOid2aWV3cy9yZWdpc3Rlci9zdGVwMi5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J3JlZ2lzdGVyU3RlcDJDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxuXHQuc3RhdGUoJ3JlZ2lzdGVyLnN0ZXAzJyx7XHJcblx0XHR1cmw6Jy8zJyxcclxuXHRcdHRlbXBsYXRlVXJsOid2aWV3cy9yZWdpc3Rlci9zdGVwMy5odG1sJyxcclxuXHRcdGNvbnRyb2xsZXI6J3JlZ2lzdGVyU3RlcDNDdHJsJyxcclxuXHRcdHBhcmFtczp7XHJcblx0XHRcdG9iajpudWxsXHJcblx0XHR9XHJcblx0fSlcclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ3JlZ2lzdGVyLmN0cmwnLFsncHVidWxpYycsJ2RhdGEnXSlcclxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyQ3RybCcsWyckc2NvcGUnLCdVcmwnLCckaHR0cCcsJyR0aW1lb3V0JywnVGlwJywnJHN0YXRlJyxmdW5jdGlvbigkc2NvcGUsVXJsLCRodHRwLCR0aW1lb3V0LFRpcCwkc3RhdGUpe1xyXG5cdCRzY29wZS5yZWdpc3Rlck1zZz17fTtcclxufV0pXHJcbi5jb250cm9sbGVyKCdyZWdpc3RlclN0ZXAxQ3RybCcsWyckc2NvcGUnLCdVcmwnLCckaHR0cCcsJyR0aW1lb3V0JywnVGlwJywnJHN0YXRlJyxmdW5jdGlvbigkc2NvcGUsVXJsLCRodHRwLCR0aW1lb3V0LFRpcCwkc3RhdGUpe1xyXG5cdCRzY29wZS5nb05leHRTdGVwPWZhbHNlO1xyXG5cdCRzY29wZS5tc2dfeXptPScnO1xyXG5cdCRzY29wZS5waG9uZW51bT0nJztcclxuXHQkc2NvcGUueXptX3N1Ym1pdD0n5Y+R6YCB6aqM6K+B56CBJztcclxuXHQkc2NvcGUuZ29OZXh0PWZhbHNlO1xyXG5cdCRzY29wZS5zdWJtaXRfbXNnPWZ1bmN0aW9uKCl7XHJcblx0XHQkdGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkc2NvcGUueXptX3N1Ym1pdD0n5bey5Y+R6YCBLi4uJztcclxuXHRcdH0pXHJcblx0XHQkaHR0cCh7XHJcblx0XHRcdHVybDpVcmwuZ2V0VXJsKCd2ZXJpZnlOdW1iZXInKSxcclxuXHRcdFx0cGFyYW1zOntcclxuXHRcdFx0XHRcInZlcmlmeUZpZWxkXCI6J3Bob25lJyxcclxuXHRcdFx0XHRcInZlcmlmeVZhbHVlXCI6JHNjb3BlLnBob25lbnVtXHJcblx0XHRcdH1cclxuXHRcdH0pLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0dmFyIGRhdGEgPSBtc2cuZGF0YTtcclxuXHRcdFx0aWYoZGF0YS5jb2RlPT0xKXtcclxuXHRcdFx0XHRpZihkYXRhLnZlcmlmeVJlc3VsdD09MCl7XHJcblx0XHRcdFx0XHRUaXAuTG9nKCRzY29wZSwn5omL5py65Y+35qCh6aqM5oiQ5Yqf77yBJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHQkc2NvcGUuZ29OZXh0PXRydWU7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFRpcC5Mb2coJHNjb3BlLCfor6XmiYvmnLrlj7fph43lpI3vvIEnLGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnaXN0ZXJfcGhvbmVudW1iZXJcIikuZm9jdXMoKTtcclxuXHRcdFx0XHRcdFx0JHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdFx0XHQkc2NvcGUueXptX3N1Ym1pdD0n5Y+R6YCB6aqM6K+B56CBJztcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH0pO1x0XHRcclxuXHRcdFx0XHR9XHRcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUsJ+Wksei0pScrZGF0YS5jb2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLm5leHRTdGVwID0gZnVuY3Rpb24oKXtcclxuXHRcdGlmKCRzY29wZS5nb05leHQpe1xyXG5cdFx0XHRpZigkc2NvcGUucGhvbmVudW1iZXIpe1xyXG5cdFx0XHRcdHZhciBwcm9taXNlPSRodHRwKHtcclxuXHRcdFx0XHRcdHVybDpVcmwuZ2V0VXJsKCd2ZXJpZnlTbXMnKSxcclxuXHRcdFx0XHRcdHBhcmFtczp7XHJcblx0XHRcdFx0XHRcdHBob25lOiRzY29wZS5waG9uZW51bWJlcixcclxuXHRcdFx0XHRcdFx0U01TY29kZTokc2NvcGUubXNnX3l6bVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24obXNnKXtcclxuXHRcdFx0XHRcdHZhciBkYXRhID0gbXNnLmRhdGE7XHJcblx0XHRcdFx0XHRpZihkYXRhLmNvZGU9PTApe1xyXG5cdFx0XHRcdFx0XHQkc3RhdGUuZ28oJy5yZWdpc3Rlci5zdGVwMicpO1xyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFRpcC5BbGVydCgn5pON5L2c5aSx6LSlIScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Y29uc29sZS5sb2cocHJvbWlzZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYoJHNjb3BlLnBob25lbnVtKXtcclxuXHRcdFx0XHQkc2NvcGUucmVnaXN0ZXJNc2cucGhvbmU9JHNjb3BlLnBob25lbnVtO1xyXG5cdFx0XHRcdCRzdGF0ZS5nbygncmVnaXN0ZXIuc3RlcDInLHtcclxuXHRcdFx0XHRcdG9iajp7XHJcblx0XHRcdFx0XHRcdHBob25lOiRzY29wZS5waG9uZW51bVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHRcdFxyXG5cdH1cclxufV0pXHJcbi5jb250cm9sbGVyKCdyZWdpc3RlclN0ZXAyQ3RybCcsWyckc2NvcGUnLCckdGltZW91dCcsJyRodHRwJywnJHN0YXRlUGFyYW1zJywnVGlwJywnJHN0YXRlJyxmdW5jdGlvbigkc2NvcGUsJHRpbWVvdXQsJGh0dHAsJHN0YXRlUGFyYW1zLFRpcCwkc3RhdGUpe1xyXG5cdCRzY29wZS5lbWFpbD0nJztcclxuXHQkc2NvcGUucGFzc1dvcmQgPSAnJztcclxuXHQkc2NvcGUucGFzc3dvcmRfYWdhaW4gPSAnJztcclxuXHQkc2NvcGUucGFzc3dvcmRfc3Ryb25nPScnO1xyXG5cdHZhciBydW8gPSAvWzAtOSBhLXogXS87XHJcblx0ZnVuY3Rpb24gY2hlY2soc3RyKXtcclxuXHRcdHJldHVybiAoL1xcZCsvaS50ZXN0KHN0cikgPyAxIDogMCkgKyAoL1thLXpdKy9pLnRlc3Qoc3RyKSA/IDEgOiAwKSArICggc3RyLnJlcGxhY2UoL1xcZCsvZykucmVwbGFjZSgvW2Etel0rL2lnKT09J3VuZGVmaW5lZCcgPyAwIDogMSk7XHJcblx0fVxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLm9uZm9jdXM9ZnVuY3Rpb24oKXtcclxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdGRvY3VtZW50Lm9ua2V5ZG93bj1mdW5jdGlvbigpe1xyXG5cdFx0XHRcdHZhciBzdHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS52YWx1ZTtcclxuXHRcdFx0XHRzd2l0Y2goY2hlY2soc3RyKSl7XHJcblx0XHRcdFx0XHRjYXNlIDA6XHJcblx0XHRcdFx0XHQgJHNjb3BlLnJ1bz0nJztcclxuXHRcdFx0XHRcdCAkc2NvcGUuemhvbmc9Jyc7XHJcblx0XHRcdFx0XHQgJHNjb3BlLnFpYW5nPScnOyBcclxuXHRcdFx0XHRcdCAkc2NvcGUucGFzc3dvcmRfc3Ryb25nPScnO1xyXG5cdFx0XHRcdFx0IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAxOlxyXG5cdFx0XHRcdFx0ICRzY29wZS5ydW89J3Bhc3N3b3JkX2JnJztcclxuXHRcdFx0XHRcdCAkc2NvcGUuemhvbmc9Jyc7XHJcblx0XHRcdFx0XHQgJHNjb3BlLnFpYW5nPScnOyBcclxuXHRcdFx0XHRcdCAkc2NvcGUucGFzc3dvcmRfc3Ryb25nPSflvLEnO1xyXG5cdFx0XHRcdFx0IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAyOlxyXG5cdFx0XHRcdFx0ICRzY29wZS5ydW89J3Bhc3N3b3JkX2JnJztcclxuXHRcdFx0XHRcdCAkc2NvcGUuemhvbmc9J3Bhc3N3b3JkX2JnJztcclxuXHRcdFx0XHRcdCAkc2NvcGUucWlhbmc9Jyc7IFxyXG5cdFx0XHRcdFx0ICRzY29wZS5wYXNzd29yZF9zdHJvbmc9J+S4rSc7IFxyXG5cdFx0XHRcdFx0IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAzOlxyXG5cdFx0XHRcdFx0ICRzY29wZS5ydW89J3Bhc3N3b3JkX2JnJztcclxuXHRcdFx0XHRcdCAkc2NvcGUuemhvbmc9J3Bhc3N3b3JkX2JnJztcclxuXHRcdFx0XHRcdCAkc2NvcGUucWlhbmc9J3Bhc3N3b3JkX2JnJzsgXHJcblx0XHRcdFx0XHQgJHNjb3BlLnBhc3N3b3JkX3N0cm9uZz0n5by6JztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0JHNjb3BlLnN1Ym1pdFJlZ2lzdGVyPWZ1bmN0aW9uKCl7XHJcblx0XHRpZigkc2NvcGUucGFzc1dvcmQhPSRzY29wZS5wYXNzd29yZF9hZ2Fpbil7XHJcblx0XHRcdFRpcC5BbGVydCgn56Gu6K6k5a+G56CB5LiN5LiA6Ie077yBJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmKCRzY29wZS5wYXNzV29yZCl7XHJcblx0XHRcdCRzdGF0ZS5nbygncmVnaXN0ZXIuc3RlcDMnLHtcclxuXHRcdFx0XHRvYmo6e1xyXG5cdFx0XHRcdFx0cGhvbmU6JHN0YXRlUGFyYW1zLm9iai5waG9uZSxcclxuXHRcdFx0XHRcdGVtYWlsOiRzY29wZS5lbWFpbCxcclxuXHRcdFx0XHRcdHBhc3N3b3JkOiRzY29wZS5wYXNzV29yZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcbn1dKVxyXG4uY29udHJvbGxlcigncmVnaXN0ZXJTdGVwM0N0cmwnLFsnJHNjb3BlJywnJHRpbWVvdXQnLCckaHR0cCcsJyRzdGF0ZVBhcmFtcycsJ1VybCcsJ1RpcCcsJyRzdGF0ZScsZnVuY3Rpb24oJHNjb3BlLCR0aW1lb3V0LCRodHRwLCRzdGF0ZVBhcmFtcyxVcmwsVGlwLCRzdGF0ZSl7XHJcblx0Y29uc29sZS5sb2coJHN0YXRlUGFyYW1zKTtcclxuXHQkc2NvcGUuY29uU2l6ZT01MDtcclxuXHQkc2NvcGUuY29uTmFtZT1cIlwiO1xyXG5cdCRzY29wZS5jb25Xb3JsZD1cIlwiO1xyXG5cdCRzY29wZS5yZWdpc3Rlcj1mdW5jdGlvbigpe1xyXG5cdFx0dmFyIGpzb24gPSB7XHJcblx0XHRcdHVzZXJQcml2YXRlVXJsOiRzY29wZS5jb25Xb3JsZCsnLmNtY2MuY29tJyxcclxuXHRcdFx0ZW1haWw6JHN0YXRlUGFyYW1zLm9iai5lbWFpbCxcclxuXHRcdFx0cGhvbmU6JHN0YXRlUGFyYW1zLm9iai5waG9uZSxcclxuXHRcdFx0b2JqZWN0VHlwZToyLFxyXG5cdFx0XHRuYW1lOiRzY29wZS5jb25OYW1lLFxyXG5cdFx0XHRjb21wYW55U2NhbGU6JHNjb3BlLmNvblNpemUsXHJcblx0XHRcdHBhc3N3b3JkOiRzdGF0ZVBhcmFtcy5vYmoucGFzc3dvcmRcclxuXHRcdH1cclxuXHRcdCRodHRwKHtcclxuXHRcdFx0dXJsOlVybC5nZXRVcmwoJ3JlZ2lzdGVyJyksXHJcblx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdGRhdGE6anNvblxyXG5cdFx0fSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdGlmKGRhdGEuY29kZT09MSl7XHJcblx0XHRcdFx0VGlwLkxvZygkc2NvcGUsXCLms6jlhozmiJDlip8hXCIsZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdCRzdGF0ZS5nbygnbG9naW4nKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRUaXAuTG9nKCRzY29wZSxkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufV0pIiwiYW5ndWxhci5tb2R1bGUoJ2RhdGEnLFtdKVxyXG4uZmFjdG9yeSgnRGF0YScsWyckdGltZW91dCcsZnVuY3Rpb24oJHRpbWVvdXQpe1xyXG5cdHZhciBkYXRhPXtcclxuXHRcdGtmRGF0YTpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon57uI56uvJyxcclxuXHRcdFx0J3N0YXRlJzonLktGJyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifnu4jnq6/nrqHnkIYnLFxyXG5cdFx0XHRcdFx0J3N0YXRlJzonLmtmZ2wnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+e7iOerr+WIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLktGX0tGX2xiJ1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0J3RpdGxlJzon5re75Yqg57uI56uvJyxcclxuXHRcdFx0XHRcdFx0XHQnc3RhdGUnOicuS0ZfS0ZfYWRkS2Z6J1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOiflrqLmiLfliJfooagnLFxyXG5cdFx0XHRcdFx0J3N0YXRlJzonLmtmemdsJyxcclxuXHRcdFx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOiflrqLmiLfliJfooagnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRlpfbGInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQndGl0bGUnOifmt7vliqDlrqLmiLcnLFxyXG5cdFx0XHRcdFx0XHRcdCdzdGF0ZSc6Jy5LRl9LRlpfYWRkS2Z6J1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRcdFx0Y29tcGFueTpcclxuXHRcdHtcclxuXHRcdFx0J3RpdGxlJzon5ZWG5LiaJyxcclxuXHRcdFx0J3N0YXRlJzonLmNvbXBhbnknLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+WVhuS4mueuoeeQhicsXHJcblx0XHRcdFx0XHQnc3RhdGUnOicuY29tcGFueU1hbmFnZSdcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdHByb2R1Y3Q6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J+S6p+WTgScsXHJcblx0XHRcdCdzdGF0ZSc6Jy5wcm9kdWN0JyxcclxuXHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifkuqflk4HnrqHnkIYnLFxyXG5cdFx0XHRcdFx0J3N0YXRlJzonaG9tZS5wcm9kdWN0LnByb2R1Y3RNYW5hZ2UnXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH0sXHJcblx0XHRhZ3JlZW1lbnQ6XHJcblx0XHR7XHJcblx0XHRcdCd0aXRsZSc6J+WNj+iuricsXHJcblx0XHRcdCdzdGF0ZSc6Jy5hZ3JlZW1lbnQnLFxyXG5cdFx0XHQnbGlzdCc6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+WVhuS4muWNj+iuricsXHJcblx0XHRcdFx0XHQnc3RhdGUnOidob21lLmFncmVlbWVudC5idXNpbmVzc0FncmVlbWVudCdcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdCd0aXRsZSc6J+WuouaIt+WNj+iuricsXHJcblx0XHRcdFx0XHQnc3RhdGUnOidob21lLmFncmVlbWVudC5ndWVzdEFncmVlbWVudCdcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cdFx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGZsb3dEYXRhOlxyXG5cdFx0e1xyXG5cdFx0XHQndGl0bGUnOifmtYHlkJEnLFxyXG5cdFx0XHQnc3RhdGUnOicuZmxvdycsXHJcblx0XHRcdCdsaXN0JzpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0J3RpdGxlJzon5rWB5ZCR566h55CGJyxcclxuXHRcdFx0XHRcdCdzdGF0ZSc6Jy5mbG93Z2wnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+a1geWQkeWIl+ihqCcsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLmZsb3dfZmxvd19sYidcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCd0aXRsZSc6J+WvvOWFpea1geWQkScsXHJcblx0XHRcdFx0XHRcdFx0J3N0YXRlJzonLmZsb3dfZmxvd19hZGRmbG93J1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQndGl0bGUnOifnu5PnrpfnrqHnkIYnLFxyXG5cdFx0XHRcdFx0J3N0YXRlJzonLnNldHRsZW1lbnQnLFxyXG5cdFx0XHRcdFx0J2xpc3QnOltcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHRcdFx0XHRcclxuXHRcdH0sXHJcblx0fVxyXG5cdFx0XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldERhdGE6ZnVuY3Rpb24oaWQpe1xyXG5cdFx0XHRmb3IoeCBpbiBkYXRhKXtcclxuXHRcdFx0XHRpZihpZD09eCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZGF0YVt4XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRnZXRDaGF0OmZ1bmN0aW9uKHNjb3BlKXtcclxuXHRcdFx0Y2hhdFNlcnZlLm1zZyhzY29wZSk7XHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG59XSlcclxuLmZhY3RvcnkoJ1VybCcsZnVuY3Rpb24oKXtcclxuXHR2YXIgdXJsRGF0YT17XHJcblx0XHRsb2dpbjonYXBpL2xvZ2luL2xvZ2luJywvL+eZu+mZhlxyXG5cdFx0emRMaXN0OidhcGkvaG9zcC9xdWVyeS9saXN0JywvL+e7iOerr+WIl+ihqFxyXG5cdFx0cXVlcnlaZDonYXBpL2hvc3AvL3F1ZXJ5L29uZScsLy/mn6Xor6Lnu4jnq6/or6bmg4VcclxuXHRcdGdldEFyZWFzTGlzdDonYXBpL3pvbmUvcXVlcnlGb3JBbGxab25lcycsLy/ojrflj5blpKfljLrliJfooahcclxuXHRcdGdldENpdHlMaXN0OidhcGkvem9uZS9xdWVyeUNpdHlCeVpvbmUnLC8v6I635Y+W5Z+O5biC5YiX6KGoXHJcblx0XHRialpkOidhcGkvaG9zcC8vdXBkYXRlL29uZScsLy/nvJbovpHnu4jnq6/kv6Hmga9cclxuXHRcdGFkZFpkOidhcGkvaG9zcC9pbnNlcnQvb25lJywvL+aWsOWinue7iOerr+S/oeaBr1xyXG5cdFx0a2hMaXN0OidhcGkvY3VzdG9tZXIvcXVlcnkvbGlzdCcsLy/lrqLmiLfliJfooahcclxuXHRcdGFkZEtoOidhcGkvY3VzdG9tZXIvaW5zZXJ0L29uZScsLy/mt7vliqDlrqLmiLdcclxuXHRcdHF1ZXJ5S2g6J2FwaS9jdXN0b21lci9xdWVyeS9vbmUnLC8v5p+l6K+i5a6i5oi36K+m5oOFXHJcblx0XHRiaktoOidhcGkvY3VzdG9tZXIvL3VwZGF0ZS9vbmUnLC8v57yW6L6R5a6i5oi35L+h5oGvXHJcblx0XHRmbG93TGlzdDonYXBpL2Zsb3cvcXVlcnkvbGlzdCcsLy/mn6Xor6LmtYHlkJHliJfooahcclxuXHRcdGdldHNldHRsZW1lbnRMaXN0OidhcGkvcmViYXRlUHJvY2Vzcy9saXN0JywvL+iOt+WPlue7k+eul+WIl+ihqFxyXG5cdFx0Z29TZXR0bGVtZW50OidhcGkvcmViYXRlUHJvY2Vzcy9wYXknLC8v57uT566X5LuY5qy+XHJcblx0XHRjYW5jZWxTZXR0bGVtZW50OidhcGkvcmViYXRlUHJvY2Vzcy9wYXkvY2FuY2VsJywvL+WPlua2iOe7k+eul1xyXG5cdFx0aGFuZGxlU2V0dGxlbWVudDonYXBpL3JlYmF0ZVByb2Nlc3MvZGVhbCcsLy/nu5PnrpflpITnkIZcclxuXHRcdHVwbG9hZEZsb3dGaWxlOidhcGkvdXBsb2FkL2ZpbGUnLC8v5LiK5Lyg57uT566X5paH5Lu2XHJcblx0XHRpbXBvcnRGbG93RmlsZTonYXBpL2Zsb3cvaW1wb3J0JywvL+WvvOWFpea1geWQkeaWh+S7tlxyXG5cdFx0Ly9sa21cclxuXHRcdGhvc3BMaXN0OidhcGkvaG9zcC9xdWVyeS9saXN0JywvL+e7iOerr+WIl+ihqFxyXG5cdFx0Y3VzdG9tZXJMaXN0OidhcGkvY3VzdG9tZXIvcXVlcnkvbGlzdCcsLy/lrqLmiLfliJfooahcclxuXHRcdHByb2R1Y3RMaXN0OidhcGkvcHJvZHVjdC9xdWVyeS9saXN0JywvL+iOt+WPluS6p+WTgeWIl+ihqFxyXG5cdFx0YWRkUHJvZHVjdDonYXBpL3Byb2R1Y3QvaW5zZXJ0L29uZScsLy/mt7vliqDkuqflk4FcclxuXHRcdGVkaXRQcm9kdWN0OidhcGkvcHJvZHVjdC91cGRhdGUvb25lJywvL+e8lui+keS6p+WTgVxyXG5cdFx0cHJvZHVjdERldGFpbDonYXBpL3Byb2R1Y3QvcXVlcnkvb25lJywvL+afpeeci+S6p+WTgeivpuaDhVxyXG5cdFx0bWVyY2hhblByb3RMaXN0OidhcGkvbWVyY2hhblByb3QvcXVlcnkvbGlzdCcsLy/ojrflj5bllYbkuJrljY/orq7liJfooahcclxuXHRcdGFkZE1lcmNoYW5Qcm90OidhcGkvbWVyY2hhblByb3QvaW5zZXJ0L29uZScsLy/mt7vliqDllYbkuJrljY/orq5cclxuXHRcdGVkaXRNZXJjaGFuUHJvdDonYXBpL21lcmNoYW5Qcm90L3VwZGF0ZS9vbmUnLC8v57yW6L6R5ZWG5Lia5Y2P6K6uXHJcblx0XHRidXNpbmVzc0FncmVlbWVudDonYXBpL21lcmNoYW5Qcm90L3F1ZXJ5L29uZS8nLC8v5p+l55yL5ZWG5Lia5Y2P6K6u6K+m5oOFXHJcblx0XHRwcm90b2NvbExpc3Q6J2FwaS9wcm90b2NvbC9xdWVyeS9saXN0L3ZhbGlkJywvL+iOt+WPluWuouaIt+WNj+iuruWIl+ihqFxyXG5cdFx0dXNpbmdBZ3JlZW1lbnQ6J2FwaS9wcm90b2NvbC9xdWVyeS9saXN0L3ZhbGlkJywvL+WuouaIt+ivpuaDheWcqOeUqOWNj+iurlxyXG5cdFx0YWRkcHJvdG9jb2w6J2FwaS9wcm90b2NvbC9pbnNlcnQvb25lJywvL+a3u+WKoOWuouaIt+WNj+iurlxyXG5cdFx0ZWRpdHByb3RvY29sOidhcGkvcHJvdG9jb2wvdXBkYXRlL29uZScsLy/nvJbovpHlrqLmiLfljY/orq5cclxuXHRcdGd1ZXN0QWdyZWVtZW50OidhcGkvcHJvdG9jb2wvcXVlcnkvb25lLycsLy/mn6XnnIvlrqLmiLfljY/orq7or6bmg4VcclxuXHRcdGNvbXBhbnlMaXN0OidhcGkvbWVyY2hhbi9tZXJjaGFuL2xpc3QgJywvL+iOt+WPluWFrOWPuOWIl+ihqFxyXG5cdFx0YWRkQ29tcGFueTonYXBpL21lcmNoYW4vbWVyY2hhbi9hZGQnLC8v5re75Yqg5YWs5Y+4XHJcblx0XHRlZGl0Q29tcGFueTonYXBpL21lcmNoYW4vbWVyY2hhbi91cGRhdGUnLC8v57yW6L6R5YWs5Y+4XHJcblx0XHRtZXJjaGFuUHJvdERldGFpbDonYXBpL21lcmNoYW4vbWVyY2hhbi9vbmUnLC8v5p+l55yL5YWs5Y+46K+m5oOFXHJcblx0XHRyZWJhdGVTdHlsZTonYXBpL3JlYmF0ZVN0eWxlL2xpc3QnLC8v5p+l55yL6L+U5Yip5pa55byPXHJcblxyXG5cdH1cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0VXJsOmZ1bmN0aW9uKHVybCl7XHJcblx0XHRcdGZvcihpIGluIHVybERhdGEpe1xyXG5cdFx0XHRcdGlmKHVybD09aSl7XHJcblx0XHRcdFx0XHQgLy9yZXR1cm4gJ2N5Y3JtLycrdXJsRGF0YVtpXTsvL+a1i+ivleS9v+eUqFxyXG5cdFx0XHRcdFx0IHJldHVybiB1cmxEYXRhW2ldOy8v5Y+R5biD5L2/55SoXHJcblx0XHRcdFx0XHQvLyByZXR1cm4gXCJodHRwOi8vMTkyLjE2OC45Mi4xMjoyODA3NC9cIit1cmxEYXRhW2ldO1xyXG5cdFx0XHRcdFx0Ly9yZXR1cm4gXCJodHRwOi8vMTkyLjE2OC45Mi4yMzoyODA3NC9cIit1cmxEYXRhW2ldO1xyXG5cdFx0XHRcdFx0Ly9yZXR1cm4gXCJodHRwOi8veWtmLnR1bm5lbC5xeWRldi5jb20vXCIrdXJsRGF0YVtpXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhZGRLZi5jdHJsJyxbXSlcclxuLmNvbnRyb2xsZXIoJ2FkZGtmQ3RybCcsWyckcm9vdFNjb3BlJyxmdW5jdGlvbigkcm9vdFNjb3Blcyl7XHJcblx0XHJcbn1dKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
