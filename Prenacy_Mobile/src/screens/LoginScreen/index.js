import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hàm xử lý khi nhấn nút "Login"
  const handleLogin = () => {
    // Giả lập đăng nhập thành công
    if (email === "123" && password === "123") {
      navigation.replace("HomeTabs"); // Điều hướng sang HomeScreen
    } else {
      alert("Email or password is incorrect!");
    }
  };

  // Hàm xử lý khi nhấn "Sign In"
  const handleSignUp = () => {
    // TODO: Điều hướng sang màn hình đăng ký
    console.log("Đi đến màn hình Đăng ký");
  };

  // Hàm xử lý khi nhấn "Forgot password?"
  const handleForgotPassword = () => {
    // TODO: Điều hướng sang màn hình Quên mật khẩu
    console.log("Đi đến màn hình Quên mật khẩu");
  };

  // Hàm xử lý khi nhấn "sign in with Google"
  const handleGoogleSignIn = () => {
    // TODO: Tích hợp đăng nhập Google
    console.log("Đăng nhập với Google");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/LoginLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <CustomTextInput
          placeholder="Enter here..."
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <CustomTextInput
            style={[{ flex: 1 }]}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {/* Icon mắt để ẩn/hiện password (nếu muốn) */}
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text
              style={[styles.signUpText, { color: "#615EFC", marginLeft: 5 }]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
        >
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40, // Tùy ý
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#615EFC",
  },
  formContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#615EFC",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#615EFC",
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signUpText: {
    fontSize: 14,
    color: "#333",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },
  orText: {
    marginHorizontal: 8,
    color: "#999",
  },
  googleButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
  },
});
