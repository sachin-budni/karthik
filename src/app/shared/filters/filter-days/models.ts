
import * as moment from 'moment';

export class ModelDateRange{
    
    public starttime =  moment().valueOf()
    
    public endtime = moment().valueOf()
    constructor(by: 'week'| 'month'| 'year'| 'custom'){
        if(by=='week'){
            this.starttime = moment(this.endtime).subtract(1,'w').valueOf()
        } else if(by=='month'){
            this.starttime = moment(this.endtime).subtract(1,'M').valueOf()
        } else if(by=='year'){
            this.starttime = moment(this.endtime).subtract(1,'y').valueOf()
        }
        
    }

}