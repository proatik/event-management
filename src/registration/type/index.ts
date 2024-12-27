import { Registration } from "../entity/registration.entity";

export type GetRegistrationsResponse = {
  limit?: number;
  totalPages?: number;
  currentPage?: number;
  totalRegistrations: number;
  registrations: Registration[];
};
