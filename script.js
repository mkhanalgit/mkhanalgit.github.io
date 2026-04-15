document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link, .sub-nav-link');
    const aboutLinksList = document.querySelector('a[href="#about"] + .nav-links-list');
    const researchLinksList = document.querySelector('a[href="#research"] + .nav-links-list');

    // Make Lists Visible (since it's a single page we can just show them or manage via CSS/JS)
    if (aboutLinksList) aboutLinksList.style.display = 'block';
    if (researchLinksList) researchLinksList.style.display = 'block';

    // Intersection Observer to track scroll position
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active-nav-link');
                    // Reset styling from CSS inline if previously set by hover or otherwise
                    link.style.backgroundColor = '';
                    link.style.color = '';
                });

                // Get corresponding navigation link
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`a[href="#${targetId}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active-nav-link');
                    // Highlight logic
                    activeLink.style.backgroundColor = '#3498db';
                    activeLink.style.color = '#fff';
                    // Optional: Expand sub-menus if applicable
                    if (targetId === 'about' || targetId === 'academic-overview' || targetId === 'hobbies' || targetId === 'projects') {
                        if (aboutLinksList) aboutLinksList.style.display = 'block';
                    } else if (targetId === 'research' || targetId === 'solar-panels' || targetId === 'neutrino-analysis' || targetId === 'machine-learning') {
                        if (researchLinksList) researchLinksList.style.display = 'block';
                    }
                }
            }
        });
    }, options);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            event.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Manual slider controls
    document.querySelectorAll('[data-slider]').forEach(slider => {
        const viewport = slider.querySelector('.slider-viewport');
        const prevButton = slider.querySelector('.slider-button-prev');
        const nextButton = slider.querySelector('.slider-button-next');

        if (!viewport || !prevButton || !nextButton) {
            return;
        }

        const scrollAmount = () => Math.max(240, viewport.clientWidth * 0.82);

        prevButton.addEventListener('click', () => {
            if (viewport.scrollLeft <= 5) {
                viewport.scrollTo({ left: viewport.scrollWidth, behavior: 'smooth' });
            } else {
                viewport.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            }
        });

        nextButton.addEventListener('click', () => {
            const nearEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 5;
            if (nearEnd) {
                viewport.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                viewport.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            }
        });
    });

    // Highlight contact section near the bottom of the landing page
    const contactSection = document.querySelector('.contact-section');
    const updateContactHighlight = () => {
        if (!contactSection) return;
        const doc = document.documentElement;
        const scrolledNearBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 200;
        contactSection.classList.toggle('is-active', scrolledNearBottom);
    };

    updateContactHighlight();
    window.addEventListener('scroll', updateContactHighlight, { passive: true });
    window.addEventListener('resize', updateContactHighlight);
});
