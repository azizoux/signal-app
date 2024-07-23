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
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

import { useSocketContext } from "../SocketContext";

const ChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { token, setToken, userId, setUserId } = useContext(AuthContext);
  const route = useRoute();
  const socket = useSocketContext();
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
  const sendMessage = async (senderId, receiverId) => {
    if (message === "" || message === null) return;
    try {
      response = await axios.post("http://localhost:8000/api/sendMessage", {
        senderId,
        receiverId,
        message,
      });
      socket.emit("sendMessage", { senderId, receiverId, message });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/messages/get-message",
        {
          params: {
            senderId: userId,
            receiverId: route.params.receiverId,
          },
        }
      );
      if (response.status === 200) {
        setMessages(response.data);
      } else throw Error("Error fetching messages...");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  const listeMessages = () => {
    const { socket } = useSocketContext();

    useEffect(() => {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shoulsShake = true;
        setMessages([...messages, newMessage]);
      });
      return () => socket?.off("newMessage");
    }, [socket, messages, setMessages]);
  };
  listeMessages();
  //   console.log(messages);
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("fr-FR", options);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {messages &&
          messages.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={[
                  item.senderId._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        margin: 10,
                        borderRadius: 7,
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "#f1f1f1",
                        padding: 8,
                        maxWidth: "60%",
                        margin: 10,
                        borderRadius: 7,
                      },
                ]}
              >
                <Text style={{ fontSize: 14, textAlign: "left" }}>
                  {item.content}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    fontSize: 10,
                    color: "gray",
                    marginTop: 4,
                  }}
                >
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          })}
      </ScrollView>
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
          onPress={() => sendMessage(userId, route.params.receiverId)}
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

export default ChatRoom;

const styles = StyleSheet.create({});
