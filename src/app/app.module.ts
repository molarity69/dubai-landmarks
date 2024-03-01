import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { CoreRootComponent } from './core/core-root.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LandmarkCardComponent } from './components/shared/landmark-card/landmark-card.component';
import { HomeComponent } from './components/features/home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { LandmarkDetailComponent } from './components/shared/landmark-detail/landmark-detail.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoreRootComponent,
    HomeComponent,
    LandmarkCardComponent,
    LandmarkDetailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [CoreRootComponent]
})
export class AppModule { }
