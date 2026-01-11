document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('image-carousel');
    setupCarousel('testimonials-carousel');
});

function setupCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) {
        console.warn(`Carousel with ID ${carouselId} not found.`);
        return;
    }

    // The element that contains the scrollable content
    // In this structure: carousel > overflow-hidden > flex
    // We scroll the .overflow-hidden element
    const viewport = carousel.querySelector('.overflow-hidden');
    if (!viewport) {
        console.warn(`Viewport not found for ${carouselId}`);
        return;
    }

    // Find buttons - assuming they are the button elements inside the carousel container
    const buttons = carousel.querySelectorAll('button');
    if (buttons.length < 2) {
        console.warn(`Buttons not found for ${carouselId}`);
        return;
    }
    
    // Assuming first button is Prev, second is Next
    // Check aria-label or span content if needed, but order is usually standard
    const prevBtn = buttons[0];
    const nextBtn = buttons[1];

    // Function to calculate scroll distance (width of one slide)
    const getScrollAmount = () => {
        const slide = viewport.querySelector('[role="group"]');
        return slide ? slide.offsetWidth : viewport.offsetWidth;
    };

    prevBtn.addEventListener('click', () => {
        viewport.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        viewport.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });

    // Optional: Keyboard navigation if focused
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            viewport.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            viewport.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    });
}
