export function toTitleCase(str: string) {
  return str
    .toLowerCase() // Convierte el string a minúsculas
    .split(' ') // Divide el string en un array de palabras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Convierte la primera letra de cada palabra a mayúscula
    .join(' '); // Une las palabras nuevamente en un string
}