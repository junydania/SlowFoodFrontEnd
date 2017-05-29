var lat;
var long;
var map;
$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            map = new GMaps({
                el: '#map',
                lat: lat,
                lng: long,
            });
        });
        setGeolocation();
    } else {
        map = new GMaps({
            el: '#map',
            lat: -25.838572,
            lng: 28.209190,
        });
    }

    function setGeolocation() {
        var latitude;
        var longitude;
        var test_env = $('#map').data().testEnv;
        if (test_env === false) {
            GMaps.geolocate({
                success: function(position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    map.addMarker({
                        lat: latitude,
                        lng: longitude,
                        title: 'You',
                        infoWindow: {
                            content: '<p>Hey You!</p>'
                        }
                    });
                    map.drawOverlay({
                        lat: latitude,
                        lng: longitude,
                        layer: 'floatPane',
                        content: '<div class="overlay" style: height:400px>Gotcha</div>'
                    });
                    $.ajax({
                        url: "/restaurants/nearby/:lat/:long",
                        type: "GET",
                        data: { 'latitude': latitude, 'longitude': longitude },
                        dataType: 'json',
                        success: function() {
                            console.log("Your data was successfully sent to the controller");
                        }
                    });
                },
                error: function(error) {
                    alert('Geolocation failed: ' + error.message);
                },
                not_supported: function() {
                    alert('Your browser does not support geolocation');
                }
            });
        } else {
            latitude = lat || -25.838572;
            longitude = long || 28.209190;
            map.setCenter(latitude, longitude);
            map.addMarker({
                lat: latitude,
                lng: longitude,
                title: 'You',
                infoWindow: {
                    content: '<p>Yipee!</p>'
                }
            });
            map.drawOverlay({
                lat: latitude,
                lng: longitude,
                layer: 'floatPane',
                content: '<div class="overlay" style: height:400px>Gotcha</div>'
            });
            $.ajax({
                url: "/restaurants/nearby/:lat/:long",
                type: "GET",
                data: { 'latitude': -25.838572, 'longitude': 28.209190 },
                dataType: 'json',
                success: function() {
                    console.log("Your data was successfully sent to the controller");
                }
            });
        }
    }
});