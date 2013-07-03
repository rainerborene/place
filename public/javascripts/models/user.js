Place.User = Backbone.Model.extend({ 
  urlRoot: '/api/users',
  
  coordinates: function(){
    return [this.get('latitude'), this.get('longitude')];
  }
});

Place.Users = new Backbone.Collection([], { model: Place.User, url: '/api/users' });
