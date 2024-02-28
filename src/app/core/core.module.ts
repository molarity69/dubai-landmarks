import { NgModule, Optional, SkipSelf } from '@angular/core';
import * as Parse from 'parse';
import { parseConfig } from '../../environments/environment'; // Adjust the path as necessary

@NgModule({
  // declarations, imports, providers, etc.
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }

    // Initialize Parse
    Parse.initialize(parseConfig.appId, undefined, parseConfig.masterKey);
    (Parse as any).serverURL = parseConfig.serverUrl;
  }
}
