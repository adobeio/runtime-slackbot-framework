## The Flow Diagram of the Slack Bot Application using OpenWhisk

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

![Flow Chart](ow-flow-diagram.png)

---
## Library explanation and documentation

The following files will do all the dirty work for you. Below is a brief
description of what each file does.

* **lib/authenticationLib.js:** deals with all the authentication required to be able to install/distribute the your bot.

* **lib/commandsLib.js:** deals with sending back to Slack the response of the commands functions.

* **lib/eventsLib.js:** checks that the team where the Slack bot request is coming from is actually authorized.

* **lib/verificationLib.js:** deals with sending back to Slack the response of the events functions.

* **lib/setupendpoint.js:** code that will be use to set up the end points (urls) that will be called by slack in the case a command, event or authentication occurred. (No need to worry about the code inside this file)

* **src/respondWebPages.js:** code that handles with the success and failure web pages when distributing the app.

* **src/commandHandlers.js** here is where the developer will add new functions to handle new commands.

* **src/eventHandlers.js** here is where the developer will add new functions to handle new events.

* **Configure.java:** the CLI program that will allow you to set up all the files and request URL for you. (No need to worry about the code in this file)

* **Makefile:** making you the life easier, just need to run `make run` and then we can interact with the Configure program.

* **Gruntfiles:** allow us to easily merge js files (no need to worry about this!)

* **package.json:** for `npm` dependencies and other things (no need to worry) things.

* **/debugging:** tips and steps of how to debug your bot's code.

---
## Need help? There is a bug? Want to Contribute? Something out of date?

  * Post and Issue in this [link](https://git.corp.adobe.com/posada/serverless-slackbot-framework/issues)
  * Email us to epm105@hotmail.com
  * To contribute: [click here.](../CONTRIBUTING.md)
