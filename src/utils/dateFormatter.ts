function addZero(date: number): string {
  return date < 10 ? `0${date}` : `${date}`;
}

export default function dateFormatter(strDate: string): string {
  const rawDate = new Date(strDate);
  return `${addZero(rawDate.getDate())}.${addZero(rawDate.getMonth() + 1)}.${rawDate.getFullYear()}`;
}
