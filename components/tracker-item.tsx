import { CheckCircle } from "lucide-react";
import { FC } from "react";

// Generic interface untuk timeline tracker
export interface TimelineTracker {
  [key: string]: string | null | undefined;
}

// Interface untuk konfigurasi label
export interface LabelConfig {
  [key: string]: string;
}

interface TrackerItemProps {
  tracker: TimelineTracker;
  trackerKey: string;
  labelConfig: LabelConfig;
  dateFormat?: Intl.DateTimeFormatOptions;
}

const TrackerItem: FC<TrackerItemProps> = ({
  tracker,
  trackerKey,
  labelConfig,
  dateFormat = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
}) => {
  const isActive = tracker?.[trackerKey];
  const label = labelConfig[trackerKey];

  return (
    <div className="flex items-start space-x-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isActive ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        {isActive ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
        )}
      </div>
      <div className="flex-1">
        <h4
          className={`font-medium ${
            isActive ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {label}
        </h4>
        {isActive && (
          <p className="text-xs text-gray-500">
            {new Date(isActive).toLocaleDateString("id-ID", dateFormat)}
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackerItem;
