/* =====================================================================
   FILE: components/student-card/student-card.ts
   WHAT: The logic of one student card on the landing page.
   WHY:  A separate component makes the card reusable: the page just
         hands it a student and the card draws itself.
   ===================================================================== */
import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-card',
  // RouterLink lets the whole card navigate without reloading the page.
  imports: [RouterLink],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {
  // The parent page gives us one student through this input.
  // `.required` makes Angular refuse to compile if the parent forgets it.
  readonly student = input.required<Student>();

  // Did the portrait fail to load? Private: only this class changes it.
  private readonly imageFailed = signal(false);

  // The path actually shown: the placeholder if the real image failed.
  // `computed` re-runs only when imageFailed() or student() changes.
  protected readonly photoSrc = computed(() =>
    this.imageFailed() ? 'images/placeholder-portrait.svg' : this.student().photo,
  );

  // Called by the template when the image cannot be loaded.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }
}
