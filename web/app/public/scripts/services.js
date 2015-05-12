var VenuesService = function() {
  var _self = this;
  _self.oAuthToken = 'VOESV32DEI115APD1UWEL5OYW5BEGYUNYEP0G3QVSX3VQBOD';
  _self.date = '20150322';
  _self.getVenueDetails = function(req, successCb, errorCb) {
    var status, xhRes;
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "https://api.foursquare.com/v2/venues/" + req.venueId +
      "?oauth_token=" + _self.oAuthToken + "&v=" + _self.date, true);
    xhReq.onload = function() {
      xhRes = JSON.parse(xhReq.response);
      status = xhRes.meta.code;
      if (typeof successCb === 'function') {
        successCb(xhRes.response.venue, status);
      }
    };
    xhReq.onerror = function() {
      status = xhReq.status;
      if (typeof errorCb === 'function') {
        errorCb(status, xhReq);
      }
    };
    xhReq.send(null);
  };
};

var testVenuesService = function() {
  venuesService = new VenuesService();
  var request = {
    venueId: '4c67de1d8e9120a1dc7cdb64'
  };
  venuesService.getVenueDetails(request, function(venue, status) {
    console.log(status);
    console.log(data);
  }, function(status, xhr) {
    console.log(status);
    console.log(xhr);
  });
};
