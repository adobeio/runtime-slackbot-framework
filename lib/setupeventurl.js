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
 * This code is use to verify the requested URL that will be called by Slack,
 * in the event subscription step.
 */
function main(params) {
   let response_body = { "challenge": params.challenge };
	 return {
	    headers: {
		  'Content-Type': 'application/json'
	    },
	    body: new Buffer(JSON.stringify(response_body)).toString('base64'),
	    statusCode: 200
   };
}
