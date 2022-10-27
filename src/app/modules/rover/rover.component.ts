import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NG_VALUE_ACCESSOR } from '@angular/forms';
import { DestroyableComponent } from '@core/directives/destroyable.component';
import { IRovers } from '@core/interfaces/app.interface';

@Component({
  selector: 'nm-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RoverComponent
    }
  ]
})
export class RoverComponent extends DestroyableComponent implements OnInit {
  @Output() roverChange = this.register(new EventEmitter());
  rovers: IRovers[] = [
    {
      name: 'Curiosity',
      code: 'curiosity',
      img: './assets/icons/curiosity.svg'
    },
    {
      name: 'Opportunity',
      code: 'opportunity',
      img: './assets/icons/opportunity.svg'
    },
    {
      name: 'Spirit',
      code: 'spirit',
      img: './assets/icons/spirit.svg'
    }
  ];
  roverImg: string;
  selected: IRovers | undefined;
  onChange = (_: any): void => {
  };
  onTouched = (): void => {
  };

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

  changeRover(rover: IRovers): void {
    this.roverChange.emit(rover);
    this.roverImg = rover.img
  }


  writeValue(value: string): void {
    if (value === '') {
      return
    }
      this.selected = this.rovers.find(item => item.code === value);
      if (this.selected) {
        this.changeRover(this.selected)
      }
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

}
