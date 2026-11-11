import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';
import { SavedService } from '../../services/saved.service';

@Component({
  imports: [RouterLink],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  // The parent page will give us one student through this input.
  readonly student = input.required<Student>();

  // The shared service. The card does not own the saved list; it only asks.
  private readonly saved = inject(SavedService);

  // Is THIS student saved? computed() re-runs when the service's list changes.
  protected readonly isSaved = computed(() => this.saved.isSaved(this.student().id));

  // Remember whether the student's photo failed to load.
  private readonly imageFailed = signal(false);

  // Use the placeholder when the original photo cannot load.
  protected readonly photoSrc = computed(() =>
    this.imageFailed() ? 'images/placeholder-portrait.svg' : this.student().photo,
  );

  // Called when the browser cannot load the image.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }

  protected onToggleSaved(event: Event): void {
    // The whole card is a link. Without these two lines, a click on the
    // heart would ALSO open the student's profile.
    event.preventDefault();
    event.stopPropagation();
    this.saved.toggle(this.student().id);
  }
}
