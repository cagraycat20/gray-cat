const fs = require('fs')
const getActionData = require('./action')
const getReducerData = require('./reducer')

if (process.argv.length < 4) {
  console.warn('Not enough arguments.\nUse: yarn a <action-name> <file-name>\n');
  process.exit();
}

const actionName = process.argv[2]
const fileNamePrefix = process.argv[3]

const actionFileName = `./src/actions/${fileNamePrefix}.actions.ts`
const reducerFileName = `./src/reducers/${fileNamePrefix}.reducer.ts`
const actionsIndexFileName = `./src/actions/index.ts`
const reducersIndexFileName = `./src/reducers/index.ts`
const storeTypesFileName = `./src/types/store-state.types.ts`

const reducerNameCamelCase = fileNamePrefix.split('-').reduce((prev, current) => {
  return prev + current.charAt(0).toUpperCase() + current.substr(1)
})

const actionData = getActionData(actionName.split('-'))
let reducerData = getReducerData(reducerNameCamelCase, actionData)

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
  let indentifierEntries = 0

  data.forEach((line, index) => {
    if (line.trim() === identifier) {
      if (indentifierEntries < linesToInsert.length) {
        resultData.push(linesToInsert[indentifierEntries])
      }
      indentifierEntries++
    }
    resultData.push(line)
  })

  fs.writeFile(file, resultData.join('\n'), function (err) {
    if (err) return console.log(err)
  })
}

if (fs.existsSync(actionFileName)) {
  const actionsCode = fs.readFileSync(actionFileName, 'utf8');
  writeFile(actionFileName, actionsCode + '\n' + actionData.code);

  reducerData = fs.readFileSync(reducerFileName, 'utf8');
  reducerData = reducerData.replace(
    /\}\s*from\s*'..\/actions'/,
    `  ${actionData.interfaceName},\n  ${actionData.constName},\n$&`,
  );
  writeFile(reducerFileName, reducerData);
} else {
  writeFile(actionFileName, actionData.code)
  writeFile(reducerFileName, reducerData)

  fs.appendFile(
    actionsIndexFileName,
    `export * from './${fileNamePrefix}.actions'
  `,
    function (err) {
      if (err) {
        return console.log(err)
      }
      console.log(actionsIndexFileName + ' was saved')
    }
  )

  const defIdentifier = '// INSERT HERE'

  insertLine(
    reducersIndexFileName,
    defIdentifier,
    `import { ${reducerNameCamelCase} } from './${fileNamePrefix}.reducer'`,
    `  ${reducerNameCamelCase},`
  )

  insertLine(
    storeTypesFileName,
    defIdentifier,
    `  ${reducerNameCamelCase}: {},`
  )
}