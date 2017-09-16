var Alexa = require('alexa-sdk');
var http = require('http');
var APP_ID = 'amzn1.ask.skill.945602c8-2bb8-4fc4-8e06-38c0f203c1b0';
var SKILL_NAME = 'Sumsi';
var config = {
    host: 'sumsi-api.eu-central-1.elasticbeanstalk.com'
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
var handlers = {
    // 'LaunchRequest': function () {
    //     this.emit('sumsiStartIntent');
    // },
    // 'IntentRequest': function() {
    //     this.emit('sumsiStartIntent');
    // },
    'sumsiStartIntent': function () {
        var self = this;

        getLedger(function(ledger) {
            getTasks(function(tasks) {
                var balance = ledger.data.attributes.balance / 100,
                    openTasks = tasks.data.filter(function(t) { return t.attributes.state == 'opened' }),
                    possibleEarnings = openTasks.reduce(function(value, task) { return task.attributes.value + value; }, 0) / 100,
                    message = 'Hello Annuk, you currently own ' + balance + ' euro.';

                if (balance == 1337) {
                    message += ' - wow, such impressive, much leet.';
                }

                if (openTasks.length) {
                    var repromt = 'Did you already ' + openTasks[0].attributes.title + '?';

                    message += ' With your new pocket money on Sunday you could earn ' + possibleEarnings + ' euro if you do your chores. ' + repromt;

                    self.emit(':ask', message, repromt);
                } else {
                    self.emit(':tellWithCard', message, SKILL_NAME, message);
                }
            });
        }
    )},
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can ask sumsi for some financial advice.";
        var reprompt = "What would you like sumsi to do? You can ask for 'what is my status'";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye Annuk!');
    },
    'Unhandled': function() {
        this.emit('AMAZON.HelpIntent');
    }
};

function get(options, callback) {
    var defaults       = { 'host': config.host },
        requestOptions = Object.assign(defaults, options);

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

function getLedger(callback){
    get({ 'path': '/api/ledgers/1' }, callback);
}

function getTasks(callback){
    get({ 'path': '/api/ledgers/1/tasks' }, callback);
}
