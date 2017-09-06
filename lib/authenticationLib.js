/**
 * Copyright [yyyy] [name of copyright owner]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * @author Esteban Posada <epm105@hotmail.com>
 * @copyright Adobe Systems Inc.
 * @version 1.0 - first release
 * @license Apache License, Version 2.0
 *
 * This program deals with the user/team authentication necessary to be able
 * to distribute the bot that the developer created so that either other teams
 * can use it or even be able to offer it publically!
 *
 * @todo: this is an implementation file, no need to expose to developer
 * @todo: separate from this file the webpages to return
 */

/******************************************************************************/
/******************************************************************************/
/*           User/Team authentication used in "Add to Slack Button"           */
/*                       and to distribute the app                            */
/******************************************************************************/
/******************************************************************************/

/**
 *  Authenticates the team that will add this bot via using the
 *  "Add to slack button"
 *
 * @function main
 * @param request {JSON} - JSON received from the Slack when user
 *                                clicks the button
 * @return {HTTP response} - webpage a web page via a HTTP response indicating
 *                           the team/user whether the team/user was able to
 *                           install/add the bot. In case we couldn't
 *                           autheticate, will return a web page saying so,a web
 *                           page saying that the installation was
 *                           successfull will be displayed otherwise.
 * NOTE: we will use an extra security layer checking that the user
 *       still the same one that clicked the button in first place.
 *       we love security! (state)
 */
function main(params) {
   console.log("first line of authentication function");
   const request = require('request');
   const rp = require('request-promise');
   // check the state is the same to avoid forge attacks
   if (params.state == params.check) {
	    console.log("the state was verified");
	    // same user, everything so far looks right
      return storeInfo(params).then(result => {
         console.log("the team was registered and authenticated!");
         console.log("we are done!");
         return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: returnSucessPage()
         };
      }).catch(err => {
         console.log("the team wasn't registered nor authenticated", err);
         return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: returnFailPage()
         };
      });
    } else {
	     // Is a forge attack. State is different
	     return {
	        statusCode: 400,
	        headers: { 'Content-Type': 'text/html' },
	        body: "<p> There was an error, please refresh the page and" +
                "try again! </p>"
	     };
    }
}

/******************************************************************************/
/******************************************************************************/
/*           Retrieves more information about the team once                   */
/*                we were able to autheticate the team                        */
/******************************************************************************/
/******************************************************************************/

/**
 * Requests more information about the team installing our bot so that
 * we can save that information
 *
 * @function storeInfo
 * @param request {JSON} - JSON received from the Slack
 *                                authentication request
 */
function storeInfo(params) {
  console.log("retrieving more information about the team...");
  const request = require('request');
  const rp = require('request-promise');

  var options = {
     url: 'https://slack.com/api/oauth.access',
     method: 'POST',
     form: {
        client_id: params.id,
        client_secret: params.secret,
        state: params.check,
        code: params.code,
     },
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  return rp(options).then(body => {
     var json = JSON.parse(body);
     return registerTeam(json.team_id, json.bot.bot_access_token)
        .then(result => {
           console.log("waiting to register the team...");
        });
  }).catch(err => {
     console.log("Can't process the infromation", err);
  });
}

/******************************************************************************/
/******************************************************************************/
/*         Stores the team information needed for future authentication       */
/*         when interacting directly with teams that installed our bot        */
/******************************************************************************/
/******************************************************************************/

/**
 * Stores the needed information of the team that just intalled our bot. This
 * information is needed for interacting with the team in events and commmands
 *
 * @function registerTeam
 * @param teamId {string} - team_id of the team
 * @return promise {promise} - a promise that will return a status saying if we
 *                            were able to stored successfully the team
 *                            information. {status: "OK"} or {status: "Error"}
 */
function registerTeam(teamId, botToken) {
   console.log("Registering team...", teamId);
   let caching_action = "cache/persist";
   return new Promise(
      (resolve, reject) => {
        const openwhisk = require('openwhisk');
        let openwhisk_client = openwhisk({api: process.env['__OW_API_HOST'] +
                                          "/api/v1/"});
        return openwhisk_client.actions.invoke({
           actionName: caching_action,
           blocking: true,
           result: true,
           params: {
              key: teamId,
              value: botToken
           }
        }).then(result => {
           console.log("Team information was stored!");
           resolve({status: "OK"});
        }).catch(err => {
           console.log("Could not get user/team details", err);
           reject({status: "Error"});
        });
   });
}
