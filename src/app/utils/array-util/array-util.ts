import { Injectable } from "@angular/core";

@Injectable()
export class ArrayUtil {
    static indexOf(data: any[], object, keyCheck: string) {
        if (!(data) || data.length <= 0)
            return -1;
        if (!(object))
            return -1;

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if(element[keyCheck]== object[keyCheck]){
                return index;
            }
            
        }
        return -1;
    }

    static indexOfVal(data: any[], val: String, keyCheck: string) {
        if (!(data) || data.length <= 0)
            return -1;
        if (!(val))
            return -1;

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if(element[keyCheck]== val){
                return index;
            }
            
        }
        return -1;
    }
}
