import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Image } from 'react-native';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`);
      setUsers((prevUsers) => [...prevUsers, ...response.data]);
      setFilteredUsers((prevUsers) => [...prevUsers, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { user: item })}>
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: `https://picsum.photos/seed/${item.id}/50/50` }}
                style={styles.profileImage}
              />
              <Text style={styles.item}>{item.name} - {item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  item: {
    fontSize: 18,
    color: '#333',
  },
});

export default UserListScreen;
