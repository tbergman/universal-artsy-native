import { shallow } from "enzyme"
import React from "react"
import "react-native"

import { renderWithLayout } from "lib/tests/renderWithLayout"

import Sales from "../index"

jest.mock("WebView", () => "WebView")
jest.mock("../Components/ZeroState/index.html", () => "")
jest.mock("../Components/LotsByFollowedArtists", () => "")

it("renders the ZeroState when there are no sales", () => {
  const auctions = shallow(<Sales {...Object.assign({}, props, { viewer: { sales: [] } })} />)
  expect(auctions.find("ZeroState").length).toEqual(1)
})

it("looks correct when rendered", () => {
  const auctions = renderWithLayout(<Sales {...props} />, { width: 1000 })
  expect(auctions).toMatchSnapshot()
})

const props = {
  relay: {
    environment: null,
    hasMore: jest.fn(),
    isLoading: jest.fn(),
    loadMore: jest.fn(),
    refetch: jest.fn(),
  },
  viewer: {
    sales: [
      {
        id: "wright-noma",
        href: "/auction/wright-noma",
        name: "Wright: noma",
        is_open: true,
        is_live_open: true,
        start_at: "2017-10-16T22:00:00+00:00",
        end_at: null,
        registration_ends_at: "2017-11-01T13:00:00+00:00",
        live_start_at: "2017-11-02T13:00:00+00:00",
        display_timely_at: "In Progress",
        cover_image: {
          url: "https://d32dm0rphc51dk.cloudfront.net/WV-7BYlETayN8MGkNjOGXw/source.jpg",
        },
      },
      {
        id: "freemans-modern-and-contemporary-works-of-art",
        href: "/auction/freemans-modern-and-contemporary-works-of-art",
        name: "Freeman's: Modern & Contemporary Works of Art",
        is_open: true,
        is_live_open: false,
        start_at: "2017-10-17T15:00:00+00:00",
        end_at: null,
        registration_ends_at: "2017-11-01T17:00:00+00:00",
        live_start_at: "2017-11-02T17:00:00+00:00",
        display_timely_at: "In Progress",
        cover_image: {
          url: "https://d32dm0rphc51dk.cloudfront.net/eeqLfwMMAYA8XOmeYEb7Rg/source.jpg",
        },
      },
    ],
    sale_artworks: {
      pageInfo: {},
      edges: [
        {
          node: {
            id: "foo",
          },
        },
      ],
    },
  },
}
