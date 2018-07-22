import React from "react"
import { ViewProperties } from "react-native"
import styled from "styled-components/native"

// Full screen black
const BG = styled.View`
  background-color: black;
  flex: 1;
`

// Centered max-width of 600px
const ConsignmentContainer = styled.View`
  background-color: black;
  width: 100%;
  height: 100%;
  align-self: center;
`

export default class ConsignmentBG extends React.Component<ViewProperties> {
  render() {
    return (
      <BG key="bg" {...this.props}>
        <ConsignmentContainer>{this.props.children}</ConsignmentContainer>
      </BG>
    )
  }
}
