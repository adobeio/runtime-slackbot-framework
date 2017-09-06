/**
 * @author Esteban Posada <posada@adobe.com>
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
