import React from "react";
import { Button, Card, CardFrame, Image, SizableText, XStack } from "tamagui";
export default function MainCard() {
  return (
    <Card
      elevation={"$0.75"}
      width={"100%"}
      height={180}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      overflow="hidden"
    >
      <CardFrame flex={3} pl={"$4"} ai={"flex-start"} jc={"center"} gap={"$5"}>
        <SizableText fontSize={"$4"}>
          <SizableText fontWeight={"bold"} fontSize={"$5"}>
            Aprimore suas habilidades
          </SizableText>{" "}
          com o NekiSkills
        </SizableText>
        <Button bg={"#2d939c"} fontSize={"$4"} h={"$5"}>
          Saiba mais
        </Button>
      </CardFrame>
      <XStack flex={2} ai={"flex-end"} jc={"flex-end"} opacity={0.6}>
        <Image
          resizeMode="cover"
          source={{
            width: 130,
            height: 180,
            uri: "https://source.unsplash.com/random?technology",
          }}
        />
      </XStack>
    </Card>
  );
}
