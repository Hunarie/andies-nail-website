/**
 * Smoothly scrolls to an element and centers it in the viewport
 * @param elementId - The ID of the element to scroll to (without the # symbol)
 * @param delay - Optional delay in milliseconds before scrolling
 */
export function scrollToElementCentered(elementId: string, delay = 0): void {
  const scrollAction = () => {
    // Find the element
    const element = document.getElementById(elementId);
    
    if (!element) return;
    
    // Get viewport height
    const viewportHeight = window.innerHeight;
    
    // Calculate the position to scroll to (element top - (viewport height - element height) / 2)
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.scrollY;
    const centerPosition = elementTop - (viewportHeight - elementRect.height) / 2;
    
    // Smoothly scroll to the calculated position
    window.scrollTo({
      top: Math.max(0, centerPosition), // Make sure we don't scroll above the page
      behavior: 'smooth'
    });
  };

  if (delay > 0) {
    setTimeout(scrollAction, delay);
  } else {
    scrollAction();
  }
} 