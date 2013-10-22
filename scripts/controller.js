

app.controller('TimeController', function($scope, TimeService) {

	function TimeLine() {
		this.date = "";
		this.entryAM = "";
		this.outAM = "";
		this.entryPM = "";
		this.outPM = "";
		this.description = "";
	}

	$scope.times = []

	$scope.addLine = function() {
		$scope.times.push(new TimeLine());
	}

	$scope.save = function(time) {
		TimeService.save(time);
	}

	$scope.addLine();
});