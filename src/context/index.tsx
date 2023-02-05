import { createContext } from "react";
import { IStateService } from "../services/api-service/api-service";
import { ILocationService } from "../services/location-service/location-service";

export const ApiServiceContext = createContext<IStateService | undefined>(undefined);
export const LocationServiceContext = createContext<ILocationService | undefined>(undefined);
