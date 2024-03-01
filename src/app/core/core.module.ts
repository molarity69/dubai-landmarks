import { NgModule, Optional, SkipSelf } from '@angular/core';
import * as Parse from 'parse';
import { parseConfig } from '../../environments/environment';
import { ToastComponent } from '../components/global/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ToastComponent],
  imports: [NgbToastModule, CommonModule],
  exports: [ToastComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }

    // Initialize Parse
    Object.assign(Parse, { serverURL: parseConfig.serverUrl });
    Parse.initialize(parseConfig.appId);
  }
}
