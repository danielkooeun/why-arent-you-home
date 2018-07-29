import React, { Component } from 'react';
import { View, Button, Modal, Text, TouchableHighlight, Image } from 'react-native';
import { Circle } from 'react-native-maps';

function Hiders(props) {
  const hiders = props.hiders;
  const radius = props.radius;
  const listItems = hiders.map((player) =>
    (<Circle
      key={ player.key }
      center={ player.position }
      radius={ radius * 0.02 }
      fillColor={ `rgba(255,65,54, ${ player.fade.level })` }
      strokeColor="rgba(0, 0, 0, 0)"/>)
  );
  return (
    <View>{listItems}</View>
  );
}

function HiderLocations(props) {
  const { navigation } = props;
  const hiders = props.hiders;
  const listItems = hiders.map((player) => 
    (<ModalExample key={ player.key } player={ player }/>)
  );
  return (
    <View>{listItems}</View>
  );
}

class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      photo: this.props.player.photo,
      name: this.props.player.key
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{ marginBottom: 25 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{margin: 50, justifyContent: 'center' }}>
            <Image
              source={{ uri: this.state.photo }}
              style={{ width: 200, height: 200, margin: 'auto' }}
            />
            <Button
              onPress={ () => this.setModalVisible(false) }
              title="Close"
            />
          </View>
        </Modal>

        <Button
          onPress={ () => this.setModalVisible(true) }
          color={ `rgba(255,65,54, 0.5)` }
          title={ `${this.state.name} search` }
        />
      </View>
    );
  }
}

export {
  Hiders,
  HiderLocations,
};