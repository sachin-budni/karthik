import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TbSelectGroupDirective } from './tb-select-group.directive';
import { TbSelectItemDirective } from './tb-select-item.directive';

@NgModule({
  declarations: [TbSelectGroupDirective, TbSelectItemDirective],
  imports: [
    CommonModule
  ], exports: [TbSelectGroupDirective, TbSelectItemDirective]
})
export class TbSelectModule { }
