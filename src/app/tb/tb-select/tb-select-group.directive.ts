import { Directive, Output, EventEmitter, Input, ContentChildren, forwardRef, QueryList, OnInit, AfterContentInit } from '@angular/core';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TbSelectItemDirective } from './tb-select-item.directive';
import { SelectionModel } from '@angular/cdk/collections';
import { TbSelected } from './models';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TbSelectGroupDirective),
  multi: true
};


@Directive({
  selector: '[tb-select-group]',
  exportAs: 'tbSelectGroup'
})
export class TbSelectGroupDirective implements OnInit, AfterContentInit {


  /**
     * Reference to the raw value that the consumer tried to assign. The real
     * value will exclude any values from this one that don't correspond to a
     * toggle. Useful for the cases where the value is assigned before the toggles
     * have been initialized or at the same that they're being swapped out.
     */
  private _rawValue: any;

  // @Output() readonly selectionChange = new EventEmitter<String>();
  _multiple = false;

  /** Event emitted when the group's value changes. */
  @Output() readonly selectionChange: EventEmitter<TbSelected> =
    new EventEmitter<TbSelected>();

  /** Whether multiple button toggles can be selected. */
  @Input()
  get multiple(): boolean { return this._multiple; }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }

  /** Value of the toggle group. */
  @Input()
  get value(): any {
    const selected = this._selectionModel ? this._selectionModel.selected : [];

    if (this.multiple) {
      return selected.map(toggle => toggle.value);
    }

    return selected[0] ? selected[0].value : undefined;
  }
  set value(newValue: any) {
    this._setSelectionByValue(newValue);
    // TODO this.valueChange.emit(this.value);
  }



  private _selectionModel: SelectionModel<TbSelectItemDirective>;

  @ContentChildren(forwardRef(() => TbSelectItemDirective)) _buttonToggles: QueryList<TbSelectItemDirective>;

  constructor() { }

  ngOnInit() {
    // console.log('is multi: ', this._multiple);

    this._selectionModel = new SelectionModel<TbSelectItemDirective>(this.multiple, undefined, false);
  }

  ngAfterContentInit() {
    this._selectionModel.select(...this._buttonToggles.filter(toggle => toggle.checked));
  }

  /** Selected button toggles in the group. */
  get selected() {
    const selected = this._selectionModel.selected;
    return this.multiple ? selected : (selected[0] || null);
  }

  /** Checks whether a button toggle is selected. */
  _isSelected(toggle: TbSelectItemDirective) {
    return this._selectionModel.isSelected(toggle);
  }

  /** Determines whether a button toggle should be checked on init. */
  _isPrechecked(toggle: TbSelectItemDirective) {
    if (typeof this._rawValue === 'undefined') {
      return false;
    }

    if (this.multiple && Array.isArray(this._rawValue)) {
      return this._rawValue.some(value => toggle.value != null && value === toggle.value);
    }

    return toggle.value === this._rawValue;
  }

  _syncSelectItemToggle(toggle: TbSelectItemDirective, select: boolean, isUserInput = false) {
    // Deselect the currently-selected toggle, if we're in single-selection
    // mode and the button being toggled isn't selected at the moment.
    if (!this.multiple && this.selected && !toggle.checked) {
      console.log('multiple: ');

      (this.selected as TbSelectItemDirective).checked = false;
    }

    if (select) {
      this._selectionModel.select(toggle);
    } else {
      this._selectionModel.deselect(toggle);
    }

    // Only emit the change event for user input.
    if (isUserInput) {
      this._emitChangeEvent();
    }

    // Note: we emit this one no matter whether it was a user interaction, because
    // it is used by Angular to sync up the two-way data binding.
    // TODO this.valueChange.emit(this.value);
  }

  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(): void {
    const selected = this.selected;
    const source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
    const event = new TbSelected(source, this.value);
    // TODO this._controlValueAccessorChangeFn(event.value);
    this.selectionChange.emit(event);
  }

  /** Updates the selection state of the toggles in the group based on a value. */
  private _setSelectionByValue(value: any | any[]) {
    this._rawValue = value;

    if (!this._buttonToggles) {
      return;
    }

    if (this.multiple && value) {
      if (!Array.isArray(value)) {
        throw Error('Value must be an array in multiple-selection mode.');
      }

      this._clearSelection();
      value.forEach((currentValue: any) => this._selectValue(currentValue));
    } else {
      this._clearSelection();
      this._selectValue(value);
    }
  }

  /** Clears the selected toggles. */
  private _clearSelection() {
    this._selectionModel.clear();
    this._buttonToggles.forEach(toggle => toggle.checked = false);
  }

  /** Selects a value if there's a toggle that corresponds to it. */
  private _selectValue(value: any) {
    const correspondingOption = this._buttonToggles.find(toggle => {
      return toggle.value != null && toggle.value === value;
    });

    if (correspondingOption) {
      correspondingOption.checked = true;
      this._selectionModel.select(correspondingOption);
    }
  }



}

/**
 * Provider Expression that allows mat-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
