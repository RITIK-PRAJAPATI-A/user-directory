import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface User {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

const UserDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { user }: { user: User } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Address: {user.address.street}, {user.address.city}, {user.address.zipcode}</Text>
      <Text>Company: {user.company.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
});

export default UserDetailScreen;
