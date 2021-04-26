let mainInput = document.getElementById('txtInput');
let resultInput = document.getElementById('txtResult');

function AddText(textToAdd) {
  mainInput.value += textToAdd;
}

function ExecuteCalculation() {
  resultInput.value = eval(mainInput.value);
}

function ClearAll() {
  mainInput.value = '';
  resultInput.value = '';
}

function ClearLast() {
  if (mainInput.value.length >= 1) {
    mainInput.value = mainInput.value.substring(0, mainInput.value.length - 1)
  }
}