export function formatTitleForURL(title: any) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export function formatArticleDate(date: any) {
  const dateObject = new Date(date);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  return formattedDate;
}
