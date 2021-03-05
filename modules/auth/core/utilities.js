export const isUnset = o => typeof o === 'undefined' || o === null
export const isSet = o => !isUnset(o)

/**
 * Get property defined by dot notation in string.
 */
export function getProp(holder, propName) {
  if (!propName || !holder) {
    return holder
  }

  if (propName in holder) {
    return holder[propName]
  }

  const propParts = Array.isArray(propName) ? propName : (propName + '').split('.')

  let result = holder
  while (propParts.length && result) {
    result = result[propParts.shift()]
  }

  return result
}
