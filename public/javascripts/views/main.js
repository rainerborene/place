Place.MainView = Backbone.View.extend({
  
  className: 'main',
  
  events: {
    "submit form": "join",
    "click .button": "submitButton"
  },

  initialize: function(){
    this.getLocation();
  },
  
  join: function(event){
    var username = this.$el.find('input').val();
    
    if (username.length !== 0){
      Place.currentUsername = username;
      location.hash = '#messages';
    } else {
      alert('Nome é obrigatório');
    }

    event.preventDefault();
  },

  submitButton: function(event){
    this.$('form').submit();
    event.preventDefault();
  },

  getLocation: function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      Place.currentPosition = position;
    });
  },
  
  render: function(){
    this.$el.html($("#main-template").html());
    return this;
  }
  
});
