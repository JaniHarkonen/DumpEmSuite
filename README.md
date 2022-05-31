# DumpEm Suite

## Relation to DumpEm and motivations
This appliaction is not to be confused with DumpEm, which is an application that can be used to create custom workspaces.
The appliactions share a similar name because DumpEm was initially designed to create workspaces for investment purposes.
A while ago I created a workspace on DumpEm that proved to be a very helpful tool for analysing investment candidates and
writing theses. Due to the complexity as well as the general-purpose nature of DumpEm, I have decided to start from 
scratch and create a standalone investment suite based on the workspace. This way it is possible to break free from the
resctrictions and inefficiencies imposed by DumpEm and the development of the suite can be separated from the development
of DumpEm.

## Change log

### 4.4.2020
Initial commit. The default setup used for React + Electron had to be modified a bit. For some reason wait-on waited
indefinitely for the React-app to become online which resulted in the Electron window never being created. wait-on has now
been removed from the electron:serve-routine, however it has not yet been uninstalled.

### 5.4.2022
Created a general sketch of the folder as well as the element layout. Removed useless lines of code and created the
JavaScript files for all the workspace components that will be used.

A new design pattern will also be adopted for simple components, such as buttons that do nothing but render a representation
and register a user click. The question surrounding such components was whether or not they should be given their separate
file — and if so — whether a general button component should be created that is then passed a different CSS styling. The
draw back for separate files was that many files with a very similar code base would have to be created, and creating a
general component would likely not cut down the amount of programming that would have to be done. Furthermore, a general
component may be useless due to the differences in the HTML-presentations. The draw back of simply writing the component into
the parent component itself was the ever-expanding codebase of the parent component. Everytime a new button would be added,
a new styled component would have to be declared at the bottom of the parent file.

The solution that will be used in this project is to write all the functionality into the parent component that would normally
import and draw the simple component. The CSS-styling of the simple component is then imported from a separate file that is
located in the same folder as the parent component usually following the naming convention: ParentComponent_ChildComponent.js.
Because the functionality of a simple component is easy — and most of the functionality (such as the function executed upon
click) has to be declared in the parent component regardless — code clarity and separation of conserns are not degraded with
this approach. Additionally, the separation of styling into multiple JavaScript-files external to the parent component
increases the clarity of the code. Generally applicable style declarations may even be promoted to the "common" components
folder.

### 6.4.2022
Created extremely basic versions of the workspace tabs and their components. The user can now switch between tabs and view the
bare-bones versions of FileExplorer, Note and SymbolList. Further development of the components has so far been put on hold
due to their depency on the WorkspaceModel. The Workspace model — which will be developed next —, stores the current
configuration of a workspace. The model is used to pass information between React-components as well as to store the workspace
in an external file.

### 7.4.2022
Created the base for the Workspace Model and the Model Manager that will handle the opening, saving, modifying, serving and
closing of Workspace Models. So far, the Model Manager can only open workspaces while the application can only display one.
The "Volume", "Price action" and "TA #1" tabs now receive their data from their parent Workspace Model. The features will be
developed further as the focus gets now shifted towards creating all the functionalities as well as improving the UI
presentation of the SymbolList. This is done so that the prodcut vision becomes more clear and concrete, which will be
beneficial in deciding what functionalities to add to the Workspace Model and the Model Manager.

### 12.4.2022
Finally, the core functionalities of the SymbolList have been adequately completed. The user can now change color codes and
filter settings on the list, and the changes will be reflected in subsequent tabs as well as the Workspace Model. Completing
these features required broad changes to the implementation and the concerns of all of the components of the business logic — 
Model Manager, Workspace Model, model components — as well as the flow of information between the involved React components.

Several difficulties were faced while designing the UI and its architecture. Most of the problems could've been completely
avoided if the desgin decision to utilize databases instead of external .json-files was made earlier. In fact, the whole 
Workspace Model along with the Model Manager had to be implemented simply to hold a copy of the external file. With a database
such an approach would've been unnecessary, as any changes to the data could've been posted directly into the database via a
database server. Filter options could've been passed within the query statement which would've solved the several issues faced
while implementing the filtration panel.

