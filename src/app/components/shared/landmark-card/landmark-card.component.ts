import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Landmark } from '../../../models/landmark.model';

@Component({
  selector: 'app-landmark-card',
  templateUrl: './landmark-card.component.html',
  styleUrls: ['./landmark-card.component.scss']
})
export class LandmarkCardComponent {
  @Input() landmark: Landmark | undefined;

  showLightbox: boolean = false;

  constructor(private router: Router) {}

  navigate() {
    if (this.landmark) {
      const url = `/landmark/${this.landmark.objectId}`;
      this.router.navigateByUrl(url);
    }
  }

  toggleLightbox() {
    this.showLightbox = !this.showLightbox;
  }
}
