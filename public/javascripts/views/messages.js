Place.MessagesView = Backbone.View.extend({

  className: 'messages',

  events: {
    "keyup textarea": "send"
  },
  
  initialize: function(){
    Place.socket().on("message", this.append, this);
  },
  
  send: function(event){
    if (event.keyCode === 13 || event.which === 13) {
      Place.socket().send(JSON.stringify({ 
        username: Place.currentUser.get('name'), 
        profile_image: Place.currentUser.get('profile_image'),
        message: event.target.value
      }));
      
      $(event.target).val("");
    }
  },

  append: function(params){
    var source = $("#message-template").html()
      , template = Handlebars.compile(source);

    this.$el.find('textarea').before(template(params));
  },

  render: function(){
    this.$el.html($("#messages-template").html());
    return this;
  }
  
});
