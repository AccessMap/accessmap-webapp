const displayMode = () => {
  const portrait = window.matchMedia('(max-aspect-ratio: 13/9)').matches;
  return portrait ? 'portrait' : 'landscape';
};


export default displayMode;
