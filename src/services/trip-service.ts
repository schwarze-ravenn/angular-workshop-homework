import { Injectable, signal } from '@angular/core';

export interface Trip {
  id: number;
  name: string;
  description: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly storageKey = 'trips';
  private trips = signal<Trip[]>(this.loadTrips());

  getTrips(): Trip[] {
    return this.trips();
  }

  getTrip(id: Trip['id']): Trip | undefined {
    return this.getTrips().find(trip => trip.id === id);
  }

  addTrip(trip: Omit<Trip, 'id'>): void {
    const id = this.trips().reduce((maxId, currentTrip) => Math.max(maxId, currentTrip.id), 0) + 1;
    const updatedTrips = [...this.trips(), { ...trip, id }];
    this.saveTrips(updatedTrips);
    this.trips.set(updatedTrips);
  }

  removeTrip(id: Trip['id']): void {
    const updatedTrips = this.trips().filter(trip => trip.id !== id);
    this.saveTrips(updatedTrips);
    this.trips.set(updatedTrips);
  }

  private loadTrips(): Trip[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const storedTrips = localStorage.getItem(this.storageKey);
    if (storedTrips === null) {
      return [];
    }

    try {
      const parsedTrips: unknown = JSON.parse(storedTrips);
      if (Array.isArray(parsedTrips) && parsedTrips.every(trip => this.isTrip(trip))) {
        return parsedTrips;
      }

      console.error(`Invalid trip data in LocalStorage key "${this.storageKey}".`);
      return [];
    } catch (error) {
      console.error(`Unable to parse trip data from LocalStorage key "${this.storageKey}".`, error);
      return [];
    }
  }

  private saveTrips(trips: Trip[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(trips));
    }
  }

  private isTrip(value: unknown): value is Trip {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const trip = value as Record<string, unknown>;
    return typeof trip['id'] === 'number'
      && typeof trip['name'] === 'string'
      && typeof trip['description'] === 'string'
      && typeof trip['date'] === 'string';
  }
}
