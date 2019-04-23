const ButtonView = require("./views/button_view.js")
const FormView = require("./views/form_view.js");
const ResultTotalView = require("./views/result_total_view.js");
const CarbonCounter = require("./models/carboncounter.js"); //CHECK IF CORRECT

document.addEventListener("DOMContentLoaded", () => {
  const buttonElement = document.querySelector("#form-button");
  const buttonView = new ButtonView(buttonElement);
  buttonView.bindEvents();

  const formElement = document.querySelector("form#carbon-form");
  const formView = new FormView(formElement);
  formView.bindEvents();

  const resultTotalElement = document.querySelector("div#result-total");
  const resultTotalView = new ResultTotalView(resultTotalElement);
  resultTotalView.bindEvents();

  const carbonCounter = new CarbonCounter();
  carbonCounter.bindEvents();
});
