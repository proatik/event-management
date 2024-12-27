import { Event } from "../entity/event.entity";

export type GetEventsResponse = {
  limit?: number;
  events: Event[];
  totalPages?: number;
  totalEvents: number;
  currentPage?: number;
};
