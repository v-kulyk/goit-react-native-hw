import React from "react";
import { View, Text, Button, StyleSheet, Image, FlatList } from "react-native";
import { usePosts } from "../context/PostsContext";
import PostItem from "../components/PostItem";
import { useUser } from "../context/UserContext";

const PostsScreen = ({ navigation }) => {
  const { posts } = usePosts();
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Image
          source={require("../../assets/profile-example.jpg")}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostItem navigation={navigation} post={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userInfo: {
    marginLeft: 8,
  },
  userName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsList: {
    padding: 16,
  },
});
