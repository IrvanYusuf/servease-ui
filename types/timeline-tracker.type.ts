export interface TimelineTracker {
  tracker: {
    booked_at: string;
    confirmed_at: string;
    completed_at: string;
    cancelled_at: string;
    payment_at: string;
  };
  _id: string;
  booking_id: string;
  service_id: string;
  partner_id: string;
  owner_id: string;
  user_id: string;
  status: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TimelineTrackerKey = keyof TimelineTracker["tracker"];
