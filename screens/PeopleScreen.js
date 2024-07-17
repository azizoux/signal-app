import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import User from "../components/User";
import { useNavigation } from "@react-navigation/native";

const PeopleScreen = () => {
  const [users, setUsers] = useState([]);
  const { token, userId } = useContext(AuthContext);
  const navigation = useNavigation();
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/get-users/${userId}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            fontWeight: "500",
            marginTop: 12,
          }}
        >
          People using signal
        </Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => <User key={item._id} item={item} />}
      />
    </SafeAreaView>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({});
