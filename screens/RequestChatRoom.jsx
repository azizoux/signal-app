import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const RequestChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const { token, setToken, userId, setUserId } = useContext(AuthContext);
  const route = useRoute();
  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <View>
            <Text>{route.params.name}</Text>
          </View>
        </View>
      ),
    });
  }, []);
  const sendMessage = async () => {
    try {
      const userData = {
        senderId: userId,
        receiverId: route.params.receiverId,
        message,
      };
      const response = await axios.post(
        "http://localhost:8000/api/users/send-request",
        userData
      );
      if (response.status == 200) {
        setMessage("");
        Alert.alert(
          "Your request has been shared",
          "wait for the user to accept your request"
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView></ScrollView>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: 20,
          gap: 10,
        }}
      >
        <Entypo name="emoji-happy" size={24} color="gray" />
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="type your message..."
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginHorizontal: 8,
          }}
        >
          <Entypo name="camera" size={24} color="gray" />
          <Feather name="mic" size={24} color="gray" />
        </View>
        <Pressable
          onPress={sendMessage}
          style={{
            backgroundColor: "#0066b2",
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RequestChatRoom;

const styles = StyleSheet.create({});
