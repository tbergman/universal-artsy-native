import React from "react"
import { graphql, QueryRenderer, QueryRendererProps } from "react-relay"

// tslint:disable:no-unused-expression
import Artist from "../Containers/Artist"
Artist

import BidFlow from "../Containers/BidFlow"
BidFlow

import RegistrationFlow from "../Containers/RegistrationFlow"
RegistrationFlow

import Conversation from "../Containers/Conversation"
Conversation

import Gene from "../Containers/Gene"
Gene

import WorksForYou from "../Containers/WorksForYou"
WorksForYou

import Inquiry from "../Containers/Inquiry"
Inquiry

import MyProfile from "lib/Scenes/Settings/MyProfile"
MyProfile

import Inbox from "../Containers/Inbox"
Inbox

import SavedWorks from "../Scenes/Favorites/Components/Artworks"
SavedWorks


// tslint:enable:no-unused-expression

import createEnvironment from "./createEnvironment"
const environment = createEnvironment()

export type RenderCallback = QueryRendererProps["render"]

interface RendererProps {
  render: RenderCallback
}

interface ArtistRendererProps extends RendererProps {
  artistID: string
  isPad: boolean
}

export const ArtistRenderer: React.SFC<ArtistRendererProps> = ({ render, artistID, isPad }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersArtistQuery($artistID: String!, $isPad: Boolean!) {
          artist(id: $artistID) {
            ...Artist_artist
          }
        }
      `}
      variables={{ artistID, isPad }}
      render={render}
    />
  )
}

export interface BidderFlowRendererProps extends RendererProps {
  artworkID?: string
  saleID: string
}

export const RegistrationFlowRenderer: React.SFC<BidderFlowRendererProps> = ({ render, saleID }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersRegistrationFlowQuery($saleID: String!) {
          sale(id: $saleID) {
            name
            ...RegistrationFlow_sale
          }
          me {
            ...RegistrationFlow_me
          }
        }
      `}
      variables={{
        saleID,
      }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        } else if (!props) {
          return render({ props, error }) // So that we show the spinner
        } else if (props) {
          return render({
            props: {
              sale: props.sale,
              me: props.me,
            },
            error,
          })
        }
        return null
      }}
    />
  )
}

export const BidFlowRenderer: React.SFC<BidderFlowRendererProps> = ({ render, artworkID, saleID }) => {
  // TODO: artworkID can be nil, so omit that part of the query if it is.
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersBidFlowQuery($artworkID: String!, $saleID: String!) {
          artwork(id: $artworkID) {
            sale_artwork(sale_id: $saleID) {
              ...BidFlow_sale_artwork
            }
          }
          me {
            ...BidFlow_me
          }
        }
      `}
      variables={{
        artworkID,
        saleID,
      }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        } else if (!props) {
          return render({ props, error }) // So that we show the spinner
        } else if (props) {
          // Note that we need to flatten the query above before passing into the BidFlow component.
          // i.e.: the `sale_artwork` is nested within `artwork`, but we want the sale_artwork itself as a prop.
          return render({
            props: {
              sale_artwork: props.artwork.sale_artwork,
              me: props.me,
            },
            error,
          })
        }
      }}
    />
  )
}

interface ConversationRendererProps extends RendererProps {
  conversationID: string
  cursor?: string
  count?: number
}

export const ConversationRenderer: React.SFC<ConversationRendererProps> = ({ render, conversationID }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersConversationQuery($conversationID: String!) {
          me {
            ...Conversation_me
          }
        }
      `}
      variables={{
        conversationID,
        count: 10,
      }}
      render={render}
    />
  )
}

export const ForYouRenderer: React.SFC<RendererProps> = ({ render }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersForYouQuery {
          forYou: home_page {
            ...ForYou_forYou
          }
        }
      `}
      variables={{}}
      render={render}
    />
  )
}

interface GeneRendererProps extends RendererProps {
  geneID: string
  medium?: string
  price_range?: string
}

export const GeneRenderer: React.SFC<GeneRendererProps> = ({ render, geneID, medium, price_range }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersGeneQuery($geneID: String!, $medium: String, $price_range: String) {
          gene(id: $geneID) {
            ...Gene_gene @arguments(medium: $medium, price_range: $price_range)
          }
        }
      `}
      variables={{
        geneID,
        medium,
        price_range,
      }}
      render={render}
    />
  )
}

interface SaleRendererProps extends RendererProps {
  saleID: string
}

export const SaleRenderer: React.SFC<SaleRendererProps> = ({ render, saleID }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersSaleQuery($saleID: String!) {
          sale(id: $saleID) {
            ...Sale_sale
          }
        }
      `}
      variables={{ saleID }}
      render={render}
    />
  )
}

interface WorksForYouRendererProps extends RendererProps {
  selectedArtist?: string
}

export const WorksForYouRenderer: React.SFC<WorksForYouRendererProps> = ({ render, selectedArtist }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersWorksForYouQuery($selectedArtist: String!) {
          viewer {
            ...WorksForYou_viewer @arguments(selectedArtist: $selectedArtist)
          }
        }
      `}
      variables={{
        selectedArtist: selectedArtist || "",
      }}
      render={render}
    />
  )
}

interface InquiryRendererProps extends RendererProps {
  artworkID: string
}

export const InquiryRenderer: React.SFC<InquiryRendererProps> = ({ render, artworkID }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersInquiryQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...Inquiry_artwork
          }
        }
      `}
      variables={{
        artworkID,
      }}
      render={render}
    />
  )
}

export const InboxRenderer: React.SFC<RendererProps> = ({ render }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersInboxQuery {
          me {
            ...Inbox_me
          }
        }
      `}
      variables={{}}
      render={render}
    />
  )
}

export const ArtworksRenderer: React.SFC<RendererProps> =  ({ render }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersFavoriteArtworksQuery {
          me {
            ...Artworks_me
          }
        }
      `}
      variables={{
        count: 10,
      }}
      render={render}
    />
  )
}

export const ArtistsRenderer: React.SFC<RendererProps> =  ({ render }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersFavoriteArtistsQuery {
          me {
            ...Artists_me
          }
        }
      `}
      variables={{ count: 10 }}
      render={render}
    />
  )
}

export const MyProfileRenderer: React.SFC<RendererProps> = ({ render }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QueryRenderersMyProfileQuery {
          me {
            ...MyProfile_me
          }
        }
      `}
      variables={{}}
      render={render}
    />
  )
}
