import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Text, Searchbar } from 'react-native-paper';
import { BlurView } from 'expo';

export default class SearchScreen extends React.Component {
  state = {
    visible: true,
    firstQuery: '',
  };

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

  render() {
    const { visible, firstQuery } = this.state;
    return (
      <Modal visible={visible} style={styles.modal}>
        <BlurView tint="light" intensity={50} style={styles.blurView}>
          <View style={styles.innerModal}> 
            <Searchbar
              placeholder="Search"
              onChangeText={query => { this.setState({ firstQuery: query }); }}
              value={firstQuery}
            />
            <View style={styles.textWrapper}>
              <Text>Search works of art</Text>
            </View>
          </View>
        </BlurView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    height: 600,
  },
  innerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 600,
 /*    flex:1,
    width: 500,
    height: 500, */
  },
  blurView: {
    // height: 600,
/*     position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0, */
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  }
});
