const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.welcome = function welcome() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Thanks for calling the choose your response line. ' +
    'Please press 1 for an affirmation. ' +
    'Please press 2 for a joke. ' +
    'Press 3 for a weird animal fact.',
    {loop: 3}
  );

  return voiceResponse.toString();
};

exports.menu = function menu(digit) {
  const optionActions = {
    '1': getAffirmation,
    '2': getJoke,
    '3': getWeirdAnimalFact,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};

/**
 * Returns Twiml Affirmation
 * @return {String}
 */
 function getAffirmation() {
  const twiml = new VoiceResponse();

  twiml.say(
    'You have the power to change.',
    {voice: 'alice', language: 'en-GB'}
  );

  twiml.hangup();

  return twiml.toString();
}

/**
 * Returns Twiml Joke
 * @return {String}
 */
function getJoke() {
  const twiml = new VoiceResponse();

  twiml.say(
    'What do you call a Frenchman wearing sandals? ' +
    'Philippe Flop.',
    {voice: 'alice', language: 'en-GB'}
  );

  twiml.hangup();

  return twiml.toString();
}

/**
 * Returns Twiml Weird Animal Fact
 * @return {String}
 */
 function getWeirdAnimalFact() {
  const twiml = new VoiceResponse();

  twiml.say(
    'Armadillos can catch leprosy.',
    {voice: 'alice', language: 'en-GB'}
  );

  twiml.hangup();

  return twiml.toString();
}

/**
 * Returns an xml with the redirect
 * @return {String}
 */
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Returning to the main menu', {
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}
