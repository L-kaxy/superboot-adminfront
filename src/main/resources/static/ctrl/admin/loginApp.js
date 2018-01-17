/**
 * 登录启动js.
 */
var baseUrl = "/superboot/";
var loginApp = angular.module("loginApp", []);
/**
 * 登录界面控制器.
 */
loginApp.controller('LoginController', function($scope, $http, $window) {
	
	// 先判断是否登录，如果已经登录则直接进入后台主页
	$(".loading-container").removeClass("loading-inactive");
	$http.post(baseUrl + "isLogin").then(function(result) {
		$(".loading-container").addClass("loading-inactive");
		if (result.data) {
			if (result.data.serviceResult == true) {
				if (result.data.resultParm.isLogin == true) {
					$window.location.href = "index.html";
				}
			}
		} else {
			Notify('网络访问失败，请联系技术工程师', 'top-right', '5000', 'warning', 'fa-warning', true);
		}
	}).catch(function(result) {
		$(".loading-container").addClass("loading-inactive");
	});

	$scope.userkeyVo = new UserkeyVo();

	$scope.enter = function(ev) {
		if (ev.charCode === 13) {
			$scope.login();
		}
	}

	$scope.login = function() {
		loginValidator = $("#loginForm").data('bootstrapValidator');
		loginValidator.validate();
		if (loginValidator.isValid() == true) {
			var userkey = new UserkeyVo();
			userkey.credential = hex_md5($scope.userkeyVo.credential);
			userkey.loginmsg = $scope.userkeyVo.loginmsg;
			var json = userkey.voToJson();
			$(".loading-container").removeClass("loading-inactive");
			var data = {
				'userkey' : userkey
			};
			$http.post(baseUrl + 'login', data).then(function(result) {
				$(".loading-container").addClass("loading-inactive");
				if (result.data) {
					if (result.data.serviceResult == 1001001001) {
						Notify('该帐号不存在', 'top-right', '5000', 'warning', 'fa-warning', true);
					} else if (result.data.serviceResult == 1001001002) {
						Notify('密码错误', 'top-right', '5000', 'warning', 'fa-warning', true);
					} else if (result.data.serviceResult == true) {
						// 删除面包屑的内容
						localStorageGet("currentTitle", true);
						localStorageGet("breadcrumb", true);
						$window.location.href = "index.html";
					} else {
						Notify('登录失败', 'top-right', '5000', 'warning', 'fa-warning', true);
					}
				} else {
					Notify('网络访问失败，请联系技术工程师', 'top-right', '5000', 'warning', 'fa-warning', true);
				}
			}).catch(function(result) {
				$(".loading-container").addClass("loading-inactive");
			});
		}
	}
});
