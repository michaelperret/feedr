function initialize() {
    var map_canvas = document.getElementById('map_canvas');
    var map_options = {
        center: new google.maps.LatLng(39.50, -98.35),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(map_canvas, map_options);


    for (var i = 0; i < photoData.length; i++) {
        var photo = photoData[i];





        console.log(photo);

        if (photo.place != undefined) {
            setTimeout(addMarker, i * 250,
                   photo, map);
        }
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

function addMarker(photo, map) {
    var myLatLng = new google.maps.LatLng(photo.place.location.latitude,
                                          photo.place.location.longitude);
    created_time = photo.created_time;
    big_pic = photo.images[0].source;

    var contentString = '<h1>'+created_time+'</h1><br><img src="'+big_pic+'" width="300"/>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });




    var image = {
        url: photo.picture,
        scaledSize: new google.maps.Size(45,
                                     45)
    };

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}