import Ember from 'ember';

var toggleHoverClass = function(canTrulyHover) {
  $('html').toggleClass('hover', canTrulyHover);
};

export function initialize(/* application */) {
  let canTrulyHover;
  
  if (!window.matchMedia) {
    // Opera Mini, IE<=9, Android<=2.3, ancient, or obscure; per http://caniuse.com/#feat=matchmedia

    // Opera Mini, Android, and IE Mobile don't support true hovering, so they're what we'll check for.
    // Other browsers are either:
    // (a) obscure
    // (b) touch-based but old enough not to attempt to emulate hovering
    // (c) old desktop browsers that do support true hovering

    // Explanation of this UA regex:
    // IE Mobile <9 seems to always have "Windows CE", "Windows Phone", or "IEMobile" in its UA string.
    // IE Mobile 9 in desktop view doesn't include "IEMobile" or "Windows Phone" in the UA string,
    // but it instead includes "XBLWP7" and/or "ZuneWP7".
    canTrulyHover = !/Opera Mini|Android|IEMobile|Windows (Phone|CE)|(XBL|Zune)WP7/.test(navigator.userAgent);

    // Since there won't be any event handlers to fire our events, do the one-and-only firing of it here and now.
    toggleHoverClass(canTrulyHover);
    return;
  }

  // CSSWG Media Queries Level 4 draft
  // http://drafts.csswg.org/mediaqueries/#hover
  const HOVER_NONE = '(hover: none),(-moz-hover: none),(-ms-hover: none),(-webkit-hover: none)';
  const HOVER_ON_DEMAND = '(hover: on-demand),(-moz-hover: on-demand),(-ms-hover: on-demand),(-webkit-hover: on-demand)';
  const HOVER_HOVER = '(hover: hover),(-moz-hover: hover),(-ms-hover: hover),(-webkit-hover: hover)';
  if (window.matchMedia(`${HOVER_NONE},${HOVER_ON_DEMAND},${HOVER_HOVER}`).matches) {
    // Browser understands the `hover` media feature
    const hoverCallback = function (mql) {
      const doesMatch = mql.matches;
      if (doesMatch !== canTrulyHover) {
        toggleHoverClass(doesMatch);
      }
    };
    const atHoverQuery = window.matchMedia(HOVER_HOVER);
    atHoverQuery.addListener(hoverCallback);
    hoverCallback(atHoverQuery);
    return;
  }

  // Check for touch support instead.
  // Touch generally implies that hovering is merely emulated,
  // which doesn't count as true hovering support for our purposes
  // due to the quirkiness of the emulation (e.g. :hover being sticky).

  // W3C Pointer Events PR, 16 December 2014
  // http://www.w3.org/TR/2014/PR-pointerevents-20141216/
  // Prefixed in IE10, per http://caniuse.com/#feat=pointer
  if (window.PointerEvent || window.MSPointerEvent) {
    // Browser supports Pointer Events

    // Browser supports touch if it has touch points
    /* jshint -W018 */
    canTrulyHover = !((window.navigator.maxTouchPoints || window.navigator.msMaxTouchPoints) > 0);
    /* jshint +W018 */
    toggleHoverClass(canTrulyHover);
    return;
  }

  // Mozilla's -moz-touch-enabled
  // https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries#-moz-touch-enabled
  const touchEnabledQuery = window.matchMedia('(touch-enabled),(-moz-touch-enabled),(-ms-touch-enabled),(-webkit-touch-enabled)');
  if (touchEnabledQuery.matches) {
    toggleHoverClass(false);
    return;
  }

  // W3C Touch Events REC, 10 October 2013
  // http://www.w3.org/TR/2013/REC-touch-events-20131010/
  if ('ontouchstart' in window) {
    toggleHoverClass(false);
    return;
  }

  // UA's pointer is non-touch and thus likely either supports true hovering or at least does not try to emulate it.
  toggleHoverClass(true);
}

export default {
  name: 'mq4-hover-shim',
  initialize
};
