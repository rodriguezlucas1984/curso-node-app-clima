const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      { value: 1, name: `${"1".magenta}. Buscar ciudad` },
      { value: 2, name: `${"2".magenta}. Historial` },
      { value: 0, name: `${"0".magenta}. Salir` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("======================================".green);
  console.log("       Seleccione una opción".white);
  console.log("======================================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ]);
  console.log("\n");
  return true;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        } else {
          return true;
        }
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, index) => {
    return {
      value: lugar.id,
      name: (++index + ". ").green + lugar.nombre,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Seleccione el lugar:",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmar = async (mensaje) => {
  const pregunta = {
    type: "confirm",
    name: "ok",
    message: mensaje,
  };
  const { ok } = await inquirer.prompt(pregunta);
  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
};
