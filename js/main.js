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
      const langHref = this.getAttribute("href") // ✅ Obtener la URL destino

      const currentLang = document.querySelector(".current-lang span")
      if (currentLang) {
        currentLang.textContent = langText
      }

      langOptions.forEach((opt) => opt.classList.remove("active"))
      this.classList.add("active")

      console.log(`Language changed to: ${langCode}`)

      // ✅ Redirigir a la página del idioma correspondiente
      if (langHref) {
        window.location.href = langHref
      }
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
  boatCards.forEach(function (card) {
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
document.addEventListener('DOMContentLoaded', function () {
  // Verificar si estamos en la página de embarcaciones
  if (document.querySelector('.boat-details')) {
    // Ejecutar la alineación inicial
    ensureAlignment();

    // Volver a alinear cuando cambie el tamaño de la ventana
    let resizeTimeout;
    window.addEventListener('resize', function () {
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
    carouselControls.forEach(function (control) {
      control.addEventListener('click', function () {
        // Solo aplicar en escritorio
        if (window.innerWidth >= 768) {
          setTimeout(alignBoatElements, 50);
        }
      });
    });

    // Crear un observador de mutaciones para detectar cambios en el DOM
    const observer = new MutationObserver(function (mutations) {
      // Solo ejecutar si hay cambios relevantes y estamos en escritorio
      if (window.innerWidth >= 768) {
        const relevantChanges = mutations.some(function (mutation) {
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

  allImages.forEach(function (img) {
    img.style.width = '500px';
    img.style.height = '650px';
    img.style.objectFit = 'cover';
    img.style.maxWidth = '100%';
    img.style.display = 'block';
  });
}

// También ejecutar cuando la ventana termine de cargar
window.addEventListener('load', fixExperienceImagesSize);

//=============== Variables iniciales y generación de sesión ========================
let session_id = localStorage.getItem("chatbot_session_id");
console.log("Session ID:", session_id);
if (!session_id) {
  session_id = "session-" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("chatbot_session_id", session_id);
}

// Variables del DOM
const toggleBtn = document.getElementById("chatbot-toggle");
const chatbot = document.getElementById("chatbot-container");
const messages = document.getElementById("chatbot-messages");
const input = document.getElementById("user-input");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("chatbot-clear"); // NUEVO: Botón de limpiar
const badge = document.getElementById("notification-badge");

// Variable para controlar el estado del chatbot
let isOpen = false;
let messageCount = 0;

//================ Event Listeners ===============================
document.addEventListener("DOMContentLoaded", () => {
  initializeChatbot();
  loadChatHistory();
  
  // Mostrar badge de notificación después de 2 segundos
  setTimeout(() => {
    showNotificationBadge();
  }, 2000);
});

function initializeChatbot() {
  // Toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      toggleChat();
    });
  }

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeChat();
    });
  }

  // NUEVO: Clear button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearChatAndGenerateNewSession();
    });
  }

  // Send button
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      sendMessage();
    });
  }

  // Input field
  if (input) {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });

    // Focus effect
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("input-focused");
    });

    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("input-focused");
    });
  }
}

//================ Funciones de Toggle del Chatbot ===============================
function toggleChat() {
  if (isOpen) {
    closeChat();
  } else {
    openChat();
    hideNotificationBadge();
  }
}

function openChat() {
  if (!chatbot) return;
  
  chatbot.classList.remove('chatbot-hidden');
  
  setTimeout(() => {
    chatbot.classList.add('chatbot-visible');
    if (input) input.focus();
  }, 10);
  
  isOpen = true;
  
  // Agregar clase al body para prevenir scroll
  document.body.classList.add('chatbot-open');
}

function closeChat() {
  if (!chatbot) return;
  
  chatbot.classList.remove('chatbot-visible');
  
  setTimeout(() => {
    chatbot.classList.add('chatbot-hidden');
  }, 300);
  
  isOpen = false;
  
  // Remover clase del body
  document.body.classList.remove('chatbot-open');
}

//======================= Funciones de Notificación ==============================
function showNotificationBadge() {
  if (badge && !isOpen) {
    badge.classList.remove('hidden');
    badge.textContent = '1';
  }
}

function hideNotificationBadge() {
  if (badge) {
    badge.classList.add('hidden');
  }
}

