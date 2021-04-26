let animalInput = document.getElementById('animal');
let dishInput = document.getElementById('dish');
let msgElement = document.getElementById('msg');

function CheckInput() {
  // It is necessary to use toLowerCase() since 'G' is not equal to 'g' in JS
  let firstAnimalLetter = animalInput.value.substring(0, 1).toLowerCase();
  let lastAnimalLetter = animalInput.value.substring(animalInput.value.length - 1, animalInput.value.length).toLowerCase();
  let firstDishLetter = dishInput.value.substring(0, 1).toLowerCase();
  let lastDishLetter = dishInput.value.substring(dishInput.value.length - 1, dishInput.value.length).toLowerCase();

  if (firstAnimalLetter == firstDishLetter) {
    if (lastAnimalLetter == lastDishLetter) {
      TextMsg('success', `${dishInput.value} is a valid dish for ${animalInput.value}`);
    } else {
      TextMsg('error', `Last letter of Animal (${lastAnimalLetter}) does not match last letter of dish (${lastDishLetter})`);
    }
  } else {
    TextMsg('error', `First letter of Animal (${firstAnimalLetter}) does not match first letter of dish (${firstDishLetter})`);
  }
}

function TextMsg(type, msg) {
  switch (type) {
    case 'success':
      msgElement.innerText = msg
      msgElement.style.color = 'green';
      break;
    case 'error':
      msgElement.innerText = msg
      msgElement.style.color = 'red';
      break;
    default:
      msgElement.innerText = msg
      msgElement.style.color = 'black';
      break;
  }
}

// Take animal input
// check if last and first letter
// matches first and last letter of dish input
