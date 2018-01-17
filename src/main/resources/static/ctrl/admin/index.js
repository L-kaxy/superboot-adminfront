/**
 * 后台启动js.
 */
var baseUrl = "/superboot/";
var indexApp = angular.module("indexApp", [ 'ngRoute', 'controllers' ]);
indexApp.config([
		'$routeProvider',
		function($routeProvider, $http) {
			// 先判断是否登录，如果已经登录则直接进入后台主页
			$(".loading-container").removeClass("loading-inactive");
			$.post(baseUrl + "isLogin", function(data) {
				$(".loading-container").addClass("loading-inactive");
				if (data) {
					if (data.serviceResult == true) {
						if (data.resultParm.isLogin == false) {
							window.location.href = "login.html";
						}
					} else {
						Notify('获取菜单失败，请联系技术工程师', 'top-right', '5000',
								'warning', 'fa-warning', true);
					}
				} else {
					Notify('网络访问失败，请联系技术工程师', 'top-right', '5000', 'warning',
							'fa-warning', true);
				}
			});

			// 如果已经登录则进行正常的获取菜单处理
			var menuname = "SuperAdmin";
			$(".loading-container").removeClass("loading-inactive");
			$.getJSON(baseUrl + "getCurrentUserMenuItemList?menuname=" + menuname,
			{"noCache" : Date()}, function(data) {
				$(".loading-container").addClass("loading-inactive");
				if (data) {
					if (data.serviceResult == true) {
						var menuItemList = data.resultParm.menuItemList;
						localStoragePut("menuTree", menuItemList);

						var routeStr = "$routeProvider";
						for (var i = 0; i < menuItemList.length; i++) {
							if (!angular.equals(
									menuItemList[i].menuitemrouteurl, '#')) {

								routeStr = routeStr
										+ ".when('"
										+ menuItemList[i].menuitemrouteurl
												.substring(1)
										+ "', {templateUrl: '"
										+ menuItemList[i].menuitemurl
										+ "',controller: '"
										+ menuItemList[i].menuitemctrl + "'})";
							}
						}
						eval(routeStr);
						if (window.location.hash != "") {
							window.location.href = window.location.href + "#";
						}
					} else {
						Notify('获取菜单失败，请联系技术工程师', 'top-right', '5000',
								'warning', 'fa-warning', true);
					}
				} else {
					Notify('网络访问失败，请联系技术工程师', 'top-right', '5000', 'warning',
							'fa-warning', true);
				}
			});

		} ]);