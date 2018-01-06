'use strict';

angular.module('socialCheck').controller('scController', function($scope, $http) {
			$scope.topArticles = [];
			
			$scope.fillArticles = function(articles, i) {
				$http.get("https://hacker-news.firebaseio.com/v0/item/" + articles[i] + ".json").then(function(response) {
							$scope.topArticles[i] = response.data;
						});
			}

			$scope.updateLinks = function updateLinks() {
				$http.get('https://hacker-news.firebaseio.com/v0/topstories.json').then(function(response) {
					var articles = response.data.slice(0, 3);
					for (var i = 0; i < 3; i += 1) {
						$scope.fillArticles(articles, i);
					}
				});
			}
		});
