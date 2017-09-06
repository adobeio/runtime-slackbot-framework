/**
 * @author Esteban Posada <posada@adobe.com>
 * @copyright Adobe Systems Inc.
 * @version 1.0 - first release
 * @tutorial <link coming soon>
 *
 * This program deals with commands that the bot offers to the users when the
 * the users use any of those.
 *
 * The main goal of this program is to allow developers to create their own
 * bots very easily. We take care of the complicated stuff, you just code
 * the functions that will handle the commands you will allow
 */

/******************************************************************************/
/******************************************************************************/
/*              Main Function for Handling Commands </command>
/******************************************************************************/
/******************************************************************************/

/**
 * Authenticates the incomming slack request via checking the team information,
 * and checking the verification token to see if the incomming request
 * (command request) is actually comming from Slack.
 * then process the command accordingly (read the process command functions).
 *
 * @function main
 * @see https://api.slack.com/
 * @param request {JSON} - JSON received from the Slack command
 *                                request
 * @param verifyToken {string} - the default param: the verification token
 * @return {promise} - a promise that will return a status either
 *                     indicating everything succeeded {status: "OK"} or
 *                     {status: "Erro"} if something went wrong. See logs in
 *                     this case.
 */
function main(params) {
  console.log("processing new bot command from Slack...");
  return validateTeam(params.team_id).then(team => {
     // check that team and token match
     if (team && (params.verifyToken == params.token)) {
        console.log("Before processing command");
        return processCommand(params).then(result => {
           console.log("we are done!");
        }).catch(err => {
           console.log("Couldn't process the command", err);
        });
     } else {
        console.log("Either the team or the token doesn't match");
        return;
     }
  }).catch(err => {
     console.log("Can't validate the team", err);
  });
}

/******************************************************************************/
/******************************************************************************/
/*            Main flow of indentifying what command was used                 */
/******************************************************************************/
/******************************************************************************/

/**
 * This function recognize the command that the user used, and
 * calls the corresponding function that implements this command
 *
 * @function processCommand
 * @param response {JSON} - JSON received from the Slack command
 *                                 request
 */
function processCommand(params) {
  console.log("processing command: ", params.command);
  if (params.command in commands) {
     return commands[params.command](params).then(result => {
          return answerCommand(result, params.response_url);
     }).then(result => {
        console.log("reponse was sent!");
     }).catch(err => {
        console.log("couldn't sent the response", err);
     });
  } else {
     // edge case, be robust
     return answerCommand(badCommand(params), params.response_url)
        .then(result => {
           console.log("badCommand code was sent!");
        }).catch(err => {
           console.log(err);
        });
  }
}

/**
 * Function that will be called when a command was not identified
 * This is just for edge cases. Code must be robust!
 *
 * @function badCommand
 * @param request {JSON} - JSON that Slack sent due to the use of
 *                                this command
 * @return {promise} - JSON response that will be send back to the user
 *                     informing that we couldn't process the command
 */
function badCommand(params) {
  console.log("processing /badCommand from", params.user_name);
  return {
    text: "Hi " + params.user_name + " we couldn't process" +
          "the command \"" + params.command + "\" this time :("
  };
}

/******************************************************************************/
/******************************************************************************/
/*            Sending back the response for given command                     */
/******************************************************************************/
/******************************************************************************/

/**
 * This function sends the final response back to slack for given command
 *
 * @function answerCommand
 * @param response {JSON} - the final response in JSON format to send back to
 *                          slack
 * @param url {string} - the url which we will send the response back
 * @return {promise} - promise which will return {status: "OK"} in the case
 *         that the response was successfully sent to slack, {status: "Error"}
 *         otherwise. (check the logs in this case)
 */
function answerCommand(result, url) {
  console.log("answering back...");
  const request = require('request');
  const rp = require('request-promise');
  return new Promise((resolve, reject) => {
     var options = {
        url: url,
        method: 'POST',
        json: result
     };
     return rp(options).then(body => {
        console.log("we replied sucessfully");
        resolve({status: "OK"});
     }).catch(err => {
        console.log("We couldn't send the response: ", err);
        reject({status: "Error"});
     });
  });
}
