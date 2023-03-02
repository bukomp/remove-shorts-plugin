const createChildLoadObserver = (contentsNode: Element, callback: () => any): MutationObserver => {
  const config = {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: false,
  };
  const mainObserver = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach(async (mutation) => {
      if (mutation.type === 'childList') {
        await callback();
      }
    });
  });

  mainObserver.observe(contentsNode, config);

  return mainObserver;
};

export { createChildLoadObserver };
