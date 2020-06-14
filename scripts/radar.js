// Funkcija za crtanje radarskog grafa
// Parametri: skup podataka o voću, ID voća koji se vizualizira, te fruitNum (označava poziciju na
// stranici, ako je lijevo, onda je 1, ako je desno onda je 2)
function drawAll(data, id, fruitNum, maxValue) {
  // margine, visina i širina radara
  var marginRadar = {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100,
    },
    widthRadar = 500,
    heightRadar = 500;



  // Inicijalizacija polja podataka za voće koji se vizualizira
  fruitData[fruitNum - 1] = [];

  // Ako se prvo odabire crtanje voća na desnoj strani (drugo voće), podaci
  // za prvog voća se postavljaju na 0 zbog načina na koji je biblioteka napisana
  if (fruitNum == 2 && fruitData[0].length == 0) {
    for (key in allowedKeys) {
      fruitData[0].push({
        axis: allowedKeys[key],
        value: 0,
      });
    }
  }
  // Formatiranje podataka kako bi se mogla koristiti RadarChart biblioteka
  for (key in allowedKeys) {
    fruitData[fruitNum - 1].push({
      axis: allowedKeys[key],
      value: data.find((element) => element.name == id.name)[allowedKeys[key]],
    });
  }

  // Definiranje boja za radarski graf
  var colorRadar = d3.scale.ordinal().range(["#9D090150", "#09099950"]);

  // Definiranje opcija za radarski graf
  var radarChartOptions = {
    w: widthRadar,
    h: heightRadar,
    margin: marginRadar,
    maxValue: maxValue,
    levels: 6,
    roundStrokes: false,
    color: colorRadar,
  };

  // Crtanje radarskog grafa i stupčastog grafa
  // IZVORI:
  // http://bl.ocks.org/nbremer/21746a9668ffdf6d8242
  // https://gist.github.com/nbremer/21746a9668ffdf6d8242
  // https://www.visualcinnamon.com/2015/10/different-look-d3-radar-chart.html
  RadarChart(".radarChart", fruitData, radarChartOptions);
}

//Funkcija za pronalaženje ID-ja voća u ovisnosti o predanom imenu
function findfruitByName(name, data) {
  return data.find((obj) => obj.name == name);
}
