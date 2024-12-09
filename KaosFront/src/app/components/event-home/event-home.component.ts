import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AnimationController,
  GestureController,
  IonContent,
} from '@ionic/angular';

const ANIMATION_BREAKPOINT = -200;

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.scss'],
})
export class EventHomeComponent implements AfterViewInit {
  @Input('event') event = '';
  @ViewChild(IonContent, { read: ElementRef }) item: ElementRef;
  bigIcon = false;
  loaded: boolean = true;

  constructor(private router: Router, private gestureCtrl: GestureController) {}

  /**
   * Creamos el gesture para hacer swipe hacia la página 'event-detail'
   */
  ngAfterViewInit() {
    const style = this.item.nativeElement.style;

    const moveGesture = this.gestureCtrl.create({
      el: this.item.nativeElement,
      gestureName: 'move',
      threshold: 0,
      onStart: (ev) => {
        style.transition = '';
      },
      onMove: (ev) => {
        if (ev.deltaX < 0 && ev.deltaY > -10 && ev.deltaY < 10) {
          style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
        }
      },
      onEnd: (ev) => {
        style.transition = '0.2s ease-out';
        if (ev.deltaX > ANIMATION_BREAKPOINT) {
          style.transform = '';
        } else {
          this.router.navigate(['/event-detail']);
          style.transform = '';
        }
      },
    });

    moveGesture.enable();
  }

  ngOnInit() {}
}
