import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import {
  getCurrentPositionAsync,
  requestPermissionsAsync
} from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../services/api";

export default function Main({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [users, setUsers] = useState([]);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;

        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        });
      }
    }
    loadPosition();
  }, []);

  async function fetchUsers() {
    const { latitude, longitude } = currentLocation;

    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setUsers(response.data.devs);
  }

  function handleLocationChange(region) {
    setCurrentLocation(region);
  }

  if (!currentLocation) {
    null;
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleLocationChange}
        style={styles.map}
        initialRegion={currentLocation}
      >
        {users.map(user => (
          <Marker
            key={user._id}
            coordinate={{
              longitude: user.location.coordinates[0],
              latitude: user.location.coordinates[1]
            }}
          >
            <Image
              source={{
                uri: user.avatar_url
              }}
              style={styles.avatar}
            />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", {
                  github_username: user.github_username
                });
              }}
            >
              <View style={styles.callout}>
                <Text style={styles.devName}>{user.name}</Text>
                <Text style={styles.devBio}>{user.bio}</Text>
                <Text style={styles.devTechs}>{user.techs.join(", ")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.serachInput}
          placeholder="Buscar Devs por tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity onPress={fetchUsers} style={styles.formButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#FFF"
  },
  callout: {
    width: 260
  },
  devName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  devBio: {
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  serachInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFF",
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  formButton: {
    width: 50,
    height: 50,
    backgroundColor: "#8e4dff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});
