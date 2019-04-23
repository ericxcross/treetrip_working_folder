const PubSub = require("../helpers/pub_sub.js");

const ButtonView = function(button) {
  this.button = button;
};

ButtonView.prototype.bindEvents = function () {
  this.button.addEventListener("click", evt => {
    console.log('this happened')
    PubSub.publish("FormView:RequestData");
  });
};

module.exports = ButtonView;
