var Place = {

  launch: function(){
    new Place.MainRouter();
    Backbone.history.start({ pushState: false });
  },

  login: function(attributes){
    this.currentUser = new Place.User(attributes);
    this.trackLocation();
  },
  
  logged: function(){
    return _.isObject(this.currentUser);
  },

  socket: function(){
    if (_.isUndefined(this._socket)){
      var ws = new WebSocket('ws://localhost:8080');
      _.extend(ws, Backbone.Events);
      ws.onmessage = function(msg){ 
        var params = JSON.parse(msg.data);
        return ws.trigger("message", params); 
      };
      this._socket = ws;
    }
    return this._socket;
  },
  
  trackLocation: function(){
    navigator.geolocation.getCurrentPosition(function(position){
      Place.currentUser.save({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

};
