export function errorAlert(error){
    const main = document.querySelector('main');

    const alertElem = document.createElement('p');

    alertElem.textContent = `${error}`;
    alertElem.classList = 'alertError';

    main.prepend(alertElem);
}