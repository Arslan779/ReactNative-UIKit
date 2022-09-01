import React, {useContext} from 'react';
import {View, TouchableOpacity, Block, Text} from 'react-native';
import styles from '../Style';
import EndCall from './Local/EndCall';
import LocalAudioMute from './Local/LocalAudioMute';
import LocalVideoMute from './Local/LocalVideoMute';
import SwitchCamera from './Local/SwitchCamera';
import PropsContext, {role} from '../PropsContext';
import LocalUserContextComponent from '../LocalUserContext';
import CountDown from 'react-native-countdown-component';
import PatientCard  from './IconsFolder/patient_cardIcon.svg';
import stylesForControls from './EncounterControls.styles';

function Controls(props: {showButton: Boolean}) {
  const {styleProps, rtcProps} = useContext(PropsContext);
  const {localBtnContainer, maxViewRemoteBtnContainer} = styleProps || {};
  const showButton = props.showButton !== undefined ? props.showButton : true;

  return (
    <LocalUserContextComponent>
      <View style={{...styles.Controls, ...(localBtnContainer as object)}}>
        {rtcProps.role === role.Audience ? (
          <EndCall />
        ) : (
          <>
            <LocalAudioMute />
            <LocalVideoMute />
            <SwitchCamera />
            <EndCall />
          </>
        )}
      </View>
      {showButton ? ( 
            <View
              style={{
                ...styles.Controls,
                bottom: styles.Controls.bottom + 70,
                ...(maxViewRemoteBtnContainer as object),
              }}>
                {props.encounterData.userRole === "ROLE_DOCTOR" ?
              //   <TouchableOpacity
              //     style={stylesForControls.patientCardStyle}
              //     onPress={() => {
              //       // props.setPatientCardModal(true);
              //     }}>
              //     <PatientCard color={'blue'} width={24} height={24} />
              //     <View style={stylesForControls.txtStyles}>
              //       <Text>{"Patient Card"}</Text>
              //     </View>
              // </TouchableOpacity> 
              <CountDown
                size={15}
                style={{marginTop: 0, padding: 0}}
                until={
                  !props.encounterData.isLoadingChannelInfo && props.encounterData && props.encounterData.tokenInformation.appointmentDTO.endTime
                    ? props.encounterData.appointmentTimeInSeconds
                    : 0
                }
                digitStyle={{borderWidth: 0,
                  padding: 0,
                  margin: 0,
                  width: 20,}}
                digitTxtStyle={{color: "blue", fontWeight: '400', padding: 0, margin: 0 }}
                separatorStyle={styles.sepStyles}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />
              :
              <CountDown
                size={15}
                style={{marginTop: 0, padding: 0}}
                until={
                  !props.encounterData.isLoadingChannelInfo && props.encounterData && props.encounterData.tokenInformation.appointmentDTO.endTime
                    ? props.encounterData.appointmentTimeInSeconds
                    : 0
                }
                digitStyle={{borderWidth: 0,
                  padding: 0,
                  margin: 0,
                  width: 20,}}
                digitTxtStyle={{color: "blue", fontWeight: '400', padding: 0, margin: 0 }}
                separatorStyle={styles.sepStyles}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />
              }
            </View>
      ) : (
        <></>
      )}
    </LocalUserContextComponent>
  );
}

export default Controls;
