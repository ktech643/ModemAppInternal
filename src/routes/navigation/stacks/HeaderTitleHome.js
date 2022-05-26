import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../../assets/img/modem-logo.png';
import NetInfo from "@react-native-community/netinfo";
import AlertModal from '../../../components/alertModal';

const HeaderTitle = props => {
  const { navigation } = props;
  const [showModal, setShowModal] = useState(false);
  const route = useRoute();

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) return setShowModal(true)
    });

    AsyncStorage.setItem('lastPage', JSON.stringify({
      name: route.name,
      params: route.params
    }));

  }, []);

  return(
    <>
      <TouchableOpacity onPress={() => navigation.navigate('FirstScreen')}>
        <Image source={Logo} style={styles.logo} />
      </TouchableOpacity>
      <AlertModal 
        setShowModal={setShowModal}
        showModal={showModal}
        body='No Internet connection found'
        title='Connection error'
        button='OK'
      />
    </>
  );
}

export default HeaderTitle

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 35,
    alignSelf: 'center',
    elevation: 0
  },
})