import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "../../configs/FirbaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function Add_business() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
    }
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onAddNewBusiness = async () => {
    try {
      setLoading(true);
      if (!image) {
        throw new Error("Please select an image.");
      }
  
      const fileName = Date.now().toString() + ".jpg";
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, "business-app/" + fileName);
  
      await uploadBytes(storageRef, blob);
  
      const downloadUrl = await getDownloadURL(storageRef);
      console.log("File available at", downloadUrl);
  
      await saveBusinessDetail(downloadUrl);
      ToastAndroid.show("New Business Added Successfully", ToastAndroid.LONG);
    } catch (error) {
      console.error("Error uploading image:", error);
      ToastAndroid.show(
        "Error adding business: " + error.message,
        ToastAndroid.LONG
      );
    } finally {
      setLoading(false);
    }
  };  

  const saveBusinessDetail = async (imageUrl) => {
    try {
      await setDoc(doc(db, "BusinessList", Date.now().toString()), {
        name: name,
        address: address,
        contact: contact,
        website: website,
        about: about,
        category: category,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        imageUrl: imageUrl,
      });
      console.log("Document written successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add New Business
      </Text>
      <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
        {!image ? (
          <Image
            source={require("./../../assets/images/placeholder.png")}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(v) => setName(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Address"
          onChangeText={(v) => setAddress(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(v) => setContact(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="WebSite"
          onChangeText={(v) => setWebsite(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="About"
          onChangeText={(v) => setAbout(v)}
          multiline
          numberOfLines={5}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            height: 100,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={onAddNewBusiness}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "outfit-medium",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
