/* ==================== АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ ==================== */
/**
 * Анимация плавного появления секций при скролле
 */
const initSectionAnimations = () => {
    // Настройки анимации
    const ANIMATION_OFFSET = 20; // Смещение элемента перед появлением
    const ANIMATION_DURATION = '0.5s'; // Длительность анимации
  
    // Создаем наблюдатель за пересечением элементов
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });
  
    // Применяем анимацию ко всем секциям
    document.querySelectorAll('.section').forEach(el => {
      el.style.opacity = 0;
      el.style.transform = `translateY(${ANIMATION_OFFSET}px)`;
      el.style.transition = `all ${ANIMATION_DURATION} ease-out`;
      observer.observe(el);
    });
  };
  
  /* ==================== АККОРДЕОН ==================== */
  /**
   * Обработка открытия/закрытия аккордеонов
   */
  const initAccordions = () => {
    document.querySelectorAll('.accordion').forEach(btn => {
      btn.addEventListener('click', function() {
        // Переключаем состояние аккордеона
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        
        // Анимируем открытие/закрытие
        panel.style.display = panel.style.display === 'block' 
          ? 'none' 
          : 'block';
      });
    });
  };
  
  /* ==================== КАРУСЕЛЬ ==================== */
  /**
   * Класс для управления каруселью изображений
   */
  class Carousel {
    constructor(container) {
      // Элементы карусели
      this.container = container;
      this.track = container.querySelector('.carousel-track');
      this.items = Array.from(container.querySelectorAll('.carousel-item'));
      this.arrows = {
        prev: container.querySelector('.prev'),
        next: container.querySelector('.next')
      };
      this.pagination = container.querySelector('.carousel-pagination');
      this.currentIndex = 0;
      
      // Инициализация
      this.init();
    }
  
    /**
     * Основная инициализация карусели
     */
    init() {
      this.createPagination();
      this.setupEventListeners();
      this.update();
    }
  
    /**
     * Создает точки пагинации
     */
    createPagination() {
      this.items.forEach((_, index) => {
        const bullet = document.createElement('button');
        bullet.classList.add('carousel-bullet');
        bullet.addEventListener('click', () => this.goTo(index));
        this.pagination.appendChild(bullet);
      });
    }
  
    /**
     * Настраивает обработчики событий
     */
    setupEventListeners() {
      this.arrows.prev.addEventListener('click', () => this.prev());
      this.arrows.next.addEventListener('click', () => this.next());
    }
  
    /**
     * Обновляет состояние карусели
     */
    update() {
      // Перемещаем трек
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      
      // Обновляем активную точку пагинации
      this.pagination.querySelectorAll('.carousel-bullet').forEach((bullet, index) => {
        bullet.classList.toggle('active', index === this.currentIndex);
      });
    }
  
    /**
     * Переход к предыдущему слайду
     */
    prev() {
      this.currentIndex = this.currentIndex === 0 
        ? this.items.length - 1 
        : this.currentIndex - 1;
      this.update();
    }
  
    /**
     * Переход к следующему слайду
     */
    next() {
      this.currentIndex = this.currentIndex === this.items.length - 1 
        ? 0 
        : this.currentIndex + 1;
      this.update();
    }
  
    /**
     * Переход к конкретному слайду
     * @param {number} index - Индекс целевого слайда
     */
    goTo(index) {
      if (index >= 0 && index < this.items.length) {
        this.currentIndex = index;
        this.update();
      }
    }
  }
  
  /* ==================== ИНИЦИАЛИЗАЦИЯ ВСЕХ КОМПОНЕНТОВ ==================== */
  document.addEventListener('DOMContentLoaded', () => {
    // Запускаем анимации секций
    initSectionAnimations();
    
    // Инициализируем аккордеоны
    initAccordions();
    
    // Создаем карусели
    document.querySelectorAll('.tilda-carousel').forEach(container => {
      new Carousel(container);
    });
  });

  // Активировать после загрузки
window.addEventListener('load', () => {
    document.querySelector('.tilda-carousel').classList.add('visible');
});
  
  /* ==================== ДОП УЛУЧШЕНИЯ(Позже) ==================== */
  // Для улучшения производительности можно добавить:
  // - Троттлинг обработчиков событий
  // - Ленивую загрузку изображений
  // - Оптимизацию ресайза
  // - Prefetch для следующих слайдов карусели
