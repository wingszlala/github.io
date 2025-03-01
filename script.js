// 导航菜单切换
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // 轮播图功能
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    // 自动切换轮播图
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // 点击指示点切换轮播图
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        });
    });
    
    // 设置自动轮播
    setInterval(nextSlide, 5000);
    
    // 滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // 滚动时显示元素动画
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    });
    
    // 处理窗口滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // 监听窗口尺寸变化，调整布局
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // 动画元素显示效果
    const animateElements = document.querySelectorAll('.advantage-item, .business-item, .showcase-item, .vr-item');
    
    // 检查元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // 添加淡入效果类
    function handleScrollAnimation() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始化动画元素样式
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 初次检查并在滚动时检查
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
});

// 设置图片加载失败时的替代方案
document.addEventListener('error', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
        e.target.style.display = 'none';
        const placeholderDiv = document.createElement('div');
        placeholderDiv.className = 'placeholder-image';
        placeholderDiv.textContent = '图片加载失败';
        e.target.parentNode.appendChild(placeholderDiv);
    }
}, true); 