const fs = require('fs')
const getContainerCode = require('./container-template')
const getStylesCode = require('./styles-template')
const getViewCode = require('./view-template')
const getTypesCode = require('./types-template')

const componentPrefix = 'gc-'

let componentName = process.argv[2]
if (!componentName.startsWith(componentPrefix)) {
  componentName = componentPrefix + componentName
}

let directory = process.argv[3] || ''
if (directory && !directory.endsWith('/')) {
  directory += '/'
}

const componentNamePascalCase = componentName.split('-').reduce((prev, current) => {
  return prev + current.charAt(0).toUpperCase() + current.substr(1)
}, '')

const containerCode = getContainerCode(componentName, componentNamePascalCase)
const viewCode = getViewCode(componentName, componentNamePascalCase)
const stylesCode = getStylesCode()
const typesCode = getTypesCode()

const containerFileName = `./src/components/${directory + componentName}/${componentName}.container.ts`
const viewFileName = `./src/components/${directory + componentName}/${componentName}.view.tsx`
const stylesFileName = `./src/components/${directory + componentName}/${componentName}.styles.ts`
const typesFileName = `./src/components/${directory + componentName}/${componentName}.types.ts`
const indexFileName = `./src/components/${directory}index.ts`

fs.mkdir(`./src/components/${directory + componentName}`, err => err ? console.log(err) : null)

function writeFile (file, text) {
  fs.writeFile(file, text, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(file + ' was saved')
  })
}

function insertLine (file, identifier, ...linesToInsert) {
  const data = fs.readFileSync(file).toString().split('\n')
  const resultData = []
  let identifierEntries = 0

  data.forEach((line, index) => {
    if (line.trim() === identifier) {
      if (identifierEntries < linesToInsert.length) {
        resultData.push(linesToInsert[identifierEntries])
      }
      identifierEntries++
    }
    resultData.push(line)
  })

  fs.writeFile(file, resultData.join('\n'), function (err) {
    if (err) return console.log(err)
  })
}

writeFile(containerFileName, containerCode)
writeFile(viewFileName, viewCode)
writeFile(stylesFileName, stylesCode)
writeFile(typesFileName, typesCode)

const defIdentifier = '// INSERT HERE'

if (fs.existsSync(indexFileName)) {
  insertLine(
    indexFileName,
    defIdentifier,
    `export { ${componentNamePascalCase}Container as ${
      componentNamePascalCase} } from './${componentName}/${componentName}.container';`
  )
}
