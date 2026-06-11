document.addEventListener('DOMContentLoaded', function() {
    // ==================== DOM ELEMENTS ====================
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleBtn = document.getElementById('toggle-btn');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // ==================== SIDEBAR OVERLAY FOR MOBILE ====================
    let overlay = null;
    
    function createOverlay() {
        if (overlay) return;
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-active');
            overlay.classList.remove('active');
            // Also remove any inline styles
            if (window.innerWidth <= 768) {
                document.body.style.overflow = '';
            }
        });
    }
    
    function removeOverlay() {
        if (overlay && overlay.parentNode) {
            overlay.remove();
            overlay = null;
        }
    }
    
    // ==================== CHECK SCREEN SIZE ====================
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            // Mobile view - sidebar hidden by default
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('mobile-active');
            content.classList.remove('expanded');
            if (overlay) overlay.classList.remove('active');
            createOverlay();
        } else if (window.innerWidth <= 1024) {
            // Tablet view - collapsed by default with hover expand
            sidebar.classList.add('collapsed');
            content.classList.add('expanded');
            removeOverlay();
        } else {
            // Desktop view - collapsed to icons by default
            sidebar.classList.add('collapsed');
            content.classList.add('expanded');
            removeOverlay();
        }
    }
    
    // ==================== TOGGLE SIDEBAR COLLAPSE ====================
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (window.innerWidth > 768) {
                sidebar.classList.toggle('collapsed');
                content.classList.toggle('expanded');
            }
        });
    }
    
    // ==================== MOBILE TOGGLE BUTTON ====================
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (window.innerWidth <= 768) {
                createOverlay();
                sidebar.classList.toggle('mobile-active');
                
                if (sidebar.classList.contains('mobile-active')) {
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }
    
    // Close sidebar when clicking on a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('mobile-active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ==================== NAVIGATION HANDLER ====================
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
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== HOME BUTTON HANDLERS ====================
    const viewWorkBtn = document.querySelector('.btn.primary[href="#portfolio"]');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#portfolio');
            if (targetSection) {
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                const portfolioNavLink = document.querySelector('.nav-link[href="#portfolio"]');
                if (portfolioNavLink) portfolioNavLink.classList.add('active');
                
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    const contactMeBtn = document.querySelector('.btn.secondary[href="#contact"]');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#contact');
            if (targetSection) {
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                const contactNavLink = document.querySelector('.nav-link[href="#contact"]');
                if (contactNavLink) contactNavLink.classList.add('active');
                
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    // ==================== PORTFOLIO FILTERING ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
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
    
    // ==================== TESTIMONIAL SLIDER ====================
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialNav = document.querySelectorAll('.testimonial-nav button');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0 && testimonialNav.length > 0) {
        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            testimonialNav.forEach(btn => btn.classList.remove('active'));
            testimonials[index].classList.add('active');
            testimonialNav[index].classList.add('active');
            currentTestimonial = index;
        }
        
        testimonialNav.forEach((button, index) => {
            button.addEventListener('click', () => showTestimonial(index));
        });
        
        // Auto-rotate every 8 seconds
        setInterval(() => {
            let next = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(next);
        }, 8000);
    }
    
    // ==================== SKILL BARS ANIMATION ====================
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
    
    // ==================== CONTACT FORM - FIXED FOR LIVE SERVER ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
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
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // ✅ FIXED: Use relative path - works on both localhost and live server
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    showNotification(result.message || 'Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showNotification(result.message || 'Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                showNotification('Network error. Please try again.', 'error');
            } finally {
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
        
        const colors = {
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            error: 'linear-gradient(135deg, #f44336, #d32f2f)',
            info: 'linear-gradient(135deg, #2196F3, #1976D2)',
            warning: 'linear-gradient(135deg, #ff9800, #f57c00)'
        };
        notification.style.background = colors[type] || colors.info;
        
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
        
        const textSpan = document.createElement('span');
        textSpan.textContent = message;
        textSpan.style.flex = '1';
        notification.appendChild(textSpan);
        
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
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ==================== ADD CSS ANIMATIONS ====================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shrinkWidth {
            from { width: 100%; }
            to { width: 0%; }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        }
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
    
    // ==================== RESIZE HANDLER ====================
    window.addEventListener('resize', function() {
        checkScreenSize();
        
        // Reset mobile sidebar state on resize to desktop
        if (window.innerWidth > 768) {
            sidebar.classList.remove('mobile-active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Initialize
    checkScreenSize();
    
    // ==================== PAGE VIEW COUNTER (Optional) ====================
    async function trackPageView() {
        try {
            const currentPage = window.location.hash.replace('#', '') || 'home';
            await fetch('/api/views/' + currentPage, { method: 'POST' });
        } catch (error) {
            console.log('View tracking not available');
        }
    }
    trackPageView();
    
    // ==================== VIDEO CONTROLS ====================
    const portfolioVideos = document.querySelectorAll('.portfolio-item video');
    if (portfolioVideos.length > 0) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(e => console.log('Auto-play prevented:', e));
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });
        
        portfolioVideos.forEach(video => {
            videoObserver.observe(video);
        });
    }
});

// ==================== VIDEO TOGGLE FUNCTION (Global) ====================
function toggleVideo(portfolioItem) {
    const video = portfolioItem.querySelector('video');
    const icon = portfolioItem.querySelector('.video-control i');
    
    if (video.paused) {
        video.play();
        if (icon) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    } else {
        video.pause();
        if (icon) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }
}