Nonetheless, the architecture as well as the functionalities have now been developed to a sufficient enough level so as to
proceed to the next phase in the in process. As of now, changes made to the Workspace Model are only stored in the model
components and not in the JSON-representation of the workspace. For this reason, saving models in an external file is not yet
possible, nor is it the priority for the next phase. Initially, this phase was intended as the one where the SymbolList is
developed with all the functionalities as well as a more fleshed out UI-presentation. However, due to the large changes to the
business logic a second round of development has to be carried out later on in the project.

Next, the development focus will be on the "Fundamental"-tab. The goal is to create all the functionalities just like in the
case of SymbolList, however the UI-representation will still be kept simple.

### 18.5.2022
After a long hiatus, a decision has been made to re-do file system for the DumpEm Suite. Since last update, I have learned
more about databases and their implementations in JavaScript, and I've come to the conclusion that the current file system is
extremely inefficient. Not only is making changes to the external files slow and memory consuming, the file system has also
forced the implementation of the complex Workspace Models as stated in the previous development diary entry. Furthermore
external files require dealing with directories making the external storing of the files messy as well.

To avoid having to continue the development of a wholly inefficient system, an SQLite database manager is to be be implemented
that will be used to make queries to lightweight databases that will, from this point on, represent the Workspaces and their
contents. Before choosing SQLite as the database solution, the usage of MariaDB and MongoDB were considered. It seems that the
other solutions were more useful in projects where the database was stored on an external server ,as setting up one would
require the user to download the database manager and to run the database creation script. Without a  doubt, such a process
could be automated, however, SQLite provided a lightweight and easy-to-implement local solution that requires no additional
setting up on the behalf of the user and can be easily bundled in with the DumpEm Suite application. Furthermore, MariaDB and
MongoDB are perhaps more suitable when dealing with large datasets which wont be necessary in this project, as a Workspace will
likely only contain very limited amounts of data. Also, the structure of the database will be very much fixed making a solution
such as MongoDB less useful, since the way that MongoDB stores data is much more unstructured (usage of JSONs).

Despite being a major change, the separation between the UI and the file system within the codebase is very clear. Because of
this, implementing SQLite shouldn't be too problematic, however, each time a React-component makes requests to the
WorkspaceModel, those functions have to be replaced with SQLite requests. To avoid problems in the future, creating an API of
sorts that will function as a separation between the database and the UI will be considered. There also has to be a separate
Database Controller object, that will be used to execute queries through the API.

### 22.5.2022
SQLite3 has now been implemented as the method of external storage. From this point on, workspaces will be stored entirely
within SQLite database files (db). An "interface" has also been implemented to facilitate the communication between the external
storage handler and the application front-end. This was done to avoid having to re-write parts of React-elements in the future,
in case other means of external storage are implemented. Instead, WorkspaceManager — the "interface" — will be utilized by the
React-components to make requests to the DatabaseController, which in turn is in charge of querying the database. The
DatabaseController is the part of the application "back-end" that handles the actual communication with the database, including
establishing/closing connection, sending fetch/post/delete -typed queries and returning result sets of completed queries.

The implementation of SQLite wasn't without problems. Initially, SQLite3-library was used low-level communication layer between
the application "back-end" and the database. However, the asynchronous nature of SQLite3 proved it difficult to use in tandem
with React's states. All logic regarding result handling had to be delegated into a callback function separate from the
function where the query requests were made, even though it was often the case that the results from the query were to be used
in the code immediately after. SQLite3 would've imposed inefficiencies in processing as well as lead to much confusion while
debugging. To avoid asynchronicity, better-sqlite3-library was chosen. better-sqlite3 functions almost exactly like SQLite3,
however all functions relative to the project are handled synchronously, thus making better-sqlite3 the superior solution.

Next, the development will focus on further integration between the application and SQLite. A more critical look is also taken
at the existing architecture decisions on the React-side.

### 24.5.2022
Some changes to the architecture of the Views as well as Symobol list filter options have been made to minimize reusing of code.
SQLite functionalities developed in the earlier diary entry have been further implemented to the Views, and filtration of stocks
is now possible. The filter options panel was completely re-written, as the previous version was confusing and lacked important
functionalities; filters would only apply to the data that was to be brought from the previous view, no way of filtering the
stocks on display.

Next, the "basic" Views (views with only a SymbolList) will be developed to include all required functionalities. The bringing of
stocks from previous views will be handled a bit differently to avoid querying the database everytime the "bring"-filters are
changed. Stocks will only be brought upon clicking a separate button. If the action would remove already color coded stocks, a
modal popup will be displayed to confirm the bringing.

