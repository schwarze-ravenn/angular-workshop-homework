import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripList } from '../../components/trip-list/trip-list';

@Component({
    selector: 'page-trip-overview',
    templateUrl: './trip-overview.html',
    styleUrl: './trip-overview.css',
    imports: [TripList, RouterLink],
})
export class TripOverviewPage { }
