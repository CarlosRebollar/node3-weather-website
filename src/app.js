const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const forecast = require("./utlis/forecast");
const geocode = require("./utlis/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Carlos Palacios"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Carlos Palacios"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Heeeelp!",
    title: "Help",
    name: "Carlos Palacios"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Carlos Palacios"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Carlos Palacios"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});

/**
 * Goal: Setup two new routes
 *
 * 1. Setup an about route and render a page title
 * 2. Setup a weather route and render a page title
 * 3. Test your work!
 */

/**
 * Goal: Update routes
 *
 * 1. Setup an about route to render a title with HTML
 * 2. Setup a weather route to send back JSON
 *     - Object with forecast and location strings
 * 3. Test your work!
 */

/**
 * Goal: Create two more HTML files
 *
 * 1. Create a html page for about with "About" title
 * 2. Create a html page for help with "Help" title
 * 3. Remove the old route handlers for both
 * 4. Test your work!
 */

/**
 * Goal: Create a template for help page
 * 1. Setup a help template to render a help message to the screen
 * 2. Setup the help route and render the template with an example message
 * 3. Visit the route in the browser and see your help message print
 */

/**
 * Goal: Create a partial for the footer
 * 1. Setup the template for the footer partial "Created by Carlos Palacios"
 * 2. Render the partial at the bottom of all three pages
 * 3. Test your work
 */

/**
 * Goal: Create and render a 404 page with handlebars
 * 1. Setup the template to render the header and footer
 * 2. Setup the template to render an error message in a paragraph
 * 3. Render the template for both 404 routes
 *  - Page not found.
 *  - Help article not found.
 * 4. Test your work. Visit /what and /help/units
 */

/**
 * Goal: Update weather endpoint to accept address
 * 1. No address? Send back an error message
 * 2. Address? Send back the static JSON
 *  - Add address property onto JSON which returns the provided address
 * 3. Test /weather and /weather?philadelphia
 */

/**
 * Goal: Wire up / weather
 *
 * 1. Require geocode/forecast into app.js
 * 2. Use the address to geocode
 * 3. Use the coordinates to get the forecast
 * 4. Send back the real forecast and location
 */
