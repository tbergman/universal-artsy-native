import * as React from 'react';
import { Modal, Text } from 'react-native-paper';

export default class MyComponent extends React.Component {
  state = {
    visible: true,
  };

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    return (
      <Modal visible={visible}>
        <Text>Example Modal</Text>
      </Modal>
    );
  }
}