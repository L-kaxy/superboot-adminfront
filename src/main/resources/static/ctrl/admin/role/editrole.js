/**
 * 编辑角色控制器.
 */
controllers
		.controller(
				'editrole',
				function($scope, $http, $window) {
					$scope.rolename = localStorageGet("editrole_rolename",
							false);
					var roleid = localStorageGet("editrole_roleid", false);
					$scope.theRole = new AuthitemVo();
					$scope.theRole.authitemid = roleid;
					$scope.theRole.authitemtype = false;
					$scope.theRole.authitemname = $scope.rolename;
					$scope.getRolePermissionList = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "getRolePermissionList";

						var data = {
							"authitem":$scope.theRole
						};

						$http.post(url, data)
								.then(
										function(result) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (result.data.serviceResult == true) {
												$scope.userPermissions = result.data.resultParm.permissionList;
												$scope.initPermissions = [];
												for (var i = 0; i < $scope.userPermissions.length; i++) {
													$scope.initPermissions
															.push($scope.userPermissions[i].authitemid);
												}
											} else {
												Notify('网络访问失败，请联系技术工程师',
														'top-right', '5000',
														'warning',
														'fa-warning', true);
											}
										})
						.catch(function(result) {
							$(".loading-container").addClass("loading-inactive");
						});
					}
					$scope.getRolePermissionList();

					$scope.page = new PaginationVo();
					$scope.roleType = new AuthitemVo();
					$scope.roleType.authitemtype = true;
					$scope.searchAuth = new AuthitemVo();
					$scope.searchKeyword;
					$scope.sortField;
					$scope.order = true;
					$scope.sortElement = "authitemid";
					
					$scope.page.size = 10;
					$scope.page.indexPageNum = 1;

					$scope.pagePermission = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageAuthitem";
						var tempSearchAuth = new AuthitemVo();
						// 对行为名查询进行取值
						if (($scope.searchAuth.authitemname != null && $scope.searchAuth.authitemname != "")) {
							tempSearchAuth.authitemname = "%25"
									+ $scope.searchAuth.authitemname + "%25";
						}
						if (tempSearchAuth == undefined
								&& $scope.searchKeyword != null
								&& $scope.searchKeyword != "") {
							tempSearchAuth = new AuthitemVo();
							tempSearchAuth.authitemname = "%25"
									+ $scope.searchKeyword + "%25";
						}
						
						$scope.page.order = $scope.order;
						$scope.page.sortFieldNme = $scope.sortElement;
						tempSearchAuth.isdelete = false;
						var data = {
							"pageinfo":$scope.page,
							"authitem":$scope.roleType,
							"authitem2":tempSearchAuth
						};

						$http.post(url, data)
								.then(
										function(result) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (result.data.serviceResult == true) {
												$scope.permissions = result.data.resultParm.pageList;
												$scope.page.totalCount = result.data.resultParm.totalCount;
												// 构造分页显示
												var lastNum = $scope.page.totalCount
														% $scope.page.size;
												var pageNum = parseInt($scope.page.totalCount
														/ $scope.page.size);
												if (lastNum != 0) {
													pageNum++;
												}
												var pages = [];
												for (var i = 1; i <= pageNum; i++) {
													if (i == $scope.page.indexPageNum) {
														pages.push({
															name : i,
															active : "active"
														});
													} else {
														pages.push({
															name : i,
															active : ""
														});
													}
												}
												$scope.pages = pages;
											} else {
												Notify('网络访问失败，请联系技术工程师',
														'top-right', '5000',
														'warning',
														'fa-warning', true);
											}
										})
						.catch(function(result) {
							$(".loading-container").addClass("loading-inactive");
						});
					}
					$scope.pagePermission();

					$scope.sizes = [ {
						name : "10",
						value : "10"
					}, {
						name : "25",
						value : "25"
					}, {
						name : "50",
						value : "50"
					}, {
						name : "100",
						value : "100"
					} ];

					$scope.selectPage = function(indexPageNum) {
						if ($scope.page.indexPageNum != indexPageNum) {
							$scope.page.indexPageNum = indexPageNum;
							$scope.pagePermission();
						}
					}

					$scope.selectSize = function(size) {
						if ($scope.page.size != size) {
							$scope.page.size = size;
							$scope.pagePermission();
						}
					}

					$scope.searchField = function($event) {
						if ($event.keyCode == 13) {// 回车
							$scope.pagePermission();
						}
					}

					function isAsc(element) {
						var result = $(element).hasClass("sorting_asc");
						return result;
					}

					$scope.selectSort = function($event, sortname) {
						$scope.sortField = sortname;
						if ($scope.sortElement != undefined
								&& $scope.sortElement != $event.target) {
							$($scope.sortElement).attr("class", "sorting");
						}
						$scope.sortElement = $event.target;
						if (isAsc($event.target)) {
							$($scope.sortElement).attr("class", "sorting_desc");
							$scope.order = "false";
						} else {
							$($scope.sortElement).attr("class", "sorting_asc");
							$scope.order = "true";
						}
						$scope.pagePermission();
					}

					$scope.addUserAuth = function(auth) {
						var isAdd = true;
						for (var i = 0; i < $scope.userPermissions.length; i++) {
							if ($scope.userPermissions[i].authitemname == auth.authitemname) {
								isAdd = false;
								break;
							}
						}
						if (isAdd) {
							bootbox.setDefaults("locale", "zh_CN");
							bootbox.confirm("确认为" + $scope.rolename + "分配"
									+ auth.authitemname + "行为吗？", function(
									result) {
								if (result) {
									$scope.userPermissions.push(auth);
									$scope.$apply();
								}
							});
						}
					}

					$scope.deleteUserAuth = function(auth) {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox.confirm(
										"确认取消" + auth.authitemname + "行为吗？",
										function(result) {
											if (result) {
												var newPermissions = [];
												for (var i = 0; i < $scope.userPermissions.length; i++) {
													if ($scope.userPermissions[i] != auth) {
														newPermissions
																.push($scope.userPermissions[i]);
													}
												}
												$scope.userPermissions = newPermissions;
												$scope.$apply();
											}
										});
					}

					$scope.goBack = function() {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox.confirm("确认放弃所编辑角色？", function(result) {
							if (result) {
								$window.history.back();
							}
						});
					}

					function sub(arr1, arr2) {
						var temp = [];
						var temparray = [];
						for (var i = 0; i < arr2.length; i++) {
							temp[arr2[i]] = true;
						}
						for (var i = 0; i < arr1.length; i++) {
							if (!temp[arr1[i]]) {
								temparray.push(arr1[i]);
							}
						}
						return temparray;
					}

					$scope.saveRole = function() {
						editRoleValidator = $("#editRoleForm").data(
								'bootstrapValidator');
						editRoleValidator.validate();
						if (editRoleValidator.isValid() == true) {
							var parmRole = $scope.theRole;
							if (parmRole.authitemname == $scope.rolename) {
								parmRole.authitemname = undefined;
							}
							
							var resultPermissions = [];
							for (var i = 0; i < $scope.userPermissions.length; i++) {
								resultPermissions
										.push($scope.userPermissions[i].authitemid);
							}
							var addPermissionIds = sub(resultPermissions,
									$scope.initPermissions);
							var addPermissions = [];
							for (var i = 0; i < addPermissionIds.length; i++) {
								var tempP = new AuthitemVo();
								tempP.authitemid = addPermissionIds[i];
								addPermissions.push(tempP);
							}

							var subPermissionIds = sub($scope.initPermissions,
									resultPermissions);
							var subPermissions = [];
							for (var i = 0; i < subPermissionIds.length; i++) {
								var tempP = new AuthitemVo();
								tempP.authitemid = subPermissionIds[i];
								subPermissions.push(tempP);
							}

							var url = baseUrl + "editRole";
							$(".loading-container").removeClass(
									"loading-inactive");

							var data = {
								"authitem":parmRole,
								"authitemList":JSON.stringify(addPermissions),
								"authitemList2":JSON.stringify(subPermissions)
							};

							$http.post(url, data)
									.then(
											function(result) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
												if (result.data) {
													if (result.data.serviceResult == 1) {
														Notify('编辑角色成功',
																'top-right',
																'5000',
																'success',
																'fa-check',
																true);
														$window.history.back();
													} else if (result.data.serviceResult == 3) {
														Notify('这个角色名已经存在',
																'top-right',
																'5000',
																'warning',
																'fa-warning',
																true);
													}
												} else {
													Notify('网络访问失败，请联系技术工程师',
															'top-right',
															'5000', 'warning',
															'fa-warning', true);
												}
											})
							.catch(function(result) {
								$(".loading-container").addClass("loading-inactive");
							});
						}
					}
				});