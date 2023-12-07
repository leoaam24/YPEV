import { errorAlert } from "./alert.js";
import validateEmail from "./externalRequest.mjs";

const userInput = document.querySelector('#user-input');

export function validateButton() {
    const validateButton = document.querySelector('#validateBtn');
    const validateForm = document.querySelector('#ypevForm');

    validateForm.addEventListener('submit', async (e) => {
        try {
        e.preventDefault();
        const validateResult = await validateEmail(userInput.value);
        sessionStorage.setItem('inputEmail', validateResult.email);
        sessionStorage.setItem('deliverability', validateResult.deliverability);
        sessionStorage.setItem('validFormat', validateResult.is_smtp_valid.text);
        sessionStorage.setItem('isDisposable', validateResult.is_disposable_email.text);
        sessionStorage.setItem('isCatchAll', validateResult.is_catchall_email.text);
        window.location.href = "/result/result.html";
        } catch (err) {
            errorAlert(err);
        }
        

    })

}

export function loadTemplates(path){
    return async function() {
        const response = await fetch(path);
        if (response.ok) {
            const html = await response.text();
            return html;
        }
    }
}

export function showResult(){
    const emailPlaceHolder = document.querySelector('#email-placeholder');
    const resultPlaceHolder = document.querySelector('#result-placeholder');
    const resultDetails = document.querySelector('.result-details');
    const button = document.querySelector('#validateAgain');

    emailPlaceHolder.textContent = sessionStorage.getItem('inputEmail');

    document.body.style.backgroundColor = `${localStorage.getItem('userColor')}`;
    button.style.color = `${localStorage.getItem('userColor')}`;
    
    if ((sessionStorage.getItem('deliverability') === 'DELIVERABLE')) {
        resultPlaceHolder.textContent = "DELIVERABLE";
    } else {
        resultPlaceHolder.textContent = "NOT DELIVERABLE";
    }

    let detail_1 = document.createElement('li');
    let detail_2 = document.createElement('li');
    let detail_3 = document.createElement('li');

    detail_1.textContent = `CatchAll Type: ${sessionStorage.getItem('isCatchAll')}`;
    detail_2.textContent = `Disposable Type: ${sessionStorage.getItem('isDisposable')}`;
    detail_3.textContent = `Valid Format: ${sessionStorage.getItem('validFormat')}`;

    resultDetails.appendChild(detail_1);
    resultDetails.appendChild(detail_2);
    resultDetails.appendChild(detail_3);

    sessionStorage.clear();
    validateAgain();
}

export async function loadHeaderFooter(){
    const headerTemplate = loadTemplates("/templates/header.html");
    const footerTemplate = loadTemplates("/templates/footer.html");

    const headerTag = document.querySelector('header');
    const footerTag = document.querySelector('footer');
    
    headerTag.innerHTML = await headerTemplate();
    footerTag.innerHTML = await footerTemplate();

    updateDates();
    bgColorSwitch();

}

function validateAgain() {
    const validateAgainBtn = document.querySelector('#validateAgain');

    validateAgainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/index.html';
    })
}

function updateDates() {
    const currentDate = new Date();

    const timeStamp = Math.floor(new Date().getTime() / 1000);

    const currentYear = currentDate.getFullYear();

    const yearPlaceHolder = document.querySelector('.currentYear');
    const lastModifiedPlaceHolder = document.querySelector('.lastModified');
    yearPlaceHolder.textContent = currentYear;
    

    if ((localStorage.getItem('lastVisitStamp'))) {
        
        lastModifiedPlaceHolder.textContent = `${localStorage.getItem('lastVisitStamp')}`;
    } else {
        localStorage.setItem('lastVisitStamp', timeStamp);
        lastModifiedPlaceHolder.textContent = "This is Your First Visit";
    }

    localStorage.setItem('lastVisitStamp', currentDate);
}

function bgColorSwitch(){
    const colorSwatch = document.querySelector('.colorSwatch');
    const button = document.querySelector('#validateBtn');

    colorSwatch.oninput = () => {
        document.body.style.backgroundColor = colorSwatch.value;
        button.style.color = colorSwatch.value;
        localStorage.setItem('userColor', `${colorSwatch.value}`);
    } 
}

