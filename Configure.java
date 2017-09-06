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
 * @author Esteban Posada <epm105@hotmail.com>
 * @copyright Adobe Systems Inc.
 * @version 1.0 - first release
 * @license Apache License, Version 2.0
 *
 * This program creates, updates the actions necessary. It also creates the
 * corresponding json files that are the parameters to the actions. This
 * program was created with the only intention of making the tutorial shorter
 * and easier. People are happy if they need to think less!
 */

 import java.util.*;
 import java.io.*;

 public class Configure {

   // Constant for the name of the file we will store the package information

   // paths
   public static final String LIB_PATH = "./lib/";
   public static final String PARAMS_PATH = LIB_PATH + "params/";
   public static final String LINKS_PATH = "https://runtime-preview.adobe.io/api/v1/web/";


   // parameter files
   public static final String INFO_FILE = PARAMS_PATH + "info.txt";
   public static final String COMMAND_PARAMS = PARAMS_PATH + "commands-params.json";
   public static final String EVENT_PARAMS = PARAMS_PATH + "events-params.json";
   public static final String AUTH_PARAMS = PARAMS_PATH + "auth-params.json";

   // library files
   public static final String COMMAND_FILE = LIB_PATH + "commands.js";
   public static final String EVENT_FILE = LIB_PATH + "events.js";
   public static final String AUTH_FILE = LIB_PATH + "authentication.js";
   public static final String EVENT_TEMP_FILE = LIB_PATH + "eventsTemp.js";
   public static final String SETUP_FILE = LIB_PATH + "setupeventurl.js";
   public static final String PERSIST_FILE = "./node_modules/openwhisk-cache-redis/" +
                                             "openwhisk-cache-redis-0.0.2.js";

   public static void main(String[] args) throws FileNotFoundException {
     Scanner ask = new Scanner(System.in);
     System.out.println();
     System.out.println("Set up your bot production ecosystem!");
     System.out.println("Please type one of the following options:");
     System.out.println();
     System.out.println("    1. setup");
     System.out.println("    2. install");
     System.out.println("    3. update-commands");
     System.out.println("    4. update-distribution");
     System.out.println("    5. update-events");
     System.out.println("    6. delete-build-files");
     System.out.println();
     System.out.print("Type the option number: ");
     String option = ask.nextLine();
     String name = "";
     switch(option) {
       case "1" :
          setup();
          break;
       case "2" :
          name = readPackage();
          install(name);
          break;
       case "6" :
          deleteAll();
          break;
       case "3" :
          name = readPackage();
          updateCommands(name);
          break;
       case "4" :
          name = readPackage();
          updateDistribution(name);
          break;
       case "5" :
          name = readPackage();
          updateEvents(name);
          break;
       default :
          System.out.println("\nInvalid option number: " + option);
     }
     System.out.println();
   }

   public static void setup() throws FileNotFoundException {
      System.out.println();
      System.out.println("setting up OpenWhisk and OW actions...");
      System.out.println("creating identification files for your new bot...");

      // in Scanner
      Scanner input = new Scanner(System.in);

      // Ask user for name of OW package in where to store the bot project
      System.out.println("----------------OW PROJECT---------------");
      System.out.print("Enter the name of your OW namespace: ");
      String namespaceName = input.nextLine();
      System.out.print("Enter the name of your bot project (package name): ");
      String packageName = input.nextLine();
      System.out.println("You package names is: " + packageName + ". Please remember this name!");
      System.out.println("----------------OW PROJECT---------------");

      System.out.println();

      // Ask the user for the App information
      System.out.println("----------------BOT INFORMATION----------");
      System.out.print("Enter the verification token: ");
      String verifyToken = input.nextLine();
      System.out.print("Enter the cliend id: ");
      String clientId = input.nextLine();
      System.out.print("Enter the cliend secret: ");
      String clientSecret = input.nextLine();
      System.out.print("Enter a secret state (will be used to prevent attacks, " +
                       "please remember this state): ");
      String state = input.nextLine();
      System.out.println("----------------BOT INFORMATION----------");

      System.out.println();

      System.out.println("----------------USEFUL LINKS-------------");
      System.out.println("Events link: " + LINKS_PATH + namespaceName + "/" + packageName + "/events");
      System.out.println("Auth link: " + LINKS_PATH + namespaceName + "/" + packageName + "/authentication");
      System.out.println("Commands link: " + LINKS_PATH + namespaceName + "/" + packageName + "/commands");
      System.out.println("----------------USEFUL LINKS-------------");

      // Save the packageName in a txt file, will need this package name
      // and the namespace name in other stages
      File directory = new File(PARAMS_PATH);
      directory.mkdir();
      PrintStream projectInfo = new PrintStream(new File(INFO_FILE));
      projectInfo.println(namespaceName);
      projectInfo.println(packageName);

      // Create package with given name
      String[] packageS = {"wsk", "package", "create", "" + packageName};
      try {
         Process proc = new ProcessBuilder(packageS).start();
         proc.waitFor();
      } catch(Exception err) {
         System.out.println("An error happened, please contact us or try again!");
         System.exit(1);
      }

      // Create the parameter files

      // Auth param file
      PrintStream authParams = new PrintStream(new File(AUTH_PARAMS));
      String body = "{ \"check\": \"" + state + "\", \"id\": " + "\"" +
                       clientId + "\", \"secret\": \"" + clientSecret + "\" }";
      authParams.print(body);

      // Event param file
      PrintStream eventParams = new PrintStream(new File(EVENT_PARAMS));
      body = "{ \"verifyToken\": \"" + verifyToken + "\" }";
      eventParams.print(body);

      // Command param file
      PrintStream commandParams = new PrintStream(new File(COMMAND_PARAMS));
      body = "{ \"verifyToken\": \"" + verifyToken + "\" }";
      commandParams.print(body);

      String[] action = {"wsk", "action", "create", packageName + "/events",
                         SETUP_FILE, "--web", "true"};
      String[] installGruntCLI = {"npm", "install", "-g", "grunt-cli"};
      String[] runOurNpmInstall = {"npm", "install"};

      try {
         Process proc = new ProcessBuilder(action).start();
         proc.waitFor();
      } catch(Exception err) {
         System.out.println("An error happened, please contact us or try again!");
         System.exit(1);
      }

      try {
         Process proc = new ProcessBuilder(installGruntCLI).start();
         proc.waitFor();
      } catch(Exception err) {
         System.out.println("An error happened, please contact us or try again!");
         System.exit(1);
      }

      try {
         Process proc = new ProcessBuilder(runOurNpmInstall).start();
         proc.waitFor();
      } catch(Exception err) {
         System.out.println("An error happened, please contact us or try again!");
         System.exit(1);
      }

      System.out.println();
      System.out.println("we are done setting up everything, please continue " +
                         "following the instructions.");
   }

   public static void install(String packageName) {
     System.out.println();
     System.out.println("installing required actions and files...");

     // Before we create the actions the actions to deploy, merge the lib files
     // and the developers files (events and commands)
     String[] mergeCommands = {"grunt", "--gruntfile", "GruntfileCommands.js"};
     String[] mergeEvents = {"grunt", "--gruntfile", "GruntfileEvents.js"};

     // Merge with the new merged commands and events files the verificationLib
     String[] mergeVerCommands = {"grunt", "--gruntfile", "GruntfileVerCommands.js"};
     String[] mergeVerEvents = {"grunt", "--gruntfile", "GruntfileVerEvents.js"};

     try {
        Process proc = new ProcessBuilder(mergeCommands).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     try {
        Process proc = new ProcessBuilder(mergeEvents).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     try {
        Process proc = new ProcessBuilder(mergeVerCommands).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     try {
        Process proc = new ProcessBuilder(mergeVerEvents).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     // Now, create the commands and authentication action and update the events
     // action

     // Commands action
     String[] commandAction = {"wsk", "action", "create", packageName + "/commands",
                               COMMAND_FILE, "--param-file",
                               COMMAND_PARAMS, "--web", "true"};
     try {
        Process proc = new ProcessBuilder(commandAction).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }
     // Authentication action
     String[] authAction = {"wsk", "action", "create", packageName + "/authentication",
                            AUTH_FILE, "--param-file",
                            AUTH_PARAMS, "--web", "true"};
     try {
        Process proc = new ProcessBuilder(authAction).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }
     // Update events action
     String[] eventsAction = {"wsk", "action", "update", packageName + "/events",
                              EVENT_FILE, "--param-file",
                              EVENT_PARAMS, "--web", "true"};
     try {
        Process proc = new ProcessBuilder(eventsAction).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     // Create the persist action inside another
     String[] cachePackage = {"wsk", "package", "create", "cache"};
     String[] persistAction = {"wsk", "action", "create", "cache/persist",
                               PERSIST_FILE,
                               "--param", "redis_host", "//10.0.2.159:6380"};
     try {
        Process proc = new ProcessBuilder(cachePackage).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     try {
        Process proc = new ProcessBuilder(persistAction).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     System.out.println();
     System.out.println("we are done installing the actions!");
   }

   public static void deleteAll() {
      // Create the persist action inside another
      String[] rmParams = {"rm", "-rf", PARAMS_PATH};
      String[] rmConfigure = {"rm", "Configure.class"};
      try {
         Process proc = new ProcessBuilder(rmParams).start();
         proc.waitFor();
      } catch(Exception err) {
         System.out.println("An error happened, please contact us or try again!");
         System.exit(1);
      }
      try {
         Process proc = new ProcessBuilder(rmConfigure).start();
         proc.waitFor();
      } catch(Exception err) {
         System.out.println("An error happened, please contact us or try again!");
         System.exit(1);
      }
   }

   public static void updateCommands(String packageName) {

     // Merge the files and create a new commands.js
     String[] mergeCommands = {"grunt", "--gruntfile", "GruntfileCommands.js"};
     // Merge with the new merged commands and events files the verificationLib
     String[] mergeVerCommands = {"grunt", "--gruntfile", "GruntfileVerCommands.js"};

     try {
        Process proc = new ProcessBuilder(mergeCommands).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     try {
        Process proc = new ProcessBuilder(mergeVerCommands).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     // update commands action
     String[] commandAction = {"wsk", "action", "update", packageName + "/commands",
                               COMMAND_FILE, "--param-file",
                               COMMAND_PARAMS, "--web", "true"};
     try {
        Process proc = new ProcessBuilder(commandAction).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }
     System.out.println();
     System.out.println("the commands action was updates!\n");

   }

   public static void updateDistribution(String packageName) {

     // Merge the files and create a new commands.js
     String[] mergeAuth = {"grunt", "--gruntfile", "GruntfileAuth.js"};

     // update authentication action
     String[] authAction = {"wsk", "action", "update", packageName + "/authentication",
                            AUTH_FILE, "--param-file",
                            AUTH_PARAMS, "--web", "true"};

     try {
        Process proc = new ProcessBuilder(mergeAuth).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     try {
        Process proc = new ProcessBuilder(authAction).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }
     System.out.println();
     System.out.println("the distribution pages were updated!\n");
   }

   public static void updateEvents(String packageName) {

     // Merge the files and create a new commands.js
     String[] mergeEvents = {"grunt", "--gruntfile", "GruntfileEvents.js"};
     // Merge with the new merged commands and events files the verificationLib
     String[] mergeVerEvents = {"grunt", "--gruntfile", "GruntfileVerEvents.js"};

     try {
        Process proc = new ProcessBuilder(mergeEvents).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     try {
        Process proc = new ProcessBuilder(mergeVerEvents).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }

     // update events action
     String[] eventsAction = {"wsk", "action", "update", packageName + "/events",
                              EVENT_FILE, "--param-file",
                              EVENT_PARAMS, "--web", "true"};
     try {
        Process proc = new ProcessBuilder(eventsAction).start();
        proc.waitFor();
     } catch(Exception err) {
        System.out.println("An error happened, please contact us or try again!");
        System.exit(1);
     }
     System.out.println();
     System.out.println("the events action was updates!\n");
   }

   public static String readPackage() throws FileNotFoundException {
      Scanner file = new Scanner(new File(INFO_FILE));
      file.nextLine();
      return file.nextLine();
   }

   public static String readNamespace() throws FileNotFoundException {
      Scanner file = new Scanner(new File(INFO_FILE));
      return file.nextLine();
   }
 }
