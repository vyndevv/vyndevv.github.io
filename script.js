document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const isCentered = (rect.top >= 100 && rect.bottom <= window.innerHeight - 100);

        if (!isCentered) {
            setTimeout(() => {
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 150);
        }
    });
});
