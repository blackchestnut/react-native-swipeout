import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const NativeButton = createReactClass({
  propTypes: {
    // Extract parent props
    ...TouchableWithoutFeedback.propTypes,
    textStyle: Text.propTypes.style,
    disabledStyle: Text.propTypes.style,
    children: PropTypes.node.isRequired,
    underlayColor: PropTypes.string,
    background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : PropTypes.any,
  },

  statics: {
    isAndroid: (Platform.OS === 'android'),
  },

  getDefaultProps: function() {
    return {
      textStyle: null,
      disabledStyle: null,
      underlayColor: null,
    };
  },

  _renderText: function() {
    const {children} = this.props;
    if (typeof children !== 'string') {
      return children;
    }

    return (
      <Text numberOfLines={1} style={[styles.textButton, this.props.textStyle]}>
        {children}
      </Text>
    );
  },

  render: function() {
    const disabledStyle = this.props.disabled
      ? (this.props.disabledStyle || styles.opacity)
      : {};
    const text = this._renderText();

    // Extract Button props
    let buttonProps = {
      accessibilityComponentType: this.props.accessibilityComponentType,
      accessibilityTraits: this.props.accessibilityTraits,
      accessible: this.props.accessible,
      delayLongPress: this.props.delayLongPress,
      delayPressIn: this.props.delayPressIn,
      delayPressOut: this.props.delayPressOut,
      disabled: this.props.disabled,
      hitSlop: this.props.hitSlop,
      onLayout: this.props.onLayout,
      onLongPress: this.props.onLongPress,
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      pressRetentionOffset: this.props.pressRetentionOffset,
    };

    // Render Native Android Button
    if (NativeButton.isAndroid) {
      buttonProps = {
        ...buttonProps,
        background: this.props.background || TouchableNativeFeedback.SelectableBackground(),
      };

      return (
        <TouchableNativeFeedback
          {...buttonProps}>
          <View style={[styles.button, this.props.style, disabledStyle]}>
            {text}
          </View>
        </TouchableNativeFeedback>
      );
    }

    // Render default button
    return (
      <TouchableHighlight
        {...buttonProps}
        style={[styles.button, this.props.style, disabledStyle]}
        underlayColor={this.props.underlayColor}
      >
        {text}
      </TouchableHighlight>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 14,
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.8,
  },
});

export default NativeButton;
