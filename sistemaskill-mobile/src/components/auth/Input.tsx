import React from "react";
import { InputProps, Input as TamaguiInput, YStack, Text } from "tamagui";

type Props = InputProps & {
  isInvalid?: boolean;
  errorMessage?: string | null;
  passwordInput?: boolean;
};
export default function Input({
  errorMessage = null,
  isInvalid = false,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <YStack gap={"$2"}>
      <TamaguiInput
        size={"$5"}
        focusStyle={{
          borderColor: "#2d939c",
          backgroundColor: "$backgroundFocus",
        }}
        borderColor={invalid ? "$red10" : "$borderColor"}
        {...rest}
      />
      {invalid && (
        <Text color={"$red10"} fontFamily={"$body"} fontSize={"$2"}>
          {errorMessage}
        </Text>
      )}
    </YStack>
  );
}
