import axios from "axios";
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


const response = await axios.get(API_URL)
const price = response.data.bitcoin.brl

log(formatCurrency(price))