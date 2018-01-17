/**
 * 行为列表控制器.
 */
controllers
		.controller(
				'permissionlist',
				function($scope, $http, $window) {
					$scope.page = new PaginationVo();
					$scope.searchPermission = new AuthitemVo();
					$scope.searchKeyword;
					$scope.sortField;
					$scope.order = true;
					$scope.sortElement = "authitemid";
					
					$scope.page.size = 10;
					$scope.page.indexPageNum = 1;

					$scope.pagePermission = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pagePermission";
						var tempSearchPermission = new AuthitemVo();
						// 对角色名查询进行取值
						if (($scope.searchPermission.authitemname != null && $scope.searchPermission.authitemname != "")) {
							tempSearchPermission.authitemname = "%25"
									+ $scope.searchPermission.authitemname
									+ "%25";
						}
						if (tempSearchPermission == undefined
								&& $scope.searchKeyword != null
								&& $scope.searchKeyword != "") {
							tempSearchPermission = new AuthitemVo();
							tempSearchPermission.authitemname = "%25"
									+ $scope.searchKeyword + "%25";
						}

						$scope.page.order = $scope.order;
						$scope.page.sortFieldNames = [$scope.sortElement];
						tempSearchPermission.isdelete = false;
						var data = {
							"pageinfo":$scope.page,
							"authitem":tempSearchPermission
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

					$scope.deletePermission = function(permission) {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox
								.confirm(
										"确认删除" + permission.authitemname
												+ "行为吗？",
										function(result) {
											if (result) {
												$(".loading-container")
														.removeClass(
																"loading-inactive");
												var tempPermission = new AuthitemVo();
												tempPermission.authitemtype = true;
												tempPermission.authitemid = permission.authitemid;

												var authList = [];
												authList.push(tempPermission);
												var url = baseUrl
														+ "deleteAuthitemByList";

												var data = {
													"authitemList":JSON.stringify(authList)
												};

												$http.post(url, data)
														.then(
																function(result) {
																	$(
																			".loading-container")
																			.addClass(
																					"loading-inactive");
																	if (result.data.serviceResult == true) {
																		$scope
																				.pagePermission();
																	} else {
																		Notify(
																				'网络访问失败，请联系技术工程师',
																				'top-right',
																				'5000',
																				'warning',
																				'fa-warning',
																				true);
																	}
																})
												.catch(function(result) {
													$(".loading-container").addClass("loading-inactive");
												});
											}
										});
					}

					$scope.preAddPermission = function() {
						window.location.href = "#/addpermission";
					}

					$scope.preEditPermission = function(permissionid,
							permissionname) {
						localStoragePut("editpermission_permissionid",
								permissionid);
						localStoragePut("editpermission_permissionname",
								permissionname);
						window.location.href = "#/editpermission";
					}
				});