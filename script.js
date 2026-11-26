document.addEventListener("DOMContentLoaded", () => {
  // 首頁圖片輪播
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".carousel-dot"));
  const indexLabel = document.querySelector(".hero-index");
  const previousButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  if (slides.length > 0) {
    let currentSlide = 0;
    let autoplayTimer;

    const showSlide = (newIndex) => {
      currentSlide = (newIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === currentSlide);
      });

      dots.forEach((dot, index) => {
        const isCurrent = index === currentSlide;
        dot.classList.toggle("is-active", isCurrent);

        if (isCurrent) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });

      if (indexLabel) {
        indexLabel.textContent =
          `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      }
    };

    const startAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = window.setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
    };

    previousButton?.addEventListener("click", () => {
      showSlide(currentSlide - 1);
      startAutoplay();
    });

    nextButton?.addEventListener("click", () => {
      showSlide(currentSlide + 1);
      startAutoplay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        startAutoplay();
      });
    });

    startAutoplay();
  }

  // 優惠訊息彈窗
  const promoButtons = document.querySelectorAll(".promo-trigger");
  let promoModal;

  const closePromoModal = () => {
    if (!promoModal) return;
    promoModal.hidden = true;
    document.body.style.overflow = "";
  };

  const openPromoModal = () => {
    if (!promoModal) {
      promoModal = document.createElement("div");
      promoModal.className = "promo-modal";
      promoModal.hidden = true;
      promoModal.setAttribute("role", "dialog");
      promoModal.setAttribute("aria-modal", "true");
      promoModal.setAttribute("aria-labelledby", "promo-title");
      promoModal.innerHTML = `
        <div class="modal-card">
          <button class="modal-close" type="button" aria-label="關閉優惠訊息">×</button>
          <p class="eyebrow">A LITTLE SOMETHING FOR YOU</p>
          <h2 id="promo-title">新客專屬優惠</h2>
          <p>首次選購 AURA 耳機，結帳時輸入優惠碼即可享有新客折扣。</p>
          <div class="promo-code">AURA10</div>
          <p>優惠碼：全站耳機商品結帳可折 NT$ 300。</p>
          <button class="button button-dark modal-confirm" type="button">知道了</button>
        </div>
      `;
      document.body.appendChild(promoModal);

      promoModal.querySelector(".modal-close").addEventListener("click", closePromoModal);
      promoModal.querySelector(".modal-confirm").addEventListener("click", closePromoModal);

      promoModal.addEventListener("click", (event) => {
        if (event.target === promoModal) {
          closePromoModal();
        }
      });
    }

    promoModal.hidden = false;
    document.body.style.overflow = "hidden";
    promoModal.querySelector(".modal-close").focus();
  };

  promoButtons.forEach((button) => {
    button.addEventListener("click", openPromoModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePromoModal();
    }
  });

  // 聯絡表單展示互動
  const contactForm = document.querySelector("#contact-form");
  const formFeedback = document.querySelector("#form-feedback");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const name = contactForm.elements.name.value.trim();
    formFeedback.textContent = `謝謝你，${name}！訊息已完成填寫（此展示頁不會實際傳送資料）。`;
    contactForm.reset();
  });
});
