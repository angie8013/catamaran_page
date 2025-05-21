document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mainNav = document.querySelector(".main-nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Sticky Header
  const header = document.querySelector(".header")

  function stickyHeader() {
    if (window.scrollY > 50) {
      header.classList.add("sticky")
    } else {
      header.classList.remove("sticky")
    }
  }

  window.addEventListener("scroll", stickyHeader)

  // Hero Slider Controls
  const slider = document.querySelector(".hero-slider")
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")    

  let currentSlide = 0

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    showSlide(currentSlide)
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextSlide)
    prevBtn.addEventListener("click", prevSlide)

    let slideInterval = setInterval(nextSlide, 5000)

    const sliderElement = document.querySelector(".slider")

    if (sliderElement) {
      sliderElement.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
      })

      sliderElement.addEventListener("mouseleave", () => {
        slideInterval = setInterval(nextSlide, 5000)
      })
    }

    showSlide(currentSlide)
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - header.offsetHeight,
          behavior: "smooth",
        })
      }
    })
  })

  // Language Selector
  const langOptions = document.querySelectorAll(".lang-option")

  if (langOptions.length > 0) {
    langOptions.forEach((option) => {
      option.addEventListener("click", function (e) {
        e.preventDefault()

        const langCode = this.getAttribute("data-lang")
        const langText = this.querySelector("span").textContent

        const currentLang = document.querySelector(".current-lang span")
        if (currentLang) {
          currentLang.textContent = langText
        }

        langOptions.forEach((opt) => opt.classList.remove("active"))
        this.classList.add("active")

        console.log(`Language changed to: ${langCode}`)
      })
    })
  }

  // Boat Image Slider
  const boatSliders = document.querySelectorAll(".boat-slider")

  if (boatSliders.length > 0) {
    boatSliders.forEach((slider) => {
      const slides = slider.querySelectorAll(".boat-slide")
      const prevBtn = slider.querySelector(".boat-prev-btn")
      const nextBtn = slider.querySelector(".boat-next-btn")
      const dots = slider.querySelectorAll(".boat-dot")
      let currentIndex = 0

      function showSlide(index) {
        slides.forEach((slide) => slide.classList.remove("active"))
        dots.forEach((dot) => dot.classList.remove("active"))
        slides[index].classList.add("active")
        dots[index].classList.add("active")
        currentIndex = index
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          let newIndex = currentIndex - 1
          if (newIndex < 0) newIndex = slides.length - 1
          showSlide(newIndex)
        })
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          let newIndex = currentIndex + 1
          if (newIndex >= slides.length) newIndex = 0
          showSlide(newIndex)
        })
      }

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const index = Number.parseInt(dot.getAttribute("data-index"))
          showSlide(index)
        })
      })

      let slideInterval = setInterval(() => {
        let newIndex = currentIndex + 1
        if (newIndex >= slides.length) newIndex = 0
        showSlide(newIndex)
      }, 5000)

      slider.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
      })

      slider.addEventListener("mouseleave", () => {
        slideInterval = setInterval(() => {
          let newIndex = currentIndex + 1
          if (newIndex >= slides.length) newIndex = 0
          showSlide(newIndex)
        }, 5000)
      })

      showSlide(0)
    })
  }

  // GALERÍA Y LIGHTBOX
  const galleryFilter = document.querySelector(".gallery-filter")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (galleryFilter && galleryItems.length > 0) {
    galleryFilter.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        const filterValue = e.target.getAttribute("data-filter")
        galleryFilter.querySelectorAll("li").forEach((item) => {
          item.classList.remove("active")
        })
        e.target.classList.add("active")
        galleryItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      }
    })
  }

  const lightbox = document.getElementById("gallery-lightbox")
  const lightboxImage = document.querySelector(".lightbox-image")
  const lightboxCaption = document.querySelector(".lightbox-caption")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxPrev = document.querySelector(".lightbox-prev")
  const lightboxNext = document.querySelector(".lightbox-next")

  if (lightbox && galleryItems.length > 0) {
    let currentImageIndex = 0
    const visibleGalleryItems = () => {
      return Array.from(galleryItems).filter((item) => item.style.display !== "none")
    }

    function openLightbox(index) {
      const items = visibleGalleryItems()
      const item = items[index]
      const img = item.querySelector("img")
      const title = item.querySelector(".gallery-overlay h3").textContent
      const description = item.querySelector(".gallery-overlay p").textContent
      lightboxImage.src = img.src
      lightboxImage.alt = img.alt
      lightboxCaption.innerHTML = `<strong>${title}</strong> - ${description}`
      currentImageIndex = index
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden"
    }

    function closeLightbox() {
      lightbox.classList.remove("active")
      document.body.style.overflow = ""
    }

    function prevImage() {
      const items = visibleGalleryItems()
      currentImageIndex = (currentImageIndex - 1 + items.length) % items.length
      openLightbox(currentImageIndex)
    }

    function nextImage() {
      const items = visibleGalleryItems()
      currentImageIndex = (currentImageIndex + 1) % items.length
      openLightbox(currentImageIndex)
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        const visibleItems = visibleGalleryItems()
        const visibleIndex = visibleItems.indexOf(item)
        openLightbox(visibleIndex)
      })
    })

    lightboxClose.addEventListener("click", closeLightbox)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })

    lightboxPrev.addEventListener("click", prevImage)
    lightboxNext.addEventListener("click", nextImage)

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      }
    })
  }

  // Tabs de experiencias
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        const tabId = btn.getAttribute("data-tab")
        tabContents.forEach((content) => content.classList.remove("active"))
        document.getElementById(`${tabId}-content`).classList.add("active")
      })
    })
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      const answer = item.querySelector(".faq-answer")
      const toggle = item.querySelector(".faq-toggle i")

      question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.querySelector(".faq-answer").classList.remove("active")
            otherItem.classList.remove("active")
            otherItem.querySelector(".faq-toggle i").className = "fas fa-plus"
          }
        })

        answer.classList.toggle("active")
        item.classList.toggle("active")

        if (answer.classList.contains("active")) {
          toggle.className = "fas fa-minus"
        } else {
          toggle.className = "fas fa-plus"
        }
      })
    })
  }

 
  // Funcionalidad "Ver más detalles" para las experiencias
  const toggleDetailsBtns = document.querySelectorAll(".toggle-details-btn")

  if (toggleDetailsBtns.length > 0) {
    toggleDetailsBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Obtener el ID del contenido a mostrar/ocultar
        const targetId = this.getAttribute("data-target")
        const targetContent = document.getElementById(targetId)

        // Alternar la clase hidden
        targetContent.classList.toggle("hidden")

        // Cambiar el texto e icono del botón
        if (targetContent.classList.contains("hidden")) {
          this.innerHTML = 'Ver más detalles <i class="fas fa-chevron-down"></i>'
        } else {
          this.innerHTML = 'Ver menos <i class="fas fa-chevron-up"></i>'
        }

        // Añadir clase active al botón
        this.classList.toggle("active")
      })
    })
  }
})
// Función para alinear los elementos de los barcos con precisión
function alignBoatElements() {
  // Verificar si estamos en la página de embarcaciones
  const boatDetailsSection = document.querySelector('.boat-details');
  if (!boatDetailsSection) return;
  
  // Detectar si estamos en un dispositivo móvil
  const isMobile = window.innerWidth < 768;
  
  // Obtener todas las tarjetas de barcos
  const boatCards = document.querySelectorAll('.boat-card');
  
  // Para cada tarjeta de barco
  boatCards.forEach(function(card) {
    // 1. Obtener los elementos que necesitamos alinear
    const imageContainer = card.querySelector('.boat-image-container');
    const boatSlider = card.querySelector('.boat-image.boat-slider');
    const boatInfo = card.querySelector('.boat-info');
    const title = boatInfo.querySelector('h2');
    const button = boatInfo.querySelector('.cta-btn.primary');
    const specialFeature = card.querySelector('.special-feature.desktop-feature');
    
    // Si no encontramos alguno de los elementos esenciales, salir
    if (!imageContainer || !boatSlider || !boatInfo || !title || !button || !specialFeature) {
      return;
    }
    
    // 2. ALINEAR ELEMENTOS SEGÚN EL DISPOSITIVO
    
    if (isMobile) {
      // En móviles, restablecer los estilos para evitar problemas
      title.style.marginTop = '';
      specialFeature.style.height = '';
      specialFeature.style.display = '';
      specialFeature.style.flexDirection = '';
      specialFeature.style.justifyContent = '';
    } else {
      // En escritorio, aplicar la alineación precisa
      
      // Obtener las posiciones actuales para el título
      const sliderTop = boatSlider.getBoundingClientRect().top;
      const titleTop = title.getBoundingClientRect().top;
      
      // Calcular el ajuste necesario para el título
      const titleAdjustment = sliderTop - titleTop;
      
      // Aplicar el ajuste si es necesario (más de 1px de diferencia)
      if (Math.abs(titleAdjustment) > 1) {
        title.style.marginTop = titleAdjustment + 'px';
      }
      
      // Obtener las posiciones actuales para la característica especial
      const buttonBottom = button.getBoundingClientRect().bottom;
      const featureBottom = specialFeature.getBoundingClientRect().bottom;
      
      // Calcular el ajuste necesario para la característica especial
      const featureAdjustment = buttonBottom - featureBottom;
      
      // Aplicar el ajuste si es necesario
      if (Math.abs(featureAdjustment) > 1) {
        // Ajustar la altura de la característica especial
        const currentHeight = specialFeature.offsetHeight;
        specialFeature.style.height = (currentHeight + featureAdjustment) + 'px';
        
        // Centrar el contenido verticalmente
        specialFeature.style.display = 'flex';
        specialFeature.style.flexDirection = 'column';
        specialFeature.style.justifyContent = 'center';
      }
    }
  });
}

