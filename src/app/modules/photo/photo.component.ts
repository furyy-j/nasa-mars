import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DestroyableComponent } from '@core/directives/destroyable.component';
import { IPhotos } from '@core/interfaces/photos.interface';



@Component({
  selector: 'nm-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent extends DestroyableComponent {
  @Input() photos: IPhotos[];
  @Output() loadMore = this.register(new EventEmitter());
  loading: boolean;

  constructor() {
    super()
  }
  trackByFn(index: number, item: IPhotos) {
    return item.id;
  }
}
