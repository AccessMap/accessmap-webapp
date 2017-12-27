## UI

- Should not attempt to query features if layer hasn't loaded yet - sidewalks,
  curb ramps, etc.

## Geocoding

The Mapbox forward geocoder seems to miss a lot of POIs. The Mapzen Search
geocoder performs much better with the default settings, and allows more use
in the free tier. It's also based on an open source project, so we can host
our own eventually.

Switch to the Mapzen backend (and while we're at it, abstract the component to
use any backend).

## Routing mode should be delinated as its own scene from which you escape with
## a button (native mobile app) or the 'close' or 'back' icon buttons.

## Add contributions page properly, include Microsoft as sponsor

## When a route is found, the map should zoom to show its whole extent

## Review zoom-to-route functionality (receiveRoute reducer), check math and
## consistency. We should require access to minZoom/maxZoom constants, but
## those are not stored in state

## Fix hack to MapMarker component: offset of -128 was added due to the
## map container having a 128 px padding-top, which offset all of the markers.

## Don't use 'fixed' toolbars, make map use margin not padding. The markers
## will then not overlap the toolbars.

## Consider using fitBounds props that get nulled whenever the map moves/zooms

## Add social media / contact info, make it easy to find and use

## Add Open Source / Data section so we can properly describe how to get our
## data and software - and reference OpenSidewalks

## SET_WAYPOINT should have option to set center/zoom or not

## Add back 'investigate sidewalk' popup

## Make SET_WAYPOINT (or SET_ORIGIN/DESTINATION) only set new zoom/center if
## the waypoint isn't already in the current view

## Consider jumping to new points rather than flying to - the animation can be
## interrupted by a re-render

## Make route outline thicker / perfectly outline sidewalks. Make it blue?

## Analytics simplification

- Remove frequent 'log_bounds' actions, replace with initial bounds and only
send action when window is resized (?)

- Convert 'toggle'-style actions to direct message, e.g. instead of curb ramps
toggle, explicitly state outcome: avoid-curb-ramps with payload true or false.
