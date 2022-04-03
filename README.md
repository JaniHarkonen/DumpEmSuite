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
