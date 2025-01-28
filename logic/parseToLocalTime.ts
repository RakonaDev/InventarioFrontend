export const parseToLocalTime = (dateString?: Date) => {
  // Crear un objeto Date a partir de la cadena en formato ISO
  const date = new Date(dateString || '');

  // Formatear la fecha en la zona horaria local
  return date.toLocaleString('es-PE');
};