function updateNotificationBadge() {
  if (badge && !isOpen) {
    const unreadCount = parseInt(badge.textContent) || 0;
    badge.textContent = unreadCount + 1;
    badge.classList.remove('hidden');
  }
}

//======================= NUEVA: Función para limpiar chat y generar nueva sesión ==============================
function clearChatAndGenerateNewSession() {
  try {
    // Generar nuevo session_id
    session_id = "session-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("chatbot_session_id", session_id);
    
    // Limpiar historial del localStorage
    localStorage.removeItem("chatbot_history");
    
    // Limpiar mensajes del DOM
    if (messages) {
      messages.innerHTML = '';
    }
    
    // Resetear contador de mensajes
    messageCount = 0;
    
    // Cargar mensaje de bienvenida nuevamente
    loadChatHistory();
    
    console.log("Chat limpiado. Nuevo Session ID:", session_id);
    
    // Opcional: Mostrar mensaje de confirmación temporal
    showTemporaryMessage("chat cleaned successfully / Chat limpiado correctamente");
    
  } catch (error) {
    console.error("Error limpiando chat:", error);
    showTemporaryMessage("Error clearing chat / Error al limpiar el chat");
  }
}

//======================= NUEVA: Función para mostrar mensaje temporal ==============================
function showTemporaryMessage(text) {
  // Crear elemento de mensaje temporal
  const tempMessage = document.createElement('div');
  tempMessage.className = 'temp-message';
  tempMessage.textContent = text;
  tempMessage.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 10000;
    font-size: 14px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: opacity 0.3s ease;
  `;
  
  document.body.appendChild(tempMessage);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    tempMessage.style.opacity = '0';
    setTimeout(() => {
      if (tempMessage.parentNode) {
        tempMessage.parentNode.removeChild(tempMessage);
      }
    }, 300);
  }, 3000);
}

//======================= Cargar historial de mensajes ================================
function loadChatHistory() {
  const chatHistory = JSON.parse(localStorage.getItem("chatbot_history")) || [];

  // Establece el idioma actual (puedes cambiarlo dinámicamente según el sitio)
  const currentLanguage = document.documentElement.lang || "es"; // usa <html lang="es"> o <html lang="en">

  // Mensajes de bienvenida por idioma
  const welcomeMessages = {
    es: "¡Hola! 🐶 Soy Sancho, el perrito tripulante de Catamarán 360. Me encanta acompañar a nuestros viajeros por las islas de San Blas. ¿En qué te puedo ayudar hoy? 🚤",
    en: "Hi there! 🐶 I'm Sancho, the crew pup from Catamarán 360. I love joining our guests as we sail around the San Blas Islands. How can I help you today? 🚤"
  };

  // Si no hay historial, mostrar el mensaje de bienvenida según el idioma
  if (chatHistory.length === 0) {
    const message = welcomeMessages[currentLanguage] || welcomeMessages.es;
    appendMessageToDOM("Bot", message, false);
  } else {
    chatHistory.forEach(({ sender, text }) => {
      appendMessageToDOM(sender, text, false);
    });
  }

  scrollToBottom();
}


//======================= Función para enviar al webhook de n8n ========================
async function sendMessage() {
  const question = input.value.trim();
  if (!question) return;

  // Deshabilitar input mientras se procesa
  setInputState(false);
  
  appendMessage("Tú", question);
  input.value = "";

  // Mostrar indicador de escritura
  showTypingIndicator();

  try {
    const response = await fetch("https://n8n.magnificapec.com/webhook/2700c999-c71d-431c-86a9-597c5ad21675", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: session_id,
        pregunta: question
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Simular delay para mejor UX
    setTimeout(() => {
      hideTypingIndicator();
      appendMessage("Bot", data.respuesta || "No se recibió respuesta.");
      setInputState(true);
    }, 800);
    
  } catch (error) {
    console.error("Error en sendMessage:", error);
    hideTypingIndicator();
    appendMessage("Bot", "Hubo un error al conectar con el servidor. Por favor, intenta nuevamente.");
    setInputState(true);
  }
}

//======================= Funciones de Estado del Input ==============================
function setInputState(enabled) {
  if (input) {
    input.disabled = !enabled;
    input.style.opacity = enabled ? '1' : '0.7';
  }
  if (sendBtn) {
    sendBtn.disabled = !enabled;
    sendBtn.style.opacity = enabled ? '1' : '0.7';
  }
}

//======================= Mostrar mensajes en la ventana ==============================
function appendMessage(sender, text) {
  appendMessageToDOM(sender, text, true);
  
  // Si el chatbot está cerrado y es un mensaje del bot, mostrar notificación
  if (!isOpen && sender === "Bot") {
    updateNotificationBadge();
  }
}

function appendMessageToDOM(sender, text, saveToHistory = true) {
  if (!messages) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender === 'Tú' ? 'user' : 'bot'}-message`;
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = sender === 'Tú' ? '👤' : '🐶';
  
  const content = document.createElement('div');
  content.className = 'message-content';
  content.textContent = text;
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  
  // Animación de entrada
  messageDiv.style.opacity = '0';
  messageDiv.style.transform = 'translateY(10px)';
  
  messages.appendChild(messageDiv);
  
  // Trigger animation
  setTimeout(() => {
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
    messageDiv.style.transition = 'all 0.3s ease-out';
  }, 10);
  
  scrollToBottom();
  messageCount++;

  // Guardar historial solo si se especifica
  if (saveToHistory) {
    saveMessageToHistory(sender, text);
  }
}

