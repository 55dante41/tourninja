var googleMap, defaultFocusPosition, placesService, venuesService;
var locationsData = [];

var homePageViewModel = new HomePageViewModel();
homePageViewModel.filterQuery.subscribe(function(value) {
  homePageViewModel.showSuggestions(value.length > 0);
  homePageViewModel.filteredLocations(homePageViewModel.locations().filter(function(el) {
    return el.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
  }));
});
homePageViewModel.locations.subscribe(function(changes) {
  for (var i = 0; i < changes.length; i++) {
    var change = changes[i].value;
    var markerOpts = {
      'map': googleMap,
      'position': change.latLng,
      'icon': '/images/marker-gray.png'
    };
    var marker = new google.maps.Marker(markerOpts);
    change.marker(marker);
    var infoWindow = new google.maps.InfoWindow();
    change.infoWindowContent(change.name);
    infoWindow.setContent(change.infoWindowContent());
    change.infoWindow(infoWindow);
    google.maps.event.addListener(marker, 'click', function() {
      homePageViewModel.getLocationDetails(change);
    });
  }
}, null, 'arrayChange');

//
// Custom Binding
//
ko.bindingHandlers.loadingWhen = {
  init: function(element) {
    var currentPosition = element.style.position;
    var loader = document.createElement('div');
    loader.classList.add('loader');
    loader.style.display = 'none';

    element.appendChild(loader);

    //make sure that we can absolutely position the loader against the original element
    if (currentPosition == "auto" || currentPosition == "static") {
      element.style.position = "relative";
    }

    loader.style.position = "absolute";
    loader.style.top = "50%";
    loader.style.left = "50%";
    loader.style.marginLeft = -(loader.offsetWidth / 2) + "px";
    loader.style.marginTop = -(loader.offsetHeight / 2) + "px";
  },
  update: function(element, valueAccessor) {
    var isLoading = ko.utils.unwrapObservable(valueAccessor());
    var loaderElements = element.querySelectorAll("div.loader");
    var isLoaderAvailable = loaderElements.length > 0;
    var childrenToHide = [];
    for (var i = 0; i < element.children.length; i++) {
      if (!element.children[i].classList.contains("loader")) {
        childrenToHide.push(element.children[i]);
      }
    }
    //if (isLoaderAvailable) {
      var loader = loaderElements[0];
      if (isLoading) {
        for (var j = 0; j < childrenToHide.length; j++) {
          childrenToHide[j].style.visibility = "hidden";
          childrenToHide[j].disabled = "disabled";
        }
        loader.style.display = "initial";
      } else {
        //$loader.fadeOut("fast");
        loader.style.display = "none";
        for (var k = 0; k < childrenToHide.length; k++) {
          childrenToHide[k].style.visibility = "visible";
          childrenToHide[k].disabled = null;
        }
      }
    // } else {
    //   for (var l = 0; l < childrenToHide.length; l++) {
    //     childrenToHide[l].style.visibility = "visible";
    //     childrenToHide[l].disabled = null;
    //   }
    //}
  }
};

ko.applyBindings(homePageViewModel);