// Función para asegurar que la alineación se ejecute correctamente
function ensureAlignment() {
  // Ejecutar inmediatamente
  alignBoatElements();
  
  // Y también con pequeños retrasos para asegurar que todo esté cargado
  setTimeout(alignBoatElements, 100);
  setTimeout(alignBoatElements, 500);
}

// Función para manejar cambios de orientación en móviles
function handleOrientationChange() {
  // Esperar a que se complete el cambio de orientación
  setTimeout(alignBoatElements, 300);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página de embarcaciones
  if (document.querySelector('.boat-details')) {
    // Ejecutar la alineación inicial
    ensureAlignment();
    
    // Volver a alinear cuando cambie el tamaño de la ventana
    let resizeTimeout;
    window.addEventListener('resize', function() {
      // Cancelar el timeout anterior para evitar múltiples ejecuciones
      clearTimeout(resizeTimeout);
      
      // Establecer un nuevo timeout
      resizeTimeout = setTimeout(alignBoatElements, 250);
    });
    
    // Manejar cambios de orientación en dispositivos móviles
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Volver a alinear después de que las imágenes se carguen
    window.addEventListener('load', ensureAlignment);
    
    // Volver a alinear cuando se haga clic en los controles del carrusel
    const carouselControls = document.querySelectorAll('.boat-prev-btn, .boat-next-btn, .boat-dot');
    carouselControls.forEach(function(control) {
      control.addEventListener('click', function() {
        // Solo aplicar en escritorio
        if (window.innerWidth >= 768) {
          setTimeout(alignBoatElements, 50);
        }
      });
    });
    
    // Crear un observador de mutaciones para detectar cambios en el DOM
    const observer = new MutationObserver(function(mutations) {
      // Solo ejecutar si hay cambios relevantes y estamos en escritorio
      if (window.innerWidth >= 768) {
        const relevantChanges = mutations.some(function(mutation) {
          return mutation.type === 'attributes' || 
                 mutation.type === 'childList' || 
                 (mutation.target.classList && 
                  (mutation.target.classList.contains('boat-slide') || 
                   mutation.target.classList.contains('active')));
        });
        
        if (relevantChanges) {
          setTimeout(alignBoatElements, 50);
        }
      }
    });
    
    observer.observe(document.querySelector('.boat-details'), { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }
});

// Función auxiliar para detectar si estamos en un dispositivo móvil
function isMobileDevice() {
  return (window.innerWidth < 768) || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
// Función para aplicar un tamaño uniforme a todas las imágenes en la sección de experiencias
function fixExperienceImagesSize() {
  const allImages = document.querySelectorAll('.experience-image img');

  allImages.forEach(function(img) {
    img.style.width = '500px';
    img.style.height = '650px';
    img.style.objectFit = 'cover';
    img.style.maxWidth = '100%';
    img.style.display = 'block';
  });
}

// También ejecutar cuando la ventana termine de cargar
window.addEventListener('load', fixExperienceImagesSize);