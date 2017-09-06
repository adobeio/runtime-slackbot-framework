/*-------------------------- DEVELOPER ZONE!----------------------------------*/
/******************************************************************************/
/*              The functions that create the response to                     */
/*                    the event we are listening to                           */
/******************************************************************************/
/*---------------------------DEVELOPER ZONE!----------------------------------*/

/**
 * Map that contains the events that this bot can listen too associated with
 * the function that will deal with that event
 *
 * NOTE: add to this map any new event to be supported
 *
 * NOTE: *CANNOT NAME THE FUNCTIONS AS THE TYPE OF THE EVENT* OW
 *       silently doesn't like it
 */
var events = {'message' : messageType};

// NOTE: write your function to handle the new event, add the event name to
//       the map too, don't forget. (FOLLOW THE README instructions)
//       ****** NOTE: All the functions MUST return a promise ****

/**
 * Function that handles the message event
 *
 * @function messageType
 * @param request {JSON} - JSON that Slack send due to the trigger
 *                                of this event
 * @return {promise} - JSON response that will be send back to the user that
 *                     sent out this message
 */
function messageType(params) {
  console.log("processing " + params.event.type + " event");
  return new Promise((resolve, reject) => {
    resolve("Hey There!!!");
  });
}