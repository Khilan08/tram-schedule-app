import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
