import React, { useState } from 'react'
import {
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

const AlertModal = props => {
  const { body, title, button, showModal, setShowModal } = props;

  return(
    <Modal
      style={{flex: 1, alignSelf: 'center', width: '100%', margin: 0}}
      animationType='slide'
      transparent={true} 
      step={1} 
      backdropColor={'rgba(23,22,15,0.6)'}
      isVisible={showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}
      onBackdropPress={() => setShowModal(!showModal)}
    >
      <View style={styles.centeredView} >    
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
          <TouchableOpacity onPress={() => setShowModal(false)} style={{borderTopColor: 'grey', borderTopWidth: 0.5}}>
            <Text style={styles.btn}>{button}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}


const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {
  
})(AlertModal)


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: '87%',
    backgroundColor: "white",
    borderRadius: 26,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    paddingTop: 10
  },
  body: {
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 25,
    textAlign: 'center'
  },
  btn: {
    fontSize: 26,
    borderTopColor: 'grey',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 4,
  }
})


