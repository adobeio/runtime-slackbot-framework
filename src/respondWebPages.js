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
 */

 /******************************************************************************/
 /******************************************************************************/
 /*           This are the redirect webpages to be shown to the                */
 /*            client after clicking the "add to slack button                  */
 /******************************************************************************/
 /******************************************************************************/

 /**
 * This is the web page that will be displayed to the user/client if we were
 * able to successfully authenticate the credentials and add the bot to the
 * team
 *
 * @function returnSucessPage
 * @return webpage {string} - the html as a string of the "success" webpage
 *                            to display
 */
 function returnSucessPage() {
    var url = "https://storybird.s3.amazonaws.com/artwork/andymcnally/";
    url += "portrait/happy-bot.jpeg";
    var body = "<!DOCTYPE html><html><head><title>AskmeIO!</title></head>";
    body += " <body><h1><img src=\"" + url + "\"";
    body += " alt=\"Bot logo\" id=\"logo\"/><br />";
    body += "AskmeIO - Meet our smartest I/O bot!</h1>";
    body += "<div><p> Hey! Thanks for installing";
    body += " our AdobeI/O bot!</p></div></body></html>";
    return body;
 }

 /**
 * This is the web page that will be displayed to the user/client if we weren't
 * able to authenticate the crdentials and add the bot to his/her team
 *
 * @function returnFailPage
 * @return webpage {string} - the html as a string of thr "failure" webpage
 *                            to display
 */
 function returnFailPage() {
    var url = "https://s-media-cache-ak0.pinimg.com/originals/21/57/24/";
    url += "215724a6b0d506d9b2ee79f492eec479.jpg";
    var body = "<!DOCTYPE html><html><head><title>AskmeIO!</title></head>";
    body += "<body><h1><img src=\"" + url + "\"";
    body += " alt=\"Bot logo\" id=\"logo\"/><br />";
    body += "AskmeIO - Meet our smartest I/O bot!</h1>";
    body += "<div><p> Hey! Unfortunately we couldn't";
    body += "install our bot,";
    body += "try again!</p></div></body></html>";
    return body;
 }
