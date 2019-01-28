export function cx(classNameObject:object):string {
  return Object.keys(classNameObject)
    .map(className => classNameObject[className] ? className : '').join(' ');
}
