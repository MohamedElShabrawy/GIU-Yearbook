/* =====================================================================
   FILE: src/app/models/story-draft.model.ts
   WHAT: The shape of what the profile form holds, and what we keep in
         localStorage.
   WHY:  localStorage only stores TEXT. We turn this object into JSON
         text to save it and back into an object to restore it.
   ===================================================================== */

export interface StoryDraft {
  quote: string;
  story: string;
  moment: string;
  next: string;
  consent: boolean;
}

/** What actually sits in localStorage: the form values + when we saved. */
export interface StoredStoryDraft {
  savedAt: string; // ISO date text, e.g. "2026-11-12T14:32:05.000Z"
  values: StoryDraft;
}
