const vscode = require('vscode');
const axios = require('axios');

/**
 * @param {vscode.ExtensionContext} context
 */

let timerJoke;
let timerQuote;
let timerPun;

function activate(context) {
  console.log('Congratulations, your extension "Funny Indunil" is now active!');

  async function fetchAndDisplayJoke() {
    try {
      const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
      if (!response.data.error && response.data.joke) {
        vscode.window.showInformationMessage("😜 Indunil joke : " +response.data.joke+" 😂🤣😋");
      } else {
        console.error('API returned an error:', response.data);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  }

  async function fetchAndDisplayQuotes() {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      if (!response.data.error) {
        vscode.window.showInformationMessage("💭🤔 Quote : " +response.data.content+" -"+response.data.author);
      } else {
        console.error('API returned an error:', response.data);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  }

  async function fetchAndDisplayPun() {
    try {
      const response = await axios.get("https://www.punapi.rest/api/pun");
      if (!response.data.error) {
        vscode.window.showInformationMessage("😉🤪 Indunil Says : " +response.data.pun);
      } else {
        console.error('API returned an error:', response.data);
      }
    } catch (error) {
      console.error('Error during request:', error);
    }
  }

  let startDisposableJoke = vscode.commands.registerCommand('indunil.StartIndunilJoke', function () {
    timerJoke = setInterval(fetchAndDisplayJoke, 60000);
  });

  let startDisposableQuote = vscode.commands.registerCommand('indunil.StartIndunilQuote', function () {
	  timerQuote = setInterval(fetchAndDisplayQuotes, 60000);
  });

  let startDisposablePun = vscode.commands.registerCommand('indunil.StartIndunilPun', function () {
    timerPun = setInterval(fetchAndDisplayPun, 60000);
    });

  let stopTimerDisposable = vscode.commands.registerCommand('indunil.StopIndunil', function () {
    clearInterval(timerJoke);
    clearInterval(timerQuote);
    clearInterval(timerPun);
    vscode.window.showInformationMessage('Indunil stopped.');
  });

  context.subscriptions.push(startDisposableJoke,startDisposableQuote,startDisposablePun,stopTimerDisposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
