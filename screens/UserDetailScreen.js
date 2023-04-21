import React, { Component } from "react";
import { StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    TextInput,
    Image,
    FlatList,
    ScrollView,
    contentContainerStyle, } from "react-native";

class UserDetailScreen extends Component {
  constructor() {
    super();
  }
  render() {
    const { data } = this.props.route.params;
    return (
        <ScrollView style={styles.contener}>
          <View>
            <Image
                                style={styles.tinyLogo}
                                source={{
                                  uri: data.image,
                                }}
                              />
              <Text>title : {data.title}</Text>
              <Text>description :{data.description}</Text>
              <Text>category :{data.category}</Text>
              <Text style={{fontSize:20,fontWeight:"bold"}}>price : {data.price}</Text>
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contener: {
    flex: 1,
    padding: 35,
  },
  preloader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    textAlign:"center",
    width: "100%",
    height: 500,
  },
});
export default UserDetailScreen;
