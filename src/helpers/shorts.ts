import { putVideosInEvenGrid } from './grid';

export const removeShorts = () => {
  // Selects all YouTube video items from the page.
  const elements = document.querySelectorAll('ytd-rich-item-renderer');

  // Loops through each video item.
  elements.forEach((element) => {
    // Looks for a span element with id 'text', classes 'style-scope' and 'ytd-thumbnail-overlay-time-status-renderer'
    // and 'aria-label' set as 'Shorts' within the current video item. This element is specific to 'Shorts' videos.
    const spanElement = element.querySelector('span#text.style-scope.ytd-thumbnail-overlay-time-status-renderer[aria-label="Shorts"]');

    // If such an element exists and its text content equals 'SHORTS', the video item is a 'Shorts' video.
    // If so, the video item is removed from the page.
    if (spanElement && spanElement?.textContent?.trim() === 'SHORTS') {
      element.remove();
    }
  });

  // After all 'Shorts' videos have been removed, remaining videos are rearranged in an even grid on the page.
  putVideosInEvenGrid();
};
