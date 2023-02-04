import { Location } from "../../models/Location";

export interface ILocationService {
    getGeolocationData(longitude: number, latitude: number): Promise<Location>;
}