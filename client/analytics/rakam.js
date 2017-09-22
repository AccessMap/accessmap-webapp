function Rakam(events) {
  if (typeof window === 'undefined') {
    return;
  }

  // TODO: improve checking - look for rakam function(s)?
  if (typeof window.rakam !== 'object') {
    throw new Error('window.rakam is not defined');
  }
  const rakam = window.rakam;

  events.forEach((event) => {
    rakam.logEvent(event.type, event);
  });
}

module.exports = { Rakam };
