import React from "react"
import { createFragmentContainer, graphql, RelayPaginationProp } from "react-relay"

import { Schema, Track, track as _track } from "../utils/track"

import { SmallHeadline } from "../Components/Inbox/Typography"

import { NetInfo, View } from "react-native"

import styled from "styled-components/native"

import ConnectivityBanner from "../Components/ConnectivityBanner"

import Composer from "../Components/Inbox/Conversations/Composer"
import Messages from "../Components/Inbox/Conversations/Messages"
import { Messages as MessagesComponent } from "../Components/Inbox/Conversations/Messages"

import { sendConversationMessage } from "../Components/Inbox/Conversations/SendConversationMessage"

import { updateConversation } from "../Components/Inbox/Conversations/UpdateConversation"

import { Conversation_me } from "__generated__/Conversation_me.graphql"

const Container = styled.View`
  flex: 1;
  flex-direction: column;
`
const Header = styled.View`
  align-self: stretch;
  margin-top: 22px;
  flex-direction: column;
  margin-bottom: 18px;
`

// This makes it really easy to style the HeaderTextContainer with space-between
const PlaceholderView = View

const HeaderTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

interface Props {
  me: Conversation_me
  relay: RelayPaginationProp
  onMessageSent?: (text: string) => void
}

interface State {
  sendingMessage: boolean
  isConnected: boolean
  markedMessageAsRead: boolean
  fetchingData: boolean
  failedMessageText: string | null
}

const track: Track<Props, State> = _track

@track()
export class Conversation extends React.Component<Props, State> {
  messages: MessagesComponent
  composer: Composer

  // Assume if the component loads, connection exists (this way the banner won't flash unnecessarily)
  state = {
    sendingMessage: false,
    isConnected: true,
    markedMessageAsRead: false,
    fetchingData: false,
    failedMessageText: null,
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener("connectionChange", this.handleConnectivityChange)
    this.maybeMarkLastMessageAsRead()
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnectivityChange)
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected })
  }

  maybeMarkLastMessageAsRead() {
    const conversation = this.props.me.conversation
    if (conversation.unread && !this.state.markedMessageAsRead) {
      updateConversation(
        this.props.relay.environment,
        conversation,
        conversation.last_message_id,
        _response => {
          this.setState({ markedMessageAsRead: true })
        },
        error => {
          console.warn(error)
          this.setState({ markedMessageAsRead: true })
        }
      )
    }
  }

  @track(props => ({
    action_type: Schema.ActionTypes.Success,
    action_name: Schema.ActionNames.ConversationSendReply,
    owner_id: props.me.conversation.id,
    owner_type: Schema.OwnerEntityTypes.Conversation,
  }))
  messageSuccessfullySent(text: string) {
    this.setState({ sendingMessage: false })

    if (this.props.onMessageSent) {
      this.props.onMessageSent(text)
    }
  }

  @track(props => ({
    action_type: Schema.ActionTypes.Fail,
    action_name: Schema.ActionNames.ConversationSendReply,
    owner_id: props.me.conversation.id,
    owner_type: Schema.OwnerEntityTypes.Conversation,
  }))
  messageFailedToSend(error: Error, text: string) {
    console.warn(error)
    this.setState({ sendingMessage: false, failedMessageText: text })
  }

  render() {
    const conversation = this.props.me.conversation
    const partnerName = conversation.to.name

    return (
      <Composer
        disabled={this.state.sendingMessage || !this.state.isConnected}
        ref={composer => (this.composer = composer)}
        value={this.state.failedMessageText}
        onSubmit={text => {
          this.setState({ sendingMessage: true, failedMessageText: null })
          sendConversationMessage(
            this.props.relay.environment,
            conversation,
            text,
            _response => {
              this.messageSuccessfullySent(text)
            },
            error => {
              this.messageFailedToSend(error, text)
            }
          )
          this.messages.scrollToLastMessage()
        }}
      >
        <Container>
          <Header>
            <HeaderTextContainer>
              <SmallHeadline style={{ fontSize: 14 }}>{partnerName}</SmallHeadline>
              <PlaceholderView />
            </HeaderTextContainer>
          </Header>
          {!this.state.isConnected && <ConnectivityBanner />}
          <Messages
            componentRef={messages => (this.messages = messages)}
            conversation={conversation as any}
            onDataFetching={loading => {
              this.setState({ fetchingData: loading })
            }}
          />
        </Container>
      </Composer>
    )
  }
}

export default createFragmentContainer(Conversation, {
  me: graphql`
    fragment Conversation_me on Me {
      conversation(id: $conversationID) {
        id
        __id
        to {
          name
          initials
        }
        from {
          email
        }
        last_message_id
        ...Messages_conversation
        initial_message
        unread
      }
    }
  `,
})
