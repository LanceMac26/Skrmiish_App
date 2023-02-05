import { useState, useEffect } from 'react';
import { 
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import { LocationObject, LocationObjectCoords } from 'expo-location';
import { State } from './src/models/State';
import { Location as LocationTypes } from './src/models/Location';
import { Status } from '@tshttp/status';
import { ApiServiceContext, LocationServiceContext } from './src/context';
import ModalComponent from './src/components/Modal/Modal';

export default function App() {
  const [location, setLocation] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');
  const API_URL = 'https://ca84-41-10-141-68.sa.ngrok.io';  // To be moved to a .env file.

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  let locationDetails: LocationObjectCoords = {
    latitude: 0,
    longitude: 0,
    altitude: null,
    accuracy: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  };

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    locationDetails = location.coords;
  }
  
  // #region Services
  
  const apiService = {
      async getStates(): Promise<State[]> {
        let returnObj: State[] = [];
        const url = `${API_URL}/api/States`; 

        await fetch(url)
                .then((x) => x.json())
                .then((resp) => returnObj = resp)
                .catch((error) => console.error(error))
                .finally(() => {});

        return returnObj;
      },
  
      async createState(state: State): Promise<Number> {
        const url = `${API_URL}/api/States`; 
        let returnObj: number = 0;
        let data = { 
          method: 'POST',
          body: JSON.stringify(state),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
        
        await fetch(url, data)
                .then(response => response.json())
                .then(json => returnObj = json.status)
                .catch((error) => console.error(error))
                .finally(() => {});

        return returnObj;
      },

      async getState(id: number): Promise<State> {
        let returnObj: State = {
          stateId: 0,
          countryId: 0,
          stateCode: 'string',
          StateName: 'string',
          isBlacklisted: false,
      
          createdDate: new Date(),
          lastModifiedDate: new Date(),
          isDeleted: false,
          createdBy: 'string',
          lastModifiedBy: 'string'
        };

        const url = `${API_URL}/api/States/${id}`; 

        await fetch(url)
                .then((x) => x.json())
                .then((resp) => returnObj = resp)
                .catch((error) => console.error(error))
                .finally(() => {});

        return returnObj;
      },

      async updateState(state: State): Promise<State> {
        const url = `${API_URL}/api/States`; 
        let returnObj: State = {
          stateId: 0,
          countryId: 0,
          stateCode: 'string',
          StateName: 'string',
          isBlacklisted: false,
      
          createdDate: new Date(),
          lastModifiedDate: new Date(),
          isDeleted: false,
          createdBy: 'string',
          lastModifiedBy: 'string'
        };

        let data = { 
          method: 'POST',
          body: JSON.stringify(state),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
        
        await fetch(url, data)
                .then(response => response.json())
                .then(json => returnObj = json.status)
                .catch((error) => console.error(error))
                .finally(() => {});

        return returnObj;
      },

      async deleteState(id: number): Promise<typeof Status[keyof typeof Status]> {
        const url = `${API_URL}/api/States/${id}`; 
        let data = { 
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
        
        await fetch(url, data)
                .then(response => response.json())
                .catch((error) => console.error(error))
                .finally(() => {});

        return Status.Ok;
      },
  
      // Checking if blacklisted
      async isBlacklisted(stateCode: string): Promise<Boolean> {
        let returnObj: boolean = false;

        const url = `${API_URL}/api/States/isBlacklisted/${stateCode}`; 

        await fetch(url)
                .then((x) => x.json())
                .then((resp) => returnObj = resp)
                .catch((error) => console.error(error))
                .finally(() => {});

        return returnObj;
      }
  }

  const locationService = {
    async getGeolocationData(longitude: number, latitude: number) {

      // To be moved to a .env file.
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      let returnObj: LocationTypes = {
        stateId: 0,
        countryId: 0,
        stateCode: "",
        StateName: "",
        isBlacklisted: false,

        createdDate: new Date,
        lastModifiedDate: new Date,
        isDeleted: false,
        createdBy: "",
        lastModifiedBy: "",

        latitude: 0, 
        longitude: 0, 
        continent: "", 
        lookupSource: "", 
        continentCode: "", 
        localityLanguageRequested: "", 
        city: "", 
        countryName: "", 
        countryCode: "", 
        postcode: "", 
        principalSubdivision: "", 
        principalSubdivisionCode: "", 
        plusCode: "", 
        locality: "", 
        localityInfo: {
            administrative: [],
            informative: []
        }
      };

      
      await fetch(url)
              .then((resp) => resp.json())
              .then((json) => returnObj = json)
              .catch((error) => console.error(error))
              .finally(() => {});

      return returnObj;
    }
  }

  //#endregion
  
  return (
    <>
      <ApiServiceContext.Provider value={apiService}>
        <LocationServiceContext.Provider value={locationService}>
          <View style={styles.container}>
            <ModalComponent />
            <Text>Tech Assessment for Skrmiish!</Text>
            <Text></Text>
            <Text>Your Location: </Text>
            <Text>Latitude: {locationDetails.latitude != 0 ? locationDetails.latitude : "Waiting..."}</Text>
            <Text>Longitude: {locationDetails.longitude != 0 ? locationDetails.longitude : "Waiting..."}</Text>
          </View>
        </LocationServiceContext.Provider>
      </ApiServiceContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
