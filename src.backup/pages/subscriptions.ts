import { createChildLoadObserver } from '../utils/observer';
import { sleep, waitUntilNodeLoads } from '../utils/utils';

/**
 * Removes all videos from the page that have a link to YouTube Shorts.
 */
const removeShorts = (): void => {
  // Find all video renderers on the page
  const gridVideoRenderers = document.querySelectorAll('ytd-grid-video-renderer') as NodeListOf<HTMLElement>;

  // Iterate over each video renderer
  gridVideoRenderers.forEach((videoRenderer: HTMLElement, i: number) => {
    // Check if the video renderer has a link to YouTube Shorts
    const hasShortsLink = Array.from(videoRenderer.getElementsByTagName('a')).some((link) => link.href.includes('shorts'));

    // If the video renderer has a link to YouTube Shorts, remove it from the page
    if (hasShortsLink) {
      videoRenderer.remove();
    }
  });
};

/**
 * Removes all videos from the subscriptions page that have a link to YouTube Shorts.
 * Returns a Promise that resolves to a MutationObserver that watches for new videos being added to the subscriptions page.
 * @returns {Promise<MutationObserver | null>} A Promise that resolves to a MutationObserver or null.
 */
const removeShortsFromSubscriptions = async (): Promise<MutationObserver | null> => {
  // Wait for the subscriptions page to finish loading
  let contentsNode: Element | null = await waitUntilNodeLoads('ytd-section-list-renderer > #contents', 100, 10);

  // Remove all videos with links to YouTube Shorts from the page
  removeShorts();

  // If the contents node exists, create a MutationObserver to watch for new videos being added to the page
  if (contentsNode) {
    return createChildLoadObserver(contentsNode, removeShorts);
  } else {
    // If the contents node does not exist, return null
    return null;
  }
};

export { removeShortsFromSubscriptions };
