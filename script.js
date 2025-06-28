// Custom JavaScript for Mona Beauty Salon

// Smooth scrolling for navbar links
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });

    // Observe video items
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        observer.observe(item);
    });

    // WhatsApp booking form
    const bookingForm = document.getElementById('bookingForm');
    const bookingBtn = bookingForm.querySelector('button[type="submit"]');
    
    // Function to check if all booking form fields are filled
    function checkBookingFormValidity() {
        const customerName = document.getElementById('customerName').value.trim();
        const occasion = document.getElementById('occasion').value;
        const branch = document.getElementById('branch').value;
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        
        const isValid = customerName && occasion && branch && phoneNumber;
        bookingBtn.disabled = !isValid;
        
        if (isValid) {
            bookingBtn.classList.remove('btn-secondary');
            bookingBtn.classList.add('btn-primary');
        } else {
            bookingBtn.classList.remove('btn-primary');
            bookingBtn.classList.add('btn-secondary');
        }
    }
    
    // Initial state - disable button
    bookingBtn.disabled = true;
    bookingBtn.classList.remove('btn-primary');
    bookingBtn.classList.add('btn-secondary');
    
    // Add event listeners to all booking form inputs
    ['customerName', 'occasion', 'branch', 'phoneNumber'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', checkBookingFormValidity);
            element.addEventListener('change', checkBookingFormValidity);
        }
    });
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const customerName = document.getElementById('customerName').value.trim();
        const occasion = document.getElementById('occasion').value;
        const branch = document.getElementById('branch').value;
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        
        // Validate form
        if (!customerName || !occasion || !branch || !phoneNumber) {
            showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        // Validate phone number (basic validation)
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phoneNumber)) {
            showAlert('يرجى إدخال رقم هاتف صحيح', 'error');
            return;
        }

        // Create WhatsApp message
        const message = `
مرحباً، أريد حجز موعد في مونا بيوتي صالون

الاسم: ${customerName}
المناسبة: ${occasion}
الفرع: ${branch}
رقم الهاتف: ${phoneNumber}

شكراً لكم
        `.trim();

        // WhatsApp phone number
        const whatsappNumber = '+201272828240';
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Show success message
        showAlert('تم إرسال طلب الحجز بنجاح! سيتم التواصل معك قريباً', 'success');
        
        // Reset form and disable button again
        bookingForm.reset();
        checkBookingFormValidity();
    });

    // Products order form
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        const orderBtn = orderForm.querySelector('button[type="submit"]');
        
        // Function to check if all order form fields are filled
        function checkOrderFormValidity() {
            const customerName = document.getElementById('customerNameProducts').value.trim();
            const customerAddress = document.getElementById('customerAddress').value.trim();
            const phoneNumber = document.getElementById('phoneNumberProducts').value.trim();
            
            const isValid = customerName && customerAddress && phoneNumber;
            orderBtn.disabled = !isValid;
            
            if (isValid) {
                orderBtn.classList.remove('btn-secondary');
                orderBtn.classList.add('btn-primary');
            } else {
                orderBtn.classList.remove('btn-primary');
                orderBtn.classList.add('btn-secondary');
            }
        }
        
        // Initial state - disable button
        orderBtn.disabled = true;
        orderBtn.classList.remove('btn-primary');
        orderBtn.classList.add('btn-secondary');
        
        // Add event listeners to all order form inputs
        ['customerNameProducts', 'customerAddress', 'phoneNumberProducts'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', checkOrderFormValidity);
                element.addEventListener('change', checkOrderFormValidity);
            }
        });
        
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const customerName = document.getElementById('customerNameProducts').value.trim();
            const customerAddress = document.getElementById('customerAddress').value.trim();
            const phoneNumber = document.getElementById('phoneNumberProducts').value.trim();
            
            // Validate form
            if (!customerName || !customerAddress || !phoneNumber) {
                showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            // Validate phone number (basic validation)
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(phoneNumber)) {
                showAlert('يرجى إدخال رقم هاتف صحيح', 'error');
                return;
            }

            // Create WhatsApp message
            const message = `
مرحباً، أريد طلب منتجات من مونا بيوتي صالون

الاسم: ${customerName}
العنوان: ${customerAddress}
رقم الهاتف: ${phoneNumber}

شكراً لكم
            `.trim();

            // WhatsApp phone number
            const whatsappNumber = '+201272828240';
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Show success message
            showAlert('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً', 'success');
            
            // Reset form and disable button again
            orderForm.reset();
            checkOrderFormValidity();
        });
    }

    // Gallery lightbox effect
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    // Video controls enhancement
    const videos = document.querySelectorAll('.video-item video');
    videos.forEach(video => {
        // Add loading animation
        video.addEventListener('loadstart', function() {
            this.parentElement.classList.add('loading');
        });
        
        // Remove loading when ready
        video.addEventListener('canplaythrough', function() {
            this.parentElement.classList.remove('loading');
        });
    });
});

// Alert function
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Lightbox function for gallery
function openLightbox(imageSrc, imageAlt) {
    // Create lightbox modal
    const lightboxModal = document.createElement('div');
    lightboxModal.className = 'modal fade';
    lightboxModal.id = 'lightboxModal';
    lightboxModal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content bg-transparent border-0">
                <div class="modal-body p-0 text-center">
                    <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" style="z-index: 1050;"></button>
                    <img src="${imageSrc}" alt="${imageAlt}" class="img-fluid rounded">
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightboxModal);
    
    // Show modal
    const modal = new bootstrap.Modal(lightboxModal);
    modal.show();
    
    // Remove modal from DOM when hidden
    lightboxModal.addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phoneNumber');
    const phoneInputProducts = document.getElementById('phoneNumberProducts');
    
    function formatPhoneNumber(input) {
        if (!input) return;
        
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Add Egypt country code if not present
            if (value.length > 0 && !value.startsWith('20')) {
                if (value.startsWith('0')) {
                    value = '20' + value.substring(1);
                } else if (value.startsWith('1')) {
                    value = '20' + value;
                }
            }
            
            // Format the number
            if (value.length >= 3) {
                if (value.startsWith('20')) {
                    const formatted = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
                    e.target.value = formatted;
                }
            }
        });
    }
    
    formatPhoneNumber(phoneInput);
    formatPhoneNumber(phoneInputProducts);
});

// Add loading class to elements for animation
window.addEventListener('load', function() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .gallery-item, .video-item');
    elementsToAnimate.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loading');
        }, index * 100);
    });
});

// Navbar active link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}); 