import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { RouterModule, Routes } from '@angular/router';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import player from "lottie-web";
import { LottieModule } from 'ngx-lottie';
import { RoverComponent } from '@modules/rover/rover.component';
import { CameraComponent } from '@modules/camera/camera.component';
import { PhotoComponent } from '@modules/photo/photo.component';
import { EmptyComponent } from '@shared/empty/empty.component';
import { DATEFORMAT } from '@core/constants/date-format.constant';
import { LottieLoaderModule } from '@shared/lottie-loader/lottie-loader.module';
import { AppService } from './services/app.service';


export function playerFactory(): any {
  return player;
}

export const APP_ROUTES: Routes = [
  {
    path: '**',
    redirectTo: 'mars',
    pathMatch: 'full'

  },
  {
    path: 'mars',
    component: AppComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    RoverComponent,
    CameraComponent,
    PhotoComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    AngularSvgIconModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    LottieModule.forRoot({player: playerFactory}),
    LottieLoaderModule

  ],
  providers: [
    AppService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: DATEFORMAT}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
