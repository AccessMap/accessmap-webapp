## Geocoding

The Mapbox forward geocoder seems to miss a lot of POIs.

## UI Structure

Should implement views and/or react-router to handle different activity modes:
it's becoming hard to organize 'settings' vs 'map legend' vs 'routing'

## Color maps

The color maps based on CSS use gradients that _do not_ match the current color maps.
They show a simple linear interpolation, when they should estimate our estimated speed
function.
