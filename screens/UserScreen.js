import React, { Component } from "react";
import { 
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  contentContainerStyle,
  Alert, } from 'react-native';

  
class UserScreen extends Component {
 
  constructor(props) {
    super();
    this.state = {
      data: [],
      filteredData: [],
      searchTerm: '',
      sortAscending: true
    };
  }
  componentDidMount() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(json => {
      this.setState({ data: json, filteredData: json });
    })
    .catch(error => console.error(error));
  }
  handleSearchTermChange = searchTerm => {
    const { data } = this.state;
    const filteredData = data.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ filteredData, searchTerm });
  };

  handleSortToggle = () => {
    const { filteredData, sortAscending } = this.state;
    const sortedData = [...filteredData].sort((a, b) =>
      sortAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    this.setState({ filteredData: sortedData, sortAscending: !sortAscending });
  };
  render() {
    const { filteredData, searchTerm, sortAscending } = this.state;
    return (
      <SafeAreaView>
        <ScrollView >
        <View style={{ padding: 20 }}>
              <TextInput
                placeholder="Search"
                value={searchTerm}
                onChangeText={this.handleSearchTermChange}
              />
              <Button title={`Sort ${sortAscending ? 'Descending' : 'Ascending'}`} onPress={this.handleSortToggle} />
                    {filteredData.map(item => (
                      <View key={item.id} style={styles.box} >
                          <View style={styles.row} >
                              <View>
                              <Image
                                style={styles.tinyLogo}
                                source={{
                                  uri: item.image,
                                }}
                              />
                              </View>
                              <View  style={styles.col}>
                              <Text style={styles.text}> {item.title}</Text>
                            </View>
                        </View>
                        <Button  title="view" onPress={() => this.props.navigation.navigate("UserDetailScreen",{  data: item })}/>
                      </View>
                    ))}
        </View>
      </ScrollView>
    </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  col:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    flexWrap: 'wrap',
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  tinyLogo: {
    textAlign:"center",
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
  box: {
    backgroundColor: 'beige',
    borderWidth: 1,
    borderRadius:5,
    margin:10
  },
});

export default UserScreen;
