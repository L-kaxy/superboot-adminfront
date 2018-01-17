/**
 * 菜单项列表控制器.
 */
controllers
		.controller(
				'menuitemlist',
				function($scope, $http, $window) {
					$scope.menuname = localStorageGet("menuitemlist_menuname",
							false);
					$scope.menuid = localStorageGet("menuitemlist_menuid",
							false);

					$('.dd')
							.on(
									'change',
									function(e) {
										var r = $('.dd').nestable('serialize');
										var editMenuitemList = [];
										// 第一层
										var indexParentId = 0;
										for (var i = 0; i < r.length; i++) {
											var theId = r[i].id;
											var theMenuitem = $scope.menubackup[theId];
											var editMenuitem = new MenuItemVo();
											editMenuitem.menuitemid = theMenuitem.menuitemid;
											editMenuitem.menuitemparentid = indexParentId;
											editMenuitem.menuitemorder = i;
											editMenuitemList.push(editMenuitem);
											// 第二层
											if (r[i].children != undefined) {
												var childIndexParentId = r[i].id;
												for (var j = 0; j < r[i].children.length; j++) {
													var theId = r[i].children[j].id;
													var theMenuitem = $scope.menubackup[theId];
													var editMenuitem = new MenuItemVo();
													editMenuitem.menuitemid = theMenuitem.menuitemid;
													editMenuitem.menuitemparentid = childIndexParentId;
													editMenuitem.menuitemorder = j;
													editMenuitemList
															.push(editMenuitem);
													// 第三层
													if (r[i].children[j].children != undefined) {
														var grandsonIndexParentId = r[i].children[j].id;
														for (var k = 0; k < r[i].children[j].children.length; k++) {
															var theId = r[i].children[j].children[k].id;
															var theMenuitem = $scope.menubackup[theId];
															var editMenuitem = new MenuItemVo();
															editMenuitem.menuitemid = theMenuitem.menuitemid;
															editMenuitem.menuitemparentid = grandsonIndexParentId;
															editMenuitem.menuitemorder = k;
															editMenuitemList
																	.push(editMenuitem);
														}
													}
												}
											}
										}

										$(".loading-container").removeClass(
												"loading-inactive");
										var url = baseUrl + "editMenuItemByList";

										var data = {
											"menuItemList":JSON.stringify(editMenuitemList)
										};

										$http.post(url, data)
												.then(
														function(result) {
															$(
																	".loading-container")
																	.addClass(
																			"loading-inactive");
															if (result.data.serviceResult == true) {
																Notify(
																		'调整成功',
																		'top-right',
																		'5000',
																		'success',
																		'fa-check',
																		true);
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
									});

					var theMenuItem = new MenuItemVo();
					theMenuItem.menuid = $scope.menuid;
					$scope.pageMenuItem = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl
								+ "getMenuMenuItemList";

						var data = {
							"menuItem":	theMenuItem						
						};
						$http.post(url, data)
								.then(
										function(result) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (result.data.serviceResult == true) {
												$scope.menuitems = result.data.resultParm.menuItemList;
												$scope.menubackup = [];
												for (var i = 0; i < $scope.menuitems.length; i++) {
													$scope.menubackup[$scope.menuitems[i].menuitemid] = $scope.menuitems[i];
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
					$scope.pageMenuItem();

					$scope.deleteMenuItem = function(menuitem) {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox.confirm(
										"确认删除" + menuitem.menuitemname
												+ "菜单项吗？",
										function(result) {
											if (result) {
												$(".loading-container")
														.removeClass(
																"loading-inactive");
												var tempMenuItem = new MenuItemVo();
												tempMenuItem.menuitemid = menuitem.menuitemid;

												var menuitemList = [];
												menuitemList.push(tempMenuItem);
												var url = baseUrl
														+ "deleteMenuItemByList";

												var data = {
													"menuItemList":JSON.stringify(menuitemList)
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
																				.pageMenuItem();
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

					$scope.goBack = function() {
						$window.history.back();
					}

					$scope.preAddMenuItem = function() {
						localStoragePut("addmenuitem_menuid", $scope.menuid);
						localStoragePut("addmenuitem_menuname", $scope.menuname);
						window.location.href = "#/addmenuitem";
					}

					$scope.preEditMenuItem = function(menuitemid) {
						localStoragePut("editmenuitem_menuid", $scope.menuid);
						localStoragePut("editmenuitem_menuname",
								$scope.menuname);
						localStoragePut("editmenuitem_menuitemid", menuitemid);
						window.location.href = "#/editmenuitem";
					}
				});