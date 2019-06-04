import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService, ApiAnalysisService } from 'src/app/service';
import { map } from 'rxjs/operators';
import { ResponseTrip, ResponseTripV2 } from 'src/app/service/api/params';
import { SOURCE } from '@angular/core/src/di/injector';
import { LatLngBounds, AgmMap } from '@agm/core';
import { TbSelected } from 'src/app/tb';
import { ModelDateRange } from 'src/app/shared/filters/filter-days/models';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit, AfterViewInit {
  lat: number = 20.5937;
  lng: number =78.9629;
  mSubscription: Subscription
  _mIsLoading = false;
  private map: google.maps.Map = null;
  private heatmap: google.maps.visualization.HeatmapLayer = null;
  mSourcePointers: any[];
  mDestPointers: any[];
  static SOURCE: number = 1;
  _mPointers: any[];
  _mRawValue: ResponseTrip[] = []
  
  mFilterDay = new ModelDateRange('year')

  @ViewChild('AgmMap') agmMap: AgmMap;
  constructor(
    private apiAnalysisService: ApiAnalysisService,
    private sharedDataService: SharedDataService) { }

  ngOnInit() {

    setTimeout(() => {

      this.subscribeData()
    })
  }

  ngAfterViewInit() {
    
  }

  _onFilterRangeChange($event: ModelDateRange){
    this.mFilterDay = $event
    this.subscribeData()
  }

  subscribeData() {

    this._mIsLoading = true;
    this.mSubscription = this.apiAnalysisService.tripsV2(this.mFilterDay.starttime, this.mFilterDay.endtime)
      .pipe(
        map((val: ResponseTripV2)=>val.current_period),
        map((val: ResponseTrip[]) => {
          console.log("vaL3: ", val)

          let source = []
          let dest = []
          val.forEach(element => {

            let latlng = [element.src[0], element.src[1]]//new google.maps.LatLng(element.src[0], element.src[1])
            source.push(latlng)
            latlng = [element.dest[0], element.dest[1]]//new google.maps.LatLng(element.dest[0], element.dest[1])
            dest.push(latlng)
          });

          this.mSourcePointers = source

          this.mDestPointers = dest
          //val[0]

          //console.log("pointers: ", this.mSourcePointers);
          
          //console.log("pointers 2: ", this.mDestPointers);

          return val
        })
      ).subscribe((val: ResponseTrip[]) => {
        this._mRawValue = val
        // let delayReport = this.mTransportersTrip.getDelayReport()
        //this._mChartDelayed = this.mChartDelayedClients
        this.createHeatMap(HeatMapComponent.SOURCE)
        // let chartHighStockSeries = new ChartHighStockSeries();
        //     chartHighStockSeries.data = series;
        //     let chartHighStock = new ChartHighStock(chartHighStockSeries, this.mColor);
        //     chartHighStock.useTime = false;
        //     this._mIsLoading = false;
        //     this._mChartHighStock = chartHighStock;
      })
  }

  onSelectionGroupChange($event: TbSelected) {

    //console.log("selecton change: ", $event);

    this.createHeatMap($event.value)
        

  }

  createHeatMap(type: number) {
    this._mIsLoading = false

    if (type == HeatMapComponent.SOURCE) {
      this._mPointers = this.mSourcePointers
    } else {
      this._mPointers = this.mDestPointers
    }

    // console.log("pointer: ", this._mPointers);
    
   // this.loadMap()
  }

  loadMap() {
    if (!this.map) return
    const coords: google.maps.LatLng[] = this._mPointers; // can also be a google.maps.MVCArray with LatLng[] inside    
    //console.log("loadmap: ", coords);

    if(this.heatmap){
      this.heatmap.set('data', coords);
    }else{
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        map: this.map,
        data: coords
      });
      this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
    this.changeGradient()
    }
    
    
  }

  onMapLoad(mapInstance: any) {
    this.map = mapInstance;
    // let bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();

    // bounds.extend(new google.maps.LatLng(35.026517, 76.046526));
    // bounds.extend(new google.maps.LatLng(8.714076, 77.740972));

    // mapInstance.fitBounds(bounds);
    
    if (this._mIsLoading) {
      return;
    }
    console.log("info: " + this._mIsLoading);
    // here our in other method after you get the coords; but make sure map is loaded
  }

  changeGradient() {
    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(16, 112, 223, 1)',
      'rgba(25, 98, 191, 1)',
      'rgba(31, 76, 176, 1)',
      'rgba(24,52, 145, 1)',
      'rgba(11, 31, 131, 1)',
      'rgba(11, 21, 112, 1)'
    ]
    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
  }

  markers: any[] = [
    {
      lat: 26.540457,
      lng: 88.719391,
      draggable: true,

    },
    {
      lat: 24.633568,
      lng: 87.849251,
      draggable: false
    },
    {
      lat: 28.440554,
      lng: 74.493011,
      draggable: false
    },

  ]

  public styleOld = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    }
  ]


style = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]


}
