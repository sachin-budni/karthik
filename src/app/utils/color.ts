import { Injectable } from "@angular/core";

@Injectable()
export class UtilColor {



    public static COLOR = {
        reached: "#35CEA5",
        on_time: "#2F78E8",
        delayed: "#FB365D",
    };


    public static COLOR_CLASS = {
        "#FE565A": "app-color--reached",
        "#2DDAA5": "app-color--on-time",
        "#EDB608": "app-color--delayed",

    };
    public static COLOR_CLASS_BG = {
        "#FE565A": "app-color--reached",
        "#2DDAA5": "app-color--on-time",
        "#EDB608": "app-color--delayed",

    };


}