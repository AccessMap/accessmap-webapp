// Initialize map data (center, zoom, boundaries) from tilejson
// TODO: promisify
export const initMap = callback => {
  // Retrieve map info from the expected tileJSON
  fetch("/tiles/tilejson/regions.json", {
    method: "GET"
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.status);
    })
    .then(json => {
      const bounds = json.bounds;
      callback(null, bounds);
    })
    .catch(err => callback(err));
};
