import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      image: image,
      password: password,
    };
    axios
      .post("http://localhost:8000/api/auth/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration succesfull",
          "You have benn registerer succesfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Restration error", "Anerror acurred while registering");
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Set up your profile
            </Text>
            <Text
              style={{
                marginTop: 10,
                color: "gray",
                textAlign: "center",
                marginHorizontal: 12,
              }}
            >
              Profiles are visible to your friends and connections and groups
            </Text>
            <Pressable style={{ marginTop: 10 }}>
              <Image
                source={{
                  uri: image
                    ? image
                    : "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 4,
                  color: "gray",
                  fontSize: 12,
                }}
              >
                Add
              </Text>
            </Pressable>
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: "gray" }}>
                Name
              </Text>

              <View>
                <TextInput
                  type="text"
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 320,
                    marginTop: 15,
                    borderBottomColor: "#BEBEBE",
                    borderBottomWidth: 1,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: name ? 15 : 15,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "gray",
                  marginTop: 15,
                }}
              >
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
                  marginTop: 15,
                }}
              >
                Image
              </Text>

              <View>
                <TextInput
                  type="file"
                  onChangeText={setImage}
                  placeholder="Enter your image"
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 320,
                    marginTop: 15,
                    borderBottomColor: "#BEBEBE",
                    borderBottomWidth: 1,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: image ? 15 : 15,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "gray",
                  marginTop: 15,
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
              onPress={handleRegister}
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
                Register
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: 16,
                  margin: 12,
                }}
              >
                You have an account ? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
