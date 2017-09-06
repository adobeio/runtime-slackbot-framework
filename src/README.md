## How to create new commands:

**1.** Open in your favorite editor the file **commandHandlers.js**

  * You will see that there is already one function that will handle the `/parrot` command. We will now show you how to create your own commands.

**2.** Go to the **Slack API Webpage** and under **Features**, **Slash Commands** click in **Create New Command**.

**3.** Now, fill up the information for every single command that you want to support. Follow the same approach as we did in the **Create your first bot!** section.

**4.** If you go back to the **commandHandlers.js** file, you will see an instruction saying that every command you create you will need to have a function to handle it and add into the `commands map:`

```js
/**
 * Map that contains the commands this bot supports associated with
 * the function that will deal with that command
 *
 * NOTE: add to this map any new command to be supported
 *
 */
var commands = {'/parrot' : parrot, '/<new command>' : <function name to handle that command>};
```

**NOTE:** please note that every function that will handle a new command should return a **javascript PROMISE.**

**5.** Please read and understand the code of the **parrot function** provided so that you can get comfortable with creating commands. Note that the function returns a JSON object. Please visit the following webpage to see all the other
way you can send back a response: [Responding to a command.](https://api.slack.com/slash-commands#responding_to_a_command)

**6.** After you feel ready to start creating and supporting new commands, every time after your new command function is ready to be tested, run the following command in terminal (inside the folder where all the files are):

 * run:

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

   Type the option number: 3

   the commands action was updates!
   ```

#### You are ready to try your new commands and add more! -- Follow these steps every time you added more!

---
## How to listen to new events:

**1.** Open in your favorite editor the file **eventHandlers.js**

  * You will see that there is already one function that handles `message` event. We will now show you how to create your own events.

**2.** Go to the **Slack API Webpage** and under **Features** click on **Event Subscriptions**.
  
  * You will see that there are two sections: **Subscribe to Team Events** and **Subscribe to Bot Events**. I will not explain the difference neither talk about all the types of events you can add, that is for sure something that depends on what type of bot you want to create. To learn about events go to this link: [Events API.](https://api.slack.com/events-api)

**3.** If you go back to the **eventHandlers.js** file, you will see an instruction saying that every event you create you will need to have a function to handle it and add into the `events map:`

 ```js
/**
 * Map that contains the events that this bot can listen too associated with
 * the function that will deal with that event
 *
 * NOTE: add to this map any new event to be supported
 *
 * NOTE: *CANNOT NAME THE FUNCTIONS AS THE TYPE OF THE EVENT* OW
 *       silently doesn't like it
 */
var events = {'message' : messageType, '<event name>' : <name of the function that will handle that event>};
 ```

 **NOTE:** please note that every function that will handle a new event should return a **javascript PROMISE.**

**5.** Please read and understand the code of the **parrot function** provided so that you can get comfortable with creating commands. Note that the function returns a JSON object. Please visit the following webpage to see all the other
way you can send back a response: [Responding to Events.](https://api.slack.com/events-api#receiving_events)

 **6.** After you feel ready to start listening to new events, every time after your new function which will handle an event is ready to be tested, run the following command in terminal (inside the folder where all the files are):

 * run:

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

   Type the option number: 5

   the events action was updates!
   ```
#### You are ready to try your new events and add more! -- Follow these steps every time you added more!

---
## How to update an existing command or event:

**1.** If you simply want to change the code of the function that handles given event or command:
  * Make the changes to the code and save the changes.
  * Run: `make run` and type the option number:
    * **3:** if you updated the code of a command.
    * **5:** if you updated the code of an event.

**2.** If you want to change the name of the command:
  * Go to the **Slack API Webpage** and under **Features**, **Slash Commands**, edit the command you want.
  * Update the `commands map` in the **commandHandlers.js**.
  * Update the name of the function.
  * Run: `make run` and type the option number: **3**

**3.** If you want to delete an event or command:
  * If it is a command:
    * Go to the **Slack API Webpage** and under **Features**, **Slash Commands**, delete the command you want.
    * Delete the command from the `commands map` and also delete the function from **commandHandlers.js**.
    * Run: `make run` and type the option number: **3**
  * If it is an event:
    * Go to the **Slack API Webpage** and under **Features**, **Event Subscriptions**, delete the event you want.
    * Delete the command from the `events map` and also delete the function from **eventHandlers.js**.
    * Run: `make run` and type the option number: **5**