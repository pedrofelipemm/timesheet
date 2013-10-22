
app.factory('TimeService', function() {
	

	return {
		save:function(time) {
			var Time = Parse.Object.extend("Time");
			var newTime = new Time();

			newTime.set('date', time.date);
			newTime.set('entryAM', time.entryAM);
			newTime.set('outAM', time.outAM);
			newTime.set('entryPM', time.entryPM);
			newTime.set('outPM', time.outPM);
			newTime.set('description', time.description);

			newTime.save(null, {
				success:function(time){},
				error: function(time, err){}
			});
		}
	}
});