/* eslint-disable  func-names */
/* eslint-disable  dot-notation */
/* eslint-disable  new-cap */
/* eslint quote-props: ['error', 'consistent']*/

'use strict';

const http = require('http');
const Alexa = require('alexa-sdk');
const config = {
    host: 'sumsi-api.eu-central-1.elasticbeanstalk.com'
};

const APP_STATES = {
    TRIVIA: '_TRIVIAMODE', // Asking trivia questions.
    START: '_STARTMODE', // Entry point, start the game.
    HELP: '_HELPMODE', // The user is asking for help.
};
const APP_ID = 'amzn1.ask.skill.945602c8-2bb8-4fc4-8e06-38c0f203c1b0'; // TODO replace with your app ID (OPTIONAL)

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least ANSWER_COUNT answers, any extras will be shuffled in.
 */
const languageString = {
    'en': {
        'translation': {
            'GAME_NAME': 'Sumsi', // Be sure to change this for your skill.
            'HELP_MESSAGE': 'I will ask you %s multiple choice questions. Respond with the number of the answer. ' +
                'For example, say one, two, three, or four. To start a new game at any time, say, start game. ',
            'REPEAT_QUESTION_MESSAGE': 'To repeat the last question, say, repeat. ',
            'ASK_MESSAGE_START': 'Would you like to start playing?',
            'HELP_REPROMPT': 'To give an answer to a question, respond with the number of the answer. ',
            'STOP_MESSAGE': 'Would you like to keep playing?',
            'CANCEL_MESSAGE': 'Ok, let\'s talk later.',
            'NO_MESSAGE': 'Ok, we\'ll play another time. Goodbye!',
            'TRIVIA_UNHANDLED': 'Try saying a number between 1 and %s',
            'HELP_UNHANDLED': 'Say yes to continue, or no to end the game.',
            'START_UNHANDLED': 'Say start to start a new game.',
            'NEW_GAME_MESSAGE': 'Welcome to %s. ',
            'WELCOME_MESSAGE': 'I will ask you %s questions, try to get as many right as you can. ' +
            'Just say the number of the answer. Let\'s begin. ',
            'ANSWER_CORRECT_MESSAGE': 'correct. ',
            'ANSWER_WRONG_MESSAGE': 'wrong. ',
            'CORRECT_ANSWER_MESSAGE': 'The correct answer is %s: %s. ',
            'ANSWER_IS_MESSAGE': 'That answer is ',
            'TELL_QUESTION_MESSAGE': 'Question %s. %s ',
            'GAME_OVER_MESSAGE': 'You got %s out of %s questions correct. Thank you for playing!',
            'SCORE_IS_MESSAGE': 'Your score is %s. ',
        }
    }
};

const newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = APP_STATES.START;
        this.emitWithState('start');
    },
    'AMAZON.StartOverIntent': function () {
        this.handler.state = APP_STATES.START;
        this.emitWithState('start');
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = APP_STATES.HELP;
        this.emitWithState('help');
    },
    'Unhandled': function () {
        const speechOutput = this.t('START_UNHANDLED');
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
};

function handleAnswer() {
    var self = this;

    if (this.event.request.intent.slots.Answer.value == 'yes') {
        completeTask(this.attributes.task.id, function() {
            self.response.speak("Ok, the chore was marked as completed. Your mum will need to check.");
            self.emit(':responseReady');
        });
    } else if (this.event.request.intent.slots.Answer.value == 'no') {
        this.response.speak("That is sad!");
        this.emit(':responseReady');
    }
}

