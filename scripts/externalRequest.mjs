export default async function validateEmail(userInput) {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=615d062452d14bf4b31329e804332459&email=${userInput}`;
    const options = {method: 'GET'};

   const response = await fetch(url, options)
  .then(response => response.json())
  .catch(err => console.error(err));

  return response
}