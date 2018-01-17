/**
 * 接口列表控制器.
 */
controllers
		.controller(
				'actionlist',
				function($scope, $http, $window) {
					$scope.page = new PaginationVo();
					$scope.searchAction = new ActionVo();
					$scope.searchKeyword;
					$scope.sortField;
					$scope.order = true;
					$scope.sortElement = "actionid";

					$scope.page.size = 10;
					$scope.page.indexPageNum = 1;

					$scope.pageAction = function() {
						$(".loading-container").removeClass("loading-inactive");

						var url = baseUrl + "pageAction";

						var tempSearchAction = new ActionVo();
						// 对接口名查询进行取值
						if (($scope.searchAction.actionname != null && $scope.searchAction.actionname != "")) {
							tempSearchAction.actionname = "%25"
									+ $scope.searchAction.actionname + "%25";
						}
						if (tempSearchAction == undefined
								&& $scope.searchKeyword != null
								&& $scope.searchKeyword != "") {
							tempSearchAction = new ActionVo();
							tempSearchAction.actionname = "%25"
									+ $scope.searchKeyword + "%25";
						}
						
						$scope.page.order = $scope.order;
						$scope.page.sortFieldNames = [$scope.sortElement];
						tempSearchAction.isdelete = false;
						var data = {
							"pageinfo":$scope.page,
							"action":tempSearchAction
						};

						$http.post(url, data).then(function(result) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (result.data.serviceResult == true) {
												$scope.actions = result.data.resultParm.pageList;
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
					$scope.pageAction();

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
							$scope.pageAction();
						}
					}

					$scope.selectSize = function(size) {
						if ($scope.page.size != size) {
							$scope.page.size = size;
							$scope.pageAction();
						}
					}

					$scope.searchField = function($event) {
						if ($event.keyCode == 13) {// 回车
							$scope.pageAction();
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
						$scope.pageAction();
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

					$scope.deleteAction = function(action) {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox.confirm(
										"确认删除" + action.actionname + "接口吗？",
										function(result) {
											if (result) {
												$(".loading-container")
														.removeClass(
																"loading-inactive");
												var tempAction = new ActionVo();
												tempAction.actionid = action.actionid;

												var actionList = [];
												actionList.push(tempAction);
												var url = baseUrl + "deleteActionByList";

												var data = {
													"actionList" : JSON.stringify(actionList)
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
																				.pageAction();
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

					$scope.preAddAction = function() {
						window.location.href = "#/addaction";
					}

					$scope.preEditAction = function(actionid, actionname) {
						localStoragePut("editaction_actionid", actionid);
						localStoragePut("editaction_actionname", actionname);
						window.location.href = "#/editaction";
					}
				});