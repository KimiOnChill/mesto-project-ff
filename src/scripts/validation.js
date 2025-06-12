// Function to add class with error
const showInputError = (formElement, inputElement, errorMessage, config) => {
  // to find element with error inside form
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.remove(config.hiddenClass);
};

// Function to remove class with error
export const clearValidation  = (formElement, inputElement, config) => {
  // to find element with error inside form
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove(config.errorClass);
  errorElement.classList.add(config.hiddenClass);
  errorElement.textContent = '';
};

// Function to check input validity
const isValid = (formElement, inputElement, config) => {
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
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } 
  else {
    clearValidation(formElement, inputElement, config);
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
const toggleButtonState = (inputList, buttonElement, config) => {
  // if any input is invalid, diable the button
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}; 

// Function to add listeners to each form's input
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(`${config.inputClass}`));
  const buttonElement = formElement.querySelector(`${config.submitButtonClass}`); //if (formElement.name == "new-place") 
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Function to add listeners for every form
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(`${config.formClass}`));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};