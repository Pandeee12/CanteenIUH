import { AntDesign, Entypo, EvilIcons, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, Image, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window'); // Lấy chiều rộng và chiều cao màn hình

const Home = () => {
  const navigation = useNavigation(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [foodImages, setFoodImages] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [randomItems, setRandomItems] = useState([]);
  const [foodDataItems, setFoodDataItems] = useState([]);



  const flatListRef = useRef(null); // Tạo tham chiếu đến FlatList

  const handleCartPress = () => {
    navigation.navigate('Cart', { cartItems }); // Điều hướng đến trang giỏ hàng
  };

  const navigateToDetails = (item) => {
    navigation.navigate('Details', { item, randomItems, favorites, setCartItems,cartItems,foodDataItems,setRandomItems });
  };
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/foods?limit=20');
        const data = await response.json();

  
        // Kiểm tra xem fooddata có tồn tại không
        if (data && data.data && Array.isArray(data.data.foods)) {
          const fooddata = data.data.foods; 
          setFoodDataItems(fooddata);
          setFoodItems(fooddata.slice(0, 20));
          // setFoodImages(fooddata.slice(0, 5).map(item => item.image));
          setFoodImages(fooddata.sort(() => 0.5 - Math.random()).slice(0, 5)); 
          setRandomItems(fooddata.sort(() => 0.5 - Math.random()).slice(0, 8)); // Get 8 random items

          // .filter(food => food.id !== item.id) // Loại bỏ món ăn đã được chọn
          // .sort(() => 0.5 - Math.random()) // Xáo trộn danh sách
          // .slice(0, 8); // Lấy 8 món ăn ngẫu nhiên
        } else {
          console.error('Food data is undefined or not an array:', data.data.foods);
        }
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
  console.log("Random Items:", randomItems);

}, [randomItems]); // Theo dõi khi randomfoodItems thay đổi
  
  

  // Tự động chuyển hình ảnh mỗi 5 giây
  useEffect(() => {
    if (foodImages.length > 0) { // Kiểm tra nếu có hình ảnh
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % foodImages.length;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      }, 5000); // 5 giây

      return () => clearInterval(interval); // Xóa bộ đếm thời gian khi component bị hủy
    }
  }, [currentIndex, foodImages]); // Thêm foodImages vào dependency

  // Hàm xử lý khi nhấn vào các chấm
  const handleDotPress = (index) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true }); // Cuộn đến hình ảnh tương ứng
  };

  // Hàm render từng hình ảnh
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <Image 
        source={{ uri: item.image }}
        style={{ 
          width: width * 0.9,
          height: height * 0.25,
          marginHorizontal: width * 0.05,
          borderRadius: 10,
        }} 
        resizeMode="cover" 
      />
    </TouchableOpacity>
  );

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
        if (prevFavorites.includes(item)) {
            Toast.show({
                text1: 'Removed from Favorites',
                text2: `${item.name} has been removed from your favorites.`,
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
            });
            return prevFavorites.filter(fav => fav !== item); // Xóa món ăn khỏi danh sách yêu thích
        } else {
            Toast.show({
                text1: 'Added to Favorites',
                text2: `${item.name} has been added to your favorites!`,
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
            });
            return [...prevFavorites, item]; // Thêm món ăn vào danh sách yêu thích
        }
    });
};


  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]); // Thêm món ăn vào giỏ hàng
    setAddedToCart((prev) => ({ ...prev, [item.name]: true })); // Đánh dấu món ăn đã được thêm
    Toast.show({
      text1: 'Added to Cart',
      text2: `${item.name} has been added to your cart!`,
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
    });
  };
  
  const renderFoodItem = (item) => {
    return (
      <View style={{ marginTop: '5%', paddingHorizontal: '5%' }}>
        <TouchableOpacity onPress={() => navigateToDetails(item)}>
          <Image 
            source={{ uri: item.image }} 
            style={{ width: width * 0.9, height: width * 0.4, borderRadius: 15 }} 
            resizeMode="cover" 
          />
          <View style={{ paddingVertical: 5 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ textDecorationLine: 'line-through', fontSize: 18, color: '#888', marginRight: 5 }}>
                  {item.oldprice}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#A52A2A' }}>{item.price}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.Evaluate}</Text>
                <AntDesign name='star' color='yellow' size={20} /> */}
                  <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <AntDesign 
                  name={favorites.includes(item) ? 'heart' : 'hearto'} 
                  color={favorites.includes(item) ? 'red' : 'grey'} 
                  size={24} 
                  style={{ marginRight: 15 }} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addToCart(item)}>
                <AntDesign 
                  name='shoppingcart' 
                  size={24} 
                  color={addedToCart[item.name] ? 'green' : 'black'} 
                />
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 ,paddingBottom: 88}}>
        {/* Phần đầu */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16, width: width }}>
          <TouchableOpacity>
            <Image source={require('../assets/logo_canteen.png')} style={{ width: width * 0.25, height: width * 0.25 }} />
          </TouchableOpacity>
          <TextInput 
            style={{ width: '55%', height: width * 0.15, backgroundColor: '#ADD8E6', borderRadius: 8 }} 
            placeholder="What do u want?" 
            right={<TextInput.Icon icon={() => (
              <TouchableOpacity onPress={() => console.log('Icon pressed!')}>
                <AntDesign name="search1" size={24} color="black" />
              </TouchableOpacity>
            )}/>} 
          />
          <TouchableOpacity onPress={handleCartPress}>
            <AntDesign name='shoppingcart' size={28} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
  
        {/* Thanh trượt hình ảnh */}
        <FlatList
          data={foodImages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false} 
          ref={flatListRef} 
          getItemLayout={(data, index) => ({ length: width * 0.9 + width * 0.1, offset: (width * 0.9 + width * 0.1) * index, index })}
        />

        {/* Chấm điều hướng */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -30 }}>
          {foodImages.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={{
                height: 18,
                width: 18,
                borderRadius: 9,
                backgroundColor: currentIndex === index ? '#A52A2A' : '#ccc',
                marginHorizontal: 6,
              }}
              onPress={() => handleDotPress(index)} 
            />
          ))}
        </View>
         {/* Menu */}
         <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: '5%', marginTop: '2%' }}>Menu</Text>
          <ScrollView horizontal style={{ marginTop: '2%', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', paddingLeft: '5%' }}>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => console.log('All pressed')}>
                <MaterialIcons name='fastfood' size={36} color='#A52A2A' />
                <Text style={{ fontSize: 18, fontWeight: '400' }}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => console.log('Breakfast pressed')}>
                <MaterialCommunityIcons name='noodles' size={36} color='#A52A2A' />
                <Text style={{ fontSize: 18, fontWeight: '400' }}>Breakfast</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => console.log('Lunch pressed')}>
                <MaterialCommunityIcons name='rice' size={36} color='#A52A2A' />
                <Text style={{ fontSize: 18, fontWeight: '400' }}>Lunch</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => console.log('Dinner pressed')}>
                <MaterialIcons name='dinner-dining' size={36} color='#A52A2A' />
                <Text style={{ fontSize: 18, fontWeight: '400' }}>Dinner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => console.log('Fast food pressed')}>
                <FontAwesome5 name='hamburger' size={33} color='#A52A2A' />
                <Text style={{ fontSize: 18, fontWeight: '400' }}>Fast food</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => console.log('Dessert pressed')}>
                <MaterialCommunityIcons name='cake' size={33} color='#A52A2A' />
                <Text style={{ fontSize: 18, fontWeight: '400' }}>Dessert</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} onPress={() => console.log('Drink pressed')}>
                <Entypo name='drink' size={33} color='#A52A2A' />
                <Text style={{ fontSize: 18, fontWeight: '400' }}>Drink</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />

        {/* Recommended */}
        <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: '5%', marginTop: '2%' }}>Recommended</Text>
          {foodItems.map((item, index) => renderFoodItem(item))}
        </View>
      </ScrollView>

      {/* Footer Menu */}
      <View style={{ 
        backgroundColor: '#f8f8f8', 
        paddingVertical: 10, 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        borderTopWidth: 1, 
        borderTopColor: '#ccc'
      }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
                    <MaterialCommunityIcons name='silverware-fork-knife' size={30} color='#A52A2A'
                    onPress={() => navigation.navigate('Favorites', { favorites })}></MaterialCommunityIcons>
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }} >
                    <AntDesign name='home' size={28} color='#A52A2A' />
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
                    <EvilIcons name='bell' size={30} color='#A52A2A' />
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
                    <AntDesign name='user' size={28} color='#A52A2A' />
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>Profile</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ alignItems: 'center' }}>
                    <AntDesign name='setting' size={28} color='#A52A2A' />
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>Setting</Text>
                </TouchableOpacity> */}
          </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} /> {/* Đặt ref cho Toast */}

    </View>
  );
};

export default Home;