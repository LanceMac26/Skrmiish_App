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
import { Location } from "../../models/Location";

const ModalComponent: React.FC = (): React.ReactElement => {
  const apiService = useContext(ApiServiceContext);
  const locationService = useContext(LocationServiceContext);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const geoLocationData = useRef<Location>();

  const [errorMsg, setErrorMsg] = useState<String>('');
  const [modalText, setModalText] = useState<String>('Hello World!');

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

      let geoLocate = await locationService?.getGeolocationData(location.coords.longitude, location.coords.latitude);
      geoLocationData.current = geoLocate;
      
      setIsLoading(false);
    })();
  }, []);

  const checkBlacklisted = async (stateCode: string | undefined) => {
    setIsLoading(true);

    let blacklisted = await apiService?.isBlacklisted(stateCode);
    blacklisted ? setModalText('You are in a blacklisted state!') : setModalText('You are not blacklisted!');

    setIsLoading(false);
  }
    
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
          <StyledViewCentered>
            <StyledViewModal>
              <StyledModalText>{isLoading ? 'Loading...' : modalText}</StyledModalText>
              <StyledClosePressable onPress={() => setModalVisible(!modalVisible)}>
                <StyledButtonText>Hide Modal</StyledButtonText>
              </StyledClosePressable>
              <StyledModalText />
              <StyledClosePressable onPress={() => checkBlacklisted(geoLocationData.current?.principalSubdivisionCode)} disabled={geoLocationData ? false : true}>
                <StyledButtonText>Blacklisted?</StyledButtonText>
              </StyledClosePressable >
            </StyledViewModal>
          </StyledViewCentered>
        </StyledModal>
        <StyledOpenPressable onPress={() => setModalVisible(true) }>
          <StyledButtonText>Show Modal</StyledButtonText>
        </StyledOpenPressable>
      </>
  );
};

export default ModalComponent;
