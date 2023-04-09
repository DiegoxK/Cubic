import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import Settings from "./Settings";

function App() {
  const [measurements, setMeasurements] = useState([]);
  const [volume, setVolume] = useState(0);
  const [defaultPole, setDefaultPole] = useState({
    width: 10,
    height: 10,
    length: 300,
  });
  const [inputValues, setInputValues] = useState({
    width: "",
    height: "",
    length: "",
  });
  const [showSettings, setShowSettings] = useState(false);

  const insets = useSafeAreaInsets();

  const addMeasurement = (width, height, length) => {
    const newMeasurements = [
      ...measurements,
      { width, height, length, key: Date.now().toString() },
    ];
    setMeasurements(newMeasurements);
    const newVolume = newMeasurements.reduce(
      (total, current) =>
        total + current.width * current.height * current.length,
      0
    );
    setVolume(newVolume);
  };

  const handleInputChange = (value, field) => {
    if (value === "" || !isNaN(value)) {
      setInputValues({ ...inputValues, [field]: value });
    }
  };

  const handleInputSubmit = () => {
    const { width, height, length } = inputValues;
    if (width && height && length) {
      addMeasurement(
        parseFloat(width),
        parseFloat(height),
        parseFloat(length) * 100
      );
      setInputValues({ width: "", height: "", length: "" });
    }
  };

  const onDelete = (key) => {
    const newMeasurements = measurements.filter((item) => item.key !== key);
    setMeasurements(newMeasurements);
    const newVolume = newMeasurements.reduce(
      (total, current) =>
        total + current.width * current.height * current.length,
      0
    );
    setVolume(newVolume);
  };

  const onDefaultPoleChange = (newDefaultPole) => {
    setDefaultPole(newDefaultPole);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text
          style={styles.itemText}
        >{`${item.width}cm x ${item.height}cm x ${item.length}cm`}</Text>
        <TouchableOpacity onPress={() => onDelete(item.key)}>
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const defaultPoleVolume =
    defaultPole.width * defaultPole.height * defaultPole.length;
  const defaultPiecesFromTotal = (volume / defaultPoleVolume).toFixed(2);

  return (
    <SafeAreaView style={[styles.container, { marginTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Cubic</Text>
        <TouchableOpacity onPress={() => setShowSettings(!showSettings)}>
          <MaterialIcons name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {showSettings && (
        <Settings
          defaultPole={defaultPole}
          onDefaultPoleChange={onDefaultPoleChange}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ancho (cm)"
          value={inputValues.width}
          onChangeText={(value) => handleInputChange(value, "width")}
          onSubmitEditing={handleInputSubmit}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Alto (cm)"
          value={inputValues.height}
          onChangeText={(value) => handleInputChange(value, "height")}
          onSubmitEditing={handleInputSubmit}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Largo (m)"
          value={inputValues.length}
          onChangeText={(value) => handleInputChange(value, "length")}
          onSubmitEditing={handleInputSubmit}
        />
      </View>
      <FlatList data={measurements} renderItem={renderItem} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Volumen total: {volume.toFixed(2)} cm³
        </Text>
        <Text style={styles.footerText}>
          Pieza predeterminada: {defaultPoleVolume.toFixed(2)} cm³
        </Text>
        <Text style={styles.footerText}>
          Cantidad de piezas: {measurements.length}
        </Text>
        <Text style={styles.footerText}>
          Piezas obtenibles: {defaultPiecesFromTotal}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA500",
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
    width: "30%",
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
  },
  footer: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 18,
    color: "#FFF",
  },
});

export default function Main() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}
