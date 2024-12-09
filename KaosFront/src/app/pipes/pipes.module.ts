import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FormatBase64Pipe } from './format-base64.pipe';

@NgModule({
  declarations: [FilterPipe, FormatBase64Pipe],
  imports: [CommonModule],
  exports: [FilterPipe, FormatBase64Pipe],
})
export class PipesModule {}
