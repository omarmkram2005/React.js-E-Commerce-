export default function transDate(date) {
  const selectedDate = new window.Date(date);
  const day = selectedDate.getDate().toString().padStart(2, "0");
  const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = selectedDate.getFullYear();
  return `${year}-${month}-${day}`;
}
