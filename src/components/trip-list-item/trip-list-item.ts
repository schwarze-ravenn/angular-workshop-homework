import { Component, computed, input, output, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Trip } from '../../services/trip-service';

@Component({
    selector: 'app-trip-list-item',
    templateUrl: './trip-list-item.html',
    styleUrl: './trip-list-item.css',
    imports: [RouterLink, DatePipe],
})
export class TripListItem {
    trip = input.required<Trip>();
    onShowDate = output();
    onRemove = output<number>();
    isTripInPast: Signal<boolean> = computed(() => this.trip().date < new Date().toISOString())

    getTripLink(): string {
        return `/trip-detail/${this.trip().id}`;
    }

    showDate(trip: Trip): void {
        alert(trip.date);
        this.onShowDate.emit();
    }

    removeTrip(): void {
        this.onRemove.emit(this.trip().id);
    }
}
