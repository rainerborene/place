Place.MainRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "_=_": "index",
    "messages": "messages",
    "map": "map"
  },
  
  index: function(){
    if (Place.logged()) {
      return this.navigate('messages', { trigger: true, replace: true });
    }

    this.mainView = new Place.MainView();
    this.switchView(this.mainView);
  },
  
  messages: function(){
    this.messagesView = new Place.MessagesView();
    this.switchView(this.messagesView);
  },
  
  map: function(){
    this.mapView = new Place.MapView();
    this.switchView(this.mapView);
    this.mapView.renderMap();
  },

  switchView: function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }

    // Move the view element into the DOM (replacing the old content)
    view.$el.appendTo("#app");

    // Render view after it is in the DOM (styles are applied)
    view.render();

    this.currentView = view;
  }
  
});
