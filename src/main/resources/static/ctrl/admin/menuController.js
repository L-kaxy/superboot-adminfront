/**
 * 菜单控制器.
 */
var controllers = angular.module("controllers", [ 'ngRoute' ]);

/**
 * 主页控制器.
 */
controllers.controller('indexController', function($scope, $http, $window) {
	$scope.currentTitle = localStorageGet("currentTitle", false);
	if ($scope.currentTitle == undefined) {
		$scope.currentTitle = "欢迎";
	}
	$scope.breadcrumb = localStorageGet("breadcrumb", false);
	if ($scope.breadcrumb == undefined) {
		$scope.breadcrumb = [{menuitemname: "欢迎", menuitemicon: "fa fa-archive"}];
	}

	var getMenus = function() {
		menuTree = localStorageGet("menuTree", true);
		if (menuTree == undefined) {
			setTimeout(getMenus, 500);
		} else {
			$scope.menus = menuTree;
			$scope.$apply();
		}
	}
	setTimeout(getMenus, 500);

	$scope.logout = function() {
		$(".loading-container").removeClass("loading-inactive");
		$http.post(baseUrl + "logout").then(function(result) {
			$(".loading-container").addClass("loading-inactive");
			if (result.data) {
				// 删除面包屑的内容
				localStorageGet("currentTitle", true);
				localStorageGet("breadcrumb", true);
				$window.location.href = "login.html";
			} else {
				Notify('网络访问失败，请联系技术工程师', 'top-right', '5000', 'warning', 'fa-warning', true);
			}
		}).catch(function(result) {
			$(".loading-container").addClass("loading-inactive");
		});
	}
	
	$scope.compareParent = function(menuitemparentid, parentid) {
		return menuitemparentid == parentid;
	}
	
	$scope.isShowMenuItem = function(node) {
		return node.isshow == "true";
	}
	
	$scope.isEquality = function(o1, o2) {
		return angular.equals(o1, o2);
	}
	
	$scope.isParemt = function(node, list) {
		var result = false;
		for (var i = 0; i < list.length; i++) {
			if (list[i].menuitemparentid == node.menuitemid) {
				result = true;
				break;
			}
		}
		return result;
	}
	
	$scope.clickMenuItem = function(item) {
		localStoragePut("currentTitle", item.menuitemname);
		$scope.currentTitle = item.menuitemname;
		var breadcrumb = [];
		var menuTree = [];
		for (var i = 0; i < $scope.menus.length; i++) {
			var indexItem = $scope.menus[i];
			menuTree[indexItem.menuitemid] = indexItem;
		}
		breadcrumb.push(item);
		if (item.menuitemparentid != "0") {
			var parentItem = menuTree[item.menuitemparentid];
			breadcrumb.push(parentItem);
			if (parentItem.menuitemparentid != "0") {
				var grandParentItem = menuTree[parentItem.menuitemparentid];
				breadcrumb.push(grandParentItem);
			}
		}
		breadcrumb.reverse();
		localStoragePut("breadcrumb", breadcrumb);
		$scope.breadcrumb = breadcrumb;
		window.location.href = item.menuitemrouteurl;
	}
});