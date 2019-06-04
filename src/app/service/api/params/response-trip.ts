
export class ResponseTripV2 {
    public current_period: ResponseTrip[]
    public previous_period: ResponseTrip[]
}

export class ResponseTrip {
    public _id: string
    public originalTripId: string
    public vehicle: string
    public src:number[]
    public dest:number[]
    public client: string
    public srcname: string
    public destname: string
    public eta_hours: number
    public item_type: string
    public truck_type: string
    public quantity: number
    public trackable: Boolean
    public tracked: Boolean
    public src_geofence: string
    public dest_geofence: string
    public transporter: string
    public lane: string
    public client_client: string
    public transit_time: number
    public delay: number
    public halts:  ResponseHalt[]
    public halt_time:  number
    public moving_time:  number
    public distance_travelled:  number
    public createdAt:  string

}


export class ResponseHalt{

    public from_time: string
    public to_time: string
    public duration: number
    public loc:number[]
}