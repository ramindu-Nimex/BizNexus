import { View, Text, FlatList, Image } from "react-native";
import { Colors } from "./../../constants/Colors";
import React from "react";

export default function MenuList() {
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add.png"),
      path: "",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("./../../assets/images/business-and-trade.png"),
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share_1.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "",
    },
  ];
  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                flex: 1,
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
      <Text style={{
         fontFamily: 'outfit',
         fontSize: 16,
         textAlign: 'center',
         marginTop: 50,
         color: Colors.GRAY
      }}>Developed by Ramindu @ 2024</Text>
    </View>
  );
}
