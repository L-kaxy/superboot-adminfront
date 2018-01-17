/**
 * 用户登录凭证列表控制器.
 */
controllers
		.controller(
				'userkeylist',
				function($scope, $http, $window) {
					$scope.page = new PaginationVo();
					$scope.searchUserkey = new UserkeyVo();
					$scope.searchKeyword;
					$scope.sortField;
					$scope.order = true;
					$scope.sortElement = "userkeyid";

					$scope.page.size = 10;
					$scope.page.indexPageNum = 1;

					$scope.pageUserkey = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageUserkey";
						var tempSearchUserkey = new UserkeyVo();
						// 对登录名查询进行取值
						if (($scope.searchUserkey.loginmsg != null && $scope.searchUserkey.loginmsg != "")) {
							tempSearchUserkey.loginmsg = "%25"
									+ $scope.searchUserkey.loginmsg + "%25";
						}
						if (tempSearchUserkey == undefined
								&& $scope.searchKeyword != null
								&& $scope.searchKeyword != "") {
							tempSearchUserkey = new UserkeyVo();
							tempSearchUserkey.loginmsg = "%25"
									+ $scope.searchKeyword + "%25";
						}

						$scope.page.order = $scope.order;
						$scope.page.sortFieldNames = [$scope.sortElement];
						tempSearchUserkey.isdelete = false;
						var data = {
							"pageinfo":$scope.page,
							"userkey":tempSearchUserkey
						};

						$http.post(url, data)
								.then(
										function(result) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (result.data.serviceResult == true) {
												$scope.userkeys = result.data.resultParm.pageList;
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
					$scope.pageUserkey();

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
							$scope.pageUserkey();
						}
					}

					$scope.selectSize = function(size) {
						if ($scope.page.size != size) {
							$scope.page.size = size;
							$scope.pageUserkey();
						}
					}
					
					$scope.searchField = function($event) {
						if ($event.keyCode == 13) {// 回车
							$scope.pageUserkey();
						}
					}
					
					function isAsc(element) {
						var result = $(element).hasClass("sorting_asc");
						return result;
					}
					
					$scope.selectSort = function($event, sortname) {
							$scope.sortField = sortname;
							if ($scope.sortElement != undefined && $scope.sortElement != $event.target) {
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
							$scope.pageUserkey();
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
					
					$scope.preUserkeyRole = function(userid, loginmsg) {
						localStoragePut("userrole_userid", userid);
						localStoragePut("userrole_loginmsg", loginmsg);
						window.location.href = "#/userkeyrole";
					}
				});