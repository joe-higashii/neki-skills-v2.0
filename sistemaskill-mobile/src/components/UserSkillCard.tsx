import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, CardFooter, SizableText, XStack, YStack } from "tamagui";
import { CardHeader } from "tamagui";
import { CardProps } from "tamagui";
import { userSkillResponse } from "../types/skillTypes";
import { Image } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { TabTypes } from "../routes/tabs.routes";
type SkillCardProps = CardProps & {
  skill: userSkillResponse | null;
};
export default function UserSkillCard({ skill, ...rest }: SkillCardProps) {
  const navigation = useNavigation<TabTypes>();
  return (
    <Card
      elevation={"$0.75"}
      width={140}
      height={140}
      display="flex"
      justifyContent="space-between"
      overflow="hidden"
      onPress={() => navigation.navigate("MySkills")}
    >
      <XStack f={1} ai="center" jc="center">
        <Image
          resizeMode="cover"
          source={{
            width: 140,
            height: 70,
            uri: skill?.userSkills.imageUrl,
          }}
        />
      </XStack>
      <CardFooter f={1} ai="flex-start" jc="center" pt="$3">
        <YStack jc="center" ai="center">
          <SizableText fontSize={"$4"} style={{ textTransform: "capitalize" }}>
            {skill?.userSkills.name}
          </SizableText>
          <SizableText fontSize={"$2"} theme={"alt2"}>
            Nível {skill?.skillLevel}/5
          </SizableText>
        </YStack>
      </CardFooter>
    </Card>
  );
}
