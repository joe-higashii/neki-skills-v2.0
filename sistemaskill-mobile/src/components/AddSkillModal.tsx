import React, { useContext } from "react";
import {
  Button,
  ButtonProps,
  Text,
  AlertDialog,
  YStack,
  XStack,
} from "tamagui";
import { Skill, userSkillRequest } from "../types/skillTypes";
import { DataContext, DataContextType } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/authTypes";

type AddSkillButtonProps = ButtonProps & {
  skill: Skill;
};
export default function AddSkillModal({ skill, ...rest }: AddSkillButtonProps) {
  const { linkUserSkill } = useContext(DataContext) as DataContextType;
  const { getUserId } = useContext(AuthContext) as AuthContextType;

  function handleAddSkill() {
    const userSkillReq: userSkillRequest = {
      userId: getUserId(),
      skillId: skill.id,
      skillLevel: 0,
    };
    linkUserSkill(userSkillReq);
  }

  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <Button borderRadius="$7" fontSize={"$2"} {...rest}>
          <Text fontWeight={"200"}>Adicionar skill</Text>
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
            <AlertDialog.Title>Adicionar nova skill?</AlertDialog.Title>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancelar</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action onPress={handleAddSkill} asChild>
                <Button theme="active">Adicionar</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
