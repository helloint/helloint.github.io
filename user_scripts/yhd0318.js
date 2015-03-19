// ==UserScript==
// @name       yhd.com iPhone6!!
// @namespace  http://userscript.helloint.xyz/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

(function($, window){
    // http://buy.yhd.com/checkoutV3/index.do
    		// iPad mini2 16
//		var productID = 18111872;
//		var promotionIDs = 889564;
//		var promotionGiftIDs = 15767602;
		// iPhone 6 16G
		var productID = 37994158;
		var promotionIDs = 889590;  这个ID每轮递增,开抢前页面确认
		var promotionGiftIDs = 32480099;
    //华为 Mate7
//    	var productID = 36394075;
//		var promotionIDs = 889590;
//		var promotionGiftIDs = 31029315;

		var timerInterval = null;
		var timerTimeout = 1000;
		timerInterval = window.setInterval(checkGoods, timerTimeout);
		function checkGoods()
		{
			var step1 = "http://cart.yhd.com/cart/opt/addLandingpage.do?promotionIDs=" + promotionIDs + "&promotionLevelIDs=0&promotionGiftIDs=" + promotionGiftIDs + "&promotionGiftMerchantIDs=1&promotionGiftNum=1&buttonPosition=cmsminicart_m_2301105&callback=?";
			$.getJSON(step1, function(data){
				// 卖完
				// { code: "300010703004", data: "", msg: "该活动限量商品总数[30]个，已经售完。", trace: "45!$32#@4%&10!$,1301255" }
				// 成功
				//	{"code":"00000000","data":"","msg":"操作成功。","trace":"27!$5#@4%&10!$,1301255"}
				if (data.code == "00000000") {
					window.clearInterval(timerInterval);
                    // {"code":"003002300044","data":null,"msg":"您的操作太频繁，请稍后重试。"}
                    window.setTimeout(function(){
					    getToken();
                    }, 500);
				}
			});
		}
		function getToken()
		{
			var step2 = "http://buy.yhd.com/checkoutV3/init/init.do?cart2Checkbox=" + productID+ "_" + promotionIDs + "-8_0_0_3%3D1&operateFlag=&cartSuppress=&returnUrl=";
			$.get(step2, function(data){
				var token = data.invoiceDTO.orderRundomString;
				var step3 = "http://buy.yhd.com/checkoutV3/confirm/confirmOrder.do?orderID=1&rdCheck=" + token + "&rd=" + Math.random() + "&needProductDetail=1";
				$.get(step3, function(data){
					window.alert("抢到啦");
				});
			});
		}
	}(jQuery, window));