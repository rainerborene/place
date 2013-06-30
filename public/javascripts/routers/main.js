Place.MainRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "messages": "messages",
    "map": "map"
  },
  
  index: function(){
    this._swap();
    this.view = new Place.MainView().render();
    this.view.$el.appendTo("#app");
  },
  
  messages: function(){
    this._swap();
    this.view = new Place.MessagesView().render();
    this.view.$el.appendTo("#app");
  },
  
  map: function(){
    this._swap();
    this.view = new Place.MapView().render();
    this.view.$el.appendTo("#app");
    this.view.renderMap();
  },
  
  _swap: function(){
    if (this.view !== undefined){
      this.view.remove();
    }
  }
  
});
