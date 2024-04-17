import { FlatList } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { YStack, Text } from "tamagui";
import SearchBar from "../components/SearchBar";
import { DataContext, DataContextType } from "../context/DataContext";
import { Skill } from "../types/skillTypes";
import SkillCard from "../components/SkillCard";
import { Stack } from "tamagui";

export default function SearchPage() {
  const { skillsList, fetchSkills, fetchUserSkills } = useContext(
    DataContext
  ) as DataContextType;

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [filteredList, setFilteredList] = useState<Skill[] | any>();

  useEffect(() => {
    setIsFetching(true);
    fetchSkills();
    fetchUserSkills();
    setIsFetching(false);
  }, []);

  useEffect(() => {
    setFilteredList(skillsList);
  }, [skillsList]);

  function onRefresh() {
    setIsFetching(true);
    fetchSkills();
    setIsFetching(false);
  }

  const renderItem = ({ item }: { item: any }) => {
    return <SkillCard skill={item} />;
  };

  const ListItemSeparator = () => {
    return <Stack h={15} w={15} />;
  };

  return (
    <YStack f={1} px={"$3"} gap={"$5"} pt={"$5"}>
      <SearchBar setFilteredList={setFilteredList} />

      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={isFetching}
        onRefresh={() => onRefresh()}
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item: Skill[] | any) => item.id}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </YStack>
  );
}
