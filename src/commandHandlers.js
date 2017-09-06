/*-------------------------- DEVELOPER ZONE!----------------------------------*/
/******************************************************************************/
/*            The functions that create the response to                       */
/*                  the command asked by the user                             */
/******************************************************************************/
/*---------------------------DEVELOPER ZONE!----------------------------------*/

/**
 * Map that contains the commands this bot suppports associated with
 * the function that will deal with that command
 *
 * NOTE: add to this map any new command to be supported
 *
 */
var commands = {'/parrot' : parrot};

// NOTE: write your function to handle with the new command, add the command to
//       the map too, don't forget. (FOLLOW THE README instructions)
//       ****** NOTE: All the functions MUST return a promise ****

/**
 * Function that handles the /parrot command
 *
 * @function parrot
 * @param request {JSON} - JSON that Slack sent due to the use of
 *                                this command
 * @return {promise} - JSON response that will be send back to the user that
 *                     used this command
 */
function parrot(params) {
  console.log("processing /parrot from", params.user_name);
  return new Promise((resolve, reject) => {
     // EXAMPLE: DO API code here, call reolve when we fulfill the promise,
     // when we get the information back and we are able to process
     // the response
     resolve({
        text: "Hi " + params.user_name + " you said \"" + params.text + "\""
     });
  });
}