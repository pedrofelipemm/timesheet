

app.controller('TimeController', function($scope, TimeService) {

	function TimeLine(attributes) {
		if(!attributes) attributes = {}
		this.date = attributes.date || "";
		this.entryAM = attributes.entryAM || "";
		this.outAM = attributes.outAM || "";
		this.entryPM = attributes.entryPM || "";
		this.outPM = attributes.outPM || "";
		this.description = attributes.description || "";
	}

	$scope.times = []

	$scope.addLine = function() {
		$scope.times.push(new TimeLine());
	}

	$scope.save = function(time) {
		TimeService.save(time);
	}

	function loadTimes() {
		TimeService.findAll({
			success:function(times) {
				for(var index in times) {
					$scope.times.push(new TimeLine(times[index].attributes));
				}
				
				$scope.$apply();
			}
		})
	}

	loadTimes();
	$scope.addLine();
});