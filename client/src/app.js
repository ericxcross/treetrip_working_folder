const ButtonView = require("./views/button_view.js");
const RedoButtonView = require("./views/redo_button_view.js")
const FormView = require("./views/form_view.js");
const ResultTotalView = require("./views/result_total_view.js");
const CarbonCounter = require("./models/carboncounter.js");
const ResultAltView = require("./views/result_alternatives_view.js");
const SummaryView = require("./views/summary_view.js");
const BackgroundView = require("./views/background_view.js");

document.addEventListener("DOMContentLoaded", () => {
  const buttonElement = document.querySelector("#form-button");
  const buttonView = new ButtonView(buttonElement);
  buttonView.bindEvents();

  const redoButtonElement = document.querySelector("#redo-form-button");
  const redoButtonView = new RedoButtonView(redoButtonElement);
  redoButtonView.bindEvents();

  const resultAltElement = document.querySelector("div#alternatives");
  const resultAltView = new ResultAltView(resultAltElement);
  resultAltView.bindEvents();

  const formElement = document.querySelector("form#carbon-form");
  const formView = new FormView(formElement);
  formView.bindEvents();

  const resultTotalElement = document.querySelector("div#result-total");
  const resultTotalView = new ResultTotalView(resultTotalElement);
  resultTotalView.bindEvents();

  const summaryElement = document.querySelector("div#summary-view");
  const summaryView = new SummaryView(summaryElement);
  summaryView.bindEvents();

  const carbonCounter = new CarbonCounter();
  carbonCounter.bindEvents();

  const bodyElement = document.querySelector("body");
  const backgroundView = new BackgroundView(bodyElement);
  backgroundView.bindEvents();
});
