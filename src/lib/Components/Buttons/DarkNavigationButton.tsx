import React from "react"
import { Image, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

import { Colors } from "lib/data/colors"
import { Fonts } from "lib/data/fonts"
import SwitchBoard from "lib/NativeModules/SwitchBoard"

interface Props extends React.Props<DarkNavigationButton> {
  href?: string
  onPress?: () => void
  title: string
  style?: any
}

const BackgroundView = styled.View`
  background-color: ${Colors.Black};
  padding-left: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 6px;
`

const Text = styled.Text`
  font-family: "${Fonts.GaramondRegular}";
  font-size: 19;
  color: ${Colors.White};
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export default class DarkNavigationButton extends React.Component<Props, any> {
  render() {
    // const showNavArrow = this.props.href || this.props.onPress
    // TEMP for testing
    const showNavArrow = true
    return (
      <BackgroundView style={this.props.style}>
        <TouchableWithoutFeedback 
          // onPress={this.openLink.bind(this)}
        >
          <Row>
            <Text>{this.props.title}</Text>
            {showNavArrow && <Image 
              source={require("../../../../images/horizontal_chevron_white.png")}
              style={{ position: 'relative', top: 6 }}
            />}
          </Row>
        </TouchableWithoutFeedback>
      </BackgroundView>
    )
  }

  openLink() {
    if (this.props.href) {
      SwitchBoard.presentNavigationViewController(this, this.props.href)
    } else if (this.props.onPress) {
      this.props.onPress()
    }
  }
}
