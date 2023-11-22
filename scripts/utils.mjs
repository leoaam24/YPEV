import validateEmail from "../externalRequest.mjs";

const userInput = document.querySelector('#user-input');

export function validateButton() {
    const validateButton = document.querySelector('#validateBtn');

    validateButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('validate button function works');
        validateEmail(userInput.value);
    })
}