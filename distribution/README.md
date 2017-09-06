## How to distribute your bot:

   #### How to share your bot (with people in your team, other teams or to the entire 🌎)

**1.** Open in your favorite editor the file **Distribution/index.html**.

  You will see that this is a simple web page that will be accessed by any user who will want to add your bot to their Slack. You can create your own page however you want the only requirements and the things you should know are the following:

  * Go back again to the **Slack API Webpage**
  * Under **Settings**, click on **Manage Distribution**
  * Under the **Share Your App with your team**, copy the **Embeddable Slack Button** HTML code.
  * Add this button to your webpage.
  * Save your page and upload it to some server.

**2.** Open in your favorite editor the file **src/respondWebPages.js**

  This javascript file contains two function where each function returns as a `String` a web page corresponding to a **Success Page** indicating that the user successfully installed your bot and a **Failure Page** indicating that the your bot wasn't able to be installed. Feel free to customize this html code however you want. Currently the code contains an example which you can base on.

**3.** TODO! -- It is quite advance for now! Look, we first want to make things work and build a crazy bot, so bare with me and spend your time making your bot amazing!