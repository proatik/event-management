import { Attendee } from "../entity/attendee.entity";

export type GetAttendeesResponse = {
  limit?: number;
  totalPages?: number;
  currentPage?: number;
  attendees: Attendee[];
  totalAttendees: number;
};
