import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirbaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";

export default function My_business() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Business",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    user && GetUserBusiness();
  }, [user]);

  /* use to get business list by user email */
  const GetUserBusiness = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        setBusinessList((prev) => [...prev, {id:doc.data(), ...doc.data()}]);
      });
    setLoading(false);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
        }}
      >
        My Business
      </Text>
      <FlatList 
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({item,index}) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
