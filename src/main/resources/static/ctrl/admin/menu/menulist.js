/**
 * 菜单列表控制器.
 */
controllers
		.controller(
				'menulist',
				function($scope, $http, $window) {
					$scope.page = new PaginationVo();
					$scope.searchMenu = new MenuVo();
					$scope.searchKeyword;
					$scope.sortField;
					$scope.order = true;
					$scope.sortElement = "menuid";
					
					$scope.page.size = 10;
					$scope.page.indexPageNum = 1;

					$scope.pageMenu = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageMenu";
						var tempSearchMenu = new MenuVo();
						// 对角色名查询进行取值
						if (($scope.searchMenu.menuname != null && $scope.searchMenu.menuname != "")) {
							tempSearchMenu.menuname = "%25"
									+ $scope.searchMenu.menuname + "%25";
						}
						if (tempSearchMenu == undefined
								&& $scope.searchKeyword != null
								&& $scope.searchKeyword != "") {
							tempSearchMenu = new MenuVo();
							tempSearchMenu.menuname = "%25"
									+ $scope.searchKeyword + "%25";
						}

						$scope.page.order = $scope.order;
						$scope.page.sortFieldNames = [$scope.sortElement];
						tempSearchMenu.isdelete = false;

						var data = {
							"pageinfo":$scope.page,
							"menu":tempSearchMenu
						};

						$http.post(url, data)
								.then(
										function(result) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (result.data.serviceResult == true) {
												$scope.menus = result.data.resultParm.pageList;
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
					$scope.pageMenu();

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
							$scope.pageMenu();
						}
					}

					$scope.selectSize = function(size) {
						if ($scope.page.size != size) {
							$scope.page.size = size;
							$scope.pageMenu();
						}
					}

					$scope.searchField = function($event) {
						if ($event.keyCode == 13) {// 回车
							$scope.pageMenu();
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
						$scope.pageMenu();
					}

					$scope.deleteMenu = function(menu) {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox
								.confirm(
										"确认删除" + menu.menuname + "菜单吗？",
										function(result) {
											if (result) {
												$(".loading-container")
														.removeClass(
																"loading-inactive");
												var tempMenu = new MenuVo();
												tempMenu.menuid = menu.menuid;

												var menuList = [];
												menuList.push(tempMenu);
												var url = baseUrl
														+ "deleteMenuByList";

												var data = {
													"menuList":JSON.stringify(menuList)
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
																				.pageMenu();
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

					$scope.preAddMenu = function() {
						window.location.href = "#/addmenu";
					}

					$scope.preEditMenu = function(menuid, menuname) {
						localStoragePut("editmenu_menuid", menuid);
						localStoragePut("editmenu_menuname", menuname);
						window.location.href = "#/editmenu";
					}
					
					$scope.preMenuitemList = function(menuid, menuname) {
						localStoragePut("menuitemlist_menuid", menuid);
						localStoragePut("menuitemlist_menuname", menuname);
						window.location.href = "#/menuitemlist";
					}
				});