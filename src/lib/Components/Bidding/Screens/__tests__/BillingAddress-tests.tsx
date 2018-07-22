import React from "react"
import { TextInput, TouchableWithoutFeedback } from "react-native"
import * as renderer from "react-test-renderer"

import { Button } from "../../Components/Button"
import { Sans12, Serif16 } from "../../Elements/Typography"
import { BillingAddress } from "../BillingAddress"

import { FakeNavigator } from "../../__tests__/Helpers/FakeNavigator"

const selectCountry = (component, navigator, country) => {
  // The second `<TouchableWithoutFeedback>` is a button that pushes a new `<SelectCountry>` instance.
  component.root.findAllByType(TouchableWithoutFeedback)[1].instance.props.onPress()

  navigator.nextStep().root.instance.props.onCountrySelected(country)
}

it("renders properly", () => {
  const component = renderer.create(<BillingAddress />).toJSON()
  expect(component).toMatchSnapshot()
})

it("shows an error message for each field", () => {
  const component = renderer.create(<BillingAddress />)

  component.root.findByType(Button).instance.props.onPress()

  expect(errorTextComponent(component, "Full name").props.children).toEqual("This field is required")
  expect(errorTextComponent(component, "Address line 1").props.children).toEqual("This field is required")
  expect(errorTextComponent(component, "City").props.children).toEqual("This field is required")
  expect(errorTextComponent(component, "State, Province, or Region").props.children).toEqual("This field is required")
  expect(errorTextComponent(component, "Postal code").props.children).toEqual("This field is required")
})

it("calls the onSubmit() callback with billing address when ADD BILLING ADDRESS is tapped", () => {
  const fakeNavigator = new FakeNavigator()
  const onSubmitMock = jest.fn()

  const component = renderer.create(<BillingAddress onSubmit={onSubmitMock} navigator={fakeNavigator as any} />)

  textInputComponent(component, "Full name").props.onChangeText("Yuki Stockmeier")
  textInputComponent(component, "Address line 1").props.onChangeText("401 Broadway")
  textInputComponent(component, "Address line 2 (optional)").props.onChangeText("25th floor")
  textInputComponent(component, "City").props.onChangeText("New York")
  textInputComponent(component, "State, Province, or Region").props.onChangeText("NY")
  textInputComponent(component, "Postal code").props.onChangeText("10013")
  selectCountry(component, fakeNavigator, billingAddress.country)

  component.root.findByType(Button).instance.props.onPress()

  expect(onSubmitMock).toHaveBeenCalledWith(billingAddress)
})

it("updates the validation for country when coming back from the select country screen", () => {
  const fakeNavigator = new FakeNavigator()

  const component = renderer.create(<BillingAddress onSubmit={() => null} navigator={fakeNavigator as any} />)

  textInputComponent(component, "Full name").props.onChangeText("Yuki Stockmeier")
  textInputComponent(component, "Address line 1").props.onChangeText("401 Broadway")
  textInputComponent(component, "Address line 2 (optional)").props.onChangeText("25th floor")
  textInputComponent(component, "City").props.onChangeText("New York")
  textInputComponent(component, "State, Province, or Region").props.onChangeText("NY")
  textInputComponent(component, "Postal code").props.onChangeText("10013")

  component.root.findByType(Button).instance.props.onPress()

  expect(component.root.findByType(Sans12).props.children).toEqual("This field is required")

  selectCountry(component, fakeNavigator, billingAddress.country)

  // The <Sans12> instances in the BillingAddress screen display error messages
  expect(component.root.findAllByType(Sans12).length).toEqual(0)
})

it("pre-fills the fields if initial billing address is provided", () => {
  const component = renderer.create(<BillingAddress billingAddress={billingAddress} />)

  expect(textInputComponent(component, "Full name").props.value).toEqual("Yuki Stockmeier")
  expect(textInputComponent(component, "Address line 1").props.value).toEqual("401 Broadway")
  expect(textInputComponent(component, "Address line 2 (optional)").props.value).toEqual("25th floor")
  expect(textInputComponent(component, "City").props.value).toEqual("New York")
  expect(textInputComponent(component, "State, Province, or Region").props.value).toEqual("NY")
  expect(textInputComponent(component, "Postal code").props.value).toEqual("10013")

  const countryField = component.root.findAllByType(Serif16)[7]

  expect(countryField.props.children).toEqual("United States")
})

const errorTextComponent = (component, label) => findFieldForInput(component, { label }).findByType(Sans12)

const textInputComponent = (component, label) => findFieldForInput(component, { label }).findByType(TextInput)

const findFieldForInput = (component, { label }) => component.root.findByProps({ label })

const billingAddress = {
  fullName: "Yuki Stockmeier",
  addressLine1: "401 Broadway",
  addressLine2: "25th floor",
  city: "New York",
  state: "NY",
  postalCode: "10013",
  country: {
    longName: "United States",
    shortName: "US",
  },
}
