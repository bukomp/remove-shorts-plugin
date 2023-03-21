import { createChildLoadObserver } from '../utils/observer';
import { waitUntilNodeLoads, waitUntilNodesLoad } from '../utils/utils';

/**
 * Removes all rich sections containing the 'Shorts' text from the DOM.
 * Uses waitUntilNodesLoad() to wait for the nodes to load and remove() to remove the node.
 */
const removeShortsSections = async (): Promise<void> => {
  // Wait for all the rich section nodes to load
  const richSections = await waitUntilNodesLoad('ytd-rich-section-renderer > #content');

  // Loop through all the rich section nodes
  richSections.forEach((richSection: Element) => {
    // Get all the child nodes of the current rich section node
    const children = richSection.querySelectorAll('*');

    // Loop through all the child nodes
    children.forEach((child: Element) => {
      // If the child node contains the text 'Shorts', remove the entire rich section node
      if ((child as HTMLElement).innerText === 'Shorts') {
        richSection.remove();
      }
    });
  });
};

/**
 * Removes all rich sections containing the 'Shorts' text from the updates section of the DOM.
 * Uses waitUntilNodeLoads() to wait for the node to load and createChildLoadObserver() to monitor for new content and remove Shorts sections from that content.
 * @returns Promise that resolves with a MutationObserver object, or null if the contents node is not found.
 */
const removeSectionsWithShortsOnUpdates = async (): Promise<MutationObserver | null> => {
  // Remove Shorts sections from the DOM
  removeShortsSections();

  // Wait for the contents node to load
  let contentsNode: Element | null = await waitUntilNodeLoads('#contents.ytd-rich-grid-renderer');

  if (contentsNode) {
    // If the contents node is found, create a MutationObserver to monitor for new content
    // and remove Shorts sections from that content as well.
    return createChildLoadObserver(contentsNode, removeShortsSections);
  } else {
    // If the contents node is not found, return null.
    return null;
  }
};

export { removeSectionsWithShortsOnUpdates };
