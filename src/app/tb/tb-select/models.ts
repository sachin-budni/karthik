import { TbSelectItemDirective } from './tb-select-item.directive';

export class TbSelected {
    constructor(
        /** The SelectedItem that emits the event. */
        public source: TbSelectItemDirective,

        /** The value. */
        public value: any) { }
}
