Place.MapView = Backbone.View.extend({

  id: 'map',

  initialize: function(){
    _.bindAll(this, 'resize');
    $(window).resize(this.resize);
  },

  resize: function(){
    $('#mapbox').height($(window).outerHeight() - this.$('.bar-title').outerHeight());
  },

  randomColor: function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  },

  markerLayer: function(name, coordinates){
    return L.mapbox.markerLayer({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates
      },
      properties: {
        title: name,
        'marker-color': this.randomColor()
      }
    });
  },

  render: function(){
    this.$el.html($("#map-template").html());
    return this;
  },

  renderMap: function(){
    var coordinates = [
      Place.currentPosition.coords.latitude,
      Place.currentPosition.coords.longitude
    ];

    this.map = L.mapbox.map('mapbox', 'examples.map-y7l23tes');
    this.map.setView(coordinates, 14);

    this.markerLayer(Place.currentUsername, coordinates.reverse()).addTo(this.map);

    Place.users.forEach(function(item){
      this.markerLayer(item.username, item.coordinates).addTo(this.map);
    }, this);
  }

});
