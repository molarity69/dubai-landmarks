import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { ToastService } from '../../../services/shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{
  @ViewChild('loginModalRef') loginModalRef!: ElementRef;
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService,
    private toastService: ToastService
    ) { }

  ngAfterViewInit(): void {
      this.openModal('loginModal');
  }

  async login() {
    try {
      await this.authService.login(this.username, this.password);
      this.toastService.show('Logged in successfully', { classname: 'bg-success text-primary' });
      this.closeModal();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.toastService.show( this.capitalize((error as any).message), { classname: 'bg-danger text-primary' });
    }
  }

  openModal(name: string): void {
    const modalElement = document.getElementById(name);
    if (modalElement) {
      modalElement.addEventListener('hide.bs.modal', () => {
        this.navigateHome();
      });
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement: HTMLElement = this.loginModalRef.nativeElement;
    const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
    this.navigateHome();
    modalInstance.hide();
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
