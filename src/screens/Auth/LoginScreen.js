import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../../firebase';
import { useColorScheme } from "react-native-appearance";
import Env from '../../env.json'

//const api_test = true;

const LoginScreen = ({route, navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redoInfo, setRedoInfo] = useState(false);
    const [msg_error, setmsg_error] = useState('Incorrect information');
    const scheme = useColorScheme();

    const bool_isDarkMode = () => {
        return scheme === "dark";
    }
    const brandTextColor = () => {
        return bool_isDarkMode() ? Env.brandText_Dark:Env.brandText_Light;
    }

    const firebaseSignIn = () =>{
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User signed in!');
            setRedoInfo(false);
          })
          .catch(error => {
            handleError(error)
          });
    }
    const handleError = (e) => {
        setRedoInfo(true);//console.log(e);
        e.message ? setmsg_error(e.message):setmsg_error(JSON.stringify(e));
    }

    return (
        <ImageBackground source={require('../../assets/bg/bg.png')} style={[styles.container,{width:"100%",height:"100%"}]}>
            <StatusBar style="auto"/>
            <View style={{alignItems: 'center', justifyContent: 'center',}}>
                <View>
                    <Image
                        source={require('../../assets/icon_rounded.png')}
                        style={{width:40,height:40,marginBottom:5,marginTop:80,}}
                    />
                </View>
                <Text style={{color:"#FFFFFF",fontSize:24,fontWeight:"bold",textShadowColor:brandTextColor(),textShadowOffset:{width: 1, height: 1},textShadowRadius:6,marginBottom:40}}>Welcome to CoinTracer</Text>
                <View style={{width:300, alignItems:"center"}}>
                    {redoInfo && (<View style={{backgroundColor: 'rgba(0,0,0,0.5)',borderWidth:1,borderColor:"#FDD7D8",borderRadius:5,padding:5,marginBottom:10}}>
                        <Text style={{color:"#ffffff",fontSize:15,fontWeight:"700"}}>{msg_error}</Text>
                    </View>)}
                    <TextInput
                        style={[styles.input,{backgroundColor: 'rgba(0,0,0,0.25)'}]}
                        autoFocus={true}
                        placeholder="Email"
                        placeholderTextColor={"#CCCCCC"}
                        value={email}
                        onChangeText={setEmail}
                        maxLength = {32}
                    />
                    <TextInput
                        style={[styles.input,{backgroundColor: 'rgba(0,0,0,0.25)'}]}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor={"#CCCCCC"}
                        value={password}
                        onChangeText={setPassword} onSubmitEditing={firebaseSignIn}
                        maxLength = {64}
                    />
                </View>
                {/*(api_test) && (<View style={styles.btn}>
                    <Button buttonStyle={{backgroundColor:"#1e80c7",borderRadius:5}} titleStyle={{color: "#ffffff", fontSize: 16, fontWeight:"bold"}} title="API test (dev only)" onPress={()=>navigation.navigate('Test')}/>
                </View>)*/}
                <View style={styles.btn}>
                    <Button buttonStyle={{backgroundColor:"#FFFFFF",borderRadius:5}} titleStyle={{color: "#4784ff", fontSize: 18, fontWeight:"bold"}} title="sign in" onPress={firebaseSignIn}/>
                </View>
                <View style={styles.btn}>
                    <Button buttonStyle={{backgroundColor:"#5d9cd4",borderRadius:5}} titleStyle={{color: "#ffffff", fontSize: 19, fontWeight:"bold"}} title="new ID" onPress={()=>navigation.navigate('Approval')}/>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('PW')}>
                  <Text style={{color:"#FFFFFF",fontSize:16,fontWeight:"600",textShadowColor:brandTextColor(),textShadowOffset:{width: 1, height: 1},textShadowRadius:4,marginTop:20, alignSelf:"center"}}>Need help ?</Text>
                </TouchableOpacity>
                <View style={{alignItems:"center",marginTop:50}}>
                    <Text style={{color:"#FFFFFF",fontSize:14,fontWeight:"600",textShadowColor:brandTextColor(),textShadowOffset:{width: 1, height: 1},textShadowRadius:4,marginTop:20}}>© 2021 | Developed by Andy Lee</Text>
                    <Text style={{color:"#FFFFFF",fontSize:14,fontWeight:"600",textShadowColor:brandTextColor(),textShadowOffset:{width: 1, height: 1},textShadowRadius:4,marginTop:10}}>{Env.currentVersion}</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    input: {
        paddingHorizontal: 10,
        height: 40,
        width: 300,
        margin: 12,
        borderRadius: 10,
        fontSize:20,
        color: "#FFFFFF",
    },
    btn: {
        marginBottom: 10,
        marginTop: 5,
        width:160,
        height:40,
    }
})
