import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommentsItem from "../components/CommentsItem";
import { use, useEffect, useState } from "react";
import { getPost, addPostComment } from "../utils/posts";
import { useSelector } from "react-redux";

const CommentsScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [post, setPost] = useState(route.params.post);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPost(post.id);
      setPost(fetchedPost);
    };

    fetchPost().catch(console.error);
  }, []);

  const handleSendComment = async () => {
    if (newComment.trim()) {
      const newPost = await addPostComment(post, {
        userId: user.uid,
        text: newComment,
      });
      setPost(newPost);
      setNewComment("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.content}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          {post.comments && (
            <View style={styles.commentsList}>
              {post.comments.map((comment) => (
                <CommentsItem key={comment.id} comment={comment} />
              ))}
            </View>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendComment}
          >
            <Ionicons name="arrow-up" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentsList: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#FF6B00",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
