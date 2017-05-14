app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
getInfo();
$scope.show_form = true;
function getInfo(){
// Sending request to suggestionDetails files
$http.post('api/crud/suggestionDetails.php').success(function(data){
$scope.details = data;
});
}
$scope.currentPage = 0;
$scope.pageSize = 5;
$scope.numberOfPages = function(){
return Math.ceil($scope.details.length/$scope.pageSize);
}
	$scope.insertInfo = function(info){
	$http.post('api/crud/insertSuggestion.php',{"sugg_text":info.suggestion}).success(function(data){
	if (data == true) {
	getInfo();
	// Hide details insertion form
	//$('#suggestionForm').css('display', 'none');
	$location.path('dashboard');
	}
	});
	};
	//function to like
	$scope.like = function(info){
$http.post('api/crud/like.php',{"sid":info.sid}).success(function(data){
//$scope.show_form = true;
if (data == true) {
getInfo();
}
});
}
//function to dislike
$scope.dislike = function(info){
$http.post('api/crud/dislike.php',{"sid":info.sid}).success(function(data){
//$scope.show_form = true;
if (data == true) {
getInfo();
}
});
}
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
});

app.filter('firstPage',function(){
return function(input, start){
start+=start;
return input.slice(start);
}
});