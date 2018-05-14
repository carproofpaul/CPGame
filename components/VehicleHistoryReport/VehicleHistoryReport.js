
export default class VehicleHistoryReport  {
    /*
    constructor(vehicleDetails,
                accidents,
                lienRecords,
                canadianRegistration,
                isStolen,
                usHistory,
                recalls,
                serviceHistory){

        this.accidents = accidents
        this.lienRecords = lienRecords
        this.canadianRegistration = canadianRegistration
        this.isStolen = isStolen
        this.usHistory = usHistory
        this.recalls = recalls 
        this.serviceHistory = serviceHistory
        this.vehicleDetails = vehicleDetails 
    }
    */
    constructor(vehicleDetails){
        this.accidents = []
        this.lienRecords = []
        this.canadianRegistration = ['Ontario', 'Normal']
        this.isStolen = false
        this.usHistory = []
        this.recalls = []
        this.serviceHistory = []
        this.vehicleDetails = vehicleDetails 
    }

    getAccidentReport(){
        output = ""
        for(i = 0; i < this.accidents.length; i++){
            output = output + this.accidents[i][2] + ": " + this.accidents[i][0] + ",  $" + this.accidents[i][1] + "\n\n" //date: event  $cost
        }
        return output
    }

    getServiceHistory(){
        output = ""
        for(i = 0; i < this.serviceHistory.length; i++){
            output = output + this.serviceHistory[i][2] + ": " + this.serviceHistory[i][0] + ",  $" + this.serviceHistory[i][1] + "\n\n" //date: event  $cost
        }
        return output
    }

    reportSummary(){
        output = ""
        if(this.accidents.length > 0) output = output + "Accidents / Damage: Damage records found\n\n"
        else output = output + "Accidents / Damage: No damage records found\n\n"

        if(this.lienRecords.length > 0) output = output + "Lien Records: Lien records found\n\n"
        else output = output + "Lien Records: No lien records found\n\n"

        if(this.canadianRegistration.length > 0) output = output + "Canadian Registration: "+this.canadianRegistration[0]+" ("+this.canadianRegistration[1]+")\n\n"
        else output = output + "Canadian Registration: No Candian registration found\n\n"

        if(this.isStolen) output = output + "Stolen Status: Currently declared stolen\n\n"
        else output = output + "Stolen Status: Not actively declared stolen\n\n"

        if(this.usHistory.length > 0) output = output + "U.S. History: U.S. history found\n\n"
        else output = output + "U.S. History: No U.S. history found\n\n"

        if(this.recalls.length > 0) output = output + "Recalls: Recalls found\n\n"
        else output = output + "Recalls: No information available\n\n"

        if(this.serviceHistory.length > 0) output = output + "Service History: "+this.serviceHistory.length+" record(s) found\n\n"
        else output = output + "Service History: No history found\n\n"

        return output
    }

}
