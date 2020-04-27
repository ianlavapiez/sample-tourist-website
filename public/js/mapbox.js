/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibHVmZnlwaXJhdGVzIiwiYSI6ImNqeG56d2QzNDAxcXozZXA0dWpndjFlMXUifQ._9zhfl0f2WVh5_shJbJZ4A'
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/luffypirates/ck9gydzd82fq11iqgxu58iycn',
    scrollZoom: false,
  })

  const bounds = new mapboxgl.LngLatBounds()

  locations.forEach((location) => {
    // Create marker
    const element = document.createElement('div')
    element.className = 'marker'

    // Add marker
    new mapboxgl.Marker({
      element,
      anchor: 'bottom',
    })
      .setLngLat(location.coordinates)
      .addTo(map)

    // Add pop-up
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(location.coordinates)
      .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
      .addTo(map)

    // Extends map bounds to include current location
    bounds.extend(location.coordinates)
  })

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  })
}
