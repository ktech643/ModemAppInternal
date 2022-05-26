import React, { useState } from 'react'
import {
  StyleSheet, TouchableOpacity, View, Text, Image
} from 'react-native'
import Bullet from '../../../assets/icons/bullet.png'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable';

const ConnectionsSubMenu = props => {
  const { title, submenu } = props;
  const [showSubMenu, setShowSubMenu] = useState(false);
  return(
    <View style={styles.showCityDetailsContainer}>
      <TouchableOpacity onPress={() => setShowSubMenu(!showSubMenu)}>
        <Animatable.View animation="slideInDown" duration={200} style={styles.list}>
          <Text style={[styles.cityName, {marginLeft: 24}]}>{title}</Text>
        </Animatable.View>
      </TouchableOpacity>
      {showSubMenu && submenu.map((subMenu, Key) => <TouchableOpacity Key={Key}>
        <Animatable.View animation="slideInDown" duration={200} style={styles.list}>
          <Image source={Bullet} style={styles.bulletIcon} />
          <Text style={styles.listText}>{subMenu}</Text>
        </Animatable.View>
      </TouchableOpacity>)}
    </View>
  );
}


const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, {

})(ConnectionsSubMenu)

const styles = StyleSheet.create({
  showCityDetailsContainer: {
    marginVertical: 12
  },
  bullet: {
    color: 'black',
    fontSize: 14
  },
  bulletIcon: {
    height: 15,
    width: 15
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listText: {
    fontSize: 20,
    marginLeft: 10
  },
  cityName: {
    fontSize: 25,
    textTransform: 'uppercase',
    color: 'black'
  },
})

