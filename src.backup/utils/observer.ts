/**
 * Creates a mutation observer that watches for changes in the child nodes of a given element
 * and triggers a callback function when a change occurs.
 *
 * @param contentsNode - The element to observe for changes.
 * @param callback - The function to call when a change occurs.
 * @returns A MutationObserver instance that can be used to stop observing changes.
 */
const createChildLoadObserver = (contentsNode: Element, callback: () => any): MutationObserver => {
  /**
   * `config` object for configuring a `MutationObserver` instance:
   * - `childList`: `true` to monitor changes in the child nodes of the observed element.
   * - `attributes`: `false` to ignore changes in the attributes of the observed element.
   * - `characterData`: `false` to ignore changes in the text content of the observed element.
   * - `subtree`: `false` to only monitor changes in the immediate children of the observed element, and not its descendants.
   */
  const config = {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: false,
  };

  // Create the mutation observer and set the callback function
  const mainObserver = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach(async (mutation) => {
      // Trigger the callback function when a change in child nodes is detected
      if (mutation.type === 'childList') {
        await callback();
      }
    });
  });

  // Start observing changes in the contentsNode element
  mainObserver.observe(contentsNode, config);

  // Return the MutationObserver instance so that changes can be stopped if needed
  return mainObserver;
};

export { createChildLoadObserver };
