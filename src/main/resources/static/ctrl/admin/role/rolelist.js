/**
 * 角色列表控制器.
 */
controllers
		.controller(
				'rolelist',
				function($scope, $http, $window) {
					$scope.page = new PaginationVo();
					$scope.searchRole = new AuthitemVo();
					$scope.searchKeyword;
					$scope.sortField;
					$scope.order = true;
					$scope.sortElement = "authitemid";

					$scope.page.size = 10;
					$scope.page.indexPageNum = 1;

					$scope.pageRole = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageRole";
						var tempSearchRole = new AuthitemVo();
						// 对角色名查询进行取值
						if (($scope.searchRole.authitemname != null && $scope.searchRole.authitemname != "")) {
							tempSearchRole.authitemname = "%25"
									+ $scope.searchRole.authitemname + "%25";
						}
						if (tempSearchRole == undefined
								&& $scope.searchKeyword != null
								&& $scope.searchKeyword != "") {
							tempSearchRole = new AuthitemVo();
							tempSearchRole.authitemname = "%25"
									+ $scope.searchKeyword + "%25";
						}

						$scope.page.order = $scope.order;
						$scope.page.sortFieldNames = [$scope.sortElement];
						tempSearchRole.isdelete = false;

						var data = {
							"pageinfo":$scope.page,
							"authitem":tempSearchRole
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

					function isOpen(nTr) {
						var result = true;
						var nextTr = $(nTr).next();
						var displayCss = nextTr.css("display");
						if (displayCss == "none") {
							result = false;
						}
						return result;
					}

					$scope.detailToggler = function(node) {
						var iElem = $(node.target);
						var nTr = iElem.parents('tr')[0];
						if (isOpen(nTr)) {
							/* This row is already open - close it */
							iElem.addClass("fa-plus-square-o").removeClass(
									"fa-minus-square-o");
						} else {
							/* Open this row */
							iElem.addClass("fa-minus-square-o").removeClass(
									"fa-plus-square-o");
						}
						var nextTr = $(nTr).next();
						nextTr.fadeToggle();
					}

					$scope.deleteRole = function(role) {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox
								.confirm(
										"确认删除" + role.authitemname + "角色吗？",
										function(result) {
											if (result) {
												$(".loading-container")
														.removeClass(
																"loading-inactive");
												var tempRole = new AuthitemVo();
												tempRole.authitemtype = false;
												tempRole.authitemid = role.roleid;

												var authList = [];
												authList.push(tempRole);
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
																				.pageRole();
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

					$scope.preAddRole = function() {
						window.location.href = "#/addrole";
					}

					$scope.preEditRole = function(roleid, rolename) {
						localStoragePut("editrole_roleid", roleid);
						localStoragePut("editrole_rolename", rolename);
						window.location.href = "#/editrole";
					}
				});