var HomePageViewModel = function() {
  var _self = this;
  _self.locations = ko.observableArray();
  _self.filteredLocations = ko.observableArray();
  _self.filterQuery = ko.observable("");
  _self.showSuggestions = ko.observable(false);
  _self.showLocations = ko.observable(true);
  _self.showSidebar = ko.observable(false);
  _self.showLocationDetails = ko.observable(false);
  _self.selectedLocation = ko.observable();
  _self.isLoading = ko.observable(true);
  _self.setMap = function(map) {
    _self.map = map;
  };
  _self.focusLocation = function(location) {
    if (location) {
      _self.selectedLocation(location);
      _self.selectedLocation().showMarker();
      _self.map.setCenter(location.latLng);
      _self.hideAllExceptSelectedLocationMarkers();
      _self.showDetailsOfSelectedLocation();
    }
  };
  _self.showListOfLocations = function() {
    _self.showLocations(true);
    _self.showLocationDetails(false);
    _self.showSidebar(true);
  };
  _self.showDetailsOfSelectedLocation = function() {
    _self.showLocations(false);
    _self.showLocationDetails(true);
    _self.showSidebar(true);
    _self.isLoading(false);
  };
  _self.openSidebar = function() {
    _self.showSidebar(true);
  };
  _self.hideSidebar = function() {
    _self.showSidebar(false);
  };
  _self.showSelectedLocationMarker = function() {
    _self.selectedLocation().showMarker();
  };
  _self.showAllLocationMarkers = function() {
    for (var i = 0; i < _self.locations().length; i++) {
      _self.locations()[i].showMarker();
    }
  };
  _self.hideAllLocationMarkers = function() {
    for (var i = 0; i < _self.locations().length; i++) {
      _self.locations()[i].hideMarker();
    }
  };
  _self.hideAllExceptSelectedLocationMarkers = function() {
    if (_self.selectedLocation()) {
      for (var i = 0; i < _self.locations().length; i++) {
        if (_self.selectedLocation().id != _self.locations()[i].id) {
          _self.locations()[i].hideMarker();
        }
      }
    } else {
      console.log("No selected location!");
    }
  };
  _self.venueImageInFocusInSelectedLocation = ko.observable(0);
  _self.focusNextVenueImageInSelectedLocation = function() {
    if (_self.venueImageInFocusInSelectedLocation() < _self.getVenuePhotos().length - 1) {
      _self.venueImageInFocusInSelectedLocation(_self.venueImageInFocusInSelectedLocation() + 1);
    }
  };
  _self.focusPrevVenueImageInSelectedLocation = function() {
    if (_self.venueImageInFocusInSelectedLocation() > 0) {
      _self.venueImageInFocusInSelectedLocation(_self.venueImageInFocusInSelectedLocation() - 1);
    }
  };
  _self.getVenuePhotos = function() {
    return _self.selectedLocation().venueDetails().photos.groups[0].items;
  };
  _self.placeImageInFocusInSelectedLocation = ko.observable(0);
  _self.focusNextPlaceImageInSelectedLocation = function() {
    if (_self.placeImageInFocusInSelectedLocation() < _self.getPlacePhotos().length - 1) {
      _self.placeImageInFocusInSelectedLocation(_self.placeImageInFocusInSelectedLocation() + 1);
    }
  };
  _self.focusPrevPlaceImageInSelectedLocation = function() {
    if (_self.placeImageInFocusInSelectedLocation() > 0) {
      _self.placeImageInFocusInSelectedLocation(_self.placeImageInFocusInSelectedLocation() - 1);
    }
  };
  _self.getPlacePhotos = function() {
    return _self.selectedLocation().placeDetails().photos;
  };

  _self.nearbyServices = [];

  //TODO: Implement these services
  _self.nearbyMedicalServices = {};
  _self.nearbyFoodServices = {};
  _self.nearbyHotelServices = {};
  _self.nearbyMedicalServiceMarkersForSelectedLocation = [];
  _self.nearbyFoodServiceMarkersForSelectedLocation = [];
  _self.nearbyHotelMarkersForSelectedLocation = [];

  // nearbyAtmServices is the map of locations to their nearby ATMs
  // nearbyAtmMarkersForSelectedLocation holds the references to the ATM markers of the selectedLocation
  _self.nearbyAtmServicesVisible = false;
  _self.nearbyAtmServices = {};
  _self.nearbyAtmMarkersForSelectedLocation = [];
  _self.getNearbyAtmServices = function(location, cb) {
    if (!_self.nearbyAtmServices[location.id]) {
      var nearbySearchRequest = {
        location: location.latLng,
        radius: '2000',
        types: ['atm']
      };
      placesService.nearbySearch(nearbySearchRequest, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          _self.nearbyAtmServices[location.id] = results;
          cb(results);
        } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          //No results found. Expand search radius?
          console.log("No results found!");
        } else {
          //Request failed
          console.log(status);
        }
      });
    } else {
      cb(_self.nearbyAtmServices[location.id]);
    }
  };
  _self.toggleNearbyAtmServicesForSelectedLocation = function() {
    if (_self.nearbyAtmServicesVisible) {
      _self.hideNearbyAtmServicesForSelectedLocation();
    } else {
      _self.showNearbyAtmServicesForSelectedLocation();
    }
  };
  _self.showNearbyAtmServicesForSelectedLocation = function() {
    if (_self.selectedLocation() && _self.nearbyAtmMarkersForSelectedLocation.length === 0) {
      var selectedLocationId = _self.selectedLocation().id;
      _self.hideAllExceptSelectedLocationMarkers();
      _self.getNearbyAtmServices(_self.selectedLocation(), function(services) {
        for (var i = 0; i < _self.nearbyAtmServices[selectedLocationId].length; i++) {
          var markerOpts = {
            'map': _self.map,
            'position': _self.nearbyAtmServices[selectedLocationId][i].geometry.location,
            'icon': '/images/marker-atm.png'
          };
          var marker = new google.maps.Marker(markerOpts);
          _self.nearbyAtmMarkersForSelectedLocation.push(marker);
        }
        _self.nearbyAtmServicesVisible = true;
      });
    }
  };
  _self.hideNearbyAtmServicesForSelectedLocation = function() {
    if (_self.nearbyAtmMarkersForSelectedLocation.length > 0) {
      for (var i = 0; i < _self.nearbyAtmMarkersForSelectedLocation.length; i++) {
        _self.nearbyAtmMarkersForSelectedLocation[i].setMap(null);
      }
      _self.nearbyAtmMarkersForSelectedLocation = [];
      _self.nearbyAtmServicesVisible = false;
    }
  };

  // nearbyGasStationServices is the map of locations to their nearby Gas Stations
  // nearbyGasStationMarkersForSelectedLocation holds the references to the Gas Station markers of the selectedLocation
  _self.nearbyGasStationServicesVisible = false;
  _self.nearbyGasStationServices = {};
  _self.nearbyGasStationMarkersForSelectedLocation = [];
  _self.getNearbyGasStationServices = function(location, cb) {
    if (!_self.nearbyGasStationServices[location.id]) {
      var nearbySearchRequest = {
        location: location.latLng,
        radius: '2000',
        types: ['gas_station']
      };
      placesService.nearbySearch(nearbySearchRequest, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          _self.nearbyGasStationServices[location.id] = results;
          cb(results);
        } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          //No results found. Expand search radius?
          console.log("No results found!");
        } else {
          //Request failed
          console.log(status);
        }
      });
    } else {
      cb(_self.nearbyGasStationServices[location.id]);
    }
  };
  _self.toggleNearbyGasStationServicesForSelectedLocation = function() {
    if (_self.nearbyGasStationServicesVisible) {
      _self.hideNearbyGasStationServicesForSelectedLocation();
    } else {
      _self.showNearbyGasStationServicesForSelectedLocation();
    }
  };
  _self.showNearbyGasStationServicesForSelectedLocation = function() {
    if (_self.selectedLocation() && _self.nearbyGasStationMarkersForSelectedLocation.length === 0) {
      var selectedLocationId = _self.selectedLocation().id;
      _self.hideAllExceptSelectedLocationMarkers();
      _self.getNearbyGasStationServices(_self.selectedLocation(), function(services) {
        for (var i = 0; i < _self.nearbyGasStationServices[selectedLocationId].length; i++) {
          var markerOpts = {
            'map': _self.map,
            'position': _self.nearbyGasStationServices[selectedLocationId][i].geometry.location,
            'icon': '/images/marker-gasstation.png'
          };
          var marker = new google.maps.Marker(markerOpts);
          _self.nearbyGasStationMarkersForSelectedLocation.push(marker);
        }
        _self.nearbyGasStationServicesVisible = true;
      });
    }
  };
  _self.hideNearbyGasStationServicesForSelectedLocation = function() {
    if (_self.nearbyGasStationMarkersForSelectedLocation.length > 0) {
      for (var i = 0; i < _self.nearbyGasStationMarkersForSelectedLocation.length; i++) {
        _self.nearbyGasStationMarkersForSelectedLocation[i].setMap(null);
      }
      _self.nearbyGasStationMarkersForSelectedLocation = [];
      _self.nearbyGasStationServicesVisible = false;
    }
  };


  _self.nearbyServiceMarkersForSelectedLocation = [];
  _self.getNearbyServices = function(location, services, cb) {
    if (!self.nearbyServices) {
      var nearbySearchRequest = {
        location: location.latLng,
        radius: '2000',
        types: services
      };
      placesService.nearbySearch(nearbySearchRequest, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          _self.nearbyServices = results;
          cb(results);
        } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          console.log("NO RESULTS FOUND - EXPAND SEARCH RADIUS??");
        } else {
          console.log(status);
        }
      });
    } else {
      cb(_self.nearbyServices);
    }
  };
  _self.showNearbyServicesForSelectedLocation = function(serviceType) {
    if (_self.selectedLocation()) {
      _self.hideAllLocationMarkers();
      _self.selectedLocation().marker().setMap(_self.map);
      _self.getNearbyServices(_self.selectedLocation(), [serviceType], function(services) {
        for (var i = 0; i < _self.nearbyServices.length; i++) {
          var markerOpts = {
            'map': _self.map,
            'position': _self.nearbyServices[i].geometry.location,
            'icon': '/images/marker-blue-atm.png'
          };
          var marker = new google.maps.Marker(markerOpts);
          _self.nearbyServiceMarkersForSelectedLocation.push(marker);
        }
      });
    }
  };
  _self.hideNearbyServicesForSelectedLocation = function() {
    if (_self.nearbyServiceMarkersForSelectedLocation) {
      for (var i = 0; i < _self.nearbyServiceMarkersForSelectedLocation.length; i++) {
        _self.nearbyServiceMarkersForSelectedLocation[i].setMap(null);
      }
      _self.nearbyServiceMarkersForSelectedLocation = [];
    }
  };
  _self.getLocationDetails = function(location) {
    if (!location.placeDetails() && location.placeId) {
      var placeRequest = {
        placeId: location.placeId
      };
      placesService.getDetails(placeRequest, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          location.placeDetails(place);
        } else {
          console.log('Status from PlacesService: ' + status);
        }
      });
    }
    if (!location.venueDetails() && location.venueId) {
      _self.isLoading(true);
      var venueRequest = {
        venueId: location.venueId
      };
      venuesService.getVenueDetails(venueRequest, function(venue, status) {
        if (status == 200) {
          location.venueDetails(venue);
        } else {
          console.log('Status from VenuesService: ' + status);
        }
        _self.isLoading(false);
      });
    } else {
      _self.isLoading(false);
    }
    location.infoWindow().open(googleMap, location.marker());
    _self.focusLocation(location);
  };
};
