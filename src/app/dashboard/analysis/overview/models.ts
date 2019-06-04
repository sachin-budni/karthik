import { ResponseTrip } from "src/app/service/api/params";
import { count } from "rxjs/operators";

export class ModelOverviewRepeat {
    countPercent: number;

    constructor(private keyFor: string) {

    }

    public name: String
    public count: number
    // private data: ResponseTrip[][] = []

    public setTrips(vals: ResponseTrip[]) {
        let mapKey = []
        //mapKey.push('default')
        let data = []
        vals.forEach(element => {
            if (element[this.keyFor]) {
                let posi = mapKey.indexOf(element[this.keyFor])
                let indexName = element[this.keyFor]
                if (posi < 0) {
                    mapKey.push(indexName)
                    data[indexName] = []
                }
                data[indexName].push(element)
            } else {
                // if (!(data['other'])) {
                //     data['other'] = []
                // }
                // data['other'].push(element)
            }
        });

        //console.log("trip: ", data);


        if (data['other']) {
            mapKey.push('other')
        }
        // let modelTrips = new ModelDelayedTrips()

        var counter = 0;
        var mostIndexName = "";

        for (let key in data) {
            //console.log("sdsd1: ", key);
            if (data[key].length > counter) {
                counter = data[key].length
                mostIndexName = key;
            }
        }
        //console.log("sdsd: ", mostIndexName);


        if (counter > 0) {
            this.name = data[mostIndexName][0][this.keyFor];
            this.count = counter;

            this.countPercent = Math.floor((counter * 100) / vals.length);

        } else {
            this.name = "";
            this.count = counter;

            this.countPercent = Math.floor((counter * 100) / vals.length);
        }


        // data.forEach(element => {

        // console.log("sdsd1: ", element);
        //     if (element.length > counter) {
        //         counter = element.length
        //         mostIndexName = element[0][this.keyFor];
        //     }
        // })
        // console.log("sdsd: ", mostIndexName);


        // this.name = data[mostIndexName][0][this.keyFor];
        // this.count = counter;
        //log()
    }


}

export class ModelOverview {

    public lane: ModelOverviewRepeat;
    public customer: ModelOverviewRepeat;
    public vendor: ModelOverviewRepeat;
    public counts = 0
    percent: number = 0;
    countsLast: number;
    public trend: number;

    trips: ResponseTrip[]

    constructor(private forKey: string) {
        this.lane = new ModelOverviewRepeat('lane')
        this.customer = new ModelOverviewRepeat('client_client')
        this.vendor = new ModelOverviewRepeat('transporter')
    }


    setTrips(vals: ResponseTrip[], countBy: 'number' | 'bool' | 'string' = 'number', countCheck: any = 0) {
        let counter = 0;
        let trips = []
        if (this.forKey) {
            vals.forEach(element => {
                if (countBy == 'number') {
                    if (element[this.forKey] > countCheck) {
                        trips.push(element)
                        counter++
                    }
                } else if (countBy == 'bool') {
                    if (element[this.forKey] == countCheck) {
                        trips.push(element)
                        counter++
                    }
                } else if (countBy == 'string') {
                    if (element[this.forKey] && (element[this.forKey].toLowerCase() == (countCheck as string).toLowerCase())) {
                        trips.push(element)
                        counter++
                    }
                }

            });

        } else {
            counter = vals.length
            trips = vals
        }
        this.counts = counter
        this.percent = Math.floor((counter * 100) / vals.length)

        //this._mDelay = this.counts.toString()
        //console.log("wtf: ",counter)
        this.lane.setTrips(trips)
        this.customer.setTrips(trips)
        this.vendor.setTrips(trips)
        this.trips = trips;
        // this.lane = lane
        // this.customer = overviewcustomer
        // this.vendor = overviewvendor

        //console.log("overview delay: ", overview);
        // console.log("overview delay: ", delayedTrips);

    }

    setLastTrips(vals: ResponseTrip[], countBy: 'number' | 'bool' | 'string' = 'number', countCheck: any = 0) {

        let counter = 0
        let trips = []
        if (this.forKey) {
            vals.forEach(element => {
                if (countBy == 'number') {
                    if (element[this.forKey] > countCheck) {
                        trips.push(element)
                        counter++
                    }
                } else if (countBy == 'bool') {
                    if (element[this.forKey] == countCheck) {
                        trips.push(element)
                        counter++
                    }
                } else if (countBy == 'string') {
                    if (element[this.forKey] && (element[this.forKey].toLowerCase() == (countCheck as string).toLowerCase())) {
                        trips.push(element)
                        counter++
                    }
                }

            });

        } else {
            counter = vals.length
            trips = vals
        }
        this.countsLast = counter
        let trend = this.counts - counter

        if(counter==0){
            this.trend = trend*100
        }else{
            this.trend = (trend*100)/this.countsLast
        }
        
    }


}



