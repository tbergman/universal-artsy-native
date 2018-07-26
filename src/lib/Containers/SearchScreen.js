import * as React from 'react';
import { StyleSheet, View, Dimensions, Platform, Text } from 'react-native';
// import { Modal, Text, Searchbar } from 'react-native-paper';
import Modal from "react-native-modalbox";
const { width, height } = Dimensions.get("window");
import { BlurView } from 'expo';

export default class SearchScreen extends React.Component {
  state = {
    visible: true,
    firstQuery: '',
  };

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });
/* 
  renderModal = () => {
    let marginTop = height / 2 - 20;

    // let BackgroundView = Platform.OS === "ios" ? BlurView : View;

    return (
        <Modal
            style={{
                backgroundColor:
                    Platform.OS === "ios" ? "transparent" : "gray",
                marginTop: marginTop,
                height: 500,
                width: 500,
            }}
            ref={ref => (this.modal = ref)}
            coverScreen={true}
            swipeArea={marginTop + 30}
            backdropOpacity={0.0}
            backdropPressToClose={true}
            swipeToClose={true}
        >
            <BlurView
                style={{
                    flex: 1,
                    borderRadius: 12,
                    paddingBottom: marginTop,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                intensity={100}
            >
                <Text>ABCDEF</Text>   
            </BlurView>
        </Modal>
    );
}; */

  render() {
    let marginTop = height / 2 - 20;
    const { visible, firstQuery } = this.state;
    return (
      <View style={styles.modal}>
      <Modal
          style={{
              backgroundColor:
                  Platform.OS === "ios" ? "transparent" : "gray",
              marginTop: marginTop,
              height: 500,
              width: 500,
          }}
          ref={ref => (this.modal = ref)}
          coverScreen={true}
          swipeArea={marginTop + 30}
          backdropOpacity={0.0}
          backdropPressToClose={true}
          swipeToClose={true}
      >
          <BlurView
              style={{
                  flex: 1,
                  borderRadius: 12,
                  paddingBottom: marginTop,
                  justifyContent: "center",
                  alignItems: "center"
              }}
              intensity={100}
          >
              <Text>ABCDEF</Text>   
          </BlurView>
      </Modal>
      </View>
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
