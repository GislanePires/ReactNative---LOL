import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { AuthContext } from "../../contexts/auth";

export default function Register({navigation}) {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isNameValid, setIsNameValid] = useState(true);
   const [isEmailValid, setIsEmailValid] = useState(true);
   const [isPasswordValid, setIsPasswordValid] = useState(true);

   const validateName = (text) => {
       const isValid = text.trim().length > 0;
       setIsNameValid(isValid);
       return isValid;
   };

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

   const handleRegister = async () => {
       const isNameValid = validateName(name);
       const isEmailValid = validateEmail(email);
       const isPasswordValid = validatePassword(password);

       if (!isNameValid || !isEmailValid || !isPasswordValid) {
           Alert.alert('Erro de Validação', 'Por favor, verifique os campos e tente novamente.');
           return;
       }

       const keys = await AsyncStorage.getAllKeys();
       if (keys.includes(`user_${email}`)) {
           Alert.alert('Email Já Registrado', 'Este endereço de e-mail já está registrado. Por favor, use um e-mail diferente.');
           return;
       }

       const registrationKey = `user_${email}`;
       await AsyncStorage.setItem(registrationKey, JSON.stringify({ name, email, password }));
       Alert.alert('Registro Bem-Sucedido', 'Você foi registrado com sucesso!');
       console.log('Registro de usuário ok');
       navigation.navigate("Login");
   };
   return (
       <View style={styles.container}>
        
           <Text style={styles.title}>Registrar</Text>
           <TextInput
               style={[styles.input, !isNameValid && styles.invalidInput]}
               placeholder="Nome"
               value={name}
               onChangeText={(text) => setName(text)}
               onBlur={() => validateName(name)}
           />
           {!isNameValid && <Text style={styles.statusText}>Nome é obrigatório</Text>}

           <TextInput
               style={[styles.input, !isEmailValid && styles.invalidInput]}
               placeholder="E-mail"
               keyboardType="email-address"
               value={email}
               onChangeText={(text) => setEmail(text)}
               onBlur={() => validateEmail(email)}
           />
           {!isEmailValid && <Text style={styles.statusText}>Insira um endereço de e-mail válido</Text>}

           <TextInput
               style={[styles.input, !isPasswordValid && styles.invalidInput]}
               placeholder="Senha"
               secureTextEntry={true}
               value={password}
               onChangeText={(text) => setPassword(text)}
               onBlur={() => validatePassword(password)}
           />
           {!isPasswordValid && (
               <Text style={styles.statusText}>
                  A senha deve ter pelo menos 6 caracteres, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula
               </Text>
           )}

           <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
               <Text style={styles.buttonText}>Registrar</Text>
           </TouchableOpacity>
       </View>
   );
}