### 28.5.2022
All functionalities, aside from the extraction of stocks from a downloaded website, have been implemented to the Views using the
new SQLite-approach. A modal popup component was created and implemented that is currently only utilized by the SymbolList when
clearing stocks before bringing new ones from the previous tab. The SQLite-queries perform slower than previously expected,
however dealing with larger datasets will probably be faster. It isn't clear if the datasets being operated on will be large
enough to see any drastic performance when writing changes to the Workspace content, however, with the introduction of
WorkspaceManager-interface changing to other database solution or even reverting to the previous file system -based solution.

Most requests to the DatabaseController from WorkspaceManager follow the same form where the validity of the database controller
object is first checked, followed by the query, ending with the returning of either the query result or a console logging of an
error message and the returning of a null object, in case the query fails. For this reason, "request"-method was implemented to
be used internally by the WorkspaceManager. "request" takes in a function that will be executed after a database controller
object validity check and before the returning of the query result as described above. This makes it possible to create
additional checks or other repetitive in a scalable way.

Next, the development will focus on the reduction of repetitive code as well as error checking within the DatabaseController.
Architectural choices will also be criticly examined and possibly changed elsewhere in the Workspace and its components, for
example, there is a lot of repition with hooks as well as prop drilling which may be solved with better design or the usage of
useContext-hooks. The changing of WorkspaceManager-interface's methods to static ones will also be considered.

### 30.5.2022
Some architectural changes have been made to the React-elements in order to avoid the frequent re-rendering of the entire
application every time the user changes the color code of a stock, for example. A better architecture for the implementation of
the modal has also been desgined. Initially, the usage of React contexts was considered, however, this didn't give the necessary
control over the rendering of sibling components, as information has to always be passed through a parent component that too will
be re-rendered if the context changes. To create a modal, class-based components are determined to be the best option, as they
allow other components to set their state re-rendering the component without the need for the parent component to re-render.

The most drastic shift has been made to the architecture of the DatabaseController. Initially, the controller would carry out the
formation of a query string, the execution of the query as well as the formation and returning of the query result. While this
isn't necessarily the worst approach, due to the limited total number of queries that the program will likely make, there was a
lot of repeating code. Before the changes, there were some measures taken to reduce the amount of repition as well as the amount
of code present. For example, Entities — objects designed to take in a database query result, and convert it to a JSON
obfuscating the structure of the database somewhat — were introduced to avoid having to craft response JSONs. It quickly became
clear that the reduction of repetitive code required the separation of queries into classes.

As a result, the following structure was deviced. DatabaseController uses Query-objects to form and execute queries to the
database. Query-objects can be split, as of now, into 4 separate categories: Fetches, Inserts, Replaces and Deletes (Inserts an
Replaces being considered Posts, a hypothetical class). These Query-objects contain the code for querying the database, whose
reference is provided in the constructor. The queries consist of four parts: query string formation, querying of the database,
formatting of the query result and returing of the formatted result. The query strings are formed using QueryComponent-objects
that are essentially the building blocks of a query. As of now, these components include: Column, Table, Value, Placeholder and
Equation. Each instance subclass of Query uses these components to construct the query string, by default, by using the
formatQuery-method called during query execution. Subclasses may also extend or override the formatQuery-method, in case the
default behavior is insufficient. After executing the query, Query-class gives one last chance to format the result via the
formatResult-method, that will take in the query result and output a modified result. When the ExternalStorageAPI (previously
WorkspaceManager) requests a query from the DatabaseController, the query type is paired up with an appropriate Query using a
switch-case-structure.

Finally, the WorkspaceManager was renamed to ExternalStorageAPI as it cannot be seen as "managing" a Workspace, rather, it is
simply an interface through which queries are requested and query results are returned. API has also been decided to be a
better description due it being used in projects created by other developers. The methods witihn ExternalStorageAPI have also
been made static. This is because there likely wont be any need for the instantiation of ExternalStorageAPI, after all, it is
considered an interface, or a link, between the React-app and the DatabaseController, and creating separate links between
different databases will be unnecessary; a connection to a database can simply be closed, followed by connection to another.
Making ExternalStorageAPI uninstantiated also makes it easier for React-components to integrate the API to their functioning
whenever necessary, without having to request the instance from a context, or to receive the instance through props, which
likely have drilled through parent components that have no need for the API.

Next, the development will shift towards the creation of the Modal-popup. 