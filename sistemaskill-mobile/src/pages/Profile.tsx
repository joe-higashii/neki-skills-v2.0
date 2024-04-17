import React, { useContext } from "react";
import {
  YStack,
  Avatar,
  H4,
  Paragraph,
  SizableText,
  ListItem,
  YGroup,
} from "tamagui";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/authTypes";
import { ChevronRight, LogOut, Settings2 } from "@tamagui/lucide-icons";
import { Alert } from "react-native";
import { DataContext, DataContextType } from "../context/DataContext";

export default function Profile() {
  const { logout, getUsername, getUserLogin } = useContext(
    AuthContext
  ) as AuthContextType;
  const { userSkills } = useContext(DataContext) as DataContextType;

  function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      { text: "Sair", onPress: () => logout() },
    ]);
  }

  return (
    <YStack
      f={1}
      ai={"center"}
      jc={"flex-start"}
      pt={"$9"}
      px={"$2"}
      gap={"$7"}
    >
      <YStack ai={"center"} gap={"$2"}>
        <Avatar circular size="$6">
          <Avatar.Image src="http://placekitten.com/200/300" />
          <Avatar.Fallback bc="$gray10" />
        </Avatar>
        <H4 style={{ textTransform: "capitalize" }}>{getUsername()}</H4>
        <Paragraph theme={"alt2"}>{getUserLogin()}</Paragraph>

        {userSkills && userSkills.length > 0 ? (
          <SizableText>
            Possui {userSkills.length} skills em seu perfil
          </SizableText>
        ) : (
          <SizableText> Ainda não possui nenhuma skill</SizableText>
        )}
      </YStack>

      <YGroup bordered size="$5">
        <YGroup.Item>
          <ListItem
            disabled
            hoverTheme
            pressTheme
            title="Configurações"
            subTitle="(em breve)"
            icon={Settings2}
            iconAfter={ChevronRight}
            scaleIcon={1.6}
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Sair"
            icon={LogOut}
            iconAfter={ChevronRight}
            onPress={handleLogout}
            scaleIcon={1.6}
          />
        </YGroup.Item>
      </YGroup>
      {/* //<Button bg={"$blue10Light"}>Logout</Button> */}
    </YStack>
  );
}
