app.controller('LoginController', function($scope, $location) {

	$scope.user = {name:"",
				   email:"",
				   password:""};

	$scope.login = function(){
		var username = $scope.user.name;
		var password = $scope.user.password;

		Parse.User.logIn(username, password, {
			success:function(user) {
				$location.path('/');
				$scope.$apply();
			},
			error:function(user, error) {
				$scope.error = {messages:[error.message]};
				$scope.$apply();
			}
		});
	};

	$scope.sign_up = function() {

		var username = $scope.user.name;
		var password = $scope.user.password;

		var attr = {
			email:$scope.user.email
		};

		Parse.User.signUp(username, password, attr, {
			success:function(user) {
				$location.path('/');
				$scope.$apply();
			},
			error:function(user, error) {
				$scope.error = {messages:[error.message]};
				$scope.apply();
			}
		});
	};
});

app.controller('TimeController', function($scope, $location, TimeService) {

	if(!Parse.User.current()) $location.path('/login');

	function TimeLine(time) {
		if(!time) time = {attributes:{}}

		this.id   = time.id || null;
		this.date = time.attributes.date || "";
		this.entryAM = time.attributes.entryAM || "";
		this.outAM = time.attributes.outAM || "";
		this.entryPM = time.attributes.entryPM || "";
		this.outPM = time.attributes.outPM || "";
		this.description = time.attributes.description || "";
	}

	$scope.times = []

	$scope.save = function(time) {

		time.user = Parse.User.current();

		TimeService.saveOrUpdate(time, {
			success:function(newTime) {
				clearForm();
				
				if(!time.id) $scope.times.unshift(new TimeLine(newTime));
				
				$scope.$apply();
			}
		});
	}

	$scope.edit = function(time, index) {
		$scope.time = time;	
	}

	$scope.delete = function(time, index) {
		TimeService.delete(time, {
			success:function(deletedTime) {
				$scope.times.splice(index, 1);
				$scope.$apply();
			}
		});
	}

	$scope.logout = function() {
		Parse.User.logOut();
		$location.path("/login");
	}

	function loadTimes() {
		TimeService.findAll({
			success:function(times) {
				for(var index in times) {
					$scope.times.push(new TimeLine(times[index]));
				}

				$scope.$apply();
			}
		})
	}

	function clearForm() {
		$scope.time = new TimeLine();
	}

	loadTimes();
});
