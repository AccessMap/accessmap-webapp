# Accessibility Audit

We want AccessMap to be an accessible web site for screen readers and tab navigation.
At the moment, we are limited by the component toolkit we've adopted, `react-md`, which
has decent aria-label/accessibility support, but still has significant holes.

The most popular issue on GitHub for the `react-md` repository indicates that it may
no longer be under particularly active development, so we should consider using a
different toolkit and/or rolling our own. Wrapping web components could be a nice way
forward.

## Known issues

### `role="radio"` combined with `aria-pressed` for radio control groups

The profile selection tabs are modeled as a radio control group, and each selection
has `role="radio"`. Because `react-md` represents the icons for radio buttons using
their internal `AccessibleFakeInkedButton` component, they come with an inappropriate
`aria` attribute: `aria-pressed`.

Proposed solution: write our own control group widget and/or switch to a new
component kit.

### Slider thumbs have no labels, are announced as "button" on screen readers

There is no way to add a label to slider thumbs due to how they are implemented in
`react-md`. As they have `role="button"`, they get announced as "button", which is
useless for someone using a screen reader.

### Keyboard navigation of profiles is awkward, lacks feedback, doesn't meet ARIA

Tab navigation should highlight the profiles group and moving left/right with the
keyboard should change profiles, same as a radio button group. It doesn't. Instead, it
shows no feedback whatsoever, and the user is expected to hit 'space' to select a
profile. This is part of `react-md`'s core behavior.

Proposed solution: write our own control group and/or switch to a new component kit.
