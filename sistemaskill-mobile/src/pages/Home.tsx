import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Button, H3, Paragraph, Text, YStack } from "tamagui";
import MainCard from "../components/MainCard";
import MySkillsList from "../components/MySkillsList";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";
import { StackTypes } from "../routes/stack.routes";
import { AuthContextType } from "../types/authTypes";
import { Appearance } from "react-native";

export default function Home() {
  const { getUsername } = useContext(AuthContext) as AuthContextType;

  const navigation = useNavigation<StackTypes>();

  return (
    <YStack f={1} px={"$3"} gap={"$6"}>
      {/*Welcome Section*/}
      <YStack pt={"$6"}>
        <H3 textAlign="left">
          Olá,{" "}
          <Text style={{ textTransform: "capitalize" }}>{getUsername()}</Text>
        </H3>
        <Paragraph theme={"alt2"}>Bem vindo(a) ao NekiSkills</Paragraph>
      </YStack>

      {/*SearchBar*/}
      <Button
        width={"100%"}
        height={50}
        unstyled
        onPress={() => {
          navigation.navigate("SearchPage");
        }}
      >
        <SearchBar disabled />
      </Button>

      <MainCard />
      <MySkillsList />
    </YStack>
  );
}
