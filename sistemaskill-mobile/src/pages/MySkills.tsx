import { FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataContext, DataContextType } from "../context/DataContext";
import { Skill, userSkillResponse } from "../types/skillTypes";
import UserSkillCard from "../components/UserSkillCard";
import { Stack, YStack } from "tamagui";
import SkillCard from "../components/SkillCard";
import { FileQuestion } from "@tamagui/lucide-icons";
import { SizableText } from "tamagui";

export default function MySkills() {
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const { fetchUserSkills, userSkills } = useContext(
    DataContext
  ) as DataContextType;

  useEffect(() => {
    setIsFetching(true);
    fetchUserSkills();
    setIsFetching(false);
  }, []);

  function onRefresh() {
    setIsFetching(true);
    fetchUserSkills();
    setIsFetching(false);
  }
  const renderItem = ({ item }: { item: any }) => {
    return <SkillCard userSkill={item} editCard />;
  };
  const ListItemSeparator = () => {
    return <Stack h={15} w={15} />;
  };

  return (
    <YStack w={"100%"} f={1} px={"$3"} py={"$5"} jc={"center"} ai={"center"}>
      {userSkills && userSkills?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={isFetching}
          onRefresh={() => onRefresh()}
          data={userSkills}
          renderItem={renderItem}
          keyExtractor={(item: userSkillResponse) => item?.userSkills.id}
          ItemSeparatorComponent={ListItemSeparator}
        />
      ) : (
        <YStack f={1} jc={"center"} ai={"center"} gap={"$2"}>
          <FileQuestion size={"$4"} opacity={0.5} />
          <SizableText textAlign="center" theme={"alt2"}>
            Opa! Você não adicionou nenhuma skill
          </SizableText>
          <SizableText
            textAlign="center"
            color={"$gray3"}
            opacity={0.5}
            fontSize={"$2"}
          >
            Utilize a barra de pesquisa no menu inicial para adicionar uma skill
          </SizableText>
        </YStack>
      )}
    </YStack>
  );
}
