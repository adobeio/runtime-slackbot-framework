# Create a Slack Bot in 10 steps! We do it Serverless using OpenWhisk

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

**Author:** *Esteban Posada* |
**Email:** *epm105@hotmail.com* |
**Copyright:** *Adobe 2017*

> Status: In Progress

Chat bots have been one of the most innovative, trending and useful applications that are being developed nowadays. Technology companies are allowing third party developers to create their own bots in top of their messaging applications. Some examples are Facebook and Slack.

Although these companies are offering APIs to be able to interact with their services, the process of communicating with their products and all the details that need to be set up are still tricky and hard to get it all right.

This framework provides the power of *You focus on the bot’s functionality, the framework handles the server setup and management* :sweat_smile:.

---
### Hey! What are you waiting to fork this repo?

---
## Requirements:

 * Basic Javascript Experience.
 * Set up and install OpenWhisk:
   * Install the OpenWhisk CLI: `brew install shaftoe/wsk/wsk`. (check by running: `wsk -v`)
   * Create, if not already, the `~/.wskprops` file with your OpenWhisk info (**auth, api host, namespace**) . **(Important)**.
 * Download and Install **Node.js** and **npm**. ([get node and npm at once.](https://www.npmjs.com/get-npm))

 **NOTE:** make sure you follow the requirements before moving on!

---
## Table of Contents: Follow these links in order:

 1. [Create your first Slack Bot!](#create-your-first-slack-bot)

 2. [Start creating your own commands.](/src/#how-to-create-new-commands)

 3. [Start creating your own events.](/src/#how-to-listen-to-new-events)

 4. [Update/change/delete an existing command or event.](/src/#how-to-update-an-existing-command-or-event)

 5. [Distribute your bot.](/distribution/)

 ### Other helpful links:

  * [Debugging/ See the logs.](/debugging/)

  * [How the library works (A brief explanation).](/documentation/)

  * [Have questions? Issues? Want to contribute?](#questions-or-concerns)

---
## Create your first Slack Bot:

**1.** Fork this project into your project folder.

**2.** Create the **Slack App**:
  1. Proceed to this [link](https://api.slack.com/apps/new), to create a new Slack App.
  2. Type a **name** for your app, select your Slack team.
  3. Click **Create App**.

**3.** Add a **Bot User**: (this will let us create the bot)
  1. Go to the **Bot Users** under **Features**.
  2. Click **Add a Bot User**.
  3. Name your bot and click **Add Bot User**.
  4. Click **Save Changes**.

**4.** Now, we will set up the Request URLs (these URLs will be use by Slack to call us when either an event, authentication and/or command was invoked)
  1. Under **Settings** click on **Basic Information**.
  2. Notice under **App Credentials** the *Client ID*, *Client Secret* and *Verification Token*. We will need these information in a moment, so keep this window open.
  3. Go to **Terminal (CLI)** and inside the folder where all the project files are:

    * run:

      ```bash
      make run
      ```

    * In **Type the option number:** type: **1**

      This is how the execution of `make run` (option setup) will look like:
      ```bash
      **-macOS:Test **$ make run

      Set up your bot production ecosystem!
      Please type one of the following options:

         1. setup
         2. install
         3. update-commands
         4. update-distribution
         5. update-events
         6. delete-build-files

      Type the option number: 1

      setting up OpenWhisk and OW actions...
      creating identification files for your new bot...

      ----------------OW PROJECT--------------------
      Enter your OW main (without namespace and/or package) end-point for web actions: <https://<example-preview.company.xyz>/api/v1/web/>
      Enter the name of your OW namespace: <your OW namespace>
      Enter the name of your bot project (package name): <project name>
      You package names is: "<project name>". Please remember this name!
      ----------------OW PROJECT--------------------

      ----------------BOT INFORMATION---------------
      Enter the Verification Token: <your bot Verification Token>
      Enter the Client ID: <your bot Client ID>
      Enter the Client Secret: <your bot Client Secret>
      Enter a secret state (will be used to prevent attacks, please remember this state): <chose a secret state string [and remember it!]>
      ----------------BOT INFORMATION---------------

      ----------------USEFUL LINKS------------------
      Events link: <events link>
      Auth link: <authentication link>
      Commands link: <commands link>
      ----------------USEFUL LINKS------------------

      We are done setting up everything, please continue following the instructions.
      ```

      -- Note that it will also ask for a *secret state*. This will use to avoid attacks, so please keep it secret, but remember it yourself as we will need it later in this tutorial.

**5.** Back to the **Slack API Page** we are currently in, under **Features**, go to **Event Subscriptions**.

   * Turn **ON** the **Enable Events** and under **Request URL** type the link that was output to the console and says **Events link**.

   * **NOTE:** inmediately after you copy this link, it should show a green word saying: **Verified**

   * Under **Subscribe to Team Events** click on **Add Team Event** and add the event: **message:im**
       * **NOTE:** this is the sample event we are adding to our bot!
   * Click on the **Save Changes** button at the bottom right corner of the page.

   **NOTE:** if not, make sure you copy the link correctly. If not, email us. Email at the end of this file.

**6.** Now, under **Features**, **OAuth & Permissions**, **Request URLs**, click **Add a new Redirect URL** and type the link that was output to the console and says **Auth link**.

   * Click **Add**.
   * Finish by clicking on **Save URLs**.

**7.** Now, under **Features**, **Slash Commands**, click on **Create New Command**:

   * In the text box for **Command** type: `/parrot`

   * In the text box for **Request URL** type the link that was output to the console and says **Commands link**. **NOTE:** This URL will be the same for every command you create!

   * In the text box for **Short Description** type something like: `repeats what you typed`

   * In the text box for **Usage Hint** type the arguments the user will need to type after the command, if any.

   * Click **Save** in the bottom right corner of the screen.

**8.** Now, we will install everything we need to run the sample command and event in your Slack Team as well as to allow you to create your own later!
1. Go to **Terminal (CLI)** and inside the folder where all the project files are:

   * run:

     ```bash
     make run
     ```
   * In **Type the option number:** type: **2**

     This is how the execution of `make run` (option install) will look like:

     ```bash
     **-macOS:Test **$ make run

     Set up your bot production ecosystem!
     Please type one of the following options:

        1. setup
        2. install
        3. update-commands
        4. update-distribution
        5. update-events
        6. delete-build-files

     Type the option number: 2

     installing required actions and files...
     ```
**9.** Now, in order to try the sample command and event do the following:

   * Go back again to the **Slack API Webpage**

   * Under **Settings** go to **Install App**

   * Click on the green button that says: **Install App**.
      * This will install the bot in your team and will allow you to test it **FINALLY! :clap:**

**10.** Congrat's your bot is created, lets test it!

   * Go to your **Slack App** and you will now be able to see your **new bot** under **Apps**.

   * **Test Command:** Type to your new bot: `/parrot Hello World!`, it should reply: `Hi <your slack username> you said "Hello World!"`

   * **Test Event:** Type to your new bot: `Hello Bot!`, it should reply: `Hey There!!!`

#### Wow! You just created a bot in only **10** steps :smiley:

---
## Questions or Concerns:

Thanks for taking the time to read through this tutorial! We hope this was useful, we are always trying to make your life as a developer easier.

 * ### Have an Issue?

   * Post and Issue in this [link](https://git.corp.adobe.com/posada/serverless-slackbot-framework/issues)
   * Email us to epm105@hotmail.com

 * ### Want to contribute?

   * Contributors are welcomed! Read the [Contributing Guide](CONTRIBUTING.md) for more information.

 * ### Licensing

   * This project is licensed under the Apache V2 License. See [License](LICENSE) for more information.

 * ### Code of Conduct

   * Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
