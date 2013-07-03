Place.MainRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "_=_": "index",
    "messages": "messages",
    "map": "map"
  },

  index: function(){
    if (Place.logged()) {
      return this.go('messages');
    }

    this.mainView = new Place.MainView();
    this.switchView(this.mainView);
  },
  
  messages: function(){
    if (!Place.logged()) return this.go('');

    this.messagesView = new Place.MessagesView();
    this.switchView(this.messagesView);
  },
  
  map: function(){
    if (!Place.logged()) return this.go('');

    this.mapView = new Place.MapView();
    this.switchView(this.mapView);
    this.mapView.renderMap();
  },

  go: function(action){
    return this.navigate(action, { trigger: true, replace: true });
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
