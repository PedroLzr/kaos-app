import {
  Component,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-alphabete-scroll',
  templateUrl: './alphabete-scroll.component.html',
  styleUrls: ['./alphabete-scroll.component.scss'],
})
export class AlphabeteScrollComponent implements AfterViewInit {
  letters = [];
  lastOpen = null;
  @Output() letterSelected = new EventEmitter<string>();
  @Output() scrollingLetter = new EventEmitter<boolean>();
  @ViewChild('bar') sidebar: ElementRef;

  constructor(private gestureCtrl: GestureController) {
    let str = 'ABCDEFGHIJKLMMÑOPQRSTUVWXYZ';

    for (let i = 0; i < str.length; i++) {
      let nextChar = str.charAt(i);
      this.letters.push(nextChar);
    }
  }

  ngAfterViewInit() {
    const moveGesture = this.gestureCtrl.create({
      el: this.sidebar.nativeElement,
      direction: 'y',
      threshold: 0,
      gestureName: 'move',
      onStart: (ev) => {
        this.scrollingLetter.emit(true);
        console.log('start');
      },
      onMove: (ev) => {
        console.log('move');
        const closesEle: any = document.elementsFromPoint(
          ev.currentX,
          ev.currentY
        );
        if (closesEle && ['LI', 'A'].indexOf(closesEle.tagName) > -1) {
          const letter = closesEle.innerText;
          if (letter) {
            if (letter != this.lastOpen) {
              Haptics.impact({ style: ImpactStyle.Light });
            }
            this.goToLetter(letter);
          }
        }
      },
      onEnd: (ev) => {
        this.scrollingLetter.emit(false);
        console.log('end');
      },
    });
    moveGesture.enable();
  }

  goToLetter(letter) {
    if (this.lastOpen == letter) return;

    this.lastOpen = letter;
    this.letterSelected.emit(letter);
  }
}
