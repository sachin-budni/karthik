import { ResponseTrip } from "src/app/service/api/params";

export class TransportersTrip {

    private transporters: string[]
    private trips: NamedTrip[] = []
    // private data: ResponseTrip[][] = []

    getNames(): string[] {
        return this.transporters
    }

    public getTrip(transporterName: string): NamedTrip {
        let position = this.transporters.indexOf(transporterName)
        if (position < 0) {
            return null
        }
        return this.trips[position]
    }

    public setTrips(vals: ResponseTrip[]) {
        let mapKey = []
        //mapKey.push('default')
        let data = []
        vals.forEach(element => {
            if (element.transporter) {
                let posi = mapKey.indexOf(element.transporter)
                if (posi < 0) {
                    mapKey.push(element.transporter)
                    data[element.transporter] = []
                }
                data[element.transporter].push(element)
            } else {
                if (!(data['other'])) {
                    data['other'] = []
                }
                data['other'].push(element)
            }
        });

        // todo if (data['other']) {
        //     mapKey.push('other')
        // }


        // let modelTrips = new ModelDelayedTrips()

        mapKey.forEach(element => {
            // this.data.push(mappedTrips[element])
            let trip = new NamedTrip()
            trip.setTrip(data[element], element)
            this.trips.push(trip);
        });
        // this.transporters = mapKey

        this.trips = this.trips.sort((a, b) => b.data.length - a.data.length)
        this.transporters = [];//mapKey
        this.trips.forEach(element => {
            this.transporters.push(element.name)
        })
    }

    getDelayReport(): number[][] {
        let onTime = []
        let delayed = []
        let delayedMore = []

        this.trips.forEach(element => {
            onTime.push(element.onTime)
            delayed.push(element.delayed)
            delayedMore.push(element.delayedMore)
        });
        return [onTime, delayed, delayedMore]
    }

    getDelayReportPercent(): number[][] {
        let onTimePercent = []
        let delayedPercent = []
        let delayedMorePercent = []

        this.trips.forEach(element => {
            onTimePercent.push(element.onTimePercent)
            delayedPercent.push(element.delayedPercent)
            delayedMorePercent.push(element.delayedMorePercent)
        });
        return [onTimePercent, delayedPercent, delayedMorePercent]
    }
}


export class LanesTrip {

    private lanes: string[]
    private trips: NamedTrip[] = []
    // private data: ResponseTrip[][] = []

    getNames(): string[] {
        return this.lanes
    }


    public setTrips(vals: ResponseTrip[]) {
        let mapKey = []
        //mapKey.push('default')
        let data = []
        vals.forEach(element => {
            if (element.lane) {
                let posi = mapKey.indexOf(element.lane)
                if (posi < 0) {
                    mapKey.push(element.lane)
                    data[element.lane] = []
                }
                data[element.lane].push(element)
            } else {
                if (!(data['other'])) {
                    data['other'] = []
                }
                data['other'].push(element)
            }
        });

        // todo if (data['other']) {
        //     mapKey.push('other')
        // }


        // let modelTrips = new ModelDelayedTrips()

        mapKey.forEach(element => {
            // this.data.push(mappedTrips[element])
            let trip = new NamedTrip()
            trip.setTrip(data[element], element)
            this.trips.push(trip);
        });

        // console.log("Trip: " + "Lane: ", this.trips);
        // console.log("Trip: " + "Lane: ", sorted, this.trips);
        
        this.trips = this.trips.sort((a, b) => b.data.length - a.data.length)
        this.lanes = [];//mapKey
        this.trips.forEach(element => {
            this.lanes.push(element.name)
        })
    }

    getDelayReport(): number[][] {
        let onTime = []
        let delayed = []
        let delayedMore = []

        this.trips.forEach(element => {
            onTime.push(element.onTime)
            delayed.push(element.delayed)
            delayedMore.push(element.delayedMore)
        });
        return [onTime, delayed, delayedMore]
    }

    getDelayReportPercent(): number[][] {
        let onTimePercent = []
        let delayedPercent = []
        let delayedMorePercent = []

        this.trips.forEach(element => {
            onTimePercent.push(element.onTimePercent)
            delayedPercent.push(element.delayedPercent)
            delayedMorePercent.push(element.delayedMorePercent)
        });
        return [onTimePercent, delayedPercent, delayedMorePercent]
    }
}

export class ClientsTrip {

    private clients: string[]
    private trips: NamedTrip[] = []
    // private data: ResponseTrip[][] = []

    getNames(): string[] {
        return this.clients
    }


    public setTrips(vals: ResponseTrip[]) {
        let mapKey = []
        //mapKey.push('default')
        let data = []
        vals.forEach(element => {
            if (element.client_client) {
                let posi = mapKey.indexOf(element.client_client)
                if (posi < 0) {
                    mapKey.push(element.client_client)
                    data[element.client_client] = []
                }
                data[element.client_client].push(element)
            } else {
                if (!(data['other'])) {
                    data['other'] = []
                }
                data['other'].push(element)
            }
        });

        // todo if (data['other']) {
        //     mapKey.push('other')
        // }

        // let modelTrips = new ModelDelayedTrips()

        mapKey.forEach(element => {
            // this.data.push(mappedTrips[element])
            let trip = new NamedTrip()
            trip.setTrip(data[element], element)
            this.trips.push(trip);
        });

        this.trips = this.trips.sort((a, b) => b.data.length - a.data.length)
        this.clients = [];//mapKey
        this.trips.forEach(element => {
            this.clients.push(element.name)
        })
        // this.clients = mapKey
    }

    getDelayReport(): number[][] {
        let onTime = []
        let delayed = []
        let delayedMore = []

        this.trips.forEach(element => {
            onTime.push(element.onTime)
            delayed.push(element.delayed)
            delayedMore.push(element.delayedMore)
        });
        return [onTime, delayed, delayedMore]
    }

    getDelayReportPercent(): number[][] {
        let onTimePercent = []
        let delayedPercent = []
        let delayedMorePercent = []

        this.trips.forEach(element => {
            onTimePercent.push(element.onTimePercent)
            delayedPercent.push(element.delayedPercent)
            delayedMorePercent.push(element.delayedMorePercent)
        });
        return [onTimePercent, delayedPercent, delayedMorePercent]
    }
}



export class NamedTrip {
    name: string
    data: ResponseTrip[]
    onTime: number = 0
    onTimePercent: number = 0
    delayed: number = 0
    delayedPercent: number = 0
    delayedMore: number = 0
    delayedMorePercent: number = 0

    public setTrip(trip: ResponseTrip[], transporter: string) {
        this.name = transporter
        trip.forEach(element => {
            if (element.delay < 0) {
                this.onTime++
            } else {
                let time = element.delay

                if (time > 3600000) {
                    this.delayedMore++
                } else {
                    this.delayed++
                }
            }
        });
        // this.onTime = Math.floor((this.onTime * 100) / trip.length)
        this.onTimePercent = Math.floor((this.onTime * 100) / trip.length)
        // this.delayed = Math.floor((this.delayed * 100) / trip.length)
        this.delayedPercent = Math.floor((this.delayed * 100) / trip.length)
        // this.delayedMore = Math.floor((this.delayedMore * 100) / trip.length)
        this.delayedMorePercent = Math.floor((this.delayedMore * 100) / trip.length)
        this.data = trip
    }
}

