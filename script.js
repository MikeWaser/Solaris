// Har delat upp koden med kommentarer varje gång det händer något nytt

// Namnöversättning från svenska till engelska
const nameMap = {
  Solen: "sun",
  Merkurius: "mercury",
  Venus: "venus",
  Jorden: "earth",
  Mars: "mars",
  Jupiter: "jupiter",
  Saturnus: "saturn",
  Uranus: "uranus",
  Neptunus: "neptune",
};

// Hämtar data och omvandlar det till json som sedan sparar det
async function getData() {
  const response = await fetch("https://majazocom.github.io/Data/solaris.json");
  const data = await response.json();
  return data;
}

// Hämtar planetinformation från det externa API:et
// Hämtar alla element med klassen "planet" och solen separat
// Loopa igenom alla himlakroppar (planeter och solen) och sätter en eventlistener på varje
// Hämtar namnet på den klickade himlakroppen från dess CSS-klass
// Söker efter information om den klickade himlakroppen i den hämtade datan
// Fyller popup-elementet med information om den klickade himlakroppen
// Sätter en eventlistener på popup-elementet för att stänga det när användaren klickar på krysset
async function run() {
  const planetInformation = await getData();
  console.log(planetInformation);

  const planets = document.querySelectorAll(".planet");
  const sun = document.querySelector(".sun");
  const celestialBodies = [...planets, sun];

  celestialBodies.forEach((planet) =>
    planet.addEventListener("click", async () => {
      const planetName = planet.classList[1] || planet.classList[0];

      const planetData = planetInformation.find(
        (p) => nameMap[p.name] === planetName
      );

      const popup = document.querySelector(".popup");

      popup.innerHTML = `
        <div class = "flexContainer">
            <button class="closeButton" id="closeButton">&times;</button>
            <h1 class = "name">${planetData.name}</h1>
            <h3 class = "latinName">${planetData.latinName}</h3>
            <p class = "description">${planetData.desc}</p>
            <div class = "group 1">
            <p class = "info circumference">OMKRETS</br>${planetData.circumference.toLocaleString()}</p>
            <p class = "info distance">KM FRÅN SOLEN</br>${planetData.distance.toLocaleString()}</p>
            </div>
            <div class = "group 2">
            <p class = "info maxTemp">MAX TEMPERATUR</br>${
              planetData.temp.day
            }</p>
            <p class = "info minTemp">MIN TEMPERATUR</br>${
              planetData.temp.night
            }</p>
            </div>
            <p class = "info moons">MÅNAR</br>${planetData.moons.join(", ")}</p>
        </div>
      `;

      createStars();

      popup.style.display = "flex";

      popup.addEventListener("click", function (event) {
        if (event.target === closeButton) {
          popup.style.display = "none";
        }
      });
    })
  );
}

run();

// Funktionen skapar en ny div i .popup som genererar stjärnor och placerar ut dem slumpmäsigt
function createStars() {
  const popup = document.querySelector(".popup");
  for (let i = 0; i < 100; i++) {
    const stars = document.createElement("div");
    stars.className = "stars";
    stars.style.left = `${Math.random() * 100}%`;
    stars.style.top = `${Math.random() * 100}%`;
    popup.appendChild(stars);
  }
}