locationsData.push(new MarkedLocation(0, "Marine Life Park", 1.256236, 103.818944, 'ChIJkRh7fv4b2jEReRI7dnChCPg', '4f03c0e79a52357321ff272b', ['holiday', 'animal', 'water', 'natural']));
locationsData.push(new MarkedLocation(1, "Telok Ayer Market", 1.280663, 103.850401, 'ChIJ5Y6l4Q0Z2jERYL0KDIjT6v0', '4c465994f9652d7f8ee7142b', ['market']));
locationsData.push(new MarkedLocation(2, "River Safari", 1.403839, 103.789423, 'ChIJxZfX_9gT2jERknwK8es7IHU', '4f6a90836b74ab8c3fdea078', ['holiday', 'animal', 'water', 'natural']));
locationsData.push(new MarkedLocation(3, "Old Ford Motor Factory", 1.353045, 103.769194, 'ChIJTcyXK1oQ2jERMjEftNlLGk0', '4b058810f964a5205baf22e3', ['holiday', 'historical']));
locationsData.push(new MarkedLocation(4, "Science Centre", 1.332900, 103.735791, 'ChIJY618FAQQ2jERzo1f5IAj4Bg', '4b058810f964a5206caf22e3', ['holiday', 'science']));
locationsData.push(new MarkedLocation(5, "Mint Museum of Toys", 1.296294, 103.854505, 'ChIJW7B7zRIZ2jERINTI_uV1O-A', '4b058811f964a5209aaf22e3', ['holiday', 'historic']));
locationsData.push(new MarkedLocation(6, "Sentosa Island", 1.249406, 103.830302, 'ChIJRYMSeKwe2jERAR2QXVU39vg', '4c67de1d8e9120a1dc7cdb64', ['holiday', 'amusement']));
locationsData.push(new MarkedLocation(7, "Singapore Zoo", 1.404284, 103.793023, 'ChIJr9wqENkT2jERkRs7pMj6FLQ', '4b05880ef964a520b8ae22e3', ['holiday', 'animal', 'zoo', 'natural']));
locationsData.push(new MarkedLocation(8, "Singapore Flyer", 1.289320, 103.863094, 'ChIJzVHFNqkZ2jERboLN2YrltH8', '4b058810f964a52054af22e3', ['holiday', 'amusement']));
locationsData.push(new MarkedLocation(9, "Singapore Botanic Gardens", 1.313899, 103.815925, 'ChIJvWDbfRwa2jERgNnTOpAU3-o', '4b3b3bd0f964a520ac7125e3', ['holiday', 'natural']));
locationsData.push(new MarkedLocation(10, "Jurong Bird Park", 1.318727, 103.706442, 'ChIJOVLiR10F2jERTB2-cCujA4o', '4b05880ef964a520b5ae22e3', ['holiday', 'natural', 'animal']));
locationsData.push(new MarkedLocation(11, "Universal Studios", 1.254063, 103.823765, 'ChIJQ6MVplUZ2jERn1LmNH0DlDA', '4b1ee9ebf964a5207e2124e3', ['holiday', 'amusement']));
locationsData.push(new MarkedLocation(12, "Buddha Tooth Relic Temple and Museum", 1.281623, 103.844316, 'ChIJ0bwmznIZ2jEREOCMNggtIBk', '4a73e804f964a52099dd1fe3',['holiday', 'temple', 'historical']));
locationsData.push(new MarkedLocation(13, "Night Safari", 1.402123, 103.788018, 'ChIJ9xUuiNcT2jER49FS2OpE8W8', '4b05880ef964a520b7ae22e3', ['holiday', 'animal']));
locationsData.push(new MarkedLocation(14, "Asian Civilisations Museum", 1.287514, 103.851412, 'ChIJoZOhmQkZ2jERehLfvKlsoCA', '4b058810f964a52071af22e3', ['holiday', 'historical']));
locationsData.push(new MarkedLocation(15, "Underwater World", 1.258482, 103.811373, 'ChIJ36zKZvob2jERcbaD0IJUd-o', '4b05880ef964a520dcae22e3', ['holiday', 'animal', 'water', 'natural']));
locationsData.push(new MarkedLocation(16, "Peranakan Museum", 1.294378, 103.849047, 'ChIJWZX956MZ2jERIGdnbs_SgMw', '4b058810f964a52078af22e3', ['holiday', 'historical']));
locationsData.push(new MarkedLocation(17, "Singapore History Museum", 1.296829, 103.848543, 'ChIJ69IuoA0Z2jERi_Q7GmHkApA', '4b989892f964a520334835e3', ['holiday', 'historical']));

function initialize() {
  var mapOptions = {
    zoom: 12
  };
  googleMap = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
  homePageViewModel.setMap(googleMap);
  placesService = new google.maps.places.PlacesService(googleMap);
  venuesService = new VenuesService();
  defaultFocusPosition = new google.maps.LatLng(1.367668, 103.823891);

  googleMap.setCenter(defaultFocusPosition);

  for (var i = 0; i < locationsData.length; i++) {
    homePageViewModel.locations.push(locationsData[i]);
    homePageViewModel.filteredLocations.push(locationsData[i]);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
