/*
fetch('https://majazocom.github.io/Data/solaris.json')
    .then(res => res.json())
    .then (data => console.table(data))
    .catch(error => console.log("ERROR"))
*/

let solarisData;

fetch('https://majazocom.github.io/Data/solaris.json')
  .then(response => response.json())
  .then(data => {
    solarisData = data;

    console.table(solarisData);

    solarisData.forEach(planet => {
      console.log(`Planet namn: ${planet.name}`);
    });
  })
  .catch(error => {
    console.error('Något gick fel:', error);
  });