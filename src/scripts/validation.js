// todo: fix jumping display

export function clearValidation() {};

// Function to add class with error
const showInputError = (formElement, inputElement, errorMessage) => {
  // to find element with error inside form
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.remove('hidden');
};

// Function to remove class with error
const hideInputError = (formElement, inputElement) => {
  // to find element with error inside form
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove('popup__input-error');
  errorElement.classList.add('hidden');
  errorElement.textContent = '';
};

// Function to check input validity
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле");
  }
  else if (inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity("Введите ссылку");
  }
  else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) { 
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } 
  else {
    hideInputError(formElement, inputElement);
  }
};

// Function to check if every input is valid
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // If some input is invalid, this will be true and stop the function
    return !inputElement.validity.valid;
  })
}; 

// Function to make button active or not
const toggleButtonState = (inputList, buttonElement) => {
  // if any input is invalid, diable the button
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button-inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button-inactive');
  }
}; 

// Function to add listeners to each form's input
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button'); 
  if (formElement.name == "new-place") toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Function to add listeners for every form
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};