function saveMessageToHistory(sender, text) {
  try {
    const chatHistory = JSON.parse(localStorage.getItem("chatbot_history")) || [];
    chatHistory.push({ sender, text, timestamp: Date.now() });
    
    // Limitar historial a últimos 50 mensajes
    if (chatHistory.length > 50) {
      chatHistory.splice(0, chatHistory.length - 50);
    }
    
    localStorage.setItem("chatbot_history", JSON.stringify(chatHistory));
  } catch (error) {
    console.error("Error guardando historial:", error);
  }
}

//======================= Indicador de escritura ====================================
function showTypingIndicator() {
  // Remover indicador existente si existe
  hideTypingIndicator();
  
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot-message typing-indicator';
  typingDiv.id = 'typing-indicator';
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = '🤖';
  
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'typing-dots';
  
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'typing-dot';
    dotsContainer.appendChild(dot);
  }
  
  typingDiv.appendChild(avatar);
  typingDiv.appendChild(dotsContainer);
  
  if (messages) {
    messages.appendChild(typingDiv);
    scrollToBottom();
  }
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

//======================= Funciones de Utilidad ====================================
function scrollToBottom() {
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
}

function clearChatHistory() {
  try {
    localStorage.removeItem("chatbot_history");
    if (messages) {
      messages.innerHTML = '';
    }
    loadChatHistory();
  } catch (error) {
    console.error("Error limpiando historial:", error);
  }
}

// Función para limpiar sesión (útil para testing)
function resetChatSession() {
  try {
    localStorage.removeItem("chatbot_session_id");
    localStorage.removeItem("chatbot_history");
    location.reload();
  } catch (error) {
    console.error("Error reseteando sesión:", error);
  }
}

//======================= Función existente para imágenes ========================
function fixExperienceImagesSize() {
  // Tu código existente para arreglar el tamaño de las imágenes
  // Mantén aquí tu implementación original
  console.log("Fixing experience images size...");
}

//======================= Funciones de Accesibilidad ============================
// Soporte para navegación con teclado
document.addEventListener('keydown', (e) => {
  // Escape para cerrar chatbot
  if (e.key === 'Escape' && isOpen) {
    closeChat();
  }
  
  // Ctrl/Cmd + K para abrir chatbot
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (!isOpen) {
      openChat();
    }
  }
});

//======================= Manejo de Errores Globales ============================
window.addEventListener('error', (e) => {
  console.error('Error en chatbot:', e.error);
});

//======================= Funciones Públicas para Debugging ============================
// Estas funciones están disponibles en la consola para debugging
window.chatbotDebug = {
  clearHistory: clearChatHistory,
  resetSession: resetChatSession,
  clearAndNewSession: clearChatAndGenerateNewSession, // NUEVA función agregada
  getSessionId: () => session_id,
  getMessageCount: () => messageCount,
  isOpen: () => isOpen,
  openChat: openChat,
  closeChat: closeChat
};

//======================= Inicialización Final ============================
// Asegurar que todo esté listo cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Chatbot Catamarán 360 inicializado correctamente');
  });
} else {
  console.log('Chatbot Catamarán 360 inicializado correctamente');
}
