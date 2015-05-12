var MarkedLocation = function(id, name, lat, long, placeId, venueId, themes) {
  var _self = this;
  _self.id = id;
  _self.name = name;
  _self.lat = lat;
  _self.long = long;
  _self.latLng = new google.maps.LatLng(lat, long);
  _self.placeId = placeId; //Place ID from Google Places API
  _self.placeDetails = ko.observable(); //Place details from Google Places API
  _self.venueId = venueId; //Venue ID from Foursquare Venues API
  _self.venueDetails = ko.observable(); //Venue details from Foursquare Venues API
  _self.marker = ko.observable();
  _self.infoWindow = ko.observable();
  _self.infoWindowContent = ko.observable();
  _self.themes = themes;
};

MarkedLocation.prototype.showMarker = function() {
  this.marker().setMap(homePageViewModel.map);
};
MarkedLocation.prototype.hideMarker = function() {
  this.marker().setMap(null);
};
