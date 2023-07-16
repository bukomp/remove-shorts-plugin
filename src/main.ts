import './css/subscribe-button.css';
import './css/shorts-sections.css';
import { observeYtdRichGridRenderer } from './observers/feedObserver';

/**
 * main function to remove shorts-related elements from YouTube page
 */
const main = async (): Promise<void> => {
  observeYtdRichGridRenderer();
};

// Add an event listener to the "load" event of the window object, calling the "main" function when the event is triggered
window.addEventListener('load', main);
