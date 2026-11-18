import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip, TripService } from '../../services/trip-service';
import { GpsLocation, WeatherServiceTs } from '../../services/weather-service.ts';

@Component({
    selector: 'page-trip-detail',
    templateUrl: './trip-detail.html',
    styleUrl: './trip-detail.css',
    imports: [],
})
export class TripDetailPage implements OnInit {
    tripService = inject(TripService);
    weatherService = inject(WeatherServiceTs);
    private activatedRoute = inject(ActivatedRoute);
    trip: WritableSignal<Trip | undefined> = signal(undefined);
    gps: WritableSignal<GpsLocation | undefined> = signal(undefined);
    tripId = -1;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.tripId = Number(params['id'] ?? -1);
            const trip = this.tripService.getTrip(this.tripId);
            this.trip.set(trip);
            if (trip) {
                this.weatherService.getGpsCoordinates(trip.name)
                    .subscribe((nextLocation) => {
                        this.gps.set(nextLocation.results[0]);
                    });
            }
        })
    }
}
