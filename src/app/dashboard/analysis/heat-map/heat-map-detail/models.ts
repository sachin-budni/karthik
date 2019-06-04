import { ResponseTrip } from "src/app/service/api/params";

export class ModelMapTop3 {
    countPercent: number;

    constructor(private keyFor: string) {

        //console.log("keyfor: ",keyFor)
    }

    public items: ModelMapItem[]=[]
    // private data: ResponseTrip[][] = []

    public setTrips(vals: ResponseTrip[]) {
        this.countPercent = 0
        this.items=[]
        let mapKey = []
        //mapKey.push('default')
        let mapData = []
        vals.forEach(element => {
            if (element[this.keyFor]) {
                let posi = mapKey.indexOf(element[this.keyFor])
                let indexName = element[this.keyFor]
                if (posi < 0) {
                    mapKey.push(indexName)
                    mapData[indexName] = []
                }
                mapData[indexName].push(element)
            } else {
                // if (!(data['other'])) {
                //     data['other'] = []
                // }
                // data['other'].push(element)
            }
        });
        //console.log("map: ", vals);

        let data = []
        for(let key in mapData){
            data.push(mapData[key])
        }
        console.log("map: ", data);

        data.sort((a: ResponseTrip[], b: ResponseTrip[] )=>b.length-a.length)
        //console.log("sdsd: ", mostIndexName);

        if(data.length>0){
            let count = data[0].length
            let countPercent = (count*100)/vals.length
            this.items.push(new ModelMapItem(data[0][0][this.keyFor],count,countPercent))
        }

        if(data.length>1){
            let count = data[1].length
            let countPercent = (count*100)/vals.length
            this.items.push(new ModelMapItem(data[1][0][this.keyFor],count,countPercent))
        }

        if(data.length>2){
            let count = data[2].length
            let countPercent = (count*100)/vals.length
            this.items.push(new ModelMapItem(data[2][0][this.keyFor],count,countPercent))
        }
    }
}

export class  ModelMapItem{
    
    constructor(public name: string,
    public count: number,
    public countPercent: number){

    }

}