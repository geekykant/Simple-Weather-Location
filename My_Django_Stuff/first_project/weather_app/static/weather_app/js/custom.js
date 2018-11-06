$("#get_location_button").click(function() {
  $("#get_location_button").addClass('loading');
  getLocation();
});

async function DoSubmit() {
  $("#get_location_button").addClass('loading');
  await getLocation();
  return true;
}

async function getLocation() {
  if (navigator.geolocation) {
    var timeoutVal = 10 * 1000 * 1000;
    navigator.geolocation.getCurrentPosition(
      displaySendPosition,
      displayError, {
        enableHighAccuracy: true,
        timeout: timeoutVal,
        maximumAge: 0
      }
    );
  } else {
    alert("Geolocation is not supported by this browser");
  }

  function displaySendPosition(position) {
    $("#location_info").text("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
    $("#get_location_button").removeClass('loading');

    $("#lat").val(position.coords.latitude);
    $("#lon").val(position.coords.longitude);
    // loadWeather(position.coords.latitude, position.coords.longitude);

    // add location to database
    db.collection("locations").add({
        location: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)
      }).then(function(docRef) {
        console.log("Success!! Location stored in: ", docRef.id);
        receiveFbPosition();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  // retrive location from database
  function receiveFbPosition() {
    db.collection("locations").get().then(function(querySnapshot) {
      console.log("Listing Firebase Locations:");
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
  }

  function displayError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
    $("#get_location_button").removeClass('loading');
  }
}
