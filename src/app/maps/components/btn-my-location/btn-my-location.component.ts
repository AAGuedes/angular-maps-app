import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  private placesService: PlacesService = inject(PlacesService);
  private mapService: MapService = inject(MapService);

  goToMyLocation(): void {
    if(!this.placesService.isUserLocationReady) throw Error('No user location');
    if(!this.mapService.isMapReady) throw Error('Map not initialized');

    this.mapService.flyTo(this.placesService.userLocation!);
  }

}
