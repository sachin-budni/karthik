import {
  Directive, Output, EventEmitter, Optional, Input, HostListener,
  OnInit, ElementRef, Inject, forwardRef, Renderer2
} from '@angular/core';
import { TbSelectGroupDirective } from './tb-select-group.directive';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { TbSelected } from './models';
import { UtilsClass } from '../utils';

@Directive({
  selector: '[tb-select-item]',
  exportAs: 'tbSelectItem'
})
export class TbSelectItemDirective implements OnInit {

  /** The parent group (exclusive selection). Optional. */
  tbSelectGroup: TbSelectGroupDirective;
  private _checked = false;

  private _isSingleSelector = false;

  @Output() readonly selectionChange = new EventEmitter<TbSelected>();


 

  /** MatButtonToggleGroup reads this to assign its own value. */
  @Input() value: any;

  _selectedClass: String = '';
  @Input() set selectedClass(value: String) {
    if (value) {
      this._selectedClass = value;
    }
  }

  @Input()
  get checked(): boolean {
    return this.tbSelectGroup ? this.tbSelectGroup._isSelected(this) : this._checked;
  }
  set checked(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this._checked) {
      this._checked = newValue;
      this.updateViewState();

      if (this.tbSelectGroup) {
        this.tbSelectGroup._syncSelectItemToggle(this, this._checked);
      }

      // TODO  this._changeDetectorRef.markForCheck();
    }
  }

  constructor(@Optional() @Inject(forwardRef(() => TbSelectGroupDirective)) selectGroup: TbSelectGroupDirective,
    private _elementRef: ElementRef<HTMLElement>,
    private _focusMonitor: FocusMonitor,
    private renderer: Renderer2) {
      console.log('group:', selectGroup);
          this.tbSelectGroup = selectGroup;
  }

  ngOnInit() {
    this._isSingleSelector = this.tbSelectGroup && !this.tbSelectGroup.multiple;


    if (this.tbSelectGroup && this.tbSelectGroup._isPrechecked(this)) {
      this.checked = true;
    }

    this._focusMonitor.monitor(this._elementRef, true);
  }

  /** Checks the button toggle due to an interaction with the underlying native button. */
  @HostListener('click', ['$event, $event.target'])
  _onButtonClick() {

    console.log('clicked');

    const newChecked = this._isSingleSelector ? true : !this._checked;

    if (newChecked !== this._checked) {
      this._checked = newChecked;
      this.updateViewState();
      if (this.tbSelectGroup) {
        this.tbSelectGroup._syncSelectItemToggle(this, this._checked, true);
        // TODO this.tbSelectGroup._onTouched();
      }
    }
    // Emit a change event when it's the single selector
    this.selectionChange.emit(new TbSelected(this, this.value));
  }

  updateViewState() {

    UtilsClass._toggleClass(this._elementRef, this.renderer, this._selectedClass as string, this._checked);
    // if (this._checked) {
    //   this.renderer.addClass(this._elementRef.nativeElement, this._selectedClass as string);
    // } else {
    //   this.renderer.removeClass(this._elementRef.nativeElement, this._selectedClass as string);
    // }


  }



}
