import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const PostItem = ({ navigation, post }) => {
  return (
    <View style={styles.post}>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={styles.postInfo}>
        <View style={styles.postStats}>
          <TouchableOpacity style={styles.statsItem}>
            <Ionicons name="heart-outline" size={24} color="#BDBDBD" />
            <Text style={styles.statsText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statsItem}
            onPress={() => navigation.navigate("Comments", { post })}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
            <Text style={styles.statsText}>0</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() =>
            navigation.navigate("Map", { post })
          }
        >
          <Ionicons name="location-outline" size={24} color="#BDBDBD" />
          <Text style={styles.locationText}>{post.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  post: {
    marginBottom: 32,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#212121",
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postStats: {
    flexDirection: "row",
    gap: 24,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statsText: {
    fontSize: 16,
    color: "#212121",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});