import { putVideosInEvenGrid } from '../helpers/grid';
import { removeShorts } from '../helpers/shorts';

// Define the function that starts observing the ytd-rich-grid-renderer element
export const observeYtdRichGridRenderer = () => {
  // Get the ytd-rich-grid-renderer element
  const element = document.querySelector('ytd-page-manager');

  // If the element doesn't exist, stop here
  if (!element) {
    console.log('ytd-page-manager element not found');
    return;
  }

  // Create a new MutationObserver
  const observer = new MutationObserver(() => {
    // Call the function to remove ytd-rich-item-renderer elements when the DOM changes
    removeShorts();
  });

  // Start observing the element for changes in its children
  observer.observe(element, { childList: true, subtree: true });
};
