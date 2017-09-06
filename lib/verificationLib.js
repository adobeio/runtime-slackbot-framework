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
