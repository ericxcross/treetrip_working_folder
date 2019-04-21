const PubSub = require("../helpers/pub_sub.js");

const FormView = function(form) {
  this.form = form;
  this.currentItems = {};
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

  let idNum = 0;

  const action = (filteredData) => {
    idNum ++;
    if (filteredData.type !== undefined) {
      const newSelect = this.createSelect( filteredData, idNum );
      newSelect.addEventListener("change", evt => {
        const selectIdNum = parseInt(evt.srcElement.classList[0].slice(7));
        if (idNum > selectIdNum){
          for (var i = selectIdNum; i < idNum; i++) {
            const redundantSelect = document.querySelector(`.select-${i+1}`);
            if (redundantSelect !== null){
              delete this.currentItems[redundantSelect.id];
              redundantSelect.remove();
            }
          }
          idNum = selectIdNum;
        }
        const selectedData = JSON.parse(evt.target.value);
        this.currentItems[filteredData.typename] = selectedData.name;
        if (selectedData.c02e !== undefined){this.currentItems['co2e'] = selectedData.co2e;};
        action(selectedData);
      });
    }else{
      const newDistanceInput = this.createDistanceInput(idNum)
      idNum++;
      const submit = this.createSubmit(idNum);

      submit.addEventListener("click", evt => {
        this.handleSubmit(evt);
      })

    }
  };

  action(formData[0]);
};

FormView.prototype.createSelect = function(formData, idNum) {
  const selectDiv = document.createElement('div');
  selectDiv.classList.add(`select-${idNum}`);
  selectDiv.id = formData.typename;

  const selectElement = document.createElement("select");
  selectElement.classList.add(`select-${idNum}`);

  const selectLabel = document.createElement("label");
  selectLabel.for = selectElement.id;
  selectLabel.innerHTML = `${formData.typename.split("-").join(" ")}:`;

  const option = document.createElement("option");
  option.value = '';
  selectElement.appendChild(option);

  formData.type.forEach((item) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(item);
    option.innerHTML = item.name;
    selectElement.appendChild(option);
  });

  selectDiv.appendChild(selectLabel);
  selectDiv.appendChild(selectElement);

  this.form.appendChild(selectDiv);

  return selectElement;
};

FormView.prototype.createDistanceInput = function(idNum) {
  const inputDiv = document.createElement('div');
  inputDiv.classList.add(`select-${idNum}`);
  inputDiv.id = "distance-travelled"

  const inputLabel = document.createElement("label");
  inputLabel.for = "distanceTravelled";
  inputLabel.innerHTML = 'Distance Travelled';

  const distanceInput = document.createElement("input");
  distanceInput.type = "number";
  distanceInput.name = "distanceTravelled"
  distanceInput.min = 0;
  distanceInput.step = 1;
  distanceInput.classList.add(`select-${idNum}`);

  inputDiv.appendChild(inputLabel);
  inputDiv.appendChild(distanceInput);

  this.form.appendChild(inputDiv);

  return distanceInput;
};

FormView.prototype.createSubmit = function(idNum) {
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.name = "Calculate";
  submit.classList.add(`select-${idNum}`);
  this.form.appendChild(submit)
  return submit;
};

FormView.prototype.handleSubmit = function(evt) {
  evt.preventDefault();
  this.currentItems['distance-travelled'] = evt.target.form.distanceTravelled.value;
  PubSub.publish('FormView:TripDetails', this.currentItems);
};

module.exports = FormView;
