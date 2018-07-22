import React from "react"
import "react-native"
import * as renderer from "react-test-renderer"
import { FakeNavigator } from "../../__tests__/Helpers/FakeNavigator"

import Spinner from "../../../../Components/Spinner"
import { Button } from "../../Components/Button"

import { SelectMaxBid } from "../SelectMaxBid"

jest.mock("tipsi-stripe", () => ({ setOptions: jest.fn() }))

const Me = {
  has_qualified_credit_cards: true,
}

const SaleArtwork = {
  _id: "sale-artwork-id",
  artwork: {
    id: "meteor shower",
    title: "Meteor Shower",
    date: "2015",
    artist_names: "Makiko Kudo",
  },
  sale: {
    id: "best-art-sale-in-town",
  },
  lot_label: "538",
  increments: [
    {
      display: "$35,000",
      cents: 3500000,
    },
    {
      display: "$40,000",
      cents: 4000000,
    },
    {
      display: "$45,000",
      cents: 4500000,
    },
    {
      display: "$50,000",
      cents: 5000000,
    },
    {
      display: "$55,000",
      cents: 5500000,
    },
  ],
}

let fakeNavigator: FakeNavigator
let fakeRelay: {
  refetch: jest.Mock
}

beforeEach(() => {
  fakeNavigator = new FakeNavigator()
  fakeRelay = {
    refetch: jest.fn(),
  } as any
  // We need to mock timers because we push onto our nav stack and instantiate a ConfirmBid component that has a timer.
  jest.useFakeTimers()
})

it("renders properly", () => {
  const component = renderer
    .create(
      <SelectMaxBid me={Me} sale_artwork={SaleArtwork} navigator={fakeNavigator as any} relay={fakeRelay as any} />
    )
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("shows a spinner while fetching new bid increments", () => {
  const component = renderer.create(
    <SelectMaxBid me={Me} sale_artwork={SaleArtwork} navigator={fakeNavigator as any} relay={fakeRelay as any} />
  )

  component.root.instance.setState({ isRefreshingSaleArtwork: true })

  expect(component.root.findByType(Spinner)).toBeDefined()
})

it("refetches in next component's refreshSaleArtwork", () => {
  const component = renderer.create(
    <SelectMaxBid me={Me} sale_artwork={SaleArtwork} navigator={fakeNavigator as any} relay={fakeRelay as any} />
  )
  component.root.findByType(Button).instance.props.onPress()
  const nextScreen = fakeNavigator.nextStep()

  nextScreen.root.instance.props.refreshSaleArtwork()

  expect(fakeRelay.refetch).toHaveBeenCalledWith({ saleArtworkID: "sale-artwork-id" }, null, expect.anything(), {
    force: true,
  })
  expect(component.root.findByType(Spinner)).toBeDefined()
})

it("removes the spinner once the refetch is complete", () => {
  const component = renderer.create(
    <SelectMaxBid me={Me} sale_artwork={SaleArtwork} navigator={fakeNavigator as any} relay={fakeRelay as any} />
  )
  component.root.findByType(Button).instance.props.onPress()
  const nextScreen = fakeNavigator.nextStep()
  fakeRelay.refetch.mockImplementationOnce((_params, _renderVars, callback) => {
    callback()
  })

  nextScreen.root.instance.props.refreshSaleArtwork()

  expect(component.root.findAllByType(Spinner).length).toEqual(0)
})
