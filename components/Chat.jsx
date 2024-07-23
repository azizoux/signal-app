import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";

const Chat = ({ item }) => {
  const navigation = useNavigation();
  const { userId } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatRoom", {
          name: item.name,
          receiverId: item._id,
          image: item.image,
        })
      }
      style={{ marginVertical: 15 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable>
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </Pressable>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>{item.name}</Text>
          <Text style={{ marginTop: 4, color: "gray" }}>
            chat with {item.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Chat;

const styles = StyleSheet.create({});
