var Place = {

  users: [],

  launch: function(){
    new Place.MainRouter();
    Backbone.history.start({pushState: false});
  }
  
};
