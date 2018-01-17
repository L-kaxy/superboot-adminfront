/**
 * 用户角色分配控制器.
 */
controllers
		.controller(
				'userkeyrole',
				function($scope, $http, $window) {
					$scope.loginmsg = localStorageGet("userrole_loginmsg",
							false);
					var userid = localStorageGet("userrole_userid", false);
					$scope.userkey = new UserkeyVo();
					$scope.userkey.userid = userid;
					$scope.getUserRoleList = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "getUserRoleList";

						var data = {
							"userkey":$scope.userkey
						};

						$http.post(url, data)
								.then(
										function(result) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (result.data.serviceResult == true) {
												$scope.userRoles = result.data.resultParm.roleList;
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
					$scope.getUserRoleList();

					$scope.page = new PaginationVo();
					$scope.roleType = new AuthitemVo();
					$scope.roleType.authitemtype = false;
					$scope.searchAuth = new AuthitemVo();
					$scope.searchKeyword;
					$scope.sortField;
					$scope.order = true;
					$scope.sortElement = "authitemid";

					$scope.page.size = 10;
					$scope.page.indexPageNum = 1;

					$scope.pageRole = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageAuthitem";
						var tempSearchAuth = new AuthitemVo();
						// 对角色名查询进行取值
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
												$scope.roles = result.data.resultParm.pageList;
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
					$scope.pageRole();

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
							$scope.pageRole();
						}
					}

					$scope.selectSize = function(size) {
						if ($scope.page.size != size) {
							$scope.page.size = size;
							$scope.pageRole();
						}
					}

					$scope.searchField = function($event) {
						if ($event.keyCode == 13) {// 回车
							$scope.pageRole();
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
						$scope.pageRole();
					}

					$scope.addUserAuth = function(auth) {
						bootbox.setDefaults("locale","zh_CN");
			            bootbox.confirm("确认为" + $scope.loginmsg + "分配" + auth.authitemname + "角色吗？", function (result) {
			                if (result) {
			                	var isAdd = true;
								for (var i = 0; i < $scope.userRoles.length; i++) {
									if ($scope.userRoles[i].authitemname == auth.authitemname) {
										isAdd = false;
										break;
									}
								}
								if (isAdd) {
									$(".loading-container").removeClass(
											"loading-inactive");
									var tempUserAuth = new UserauthitemmapVo();
									tempUserAuth.userid = $scope.userkey.userid;
									tempUserAuth.authitemid = auth.authitemid;
									var userauthitemmapList = [];
									userauthitemmapList.push(tempUserAuth);
									var url = baseUrl + "addUserAuthitemByList";

									var data = {
										"userauthitemmapList":JSON.stringify(userauthitemmapList)
									};

									$http.post(url, data).then(
											function(result) {
												$(".loading-container").addClass(
														"loading-inactive");
												if (result.data.serviceResult == true) {
													$scope.userRoles.push(auth);
												} else {
													Notify('网络访问失败，请联系技术工程师',
															'top-right', '5000',
															'warning', 'fa-warning',
															true);
												}
											})
									.catch(function(result) {
										$(".loading-container").addClass("loading-inactive");
									});
								}
			                }
			            });
					}

					$scope.deleteUserAuth = function(auth) {
						bootbox.setDefaults("locale","zh_CN");
			            bootbox.confirm("确认取消" + auth.authitemname + "角色吗？", function (result) {
			                if (result) {
			                	$(".loading-container").removeClass("loading-inactive");
								var tempUserAuth = new UserauthitemmapVo();
								tempUserAuth.userid = $scope.userkey.userid;
								tempUserAuth.authitemid = auth.authitemid;
								var userauthitemmapList = [];
								userauthitemmapList.push(tempUserAuth);
								var url = baseUrl + "deleteUserAuthitemByList";

								var data = {
									"userauthitemmapList":JSON.stringify(userauthitemmapList)
								};

								$http.post(url, data).then(
										function(result) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (result.data.serviceResult == true) {
												var newRoles = [];
												for (var i = 0; i < $scope.userRoles.length; i++) {
													if ($scope.userRoles[i] != auth) {
														newRoles.push($scope.userRoles[i]);
													}
												}
												$scope.userRoles = newRoles;
											} else {
												Notify('网络访问失败，请联系技术工程师', 'top-right',
														'5000', 'warning',
														'fa-warning', true);
											}
										})
								.catch(function(result) {
									$(".loading-container").addClass("loading-inactive");
								});
			                }
			            });
					}

					$scope.goBack = function() {
						$window.history.back();
					}
				});