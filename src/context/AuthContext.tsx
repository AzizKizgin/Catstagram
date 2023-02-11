import {createContext, useContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthContextProps {
  children: React.ReactNode;
}

interface LoginProps {
  email: string;
  password: string;
  setErrors: (errors: any) => void;
}

interface RegisterProps extends LoginProps {
  userName: string;
}

interface ResetPasswordProps {
  email: string;
  setErrors: (errors: any) => void;
}

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  login: ({email, password, setErrors}: LoginProps) => void;
  logout: (setErrors: (errors: any) => void) => void;
  register: ({email, password, userName, setErrors}: RegisterProps) => void;
  resetPassword: ({email, setErrors}: ResetPasswordProps) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  resetPassword: () => {},
});

export const AuthProvider = ({children}: AuthContextProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const user = auth().currentUser;
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const login = async ({email, password, setErrors}: LoginProps) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const user = response.user;
      setUser(user);
    } catch (error) {
      setErrors(error);
    }
  };

  const logout = async (setErrors: (errors: any) => void) => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      setErrors(error);
    }
  };

  const register = async ({
    email,
    password,
    userName,
    setErrors,
  }: RegisterProps) => {
    try {
      const response = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          userCredential.user.updateProfile({
            displayName: userName,
          });
          auth().currentUser?.reload();
        })
        .then(() => {
          setUser(auth().currentUser);
        });
    } catch (error) {
      setErrors(error);
    }
  };

  const resetPassword = async ({email, setErrors}: ResetPasswordProps) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        resetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
