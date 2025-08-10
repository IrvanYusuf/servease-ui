import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("id");

export const generateAvailableDates = (totalDays = 7) => {
  const today = dayjs().tz("Asia/Jakarta").startOf("day"); // hari ini, jam 00:00 di Jakarta

  const dayOfWeek = today.day(); // 0 = Sunday
  const daysSinceMonday = (dayOfWeek + 6) % 7; // Senin = 0, Minggu = 6

  const startDate = today.subtract(daysSinceMonday, "day"); // mundur ke Senin minggu ini

  const dates = [];

  for (let i = 0; i < totalDays; i++) {
    const date = startDate.add(i, "day");

    const isoDate = date.format("YYYY-MM-DD");
    const isAvailable = date.isSame(today) || date.isAfter(today); // hari ini atau ke depan

    dates.push({
      date: isoDate,
      day: date.locale("id").format("dddd"),
      available: isAvailable,
    });
  }

  return dates;
};
