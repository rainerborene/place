Place.MainView = Backbone.View.extend({
  
  className: 'main',
  
  render: function(){
    this.$el.html($("#main-template").html());
    return this;
  }
  
});
