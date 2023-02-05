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
  
  const apiService = {
      async getStates(): Promise<State[]> {
          return [];
      },
  
      async createState(state: State): Promise<Number> {
        return 0;
      },

      async getState(id: number): Promise<State> {
        return {
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
        }
      },

      async updateState(state: State): Promise<State> {
        return {
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
        }
      },

      async deleteState(id: number): Promise<typeof Status[keyof typeof Status]> {
        return Status.Ok;
      },
  
      // Checking if blacklisted
      async isBlacklisted(stateName: string | undefined, stateCode: string | undefined): Promise<Boolean>{
        return false;
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
  
  return (
    <>
      <ApiServiceContext.Provider value={apiService}>
        <LocationServiceContext.Provider value={locationService}>
          <View style={styles.container}>
            <ModalComponent />
            <Text>Tech Assessment for Skrmiish!</Text>
            <Text></Text>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
