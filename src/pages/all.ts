import { waitUntilNodeLoads } from '../utils/utils';

let shortsButtonRemoved = false;
let shortsMiniButtonRemoved = false;

const removeShortsButton = () => {
  if (!shortsButtonRemoved) {
    waitUntilNodeLoads('ytd-guide-entry-renderer.ytd-guide-section-renderer > a[id="endpoint"][title="Shorts"]', 50, 10).then((element) => {
      console.log(element);
      if (element) {
        shortsButtonRemoved = true;
        element?.remove();
      }
    });
  }
};

const removeMiniShortsButton = () => {
  if (!shortsMiniButtonRemoved) {
    waitUntilNodeLoads('ytd-mini-guide-entry-renderer[aria-label="Shorts"] > a[id="endpoint"][title="Shorts"]', 50, 10).then((element) => {
      console.log(element);
      if (element) {
        shortsMiniButtonRemoved = true;
        element?.remove();
      }
    });
  }
};

const removeShortsButtons = async () => {
  removeShortsButton();
  removeMiniShortsButton();

  document.querySelectorAll('yt-icon-button#guide-button > button#button').forEach((buttonElement) => {
    buttonElement.addEventListener('click', () => {
      removeShortsButton();
      removeMiniShortsButton();
    });
  });
};

export { removeShortsButtons };
