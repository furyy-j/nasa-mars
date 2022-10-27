import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DestroyableComponent } from '@core/directives/destroyable.component';
import { ICameras } from '@core/interfaces/app.interface';


@Component({
  selector: 'nm-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent extends DestroyableComponent {
  @Input() form: FormGroup;
  @Input() cameras: ICameras[];
  @Output() cameraChange = this.register(new EventEmitter());

  marsTime: boolean = true;

  constructor() {
    super()
  }

  changeMarsTime(marsTime: boolean): void {
    if (marsTime) {
      this.marsTime = false
      this.form.get('earth_date')?.setValue('')
    } else {
      this.marsTime = true
      this.form.get('sol')?.setValue('')
    }
  }
}
