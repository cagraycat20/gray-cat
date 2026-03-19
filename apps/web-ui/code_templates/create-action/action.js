const getActionCode = (nameWords) => {
  const constName = nameWords.join('_').toUpperCase()

  const actionName = nameWords.reduce((prev, current) => {
    return prev + current.charAt(0).toUpperCase() + current.substr(1)
  })

  const interfaceName = nameWords.reduce((prev, current) => {
    return prev + current.charAt(0).toUpperCase() + current.substr(1)
  }, '')

  return {
    interfaceName,
    constName,
    actionName,
    code: (
`export const ${constName} = '${constName}'
export interface ${interfaceName} {
  type: typeof ${constName};
}

export function ${actionName}(): ${interfaceName} {
  return {
    type: ${constName},
  }
}
`)
  }

}

module.exports = getActionCode
