/* 
import { StyleSheet, View, Dimensions, Platform, Text } from 'react-native';
import Modal from "react-native-modalbox";
const { width, height } = Dimensions.get("window");
import { BlurView } from 'expo';


renderModal = () => {
        let marginTop = height / 2 - 20;

        let BackgroundView = Platform.OS === "ios" ? BlurView : View;

        return (
            <Modal
                style={{
                    backgroundColor:
                        Platform.OS === "ios" ? "transparent" : "white",
                    marginTop: marginTop
                }}
                ref={ref => (this.modal = ref)}
                coverScreen={true}
                swipeArea={marginTop + 30}
                backdropOpacity={0.0}
                backdropPressToClose={true}
                swipeToClose={true}
            >
                <BackgroundView
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
                </BackgroundView>
            </Modal>
        );
    }; */