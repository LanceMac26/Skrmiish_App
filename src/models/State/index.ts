export interface State {
    stateId: number,
    countryId: number,
    stateCode: string,
    StateName: string,
    isBlacklisted: boolean,

    createdDate: Date,
    lastModifiedDate: Date,
    isDeleted: boolean,
    createdBy: string,
    lastModifiedBy: string
}
