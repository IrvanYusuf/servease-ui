import TrackerItem, {
  LabelConfig,
  TimelineTracker,
} from "@/components/tracker-item";
import { FC } from "react";

interface CardTimelineProps {
  tracker: TimelineTracker;
  labelConfig: LabelConfig;
}

const CardTimeline: FC<CardTimelineProps> = ({ tracker, labelConfig }) => {
  return (
    <div className="space-y-6">
      {Object.keys(labelConfig).map((key) => (
        <TrackerItem
          key={key}
          tracker={tracker}
          trackerKey={key}
          labelConfig={labelConfig}
        />
      ))}
    </div>
  );
};

export default CardTimeline;
