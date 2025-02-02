import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, FlatList } from "react-native";
import PostItem from "../components/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../utils/posts";

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    try {
      fetchPosts(dispatch);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Image
          source={
            user.photoUrl
              ? { uri: user.photoUrl }
              : require("../../assets/profile-example.jpg")
          }
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.displayName}</Text>
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
