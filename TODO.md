## QOL improvements

- Enable 'strict' typing.
- Better debugging. There are many bug messages that end at dependencies that
  do not have good tracebacks. Source maps need to be improved?
- Alternatives to webpack / faster transpiling. It takes 30 seconds to build
  the website from scratch and it's held together with twine on old transforms.
  Use of newer JS features and more standardized methods (styled components e.g.)
  might eliminate the need for these hacks and enable faster transpiling and
  possibly even smaller builds.
- Hot reloading. It broke at some point, would be cool to restore it and speed
  up dev workflow.

## UI bugs

- Upgrade React component library, get a new date/time picker. Lots of warnings
  about old React method uses (componentWillUpdate, etc), potentialy
  responsible for flickering omnicard. Consider using grommet for its WCAG 2.1
  support.

## UI Improvements

- App drawer should create an overlay that, when clicked, dismisses the drawer.

## Geocoding

- The Mapbox forward geocoder seems to miss a lot of POIs. Consider self-hosting
  pelias geocoder or finding better free geocoder.
