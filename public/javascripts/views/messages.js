Place.MessagesView = Backbone.View.extend({

  className: 'messages',

  events: {
    "keyup textarea": "sendMessage"
  },
  
  initialize: function(){
    _.bindAll(this, 'onMessage');
    
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onmessage = this.onMessage;
  },
  
  onMessage: function(msg){
    var source = $("#message-template").html()
      , template = Handlebars.compile(source)
      , locals = JSON.parse(msg.data);

    if (locals.subject === 'message') {
      this.$el.find('textarea').before(template(locals));
    } else if (locals.subject === 'location') {
      Place.users.push(locals);
    }
  },

  sendMessage: function(event){
    if (event.keyCode === 13 || event.which === 13) {
      this.socket.send(JSON.stringify({ 
        subject: 'message',
        username: Place.currentUsername, 
        message: event.target.value
      }));
      
      $(event.target).val("");
    }
  },

  render: function(){
    this.$el.html($("#messages-template").html());
    return this;
  }
  
});
