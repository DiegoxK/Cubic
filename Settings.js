import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const Settings = ({ defaultPole, onDefaultPoleChange }) => {
  const [width, setWidth] = useState(defaultPole.width.toString());
  const [height, setHeight] = useState(defaultPole.height.toString());
  const [length, setLength] = useState((defaultPole.length / 100).toString());

  const onWidthChange = (text) => {
    setWidth(text);
    onDefaultPoleChange({
      width: parseFloat(text) || 0,
      height: parseFloat(height) || 0,
      length: parseFloat(length) || 0,
    });
  };

  const onHeightChange = (text) => {
    setHeight(text);
    onDefaultPoleChange({
      width: parseFloat(width) || 0,
      height: parseFloat(text) || 0,
      length: parseFloat(length) || 0,
    });
  };
  const onLengthChange = (text) => {
    setLength(text);
    onDefaultPoleChange({
      width: parseFloat(width) || 0,
      height: parseFloat(height) || 0,
      length: parseFloat(text) * 100 || 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poste predeterminado</Text>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ancho"
            value={width.toString()}
            onChangeText={onWidthChange}
          />
          <Text>Ancho (cm)</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Alto"
            value={height.toString()}
            onChangeText={onHeightChange}
          />
          <Text>Alto (cm)</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Largo"
            value={length.toString()}
            onChangeText={onLengthChange}
          />
          <Text>Largo (m)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    width: "100%",
    padding: 10,
  },
});
export default Settings;
