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
