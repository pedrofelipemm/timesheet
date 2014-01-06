
app.factory('AuthService', function() {

});

app.factory('TimeService', function() {
	var Time = Parse.Object.extend("Time");

	return {
		saveOrUpdate:function(time, opt) {

			var newTime = new Time();
			
			newTime.id = time.id || null;
			
			newTime.set('entryAM', time.entryAM);
			newTime.set('outAM', time.outAM);
			newTime.set('entryPM', time.entryPM);
			newTime.set('outPM', time.outPM);
			newTime.set('description', time.description);
			
			if(time.date){
				var date = time.date.split("/");
				newTime.set('day', new Date(date[1]+"/"+date[0]+"/"+date[2]));
			} 
			
			newTime.set('user', time.user)

			newTime.save(null, {
				success:function(time){
					if(opt && opt.success) opt.success(time);
				},
				error: function(time, err){
					if(opt && opt.error) opt.error(err);
				}
			});
		},

		delete: function(time, opt) {
			var deleteTime = new Time();

			deleteTime.id = time.id;

			deleteTime.destroy({
				success:function(time){
					if(opt && opt.success) opt.success(time);
				},
				error: function(time, err){
					if(opt && opt.error) opt.error(err);
				}
			});
		},

		findAll:function(opt) {
			var query = new Parse.Query(Time);
			query.equalTo('user', Parse.User.current());
			query.descending('day');
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


