import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const PeopleScreen = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Text>PeopleScreen</Text>
    </View>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({});
