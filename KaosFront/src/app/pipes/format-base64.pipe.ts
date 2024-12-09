import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'formatBase64',
})
export class FormatBase64Pipe implements PipeTransform {
  transform(image: string): string {
    return 'data:image/jpg;base64,' + image;
  }
}
