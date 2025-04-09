window.addEventListener("DOMContentLoaded", () => {
  // Cloner la dernière slide et l'insérer au début
  const slides = carrousel.children; // HTMLCollection dynamique
  const lastSlideClone = slides[games.length - 1].cloneNode(true);
  carrousel.insertBefore(lastSlideClone, slides[0]);

  // Cloner la première slide et l'ajouter à la fin
  const firstSlideClone = slides[1].cloneNode(true);
  carrousel.appendChild(firstSlideClone);

  // On démarre à l'index 1, qui correspond à la première slide réelle
  let currentIndex = 1;
  const totalSlides = games.length; // nombre de slides réelles

  // Position initiale (sans transition pour le réglage)
  carrousel.style.transition = "none";
  showSlide(currentIndex);
  setTimeout(() => {
    carrousel.style.transition = "transform 0.5s ease-in-out";
  }, 50);

  function showSlide(index) {
    carrousel.style.transform = `translateX(-${index * 100}%)`;
  }

  const prevButton = document.querySelector("#prev");
  prevButton.addEventListener("click", () => {
    currentIndex--;
    showSlide(currentIndex);
    // Si on arrive sur la slide clone du dernier, on repositionne instantanément sur la vraie dernière slide
    if (currentIndex === 0) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = totalSlides;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  });

  const nextButton = document.querySelector("#next");
  nextButton.addEventListener("click", () => {
    currentIndex++;
    showSlide(currentIndex);
    // Si on arrive sur la slide clone de la première, repositionnement sur la vraie première slide
    if (currentIndex === totalSlides + 1) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = 1;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  });

  // Mise à jour du setInterval avec la même logique que pour le bouton next
  function calcSlide() {
    currentIndex++;
    showSlide(currentIndex);
    if (currentIndex === totalSlides + 1) {
      carrousel.addEventListener("transitionend", function handler() {
        carrousel.style.transition = "none";
        currentIndex = 1;
        showSlide(currentIndex);
        setTimeout(() => {
          carrousel.style.transition = "transform 0.5s ease-in-out";
        }, 50);
        carrousel.removeEventListener("transitionend", handler);
      });
    }
  }

  let inter;
  let lightboxIsOpen = false;

  function startInterval() {
    inter = setInterval(calcSlide, 3000);
  }

  setTimeout(() => {
    startInterval();
    const carrouselContainer = document.querySelector("#carrousel-container");
    carrouselContainer.addEventListener("mouseenter", () =>
      clearInterval(inter)
    );
    carrouselContainer.addEventListener("mouseleave", () => {
      clearInterval(inter);
      if (!lightboxIsOpen) startInterval();
    });
  }, 2000);

  window.addEventListener("keydown", (e) => prevOrNext(e));
  function prevOrNext(e) {
    if (e.key === "ArrowLeft" || e.code === "ArrowLeft" || e.keyCode === 37) {
      clearInterval(inter);
      startInterval();
      prevButton.click();
    } else if (
      e.key === "ArrowRight" ||
      e.code === "ArrowRight" ||
      e.keyCode === 39
    ) {
      clearInterval(inter);
      startInterval();
      nextButton.click();
    } else if (e.key === "Escape" || e.code === "Escape" || e.keyCode === 27) {
      closeLightBox();
    }
  }
});
