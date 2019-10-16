import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert, Button } from "react-native";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
const instructions = Platform.select({
 ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
 android:
   "Double tap R on your keyboard to reload,\n" +
   "Shake or press menu button for dev menu"
});
export default class App extends Component {
 async componentDidMount() {
   this._configureGoogleSignIn();
 }
 _configureGoogleSignIn() {
   GoogleSignin.configure({
     scopes: ["https://www.googleapis.com/auth/drive.readonly"],
     webClientId:
       "51768906969-0db0seomaqhqantrm10q7rtifkj5eppc.apps.googleusercontent.com", //Replace with your own client id
     offlineAccess: true,
     hostedDomain: "",
     loginHint: "",
     forceConsentPrompt: true,
     accountName: "",
     iosClientId:
       "XXXXXX-krv1hjXXXXXXp51pisuc1104q5XXXXXXe.apps.googleusercontent.com"
   });
 }
 _signIn = async () => {
   try {
     await GoogleSignin.hasPlayServices();
     const userInfo = await GoogleSignin.signIn();
     await GoogleSignin.revokeAccess();
     console.log(userInfo)
     Alert.alert(userInfo.user.name)
     console.log(userInfo.user.id)
     console.log(userInfo.user.email)
     console.log(userInfo.user.photo) 
   } catch (error) {
     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
       // sign in was cancelled
       Alert.alert("cancelled");
     } else if (error.code === statusCodes.IN_PROGRESS) {
       // operation in progress already
       Alert.alert("in progress");
     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
       Alert.alert("play services not available or outdated");
     } else {
       console.log("Something went wrong:", error.toString());
       Alert.alert("Something went wrong", error.toString());
       this.setState({
         error
       });
     }
   }
 };
 render() {
   return (
     <View style={styles.container}>
       <Button style={styles.welcome} onPress={this._signIn}
       
      title="Google-signin" 
     />
     
    
       <Text style={styles.instructions}>To get started, edit App.js</Text>
       <Text style={styles.instructions}>{instructions}</Text>
     </View>
   );
 }
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "#F5FCFF"
 },
 welcome: {
   fontSize: 20,
   textAlign: "center",
   margin: 10
 },
 instructions: {
   textAlign: "center",
   color: "#333333",
   marginBottom: 5
 }
});