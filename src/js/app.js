
'use strict';

angular.module('prototypeApp',[
		'ui.router'
	])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home',{
			url: '/home',
			templateUrl: '/views/home.tpl.html'
		})
		.state('about',{
			url: '/about',
			templateUrl: '/views/about.tpl.html'
		});
});