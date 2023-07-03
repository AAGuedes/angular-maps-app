import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesApiCliemt: PlacesApiClient = inject(PlacesApiClient);

  public userLocation: [number, number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude];
        },
        (err) => {
          alert('Could not obtain geolocation');
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if(!this.userLocation) throw new Error('No user location');

    this.isLoadingPlaces = true;

    this.placesApiCliemt.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.userLocation?.join(',')
      }
    })
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
      })
  }

}
