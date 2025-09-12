export const formatDateTime = (date: string, time: string) => {
  const event = new Date(`${date}T${time}`); // ISO8601 dateTime format
  return event.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'shortGeneric',
  });
};
