const vscode = require('vscode')
const fs = require('fs')
const path = require('path')
const { generateTheme } = require('./icons/themes')
const files = require('./icons/files/_fileSchema.json')
const folders = require('./icons/folders/_folderSchema.json')

function activate(context) {
  const base = generateTheme()

  const finalTheme = {
    // Definitions
    fonts: base.fonts,
    iconDefinitions: {
      ...base.iconDefinitions,
      ...files.iconDefinitions,
      ...folders.iconDefinitions,
    },

    // Files
    file: files.file ?? base.file,
    fileNames: { ...base.fileNames, ...files.fileNames },
    fileExtensions: { ...base.fileExtensions, ...files.fileExtensions },
    languageIds: { ...base.languageIds, ...files.languageIds },

    // Folders
    folder: folders.folder ?? base.folder,
    folderExpanded: folders.folderExpanded ?? base.folderExpanded,
    folderNames: { ...base.folderNames, ...folders.folderNames },
    folderNamesExpanded: {
      ...base.folderNamesExpanded,
      ...folders.folderNamesExpanded,
    },

    // Misc
    light: { ...base.light, ...folders.light, ...files.light },
    highContrast: {
      ...base.highContrast,
      ...folders.highContrast,
      ...files.highContrast,
    },
  }

  fs.writeFileSync(
    path.join(__dirname, './r-icons-icon-theme.json'),
    JSON.stringify(finalTheme)
  )

  let disposable = vscode.commands.registerCommand(
    'r-icons.helloWorld',
    function () {
      vscode.window.showInformationMessage('Hello World from r-icons!')
    }
  )

  context.subscriptions.push(disposable)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
