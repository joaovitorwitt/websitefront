/**
 * This function receives a title string and returns the title
 * converted into URL format.
 *
 * @example
 * formatTitleForURL("Start Understanding Physics")
 * 'start-understanding-physics'
 *
 * @param title The title to be formatted
 * @returns The formatted title
 */
export function formatTitleForURL(title: any) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

/**
 * This functions received a date objects and converts
 * to the following format: May 12, 2024
 *
 * @param date
 * @returns The formatted date
 */
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
