const PubSub = require("../helpers/pub_sub.js");

const FormView = function(form) {
  this.form = form;
};

FormView.prototype.bindEvents = function() {
  this.form.addEventListener("load", evt => {
    PubSub.publish("FormView:RequestData");
  });
  PubSub.subscribe("CarbonCounter:DataFound", evt => {
    this.render(evt.detail);
  });
};

FormView.prototype.render = function(formData) {
  this.form.innerHTML = "";

  let id = 0;
  let idString;

  const action = (filteredData) => {
    id ++;
    if (filteredData.type !== undefined) {
      idString = "s"+id;
      const newSelect = this.createSelect( filteredData.type, idString );
      this.form.appendChild(newSelect);
      newSelect.addEventListener("change", evt => {
        selectIdNum = parseInt(evt.srcElement.id.slice(1));
        if (id > selectIdNum){
          for (var i = selectIdNum; i < id; i++) {
            const redundantSelect = document.querySelector(`#s${i+1}`);
            redundantSelect.remove();
          }
        }
        action(filteredData.type[evt.target.value]);
      });
    }else{
      const distanceInput = document.createElement("input");
      distanceInput.type = "number";
      distanceInput.min = 0;
      distanceInput.step = 1;
      distanceInput.value = 0;
      distanceInput.id = "s"+id
      this.form.appendChild(distanceInput);

      id++;
      const submit = document.createElement("input");
      submit.type = "submit";
      submit.value = "Calculate";
      submit.id  = "s"+(id);
      this.form.appendChild(submit);
      submit.addEventListener("click", evt => {
        evt.preventDefault();
        console.dir(evt.target);
        PubSub.publish('FormView:TripDetails', evt.target);
      })
    }
  };

  action(formData[0]);
};

FormView.prototype.createSelect = function(formData, id) {
  const selectElement = document.createElement("select");
  selectElement.id = id;

  const option = document.createElement("option");
  selectElement.appendChild(option);

  formData.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerHTML = item.name;
    selectElement.appendChild(option);
  });

  return selectElement;
};

// FormView.prototype.handleSubmit = function(evt) {
//   evt.preventDefault();
//   PubSub.publish("FormView:form-submitted", evt.target);
// };

module.exports = FormView;
