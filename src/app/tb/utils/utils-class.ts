import { Renderer2, ElementRef } from '@angular/core';

export class UtilsClass {

/**
   * Applies a collection of CSS classes to the DOM element.
   *
   * For argument of type Set and Array CSS class names contained in those collections are always
   * added.
   * For argument of type Map CSS class name in the map's key is toggled based on the value (added
   * for truthy and removed for falsy).
   */
  static _applyClasses(_ngEl: ElementRef, _renderer: Renderer2, rawClassVal: string[]|Set<string>|{[klass: string]: any}) {
    if (rawClassVal) {
      if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
        (<any>rawClassVal).forEach((klass: string) => UtilsClass._toggleClass(_ngEl, _renderer, klass, true));
      } else {
        Object.keys(rawClassVal).forEach(klass => UtilsClass._toggleClass(_ngEl, _renderer, klass, !!rawClassVal[klass]));
      }
    }
  }

    /**
       * Removes a collection of CSS classes from the DOM element. This is mostly useful for cleanup
       * purposes.
       */
    static _removeClasses(_ngEl: ElementRef, _renderer: Renderer2, rawClassVal: string[] | Set<string> | { [klass: string]: any }) {
        if (rawClassVal) {
            if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                (<any>rawClassVal).forEach((klass: string) => UtilsClass._toggleClass(_ngEl, _renderer, klass, false));
            } else {
                Object.keys(rawClassVal).forEach(klass => UtilsClass._toggleClass(_ngEl, _renderer, klass, false));
            }
        }
    }

    static _toggleClass(_ngEl: ElementRef, _renderer: Renderer2, pKlass: string, enabled: boolean): void {
        const klassArr = pKlass.trim();
        if (klassArr) {
            klassArr.split(/\s+/g).forEach(klass => {
                if (enabled) {
                    _renderer.addClass(_ngEl.nativeElement, klass);
                } else {
                    _renderer.removeClass(_ngEl.nativeElement, klass);
                }
            });
        }
    }


}
