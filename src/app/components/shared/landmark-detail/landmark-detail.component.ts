import { AuthService } from './../../../services/shared/auth.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Landmark } from '../../../models/landmark.model';
import { LandmarkService } from '../../../services/shared/landmark.service';
import { switchMap, map, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../services/shared/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-landmark-detail',
  templateUrl: './landmark-detail.component.html',
  styleUrls: ['./landmark-detail.component.scss']
})
export class LandmarkDetailComponent implements OnInit, OnDestroy {
  @ViewChild('cancelConfirmationModal') cancelConfirmationModal!: ElementRef;
  landmark: Landmark | null = null;
  originalLandmark: Landmark | null = null;
  isLoggedIn: boolean = false;
  authListenerSubs: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});

  constructor(
    private landmarkService: LandmarkService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private authService: AuthService,
    private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        short_info: ['', Validators.required]
      });

      this.form.valueChanges.subscribe(() => {
          this.updateButtonStates();
      });
     }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['objectId']),
      switchMap(objectId => this.landmarkService.updateCurrentLandmark(objectId)),
      first()
    ).subscribe();

    this.landmarkService.currentLandmark$.subscribe(landmark => {
      if (landmark) {
        this.form.patchValue({
          title: landmark.title,
          short_info: landmark.short_info,
          description: landmark.description
        });
        // Update local state
        this.landmark = { ...landmark };
      }
    });
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe(); // Prevent memory leaks
  }

  updateButtonStates(): void {
    const dataChanged = this.form.dirty && this.form.valid;
    const saveButtonElement = document.getElementById('saveButton') as HTMLButtonElement;
    const cancelButtonElement = document.getElementById('cancelButton') as HTMLButtonElement;
    if(saveButtonElement) saveButtonElement.disabled = !dataChanged;
    if(cancelButtonElement) cancelButtonElement.disabled = !dataChanged;
  }

  async saveChanges(): Promise<void> {
    if (this.form.valid && this.landmark) {
      try {
        const updatedLandmark = await this.landmarkService.saveLandmarkDetails(
          this.landmark.objectId || '',
          this.form.value.title,
          this.form.value.short_info,
          this.form.value.description
        );

        // Optionally update local state with the updated landmark details
        this.landmark = updatedLandmark;
        this.toastService.show('Changes saved successfully', { classname: 'bg-success text-light' });
        this.form.markAsPristine();
      } catch (error) {
        this.toastService.show(`Error saving changes: ${(error as any).message}`, { classname: 'bg-danger text-light' });
      }
    }
  }

  async saveChangesLocal(): Promise<void> {
    if (this.form.valid && this.landmark) {
      try {
        await this.landmarkService.saveLandmarkDetails(
          this.landmark.objectId || '',
          this.form.value.title,
          this.form.value.short_info,
          this.form.value.description
        );
        this.toastService.show('Changes saved successfully', { classname: 'bg-success text-light' });
        this.form.markAsPristine();
      } catch (error) {
        this.toastService.show(`Error saving changes: ${(error as any).message}`, { classname: 'bg-danger text-light' });
      }
    }
  }

  closeModal(): void {
    const modal = Modal.getInstance(this.cancelConfirmationModal.nativeElement) || new Modal(this.cancelConfirmationModal.nativeElement);
    modal.hide();
  }

  confirmCancel(): void {
    const modal = Modal.getInstance(this.cancelConfirmationModal.nativeElement) || new Modal(this.cancelConfirmationModal.nativeElement);
    modal.show();
  }

  async actuallyCancel(): Promise<void> {
    // Refetch the landmark data from Parse Server
    await this.fetchLandmark(this.landmark?.objectId || '');
    this.form.markAsPristine();
    this.closeModal();
    this.toastService.show('Changes were not saved', { classname: 'bg-danger text-light' });
  }

  async fetchLandmark(objectId: string): Promise<void> {
    try {
      const landmark = await this.landmarkService.fetchLandmarkById(objectId);
      this.form.patchValue({
        title: landmark.title,
        short_info: landmark.short_info,
        description: landmark.description
      });
      // Update local state
      this.landmark = { ...landmark };
    } catch (error) {
      this.toastService.show('Failed to fetch landmark details', { classname: 'bg-danger text-light' });
    }
  }

}
