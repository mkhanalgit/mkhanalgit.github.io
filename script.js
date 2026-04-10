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
});
