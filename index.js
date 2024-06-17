import axios from "axios";
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { API_URL } from "./services/api.js";

const log = console.log;

// Native method from JS to format numbers in respectives currencies (USD, EUR, YEN, BRL, ETC...).

const formatCurrency = price => {
  let formatBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return formatBRL;
};

// Async function with error handling to get latest Bitcoin Price. Using axios to fetch data.

async function getLastestBtcPrice() {
  try {
    const responseData = await axios.get(API_URL);
    const lastestPrice = await responseData.data.bitcoin.brl;
    return lastestPrice;
  } catch (error) {
    log("Failed Request.", error);
  }
}

// Function to display price, using some libs to stylized

async function dipslayPrice() {
  clear();
  log(
    chalk.yellow(
      figlet.textSync("Bitcoin Tracker", {
        font: "Standard",
      })
    )
  );

  const price = await getLastestBtcPrice();
  // Return the price already formatted in BRL patterns

  if (price) {
    log(chalk.green(`Atual preço do Bitcoin: ${formatCurrency(price)}`));
  } else {
    log(chalk.red("Failed to fetch Bitcoin Price"));
  }
}

const startApp = async () => {
  // Give all options to user select answers.

  const displayAnswersOptions = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Selecione uma das opções abaixo.",
      choices: ["Obter preço atual", "Sair"],
    },
  ]);

  // Condicional to show results

  if (displayAnswersOptions.action === "Obter preço atual") {
    dipslayPrice();
  } else {
    log(chalk.yellow("Finalizado."));
  }
};

startApp();
