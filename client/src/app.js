const FormView = require("./views/form_view.js");
const ResultTotalView = require("./views/result_total_view.js");
const CarbonCounter = require("./models/carboncounter.js");
const ResultAltView = require("./views/result_alternatives_view.js");

document.addEventListener("DOMContentLoaded", () => {
  const resultAltElement = document.querySelector("div#alternatives");
  const resultAltView = new ResultAltView(resultAltElement);
  resultAltView.bindEvents();

  const formElement = document.querySelector("form#carbon-form");
  const formView = new FormView(formElement);
  formView.bindEvents();

  const resultTotalElement = document.querySelector("div#result-total");
  const resultTotalView = new ResultTotalView(resultTotalElement);
  resultTotalView.bindEvents();

  const carbonCounter = new CarbonCounter();
  carbonCounter.bindEvents();
  carbonCounter.getData();
});
