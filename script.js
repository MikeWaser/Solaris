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

// Funktion som hämtar data från det externa API:et
async function getData() {
  const response = await fetch("https://majazocom.github.io/Data/solaris.json");
  const data = await response.json();
  return data;
}

// Funktion som körs när sidan laddas
// Hämta planetinformation från det externa API:et
async function run() {

  const planetInformation = await getData();
  console.log(planetInformation);

  // Hämta alla element med klassen "planet" och solen separat
  const planets = document.querySelectorAll(".planet");
  const sun = document.querySelector('.sun');
  const celestialBodies = [...planets, sun];

  // Loopa igenom alla himlakroppar (planeter och solen) och sätter en eventlistener på varje
  // Hämta namnet på den klickade himlakroppen från dess CSS-klass
  celestialBodies.forEach((planet) =>
    planet.addEventListener("click", async () => {
      
      const planetName = planet.classList[1] || planet.classList[0];

      // Sök efter information om den klickade himlakroppen i den hämtade datan
      const planetData = planetInformation.find(
        (p) => nameMap[p.name] === planetName
      );

      const popup = document.querySelector(".popup");

      // Fyll popup-elementet med information om den klickade himlakroppen
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
            <p class = "info maxTemp">MAX TEMPERATUR</br>${planetData.temp.day}</p>
            <p class = "info minTemp">MIN TEMPERATUR</br>${planetData.temp.night}</p>
            </div>
            <p class = "info moons">MÅNAR</br>${planetData.moons.join(", ")}</p>
        </div>
      `;

      createStars();

      popup.style.display = "flex";

      // Sätt en eventlistener på popup-elementet för att stänga det när användaren klickar någonstans
      popup.addEventListener("click", function (event) {
        if (event.target === closeButton) {
          popup.style.display = "none";
        }
      });
    })
  );
}

// Kör funktionen när sidan laddas
run();

// 
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