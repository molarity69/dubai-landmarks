import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './../../../services/shared/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  host: {'[class.ngb-toasts]': 'true'},
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }
}
