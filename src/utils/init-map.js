// Initialize map data (center, zoom, boundaries) from tilejson
// TODO: promisify
export const initMap = callback => {
  // Retrieve map info from the expected tileJSON
  fetch("/tiles/tilejson/accessmap.json", {
    method: "GET"
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.status);
    })
    .then(json => {
      const bounds = json.bounds;
      const center = json.center;
      callback(null, bounds, center);
    })
    .catch(err => callback(err));
};
