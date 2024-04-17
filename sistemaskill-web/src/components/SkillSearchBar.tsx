import { useEffect, useState } from "react";
import { api } from "@/services/axios";
import { Skill } from "@/types/skillTypes";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { SearchX } from "lucide-react";
import AddSkillModal from "./AddSkillModal";
export function SkillSearchBar() {
  const [skillsFound, setSkillsFound] = useState<Skill[] | null>(null);
  const [searchedSkill, setSearchedSkill] = useState("");

  useEffect(() => {
    api.get(`/skills?searchKey=${searchedSkill}`).then(({ data }) => {
      setSkillsFound(data);
    });
  }, [searchedSkill]);

  const skillsList = skillsFound?.map((skill) => (
    <CommandItem key={skill.id} className="flex flex-row justify-between">
      <span className="capitalize">{skill.name}</span>
      <AddSkillModal skill={skill} setSearchedSkill={setSearchedSkill} />
    </CommandItem>
  ));

  return (
    <Command className="rounded-lg border shadow-md bg-card">
      <CommandInput
        placeholder="Busque por uma Skill..."
        onValueChange={(e) => setSearchedSkill(e)}
        value={searchedSkill}
      />
      <CommandList className={searchedSkill ? "" : "hidden"}>
        {skillsFound && skillsList}
        {searchedSkill && skillsFound && (
          <CommandEmpty className="flex flex-col items-center justify-center text-muted-foreground py-2 gap-1">
            <SearchX className="w-6 h-6" />
            <span className="font-light">Nenhuma skill encontrada</span>
          </CommandEmpty>
        )}
      </CommandList>
    </Command>
  );
}
