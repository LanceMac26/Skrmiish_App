interface AdministrativeType {
    name: string,
    description: string,
    order: number, 
    adminLevel: number,
    isoCode: string, 
    wikidataId: string,
    geonameId: number, 
}

interface InformativeType {
    name: string,
    description: string,
    order: number, 
    isoCode: string, 
    wikidataId: string,
    geonameId: number, 
}

export interface Location {
    stateId: number,
    countryId: number,
    stateCode: string,
    StateName: string,
    isBlacklisted: boolean,

    createdDate: Date,
    lastModifiedDate: Date,
    isDeleted: boolean,
    createdBy: string,
    lastModifiedBy: string,

    latitude: number, 
    longitude: number, 
    continent: string, 
    lookupSource: string, 
    continentCode: string, 
    localityLanguageRequested: string, 
    city: string, 
    countryName: string, 
    countryCode: string, 
    postcode: string, 
    principalSubdivision: string, 
    principalSubdivisionCode: string, 
    plusCode: string, 
    locality: string, 
    localityInfo: {
        administrative: AdministrativeType[],
        informative: InformativeType[]
    }
}