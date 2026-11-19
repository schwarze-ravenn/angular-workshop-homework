import { TestBed } from '@angular/core/testing';

import { TripService } from '../services/trip-service';

describe('TripService', () => {
  let service: TripService;

  beforeEach(() => {
    localStorage.removeItem('trips');
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('starts with an empty list when LocalStorage has no trips', () => {
    expect(service.getTrips()).toEqual([]);
  });

  it('adds and persists a trip', () => {
    service.addTrip({
      name: 'Rome',
      description: 'Weekend trip',
      date: '2026-11-20',
    });

    expect(service.getTrips()).toEqual([
      {
        id: 1,
        name: 'Rome',
        description: 'Weekend trip',
        date: '2026-11-20',
      },
    ]);
    expect(JSON.parse(localStorage.getItem('trips') ?? '[]')).toEqual(service.getTrips());
  });

  it('removes and persists a trip', () => {
    service.addTrip({
      name: 'Rome',
      description: 'Weekend trip',
      date: '2026-11-20',
    });

    service.removeTrip(1);

    expect(service.getTrips()).toEqual([]);
    expect(JSON.parse(localStorage.getItem('trips') ?? '[]')).toEqual([]);
  });
});
