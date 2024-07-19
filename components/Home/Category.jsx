import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { db } from "../../configs/FirbaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({ explore=false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    GetCategoryList();
  }, []);

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push('/businessList/'+item.name)
    } else {
      onCategorySelect(item.name);
    }
  }

  return (
    <View>
      {
        !explore && (
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
              Category
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
        )
      }
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 20,
        }}
        renderItem={({ index, item }) => (
          <CategoryItem onCategoryPress={(category) => onCategoryPressHandler(item)} category={item} key={index} />
        )}
      />
    </View>
  );
}
