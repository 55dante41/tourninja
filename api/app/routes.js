var PointOfInterest = require(__dirname + '/models/PointOfInterest.js');

module.exports = function(apiServer) {
  apiServer.get('/places/city/{cityId}', function(req, res) {
    var apiResponse = {};
    PointOfInterest.find({city: cityId}, function(err, results) {
      if(err) {
        apiResponse.success = false;
        apiResponse.message = "Database query failed";
        res.send(apiResponse);
        return;
      }
      apiResponse.success = true;
      apiResponse.message = "Query Successful";
      apiResponse.data = results;
      res.send(apiResponse);
    });
  });

  apiServer.post('/places', function(req, res) {
    var apiResponse = {};
    PointOfInterest.find({
                          country: req.params.country,
                          state: req.params.state,
                          city: req.params.city,
                          locality: req.params
                        }, function(err, results) {
                          if(err) {
                            apiResponse.success = false;
                            apiResponse.message = "Error: Database";
                            apiResponse.data = err;
                            res.send(apiResponse);
                            return;
                          }
                          if(results.length > 0) {
                            apiResponse.success = false;
                            apiResponse.message = "Error: Entry already exists";
                            apiResponse.data = results;
                            res.send(apiResponse);
                            return;
                          }
                          var newPointOfInterest = new PointOfInterest();
                          newPointOfInterest.country = req.params.country;
                          newPointOfInterest.state = req.params.state;
                          newPointOfInterest.city = req.params.city;
                          newPointOfInterest.locality = req.params.locality;
                          newPointOfInterest.googlePlaceId = req.params.googlePlaceId;
                          newPointOfInterest.foursquareVenueId = req.params.foursquareVenueId;
                          newPointOfInterest.yelpLocationId = req.params.yelpLocationId;
                        });
  });
};
