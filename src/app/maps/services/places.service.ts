import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlacesResponse } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private httpClient: HttpClient = inject(HttpClient);

  public userLocation: [number, number] | undefined;

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
    this.httpClient.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?limit=5&proximity=ip&language=es&access_token=pk.eyJ1IjoiYWdyYW04NSIsImEiOiJjbGk5NDVjZzQwNjVoM2ZwcTJydWJjaWRhIn0.6MVBy-tp3GCBgqTdDpbQcQ`)
      .subscribe(resp => {
        console.log(resp.features);
      })
  }

}
