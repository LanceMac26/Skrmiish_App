import React, { useContext, useEffect, useRef, useState } from "react";
import {
    StyledButtonText,
    StyledClosePressable,
    StyledModal,
    StyledModalText,
    StyledOpenPressable,
    StyledViewCentered,
    StyledViewModal
} from "./Modal.style";
import { Alert } from "react-native";
import { ApiServiceContext, LocationServiceContext } from "../../context";
import * as ExpoLocation from 'expo-location';
import { LocationObject, LocationObjectCoords } from 'expo-location';
import { State } from "../../models/State";
import { Location } from "../../models/Location";

const ModalComponent: React.FC = (): React.ReactElement => {
  const apiService = useContext(ApiServiceContext);
  const locationService = useContext(LocationServiceContext);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const geoLocationData = useRef<Location>();

  const [location, setLocation] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<String>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setIsLoading(true);

      let location = await ExpoLocation.getCurrentPositionAsync({});
      setLocation(location);

      let apiRes = await locationService?.getGeolocationData(location.coords.longitude, location.coords.latitude);
      geoLocationData.current = apiRes;

      setIsLoading(false);
    })();
  }, []);
    
  return (
      <>
        <StyledModal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          {
            isLoading ?
            <StyledViewCentered>
              <StyledViewModal>
                <StyledModalText>Loading...</StyledModalText>
                <StyledClosePressable onPress={() => setModalVisible(!modalVisible)}>
                  <StyledButtonText>Hide Modal</StyledButtonText>
                </StyledClosePressable>
              </StyledViewModal>
            </StyledViewCentered>
            :
            <StyledViewCentered>
              <StyledViewModal>
                <StyledModalText>{errorMsg ? errorMsg : 'Hello World!'}</StyledModalText>
                <StyledModalText>{JSON.stringify(geoLocationData?.current)}</StyledModalText>
                <StyledClosePressable onPress={() => setModalVisible(!modalVisible)}>
                  <StyledButtonText>Hide Modal</StyledButtonText>
                </StyledClosePressable>
              </StyledViewModal>
            </StyledViewCentered>
          }
        </StyledModal>
        <StyledOpenPressable onPress={() => setModalVisible(true) }>
          <StyledButtonText>Show Modal</StyledButtonText>
        </StyledOpenPressable>
      </>
  );
};

export default ModalComponent;
