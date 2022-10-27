import {Component} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'nm-lottie-loader',
  templateUrl: './lottie-loader.component.html',
  styleUrls: ['./lottie-loader.component.scss']
})
export class LottieLoaderComponent {

  constructor() {
  }

  options: AnimationOptions = {
    path: "/assets/rover-loader.json"
  };
}
