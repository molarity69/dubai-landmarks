import { Component, OnInit } from '@angular/core';
import { Landmark } from '../../../models/landmark.model';
import { LandmarkService } from '../../../services/shared/landmark.service';
import { SearchService } from '../../../services/shared/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  landmarks: Landmark[] = [];
  filteredLandmarks: Landmark[] = [];

  constructor(private searchService: SearchService, private landmarkService: LandmarkService) {}

  ngOnInit() {
    this.landmarkService.getLandmarksStream().subscribe(landmarks => {
      this.landmarks = landmarks;
      this.filterLandmarks('');
    });

    // this.searchService.currentSearchText.subscribe(searchText => {
    //   this.filterLandmarks(searchText);
    // });
    this.searchService.currentSearchText.subscribe(searchText => {
      this.landmarkService.searchLandmarks(searchText).then(landmarks => {
        this.filteredLandmarks  = landmarks;
      });
    });
  }

  filterLandmarks(searchText: string) {
    if (!searchText) {
      this.filteredLandmarks = this.landmarks;
      return;
    }
    this.filteredLandmarks = this.landmarks.filter(landmark =>
      landmark.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      landmark.short_info?.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
