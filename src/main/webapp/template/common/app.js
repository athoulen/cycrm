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