/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from '@react-native-firebase/app';
import ml from '@react-native-firebase/ml';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,

} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
var firebaseConfig = {
  apiKey: "your_apikey",
  authDomain: "your_authdomain",
  databaseURL: "your_databaseurl",
  projectId: "your_projectid",
  storageBucket: "your_stroage",
  messagingSenderId: "your_id",
  appId: "your_appid"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

 }



  export default class App extends Component{
    //yapıcı metot ve özellikleri
    constructor(props){
      super(props);
      this.state={
        //bulunan nesneler
        liste : [],
        //galeriden cekilen url
        resim:""
      }
    }
    //buluna elemanlar listeye setliyor
    setliste=(item)=>{
      console.log(item.length);
      this.setState({liste:item});
    }
    
    nesnetespiti=()=>{
      
    this.setState({liste:[]});
    var temp=[];
    async function processImage(locadres) {
    
    //resim işleniyor googl vision apide işnliyor
    const labels = await ml().cloudImageLabelerProcessImage(locadres);
    temp.push(
      <Text>Bulunan nesne sayısı= {labels.length}</Text>
    );
   
    labels.forEach(label => {
     temp.push(
     <Text>{label.text}</Text>
      );
    });
    
  
  }
    
  
     // Local path to file on the device  
      const locdosya = this.state.resim;
      processImage(locdosya).then(() => this.setliste(temp)); 
    }

    secilifoto=(image)=>{
      this.setState({resim:image.path})
    }
    kameraAc=()=>{
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        this.secilifoto(image);
      });
    };
    galeriAc=()=>{
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        this.secilifoto(image);
      });
    };  
  render(){
  return (

     <View style={{flex:1, alignItems: 'center', marginTop:50}}>
      <TouchableOpacity style={styles.butonstyle} onPress={this.kameraAc}>
       <Text style={{color:'black'}}>kameradan resim ekle</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.butonstyle} onPress={this.galeriAc}>
       <Text style={{color:'black'}}>galerinde resim ekle</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.butonstyle} onPress={this.nesnetespiti}>
       <Text style={{color:'black'}}>resmi işle</Text>
       </TouchableOpacity>

       
<Image source = {{uri:this.state.resim}}
   style = {{ width: 100, height: 100 }}
   />
    {this.state.liste} 
    <View renderItem={this.nesnetespiti}></View>    

   </View>
  );
}
};

const genis=Dimensions.get('window').width;

const styles = StyleSheet.create({
  content:{
    flex:1,
    alignItems:'center',
    marginTop:55
  },
  butonstyle:{
    backgroundColor: 'pink',
    height:50,
    width:genis-50,
    alignItems:'center',
    justifyContent:'center',
  },
});
