/**
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2017 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
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
 * @copyright Adobe 2017
 * @version 1.0 - first release
 * @license Apache License, Version 2.0
 *
 */

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
