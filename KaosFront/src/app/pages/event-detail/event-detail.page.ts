import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  eventId: string;
  listUsers: string[];
  listUsersLiked: string[];

  liked: boolean = false;
  constructor() {}

  ngOnInit() {}

  changeLiked() {
    this.liked = !this.liked;
  }
}
