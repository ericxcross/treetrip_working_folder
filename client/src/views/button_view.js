const PubSub = require("../helpers/pub_sub.js");

const ButtonView = function(button) {
  this.button = button;
};

ButtonView.prototype.bindEvents = function () {
  this.button.addEventListener("click", evt => {
    PubSub.publish("FormView:RequestData");
    PubSub.publish("ClearElement");
  });
};

module.exports = ButtonView;
