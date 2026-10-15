/* =====================================================================
   FILE: src/app/models/staff.model.ts
   WHAT: An INTERFACE describing the shape of one staff member.
   WHY:  staff.service.ts imports it. The starter repo did not include this
         file, so the project could not compile. It matches
         public/mock-api/staff.json.
   ===================================================================== */
export interface StaffMember {
  id: number;
  name: string;
  department: string;
  role: string;
  bio: string;
  quote: string;
  /** Path to the portrait, relative to the /public folder. */
  photo: string;
  featured: boolean;
}
