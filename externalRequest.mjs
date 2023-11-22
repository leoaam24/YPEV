export default async function validateEmail(userInput) {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=6ad91d8c53604f6db790eca68a523265&email=${userInput}`
    const options = {method: 'GET'};

   const response = await fetch(url, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

  return response;
}