// Tab functionality
function openTab(event, tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to the clicked button
    event.currentTarget.classList.add('active');
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (those starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        }

        lastScroll = currentScroll;
    });

    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            // Add mobile menu functionality if needed
        }
    };

    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();

    // Add search functionality for publications table
    const addTableSearch = () => {
        const publicationsSection = document.getElementById('publications');
        if (publicationsSection) {
            const searchContainer = document.createElement('div');
            searchContainer.style.marginBottom = '20px';
            searchContainer.innerHTML = `
                <input type="text" id="publicationSearch" placeholder="Search publications..." 
                       style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 5px; font-size: 1rem;">
            `;
            
            const tabsElement = document.querySelector('.tabs');
            tabsElement.parentNode.insertBefore(searchContainer, tabsElement);

            const searchInput = document.getElementById('publicationSearch');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const tables = document.querySelectorAll('.publications-table tbody tr');
                
                tables.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        }
    };

    addTableSearch();

    // Add copy to clipboard for email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the default action happen, but also show a tooltip
            const email = this.textContent;
            console.log('Email:', email);
        });
    });

    // Add print button functionality
    const addPrintButton = () => {
        const heroSection = document.querySelector('.hero');
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<span class="material-icons">print</span> Print Profile';
        printBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2e8b57;
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 50px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(46, 139, 87, 0.4);
            z-index: 999;
            transition: all 0.3s ease;
        `;
        
        printBtn.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 6px 20px rgba(46, 139, 87, 0.6)';
        });
        
        printBtn.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(46, 139, 87, 0.4)';
        });
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printBtn);
    };

    addPrintButton();

    // Add back to top button
    const addBackToTopButton = () => {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<span class="material-icons">arrow_upward</span>';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: #3cb371;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: 0 4px 15px rgba(60, 179, 113, 0.4);
            z-index: 999;
            transition: all 0.3s ease;
        `;
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        backToTopBtn.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(backToTopBtn);
    };

    addBackToTopButton();

    // Add table row highlighting
    const tables = document.querySelectorAll('.publications-table tbody tr');
    tables.forEach(row => {
        row.addEventListener('click', function() {
            // Remove highlight from all rows
            tables.forEach(r => r.style.backgroundColor = '');
            // Highlight clicked row
            this.style.backgroundColor = '#e8f5e9';
        });
    });

    // Add animation to profile cards
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add tooltip for abbreviations
    const addTooltips = () => {
        const abbreviations = {
            'BS': 'Bachelor of Science',
            'MS': 'Master of Science',
            'PhD': 'Doctor of Philosophy',
            'IF': 'Impact Factor',
            'HEC': 'Higher Education Commission',
            'QAU': 'Quaid-i-Azam University'
        };

        // You can add tooltip functionality here if needed
    };

    addTooltips();

    console.log('Dr. Khalid Saleem\'s webpage loaded successfully!');
});

// Table collapse/expand functionality
function toggleTableRows(tableId) {
    const table = document.getElementById(tableId);
    const button = event.currentTarget;
    const icon = button.querySelector('.material-icons');
    const btnText = button.querySelector('.btn-text');
    const rows = table.querySelectorAll('.table-row');
    
    const isExpanded = button.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse - show only first 5
        rows.forEach((row, index) => {
            if (index >= 5) {
                row.classList.remove('visible');
            }
        });
        button.classList.remove('expanded');
        btnText.textContent = 'Show All Publications';
        icon.textContent = 'expand_more';
    } else {
        // Expand - show all
        rows.forEach(row => {
            row.classList.add('visible');
        });
        button.classList.add('expanded');
        btnText.textContent = 'Show Less';
        icon.textContent = 'expand_less';
    }
}

// Export function for external use
window.openTab = openTab;
window.toggleTableRows = toggleTableRows;
