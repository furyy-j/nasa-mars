import { Component, OnInit } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { AppService } from "./services/app.service";
import { DestroyableComponent } from '@core/directives/destroyable.component';
import { IPhotos } from '@core/interfaces/photos.interface';
import { ICameras, IRovers } from '@core/interfaces/app.interface';
import { IQueryParams } from '@core/interfaces/query-params.interface';

const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent extends DestroyableComponent implements OnInit {
  form: FormGroup;
  photos: IPhotos[];
  path: string;
  loading: boolean = false;
  cameraPositions: ICameras[] = [
    {
      name: 'Front Hazard Avoidance Camera',
      code: 'FHAZ',
      rovers: ['curiosity', 'opportunity', 'spirit']
    },
    {
      name: 'Rear Hazard Avoidance Camera',
      code: 'RHAZ',
      rovers: ['curiosity', 'opportunity', 'spirit']
    },
    {
      name: 'Mast Camera',
      code: 'MAST',
      rovers: ['curiosity']
    },
    {
      name: 'Chemistry and Camera Complex',
      code: 'CHEMCAM',
      rovers: ['curiosity']
    },
    {
      name: 'Mars Hand Lens Imager',
      code: 'MAHLI',
      rovers: ['curiosity']
    },
    {
      name: 'Mars Descent Imager',
      code: 'MARDI',
      rovers: ['curiosity']
    },
    {
      name: 'Navigation Camera',
      code: 'NAVCAM',
      rovers: ['curiosity', 'opportunity', 'spirit']
    },
    {
      name: 'Panoramic Camera',
      code: 'PANCAM',
      rovers: ['opportunity', 'spirit']
    },
    {
      name: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
      code: 'MINITES',
      rovers: ['opportunity', 'spirit']
    }
  ]
  filteredCameras: ICameras[] = []
  private queryParams: IQueryParams | Params = {
    page: 1,
    sol: '',
    earth_date: '',
    camera: '',
    api_key: 'b1Rw82UjVHWd7lBEud9EkwV9z6iTmWstQZpN9X0r'
  }

  constructor(
    private service: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.parseQueryParams()
  }

  roverChanged(rover: IRovers): void {
    this.path = `${rover.code}/photos`
    this.queryParams.rover = rover.code
    this.filteredCameras = this.cameraPositions.filter(item => item.rovers.includes(rover.code));
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: this.queryParams
      }).catch();

  }

  changeCamera(camera: ICameras) {
    this.queryParams.camera = camera.code;
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: this.queryParams
      }).catch();
  }


  getImage(item: string): void {
    this.loading = true;
    item === 'search' ? this.queryParams.page = 1 : this.queryParams.page
    this.queryParams.sol = this.form.value.sol
    this.queryParams.earth_date = this.form.value.earth_date
    let param = Object.assign({}, this.queryParams)
    delete this.queryParams.rover
    this.service.getImages(this.queryParams, this.path)
      .pipe(
        finalize(() => this.loading = false),
        takeUntil(this.destroyed$)
      )
      .subscribe(res => {
        if (this.queryParams.page > 1) {
          this.photos = this.photos.concat(res.photos);
        } else {
          this.photos = res.photos;
        }
        this.router.navigate([],
          {
            relativeTo: this.route,
            queryParams: param
          }).catch();
      })
  }


  loadPhotos() {
    this.queryParams.page++;
    this.getImage('load')
  }

  private createForm(): void {
    this.form = this.fb.group({
      rover: ['', Validators.required],
      camera: '',
      sol: '',
      earth_date: [moment().format('YYYY-MM-DD')]
    })
  }

  private parseQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        if (Object.keys(params).length !== 0) {
          this.queryParams = Object.assign({}, params)
          this.form.patchValue({...params})
          this.router.navigate([],
            {
              relativeTo: this.route,
              queryParams: this.queryParams
            }).catch();
        }
      });
  }
}
