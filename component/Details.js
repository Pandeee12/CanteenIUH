import { AntDesign, MaterialCommunityIcons, EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import {showToast} from './Toast.js'
import Toast from 'react-native-toast-message';


const Details = ({ route }) => {
    const navigation = useNavigation();
    const { item, randomItems: initialRandomItems, favorites: initialFavorites, setCartItems,cartItems,foodDataItems,setRandomItems } = route.params;
    const [favorites, setFavorites] = useState(initialFavorites);
    const [addedToCart, setAddedToCart] = useState({});
    const [randomItems, setRandomItemsState] = useState(initialRandomItems);
    const [randomList,setRandomList] = useState({});


    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]); // Thêm món ăn vào giỏ hàng
        setAddedToCart((prev) => ({ ...prev, [item.name]: true })); // Đánh dấu món ăn đã được thêm
        showToast({
            title: 'Added to Cart',
            body: `${item.name} has been added to your cart!`
        });
      };

      useEffect(() => {
        if (foodDataItems && foodDataItems.length > 0) {
            console.log("Food data:", foodDataItems); 
            const randomItems = foodDataItems.sort(() => 0.5 - Math.random()).slice(0, 8);
            setRandomItemsState(randomItems); 
        } else {
            console.log("Food data is not available or empty");
        }
    }, [foodDataItems]); 
    
    
    
    const navigateToDetails = (item) => {
        navigation.navigate('Details', { item, randomItems, favorites, setCartItems });
      };

      

      const handleCartPress = () => {
        navigation.navigate('Cart', cartItems ); 
    };
    
    const toggleFavorite = () => {
        if (favorites.includes(item.id)) {
            setFavorites(favorites.filter(favId => favId !== item.id));
            console.log(`${item.name} removed from favorites`);
        } else {
            setFavorites([...favorites, item.id]);
            console.log(`${item.name} added to favorites`);
        }
    };

    const renderRecommendedItem = ({ item }) => (
        <View style={styles.recommendedItem}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} 
              onPress={() => navigateToDetails(item)}>
                <Image source={{ uri: item.image }} style={styles.recommendedImage} />
                <View style={styles.recommendedInfo}>
                    <Text style={styles.recommendedTitle}>{item.name}</Text>
                    <Text style={styles.recommendedPrice}>{item.price}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.addToCartButton, { marginTop: '8%' }]}
                onPress={() => addToCart(item)}  >
                <Ionicons name='add' size={24}                   
                color={addedToCart[item.name] ? 'green' : 'black'} 
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                    <View style={styles.overlay}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>{item.name}</Text>
                        <TouchableOpacity
                            style={[styles.addToCartButton, { marginTop: -10 }]}
                            onPress={() => addToCart(item)}  
                        >
                            <Ionicons name="add" size={24} color={addedToCart[item.name] ? 'green' : 'black'} />
                        </TouchableOpacity>
                    </View>
                        <View style={styles.ratingContainer}>
                            {/* <Text style={styles.evaluate}>{item.Evaluate}</Text>
                            <AntDesign name='star' color='yellow' size={24} /> */}
                        </View>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.oldprice}>{item.oldprice}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={handleCartPress}
                    >
                        <AntDesign name='shoppingcart' size={24}                 
                        color={addedToCart[item.name] ? 'green' : 'black'} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.orderButton}
                    onPress={() => console.log('Order placed!')}
                >
                    <Text style={styles.orderButtonText}>Order Now</Text>
                    <MaterialCommunityIcons style={{ marginLeft: '5%' }} name='silverware-fork-knife' size={30} color='white' />
                </TouchableOpacity>

                <Text style={styles.recommendedHeader}>More</Text>
                <FlatList
                    data={randomItems}
                    renderItem={renderRecommendedItem}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.recommendedList}
                    ListEmptyComponent={<Text>No recommended items available.</Text>}
                />

              
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
                <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}
                     onPress={() => navigation.navigate('Home')}
                >
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
      <Toast ref={(ref) => Toast.setRef(ref)} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Màu nền sáng
        paddingBottom: 88,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: '6%',
        width: '88%',
        height: '60%',
        backgroundColor: 'rgba(217, 217, 217, 0.9)', // Đổ bóng mờ
        padding: 20,
        borderRadius: 12,
        justifyContent: 'flex-end',
    },
    addToCartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#A52A2A',
        padding: 10,
        borderRadius: 50,
        elevation: 2,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 18,
        fontWeight: '500',
        color: '#555',
        marginVertical: 5,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#A52A2A',
    },
    oldprice: {
        fontSize: 20,
        fontWeight: '400',
        textDecorationLine: 'line-through',
        color: '#888',
    },
    orderButton: {
        backgroundColor: '#A52A2A',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    footerButton: {
        alignItems: 'center',
    },
    footerButtonText: {
        fontSize: 16,
        fontWeight: '400',
    },
    recommendedHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 20,
        color: '#333',
    },
    recommendedList: {
        paddingHorizontal: 20,
    },
    recommendedItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    recommendedImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    recommendedInfo: {
        marginLeft: 10,
        flex: 1,
    },
    recommendedTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    recommendedPrice: {
        fontSize: 14,
        color: '#A52A2A',
        fontWeight: 'bold',
    },
});


export default Details;
