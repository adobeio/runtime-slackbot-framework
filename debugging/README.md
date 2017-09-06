## Debugging your commands or events functions:

Debug your new command and events functions using **OpenWhisk**.

#### The current way of seeing logs:

 **1.** Want to see how the actions are being triggered live?
   1. Go to terminal and run:
      ```bash
      wsk activation poll
      ```
   2. Type `control c` to exit.

 **2.** Want to get the logs of the most recent triggered action?
   ```bash
   wsk activation list -l1 | tail -n1 | cut -d ' ' -f1 | xargs wsk activation logs
   ```

 **2.** Want to debug after the action is triggered?
   1. Go to terminal and run:
      ```bash
      wsk activation list --limit 1
      ```
      You will see that the output is:
      ```bash
      <some string> <name of the action currently debugging>
      ```

      If, for example, you are testing a new command that you added, the action **commands** will be the name displayed.

   2. You will see that there is a `String` before the name of the action. **Copy** that `String`.

   3. Now, run in terminal:
      ```bash
      wsk activation get <the string you just copied>
      ```
      You will see that a huge JSON object is printed out. You can see the **response**, the **result** and the **logs** inside that JSON object.

      **simulation of the 3 steps above:**
      ```bash
      **-macOS:Test **$ wsk activation list --limit 1
      activations
      42bb1fdd886f4a4780c82ae5ef7012bb commands
      **-macOS:Test **$ wsk activation get 42bb1fdd886f4a4780c82ae5ef7012bb
      ```

   4. Make sure that you add `console.log(...)` inside your commands or events function, so that your task of reading the logs in the JSON object is helpful for you to figure out the bug :stuck_out_tongue_winking_eye:
