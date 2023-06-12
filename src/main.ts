import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import Mapboxgl from 'mapbox-gl';

import { AppModule } from './app/app.module';

if(!navigator.geolocation) {
  alert('Browser do not support Geolocation');
  throw new Error('Browser do not support Geolocation');
}

Mapboxgl.accessToken='pk.eyJ1IjoiYWdyYW04NSIsImEiOiJjbGk5NDVjZzQwNjVoM2ZwcTJydWJjaWRhIn0.6MVBy-tp3GCBgqTdDpbQcQ';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
