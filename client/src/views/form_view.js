const PubSub = require("../helpers/pub_sub.js");

const FormView = function(form) {
  this.form = form;
  this.currentItems = {};
};

FormView.prototype.bindEvents = function() {
  PubSub.subscribe("CarbonCounter:DataFound", evt => {
    this.render(evt.detail);
  });
};

FormView.prototype.render = function(formData) {
  this.form.innerHTML = "";
  this.currentItems = {};

  let idNum = 0;

  const action = (filteredData) => {
    idNum ++;
    if (filteredData.type !== undefined) {
      const newSelect = this.createSelect( filteredData, idNum );
      newSelect.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'})
      newSelect.addEventListener("change", evt => {
        const selectIdNum = parseInt(evt.target.classList[0].slice(7));
        if (idNum > selectIdNum){
          for (var i = selectIdNum; i < idNum; i++) {
            const redundantSelect = document.querySelector(`.select-${i + 1}`);
            if (redundantSelect !== null) {
              delete this.currentItems[redundantSelect.id];
              redundantSelect.remove();
            }
          }
          idNum = selectIdNum;
        }
        const selectedData = JSON.parse(evt.target.value);
        this.currentItems[filteredData.typename] = selectedData.name;
        this.currentItems.co2e = selectedData.co2e;
        action(selectedData);
      });
    }else{
      const submit = this.createSubmitInput(idNum);

      submit.addEventListener("click", evt => {
        console.log(this.currentItems)
        this.handleSubmit(evt);
      });
    }
  };

  action(formData[0]);
};

FormView.prototype.createSelect = function(formData, idNum) {
  //CREATE FIELDSET
  const fieldset = document.createElement("div");
  fieldset.classList.add(`select-${idNum}`);
  fieldset.classList.add(`selectcontainer`);
  fieldset.id = formData.typename;

  //DIV TITLE
  const h2 = document.createElement('h2');
  h2.innerHTML = "Choose a " + textParse(formData.typename);
  fieldset.appendChild(h2);

  //CREATE RADIO BUTTONS FOR EACH ITEM
  formData.type.forEach((item) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.name;
    input.classList.add(`select-${idNum}`);
    input.name = formData.typename;
    input.value = JSON.stringify(item);

    fieldset.appendChild(input);
    fieldset.innerHTML += `
      <label for=${item.name} class="radiolabel button">
        <image class="radioimage" src=${item.image}><br>${textParse(item.name)}</label>
    `;
  });

  this.form.appendChild(fieldset);

  return fieldset;
};

FormView.prototype.createSubmitInput = function(idNum) {

  const inputDiv = document.createElement('div');
  inputDiv.classList.add(`select-${idNum}`);
  inputDiv.classList.add(`distancecontainer`);

  const inputLabel = document.createElement("h2");
  inputLabel.innerHTML = 'Distance Travelled (km)';
  inputDiv.appendChild(inputLabel);

  const distanceInput = this.createDistanceField(idNum);
  inputDiv.appendChild(distanceInput);

  distanceInput.addEventListener("input", evt=>{
    this.currentItems['distance'] = evt.target.value;
  });

  const submit = this.createSubmitButton(idNum);
  inputDiv.appendChild(submit);

  this.form.appendChild(inputDiv);

  inputDiv.scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center'})

  return submit;
};

FormView.prototype.createDistanceField = function(idNum) {
  const distanceInput = document.createElement("input");
  distanceInput.type = "number";
  distanceInput.name = "distance";
  distanceInput.min = 0;
  distanceInput.step = 1;
  distanceInput.placeholder = "enter distance travelled in kilometres"
  distanceInput.classList.add(`select-${idNum}`);

  return distanceInput;
};

FormView.prototype.createSubmitButton = function(idNum) {
  const submit = document.createElement("input");
  submit.id = "submitbutton";
  submit.type = "submit";
  submit.value = "calculate trip impact";
  submit.classList.add(`select-${idNum}`);
  submit.classList.add(`button`);
  return submit;
};

FormView.prototype.handleSubmit = function(evt) {
  evt.preventDefault();
  PubSub.publish('FormView:TripDetails', this.currentItems);
};

const textParse = function(text){
  return text.split("_").join(" ")
}

module.exports = FormView;
