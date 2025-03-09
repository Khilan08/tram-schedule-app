import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TramService } from 'src/app/services/tram.service';
import * as d3 from 'd3';
import * as L from 'leaflet';

@Component({
  selector: 'app-tram-list',
  templateUrl: './tram-list.component.html',
  styleUrls: ['./tram-list.component.scss']
})
export class TramListComponent implements OnInit, AfterViewInit {
  @ViewChild('stationList', { static: true }) stationList!: ElementRef;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  trams: any[] = [];
  stopDeviations: any[] = [];
  filteredTrams: any[] = [];
  map: any;
  stationFilterOptions: any[] = [];
  displayedColumns: string[] = ['serial', 'line', 'destination', 'scheduledTime', 'arrivalTime'];

  // Search inputs
  source: string = 'Luma';
  destination: string = 'Linde';
  stations: { name: string; lat?: number; lon?: number }[] = [];
  tramMarker: any;
  tramIndex = 0;
  tramPosition: number = 0; // Tram position for animation
  currentStationIndex: number = 0;
  announcements: string[] = [];

  constructor(private tramService: TramService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.tramService.getTramData().subscribe(data => {
      this.trams = data.departures
      this.stopDeviations = data.stop_deviations;
      this.stationFilterOptions = this.stopDeviations[0]?.scope?.stop_areas;
      this.applyFilter();
    });
  }

  async ngAfterViewInit() {
    await this.fetchStationList();
    await this.fetchStationCoordinates();
    this.initMap();
    this.plotTramRoute();

    this.fetchAnnouncements();
  }

  /**
   * Filters the stations to only include the Luma to Linde tram route.
  */
  applyFilter() {
    if (this.source == this.destination) {
      this.toastr.error('Please select different Source and Destination station')
      return;
    }
    this.filteredTrams = this.trams
      .filter((tram: any) => tram.line?.transport_mode == 'TRAM')
      .filter((tram: any) => tram.destination == 'Solna station')
      .filter((tram: any) => tram.stop_area?.name?.includes('Luma') || tram.stop_area?.name?.includes('Linde'));
  }

  displayStationList() {
    if (!this.stations.length) return;  // ✅ Prevents errors if no data

    const svgHeight = this.stations.length * 50;  // ✅ Dynamic height based on station count
    const svg = d3.select(this.stationList.nativeElement)
      .append('svg')
      .attr('width', 350)
      .attr('height', svgHeight);

    // Draw Gray Vertical Line
    svg.append('line')
      .attr('x1', 50).attr('y1', 20)
      .attr('x2', 50).attr('y2', svgHeight - 20)
      .attr('stroke', 'gray')  // ✅ Gray color
      .attr('stroke-width', 3);

    // Add Grey Circles on the Line
    svg.selectAll('circle')
      .data(this.stations)
      .enter()
      .append('circle')
      .attr('cx', 50)
      .attr('cy', (_, i) => 30 + i * 50) // Adjust spacing dynamically
      .attr('r', 10)
      .attr('fill', 'white')  // Gray color
      .attr('stroke', 'grey')  // Border for better visibility
      .attr('stroke-width', 2);

    // Add Station Names Next to Circles
    svg.selectAll('text')
      .data(this.stations)
      .enter()
      .append('text')
      .attr('x', 70)  // ✅ Space between text and line
      .attr('y', (_, i) => 35 + i * 50)
      .text(d => d.name)
      .attr('font-size', '14px')
      .attr('fill', 'black');
  }

  // Fetch all stations from the JSON file
  async fetchStationList() {
    this.tramService.getStationsFromJson().subscribe(response => {
      if (response && response.stop_deviations) {
        response.stop_deviations.forEach((deviation: { scope: { stop_areas: any[]; }; }) => {
          if (deviation.scope?.stop_areas) {
            deviation.scope.stop_areas.forEach(stop => {
              if (!this.stations.some(s => s.name === stop.name)) {
                this.stations.push({ name: stop.name });
              }
            });
          }
        });
        this.displayStationList();
      }
    });
  }

  /**
   * Fetches latitude and longitude for each station.
  */
  async fetchStationCoordinates() {
    for (let station of this.stations) {
      try {
        const coords = await this.tramService.getStationCoordinates(station.name);
        if (coords) {
          station.lat = coords.lat;
          station.lon = coords.lon;
        }
      } catch (error) {
        console.error(`Failed to fetch coordinates for ${station.name}`, error);
      }
    }
  }

   /**
    * Fetches announcements from the JSON file using the TramDataService.
    * Populates the `announcements` array with messages from the API response.
   */
  fetchAnnouncements() {
    this.tramService.getAnnouncements().subscribe(messages => {
      this.announcements = messages;
    });
  }

  /**
   * Initializes the Leaflet map and sets the initial view.
  */
  initMap() {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [39.8282, -98.5795],
      zoom: 3
    }).setView([59.3293, 18.0686], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  /**
   * Plots the tram route on the map.
   * Draws a polyline to connect the filtered stations and adds markers.
  */
  plotTramRoute() {
    let routeCoords: any = this.stations.map(station => [station.lat, station.lon]);

    L.polyline(routeCoords, { color: 'blue', weight: 5 }).addTo(this.map);

    this.stations.forEach((station: any) => {
      L.marker([station.lat, station.lon])
        .addTo(this.map)
        .bindPopup(`<b>${station.name}</b>`);
    });
  }

}
