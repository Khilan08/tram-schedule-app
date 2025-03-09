import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TramService {

  private jsonUrl = 'assets/tram-data/tram-list.json'

  constructor(private http: HttpClient) { }

  // Fetch tram data from JSON
  getTramData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  // Fetch stations dynamically from JSON
  getStationsFromJson(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  // Fetch announcements from JSON
  getAnnouncements(): Observable<string[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(response =>
        response.stop_deviations
          ? response.stop_deviations.map((deviation: any) => deviation.message)
          : []
      )
    );
  }

  // API call to get lat/lon for each station
  getStationCoordinates(stationName: string): Promise<{ lat: number; lon: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${stationName},Sweden`;

    return this.http.get<any[]>(url).toPromise().then(response => {
      if (response && response.length > 0) {
        return { lat: parseFloat(response[0].lat), lon: parseFloat(response[0].lon) };
      }
      return null;
    });
  }

}
