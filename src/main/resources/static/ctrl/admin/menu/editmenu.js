/**
 * 编辑菜单控制器.
 */
controllers.controller('editmenu', function($scope, $http, $window) {
	$scope.menuname = localStorageGet("editmenu_menuname", false);
	var menuid = localStorageGet("editmenu_menuid", false);
	$scope.theMenu = new MenuVo();
	$scope.theMenu.menuid = menuid;
	$scope.theMenu.menuname = $scope.menuname;

	$scope.goBack = function() {
		bootbox.setDefaults("locale", "zh_CN");
		bootbox.confirm("确认放弃所编辑菜单？", function(result) {
			if (result) {
				$window.history.back();
			}
		});
	}

	$scope.saveMenu = function() {
		editMenuValidator = $("#editMenuForm").data('bootstrapValidator');
		editMenuValidator.validate();
		if (editMenuValidator.isValid() == true) {
			if ($scope.theMenu.menuname != $scope.menuname) {
				var menuList = [];
				menuList.push($scope.theMenu);
				var url = baseUrl + "editMenuByList";
				$(".loading-container").removeClass("loading-inactive");

				var data = {
					"menuList":JSON.stringify(menuList)
				};

				$http.post(url, data).then(
						function(result) {
							$(".loading-container")
									.addClass("loading-inactive");
							if (result.data) {
								if (result.data.serviceResult == 1) {
									if (result.data.resultParm == undefined) {
										Notify('编辑行为成功', 'top-right', '5000',
												'success', 'fa-check', true);
										$window.history.back();
									} else {
										Notify('这个行为名已经存在', 'top-right',
												'5000', 'warning',
												'fa-warning', true);
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
			} else {
				Notify('编辑菜单成功', 'top-right', '5000', 'success', 'fa-check',
						true);
				$window.history.back();
			}
		}
	}
});