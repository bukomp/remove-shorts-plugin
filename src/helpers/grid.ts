export const putVideosInEvenGrid = () => {
  // Select all row elements
  const rowElements = document.querySelectorAll('ytd-rich-grid-row.style-scope.ytd-rich-grid-renderer');

  // Iterate over each row element
  rowElements.forEach((row) => {
    // Select all video elements within the current row
    const videoElements = row.querySelectorAll('ytd-rich-item-renderer.style-scope.ytd-rich-grid-row');

    // Iterate over each video element
    videoElements.forEach((video) => {
      // Insert the video element before the row element in the DOM
      row?.parentNode?.insertBefore(video, row);
    });

    // Remove the row element from the DOM
    row.remove();
  });
};
