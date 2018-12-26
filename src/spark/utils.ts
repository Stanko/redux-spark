export const camel2const = (camelCase:string):string => {
  return camelCase
    .replace(/([A-Z])/g, match => `_${ match }`)
    .toUpperCase();
};

export const capitalize = (stringToCapitalize:string):string => {
  return stringToCapitalize.replace(/^./, c => c.toUpperCase());
};