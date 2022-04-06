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
