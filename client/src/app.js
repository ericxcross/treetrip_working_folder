const FormView = require("./views/form_view.js");
const ResultTotalView = require("./views/result_total_view.js");
const CarbonCounter = require("./models/CarbonCounter.js"); //CHECK IF CORRECT

document.addEventListener("DOMContentLoaded", () => {
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
