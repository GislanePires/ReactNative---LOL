import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function ChampionModal({
  modalVisible,
  setModalVisible,
  selectedChampion,
  championStats,
  setSelectedChampion,
  isLoading,
  setIsLoading,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"#fff"} style={{marginTop: "50%"}}/>
      ) : (
        <View style={{ marginTop: 100, backgroundColor: "red", padding: 30 }}>
          <View>
            <Text>
              {selectedChampion?.title[0] == "o" ? "O" : "A"}{" "}
              {selectedChampion?.title.substr(
                2,
                selectedChampion?.title.length
              )}
            </Text>
            <Text>Classe: {selectedChampion?.tags[0]}</Text>
            <View>
              {Object.values(championStats).map((item) => {
                return (
                  <View key={item.id}>
                    <Text>{item.lore}</Text>
                    <Text>Habilidades</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <View>
                        <Text>Q</Text>
                        <Image
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${item.spells[0].id}.png`,
                          }}
                          style={{ width: 50, height: 50 }}
                        />
                      </View>
                      <View>
                        <Text>W</Text>
                        <Image
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${item.spells[1].id}.png`,
                          }}
                          style={{ width: 50, height: 50 }}
                        />
                      </View>
                      <View>
                        <Text>E</Text>
                        <Image
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${item.spells[2].id}.png`,
                          }}
                          style={{ width: 50, height: 50 }}
                        />
                      </View>
                      <View>
                        <Text>R</Text>
                        <Image
                          source={{
                            uri: `https://ddragon.leagueoflegends.com/cdn/13.22.1/img/spell/${item.spells[3].id}.png`,
                          }}
                          style={{ width: 50, height: 50 }}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSelectedChampion(null);
                setIsLoading(true);
              }}
              style={{ marginTop: 20, backgroundColor: "white", padding: 10 }}
            >
              <Text>Fechar Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
}
