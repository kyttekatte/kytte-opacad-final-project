const express = require("express");
const router = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

// Axios allows us to make HTTP requests from our app
const axios = require("axios").default;

// My menu
router.use(urlencoded({ extended: false }));
router.post('/voice', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();

  // Use the <Gather> verb to collect user input
  const gather = twiml.gather({ numDigits: 1 });
  gather.say('Welcome to Verbal Dice Roller. Please enter the number of die you wish to roll (0-9) with 0 equaling 10');

  // If the user doesn't enter input, loop
  twiml.redirect('/voice');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});


// Handle a GET request to the root directory,
// and send "Hello World" as a response
router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Handle a GET request to /github/USERNAME, where
// USERNAME can be any GitHub username.
// Try https://localhost:3000/gh/twilioquest in your browser!
// `:username` is a route parameter: whatever is entered in the url
// after github/ will be stored as a variable called `username`.
router.get("/github/:username", (req, res) => {
  // Get the value of the route parameter.
  // It lives in `req` because the URL is part of the request.
  // `params` means parameters, the parameters of the requested URL.
  // `username` is what we named the route parameter in the route above.
  let username = req.params.username;

  // Use Axios to make a GET request to the GitHub API
  axios
    .get(`https://api.github.com/users/${username}`)
    // here `response` is the response we get from the GitHub API,
    // Not to be confused with `res`, which is the response for our own app.
    .then((response) => {
      // The response will have headers and a body. We get the body using `data`.
      let public_repos = response.data.public_repos;
      // Now we can use the response from the GitHub API to build our own response.
      res.send(
        `${username} has ${public_repos} public repositories on GitHub.`
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

// Handle a POST request to /sms, assume it is a Twilio webhook, and send
// TWiML in response that creates an SMS reply.
// REMEMBER: you will have to use ngrok to expose your app to the internet before you can use it with Twilio.
router.post("/sms", (req, res) => {
  console.log(
    `Message received from ${req.body.From}, containing ${req.body.Body}`
  );

  res.type(`text/xml`);
  res.send(`
    <Response>
    <Message>We received your message!</Message>
    </Response>
    `);
});

module.exports = router;
