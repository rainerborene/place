Place.MapView = Backbone.View.extend({

  id: 'map',

  initialize: function(){
    Place.Users.on("add", this.insertMarker, this);
    $(window).resize(_.bind(this.resize, this));
  },

  resize: function(){
    $('#mapbox').height($(window).outerHeight() - this.$('.bar-title').outerHeight());
  },

  randomColor: function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  },

  markerLayer: function(attributes){
    var layer = L.mapbox.markerLayer({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: attributes.coordinates
      },
      properties: {
        title: attributes.name,
        image: attributes.image,
        'marker-color': this.randomColor()
      }
    });


    return layer;
  },

  insertMarker: function(user){
    this.mapBox.markerLayer.addLayer(
      this.markerLayer({
        name: user.get('name'),
        image: user.get('profile_image'),
        coordinates: user.coordinates().reverse()
      })
    );
  },

  render: function(){
    this.$el.html($("#map-template").html());
    this.resize();
    return this;
  },

  circleOptions: {
    color: '#ff0000',
    opacity: 0.2,
    weight: 5,
    fillColor: '#ff0000',
    fillOpacity: 0.1
  },

  renderMap: function(){
    var coordinates = Place.currentUser.coordinates();

    this.mapBox = L.mapbox.map('mapbox', 'examples.map-y7l23tes');
    this.mapBox.setView(coordinates, 14);
    this.mapBox.markerLayer.on('mouseover', function(e){
      e.layer.openPopup();
    });

    this.mapBox.markerLayer.on('mouseout', function(e){
      e.layer.closePopup();
    });

    L.circle(coordinates, 2000, this.circleOptions).addTo(this.mapBox);

    Place.Users.fetch();

    return this;
  }

});
