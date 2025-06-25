document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos necesarios del DOM
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const navDotsContainer = document.getElementById('nav-dots');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Función para actualizar el estado visual de las diapositivas y la navegación
    function updateSlides() {
        // Itera sobre cada diapositiva para actualizar su estilo
        slides.forEach((slide, index) => {
            const animatedElements = slide.querySelectorAll('.fade-in-up');

            if (index === currentSlide) {
                // Diapositiva actual: visible y en posición
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0)';
                slide.style.zIndex = '10';
                // Reactiva la animación de los elementos internos
                animatedElements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Truco para forzar el reflow
                    el.style.animation = '';
                });
            } else if (index < currentSlide) {
                // Diapositivas anteriores: movidas a la izquierda
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(-100%)';
                slide.style.zIndex = '0';
            } else {
                // Diapositivas siguientes: movidas a la derecha
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(100%)';
                slide.style.zIndex = '0';
            }
        });

        // Actualiza el estado de los botones de navegación
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;

        // Actualiza el punto de navegación activo
        const dots = navDotsContainer.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('bg-blue-400');
                dot.classList.remove('bg-gray-600');
            } else {
                dot.classList.add('bg-gray-600');
                dot.classList.remove('bg-blue-400');
            }
        });
    }

    // Genera los puntos de navegación dinámicamente
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('nav-dot', 'w-3', 'h-3', 'rounded-full');
        dot.dataset.slide = i;
        navDotsContainer.appendChild(dot);
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlides();
        });
    }

    // Event listener para el botón "siguiente"
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    });

    // Event listener para el botón "anterior"
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    });

    // Event listener para la navegación con teclas de flecha
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    });

    // Inicializa la presentación en la primera diapositiva
    updateSlides();
});