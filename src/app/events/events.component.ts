import { Component, OnInit } from '@angular/core';
import {
  CommonModule,
  DatePipe,
} from '@angular/common';              // DatePipe
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EventService, Event } from '../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    AvatarModule,
    TagModule,
    BadgeModule,
    ChipModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    HttpClientModule,
  ],
  providers: [EventService, DatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  selectedEvent: Event | null = null;
  detailsVisible = false;
  createEventVisible = false;
  newEvent: Partial<Event> = {
    name: '', // Changed from title
    location: { address: '', coordinates: { lat: 0, lng: 0 } },
    tags: [],
    eventType: 'General',
    maxParticipants: 10,
    time: '12:00',
  };

  constructor(
    private sanitizer: DomSanitizer,
    private eventService: EventService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.resetNewEvent();
  }

  /** Haalt events op via beveiligde API */
  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => (this.events = events),
      error: (error) => console.error('Error loading events:', error),
    });
  }

  showEventDetails(event: Event): void {
    this.selectedEvent = event;
    this.detailsVisible = true;
  }

  toggleJoinEvent(event: Event): void {
    event.isJoined = !event.isJoined;

    if (event.isJoined) {
      event.participants.push({ id: 999, name: 'Current User' });
    } else {
      event.participants = event.participants.filter((p) => p.id !== 999);
    }

    this.eventService.updateEvent(event).subscribe({
      error: (err) => console.error('Error updating event:', err),
    });
  }

  getMapUrl(event: Event | null): SafeResourceUrl | null {
    if (!event) return null;
    let url = '';

    if (event.location?.coordinates) {
      const { lat, lng } = event.location.coordinates;
      url = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    } else if (event.location?.address) {
      url = `https://maps.google.com/maps?q=${encodeURIComponent(
        event.location.address
      )}&output=embed`;
    } else {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onCreateEvent(): void {
    this.resetNewEvent();
    this.createEventVisible = true;
  }

  submitNewEvent(): void {
    if (
      this.newEvent.name && // Changed from title
      this.newEvent.date &&
      this.newEvent.location?.address
    ) {
      let formattedDate: string | null = null;

      if (typeof this.newEvent.date === 'object' && this.newEvent.date) {
        formattedDate = this.datePipe.transform(this.newEvent.date, 'yyyy-MM-dd');
      } else if (typeof this.newEvent.date === 'string') {
        formattedDate = this.newEvent.date;
      }

      if (!formattedDate) {
        console.error('Invalid date format.');
        return;
      }

      const finalEvent: Partial<Event> = {
        name: this.newEvent.name, // Changed from title
        date: formattedDate,
        time: this.newEvent.time || 'Time TBD',
        coverImage: this.newEvent.coverImage || '/uploads/default-event.jpg',
        location: {
          address: this.newEvent.location.address,
          coordinates: this.newEvent.location.coordinates || { lat: 0, lng: 0 },
        },
        organizer: { id: 1, name: 'Current User' },
        description: this.newEvent.description || '',
        participants: [],
        maxParticipants: this.newEvent.maxParticipants || 10,
        tags: Array.isArray(this.newEvent.tags) ? this.newEvent.tags : [],
        eventType: this.newEvent.eventType || 'General',
      };

      this.eventService.createEvent(finalEvent).subscribe({
        next: (created) => {
          const newEventForList: Event = {
            ...created,
            isJoined: false,
          };
          this.events.push(newEventForList);
          this.createEventVisible = false;
        },
        error: (err) => console.error('Error creating event:', err),
      });
    } else {
      console.error('Required fields are missing.');
    }
  }

  cancelCreateEvent(): void {
    this.createEventVisible = false;
  }

  private resetNewEvent(): void {
    this.newEvent = {
      name: '', // Changed from title
      location: { address: '', coordinates: { lat: 0, lng: 0 } },
      tags: [],
      eventType: 'General',
      maxParticipants: 10,
      time: '12:00',
    };
  }
}
