import { removeShortsButtons } from './pages/all';
import { removeSectionsWithShortsOnUpdates } from './pages/generalfeed';
import { removeShortsFromSubscriptions } from './pages/subscriptions';
import { excecuteIfPageChangeTo } from './utils/utils';

/**
 * main function to remove shorts-related elements from YouTube page
 */
const main = async (): Promise<void> => {
  // remove buttons with "shorts" label
  removeShortsButtons();

  // execute different code blocks depending on the value of "href"
  excecuteIfPageChangeTo(async (href: string) => {
    switch (href) {
      // remove sections with "shorts" on updates page
      case 'https://www.youtube.com/':
        removeSectionsWithShortsOnUpdates();
        break;
      // remove shorts from subscriptions page
      case 'https://www.youtube.com/feed/subscriptions':
        removeShortsFromSubscriptions();
        break;
    }
  }, true);
};

// Add an event listener to the "load" event of the window object, calling the "main" function when the event is triggered
window.addEventListener('load', main);
