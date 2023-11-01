fetch('https://majazocom.github.io/Data/solaris.json')
    .then(res => res.json())
    .then (data => console.table(data))
    .catch(error => console.log("ERROR"))