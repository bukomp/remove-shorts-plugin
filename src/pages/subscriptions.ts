import { createChildLoadObserver } from '../utils/observer';
import { sleep, waitUntilNodeLoads } from '../utils/utils';

const removeShorts = () => {
  const gridVideoRenderers = document.querySelectorAll('ytd-grid-video-renderer') as NodeListOf<HTMLElement>;
  console.log(gridVideoRenderers);

  gridVideoRenderers.forEach((videoRenderer: HTMLElement, i: number) => {
    const hasShortsLink = Array.from(videoRenderer.getElementsByTagName('a')).some((link) => link.href.includes('shorts'));

    if (hasShortsLink) {
      videoRenderer.remove();
    }
  });
};

const removeShortsFromSubscriptions = async (): Promise<MutationObserver | null> => {
  let contentsNode: Element | null = await waitUntilNodeLoads('ytd-section-list-renderer > #contents', 100, 10);
  removeShorts();
  if (contentsNode) {
    return createChildLoadObserver(contentsNode, removeShorts);
  } else {
    return null;
  }
};

export { removeShortsFromSubscriptions };
