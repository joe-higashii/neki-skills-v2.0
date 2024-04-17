import React, { useContext } from "react";
import { CheckCircle } from "@tamagui/lucide-icons";
import {
  Button,
  ButtonProps,
  Text,
  AlertDialog,
  YStack,
  XStack,
} from "tamagui";
import { Skill } from "../types/skillTypes";
import { DataContext, DataContextType } from "../context/DataContext";

type RemoveSkillProps = ButtonProps & {
  skill: Skill;
};
export default function RemoveSkillModal({ skill, ...rest }: RemoveSkillProps) {
  const { unlinkUserSkill } = useContext(DataContext) as DataContextType;

  function handleRemoveSkill() {
    unlinkUserSkill(skill.id);
  }

  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <Button bg={"$green4Light"} borderColor={"$green5Dark"}>
          <Text fontWeight={"300"} color={"$green5"}>
            Já possui
          </Text>
          <CheckCircle size={"$1"} color={"$green10Dark"} />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Deseja remover essa skill?</AlertDialog.Title>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancelar</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action onPress={handleRemoveSkill} asChild>
                <Button theme="active" bg={"$red10Dark"}>
                  Remover
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
