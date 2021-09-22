require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");

const Busquedas = require("./models/busquedas");
const main = async () => {
  const busquedas = new Busquedas();
  let opc;
  do {
    opc = await inquirerMenu();
    switch (opc) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad: ");
        //Buscar lugares
        const lugares = await busquedas.ciudad(termino);
        //Seleccionar el lugar
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((l) => l.id === id);
        //Hay lugares?
        if (lugarSel) {
          //Grabar en DB
          busquedas.agregarHistorial(lugarSel.nombre);
          busquedas.guardarDB();
          //Clima
          const clima = await busquedas.climaLugar(lugarSel.lng, lugarSel.lat);
          //Mostrar resultados
          let resultado = "\n";
          resultado += "Información de la ciudad".green + "\n";
          resultado += " - Ciudad: " + lugarSel.nombre.cyan + "\n";
          resultado += " - Longitud: " + lugarSel.lng.toString().cyan + "\n";
          resultado += " - Latitud: " + lugarSel.lat.toString().cyan + "\n";
          resultado += " - Como esta el clima: " + clima.desc.cyan + "\n";
          resultado += " - Minima: " + clima.min.toString().cyan + "\n";
          resultado += " - Maxima: " + clima.max.toString().cyan + "\n";
          resultado += " - Actual: " + clima.temp.toString().cyan + "\n";

          console.log(resultado);
        }

        break;
      case 2:
        busquedas.historialCapitalizado.forEach((termino, index) => {
          console.log(("\t" + ++index + ". ").green + termino.cyan);
        });
        break;
    }
    if (opc !== 0) {
      await pausa();
    }
  } while (opc !== 0);
};

main();
