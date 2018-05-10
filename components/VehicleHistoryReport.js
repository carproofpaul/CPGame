
export default class VehicleHistoryReprot  {
    constructor(vehicleDetails,
                accidents,
                lienRecords,
                canadianRegistration,
                isStolen,
                usHistory,
                recalls,
                serviceHistory){

        this.accidents = accidents || []
        this.lienRecords = lienRecords || []
        this.canadianRegistration = canadianRegistration || ['Ontario', 'Normal']
        this.isStolen = isStolen || false
        this.usHistory = usHistory || []
        this.recalls = recalls || []
        this.serviceHistory = serviceHistory || []
        this.vehicleDetails = vehicleDetails || {
                                                    vin: null,
                                                    bodyStyle: null,
                                                    countryOfAssembly: null,
                                                    cylinders: null,
                                                    fuelType: null,
                                                    yearMakeModel: null
                                                }

    }
}
