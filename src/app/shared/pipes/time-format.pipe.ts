import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number | null): string {
    if (!value) {
      return '00:00';
    }
    const minutes: string = Math.floor(value / 60).toString().padStart(2, '0');
    const seconds: string = (value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}
