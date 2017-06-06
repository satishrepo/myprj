var user = angular.module('user',['ui.router']);

user.config(function($stateProvider, $urlRouterProvider)
{
	$stateProvider.state('user',
	{
		url : '/user/list',
		templateUrl :'/app/user/list.tpl',
		controller : 'userCtrl'
	})
})
.controller('userCtrl', function($scope, userService)
{
	$scope.title = 'Welcome to user list';

	userService.getService('user',{name:'aa'}).then(function(response)
	{
		if(response.statusCode == 200)
		{
			$scope.users = response.data;
		}
	}).catch(function(err)
	{
		console.log(err);
	})
});