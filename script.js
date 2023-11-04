// Namnen från api är på svenska så vi måste översätta med hjälp av index
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

async function getData() {
  const response = await fetch("https://majazocom.github.io/Data/solaris.json");
  const data = await response.json();
  return data;
}

async function run() {
  const planetInformation = await getData();
  console.log(planetInformation);

  // Hämta alla planeter
  const planets = document.querySelectorAll(".planet");
  const sun = document.querySelector('.sun');
  const celestialBodies = [...planets, sun];

  // Loopa planeterna och sätt en eventlistener
  celestialBodies.forEach((planet) =>
  planet.addEventListener("click", async () => {
      const planetName = planet.classList[1] || planet.classList[0];
      const planetData = planetInformation.find(
        (p) => nameMap[p.name] === planetName
      );

      const popup = document.querySelector(".popup");

      popup.innerHTML = `
          <button class="closeButton" id="closeButton">&times;</button>
          <h1 class = "name">${planetData.name}</h1>
          <h3 class = "latinName">${planetData.latinName}</h3>
          <p class = "description">${planetData.desc}</p>
          <p class = "info circumference">OMKRETS</br>${planetData.circumference.toLocaleString()}</p>
          <p class = "info distance">KM FRÅN SOLEN</br>${planetData.distance.toLocaleString()}</p>
          <p class = "info maxTemp">MAX TEMPERATUR</br>${planetData.temp.day}</p>
          <p class = "info minTemp">MIN TEMPERATUR</br>${planetData.temp.night}</p>
          <p class = "info moons">MÅNAR</br>${planetData.moons.join(", ")}</p>
          `;

      popup.style.display = "grid";
      popup.addEventListener("click", function (event) {
        if (event.target === closeButton) {
          popup.style.display = "none";
        }
      });
    })
  );
}

run();