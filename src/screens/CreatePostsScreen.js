import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { usePosts } from "../context/PostsContext";
import { useUser } from "../context/UserContext";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [location, setLocation] = useState("");
  const { createPost } = usePosts();
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      // Request camera permissions
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      // Request media library permissions
      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
      // Request location permissions
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();

      setHasPermission(
        cameraStatus === "granted" &&
          mediaStatus === "granted" &&
          locationStatus === "granted"
      );
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        setPhoto(photo.uri);

        // Save to media library
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      } catch (error) {
        console.log("Error taking photo:", error);
      }
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.log("Error getting location:", error);
    }

    return null;
  };

  const handlePublish = async () => {
    const coordinates = await getCurrentLocation();

    // Create post object with all data
    const post = {
      image: photo,
      name: photoName,
      location: location,
      coordinates: coordinates,
      timestamp: new Date().toISOString(),
      userId: user.id,
    };

    createPost(post);

    navigation.navigate("Posts");
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera or location</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        {!photo ? (
          <CameraView
            ref={(ref) => setCameraRef(ref)}
            style={styles.camera}
            facing={facing}
          >
            <View style={styles.photoView}>
              <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
                <Ionicons name="camera-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          <Image source={{ uri: photo }} style={styles.photo} />
        )}
      </View>

      <Text style={styles.photoText}>
        {!photo ? "Завантажте фото" : "Редагувати фото"}
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
          value={photoName}
          onChangeText={setPhotoName}
        />

        <View style={styles.locationInputContainer}>
          <Ionicons
            name="location-outline"
            size={24}
            color="#BDBDBD"
            style={styles.locationIcon}
          />
          <TextInput
            style={styles.locationInput}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.publishButton,
            (!photo || !photoName || !location) && styles.disabledButton,
          ]}
          onPress={handlePublish}
          disabled={!photo || !photoName || !location}
        >
          <Text
            style={[
              styles.publishButtonText,
              (!photo || !photoName || !location) && styles.disabledButtonText,
            ]}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setPhoto(null);
          setPhotoName("");
          setLocation("");
        }}
      >
        <Ionicons name="trash-outline" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  photoContainer: {
    height: 240,
    backgroundColor: "#E8E8E8",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  camera: {
    flex: 1,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    flex: 1,
    resizeMode: "cover",
  },
  photoText: {
    color: "#BDBDBD",
    fontSize: 16,
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    marginRight: 4,
  },
  locationInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  publishButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginTop: 32,
  },
  publishButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#F6F6F6",
  },
  disabledButtonText: {
    color: "#BDBDBD",
  },
  deleteButton: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    alignSelf: "center",
  },
});
