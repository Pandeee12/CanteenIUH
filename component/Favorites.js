import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Favorites = ({ route, navigation }) => {
  const { favorites } = route.params; // Lấy danh sách món ăn yêu thích từ params

  console.log('Favorites:', favorites); // Kiểm tra giá trị của favorites

  const renderFavoriteItem = ({ item }) => (
    <View style={{ marginTop: '5%' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
        <Image 
          source={item.image} 
          style={{ width: '90%', height: 150, borderRadius: 10 }} 
          resizeMode="cover" 
        />
        <View style={{flexDirection: 'row',justifyContent:'space-around'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#A52A2A' }}>{item.price}</Text>
        </View>

      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Favorites</Text>
      {Array.isArray(favorites) && favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={{ fontSize: 18, textAlign: 'center' }}>Không có món ăn yêu thích nào.</Text>
      )}
    </View>
  );
};

export default Favorites;
