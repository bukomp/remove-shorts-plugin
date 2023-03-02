import { waitUntilNodeLoads, waitUntilNodesLoad } from '../utils/utils';

const removeShortsButton = async () => {
  waitUntilNodeLoads('ytd-mini-guide-entry-renderer[aria-label="Shorts"]', 100, 10).then((element) => {
    element?.remove();
  });

  waitUntilNodeLoads('a[id="endpoint"][title="Shorts"]', 100, 10).then((element) => {
    element?.remove();
  });
};

export { removeShortsButton };
