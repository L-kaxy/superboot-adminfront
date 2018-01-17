/**
 * 添加菜单项控制器.
 */
controllers
		.controller(
				'addmenuitem',
				function($scope, $http, $window) {
					$scope.menuname = localStorageGet("addmenuitem_menuname",
							false);
					$scope.menuid = localStorageGet("addmenuitem_menuid", false);
					$scope.theMenuItem = new MenuItemVo();
					$scope.theMenuItem.menuid = $scope.menuid;
					$scope.theMenuItem.menuitemorder = 0;
					$scope.theMenuItem.isshow = true;
					$scope.theMenuItem.menuitemparentid = 0;

					$scope.icons = [ {
						name : "fa fa-rub"
					}, {
						name : "fa fa-ruble"
					}, {
						name : "fa fa-rouble"
					}, {
						name : "fa fa-pagelines"
					}, {
						name : "fa fa-stack-exchange"
					}, {
						name : "fa fa-arrow-circle-o-right"
					}, {
						name : "fa fa-arrow-circle-o-left"
					}, {
						name : "fa fa-vimeo-square"
					}, {
						name : "fa fa-adjust"
					}, {
						name : "fa fa-anchor"
					}, {
						name : "fa fa-archive"
					}, {
						name : "fa fa-arrows"
					}, {
						name : "fa fa-arrows-h"
					}, {
						name : "fa fa-arrows-v"
					}, {
						name : "fa fa-asterisk"
					}, {
						name : "fa fa-ban"
					}, {
						name : "fa fa-bar-chart-o"
					}, {
						name : "fa fa-barcode"
					}, {
						name : "fa fa-bars"
					}, {
						name : "fa fa-beer"
					}, {
						name : "fa fa-bell"
					}, {
						name : "fa fa-bell-o"
					}, {
						name : "fa fa-bolt"
					}, {
						name : "fa fa-book"
					}, {
						name : "fa fa-bookmark"
					}, {
						name : "fa fa-bookmark-o"
					}, {
						name : "fa fa-briefcase"
					}, {
						name : "fa fa-bug"
					}, {
						name : "fa fa-building-o"
					}, {
						name : "fa fa-bullhorn"
					}, {
						name : "fa fa-bullseye"
					}, {
						name : "fa fa-calendar"
					}, {
						name : "fa fa-calendar-o"
					}, {
						name : "fa fa-camera"
					}, {
						name : "fa fa-camera-retro"
					}, {
						name : "fa fa-caret-square-o-down"
					}, {
						name : "fa fa-caret-square-o-left"
					}, {
						name : "fa fa-caret-square-o-right"
					}, {
						name : "fa fa-caret-square-o-up"
					}, {
						name : "fa fa-certificate"
					}, {
						name : "fa fa-check"
					}, {
						name : "fa fa-check-circle"
					}, {
						name : "fa fa-check-circle-o"
					}, {
						name : "fa fa-check-square"
					}, {
						name : "fa fa-check-square-o"
					}, {
						name : "fa fa-circle"
					}, {
						name : "fa fa-circle-o"
					}, {
						name : "fa fa-clock-o"
					}, {
						name : "fa fa-cloud"
					}, {
						name : "fa fa-cloud-download"
					}, {
						name : "fa fa-cloud-upload"
					}, {
						name : "fa fa-code"
					}, {
						name : "fa fa-code-fork"
					}, {
						name : "fa fa-coffee"
					}, {
						name : "fa fa-cog"
					}, {
						name : "fa fa-cogs"
					}, {
						name : "fa fa-comment"
					}, {
						name : "fa fa-comment-o"
					}, {
						name : "fa fa-comments"
					}, {
						name : "fa fa-comments-o"
					}, {
						name : "fa fa-compass"
					}, {
						name : "fa fa-credit-card"
					}, {
						name : "fa fa-crop"
					}, {
						name : "fa fa-crosshairs"
					}, {
						name : "fa fa-cutlery"
					}, {
						name : "fa fa-dashboard"
					}, {
						name : "fa fa-desktop"
					}, {
						name : "fa fa-dot-circle-o"
					}, {
						name : "fa fa-download"
					}, {
						name : "fa fa-edit"
					}, {
						name : "fa fa-ellipsis-h"
					}, {
						name : "fa fa-ellipsis-v"
					}, {
						name : "fa fa-envelope"
					}, {
						name : "fa fa-envelope-o"
					}, {
						name : "fa fa-eraser"
					}, {
						name : "fa fa-exchange"
					}, {
						name : "fa fa-exclamation"
					}, {
						name : "fa fa-exclamation-circle"
					}, {
						name : "fa fa-exclamation-triangle"
					}, {
						name : "fa fa-external-link"
					}, {
						name : "fa fa-external-link-square"
					}, {
						name : "fa fa-eye"
					}, {
						name : "fa fa-eye-slash"
					}, {
						name : "fa fa-female"
					}, {
						name : "fa fa-fighter-jet"
					}, {
						name : "fa fa-film"
					}, {
						name : "fa fa-filter"
					}, {
						name : "fa fa-fire"
					}, {
						name : "fa fa-fire-extinguisher"
					}, {
						name : "fa fa-flag"
					}, {
						name : "fa fa-flag-checkered"
					}, {
						name : "fa fa-flag-o"
					}, {
						name : "fa fa-flash"
					}, {
						name : "fa fa-flask"
					}, {
						name : "fa fa-folder"
					}, {
						name : "fa fa-folder-o"
					}, {
						name : "fa fa-folder-open"
					}, {
						name : "fa fa-folder-open-o"
					}, {
						name : "fa fa-frown-o"
					}, {
						name : "fa fa-gamepad"
					}, {
						name : "fa fa-gavel"
					}, {
						name : "fa fa-gear"
					}, {
						name : "fa fa-gears"
					}, {
						name : "fa fa-gift"
					}, {
						name : "fa fa-glass"
					}, {
						name : "fa fa-globe"
					}, {
						name : "fa fa-group"
					}, {
						name : "fa fa-hdd-o"
					}, {
						name : "fa fa-headphones"
					}, {
						name : "fa fa-heart"
					}, {
						name : "fa fa-heart-o"
					}, {
						name : "fa fa-home"
					}, {
						name : "fa fa-inbox"
					}, {
						name : "fa fa-info"
					}, {
						name : "fa fa-info-circle"
					}, {
						name : "fa fa-key"
					}, {
						name : "fa fa-keyboard-o"
					}, {
						name : "fa fa-laptop"
					}, {
						name : "fa fa-leaf"
					}, {
						name : "fa fa-legal"
					}, {
						name : "fa fa-lemon-o"
					}, {
						name : "fa fa-level-down"
					}, {
						name : "fa fa-level-up"
					}, {
						name : "fa fa-lightbulb-o"
					}, {
						name : "fa fa-location-arrow"
					}, {
						name : "fa fa-lock"
					}, {
						name : "fa fa-magic"
					}, {
						name : "fa fa-magnet"
					}, {
						name : "fa fa-mail-forward"
					}, {
						name : "fa fa-mail-reply"
					}, {
						name : "fa fa-mail-reply-all"
					}, {
						name : "fa fa-male"
					}, {
						name : "fa fa-map-marker"
					}, {
						name : "fa fa-meh-o"
					}, {
						name : "fa fa-microphone"
					}, {
						name : "fa fa-microphone-slash"
					}, {
						name : "fa fa-minus"
					}, {
						name : "fa fa-minus-circle"
					}, {
						name : "fa fa-minus-square"
					}, {
						name : "fa fa-minus-square-o"
					}, {
						name : "fa fa-mobile"
					}, {
						name : "fa fa-mobile-phone"
					}, {
						name : "fa fa-money"
					}, {
						name : "fa fa-moon-o"
					}, {
						name : "fa fa-music"
					}, {
						name : "fa fa-pencil"
					}, {
						name : "fa fa-pencil-square"
					}, {
						name : "fa fa-pencil-square-o"
					}, {
						name : "fa fa-phone"
					}, {
						name : "fa fa-phone-square"
					}, {
						name : "fa fa-picture-o"
					}, {
						name : "fa fa-plane"
					}, {
						name : "fa fa-plus"
					}, {
						name : "fa fa-plus-circle"
					}, {
						name : "fa fa-plus-square"
					}, {
						name : "fa fa-plus-square-o"
					}, {
						name : "fa fa-power-off"
					}, {
						name : "fa fa-print"
					}, {
						name : "fa fa-puzzle-piece"
					}, {
						name : "fa fa-qrcode"
					}, {
						name : "fa fa-question"
					}, {
						name : "fa fa-question-circle"
					}, {
						name : "fa fa-quote-left"
					}, {
						name : "fa fa-quote-right"
					}, {
						name : "fa fa-random"
					}, {
						name : "fa fa-refresh"
					}, {
						name : "fa fa-reply"
					}, {
						name : "fa fa-reply-all"
					}, {
						name : "fa fa-retweet"
					}, {
						name : "fa fa-road"
					}, {
						name : "fa fa-rocket"
					}, {
						name : "fa fa-rss"
					}, {
						name : "fa fa-rss-square"
					}, {
						name : "fa fa-search"
					}, {
						name : "fa fa-search-minus"
					}, {
						name : "fa fa-search-plus"
					}, {
						name : "fa fa-share"
					}, {
						name : "fa fa-share-square"
					}, {
						name : "fa fa-share-square-o"
					}, {
						name : "fa fa-shield"
					}, {
						name : "fa fa-shopping-cart"
					}, {
						name : "fa fa-sign-in"
					}, {
						name : "fa fa-sign-out"
					}, {
						name : "fa fa-signal"
					}, {
						name : "fa fa-sitemap"
					}, {
						name : "fa fa-smile-o"
					}, {
						name : "fa fa-sort"
					}, {
						name : "fa fa-sort-alpha-asc"
					}, {
						name : "fa fa-sort-alpha-desc"
					}, {
						name : "fa fa-sort-amount-asc"
					}, {
						name : "fa fa-sort-amount-desc"
					}, {
						name : "fa fa-sort-asc"
					}, {
						name : "fa fa-sort-desc"
					}, {
						name : "fa fa-sort-down"
					}, {
						name : "fa fa-sort-numeric-asc"
					}, {
						name : "fa fa-sort-numeric-desc"
					}, {
						name : "fa fa-sort-up"
					}, {
						name : "fa fa-spinner"
					}, {
						name : "fa fa-square"
					}, {
						name : "fa fa-square-o"
					}, {
						name : "fa fa-star"
					}, {
						name : "fa fa-star-half"
					}, {
						name : "fa fa-star-half-empty"
					}, {
						name : "fa fa-star-half-full"
					}, {
						name : "fa fa-star-half-o"
					}, {
						name : "fa fa-star-o"
					}, {
						name : "fa fa-subscript"
					}, {
						name : "fa fa-suitcase"
					}, {
						name : "fa fa-sun-o"
					}, {
						name : "fa fa-superscript"
					}, {
						name : "fa fa-tablet"
					}, {
						name : "fa fa-tachometer"
					}, {
						name : "fa fa-tag"
					}, {
						name : "fa fa-tags"
					}, {
						name : "fa fa-tasks"
					}, {
						name : "fa fa-terminal"
					}, {
						name : "fa fa-thumb-tack"
					}, {
						name : "fa fa-thumbs-down"
					}, {
						name : "fa fa-thumbs-o-down"
					}, {
						name : "fa fa-thumbs-o-up"
					}, {
						name : "fa fa-thumbs-up"
					}, {
						name : "fa fa-ticket"
					}, {
						name : "fa fa-times"
					}, {
						name : "fa fa-times-circle"
					}, {
						name : "fa fa-times-circle-o"
					}, {
						name : "fa fa-tint"
					}, {
						name : "fa fa-toggle-down"
					}, {
						name : "fa fa-toggle-left"
					}, {
						name : "fa fa-toggle-right"
					}, {
						name : "fa fa-toggle-up"
					}, {
						name : "fa fa-trash-o"
					}, {
						name : "fa fa-trophy"
					}, {
						name : "fa fa-truck"
					}, {
						name : "fa fa-umbrella"
					}, {
						name : "fa fa-unlock"
					}, {
						name : "fa fa-unlock-alt"
					}, {
						name : "fa fa-unsorted"
					}, {
						name : "fa fa-upload"
					}, {
						name : "fa fa-user"
					}, {
						name : "fa fa-users"
					}, {
						name : "fa fa-video-camera"
					}, {
						name : "fa fa-volume-down"
					}, {
						name : "fa fa-volume-off"
					}, {
						name : "fa fa-volume-up"
					}, {
						name : "fa fa-warning"
					}, {
						name : "fa fa-wheelchair"
					}, {
						name : "fa fa-wrench"
					}, {
						name : "fa fa-bitcoin"
					}, {
						name : "fa fa-btc"
					}, {
						name : "fa fa-cny"
					}, {
						name : "fa fa-dollar"
					}, {
						name : "fa fa-eur"
					}, {
						name : "fa fa-euro"
					}, {
						name : "fa fa-gbp"
					}, {
						name : "fa fa-inr"
					}, {
						name : "fa fa-jpy"
					}, {
						name : "fa fa-krw"
					}, {
						name : "fa fa-rmb"
					}, {
						name : "fa fa-rupee"
					}, {
						name : "fa fa-try"
					}, {
						name : "fa fa-turkish-lira"
					}, {
						name : "fa fa-usd"
					}, {
						name : "fa fa-won"
					}, {
						name : "fa fa-yen"
					}, {
						name : "fa fa-align-center"
					}, {
						name : "fa fa-align-justify"
					}, {
						name : "fa fa-align-left"
					}, {
						name : "fa fa-align-right"
					}, {
						name : "fa fa-bold"
					}, {
						name : "fa fa-chain"
					}, {
						name : "fa fa-chain-broken"
					}, {
						name : "fa fa-clipboard"
					}, {
						name : "fa fa-columns"
					}, {
						name : "fa fa-copy"
					}, {
						name : "fa fa-cut"
					}, {
						name : "fa fa-dedent"
					}, {
						name : "fa fa-eraser"
					}, {
						name : "fa fa-file"
					}, {
						name : "fa fa-file-o"
					}, {
						name : "fa fa-file-text"
					}, {
						name : "fa fa-file-text-o"
					}, {
						name : "fa fa-files-o"
					}, {
						name : "fa fa-floppy-o"
					}, {
						name : "fa fa-font"
					}, {
						name : "fa fa-indent"
					}, {
						name : "fa fa-italic"
					}, {
						name : "fa fa-link"
					}, {
						name : "fa fa-list"
					}, {
						name : "fa fa-list-alt"
					}, {
						name : "fa fa-list-ol"
					}, {
						name : "fa fa-list-ul"
					}, {
						name : "fa fa-outdent"
					}, {
						name : "fa fa-paperclip"
					}, {
						name : "fa fa-paste"
					}, {
						name : "fa fa-repeat"
					}, {
						name : "fa fa-rotate-left"
					}, {
						name : "fa fa-rotate-right"
					}, {
						name : "fa fa-save"
					}, {
						name : "fa fa-scissors"
					}, {
						name : "fa fa-strikethrough"
					}, {
						name : "fa fa-table"
					}, {
						name : "fa fa-text-height"
					}, {
						name : "fa fa-text-width"
					}, {
						name : "fa fa-th"
					}, {
						name : "fa fa-th-large"
					}, {
						name : "fa fa-th-list"
					}, {
						name : "fa fa-underline"
					}, {
						name : "fa fa-undo"
					}, {
						name : "fa fa-unlink"
					}, {
						name : "fa fa-angle-double-down"
					}, {
						name : "fa fa-angle-double-left"
					}, {
						name : "fa fa-angle-double-right"
					}, {
						name : "fa fa-angle-double-up"
					}, {
						name : "fa fa-angle-down"
					}, {
						name : "fa fa-angle-left"
					}, {
						name : "fa fa-angle-right"
					}, {
						name : "fa fa-angle-up"
					}, {
						name : "fa fa-arrow-circle-down"
					}, {
						name : "fa fa-arrow-circle-left"
					}, {
						name : "fa fa-arrow-circle-o-down"
					}, {
						name : "fa fa-arrow-circle-o-left"
					}, {
						name : "fa fa-arrow-circle-o-right"
					}, {
						name : "fa fa-arrow-circle-o-up"
					}, {
						name : "fa fa-arrow-circle-right"
					}, {
						name : "fa fa-arrow-circle-up"
					}, {
						name : "fa fa-arrow-down"
					}, {
						name : "fa fa-arrow-left"
					}, {
						name : "fa fa-arrow-right"
					}, {
						name : "fa fa-arrow-up"
					}, {
						name : "fa fa-arrows-alt"
					}, {
						name : "fa fa-caret-down"
					}, {
						name : "fa fa-caret-left"
					}, {
						name : "fa fa-caret-right"
					}, {
						name : "fa fa-caret-up"
					}, {
						name : "fa fa-chevron-circle-down"
					}, {
						name : "fa fa-chevron-circle-left"
					}, {
						name : "fa fa-chevron-circle-right"
					}, {
						name : "fa fa-chevron-circle-up"
					}, {
						name : "fa fa-chevron-down"
					}, {
						name : "fa fa-chevron-left"
					}, {
						name : "fa fa-chevron-right"
					}, {
						name : "fa fa-chevron-up"
					}, {
						name : "fa fa-hand-o-down"
					}, {
						name : "fa fa-hand-o-left"
					}, {
						name : "fa fa-hand-o-right"
					}, {
						name : "fa fa-hand-o-up"
					}, {
						name : "fa fa-hand-o-up"
					}, {
						name : "fa fa-long-arrow-down"
					}, {
						name : "fa fa-long-arrow-left"
					}, {
						name : "fa fa-long-arrow-right"
					}, {
						name : "fa fa-long-arrow-up"
					}, {
						name : "fa fa-backward"
					}, {
						name : "fa fa-compress"
					}, {
						name : "fa fa-eject"
					}, {
						name : "fa fa-expand"
					}, {
						name : "fa fa-fast-backward"
					}, {
						name : "fa fa-fast-forward"
					}, {
						name : "fa fa-forward"
					}, {
						name : "fa fa-pause"
					}, {
						name : "fa fa-play"
					}, {
						name : "fa fa-play-circle"
					}, {
						name : "fa fa-play-circle-o"
					}, {
						name : "fa fa-step-backward"
					}, {
						name : "fa fa-step-forward"
					}, {
						name : "fa fa-stop"
					}, {
						name : "fa fa-youtube-play"
					}, {
						name : "fa fa-adn"
					}, {
						name : "fa fa-android"
					}, {
						name : "fa fa-apple"
					}, {
						name : "fa fa-bitbucket"
					}, {
						name : "fa fa-bitbucket-square"
					}, {
						name : "fa fa-css3"
					}, {
						name : "fa fa-dribbble"
					}, {
						name : "fa fa-dropbox"
					}, {
						name : "fa fa-facebook"
					}, {
						name : "fa fa-facebook-square"
					}, {
						name : "fa fa-flickr"
					}, {
						name : "fa fa-foursquare"
					}, {
						name : "fa fa-github"
					}, {
						name : "fa fa-github-alt"
					}, {
						name : "fa fa-github-square"
					}, {
						name : "fa fa-gittip"
					}, {
						name : "fa fa-google-plus"
					}, {
						name : "fa fa-google-plus-square"
					}, {
						name : "fa fa-html5"
					}, {
						name : "fa fa-instagram"
					}, {
						name : "fa fa-linkedin"
					}, {
						name : "fa fa-linkedin-square"
					}, {
						name : "fa fa-linux"
					}, {
						name : "fa fa-maxcdn"
					}, {
						name : "fa fa-pagelines"
					}, {
						name : "fa fa-pinterest"
					}, {
						name : "fa fa-pinterest-square"
					}, {
						name : "fa fa-renren"
					}, {
						name : "fa fa-skype"
					}, {
						name : "fa fa-stack-exchange"
					}, {
						name : "fa fa-stack-overflow"
					}, {
						name : "fa fa-trello"
					}, {
						name : "fa fa-tumblr"
					}, {
						name : "fa fa-tumblr-square"
					}, {
						name : "fa fa-twitter"
					}, {
						name : "fa fa-twitter-square"
					}, {
						name : "fa fa-vimeo-square"
					}, {
						name : "fa fa-vk"
					}, {
						name : "fa fa-weibo"
					}, {
						name : "fa fa-windows"
					}, {
						name : "fa fa-xing"
					}, {
						name : "fa fa-xing-square"
					}, {
						name : "fa fa-youtube"
					}, {
						name : "fa fa-youtube-square"
					}, {
						name : "fa fa-ambulance"
					}, {
						name : "fa fa-h-square"
					}, {
						name : "fa fa-hospital-o"
					}, {
						name : "fa fa-medkit"
					}, {
						name : "fa fa-stethoscope"
					}, {
						name : "fa fa-user-md"
					} ];

					$scope.searchIcon = function(iconname) {
						$scope.theMenuItem.menuitemicon = iconname;
					}

					var getMenuItemList = new MenuItemVo();
					getMenuItemList.menuid = $scope.menuid;
					$(".loading-container").removeClass("loading-inactive");
					var url = baseUrl + "getMenuMenuItemList";

					var data = {
						"menuItem":getMenuItemList
					};

					$http.post(url, data)
							.then(
									function(result) {
										$(".loading-container").addClass(
												"loading-inactive");
										if (result.data.serviceResult == true) {
											$scope.menuitems = result.data.resultParm.menuItemList;
											$scope.menuitems.splice(0, 0, {
												menuitemid : 0,
												menuitemname : "首页"
											});
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

					$scope.goBack = function() {
						bootbox.setDefaults("locale", "zh_CN");
						bootbox.confirm("确认放弃所添加菜单项？", function(result) {
							if (result) {
								$window.history.back();
							}
						});
					}

					$scope.saveMenuItem = function() {
						addMenuItemValidator = $("#addMenuItemForm").data(
								'bootstrapValidator');
						addMenuItemValidator.validate();
						if (addMenuItemValidator.isValid() == true) {
							if ($scope.theMenuItem.menuitemrouteurl == undefined) {
								$scope.theMenuItem.menuitemrouteurl = "#";
							}
							var menuItemList = [];
							menuItemList.push($scope.theMenuItem);
							var url = baseUrl
									+ "addMenuItemByList";
							$(".loading-container").removeClass(
									"loading-inactive");

							var data = {
								"menuItemList":JSON.stringify(menuItemList)
							};
							$http.post(url, data)
									.then(
											function(result) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
												if (result.data) {
													if (result.data.serviceResult == 1) {
														Notify('添加菜单项成功',
																'top-right',
																'5000',
																'success',
																'fa-check',
																true);
														$window.history.back();
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