import styled from 'styled-components';
import { Modal, Pressable, Text, View } from 'react-native';

const StyledModal = styled(Modal)``;

const StyledPressable = styled(Pressable)``;

const StyledText = styled(Text)``;

const StyledViewCentered = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
`;

const StyledViewModal = styled(View)`
    margin: 20px;
    background-color: white;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
    shadow-color: #000;
    shadow-offset: {
        width: 0px;
        height: 2px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 5;
`;

const StyledModalText = styled(Text)`
    margin-bottom: 15px;
    text-align: center;
`;

const StyledButtonText = styled(Text)`
    color: white;
    font-weight: bold;
    text-align: center;
`;

const StyledOpenPressable = styled(Pressable)`
    border-radius: 20px;
    padding: 10px;
    elevation: 2;

    background-color: #F194FF;
`;

const StyledClosePressable = styled(Pressable)`
    border-radius: 20px;
    padding: 10px;
    elevation: 2;

    backgroundColor: #2196F3;
`;

export { StyledModal, StyledPressable, StyledText, StyledViewCentered, StyledViewModal, StyledModalText, StyledButtonText, StyledOpenPressable, StyledClosePressable };