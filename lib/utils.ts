import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(relativeTime);
dayjs.locale("id");

export function formatDate({
  date,
  show = "full",
}: {
  date: Date;
  show?: string;
}) {
  if (!date) return "-";

  if (show === "relative") {
    return dayjs(date).fromNow(); // contoh: "2 hari yang lalu"
  }
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Jakarta",
  };

  if (show === "full") {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.hour12 = false;
  }

  return new Date(date).toLocaleString("id-ID", options);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = ({
  length = 30,
  text = "",
}: {
  length: number;
  text: string;
}) => {
  return text.length > length ? `${text.slice(0, length)}....` : text;
};

export const warrantyGenerate = ({ date }: { date: Date }) => {
  const next30Days = new Date(date);
  next30Days.setDate(next30Days.getDate() + 30);
  return next30Days;
};

export function getInitials(name: string): string {
  if (!name) return "";

  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();

  return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
}

export function copyToClipboard(payload: string | number) {
  return navigator.clipboard.writeText(payload.toString());
}

export const generatePageNumbers = (current: number, total: number) => {
  const delta = 2;
  const range: (number | string)[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);

  if (left > 2) {
    range.push("...");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total);
  }

  return range;
};

type FormatMonthlyRevenueParams = {
  _id: { year: number; month: number };
  totalRevenue: number;
};

export const formatMonthlyRevenue = (data: FormatMonthlyRevenueParams[]) => {
  return data.map((item) => {
    const date = new Date(item._id.year, item._id.month - 1);
    const month = date.toLocaleString("default", { month: "short" });
    return {
      month: `${month} ${item._id.year}`,
      revenue: item.totalRevenue,
    };
  });
};

export const formatPaymentMethod = (data: "cash" | "bank_transfer") => {
  return data === "bank_transfer" ? "Bank Transfer" : "Tunai";
};
