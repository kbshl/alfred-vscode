# Alfred Visual Studio Code Project Manager Workflow

Simple workflow that allows you to browse and open [Visual Studio Code](https://code.visualstudio.com/) projects or simply open specified folders/files.

* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)

## Requirements

* [NodeJS](https://nodejs.org)
* [Visual Studio Code Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) - Only if you like to have a project manager for VS Code.
* [Visual Studio Code Command Line](https://code.visualstudio.com/docs/setup/mac)
* [Alfred Powerpack](https://www.alfredapp.com/powerpack)

## Installation

Download the latest `VisualStudioCode.alfredworkflow` from [GitHub](https://github.com/konstantinbueschel/alfred-vs-code/releases) and import it in Alfred.

**Note for Insiders Edition users:** Remember to set the 'vscodeEdition' variable in Workflow Configuration to 'code-insiders'!

## Usage

### Projects

Simply type `vsc` followed by space to list all projects. Optionally type a search string to filter results.

![alfred-vs-code](documentation/screenshot.png)

### Folders / Files

Type `vs` followed by space and search for a specific folder or file to open in Visual Studio Code.

Press and hold `shift` to open that folder or file in a new VS Code window, before pressing return.

## Thanks!

Big Thanks to [Cloudstek](https://github.com/Cloudstek) for his [Alfred Atom Workflow](https://github.com/Cloudstek/alfred-atom) which I used as a base for this project.
