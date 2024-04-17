import { FileEdit, X } from "@tamagui/lucide-icons";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Label,
  Sheet,
  Unspaced,
  XStack,
  Text,
  Slider,
  SliderProps,
  ButtonProps,
  Card,
  SizableText,
  YStack,
} from "tamagui";
import { userSkillRequest, userSkillResponse } from "../types/skillTypes";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/authTypes";
import { DataContext, DataContextType } from "../context/DataContext";

type EditSkillButtonProps = ButtonProps & {
  userSkill: userSkillResponse;
};

export function EditSkillModal({ userSkill, ...rest }: EditSkillButtonProps) {
  const { getUserId } = useContext(AuthContext) as AuthContextType;
  const { linkUserSkill, unlinkUserSkill } = useContext(
    DataContext
  ) as DataContextType;
  const [open, setOpen] = useState<boolean>(false);
  const [nivel, setNivel] = useState<number>(0);

  useEffect(() => {
    setNivel(userSkill.skillLevel);
  }, []);

  function handleUpdateSkill() {
    const data: userSkillRequest = {
      userId: getUserId(),
      skillId: userSkill.userSkills.id,
      skillLevel: nivel,
    };
    linkUserSkill(data);
  }

  function handleRemoveSkill() {
    unlinkUserSkill(userSkill.userSkills.id);
  }

  return (
    <Dialog
      modal
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button mr={"$2"}>
          <FileEdit opacity={0.8} />
          <Text opacity={0.8}>Editar Skill</Text>
        </Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="lazy" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
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
          gap="$4"
        >
          <Dialog.Title>Editar Skill</Dialog.Title>
          <Dialog.Description theme={"alt2"}>
            Edite a skill {userSkill?.userSkills.name}
          </Dialog.Description>

          <Card
            mx={"auto"}
            py={"$3"}
            ai={"center"}
            jc={"center"}
            gap={"$2"}
            bg={"$backgroundHover"}
            w={"100%"}
          >
            <Image
              borderRadius={100}
              resizeMode="contain"
              source={{
                width: 80,
                height: 80,
                uri: userSkill?.userSkills.imageUrl,
              }}
            />
            <YStack ai={"center"} jc={"center"}>
              <SizableText fontSize={"$7"} fontWeight={"bold"}>
                {userSkill?.userSkills.name}
              </SizableText>
              <SizableText fontSize={"$2"} theme={"alt2"}>
                {userSkill?.userSkills.description}
              </SizableText>
            </YStack>
          </Card>

          <Fieldset gap="$4">
            <XStack jc={"space-between"}>
              <Label
                fontSize={"$4"}
                width={160}
                justifyContent="flex-end"
                htmlFor="name"
              >
                Nivel
              </Label>
              <Text fontSize={"$5"} fontWeight={"bold"}>
                {nivel}/5
              </Text>
            </XStack>
            <SimpleSlider
              valorPadrao={userSkill?.skillLevel}
              width={"100%"}
              onValueChange={(nivel) => setNivel(nivel[0])}
            />
          </Fieldset>

          <XStack jc="space-between" mt={"$6"} gap="$4">
            <Dialog.Close
              displayWhenAdapted
              asChild
              onPress={() => {
                handleRemoveSkill();
              }}
            >
              <Button
                aria-label="Close"
                borderColor={"$red6"}
                bg={"$red4"}
                color={"$red6"}
              >
                Remover Skill
              </Button>
            </Dialog.Close>
            <Dialog.Close
              displayWhenAdapted
              asChild
              onPress={() => {
                handleUpdateSkill();
              }}
            >
              <Button aria-label="Close" bg={"#2d939c"}>
                Editar skill
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

type CustomSliderProps = SliderProps & {
  valorPadrao: number;
};
function SimpleSlider({ children, valorPadrao, ...props }: CustomSliderProps) {
  return (
    <Slider defaultValue={[valorPadrao]} max={5} min={0} step={1} {...props}>
      <Slider.Track>
        <Slider.TrackActive bg={"#2d939c"} />
      </Slider.Track>
      <Slider.Thumb
        borderColor={"#2d939c"}
        index={0}
        circular
        elevate
        size={"$2"}
      />
      {children}
    </Slider>
  );
}
