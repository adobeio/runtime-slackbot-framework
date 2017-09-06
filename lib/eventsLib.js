/**
 * @author Esteban Posada <posada@adobe.com>
 * @copyright Adobe Systems Inc.
 * @version 1.0 - first release
 * @tutorial <link coming soon>
 *
 * This program deals with events that the bot can listen and respond to
 *
 * The main goal of this program is to allow developers to create their own
 * bots very easily. We take care of the complicated stuff, you just code
 * the functions that will handle the events your bot will listen
 *
 * @todo: document the case that OW has the bug in which I can't call my
 *        functions with the same name of the event type that slack sent me
 *        as parameter
 */

/******************************************************************************/
/******************************************************************************/
/*                 Main Function for Handling Events                          */
/******************************************************************************/
/******************************************************************************/

/**
 * Authenticates the incomming slack request by checking the team information
 * and by checking the verification token to see if the incomming request
 * is actually comming from Slack. (Suggested by Slack API DOC),
 * then process the event accordingly (read the process event functions).
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
  console.log("processing event from Slack...");
  return validateTeam(params.team_id).then(team => {
     // check that team and the verification token match
     if (team && (params.verifyToken == params.token)) {
        console.log("Before processing event");
        return processEvent(params).then(result => {
           console.log("we are done!");
        }).catch(err => {
           console.log("Couldn't process the event", err);
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
/*            Main flow of indentifying what event was used                   */
/******************************************************************************/
/******************************************************************************/

/**
 * This function recognize the event that occurred, and
 * calls the corresponding function that deals with this event
 *
 * @function processEvent
 * @param response {JSON} - JSON received from the Slack event
 *                                 request
 */
function processEvent(params) {
  console.log("processing event: ", params.event.type);
  if (params.event.type in events) {
     // TODO: deal with the case where the event is a message
     // many "message" events, so deal with subtype of event
     var user = "";
     // This is since the user we will reply back is located
     // in another place of the JSON we received from
     // slack.
     if (params.event.type == "channel_created") {
       user = params.event.channel.creator;
     } else {
       user = params.event.user;
     }
     return events[params.event.type](params).then(result => {
        return answerEvent(result, params.team_id, user);
     }).then(result => {
        console.log("reponse was sent!");
     }).catch(err => {
        console.log("couldn't sent the response", err);
     });
  } else {
     // edge case, be robust
     return answerEvent(badEvent(params), params).then(result => {
        console.log("badEvent was sent!");
     }).catch(err => {
        console.log(err);
     });
  }
}

/**
 * Function that will be called when slack called us but we don't
 * recognize the event.
 *
 * @function badEvent
 * @param request {JSON} - JSON that Slack sent due to the use of
 *                                this command
 * @return {promise} - JSON response that will be send back to the user
 *                     informing that we couldn't process this event
 */
function badEvent(params) {
  console.log("I am sorry, couldn't undertand that command");
  return "Hey we couldn't undertand what event just happened, please " +
          "let us know!";
}

/******************************************************************************/
/******************************************************************************/
/*         Sending back a response due to the occur of given event            */
/******************************************************************************/
/******************************************************************************/

/**
 * This function sends the response back to slack for given command
 * uses chat.postMessage Slack API
 *
 * @function asnwerEvent
 * @param result {JSON} - the final JSON response to send back to slack
 * @param teamId {string} - the id of the team that installed the bot
 * @param user {string} - the specific user to reply to send the response back
 * @return {promise} - a promise which will return {status: "OK"} in the case
 *                     that the response was successfully sent to slack,
 *                     {status: "Error"} otherwise. (check the logs in this
 *                     case)
 */
function answerEvent(result, teamId, user) {
  console.log("answering back...");
  const request = require('request');
  const rp = require('request-promise');
  // to format the response correctly (in slack formak),
  // read chat.postMesssage Slack API
  const querystring = require('querystring');

  return new Promise((resolve, reject) => {
     return getBotToken(teamId).then(res => {
         console.log("okay, we are using the bot token");
         // couldn't get the bot token
         if (res.botToken == null) {
           console.log("couldn't get the bot token");
           reject({status: "Error"});
         }
         var response = {
           token: res.botToken,
           channel: user,
           as_user: true,
           username: "AskmeIO",
           text: result
        };
        var options = {
           url: 'https://slack.com/api/chat.postMessage',
           method: 'POST',
           form: querystring.stringify(response)
        };
        return rp(options).then(body => {
           console.log("we replied sucessfully");
           resolve({status: "OK"});
        }).catch(err => {
           console.log("We couldn't send the response: ", err);
           reject({status: "Error"});
        });
     });
  });
}

/**
 * This function requests the bot token information
 *
 * @function getBotToken
 * @param teamId {string} - the team id
 * @return {promise} - a promise containing the botToken {"botToken" : ...}.
 *                     In the case we couldn't find the token, this function
 *                     returns {"botToken" : null}
 */
function getBotToken(teamId) {
  console.log("retrieving bot access token...");
  let caching_action = "cache/persist";
  return new Promise(
     (resolve, reject) => {
        const openwhisk = require('openwhisk');
        let openwhisk_client = openwhisk({api: process.env['__OW_API_HOST']
                                         + "/api/v1/"});
        return openwhisk_client.actions.invoke({
           actionName: caching_action,
           blocking: true,
           result: true,
           params: {
              key: teamId
           }
        }).then(result => {
              console.log("we got the bot token information");
              resolve({botToken: result.response.result.value});
       }).catch(err => {
             console.log("couldn't get the bot token");
             reject({botToken: null});
      });
  });
}
