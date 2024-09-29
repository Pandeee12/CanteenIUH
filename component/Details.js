import { AntDesign, MaterialCommunityIcons, EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';

const Details = ({ route }) => {
    const navigation = useNavigation();
    const { item, favorites: initialFavorites,setCartItems } = route.params; // Lấy item từ params
    const [favorites, setFavorites] = useState(initialFavorites); // State để theo dõi danh sách yêu thích

    const addToCart = () => {
        setCartItems((prevItems) => [...prevItems, item]); // Thêm món ăn vào giỏ hàng
        // Có thể hiển thị thông báo thêm thành công
      };

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            // Nếu đã có trong danh sách yêu thích, xóa nó
            setFavorites(favorites.filter(favId => favId !== id));
            console.log(`${item.title} removed from favorites`);
        } else {
            // Nếu chưa có, thêm vào danh sách yêu thích
            setFavorites([...favorites, id]);
            console.log(`${item.title} added to favorites`);
        }
    };
    const recommendedItems = [
        {   
            id: 1,
            image: require('../assets/crackBurger.jpg'),
            title: 'Healthy chicken protein burger',
            oldprice: '45.000 đ',
            price: '30.000 đ',
            description: '390 kcal',
            Evaluate: 5,
        },
        {
            id: 2,
            image: require('../assets/Pho.jpg'),
            title: 'Pho Hehehehehe',
            oldprice: '45.000 đ',
            price: '30.000 đ',
            description: '666 kcal',
            Evaluate: 5,
        },
        {
            id: 3,
            image: require('../assets/roll.jpg'),
            title: 'Vietnamese Rice Paper Rolls',
            oldprice: '45.000 đ',
            price: '30.000 đ',
            description: '333 kcal',
            Evaluate: 5,
        },
        {
            id: 4,
            image: require('../assets/Steak.jpg'), 
            title: 'Steak',
            oldprice: '50.000 đ',
            price: '35.000 đ',
            description: '888 kcal',
            Evaluate: 5,
        },
        {
            id: 5,
            image: require('../assets/Ramen.jpg'), 
            title: 'Ramen',
            oldprice: '60.000 đ',
            price: '45.000 đ',
            description: '500 kcal',
            Evaluate: 5,
        },
    ];
    const renderRecommendedItem = ({ item }) => (
        <View style={styles.recommendedItem}>
                <TouchableOpacity style={{flexDirection: 'row',alignItems:'center'}}>
                    <Image source={item.image} style={styles.recommendedImage} />
                    <View style={styles.recommendedInfo}>
                        <Text style={styles.recommendedTitle}>{item.title}</Text>
                        <Text style={styles.recommendedPrice}>{item.price}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.addToCartButton,{marginTop:'8%'}]} 
                    onPress={addToCart}
                >
                <Ionicons name='add' size={24} color='#fff' />
                </TouchableOpacity> 
        </View>
    );
    

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} resizeMode="cover" />
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.evaluate}>{item.Evaluate}</Text>
                            <AntDesign name='star' color='yellow' size={24} />
                        </View>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.oldprice}>{item.oldprice}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.addToCartButton} 
                        onPress={() => console.log('Added to Cart')}
                    >
                        <AntDesign name='shoppingcart' size={24} color='#fff' />
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
                    data={recommendedItems}
                    renderItem={renderRecommendedItem}
                    keyExtractor={item => item.id.toString()} // Chuyển đổi id thành chuỗi
                    horizontal={false} //false = ngang
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.recommendedList}
                />

            </ScrollView>

            {/* Footer Menu */}
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <TouchableOpacity style={styles.footerButton}>
                        <MaterialCommunityIcons name='silverware-fork-knife' size={30} color='#A52A2A'
                        onPress={() => navigation.navigate('Favorites', { favorites })}></MaterialCommunityIcons>
                        <Text style={styles.footerButtonText}>Favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
                        <AntDesign name='home' size={28} color='#A52A2A' />
                        <Text style={styles.footerButtonText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton}>
                        <EvilIcons name='bell' size={28} color='#A52A2A' />
                        <Text style={styles.footerButtonText}>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton}>
                        <AntDesign name='user' size={28} color='#A52A2A' />
                        <Text style={styles.footerButtonText}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 88,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 300,
    },
    overlay: {
        position: 'absolute',
        bottom: 0, // Align to bottom
        left: '6%', // Center horizontally (12% total width difference, 6% from each side)
        width: '88%', 
        height: '66%', // Optional: you can keep it at one-third of the image height or adjust as needed
        backgroundColor: '#D9D9D9',
        padding: 20,
        borderRadius: 8, // Fixed typo here
        justifyContent: 'flex-end', // Align content at the bottom
    },
    addToCartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#A52A2A',
        padding: 10,
        borderRadius: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 22,
        fontWeight: '600',
        marginVertical: 5,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    oldprice: {
        fontSize: 22,
        fontWeight: '400',
        textDecorationLine: 'line-through',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    evaluate: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
    },
    orderButton: {
        backgroundColor: '#A52A2A',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: '5%',
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center', // Center the content horizontally
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
    },
    recommendedList: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    recommendedItem: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        elevation: 2, // Add shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    recommendedImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    recommendedInfo: {
        flex: 1,
        marginLeft: 10,
    },
    recommendedTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    recommendedPrice: {
        fontSize: 16,
        fontWeight: '400',
        marginTop: 5,
    },
});

export default Details;
