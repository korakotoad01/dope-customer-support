export function timeformat(timestamp: string | number) {
  console.log("timestamp: ", timestamp);
  const timestampInSeconds = Number(timestamp) / 1000;
  const dateObject = new Date(timestampInSeconds * 1000);

  const formattedDateTime = dateObject
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);
  return formattedDateTime;
}
export function reverseformat(dateString: any) {
  const dateObject = new Date(dateString);
  return dateObject.getTime(); // Returns the timestamp in milliseconds
}

export function newDate() {
  return new Date().toISOString().replace("T", " ").substring(0, 19);
}
