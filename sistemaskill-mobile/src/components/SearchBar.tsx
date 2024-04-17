import { useContext, useState } from "react";
import { Button, Input, InputProps, Stack, XStack } from "tamagui";
import { DataContext, DataContextType } from "../context/DataContext";
import { Skill } from "../types/skillTypes";
import { Search, X } from "@tamagui/lucide-icons";
type SearchBarProps = InputProps & {
  setFilteredList?: React.Dispatch<any>;
  disabled?: boolean;
};

export default function SearchBar({
  setFilteredList,
  disabled,
  ...rest
}: SearchBarProps) {
  const { skillsList } = useContext(DataContext) as DataContextType;
  const [searchedValue, setSearchedValue] = useState<string>("");

  const handleInputChange = (value: string) => {
    setSearchedValue(value);
    if (setFilteredList) {
      setFilteredList(
        skillsList?.filter((skill: Skill) =>
          skill.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  if (disabled) {
    return (
      <Stack style={{ position: "relative" }} w={"100%"}>
        <Input
          size={"$5"}
          pl={40}
          pressStyle={{
            borderColor: "#2d939c",
            backgroundColor: "$backgroundFocus",
          }}
          focusStyle={{
            borderColor: "#2d939c",
            backgroundColor: "$backgroundFocus",
          }}
          placeholder="Busque por uma skill"
          disabled
        />
        <Search
          style={{ position: "absolute", left: 8, top: 13 }}
          opacity={0.6}
        />
      </Stack>
    );
  }

  return (
    <Stack style={{ position: "relative" }}>
      <Input
        size={"$5"}
        px={40}
        pressStyle={{
          borderColor: "#2d939c",
          backgroundColor: "$backgroundFocus",
        }}
        focusStyle={{
          borderColor: "#2d939c",
          backgroundColor: "$backgroundFocus",
        }}
        onChangeText={(value) => handleInputChange(value)}
        value={searchedValue}
        placeholder="Busque por uma skill"
        {...rest}
      ></Input>
      <Search
        style={{ position: "absolute", left: 8, top: 13 }}
        opacity={0.6}
      />
      {searchedValue && (
        <Button
          unstyled
          style={{ position: "absolute", right: 10, top: 14 }}
          onPress={() => {
            setSearchedValue("");
            if (setFilteredList) setFilteredList(skillsList);
          }}
        >
          <X />
        </Button>
      )}
    </Stack>
  );
}
