import { removeShortsButton } from './pages/all';
import { removeSectionsWithShortsOnUpdates } from './pages/generalfeed';
import { removeShortsFromSubscriptions } from './pages/subscriptions';
import { excecuteIfPageChangeTo } from './utils/utils';

const main = async (): Promise<void> => {
  removeShortsButton();
  excecuteIfPageChangeTo(async (href: string) => {
    switch (href) {
      case 'https://www.youtube.com/':
        removeSectionsWithShortsOnUpdates();
        break;
      case 'https://www.youtube.com/feed/subscriptions':
        removeShortsFromSubscriptions();
        break;
    }
  }, true);
};

window.addEventListener('load', main);
