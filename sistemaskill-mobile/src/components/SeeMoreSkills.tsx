import { StyleSheet } from "react-native";
import React from "react";
import { Button, Card, SizableText } from "tamagui";
import { CardHeader } from "tamagui";
import { CardProps } from "tamagui";
import { ChevronRightCircle } from "@tamagui/lucide-icons";
export default function SeeMoreSkills(props: CardProps) {
  return (
    <Card
      elevation={"$0.75"}
      width={120}
      height={140}
      display="flex"
      justifyContent="space-between"
      overflow="hidden"
      bg={"#2d939c"}
      opacity={0.8}
    >
      <CardHeader f={1} ai="center" jc="center" gap={"$2"}>
        <ChevronRightCircle size={"$4"} />
        <SizableText textAlign="center" p={"$0"}>
          Ver todas as suas Skills
        </SizableText>
      </CardHeader>
    </Card>
  );
}

const styles = StyleSheet.create({});
