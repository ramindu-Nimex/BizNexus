import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirbaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, []);

  /* used to get business list by category */
  const getBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, {id:doc?.id, ...doc.data()}]);
    });
    setLoading(false);
  };

  return (
    <View>
      {businessList.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard key={index} business={item} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator size={"large"} color={Colors.PRIMARY} style={{
            marginTop: "60%",
        }} />
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: "50%",
            fontFamily: "outfit-bold",
            fontSize: 20,
            color: Colors.GRAY,
          }}
        >
          No business found
        </Text>
      )}
    </View>
  );
}
