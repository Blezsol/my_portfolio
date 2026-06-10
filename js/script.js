document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleBtn = document.getElementById('toggle-btn');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Check screen width and set initial state
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            // Mobile view - sidebar hidden by default
            sidebar.classList.remove('collapsed');
            content.classList.remove('expanded');
        } else {
            // Desktop view - sidebar collapsed to icons by default
            sidebar.classList.add('collapsed');
            content.classList.add('expanded');
        }
    }
    
    // Run on page load
    checkScreenSize();
    
    // Toggle sidebar collapse/expand
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            content.classList.toggle('expanded');
        });
    }
    
    // Mobile toggle button
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-active');
        });
    }
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active navigation link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all sections and show the target one
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
                
                // Close sidebar on mobile after clicking a link
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-active');
                }
                
                // Scroll to the top of the section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== FIX: MAKE "VIEW MY WORK" BUTTON WORK ====================
    const viewWorkBtn = document.querySelector('.btn.primary[href="#portfolio"]');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#portfolio');
            if (targetSection) {
                // Update active navigation link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                const portfolioNavLink = document.querySelector('.nav-link[href="#portfolio"]');
                if (portfolioNavLink) portfolioNavLink.classList.add('active');
                
                // Hide all sections and show portfolio
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
                
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-active');
                }
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    // ==================== FIX: MAKE "CONTACT ME" BUTTON WORK ====================
    const contactMeBtn = document.querySelector('.btn.secondary[href="#contact"]');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#contact');
            if (targetSection) {
                // Update active navigation link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                const contactNavLink = document.querySelector('.nav-link[href="#contact"]');
                if (contactNavLink) contactNavLink.classList.add('active');
                
                // Hide all sections and show contact
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
                
                // Close sidebar on mobile
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-active');
                }
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    // ==================== ALSO HANDLE BUTTONS INSIDE HOME CONTENT ====================
    // For any buttons that might be dynamically added or have different selectors
    const homeActionButtons = document.querySelectorAll('.action-buttons .btn');
    homeActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && (href === '#portfolio' || href === '#contact')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    // Update active navigation link
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    const targetNavLink = document.querySelector(`.nav-link[href="${href}"]`);
                    if (targetNavLink) targetNavLink.classList.add('active');
                    
                    // Hide all sections and show target
                    sections.forEach(section => section.classList.remove('active'));
                    targetSection.classList.add('active');
                    
                    // Close sidebar on mobile
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('mobile-active');
                    }
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items with animation
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialNav = document.querySelectorAll('.testimonial-nav button');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0 && testimonialNav.length > 0) {
        testimonialNav.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                currentTestimonial = index;
                
                // Update active testimonial with fade effect
                testimonials.forEach(testimonial => {
                    testimonial.classList.remove('active');
                    testimonial.style.opacity = '0';
                });
                testimonials[index].classList.add('active');
                setTimeout(() => {
                    testimonials[index].style.opacity = '1';
                }, 50);
                
                // Update active nav button
                testimonialNav.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Auto-rotate testimonials every 8 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonialNav[currentTestimonial].click();
        }, 8000);
    }
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            bar.style.width = '0';
            observer.observe(bar);
        });
    }
    
    // ==================== CONTACT FORM HANDLER WITH BACKEND ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send to backend
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    // Success
                    showNotification(result.message, 'success');
                    contactForm.reset();
                    
                    // Optional: Send to Google Sheets or email backup
                    console.log('Message sent successfully!');
                } else {
                    // Error from server
                    showNotification(result.message || 'Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                showNotification('Network error. Please make sure the server is running at localhost:5000', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            min-width: 280px;
            max-width: 350px;
            backdrop-filter: blur(10px);
        `;
        
        // Set colors based on type
        const colors = {
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            error: 'linear-gradient(135deg, #f44336, #d32f2f)',
            info: 'linear-gradient(135deg, #2196F3, #1976D2)',
            warning: 'linear-gradient(135deg, #ff9800, #f57c00)'
        };
        notification.style.background = colors[type] || colors.info;
        
        // Add icon
        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        const icon = document.createElement('i');
        icon.className = `fas ${iconMap[type] || iconMap.info}`;
        icon.style.fontSize = '20px';
        notification.appendChild(icon);
        
        // Add message
        const textSpan = document.createElement('span');
        textSpan.textContent = message;
        textSpan.style.flex = '1';
        notification.appendChild(textSpan);
        
        // Add progress bar
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: rgba(255,255,255,0.5);
            width: 100%;
            animation: shrinkWidth 5s linear forwards;
            border-radius: 0 0 8px 8px;
        `;
        notification.appendChild(progressBar);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s;
        `;
        closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255,255,255,0.2)';
        closeBtn.onmouseleave = () => closeBtn.style.background = 'none';
        closeBtn.onclick = () => notification.remove();
        notification.appendChild(closeBtn);
        
        // Add to body
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes shrinkWidth {
            from {
                width: 100%;
            }
            to {
                width: 0%;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        }
        
        /* Responsive notifications */
        @media (max-width: 768px) {
            .notification {
                top: 10px;
                right: 10px;
                left: 10px;
                min-width: auto;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Update on window resize
    window.addEventListener('resize', checkScreenSize);
    
    // ==================== PAGE VIEW COUNTER ====================
    async function trackPageView() {
        try {
            const currentPage = window.location.hash.replace('#', '') || 'home';
            await fetch('http://localhost:5000/api/views/' + currentPage, {
                method: 'POST'
            });
        } catch (error) {
            console.log('View tracking not available');
        }
    }
    trackPageView();
    
    // ==================== LOAD PORTFOLIO PROJECTS FROM BACKEND ====================
    async function loadPortfolioProjects() {
        try {
            const response = await fetch('http://localhost:5000/api/projects');
            const result = await response.json();
            
            if (result.success && result.data.length > 0) {
                const portfolioGrid = document.querySelector('.portfolio-grid');
                if (portfolioGrid) {
                    // Clear existing projects but keep the structure
                    const existingItems = portfolioGrid.querySelectorAll('.portfolio-item');
                    if (existingItems.length > 0 && result.data.length > 0) {
                        // Optionally replace with dynamic content
                        console.log('Projects loaded:', result.data.length);
                    }
                }
            }
        } catch (error) {
            console.log('Portfolio loading not available - using static content');
        }
    }
    loadPortfolioProjects();
});

// ==================== VIDEO CONTROLS ====================
function toggleVideo(portfolioItem) {
    const video = portfolioItem.querySelector('video');
    const icon = portfolioItem.querySelector('.video-control i');
    
    if (video.paused) {
        video.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        video.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Auto-play videos when they come into view
const portfolioVideos = document.querySelectorAll('.portfolio-item video');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.5 });

// Initialize video observer
if (portfolioVideos.length > 0) {
    portfolioVideos.forEach(video => {
        videoObserver.observe(video);
    });
}

// ==================== ADD SCROLL PROGRESS BAR ====================
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scrollProgressBar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #4CAF50, #2196F3);
            width: 0%;
            z-index: 10001;
            transition: width 0.1s;
        `;
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrolled + '%';
});