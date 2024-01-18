
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from "./../../contexts/auth";

export default function Header() {
  const { loggedUser } = useContext(AuthContext)

  
    return (
      <View>
      <Text>Header</Text>
      <Text>Olá, {loggedUser.email}</Text>
      
    </View>
    );
  }
  
  