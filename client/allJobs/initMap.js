async function initMap() {
  const location = { lat: 25.344, lng: 131.031 };
  // The map, centered at location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11.3,
    center: location,
  });
  // The marker, positioned at location
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });

  window.veryCoolMap = map;
  window.veryCoolMarker = marker;
}
