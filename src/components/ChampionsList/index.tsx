import React from "react";
import { FlatList, TouchableOpacity, Text, Image } from "react-native";



export default function ChampionsList({campeoesJson, setModalVisible, setSelectedChampion, getRoleImage}) {
  return (
    <FlatList
          data={Object.values(campeoesJson)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ marginBottom: 30 }}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedChampion(item);
                }}
              >
                <Text style={{ color: "white" }}>
                  {item.id}: {item.title}
                </Text>
                <Image
                  source={getRoleImage(item.tags[0])}
                  style={{ width: 50, height: 50 }}
                />
                <Image
                  source={{
                    uri: `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${item.id}.png`,
                  }}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            );
          }}
        />
  );
}
