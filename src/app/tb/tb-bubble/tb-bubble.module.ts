import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TbBubbleComponent } from './tb-bubble/tb-bubble.component';

@NgModule({
  declarations: [TbBubbleComponent],
  imports: [
    CommonModule
  ],
  exports:[TbBubbleComponent]
})
export class TbBubbleModule { }
