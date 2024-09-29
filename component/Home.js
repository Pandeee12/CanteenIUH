import { AntDesign, Entypo, EvilIcons, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { Text, ScrollView, Image, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Cart from './Cart.js'
import Toast from 'react-native-toast-message';


const foodImages = [
  require('../assets/Steak.jpg'),
  require('../assets/Pizza.jpg'),
  require('../assets/crackBurger.jpg'),
  require('../assets/cream.jpg'),
  require('../assets/Ramen.jpg'),
];

const foodItems = [
    {
      image: require('../assets/crackBurger.jpg'),
      title: 'Healthy chicken protein burger',
      oldprice: '45.000 đ',
      price: '30.000 đ',
      description: '390 kcal',
      Evaluate: 5,
      quantity: 10,
    },
    {
      image: require('../assets/Pho.jpg'),
      title: 'Pho Hehehehehe',
      oldprice: '45.000 đ',
      price: '30.000 đ',
      description: '666 kcal',
      Evaluate: 5,
      quantity: 10,

    },
    {
      image: require('../assets/roll.jpg'),
      title: 'Vietnamese Rice Paper Rolls',
      oldprice: '45.000 đ',
      price: '30.000 đ',
      description: '333 kcal',
      Evaluate: 5,
      quantity: 10,

    }
  ];
  

const { width, height } = Dimensions.get('window'); // Lấy chiều rộng và chiều cao màn hình

const Home = () => {
  const navigation = useNavigation(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  const flatListRef = useRef(null); // Tạo tham chiếu đến FlatList

  const handleCartPress = () => {
    navigation.navigate('Cart', { cartItems }); // Điều hướng đến trang giỏ hàng
  };

  // Tự động chuyển hình ảnh mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % foodImages.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 5000); // 5 giây

    return () => clearInterval(interval); // Xóa bộ đếm thời gian khi component bị hủy
  }, [currentIndex]);

  // Hàm xử lý khi nhấn vào các chấm
  const handleDotPress = (index) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true }); // Cuộn đến hình ảnh tương ứng
  };

  // Hàm render từng hình ảnh
  const renderItem = ({ item }) => (
    <TouchableOpacity>
    <Image 
      source={item} 
      style={{ 
        width: width * 0.9, // Giảm chiều rộng hình ảnh xuống 90%
        height: height * 0.25, // Chiều cao hình ảnh bằng 25% chiều cao màn hình
        marginHorizontal: width * 0.05, // Margin 5% mỗi bên
        borderRadius: 10, // Bo góc cho hình ảnh
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
                text2: `${item.title} has been removed from your favorites.`,
                position: 'bottom',
                visibilityTime: 2000,
                autoHide: true,
            });
            return prevFavorites.filter(fav => fav !== item); // Xóa món ăn khỏi danh sách yêu thích
        } else {
            Toast.show({
                text1: 'Added to Favorites',
                text2: `${item.title} has been added to your favorites!`,
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
    setAddedToCart((prev) => ({ ...prev, [item.title]: true })); // Đánh dấu món ăn đã được thêm
    Toast.show({
      text1: 'Added to Cart',
      text2: `${item.title} has been added to your cart!`,
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
    });
  };
  
  const renderFoodItem = (item) => (
    <View style={{ marginTop: '5%' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { item, favorites, setCartItems })}>
        <Image 
          source={item.image} 
          style={{ width: width * 0.9, height: width * 0.36, marginHorizontal: width * 0.05, borderRadius: 10 }} 
          resizeMode="cover" 
        />
        <View style={{ paddingLeft: '5%' ,justifyContent:'center'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: '5%' }}>{item.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: '5%' ,justifyContent:'center'}}>
          <Text style={{ textDecorationLine: 'line-through', fontSize: 18, fontWeight: 400, marginRight: '5%' }}>
            {item.oldprice}
          </Text>
          <Text style={{ marginLeft: '5%', fontWeight: 'bold', fontSize: 18 }}>{item.price}</Text>
          <View style={{ flexDirection: 'row', paddingLeft: '5%' ,justifyContent:'center'}}>
            <Text style={{ marginLeft: '5%', fontWeight: 'bold', fontSize: 18 }}>{item.Evaluate}</Text>
            <AntDesign name='star' color='yellow' size={24}></AntDesign>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(item)}>
            <AntDesign 
              name={favorites.includes(item) ? 'heart' : 'hearto'} 
              color={favorites.includes(item) ? 'red' : 'grey'} 
              size={24} 
              style={{ marginLeft: 8 }} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <AntDesign 
              name='shoppingcart' 
              size={24} 
              style={{ marginLeft: 8, color: addedToCart[item.title] ? 'green' : 'black' }} // Đổi màu khi đã thêm vào giỏ hàng
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 ,paddingBottom: 88}}>
        {/* Phần đầu, thay đổi chiều rộng và chiều cao theo chiều rộng màn hình */}
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
            <AntDesign name='shoppingcart' size={28} style={{ marginLeft: 8 }}/>
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
          scrollEnabled={false} // Vô hiệu hóa cuộn tay vì tự động chuyển
          ref={flatListRef} // Đặt tham chiếu cho FlatList
          getItemLayout={(data, index) => ({ length: width * 0.9 + width * 0.1, offset: (width * 0.9 + width * 0.1) * index, index })} // Cải thiện hiệu suất cuộn
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
                backgroundColor: currentIndex === index ? '#A52A2A' : '#ccc', // Chấm đang hoạt động có màu đậm hơn
                marginHorizontal: 6,
              }}
              onPress={() => handleDotPress(index)} // Chuyển hình ảnh khi chạm vào chấm
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
