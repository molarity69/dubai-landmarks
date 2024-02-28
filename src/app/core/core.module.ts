import { NgModule, Optional, SkipSelf } from '@angular/core';
import * as Parse from 'parse';
import { parseConfig } from '../../environments/environment';

@NgModule({
  // declarations, imports, providers, etc.
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
