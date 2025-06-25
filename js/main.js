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
      slide.classList.toggle("active", i === index)
    })
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

  // Funcionalidad "Ver más detalles" para las experiencias - MODIFICADA
const toggleDetailsBtns = document.querySelectorAll(".toggle-details-btn")

if (toggleDetailsBtns.length > 0) {
  toggleDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const parentCard = this.closest(".experience-card")

      if (!parentCard) return

      // Buscar todos los elementos .experience-details dentro de esta tarjeta
      const detailsSections = parentCard.querySelectorAll(".experience-details")

      detailsSections.forEach((section) => {
        section.classList.toggle("hidden")
      })

      // Cambiar el texto e icono del botón
      const isHidden = [...detailsSections].every(section => section.classList.contains("hidden"))

      if (isHidden) {
        this.innerHTML = 'See more details <i class="fas fa-chevron-down"></i>'
        parentCard.classList.remove("expanded")
        detailsSections.forEach(section => reorganizeContentForCollapsed(section))
      } else {
        this.innerHTML = 'See less <i class="fas fa-chevron-up"></i>'
        parentCard.classList.add("expanded")
        detailsSections.forEach(section => reorganizeContentForExpanded(section))
      }

      this.classList.toggle("active")
    })
  })
}

  // ✅ NUEVA FUNCIÓN: Reorganizar contenido para layout expandido (dos columnas)
  function reorganizeContentForExpanded(targetContent) {
    // Buscar la información adicional
    const additionalInfo = targetContent.querySelector(".additional-info")
    const detailsGrid = targetContent.querySelector(".details-grid")

    if (additionalInfo && detailsGrid) {
      // Crear estructura de dos columnas
      targetContent.classList.add("expanded")

      // Mover información adicional a la izquierda (debajo de la imagen)
      additionalInfo.classList.add("additional-info-left")

      // Crear contenedor para la columna derecha
      let rightColumn = targetContent.querySelector(".details-right-column")
      if (!rightColumn) {
        rightColumn = document.createElement("div")
        rightColumn.className = "details-right-column"

        // Mover includes y not-includes a la columna derecha
        const includesSection = detailsGrid.querySelector(".includes-section")
        const notIncludesSection = detailsGrid.querySelector(".not-includes-section")

        if (includesSection) rightColumn.appendChild(includesSection)
        if (notIncludesSection) rightColumn.appendChild(notIncludesSection)

        targetContent.appendChild(rightColumn)
      }

      // Ocultar el details-grid original
      detailsGrid.style.display = "none"
    }
  }

  // ✅ NUEVA FUNCIÓN: Reorganizar contenido para layout colapsado (normal)
  function reorganizeContentForCollapsed(targetContent) {
    const additionalInfo = targetContent.querySelector(".additional-info")
    const detailsGrid = targetContent.querySelector(".details-grid")
    const rightColumn = targetContent.querySelector(".details-right-column")

    if (additionalInfo && detailsGrid && rightColumn) {
      // Remover clases de layout expandido
      targetContent.classList.remove("expanded")
      additionalInfo.classList.remove("additional-info-left")

      // Mover elementos de vuelta al details-grid
      const includesSection = rightColumn.querySelector(".includes-section")
      const notIncludesSection = rightColumn.querySelector(".not-includes-section")

      if (includesSection) detailsGrid.appendChild(includesSection)
      if (notIncludesSection) detailsGrid.appendChild(notIncludesSection)

      // Mostrar el details-grid y remover la columna derecha
      detailsGrid.style.display = "grid"
      rightColumn.remove()
    }
  }

  // Función para alinear los elementos de los barcos con precisión
  function alignBoatElements() {
    // Verificar si estamos en la página de embarcaciones
    const boatDetailsSection = document.querySelector(".boat-details")
    if (!boatDetailsSection) return

    // Detectar si estamos en un dispositivo móvil
    const isMobile = window.innerWidth < 768

    // Obtener todas las tarjetas de barcos
    const boatCards = document.querySelectorAll(".boat-card")

    // Para cada tarjeta de barco
    boatCards.forEach((card) => {
      // 1. Obtener los elementos que necesitamos alinear
      const imageContainer = card.querySelector(".boat-image-container")
      const boatSlider = card.querySelector(".boat-image.boat-slider")
      const boatInfo = card.querySelector(".boat-info")
      const title = boatInfo.querySelector("h2")
      const button = boatInfo.querySelector(".cta-btn.primary")
      const specialFeature = card.querySelector(".special-feature.desktop-feature")

      // Si no encontramos alguno de los elementos esenciales, salir
      if (!imageContainer || !boatSlider || !boatInfo || !title || !button || !specialFeature) {
        return
      }

      // 2. ALINEAR ELEMENTOS SEGÚN EL DISPOSITIVO

      if (isMobile) {
        // En móviles, restablecer los estilos para evitar problemas
        title.style.marginTop = ""
        specialFeature.style.height = ""
        specialFeature.style.display = ""
        specialFeature.style.flexDirection = ""
        specialFeature.style.justifyContent = ""
      } else {
        // En escritorio, aplicar la alineación precisa

        // Obtener las posiciones actuales para el título
        const sliderTop = boatSlider.getBoundingClientRect().top
        const titleTop = title.getBoundingClientRect().top

        // Calcular el ajuste necesario para el título
        const titleAdjustment = sliderTop - titleTop

        // Aplicar el ajuste si es necesario (más de 1px de diferencia)
        if (Math.abs(titleAdjustment) > 1) {
          title.style.marginTop = titleAdjustment + "px"
        }

        // Obtener las posiciones actuales para la característica especial
        const buttonBottom = button.getBoundingClientRect().bottom
        const featureBottom = specialFeature.getBoundingClientRect().bottom

        // Calcular el ajuste necesario para la característica especial
        const featureAdjustment = buttonBottom - featureBottom

        // Aplicar el ajuste si es necesario
        if (Math.abs(featureAdjustment) > 1) {
          // Ajustar la altura de la característica especial
          const currentHeight = specialFeature.offsetHeight
          specialFeature.style.height = currentHeight + featureAdjustment + "px"

          // Centrar el contenido verticalmente
          specialFeature.style.display = "flex"
          specialFeature.style.flexDirection = "column"
          specialFeature.style.justifyContent = "center"
        }
      }
    })
  }

  // Función para asegurar que la alineación se ejecute correctamente
  function ensureAlignment() {
    // Ejecutar inmediatamente
    alignBoatElements()

    // Y también con pequeños retrasos para asegurar que todo esté cargado
    setTimeout(alignBoatElements, 100)
    setTimeout(alignBoatElements, 500)
  }

  // Función para manejar cambios de orientación en móviles
  function handleOrientationChange() {
    // Esperar a que se complete el cambio de orientación
    setTimeout(alignBoatElements, 300)
  }

  // Verificar si estamos en la página de embarcaciones
  if (document.querySelector(".boat-details")) {
    // Ejecutar la alineación inicial
    ensureAlignment()

    // Volver a alinear cuando cambie el tamaño de la ventana
    let resizeTimeout
    window.addEventListener("resize", () => {
      // Cancelar el timeout anterior para evitar múltiples ejecuciones
      clearTimeout(resizeTimeout)

      // Establecer un nuevo timeout
      resizeTimeout = setTimeout(alignBoatElements, 250)
    })

    // Manejar cambios de orientación en dispositivos móviles
    window.addEventListener("orientationchange", handleOrientationChange)

    // Volver a alinear después de que las imágenes se carguen
    window.addEventListener("load", ensureAlignment)

    // Volver a alinear cuando se haga clic en los controles del carrusel
    const carouselControls = document.querySelectorAll(".boat-prev-btn, .boat-next-btn, .boat-dot")
    carouselControls.forEach((control) => {
      control.addEventListener("click", () => {
        // Solo aplicar en escritorio
        if (window.innerWidth >= 768) {
          setTimeout(alignBoatElements, 50)
        }
      })
    })

    // Crear un observador de mutaciones para detectar cambios en el DOM
    const observer = new MutationObserver((mutations) => {
      // Solo ejecutar si hay cambios relevantes y estamos en escritorio
      if (window.innerWidth >= 768) {
        const relevantChanges = mutations.some(
          (mutation) =>
            mutation.type === "attributes" ||
            mutation.type === "childList" ||
            (mutation.target.classList &&
              (mutation.target.classList.contains("boat-slide") || mutation.target.classList.contains("active"))),
        )

        if (relevantChanges) {
          setTimeout(alignBoatElements, 50)
        }
      }
    })

    observer.observe(document.querySelector(".boat-details"), {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    })
  }

  // Función auxiliar para detectar si estamos en un dispositivo móvil
  function isMobileDevice() {
    return (
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    )
  }

  // Verificar si estamos en la página de experiencias
  if (document.querySelector(".experience-options")) {
    // Aplicar el fix inmediatamente
    fixExperienceImagesSize()

    // También aplicar después de que las imágenes se carguen
    window.addEventListener("load", fixExperienceImagesSize)

    // Aplicar cuando cambie el tamaño de la ventana
    window.addEventListener("resize", () => {
      setTimeout(fixExperienceImagesSize, 100)
    })
  }

  // CHATBOT
  const isOpen = false
  const session_id = "session-" + Math.random().toString(36).substr(2, 9)
  const messageCount = 0
  const chatbotContainer = document.getElementById("chatbot-container")
  const userInput = document.getElementById("user-input")
  const sendBtn = document.getElementById("send-btn")
  const chatbotMessages = document.getElementById("chatbot-messages")
  const badge = document.getElementById("notification-badge")
  const clearBtn = document.getElementById("clear-btn") // Declare the clearBtn variable

  // Respuestas predefinidas del chatbot
  const botResponses = {
    saludos: [
      "¡Hola! Soy tu asistente virtual de San Blas Tours. ¿En qué puedo ayudarte hoy?",
      "¡Bienvenido a San Blas Tours! ¿Te gustaría conocer nuestras experiencias?",
      "¡Hola! Estoy aquí para ayudarte con información sobre nuestros tours en San Blas.",
    ],
    tours: [
      "Ofrecemos increíbles tours en catamarán por las islas de San Blas. Puedes elegir entre tours de día completo o medio día.",
      "Nuestros tours incluyen visitas a islas paradisíacas, snorkel, almuerzo típico y transporte. ¿Te interesa alguno en particular?",
      "Tenemos diferentes opciones: Tour Clásico, Tour Premium y Tour Privado. Cada uno con experiencias únicas.",
    ],
    precios: [
      "Los precios varían según el tipo de tour. El Tour Clásico desde $80, Premium desde $120 y Privado desde $200 por persona.",
      "Nuestros precios incluyen transporte, almuerzo, snorkel y guía. ¿Te gustaría más detalles sobre algún tour específico?",
      "Ofrecemos diferentes paquetes con precios competitivos. ¿Cuántas personas serían para el tour?",
    ],
    reservas: [
      "Para reservar puedes contactarnos por WhatsApp, llenar nuestro formulario online o llamarnos directamente.",
      "Las reservas se pueden hacer con 24 horas de anticipación. ¿Para qué fecha te interesa?",
      "Puedes reservar fácilmente a través de nuestro WhatsApp o formulario web. ¿Necesitas ayuda con la reserva?",
    ],
    incluye: [
      "Nuestros tours incluyen: transporte ida y vuelta, almuerzo típico, equipo de snorkel, guía bilingüe y seguro.",
      "Incluimos todo lo necesario para tu aventura: comida, bebidas, equipo de snorkel y transporte cómodo.",
      "El tour incluye transporte, almuerzo, snorkel, guía experto y visita a múltiples islas.",
    ],
    horarios: [
      "Salimos todos los días a las 7:00 AM desde la ciudad de Panamá. El retorno es aproximadamente a las 6:00 PM.",
      "Los tours salen temprano en la mañana para aprovechar al máximo el día. ¿Te parece bien el horario?",
      "Horario estándar: Salida 7:00 AM - Retorno 6:00 PM. También tenemos opciones de medio día.",
    ],
    contacto: [
      "Puedes contactarnos por WhatsApp al +507 6XXX-XXXX, email info@sanblastours.com o llamarnos al +507 XXX-XXXX.",
      "Estamos disponibles por WhatsApp, email y teléfono. También puedes visitarnos en nuestras oficinas.",
      "Para contacto inmediato usa nuestro WhatsApp. También respondemos emails rápidamente.",
    ],
    default: [
      "Interesante pregunta. ¿Podrías ser más específico sobre qué información necesitas?",
      "No estoy seguro de entender completamente. ¿Podrías reformular tu pregunta?",
      "Me gustaría ayudarte mejor. ¿Puedes darme más detalles sobre lo que buscas?",
      "Para brindarte la mejor información, ¿podrías ser más específico en tu consulta?",
    ],
  }

  // Función para obtener respuesta del bot
  function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase()

    if (message.includes("hola") || message.includes("buenos") || message.includes("saludos")) {
      return getRandomResponse("saludos")
    } else if (message.includes("tour") || message.includes("excursion") || message.includes("viaje")) {
      return getRandomResponse("tours")
    } else if (message.includes("precio") || message.includes("costo") || message.includes("cuanto")) {
      return getRandomResponse("precios")
    } else if (message.includes("reserva") || message.includes("booking") || message.includes("reservar")) {
      return getRandomResponse("reservas")
    } else if (message.includes("incluye") || message.includes("incluido") || message.includes("que tiene")) {
      return getRandomResponse("incluye")
    } else if (message.includes("horario") || message.includes("hora") || message.includes("cuando")) {
      return getRandomResponse("horarios")
    } else if (message.includes("contacto") || message.includes("telefono") || message.includes("whatsapp")) {
      return getRandomResponse("contacto")
    } else {
      return getRandomResponse("default")
    }
  }

  function getRandomResponse(category) {
    const responses = botResponses[category]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Función para agregar mensaje
  function addMessage(message, isUser = false) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>'

    const content = document.createElement("div")
    content.className = "message-content"
    content.textContent = message

    messageDiv.appendChild(avatar)
    messageDiv.appendChild(content)

    chatbotMessages.appendChild(messageDiv)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  // Función para mostrar indicador de escritura
  function showTypingIndicator() {
    const typingDiv = document.createElement("div")
    typingDiv.className = "message bot-message typing-indicator"
    typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `
    chatbotMessages.appendChild(typingDiv)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
    return typingDiv
  }

  // Función para enviar mensaje
  function sendMessage() {
    const message = userInput.value.trim()
    if (message === "") return

    addMessage(message, true)
    userInput.value = ""

    const typingIndicator = showTypingIndicator()

    setTimeout(
      () => {
        typingIndicator.remove()
        const botResponse = getBotResponse(message)
        addMessage(botResponse)
      },
      1000 + Math.random() * 1000,
    )
  }

  // Event listeners
  if (chatbotContainer) {
    chatbotContainer.addEventListener("click", (e) => {
      if (e.target === chatbotContainer) {
        window.closeChat() // Use window.closeChat instead of closeChat
      }
    })
  }

  if (userInput) {
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage)
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      chatbotMessages.innerHTML = ""
      setTimeout(() => {
        addMessage("Chat limpiado. ¿En qué más puedo ayudarte?")
      }, 300)

      // Mostrar mensaje temporal
      const tempMessage = document.createElement("div")
      tempMessage.className = "temp-message"
      tempMessage.textContent = "Chat limpiado"
      document.body.appendChild(tempMessage)

      setTimeout(() => {
        tempMessage.style.opacity = "0"
        setTimeout(() => {
          document.body.removeChild(tempMessage)
        }, 300)
      }, 2000)
    })
  }

  // Inicializar chatbot como oculto
  if (chatbotContainer) {
    chatbotContainer.classList.add("chatbot-hidden")
  }
})

// Función para aplicar un tamaño uniforme a todas las imágenes en la sección de experiencias
function fixExperienceImagesSize() {
  const experienceImages = document.querySelectorAll(".experience-image")

  if (experienceImages.length > 0) {
    experienceImages.forEach((imageContainer) => {
      const img = imageContainer.querySelector("img")
      if (img) {
        // Aplicar estilos CSS directamente
        img.style.width = "100%"
        img.style.height = "100%"
        img.style.objectFit = "cover"
        img.style.display = "block"

        // Asegurar que el contenedor tenga una altura fija
        imageContainer.style.height = "400px"
        imageContainer.style.overflow = "hidden"
      }
    })
  }
}

//======================= Funciones de Accesibilidad ============================
// Soporte para navegación con teclado
document.addEventListener("keydown", (e) => {
  // Escape para cerrar chatbot
  if (e.key === "Escape" && window.isOpen) {
    window.closeChat()
  }

  // Ctrl/Cmd + K para abrir chatbot
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    if (!window.isOpen) {
      window.openChat()
    }
  }
})

//======================= Manejo de Errores Globales ============================
window.addEventListener("error", (e) => {
  console.error("Error en chatbot:", e.error)
})

//======================= Funciones Públicas para Debugging ============================
// Estas funciones están disponibles en la consola para debugging
window.chatbotDebug = {
  clearHistory: window.clearChatHistory,
  resetSession: window.resetChatSession,
  clearAndNewSession: window.clearChatAndGenerateNewSession, // NUEVA función agregada
  getSessionId: () => window.session_id,
  getMessageCount: () => window.messageCount,
  isOpen: () => window.isOpen,
  openChat: window.openChat,
  closeChat: window.closeChat,
}

//======================= Inicialización Final ============================
// Asegurar que todo esté listo cuando el DOM esté completamente cargado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Chatbot Catamarán 360 inicializado correctamente")
  })
} else {
  console.log("Chatbot Catamarán 360 inicializado correctamente")
}

// Funciones para el chatbot
window.closeChat = function closeChat() {
  const chatbotContainer = document.getElementById("chatbot-container")
  if (!chatbotContainer) return

  chatbotContainer.classList.remove("chatbot-visible")

  setTimeout(() => {
    chatbotContainer.classList.add("chatbot-hidden")
  }, 300)

  window.isOpen = false

  // Remover clase del body
  document.body.classList.remove("chatbot-open")
}

window.openChat = function openChat() {
  const chatbotContainer = document.getElementById("chatbot-container")
  if (!chatbotContainer) return

  chatbotContainer.classList.remove("chatbot-hidden")

  setTimeout(() => {
    chatbotContainer.classList.add("chatbot-visible")
    const userInput = document.getElementById("user-input")
    if (userInput) userInput.focus()
  }, 10)

  window.isOpen = true

  // Agregar clase al body para prevenir scroll
  document.body.classList.add("chatbot-open")
}

window.toggleChat = function toggleChat() {
  if (window.isOpen) {
    window.closeChat()
  } else {
    window.openChat()
    window.hideNotificationBadge()
  }
}

window.showNotificationBadge = function showNotificationBadge() {
  const badge = document.getElementById("notification-badge")
  if (badge && !window.isOpen) {
    badge.classList.remove("hidden")
    badge.textContent = "1"
  }
}

window.hideNotificationBadge = function hideNotificationBadge() {
  const badge = document.getElementById("notification-badge")
  if (badge) {
    badge.classList.add("hidden")
  }
}

window.updateNotificationBadge = function updateNotificationBadge() {
  const badge = document.getElementById("notification-badge")
  if (badge && !window.isOpen) {
    const unreadCount = Number.parseInt(badge.textContent) || 0
    badge.textContent = unreadCount + 1
    badge.classList.remove("hidden")
  }
}

window.clearChatAndGenerateNewSession = function clearChatAndGenerateNewSession() {
  try {
    // Generar nuevo session_id
    window.session_id = "session-" + Math.random().toString(36).substr(2, 9)
    localStorage.setItem("chatbot_session_id", window.session_id)

    // Limpiar historial del localStorage
    localStorage.removeItem("chatbot_history")

    // Limpiar mensajes del DOM
    const chatbotMessages = document.getElementById("chatbot-messages")
    if (chatbotMessages) {
      chatbotMessages.innerHTML = ""
    }

    // Resetear contador de mensajes
    window.messageCount = 0

    // Cargar mensaje de bienvenida nuevamente
    window.loadChatHistory()

    console.log("Chat limpiado. Nuevo Session ID:", window.session_id)

    // Opcional: Mostrar mensaje de confirmación temporal
    window.showTemporaryMessage("chat cleaned successfully / Chat limpiado correctamente")
  } catch (error) {
    console.error("Error limpiando chat:", error)
    window.showTemporaryMessage("Error clearing chat / Error al limpiar el chat")
  }
}

window.showTemporaryMessage = function showTemporaryMessage(text) {
  // Crear elemento de mensaje temporal
  const tempMessage = document.createElement("div")
  tempMessage.className = "temp-message"
  tempMessage.textContent = text
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
  `

  document.body.appendChild(tempMessage)

  // Remover después de 3 segundos
  setTimeout(() => {
    tempMessage.style.opacity = "0"
    setTimeout(() => {
      if (tempMessage.parentNode) {
        tempMessage.parentNode.removeChild(tempMessage)
      }
    }, 300)
  }, 3000)
}

window.loadChatHistory = function loadChatHistory() {
  const chatHistory = JSON.parse(localStorage.getItem("chatbot_history")) || []

  // Establece el idioma actual (puedes cambiarlo dinámicamente según el sitio)
  const currentLanguage = document.documentElement.lang || "es" // usa <html lang="es"> o <html lang="en">

  // Mensajes de bienvenida por idioma
  const welcomeMessages = {
    es: "¡Hola! 🐶 Soy Sancho, el perrito tripulante de Catamarán 360. Me encanta acompañar a nuestros viajeros por las islas de San Blas. ¿En qué te puedo ayudar hoy? 🚤",
    en: "Hi there! 🐶 I'm Sancho, the crew pup from Catamarán 360. I love joining our guests as we sail around the San Blas Islands. How can I help you today? 🚤",
  }

  // Si no hay historial, mostrar el mensaje de bienvenida según el idioma
  if (chatHistory.length === 0) {
    const message = welcomeMessages[currentLanguage] || welcomeMessages.es
    window.appendMessageToDOM("Bot", message, false)
  } else {
    chatHistory.forEach(({ sender, text }) => {
      window.appendMessageToDOM(sender, text, false)
    })
  }

  window.scrollToBottom()
}

window.sendMessage = async function sendMessage() {
  const question = window.userInput.value.trim()
  if (!question) return

  // Deshabilitar input mientras se procesa
  window.setInputState(false)

  window.appendMessage("Tú", question)
  window.userInput.value = ""

  // Mostrar indicador de escritura
  window.showTypingIndicator()

  try {
    const response = await fetch("https://n8n.magnificapec.com/webhook/2700c999-c71d-431c-86a9-597c5ad21675", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: window.session_id,
        pregunta: question,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Simular delay para mejor UX
    setTimeout(() => {
      window.hideTypingIndicator()
      window.appendMessage("Bot", data.respuesta || "No se recibió respuesta.")
      window.setInputState(true)
    }, 800)
  } catch (error) {
    console.error("Error en sendMessage:", error)
    window.hideTypingIndicator()
    window.appendMessage("Bot", "Hubo un error al conectar con el servidor. Por favor, intenta nuevamente.")
    window.setInputState(true)
  }
}

window.setInputState = function setInputState(enabled) {
  const userInput = document.getElementById("user-input")
  const sendBtn = document.getElementById("send-btn")
  if (userInput) {
    userInput.disabled = !enabled
    userInput.style.opacity = enabled ? "1" : "0.7"
  }
  if (sendBtn) {
    sendBtn.disabled = !enabled
    sendBtn.style.opacity = enabled ? "1" : "0.7"
  }
}

window.appendMessage = function appendMessage(sender, text) {
  window.appendMessageToDOM(sender, text, true)

  // Si el chatbot está cerrado y es un mensaje del bot, mostrar notificación
  if (!window.isOpen && sender === "Bot") {
    window.updateNotificationBadge()
  }
}

window.appendMessageToDOM = function appendMessageToDOM(sender, text, saveToHistory = true) {
  const chatbotMessages = document.getElementById("chatbot-messages")
  if (!chatbotMessages) return

  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender === "Tú" ? "user" : "bot"}-message`

  const avatar = document.createElement("div")
  avatar.className = "message-avatar"
  avatar.textContent = sender === "Tú" ? "👤" : "🐶"

  const content = document.createElement("div")
  content.className = "message-content"
  content.textContent = text

  messageDiv.appendChild(avatar)
  messageDiv.appendChild(content)

  // Animación de entrada
  messageDiv.style.opacity = "0"
  messageDiv.style.transform = "translateY(10px)"

  chatbotMessages.appendChild(messageDiv)

  // Trigger animation
  setTimeout(() => {
    messageDiv.style.opacity = "1"
    messageDiv.style.transform = "translateY(0)"
    messageDiv.style.transition = "all 0.3s ease-out"
  }, 10)

  window.scrollToBottom()
  window.messageCount++

  // Guardar historial solo si se especifica
  if (saveToHistory) {
    window.saveMessageToHistory(sender, text)
  }
}

window.saveMessageToHistory = function saveMessageToHistory(sender, text) {
  try {
    const chatHistory = JSON.parse(localStorage.getItem("chatbot_history")) || []
    chatHistory.push({ sender, text, timestamp: Date.now() })

    // Limitar historial a últimos 50 mensajes
    if (chatHistory.length > 50) {
      chatHistory.splice(0, chatHistory.length - 50)
    }

    localStorage.setItem("chatbot_history", JSON.stringify(chatHistory))
  } catch (error) {
    console.error("Error guardando historial:", error)
  }
}

window.showTypingIndicator = function showTypingIndicator() {
  // Remover indicador existente si existe
  window.hideTypingIndicator()

  const typingDiv = document.createElement("div")
  typingDiv.className = "message bot-message typing-indicator"
  typingDiv.id = "typing-indicator"

  const avatar = document.createElement("div")
  avatar.className = "message-avatar"
  avatar.textContent = "🤖"

  const dotsContainer = document.createElement("div")
  dotsContainer.className = "typing-dots"

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div")
    dot.className = "typing-dot"
    dotsContainer.appendChild(dot)
  }

  typingDiv.appendChild(avatar)
  typingDiv.appendChild(dotsContainer)

  const chatbotMessages = document.getElementById("chatbot-messages")
  if (chatbotMessages) {
    chatbotMessages.appendChild(typingDiv)
    window.scrollToBottom()
  }
}

window.hideTypingIndicator = function hideTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator")
  if (typingIndicator) {
    typingIndicator.remove()
  }
}

window.scrollToBottom = function scrollToBottom() {
  const chatbotMessages = document.getElementById("chatbot-messages")
  if (chatbotMessages) {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }
}

window.clearChatHistory = function clearChatHistory() {
  try {
    localStorage.removeItem("chatbot_history")
    const chatbotMessages = document.getElementById("chatbot-messages")
    if (chatbotMessages) {
      chatbotMessages.innerHTML = ""
    }
    window.loadChatHistory()
  } catch (error) {
    console.error("Error limpiando historial:", error)
  }
}

window.resetChatSession = function resetChatSession() {
  try {
    localStorage.removeItem("chatbot_session_id")
    localStorage.removeItem("chatbot_history")
    location.reload()
  } catch (error) {
    console.error("Error reseteando sesión:", error)
  }
}
