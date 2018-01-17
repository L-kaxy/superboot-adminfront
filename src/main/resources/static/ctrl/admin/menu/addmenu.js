/**
 * 添加菜单控制器.
 */
controllers.controller('addmenu', function($scope, $http, $window) {
	$scope.theMenu = new MenuVo();

	$scope.goBack = function() {
		bootbox.setDefaults("locale", "zh_CN");
		bootbox.confirm("确认放弃所添加菜单？", function(result) {
			if (result) {
				$window.history.back();
			}
		});
	}

	$scope.saveMenu = function() {
		addMenuForm = $("#addMenuForm").data('bootstrapValidator');
		addMenuForm.validate();
		if (addMenuForm.isValid() == true) {
			var menuList = [];
			menuList.push($scope.theMenu);
			var url = baseUrl + "addMenuByList";
			$(".loading-container").removeClass("loading-inactive");

			var data = {
				"menuList":JSON.stringify(menuList)
			};

			$http.post(url, data).then(
					function(result) {
						$(".loading-container").addClass("loading-inactive");
						if (result.data) {
							if (result.data.serviceResult == 1) {
								if (result.data.resultParm == undefined) {
									Notify('添加菜单成功', 'top-right', '5000',
											'success', 'fa-check', true);
									$window.history.back();
								} else {
									Notify('这个菜单名已经存在', 'top-right', '5000',
											'warning', 'fa-warning', true);
								}
							}
						} else {
							Notify('网络访问失败，请联系技术工程师', 'top-right', '5000',
									'warning', 'fa-warning', true);
						}
					})
			.catch(function(result) {
				$(".loading-container").addClass("loading-inactive");
			});
		}
	}
});