import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirbaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  /* use to get the businessDetails by id */
  const GetBusinessDetailsById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document Data: ", docSnap.data());
      setBusiness({id:docSnap.id, ...docSnap.data()});
      setLoading(false);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    GetBusinessDetailsById();
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: "70%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro business={business} />
          {/* Action Buttons */}
          <ActionButton business={business} />
          {/* About Screen */}
          <About business={business} />
          {/* Review section */}
          <Reviews business={business} />
        </View>
      )}
    </ScrollView>
  );
}
