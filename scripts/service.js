
app.factory('TimeService', function() {
	var Time = Parse.Object.extend("Time");

	return {
		save:function(time, opt) {
			
			var newTime = new Time();

			newTime.set('date', time.date);
			newTime.set('entryAM', time.entryAM);
			newTime.set('outAM', time.outAM);
			newTime.set('entryPM', time.entryPM);
			newTime.set('outPM', time.outPM);
			newTime.set('description', time.description);

			newTime.save(null, {
				success:function(time){
					if(opt.success) opt.success(time);
				},
				error: function(time, err){
					if(opt.error) opt.error(err);
				}
			});
		},
		findAll:function(opt) {
			var query = new Parse.Query(Time);
			query.find({
				success:function(times){
					if(opt.success) opt.success(times);
				},
				error: function(times, err){
					if(opt.error) opt.error(err);
				}
			})	
		}
	}
});