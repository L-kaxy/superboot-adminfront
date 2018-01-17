/**
 * 编辑行为控制器.
 */
controllers.controller('editpermission', function($scope, $http, $window) {
	$scope.permissionname = localStorageGet("editpermission_permissionname",
			false);
	var permissionid = localStorageGet("editpermission_permissionid", false);
	$scope.thePermission = new AuthitemVo();
	$scope.thePermission.authitemid = permissionid;
	$scope.thePermission.authitemtype = true;
	$scope.thePermission.authitemname = $scope.permissionname;

	$scope.goBack = function() {
		bootbox.setDefaults("locale", "zh_CN");
		bootbox.confirm("确认放弃所编辑行为？", function(result) {
			if (result) {
				$window.history.back();
			}
		});
	}

	$scope.savePermission = function() {
		editPermissionValidator = $("#editPermissionForm").data(
				'bootstrapValidator');
		editPermissionValidator.validate();
		if (editPermissionValidator.isValid() == true) {
			if ($scope.thePermission.authitemname != $scope.permissionname) {
				var permissionList = [];
				permissionList.push($scope.thePermission);
				var url = baseUrl + "editAuthitemByList";
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
										Notify('编辑行为成功', 'top-right', '5000',
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
			} else {
				Notify('编辑行为成功', 'top-right', '5000',
						'success', 'fa-check', true);
				$window.history.back();
			}
		}
	}
});