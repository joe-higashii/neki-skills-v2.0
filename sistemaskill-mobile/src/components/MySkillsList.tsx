import { useNavigation } from "@react-navigation/native";
import { FileQuestion } from "@tamagui/lucide-icons";
import { useContext, useEffect } from "react";
import { FlatList } from "react-native";
import {
  Button,
  Card,
  H3,
  Separator,
  SizableText,
  Stack,
  YStack,
} from "tamagui";
import SeeMoreSkills from "../components/SeeMoreSkills";
import UserSkillCard from "../components/UserSkillCard";
import { AuthContext } from "../context/AuthContext";
import { DataContext, DataContextType } from "../context/DataContext";
import { TabTypes } from "../routes/tabs.routes";
import { AuthContextType } from "../types/authTypes";
import { userSkillResponse } from "../types/skillTypes";

export default function MySkillsList() {
  const { userSkills, fetchUserSkills } = useContext(
    DataContext
  ) as DataContextType;

  useEffect(() => {
    fetchUserSkills();
  }, []);

  const navigation = useNavigation<TabTypes>();

  const ListItemSeparator = () => {
    return <Stack h={15} w={15} />;
  };

  type userSkillRenderItem = {
    item: userSkillResponse;
    index: number;
  };
  const userSkillRenderItem = ({ item, index }: userSkillRenderItem) => {
    if (index >= 2) {
      return (
        <Button
          width={120}
          height={140}
          onPress={() => navigation.navigate("MySkills")}
        >
          <SeeMoreSkills />
        </Button>
      );
    }

    return <UserSkillCard skill={item} />;
  };

  return (
    <YStack f={1} gap={"$2"}>
      <YStack gap={"$1.5"}>
        <H3>Minhas Skills</H3>
        <Separator
          marginVertical={15}
          borderWidth={"$0.5"}
          borderColor={"$gray10"}
          opacity={0.5}
        />
      </YStack>
      {userSkills && userSkills?.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={userSkills?.slice(0, 3)}
          renderItem={userSkillRenderItem}
          keyExtractor={(item: userSkillResponse | any) =>
            item?.userSkills?.id.toString()
          }
          ItemSeparatorComponent={ListItemSeparator}
        />
      ) : (
        <Card jc="center" ai="center" height={150} gap={"$1.5"}>
          <FileQuestion size={"$4"} opacity={0.5} />
          <SizableText textAlign="center" color={"$gray3"} opacity={0.5}>
            Opa! Você não adicionou nenhuma skill
          </SizableText>
          <SizableText
            textAlign="center"
            color={"$gray3"}
            opacity={0.5}
            fontSize={"$2"}
          >
            Utilize a barra de pesquisa para encontrar uma skill
          </SizableText>
        </Card>
      )}
    </YStack>
  );
}
