import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TramService } from 'src/app/services/tram.service';

@Component({
  selector: 'app-tram-list',
  templateUrl: './tram-list.component.html',
  styleUrls: ['./tram-list.component.scss']
})
export class TramListComponent implements OnInit {
  trams: any[] = [];
  stopDeviations: any[] = [];
  filteredTrams: any[] = [];
  stationFilterOptions: any[] = [];
  displayedColumns: string[] = ['serial', 'line', 'destination', 'scheduledTime', 'arrivalTime'];

  // Search inputs
  source: string = 'Luma';
  destination: string = 'Linde';

  constructor(private tramService: TramService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.tramService.getTramData().subscribe(data => {
      this.trams = data.departures
      this.stopDeviations = data.stop_deviations;
      this.stationFilterOptions = this.stopDeviations[0]?.scope?.stop_areas;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.source == this.destination) {
      this.toastr.error('Please select different Source and Destination station')
      return;
    }
    this.filteredTrams = this.trams
      .filter((tram: any) => tram.line?.transport_mode == 'TRAM')
      .filter((tram: any) => tram.destination == 'Solna station')
      .filter((tram: any) => tram.stop_area?.name?.includes(this.source) || tram.stop_area?.name?.includes(this.destination))
  }

}
