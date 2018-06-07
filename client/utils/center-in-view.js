import getBounds from 'utils/get-bounds';
import getVisibleMargins from 'utils/get-visible-margins';

const centerInView = (lon, lat, zoom) => {
  const bounds = getBounds(lon, lat, zoom);
  const margins = getVisibleMargins();
  const map = document.getElementsByClassName('map')[0];
  const mapWidth = map.clientWidth;
  const mapHeight = map.clientHeight;

  const boxWidth = mapWidth - (margins.left + margins.right);
  const centerX = margins.left + (boxWidth / 2);
  const dxFraction = ((mapWidth / 2) - centerX) / mapWidth;
  const lonWidth = (bounds[2] - bounds[0]);
  const dlon = lonWidth * dxFraction;

  const lon2 = lon + dlon;

  const boxHeight = mapHeight - (margins.bottom + margins.top);
  const centerY = margins.bottom + (boxHeight / 2);
  const dyFraction = ((mapHeight / 2) - centerY) / mapHeight;
  const latHeight = (bounds[3] - bounds[1]);
  const dlat = latHeight * dyFraction;

  const lat2 = lat + dlat;

  return [lon2, lat2];
};

export default centerInView;
