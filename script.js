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

// Huvudfunktion som körs när sidan laddas
async function run() {
  // Hämta planetinformation från det externa API:et
  const planetInformation = await getData();
  console.log(planetInformation);

  // Hämta alla element med klassen "planet" och solen separat
  const planets = document.querySelectorAll(".planet");
  const sun = document.querySelector('.sun');
  const celestialBodies = [...planets, sun];

  // Loopa igenom alla himlakroppar (planeter och solen) och sätter en eventlistener på varje
  celestialBodies.forEach((planet) =>
    planet.addEventListener("click", async () => {
      // Hämta namnet på den klickade himlakroppen från dess CSS-klass
      const planetName = planet.classList[1] || planet.classList[0];

      // Sök efter information om den klickade himlakroppen i den hämtade datan
      const planetData = planetInformation.find(
        (p) => nameMap[p.name] === planetName
      );

      // Hämta popup-elementet från HTML
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

      // Visa popup-elementet genom att ändra dess display-stil till "flex"
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

// Kör huvudfunktionen när sidan laddas
run();