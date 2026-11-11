/* =====================================================================
   FILE: src/app/services/story-draft.service.ts
   WHAT: The ONLY place that talks to localStorage for story drafts.
   WHY:  Same idea as StudentService: components ask, they do not care
         where the data lives. Later this could call Laravel instead.
   ===================================================================== */

import { Injectable } from '@angular/core';

import { StoredStoryDraft, StoryDraft } from '../models/story-draft.model';

@Injectable({ providedIn: 'root' })
export class StoryDraftService {
  // STEP 1: One key PER STUDENT. Two students on the same lab PC must not
  // see each other's draft. The "giu:" prefix keeps our keys together.
  private key(studentId: number): string {
    return `giu:story-draft:${studentId}`;
  }

  // STEP 2: Read. localStorage.getItem gives TEXT, or null if nothing is saved.
  load(studentId: number): StoredStoryDraft | null {
    try {
      const text = localStorage.getItem(this.key(studentId));
      return text ? (JSON.parse(text) as StoredStoryDraft) : null;
    } catch {
      // COMMON MISTAKE: skipping try/catch. If the saved text is damaged,
      // JSON.parse throws and the whole page breaks.
      return null;
    }
  }

  // STEP 3: Write. JSON.stringify turns the object into text.
  // Returns the save time, or null if the browser refused (storage full).
  save(studentId: number, values: StoryDraft): string | null {
    const stored: StoredStoryDraft = { savedAt: new Date().toISOString(), values };
    try {
      localStorage.setItem(this.key(studentId), JSON.stringify(stored));
      return stored.savedAt;
    } catch {
      return null;
    }
  }

  // STEP 4: Delete. Used after the student publishes.
  clear(studentId: number): void {
    localStorage.removeItem(this.key(studentId));
  }
}
