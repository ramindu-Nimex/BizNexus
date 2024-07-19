import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from '../../configs/FirbaseConfig';
import PopularBusinessCard from './PopularBusinessCard';

export default function PopularBusiness() {

   const [businessList, setBusinessList] = useState([]);

   const GetBusinessList = async () => {
      setBusinessList([]);
      const q = query(collection(db, "BusinessList"), limit(10));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
        setBusinessList((prev) => [...prev, {id:doc.id, ...doc.data()}]);
      });
    };

    useEffect(() => {
      GetBusinessList();
    }, []);

  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
          }}
        >
          View All
        </Text>
      </View>
      <FlatList 
         data={businessList}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         renderItem={({ item, index }) => (
            <PopularBusinessCard key={index} business={item} />
         )}
      />
    </View>
  )
}