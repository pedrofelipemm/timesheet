

app.controller('TimeController', function($scope, TimeService) {

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
		TimeService.saveOrUpdate(time, {
			success:function(newTime) {
				clearForm();
				$scope.times.push(new TimeLine(newTime));
				$scope.$apply();
			}
		});
	}

	$scope.delete = function(time, index) {
		TimeService.delete(time, {
			success:function(deletedTime) {
				$scope.times.splice(index, 1);
				$scope.$apply();
			}
		});
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
