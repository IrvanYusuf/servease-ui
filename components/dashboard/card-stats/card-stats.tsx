import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface CardStatsProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  colorPrimary:
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "red"
    | "yellow"
    | "indigo"
    | "pink"
    | "gray";
  isCurrency?: boolean;
  subtitle?: string;
}

const CardStats: FC<CardStatsProps> = ({
  colorPrimary,
  icon: Icon,
  value,
  title,
  isCurrency = true,
  subtitle,
}) => {
  // Color variants dengan contrast ratio yang memenuhi WCAG AA (4.5:1)
  const colorVariants = {
    blue: {
      text: "text-blue-700", // Darker blue untuk contrast yang lebih baik
      background: "bg-blue-50",
      icon: "text-blue-700",
      border: "border-blue-200",
    },
    green: {
      text: "text-green-700",
      background: "bg-green-50",
      icon: "text-green-700",
      border: "border-green-200",
    },
    purple: {
      text: "text-purple-700",
      background: "bg-purple-50",
      icon: "text-purple-700",
      border: "border-purple-200",
    },
    orange: {
      text: "text-orange-700",
      background: "bg-orange-50",
      icon: "text-orange-700",
      border: "border-orange-200",
    },
    red: {
      text: "text-red-700",
      background: "bg-red-50",
      icon: "text-red-700",
      border: "border-red-200",
    },
    yellow: {
      text: "text-yellow-800", // Yellow butuh yang lebih dark
      background: "bg-yellow-50",
      icon: "text-yellow-800",
      border: "border-yellow-200",
    },
    indigo: {
      text: "text-indigo-700",
      background: "bg-indigo-50",
      icon: "text-indigo-700",
      border: "border-indigo-200",
    },
    pink: {
      text: "text-pink-700",
      background: "bg-pink-50",
      icon: "text-pink-700",
      border: "border-pink-200",
    },
    gray: {
      text: "text-gray-700",
      background: "bg-gray-50",
      icon: "text-gray-700",
      border: "border-gray-200",
    },
  };

  // Fallback ke gray jika color tidak ditemukan
  const colors =
    colorVariants[colorPrimary as keyof typeof colorVariants] ||
    colorVariants.gray;

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        colors.border,
        "border"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {" "}
            {/* min-w-0 untuk text truncation */}
            <p className={cn("text-sm font-medium mb-1 truncate", colors.text)}>
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
              {isCurrency && "Rp"} {value.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ml-4",
              colors.background
            )}
          >
            <Icon
              className={cn("w-6 h-6", colors.icon)}
              aria-hidden="true" // Icon decorative, hide from screen readers
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardStats;
