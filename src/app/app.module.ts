import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './components/features/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
