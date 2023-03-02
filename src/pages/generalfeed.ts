import { createChildLoadObserver } from '../utils/observer';
import { waitUntilNodeLoads, waitUntilNodesLoad } from '../utils/utils';

const removeShortsSections = async (): Promise<void> => {
  const richSections = await waitUntilNodesLoad('ytd-rich-section-renderer > #content');
  richSections.forEach((richSection: Element) => {
    const children = richSection.querySelectorAll('*');

    children.forEach((child: Element) => {
      if ((child as HTMLElement).innerText === 'Shorts') {
        richSection.remove();
      }
    });
  });
};

const removeSectionsWithShortsOnUpdates = async (): Promise<MutationObserver | null> => {
  removeShortsSections();

  let contentsNode: Element | null = await waitUntilNodeLoads('#contents.ytd-rich-grid-renderer');

  if (contentsNode) {
    return createChildLoadObserver(contentsNode, removeShortsSections);
  } else {
    return null;
  }
};

export { removeSectionsWithShortsOnUpdates };
