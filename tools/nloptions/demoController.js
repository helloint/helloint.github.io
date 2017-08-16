angular.module('myapp',[])
/*请求数据*/
.factory('dataValue',['$http','$q', function($http,$q) {
	var stockUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20LastTradePriceOnly%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22NLN.TO%22)&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&format=json&callback=a";
   	var exchangeurl= "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22CADUSD%22,%20%22USDCNY%22)&env=store://datatables.org/alltableswithkeys&format=json&callback=a";
	/*股票实时价格*/
	function getCurrentPrice(){
		var defer=$q.defer();		
		$http.get(stockUrl).success(function(response) {
			var len=response.length-2,data=response.substring(6,len);
			defer.resolve(JSON.parse(data).query.results.quote.LastTradePriceOnly);
		});
		return defer.promise;
	}
	/*实时汇率*/
	function getExchange(){
		var defer=$q.defer();		
		$http.get(exchangeurl).success(function(response) {
			var len=response.length-2,data=response.substring(6,len);
			defer.resolve(JSON.parse(data).query.results.rate);
		});
		return defer.promise;
	}
	/*return数据,返回的必须是对象*/
	return {
		getCurrentPrice:getCurrentPrice,
		getExchange:getExchange
	}
}])
/*定义一个过滤器，小数点后两位*/
.filter("curr",function(){
       return function(value){
		   return Number(value).toFixed(2);
	   };
})
/*控制器*/
.controller('myCtrl',['$scope','$timeout','dataValue',function($scope,$timeout,dataValue){
	
	/* 初始值设定 */
	$scope.dataList1=!window.localStorage.getItem('dataList') ? [] : JSON.parse(window.localStorage.getItem('dataList'));
	$scope.CurrentPrice=!window.localStorage.getItem('CurrentPrice') ? 0 : window.localStorage.getItem('CurrentPrice');
	$scope.ExchangeRate=!window.localStorage.getItem('ExchangeRate') ? 0 : JSON.parse(window.localStorage.getItem('ExchangeRate'))[0].Rate;//固定值
	$scope.ExchangeRateCny=!window.localStorage.getItem('ExchangeRate') ? 0 : JSON.parse(window.localStorage.getItem('ExchangeRate'))[1].Rate;//固定值
	$scope.slidertime=!window.localStorage.getItem('slidertime') ? 0 : JSON.parse(window.localStorage.getItem('slidertime'));;
	$scope.showctrl=true;
	$scope.showctrl2=false;
	$scope.todayTime=new Date();
	$scope.TotalValue=0;
	$scope.Current=0;
	$scope.TotalValueCny = 0;
	$scope.CurrentCny = 0;
	$scope.dataList=$scope.dataList1;
	$scope.slider=0;
    $scope.silderBtn=!window.localStorage.getItem('dataList')? false : JSON.parse(window.localStorage.getItem('dataList')).length==0 ? false : true;
	dataValue.getCurrentPrice().then(function(data){
		window.localStorage.setItem('CurrentPrice',data);
	})
	
	dataValue.getExchange().then(function(data){
		window.localStorage.setItem('ExchangeRate',JSON.stringify(data));
	})
	
	$scope.endTime=function(time){
		$scope.data.expiration=new Date(time.getFullYear()+10,time.getMonth(),time.getDate());
	}
	
	var time=null,i=0;
	/*检查异步数据请求数据是否完成*/
	time=setInterval(function(){
		i++;
		if(i>100){
			clearInterval(time);
		}
		/*$apply脏检查*/
		$scope.$apply(function(){
			$scope.CurrentPrice=window.localStorage.getItem('CurrentPrice');	
			if(window.localStorage.getItem('ExchangeRate')){
				 $scope.ExchangeRate=JSON.parse(window.localStorage.getItem('ExchangeRate'))[0].Rate;
				 $scope.ExchangeRateCny=JSON.parse(window.localStorage.getItem('ExchangeRate'))[1].Rate;
				 $scope.ConvertedPrice=numMulti($scope.CurrentPrice,$scope.ExchangeRate).toFixed(2);
				 $scope.ConvertedPriceCny=numMulti($scope.CurrentPrice,numMulti($scope.ExchangeRate,$scope.ExchangeRateCny)).toFixed(2);
			}
		})
	},100)
	

	/*添加一行数据*/
	$scope.add=function(data){
		 var list={};
		/*TotalValue数据处理*/ 
		list.begin=data.begin;
		list.expiration=data.begin;
		list.quantity=data.quantity;
		list.exercise=data.exercise;
		list.stage1=new Date(list.begin.getTime()+31536000000);
		list.stage2=new Date(list.begin.getTime()+63072000000);
		list.stage3=new Date(list.begin.getTime()+94608000000);
		list.stage4=new Date(list.begin.getTime()+126144000000);
		list.total=(numSub($scope.ConvertedPrice,data.exercise)<=0)? 0 : numMulti((numSub($scope.ConvertedPrice,data.exercise)),data.quantity).toFixed(2);
		$scope.dataList1.unshift(list);
		window.localStorage.setItem('dataList',angular.toJson($scope.dataList1));
		/*计算TotalValue值	计算currentValue的值*/ 
		/*监控数据变化，及时展现到页面*/ 
		$timeout(watchvalue,100);
		$scope.silderBtn=true;
	 }
	function slideTime(){
		var startTime=new Date();
		var endTime=new Date(Number(window.localStorage.getItem("slidertime")));
		var mouthSize=(endTime.getFullYear()-startTime.getFullYear())*12+(endTime.getMonth()-startTime.getMonth()
							)+(endTime.getDate()-startTime.getDate()<0?0:1);	
		return mouthSize;
	}
	$( "#slider" ).slider({
		  min: 0,
		  value:0,
		  max: slideTime(),
		  slide: function( event, ui ) {
			  var startTime=new Date();
			  var endTime=new Date(startTime.getFullYear()+parseInt((startTime.getMonth()+ui.value)/12),(startTime.getMonth()+ui.value)%12,startTime.getDate()).getTime();
			  
			  $scope.slider=ui.value;
			  $scope.$apply(function(){
				var num=0; 
				angular.forEach($scope.dataList,function(ele,index){
					num=numAdd(numMulti(selectTime2(endTime,ele.begin),ele.total),num);
				})
				$scope.Current=num;				
				$scope.CurrentCny=numMulti($scope.Current,$scope.ExchangeRateCny).toFixed(2);
				if(ui.value==slideTime()){
				  var t=new Date(Number(window.localStorage.getItem("slidertime")));
				  $scope.todayTime=t;
			    }else{
				  $scope.todayTime=endTime;
			    }
			  })
			
		  }
    });
	
	/*删除一条信息*/
	$scope.del=function(index){
		$scope.dataList1.splice(index,1);
		if($scope.dataList1.length==0){
			$scope.silderBtn=false;
		}
		window.localStorage.setItem('dataList',angular.toJson($scope.dataList1));
		/*计算TotalValue值	计算currentValue的值*/ 
		/*监控数据变化，及时展现到页面*/ 
		$timeout(watchvalue,100);
	}

	/*$watch脏检查监控CurrentPrice值的改变*/
	$scope.$watch('CurrentPrice',function(n,o){
		window.localStorage.setItem('CurrentPrice',n);
		$scope.ConvertedPrice=numMulti($scope.CurrentPrice,$scope.ExchangeRate).toFixed(2);
		$scope.TotalValue=0;$scope.Current=0;
		angular.forEach($scope.dataList1,function(ele,index){
			ele.total=(numSub($scope.ConvertedPrice, ele.exercise)<=0)? 0 : numMulti((numSub($scope.ConvertedPrice,ele.exercise)),ele.quantity);
			$scope.TotalValue =numAdd($scope.TotalValue, ele.total);
			$scope.Current=numAdd(numMulti(selectTime(ele.begin),ele.total),$scope.Current);
			$scope.TotalValueCny =numMulti($scope.TotalValue,$scope.ExchangeRateCny);
			$scope.CurrentCny=numMulti($scope.Current,$scope.ExchangeRateCny);
		})
	 })
	
	/*点击改变CurrentPrice*/
	$scope.show=function(){
		$scope.showctrl=true;
		$scope.showctrl2=false;
	 }
	
	/*确定修改CurrentPrice*/
	$scope.hide=function(){
		 $scope.showctrl=false;
		 $scope.showctrl2=true;
	 }
	
	/*监控数据变化函数，及时展现到页面*/ 
	function watchvalue(){
		var num=0,num2=0;
		$scope.slidertime=0;
		$scope.$watch('dataList1',function(n,o){
			angular.forEach(n,function(ele,index){
				num2=numAdd(numMulti(selectTime(ele.begin),ele.total),num2);
				num=numAdd(num,ele.total);
				$scope.slidertime=$scope.slidertime<=new Date(ele.stage4).getTime()?new Date(ele.stage4).getTime():$scope.slidertime;
			})
			if(n.length==0){
				$scope.slidertime=0;
			}
			window.localStorage.setItem('slidertime',$scope.slidertime);
			$scope.TotalValue=num;
			$scope.Current=num2;
			$scope.TotalValueCny =numMulti($scope.TotalValue,$scope.ExchangeRateCny).toFixed(2);
			$scope.CurrentCny=numMulti($scope.Current,$scope.ExchangeRateCny).toFixed(2);
			$( "#slider" ).slider( "option", "max", slideTime());
			$( "#slider" ).slider( "option", "value",0);
		})
	 }

	function watchSlider(timestr){
		$scope.$watch('slider',function(n,o){
		var num=0; 
		angular.forEach($scope.dataList,function(ele,index){
			num=numAdd(numMulti(selectTime2(timestr),ele.total),num);
		})
		$scope.Current=num;				
		$scope.CurrentCny=numMulti($scope.Current,$scope.ExchangeRateCny).toFixed(2);
		})
	 }
	/*判断当前的时间处于哪个阶段*/
	function selectTime(timeValue){
		var stageTime=new Date(timeValue).getTime(),
			x,
			timeDifference=new Date().getTime()-stageTime,
			/*1年时间*/
			stage1=31536000000,
			stage2=63072000000,
			stage3=94608000000,
			stage4=126144000000;
		if(timeDifference < stage1 ){

			x=0;

		}else if( stage2  > timeDifference   ){

			x = 0.25;

		}else if( stage3  > timeDifference  ){

			x = 0.5;

		}else if( stage4  > timeDifference ){

			x = 0.75;

		}else if(  timeDifference > stage4 ){

			x = 1;

		}
		return x;

	}
	function selectTime2(timeValue,time2Value){
		var stageTime=new Date(timeValue).getTime(),
			x,
			timeDifference=stageTime-new Date(time2Value).getTime(),
			/*1年时间*/
			stage1=31536000000,
			stage2=63072000000,
			stage3=94608000000,
			stage4=126144000000;

		if(timeDifference < stage1 ){

			x=0;

		}else if( stage2  > timeDifference   ){

			x = 0.25;

		}else if( stage3  > timeDifference  ){

			x = 0.5;

		}else if( stage4  > timeDifference ){

			x = 0.75;

		}else if(  timeDifference > stage4 ){

			x = 1;

		}else{
			x=1;
		}
		return x;

	}
	function check(num){
		var n=num.substring(0,1)>0 ? num : num.substring(1,2);
		return n;
	}	

	/*处理加法的小数点问题*/
	function numAdd(num1, num2) { 
		var baseNum, baseNum1, baseNum2; 

		try { 

			baseNum1 = num1.toString().split(".")[1].length; 

		} catch (e) { 

			baseNum1 = 0; 

		} 

		try { 

			baseNum2 = num2.toString().split(".")[1].length; 

		} catch (e) { 

			baseNum2 = 0; 

		} 

		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2)); 
		return (num1 * baseNum + num2 * baseNum) / baseNum; 

	}; 

	/*处理减法的小数点问题*/
	function numSub(num1, num2) { 
		var baseNum, baseNum1, baseNum2; 
		var precision;// 精度 

		try { 

			baseNum1 = num1.toString().split(".")[1].length; 

		} catch (e) { 

			baseNum1 = 0; 

		} 
		try { 

			baseNum2 = num2.toString().split(".")[1].length; 

		} catch (e) { 

			baseNum2 = 0; 

		} 
		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2)); 
		precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2; 
		return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision); 

	};

	/*处理乘法的小数点问题*/
	function numMulti(num1, num2) { 
		var baseNum = 0;
		try { 
			baseNum += num1.toString().split(".")[1].length; 
		} catch (e) { 
		} 
		try { 
			baseNum += num2.toString().split(".")[1].length; 
		} catch (e) { 
		}
		return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
	}; 
}])
