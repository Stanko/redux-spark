export const camel2const = (camelCase:string):string => {
  return camelCase
    .replace(/([A-Z])/g, match => `_${ match }`)
    .toUpperCase();
};