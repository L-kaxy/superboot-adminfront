/**
 * 添加行为控制器.
 */
controllers.controller('addpermission', function($scope, $http, $window) {
	$scope.thePermission = new AuthitemVo();
	$scope.thePermission.authitemtype = true;

	$scope.goBack = function() {
		bootbox.setDefaults("locale", "zh_CN");
		bootbox.confirm("确认放弃所添加行为？", function(result) {
			if (result) {
				$window.history.back();
			}
		});
	}

	$scope.savePermission = function() {
		addPermissionValidator = $("#addPermissionForm").data(
				'bootstrapValidator');
		addPermissionValidator.validate();
		if (addPermissionValidator.isValid() == true) {
			var permissionList = [];
			permissionList.push($scope.thePermission);
			var url = baseUrl + "addAuthitemByList";
			$(".loading-container").removeClass("loading-inactive");

			var data = {
				"authitemList":JSON.stringify(permissionList)
			};

			$http.post(url, data).then(
					function(result) {
						$(".loading-container").addClass("loading-inactive");
						if (result.data) {
							if (result.data.serviceResult == 1) {
								if (result.data.resultParm == undefined) {
									Notify('添加行为成功', 'top-right', '5000',
											'success', 'fa-check', true);
									$window.history.back();
								} else {
									Notify('这个行为名已经存在', 'top-right', '5000',
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