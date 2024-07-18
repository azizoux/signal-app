import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigation } from "@react-navigation/native";
import "core-js/stable/atob";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ChatScreen = () => {
  const [options, setOptions] = useState("Chats");
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  const { token, setToken, setUserId, userId } = useContext(AuthContext);
  const navigation = useNavigation();
  const chooseOption = (option) => {
    if (options.includes(option)) {
      setOptions(options.filter((c) => c !== option));
    } else {
      setOptions(...options, option);
    }
  };
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setToken("");
      navigation.replace("Login");
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      getRequests();
    }
  }, [userId]);
  const getRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/get-request/${userId}`
      );
      setRequests(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log(requests);
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={logout}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://yt3.ggpht.com/yti/ANjgQV9w1WJoF72b-8Z86UKSGWRnX2sJBWh0yoGtvIw8gry5818=s88-c-k-c0x00ffffff-no-rj",
            }}
          />
        </Pressable>

        <Text style={{ fontWeight: 600, fontSize: 16 }}>Chats</Text>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AntDesign name="camerao" size={26} color="black" />
            <Ionicons
              onPress={() => navigation.navigate("People")}
              name="person-outline"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Pressable
          onPress={() => chooseOption("Chats")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text>Chats</Text>
          </View>
          <Entypo name="chevron-small-down" size={24} color="black" />
        </Pressable>
        <View>
          {options.includes("Chats") &&
            (chats.length > 0 ? (
              <View></View>
            ) : (
              <View
                style={{
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ textAlign: "center", color: "gray" }}>
                    No Chats yet
                  </Text>
                  <Text style={{ marginTop: 4, color: "gray" }}>
                    Get started by messaging a friend
                  </Text>
                </View>
              </View>
            ))}
        </View>
        <Pressable
          onPress={() => chooseOption("Requests")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text>Requests</Text>
          </View>
          <Entypo name="chevron-small-down" size={24} color="black" />
        </Pressable>
        <View style={{ marginVertical: 12 }}>
          {options.includes("Requests") && (
            <View>
              <Text>Checkout all the requests</Text>
              {requests.map((item, index) => (
                <Pressable></Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
