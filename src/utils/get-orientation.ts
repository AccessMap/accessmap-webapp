const getOrientation = () => {
  const portrait = window.matchMedia("(orientation: portrait)").matches;
  return portrait ? "portrait" : "landscape";
};

export default getOrientation;
