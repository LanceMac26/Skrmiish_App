import { Status } from '@tshttp/status';
import { State } from '../../models/State';

// type StatusCode = typeof Status[keyof typeof Status]

export interface IStateService {
    getStates(): Promise<State[]>

    createState(state: State): Promise<Number>;
    getState(id: number): Promise<State>;
    updateState(state: State): Promise<State>;
    deleteState(id: number): Promise<typeof Status[keyof typeof Status]>;

    // Checking if blacklisted
    isBlacklisted(stateName: string | undefined, stateCode: string | undefined): Promise<Boolean>;
}