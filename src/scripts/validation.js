// todo: fix jumping display
// todo: fix validity messages
export function clearValidation() {};

// to add class with error
const showInputError = (formElement, inputElement, errorMessage) => {
  // to find element with error inside form
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.remove('hidden');
};

// to remove class with error
const hideInputError = (formElement, inputElement) => {
  // to find element with error inside form
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove('popup__input-error');
  errorElement.classList.add('hidden');
  errorElement.textContent = '';
};

// checks input validity
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // to replace default validation message, when no data attribute
    inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
    // to replace default validation message, when there is data attribute
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else if (inputElement.validity.rangeUnderflow) {
    inputElement.setCustomValidity(`Минимальное количество символов: ${inputElement.minlength}`);//!check
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else if (inputElement.validity.rangeOverflow) {
    inputElement.setCustomValidity(`Минимальное количество символов: ${inputElement.maxlength}`);//!check
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
    // to allow default validation message
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // if invalidity is caused by regex,
    // var 'validationMessage' will contain custom error message 
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } 
  else {
    hideInputError(formElement, inputElement);
  }
}; 

// One eventListener will find only the first form.
// So there is a function to add listeners to each from's input.
const setEventListeners = (formElement) => {
  // search for every input inside form and create array
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  //search for buttons
  const buttonElement = formElement.querySelector('.popup__button'); 
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    // Call isValid for every symbol typed in input
    inputElement.addEventListener('input', () => {
      // Callback has form and element to check
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Adding listeners for every form
export function enableValidation() {
  // Search for every form with given class in DOM and create an array
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Function  to check if every input is valid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // If some input is invalid, this will be true and stop the function
    return !inputElement.validity.valid;
  })
}; 

// Function to make button active or not
const toggleButtonState = (inputList, buttonElement) => {
  // if one input is invalid, diable the button
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('.popup__button-inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('.popup__button-inactive');
  }
}; 