import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (token) {
      navigation.replace("MainStack", { screen: "Main" });
    }
  }, [token, navigation]);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/api/auth/login", user)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        setToken(token);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Login to your account
            </Text>
            <View style={{ marginTop: 50 }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: "gray" }}>
                Email
              </Text>
              <View>
                <TextInput
                  type="text"
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 320,
                    marginTop: 15,
                    borderBottomColor: "#BEBEBE",
                    borderBottomWidth: 1,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: email ? 15 : 15,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "gray",
                  marginTop: 25,
                }}
              >
                Password
              </Text>
              <View>
                <TextInput
                  secureTextEntry={true}
                  type="text"
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 320,
                    marginTop: 15,
                    borderBottomColor: "#BEBEBE",
                    borderBottomWidth: 1,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: password ? 15 : 15,
                  }}
                />
              </View>
            </View>
            <Pressable
              onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: "#4A55A2",
                padding: 15,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: 16,
                  margin: 12,
                }}
              >
                Don't have an account ? Sign Up
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 140, height: 170 }}
              source={{
                uri: "https://signal.org/assets/images/features/Media.png",
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
