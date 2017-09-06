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
 * @author Esteban Posada <posada@adobe.com>
 * @copyright Adobe Systems Inc.
 * @version 1.0 - first release
 * @license Apache License, Version 2.0
 *
 */

/******************************************************************************/
/******************************************************************************/
/*                        Verification Function                               */
/******************************************************************************/
/******************************************************************************/

/**
 * This function checks that the team where this command
 * request is coming is a team that actually gives the bot
 * access. We love security. (Suggested by Slack API DOC)
 *
 * @function validateTeam
 * @param team_id {string} - the team id of the slack team
 * @return {promise} - a promise which will contain a flag
 *                     indicating if we were able to validate the
 *                     team. {flag: true} or {flag: false}
 */
function validateTeam(teamId) {
   console.log("validating team...");
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
               console.log("we got the team information.");
               // check if we have the team registered or not
               if (result.response.result.value != null) {
                  resolve({flag: true});
               } else {
                  resolve({flag: false});
               }
        }).catch(err => {
              console.log("can't process the request");
              reject({flag: false});
       });
   });
}
