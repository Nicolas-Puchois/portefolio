window.addEventListener("DOMContentLoaded", () => {
  const projets = [
    {
      nom: "Projet 1",
      description: "Description du projet 1",
      image: "../../images/photo-card-portefolio.jpg",
      github: "https://github.com/projet1",
      demo: "https://live-demo1.com",
    },
    {
      nom: "Projet 2",
      description: "Description du projet 2",
      image: "../../images/photo-card-portefolio.jpg",
      github: "https://github.com/projet2",
      demo: "https://live-demo2.com",
    },
    {
      nom: "Projet 3",
      description: "Description du projet 3",
      image: "../../images/photo-card-portefolio.jpg",
      github: "https://github.com/projet3",
      demo: "https://live-demo3.com",
    },
    {
      nom: "Projet 4",
      description: "Description du projet 4",
      image: "../../images/photo-card-portefolio.jpg",
      github: "https://github.com/projet3",
      demo: "https://live-demo3.com",
    },
  ];

  const container = document.querySelector("#card-container");
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");

  let cardsVisible = window.innerWidth <= 900 ? 1 : 2; // 1 carte en mobile, 2 en desktop
  let currentIndex = 0;

  // Crée les cartes
  function createCarrousel(projets) {
    projets.forEach((projet) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="text">
          <h3>${projet.nom}</h3>
          <p>${projet.description}</p>
        </div>
        <div class="media">
          <img src="${projet.image}" alt="${projet.nom}" />
          <div class="liens">
            <a href="${projet.github}" target="_blank">GitHub</a>
            <a href="${projet.demo}" target="_blank">Live Demo</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // Clone les premières et dernières cartes pour l'effet de boucle infinie
    for (let i = 0; i < cardsVisible; i++) {
      const firstClone = container.children[i].cloneNode(true);
      const lastClone =
        container.children[container.children.length - 1 - i].cloneNode(true);
      container.appendChild(firstClone);
      container.insertBefore(lastClone, container.firstChild);
    }
  }

  createCarrousel(projets);

  const slides = container.children; // HTMLCollection dynamique
  const totalSlides = projets.length;

  // Ajuste la largeur des cartes
  Array.from(slides).forEach((slide) => {
    slide.style.flex = `0 0 ${100 / cardsVisible}%`; // Chaque carte occupe une fraction de l'espace
  });

  // Position initiale
  currentIndex = cardsVisible; // Commence après les clones au début
  container.style.transform = `translateX(-${
    (100 / cardsVisible) * currentIndex
  }%)`;

  // Fonction pour afficher les slides
  function showSlide(index) {
    const slideWidth = 100 / cardsVisible; // Largeur d'une carte en pourcentage
    container.style.transition = "transform 0.5s ease-in-out";
    container.style.transform = `translateX(-${index * slideWidth}%)`;
  }

  showSlide(currentIndex); // Affiche la première carte

  // Gère le clic sur "Précédent"
  prevButton.addEventListener("click", () => {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = totalSlides - cardsVisible;
    }
    showSlide(currentIndex);
  });

  // Gère le clic sur "Suivant"
  nextButton.addEventListener("click", () => {
    currentIndex += 1;
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  });

  window.addEventListener("resize", () => {
    cardsVisible = window.innerWidth <= 900 ? 1 : 2;
    currentIndex = 0; // Réinitialise l'index
    Array.from(slides).forEach((slide) => {
      slide.style.flex = `0 0 ${100 / cardsVisible}%`;
    });
    showSlide(currentIndex);
  });
});
