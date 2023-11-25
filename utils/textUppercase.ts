export function textUppercase(str: string):string {
  return Array?.from(
    str.split('+'),
    (x: string) => x.charAt(0).toUpperCase() + x.slice(1)
  ).join(' ');
}
