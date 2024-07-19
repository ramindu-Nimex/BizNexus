import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirbaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

const Explore = () => {
  const [businessList, setBusinessList] = useState([]);
  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), where('category','==',category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}]);
    }); 
  }
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        Explore More
      </Text>
      {/* Search Bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        />
      </View>
      {/* Category */}
      <Category 
        explore={true}
        onCategorySelect={(category) => {
          GetBusinessByCategory(category);
        }}
      />
      {/* Business List */}
      <ExploreBusinessList businessList={businessList} />
    </View>
  );
};

export default Explore;
