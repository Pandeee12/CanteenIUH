import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Cart = ({ route, navigation }) => {
  const { cartItems, updateCart } = route.params; // Nhận dữ liệu giỏ hàng và hàm cập nhật từ route
  const [items, setItems] = useState(cartItems); // Lưu giỏ hàng trong state để có thể cập nhật

  const removeItem = (itemToRemove) => {
    Alert.alert(
      'Xác nhận',
      `Bạn có chắc chắn muốn xóa ${itemToRemove.title} khỏi giỏ hàng?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            const updatedItems = items.filter(item => item.title !== itemToRemove.title);
            setItems(updatedItems); // Cập nhật giỏ hàng trong state
            updateCart(updatedItems); // Cập nhật giỏ hàng trong component cha
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleCheckout = () => {
    // Logic xử lý thanh toán
    Alert.alert('Thanh toán', 'Bạn đã thanh toán thành công!');
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item)}>
        <Text style={styles.removeButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Giỏ hàng</Text>
      <FlatList
        data={items} 
        renderItem={renderCartItem}
        keyExtractor={(item) => item.title} 
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Cart;
