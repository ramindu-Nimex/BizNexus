import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function ActionButton({ business }) {
   const actionButtonMenu = [
      {
         id: 1,
         title: "Call",
         icon: require("./../../assets/images/call.png"),
         url: 'tel:'+business?.contact
      },
      {
         id: 2,
         title: "Location",
         icon: require("./../../assets/images/pin.png"),
         url: 'https://www.google.com/maps/search/?api=1&query'+business?.address
      },
      {
         id: 3,
         title: "Web",
         icon: require("./../../assets/images/web.png"),
         url: business?.website
      },
      {
         id: 4,
         title: "Share",
         icon: require("./../../assets/images/share.png"),
         url: business?.website
      },
   ]

   const onPressHandler = (item) => {
      if(item.title === 'Share') {
         return ;
      }
      Linking.openURL(item.url)
   }
  return (
    <View style={{
      padding: 20,
      backgroundColor: "#fff",
    }}>
      <FlatList 
         data={actionButtonMenu}
         numColumns={4}
         columnWrapperStyle={{
            justifyContent: 'space-between',
         }}
         renderItem={({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => onPressHandler(item)}>
               <Image source={item?.icon}  style={{
                  width: 50,
                  height: 50,
               }}/>
               <Text style={{
                  fontFamily: "outfit-medium",
                  textAlign: 'center',
                  marginTop: 3,
               }}>{item?.title}</Text>
            </TouchableOpacity>
         )}
      />
    </View>
  )
}