import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

// Define Location as it appears in the 'locations' table of db.json
export interface DbLocation {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

/* -- Adjusted Event interface -- */
export interface Event {
  id: number;
  name: string; // Changed from title
  eventType?: string; // Added from db.json
  date: string; // ISO-string “yyyy-MM-dd”
  time: string; // bv. “18:30”
  coverImage: string;
  description: string;
  tags: string[];
  maxParticipants: number;
  participants: { id: number; name: string }[];
  organizer: { id: number; name: string };
  location: { // Populated by the service
    id?: number;
    name?: string;
    address: string;
    coordinates?: { lat: number; lng: number };
    latitude?: number; // Raw latitude from DbLocation
    longitude?: number; // Raw longitude from DbLocation
  };
  isJoined?: boolean; // client-side flag
}

// Interface for events as they are fetched from /events (with location as {id:X})
interface RawEvent extends Omit<Event, 'location' | 'name'> {
  name: string; // Ensure name is part of RawEvent if it's different from Event
  location: { id: number };
  // Add other properties from db.json events if they differ from the final Event interface
  eventType?: string;
}

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly api = 'http://localhost:3000'; // Changed to json-server default

  constructor(private http: HttpClient) {}

  /** GET /events - modified to fetch and merge location details */
  getEvents(): Observable<Event[]> {
    return this.http.get<RawEvent[]>(`${this.api}/events`).pipe(
      switchMap(rawEvents => {
        if (!rawEvents || rawEvents.length === 0) {
          return of([]);
        }
        return this.http.get<DbLocation[]>(`${this.api}/locations`).pipe(
          map(dbLocations => {
            const locationsMap = new Map(dbLocations.map(loc => [loc.id, loc]));
            return rawEvents.map(rawEvent => {
              const dbLocation = locationsMap.get(rawEvent.location.id);
              const eventLocation: Event['location'] = dbLocation
                ? {
                    id: dbLocation.id,
                    name: dbLocation.name,
                    address: dbLocation.address,
                    latitude: dbLocation.latitude,
                    longitude: dbLocation.longitude,
                    coordinates: { lat: dbLocation.latitude, lng: dbLocation.longitude }
                  }
                : { // Fallback if location not found
                    id: rawEvent.location.id,
                    address: 'Address not found for location ID: ' + rawEvent.location.id
                  };
              
              // Ensure all properties from RawEvent are mapped to Event
              const { location, ...restOfRawEvent } = rawEvent;
              return {
                ...restOfRawEvent,
                location: eventLocation
              } as Event; // Cast to Event
            });
          })
        );
      })
    );
  }

  /** POST /events */
  createEvent(event: Partial<Event>): Observable<Event> {
    // When creating, json-server will handle the nested location object as is.
    return this.http.post<Event>(`${this.api}/events`, event);
  }

  /** PUT /events/{id} */
  updateEvent(event: Event): Observable<Event> {
    // When updating, the full event object (including populated location) is sent.
    return this.http.put<Event>(`${this.api}/events/${event.id}`, event);
  }
}
