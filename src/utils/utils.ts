const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitUntilNodeLoads = async (nodeSelectors: string, timeout = 100, loops = 6): Promise<Element | null> => {
  let contentsNode: Element | null = null;

  await sleep(timeout);

  let i = 0;

  while (contentsNode === null && i < loops) {
    contentsNode = document.querySelector(nodeSelectors);
    if (contentsNode === null) {
      await sleep(timeout * i);
      i++;
    }
  }

  return contentsNode;
};

const waitUntilNodesLoad = async (nodeSelectors: string, timeout = 100, loops = 6): Promise<NodeListOf<Element> | []> => {
  let contentsNode: NodeListOf<Element> | [] = [];

  await sleep(timeout);

  let i = 0;

  while (contentsNode?.length === 0 && i < loops) {
    contentsNode = document.querySelectorAll(nodeSelectors);

    if (contentsNode?.length === 0) {
      await sleep(timeout * i++);
    }
  }

  return contentsNode;
};

const excecuteIfPageChangeTo = async (callback: (href: string) => Promise<void>, initialExec = false) => {
  if (initialExec) {
    callback(document.location.href);
  }

  let oldHref = document.location.href;
  const body = document.querySelector('body') as HTMLBodyElement;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(async (mutation) => {
      if (mutation.type !== 'childList' && oldHref !== document.location.href) {
        console.log(document.location.href);
        await callback(document.location.href);
        oldHref = document.location.href;
      }
    });
  });
  observer.observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
};

export { sleep, waitUntilNodeLoads, waitUntilNodesLoad, excecuteIfPageChangeTo };
