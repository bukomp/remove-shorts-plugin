import { waitUntilNodeLoads } from '../utils/utils';

// variables for tracking if the Shorts buttons are removed or not
let shortsButtonRemoved = false;
let shortsMiniButtonRemoved = false;

/**
 * Remove the Shorts button from the navigation bar if it exists
 */
const removeShortsButton = (): void => {
  // only remove the button if it hasn't been removed before
  if (!shortsButtonRemoved) {
    // wait until the element is loaded with the specified selector, then remove it
    waitUntilNodeLoads('ytd-guide-entry-renderer.ytd-guide-section-renderer > a[id="endpoint"][title="Shorts"]', 50, 10).then((element) => {
      // log the element for debugging purposes
      console.log(element);
      // if the element exists, remove it and update the flag
      if (element) {
        shortsButtonRemoved = true;
        element?.remove();
      }
    });
  }
};

/**
 * Remove the mini Shorts button from the navigation bar if it exists
 */
const removeMiniShortsButton = (): void => {
  // only remove the button if it hasn't been removed before
  if (!shortsMiniButtonRemoved) {
    // wait until the element is loaded with the specified selector, then remove it
    waitUntilNodeLoads('ytd-mini-guide-entry-renderer[aria-label="Shorts"] > a[id="endpoint"][title="Shorts"]', 50, 10).then((element) => {
      // log the element for debugging purposes
      console.log(element);
      // if the element exists, remove it and update the flag
      if (element) {
        shortsMiniButtonRemoved = true;
        element?.remove();
      }
    });
  }
};

/**
 * Remove both the Shorts and mini Shorts buttons from the navigation bar, and add event listeners to handle when the guide button is clicked
 */
const removeShortsButtons = async (): Promise<void> => {
  // remove both buttons
  removeShortsButton();
  removeMiniShortsButton();

  // add event listeners to handle when the guide button is clicked
  document.querySelectorAll('yt-icon-button#guide-button > button#button').forEach((buttonElement) => {
    buttonElement.addEventListener('click', () => {
      // when the guide button is clicked, remove both buttons again
      removeShortsButton();
      removeMiniShortsButton();
    });
  });
};

export { removeShortsButtons };
