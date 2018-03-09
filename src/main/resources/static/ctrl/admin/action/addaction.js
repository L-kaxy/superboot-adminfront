/**
 * 添加接口控制器.
 */
controllers
		.controller(
				'addaction',
				function($scope, $http, $window) {
					$scope.userPermissions = [];
					$scope.theAction = new ActionVo();

					$scope.page = new PaginationVo();
					$scope.permissionType = new AuthitemVo();
					$scope.permissionType.authitemtype = true;
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
						$scope.page.sortFieldNames = [$scope.sortElement];
						tempSearchAuth.isdelete = false;
						var data = {
							"pageinfo":$scope.page,
							"authitem":$scope.permissionType,
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
							bootbox.confirm("确认为新接口分配" + auth.authitemname
									+ "行为吗？", function(result) {
								if (result) {
									$scope.userPermissions.push(auth);
									$scope.$apply();
								}
							});
						}
					}

					$scope.deleteUserAuth = function(auth) {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox
								.confirm(
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
						bootbox.confirm("确认放弃所添加接口？", function(result) {
							if (result) {
								$window.history.back();
							}
						});
					}

					$scope.saveAction = function() {
						addActionForm = $("#addActionForm").data(
								'bootstrapValidator');
						addActionForm.validate();
						if (addActionForm.isValid() == true) {
							var json = $scope.theAction.voToJson();
							var url = baseUrl + "addAction";

							var data = {
								"action" : $scope.theAction,
								"permissionList" : JSON.stringify($scope.userPermissions)
							};

							$(".loading-container").removeClass(
									"loading-inactive");
							$http.post(url, data)
									.then(
											function(result) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
												if (result.data) {
													if (result.data.serviceResult == 1) {
														Notify('添加接口成功',
																'top-right',
																'5000',
																'success',
																'fa-check',
																true);
														$window.history.back();
													} else if (result.data.serviceResult == 3) {
														Notify('这个接口名已经存在',
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