const startStateHandlers = Alexa.CreateStateHandler(APP_STATES.START, {
    'start': function() {
        var self = this;

        loadData(function(ledger, tasks) {
            var balance = ledger.data.attributes.balance / 100,
                openTasks = tasks.data.filter(function(t) { return t.attributes.state == 'opened' }),
                completedTasks = tasks.data.filter(function(t) { return t.attributes.state == 'completed' }),
                possibleEarningsAfterCheck = completedTasks.reduce(function(value, task) { return task.attributes.value + value; }, 0) / 100,
                possibleEarnings = openTasks.reduce(function(value, task) { return task.attributes.value + value; }, 0) / 100,
                message = 'Hello Annuk, you currently own ' + balance + ' euro.';

            if (ledger.data.attributes.balance == 1337) {
                message += ' - wow, such impressive, much leet.';
            }

            if (completedTasks.length) {
                message += ' There are ' + possibleEarningsAfterCheck + ' euro open.'
            }

            if (openTasks.length) {
                var repromptText = ' Did you already ' + openTasks[0].attributes.title + '?';

                message += ' With your new pocket money on Sunday you could earn ' + possibleEarnings + ' euro if you do your ' + openTasks.length;
                message += openTasks.length > 1 ? ' chores.' : ' chore.'
                message += repromptText

                Object.assign(self.attributes, {
                    'task': openTasks[0]
                });

                // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
                self.handler.state = APP_STATES.TRIVIA;

                self.response.speak(message).listen(repromptText);
                self.response.cardRenderer(self.t('GAME_NAME'), repromptText);
                self.emit(':responseReady');
            } else {
                message += ' Currently there are no chores to pick up. Enjoy your day!';

                // Set the current state to trivia mode. The skill will now use handlers defined in triviaStateHandlers
                self.handler.state = APP_STATES.TRIVIA;

                self.response.speak(message);
                self.response.cardRenderer(self.t('GAME_NAME'), repromptText);
                self.emit(':responseReady');
            }
        });
    },
});

const triviaStateHandlers = Alexa.CreateStateHandler(APP_STATES.TRIVIA, {
    'AnswerIntent': function () {
        handleAnswer.call(this);
    },
    'AMAZON.HelpIntent': function () {
        this.handler.state = APP_STATES.HELP;
        this.emitWithState('help');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(this.t('CANCEL_MESSAGE'));
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('CANCEL_MESSAGE'));
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        const speechOutput = this.t('TRIVIA_UNHANDLED', ANSWER_COUNT.toString());
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    }
});

const helpStateHandlers = Alexa.CreateStateHandler(APP_STATES.HELP, {
    'help': function (newGame) {
        const askMessage = newGame ? this.t('ASK_MESSAGE_START') : this.t('REPEAT_QUESTION_MESSAGE') + this.t('STOP_MESSAGE');
        const speechOutput = this.t('HELP_MESSAGE', 1) + askMessage;
        const repromptText = this.t('HELP_REPROMPT') + askMessage;

        this.response.speak(speechOutput).listen(repromptText);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.emitWithState('help');
    },
    'AMAZON.StopIntent': function () {
        const speechOutput = this.t('STOP_MESSAGE');

        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('CANCEL_MESSAGE'));
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        const speechOutput = this.t('HELP_UNHANDLED');
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    }
});

function get(options, callback) {
    var defaults       = { 'host': config.host },
        requestOptions = Object.assign(defaults, options),
        text;

    http.get(requestOptions, function(res) {
        res.on("data", function(chunk) {
            text = '' + chunk;

            return callback(JSON.parse(text));
        });
    }).on('error', function(e) {
        text = 'error' + e.message;
        console.error("Got error: " + e.message);
    });
}

function completeTask(id, callback) {
    var requestOptions = { 'method': 'PUT', 'host': config.host, 'path': '/api/ledgers/1/tasks/' + id,   "headers": { "Content-Type" : "application/json" } },
        data = JSON.stringify({ 'state': 'completed' }),
        text;

    http.request(requestOptions, function(res) {
        res.on('data', function() {
            return callback();
        });
    }).on('error', function(e) {
        text = 'error' + e.message;
        console.error("Got error: " + e.message);
    }).end(data);
}

function loadData(callback) {
    getLedger(function(ledger) {
        getTasks(function(tasks) {
            callback(ledger, tasks);
        });
    });
}

function getLedger(callback){
    get({ 'path': '/api/ledgers/1' }, callback);
}

function getTasks(callback){
    get({ 'path': '/api/ledgers/1/tasks' }, callback);
}

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, triviaStateHandlers, helpStateHandlers);
    alexa.execute();
};
