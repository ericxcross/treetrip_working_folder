const PubSub = require("../helpers/pub_sub.js");

const RedoButtonView = function(button) {
  this.button = button;
};

RedoButtonView.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:TripDetails', evt=>{
    console.log('occured');
    this.render();
    this.button.addEventListener("click", evt => {
      PubSub.publish("FormView:RequestData");
      PubSub.publish("ClearElement");
    });
  });
  PubSub.subscribe("ClearElement", (evt)=>{
    this.button.innerHTML = ''
  });
};

RedoButtonView.prototype.render = function () {
  this.button.innerHTML = `
  <div id="bottom-form-button" class="button">
    <h2>Check Another Trip</h2>
  </div>
  `;
};

module.exports = RedoButtonView;
