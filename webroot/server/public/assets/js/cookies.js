function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Store the coordinates in cookies (expires in 7 days)
            document.cookie = `latitude=${latitude}; path=/; max-age=${60 * 60 * 24 * 7}`;
            document.cookie = `longitude=${longitude}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }, function(error) {
            console.error("Error getting location:", error);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

document.getElementById('checkLocation').addEventListener('change', function() {
    if (this.checked) {
        getLocation();
    }
})

