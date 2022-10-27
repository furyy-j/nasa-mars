import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LottieModule} from "ngx-lottie";
import { LottieLoaderComponent } from './lottie-loader.component';

@NgModule({
  declarations: [LottieLoaderComponent],
  exports: [
    LottieLoaderComponent
  ],
  imports: [
    CommonModule,
    LottieModule
  ]
})
export class LottieLoaderModule { }
