/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import UserSkillCard from "./UserSkillCard";
import { useContext, useEffect, useState } from "react";
import { userSkillResponse } from "@/types/skillTypes";
import { DataContext, DataContextType } from "@/context/DataContext";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "./ui/card";
import { FileQuestion } from "lucide-react";

export default function UserSkillList() {
  const { fetchUserSkills, userSkills, sortUserSkills } = useContext(
    DataContext
  ) as DataContextType;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("skillName");

  useEffect(() => {
    fetchUserSkills(currentPage, 5, sortBy);
  }, [currentPage, sortBy]);

  const nextPage = () => {
    setCurrentPage((prev: any) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev: any) => prev - 1);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    sortUserSkills(currentPage, 5, selectedSortBy);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium"> Minhas Skills</h1>
        <span className="font-thin text-muted-foreground">
          Clique em uma skill para editá-la
        </span>
      </div>
      <div className="flex justify-end mb-4">
        <select
          className="px-2 py-1 border rounded text-black bg-gray-200"
          onChange={handleSortChange}
          value={sortBy}
        >
          <option value="skillName" className="text-black">
            Nome da Skill
          </option>
          <option value="skillLevel" className="text-black">
            Nível da Skill
          </option>
        </select>
      </div>

      <Separator />

      {userSkills && userSkills?.length > 0 ? (
        <ul className="flex flex-row gap-x-8 overflow-x-scroll snap-x scrollbar-hide sm:scrollbar-default">
          {userSkills.map((skill: userSkillResponse) => (
            <li className="snap-center" key={skill.userSkills.id}>
              <UserSkillCard skill={skill} />
            </li>
          ))}
        </ul>
      ) : (
        <Card className="w-full h-max py-8">
          <CardContent
            className="h-full 
          flex 
          flex-col 
          justify-center 
          items-center 
          p-0 
          text-muted-foreground
          gap-y-2
          opacity-70
          "
          >
            <FileQuestion className="w-12 h-12" />
            <div className="flex flex-col items-center gap-0 text-center">
              <h1 className="font-semibold">
                Opa! parece que você não adicionou nenhuma skill.
              </h1>
              <span className="font-extralight p-0">
                Utilize a barra de pesquisa para encontrar suas skills
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Paginação */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={prevPage}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
