import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TbTimelineDottedComponent } from './tb-timeline-dotted/tb-timeline-dotted.component';
import { TbBubbleModule } from '../tb-bubble';

@NgModule({
  declarations: [TbTimelineDottedComponent],
  imports: [
    CommonModule,
    TbBubbleModule
  ],
  exports:[TbTimelineDottedComponent]
})
export class TbTimelineDottedModule { }
