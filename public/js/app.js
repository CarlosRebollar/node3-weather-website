const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});

/**
 * Goal: Fetch weather!
 *
 * 1. Setup a call to fetch weather for Guadalajara
 * 2. Get the pare JSON respone
 *  - If error property, print error
 *  - if no error property, print location and forecast
 * 3. Test your work
 */

/**
 * Goal: Use input value to get weather
 *
 * 1. Migrate fetch call into the submit callback
 * 2. Use the search text as the address query string value
 * 3. Submit the form with a valid and invalid value for test
 */

/**
 * Goal: Render content to paragraphs
 *
 * 1. Select the second message p from JavaScript
 * 2. Just before fetch, render laoding message and empty p
 * 3. If error, render error
 * 3. If no error, render location and forecast
 * 4. Test your work
 */
