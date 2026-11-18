import { Component, inject, OnInit } from '@angular/core';
import { TripListItem } from '../trip-list-item/trip-list-item';
import { Trip, TripService } from '../../services/trip-service';

@Component({
    selector: 'app-trip-list',
    templateUrl: './trip-list.html',
    styleUrl: './trip-list.css',
    imports: [TripListItem],
})
export class TripList implements OnInit {
    trips: Trip[] = [];
    tripService = inject(TripService);
    now: string;

    constructor() {
        this.now = '2026-11-16';
        this.trips = this.tripService.getTrips();
    }

    ngOnInit() {
        this.now = (new Date()).toISOString();
        console.log('on init', this.now);
    }

    onShowDate() {
        console.log('event was fired from child');
    }

    onRemoveTrip(id: Trip['id']): void {
        this.tripService.removeTrip(id);
        this.trips = this.tripService.getTrips();
    }
}
