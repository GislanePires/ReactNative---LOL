
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({})

function AuthProvider({children}){
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const getLoggedUser = async () => {
      const storedUser = await AsyncStorage.getItem('loggedUser');
      if (storedUser !== null) {
        setLoggedUser(JSON.parse(storedUser));
      }
    };
    getLoggedUser();
  }, []);

  return(
    <AuthContext.Provider value={{ loggedUser }}>
    {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;



// interface AuthContextData {
//     signed: boolean;
//     token: string;
//     user: object;
//   }

// // const AuthContext = createContext({ signed: true });

// export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// export const AuthProvider: React.FC = ({ children }) => (
//     <AuthContext.Provider value={{ signed: false, token: '', user: {} }}>
//       {children}
//     </AuthContext.Provider>
//   );

// export function useAuth() {
//   return useContext(AuthContext);
// }
