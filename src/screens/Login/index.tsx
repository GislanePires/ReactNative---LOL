import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Animated, Dimensions, TouchableOpacity, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import LoLIcon from "../../assets/LoginIcons/LoLIcon.png"
import gifMf from "../../assets/LoginIcons/gifMf.gif"
import riotLogo from "../../assets/LoginIcons/riotLogo.png"
import classificacao from "../../assets/LoginIcons/classificacao.png"
import LeagueLogo from "../../assets/LoginIcons/logoLeague.png"
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Login({ navigation }) {

  const moveValue = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  useEffect(() => {
    Animated.loop(
      Animated.timing(moveValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      })
    ).start();
  }, [moveValue]);

  const move = moveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, 0]
  });

  const validateEmail = (text) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValid);
    return isValid;
  };

  const validatePassword = (text) => {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(text);
    setIsPasswordValid(isValid);
    return isValid;
  };

  const verifyLogin = async (enteredEmail, enteredPassword) => {
    const storedUser = await AsyncStorage.getItem(`user_${enteredEmail}`);
    if (storedUser !== null) {
      const user = JSON.parse(storedUser);
      if (user.email === enteredEmail && user.password === enteredPassword) {
        return true;
      }
    }
    return false;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      Alert.alert('Erro de Validação', 'Por favor, verifique os campos e tente novamente.');
      return;
    }

    const isLoginValid = await verifyLogin(email, password);
    if (isLoginValid) {
      //armazena o usuário logado no asyncStorage
      await AsyncStorage.setItem('loggedUser', JSON.stringify({ email, password }));
      navigation.navigate("BottomTabRoutes");
    } else {
      Alert.alert('Erro de Login', 'E-mail ou senha incorretos. Por favor, tente novamente.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#091428', '#042a41']}
        style={styles.gradient}
      >
        <Animated.View style={[styles.animatedLine, { height: 2, width, transform: [{ translateY: 0 }, { translateX: move }] }]} />
        <Image source={LoLIcon} style={styles.logoImage} />
        <Text style={styles.text}>BEM VINDO, INVOCADOR</Text>
        <View style={styles.logincontainer}>
          <Text style={styles.text2}>E-mail</Text>
          <TextInput style={styles.textInput} value={email} onChangeText={(text) => setEmail(text)} onBlur={() => validateEmail(email)}></TextInput>
          <Text style={styles.text2}>Senha</Text>
          <TextInput style={styles.textInput} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} onBlur={() => validatePassword(password)}></TextInput>
          <TouchableOpacity style={styles.container}>
            <Text style={styles.text3}>Esqueci minha senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textInputEntrar} onPress={handleLogin}>
            <Text style={styles.textEntrar}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Cadastro")
          }
          }>
            <Text style={styles.text4}>Não possui conta!?</Text>
          </TouchableOpacity>
        </View>
        <Image source={gifMf} style={styles.gifImage} />
        <View style={styles.footer}>
          <Image source={riotLogo} style={styles.riotLogo} />
          <Image source={LeagueLogo} style={styles.riotLogo} />
          <Image source={classificacao} style={styles.riotLogo} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};
