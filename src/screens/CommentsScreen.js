import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import CommentsItem from "../components/CommentsItem";

const CommentsScreen = ({ navigation, route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text>Comments</Text>
      {post.comments && (
        <FlatList
          data={post.comments}
          renderItem={({ item }) => (
            <CommentsItem navigation={navigation} comment={item} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.commentsList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    padding: 16,
    backgroundColor: "#fff",
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentsList: {
    gap: 16,
  },
});

export default CommentsScreen;
