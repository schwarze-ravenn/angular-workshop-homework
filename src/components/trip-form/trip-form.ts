import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Trip, TripService } from '../../services/trip-service';

@Component({
    selector: 'app-trip-form',
    templateUrl: './trip-form.html',
    styleUrl: './trip-form.css',
    imports: [FormField],
})
export class TripForm {
    private tripService = inject(TripService);
    private router = inject(Router);

    tripModel = signal<Omit<Trip, 'id'>>({
        name: '',
        description: '',
        date: '',
    });
    tripForm = form(this.tripModel, (schemaPath) => {
        required(schemaPath.name, { message: 'Required ' });
    });

    onSubmit($event: Event) {
        $event.preventDefault();
        if (this.tripForm().invalid()) {
            console.log('invalid form', this.tripForm().errors())
            return;
        }
        this.tripService.addTrip(this.tripModel());
        void this.router.navigate(['/']);
    }

    tripStart() {
        return this.tripForm.date().value();
    }
}
