/**
 * Sleep function that resolves after a specified number of milliseconds
 * @param ms The number of milliseconds to wait
 * @returns A promise that resolves after the specified number of milliseconds
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Waits until a node is loaded on the page and returns it
 * @param nodeSelectors The CSS selector for the node to wait for
 * @param timeout The number of milliseconds to wait before retrying
 * @param loops The number of times to retry before giving up
 * @returns A promise that resolves with the loaded element or null if not found
 */
const waitUntilNodeLoads = async (nodeSelectors: string, timeout = 100, loops = 6): Promise<Element | null> => {
  let contentsNode: Element | null = null;

  await sleep(timeout); // Wait for a specified amount of time before trying to load the node

  let i = 0;

  while (contentsNode === null && i < loops) {
    // Keep trying to find the node until it is loaded or the maximum number of loops is reached
    contentsNode = document.querySelector(nodeSelectors);
    if (contentsNode === null) {
      // If the node is not found, wait for a specified amount of time before trying again
      await sleep(timeout * i);
      i++;
    }
  }

  return contentsNode;
};

/**
 * Waits until multiple nodes are loaded on the page and returns them
 * @param nodeSelectors The CSS selector for the nodes to wait for
 * @param timeout The number of milliseconds to wait before retrying
 * @param loops The number of times to retry before giving up
 * @returns A promise that resolves with the loaded elements or an empty array if none found
 */
const waitUntilNodesLoad = async (nodeSelectors: string, timeout = 100, loops = 6): Promise<NodeListOf<Element> | []> => {
  let contentsNode: NodeListOf<Element> | [] = [];

  await sleep(timeout); // Wait for a specified amount of time before trying to load the nodes

  let i = 0;

  while (contentsNode?.length === 0 && i < loops) {
    // Keep trying to find the nodes until they are loaded or the maximum number of loops is reached
    contentsNode = document.querySelectorAll(nodeSelectors);

    if (contentsNode?.length === 0) {
      // If no nodes are found, wait for a specified amount of time before trying again
      await sleep(timeout * i++);
    }
  }

  return contentsNode;
};

/**
 * Executes a callback function when the page changes
 * @param callback The function to execute when the page changes
 * @param initialExec Whether to execute the callback function on initial load
 */
const excecuteIfPageChangeTo = async (callback: (href: string) => Promise<void>, initialExec = false) => {
  if (initialExec) {
    // If initialExec is set to true, execute the callback function immediately
    callback(document.location.href);
  }

  let oldHref = document.location.href; // Store the current page URL
  const body = document.querySelector('body') as HTMLBodyElement;
  const observer = new MutationObserver((mutations) => {
    // Create a MutationObserver that listens for changes in the body element
    mutations.forEach(async (mutation) => {
      // For each mutation, check if the URL has changed
      if (mutation.type !== 'childList' && oldHref !== document.location.href) {
        // If the URL has changed, execute the callback function and update oldHref
        console.log(document.location.href);
        await callback(document.location.href);
        oldHref = document.location.href;
      }
    });
  });

  // Start observing the body element for changes in URL
  observer.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
};

export { sleep, waitUntilNodeLoads, waitUntilNodesLoad, excecuteIfPageChangeTo };
