import * as React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            buttonState: "normal",
            scannedData: "",
        }
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "normal",
        })
    }

    getCameraPermissions=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
       this.setState({
            /* status==="granted" is True when user has granted permissions
            status==="granted" is False when user has not granted permissions */
            hasCameraPermissions: status==="granted",
            buttonState: "clicked",
            scanned: false,            
       })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState==="clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned ?undefined :this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
            )
        }
        else if (buttonState==="normal"){
            return(
                <View style={styles.container}>
                    <Text style={styles.displayText}>
                        {hasCameraPermissions===true
                        ? this.state.scannedData
                        : "Request Camera Permissions"}
                    </Text>
                    <TouchableOpacity style={styles.scanButton} 
                    onPress={this.getCameraPermissions}>
                        <Text>SCAN QR CODE</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({
    scanButton: {
        backgroundColor: "#2196f3",
        padding: 10,
        margin: 10,
    },
    displayText: {
        fontSize:15,
        textDecorationLine: "underline",
    },
    container: {
        flex: 1,
         justifyContent: "center", 
         alignItems: "center"
    }
})