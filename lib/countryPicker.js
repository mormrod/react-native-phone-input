import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import { Picker as PickerNew } from '@react-native-picker/picker';

import Country from './country';
import styles from './styles';

export default class CountryPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      selectedCountry: this.props.selectedCountry || Country.getAll()[0],
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      selectedCountry: nextProps.selectedCountry,
    });
  }

  selectCountry(selectedCountry) {
    this.setState({
      selectedCountry,
    });
  }

  onPressCancel() {
    if(this.props.onPressCancel){
      this.props.onPressCancel();
    }

    this.setState({
      modalVisible: false,
    });
  }

  onPressSubmit() {
    if(this.props.onPressConfirm){
      this.props.onPressConfirm();
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selectedCountry);
    }

    this.setState({
      modalVisible: false,
    });
  }

  onValueChange(selectedCountry) {
    this.setState({
      selectedCountry,
    });
  }

  show() {
    this.setState({
      modalVisible: true,
    });
  }

  renderItem(country, index) {
    return <PickerNew.Item key={country.iso2} value={country.iso2} label={country.name} />;
  }

  render() {
    const { buttonColor } = this.state;
    const itemStyle = this.props.itemStyle || {};
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          console.log('Country picker has been closed.');
        }}
      >
        <View style={styles.basicContainer}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: this.props.pickerBackgroundColor || 'white' },
            ]}
          >
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={[{ color: buttonColor }, this.props.buttonTextStyle]}>
                  {this.props.cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={[{ color: buttonColor }, this.props.buttonTextStyle]}>
                  {this.props.confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainBox}>
              <PickerNew
                ref={(ref) => {
                  this.picker = ref;
                }}
                style={styles.bottomPicker}
                selectedValue={this.state.selectedCountry}
                onValueChange={country => this.onValueChange(country)}
                itemStyle={itemStyle}
                mode="dialog"
              >
                {Country.getAll().map((country, index) => this.renderItem(country, index))}
              </PickerNew>   
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
