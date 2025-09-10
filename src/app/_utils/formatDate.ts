export const formatDate = (date: string) => {
  const event = new Date(date);
  return event.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};