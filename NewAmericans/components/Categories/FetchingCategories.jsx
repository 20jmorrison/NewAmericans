import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// Function to fetch category names
const fetchCategories = async () => {
  try {
    const response = await fetch('http://50.187.63.220:3306/CategoryData'); // Needs to be updated when IP is given
    if (response.ok) {
      const data = await response.json();
      return data.categories;
    } else {
      console.error('Failed to fetch category data');
      return [];
    }
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
};

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Category Names:</Text>
      {categories.map((category, index) => (
        <Text key={index}>{category.name}</Text>
      ))}
    </View>
  );
};

export { CategoryList as default, fetchCategories };
