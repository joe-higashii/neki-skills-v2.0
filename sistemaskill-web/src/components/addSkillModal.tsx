/* eslint-disable react-hooks/rules-of-hooks */
import { PlusCircle, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Skill, userSkillRequest } from "@/types/skillTypes";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { DataContext, DataContextType } from "@/context/DataContext";
import { AuthContextType } from "@/types/authTypes";

type AddSkillModalProps = {
  skill: Skill;
  setSearchedSkill: React.Dispatch<React.SetStateAction<string>>;
};
export default function AddSkillModal({
  skill,
  setSearchedSkill,
}: AddSkillModalProps) {
  const { getUserId } = useContext(AuthContext) as AuthContextType;
  const { userSkills: userSkillList, linkUserSkill } = useContext(
    DataContext
  ) as DataContextType;

  function handleAddSkill() {
    const userSkillReq: userSkillRequest = {
      userId: getUserId(),
      skillId: skill.id,
      skillLevel: 0,
    };
    linkUserSkill(userSkillReq);
    setSearchedSkill("");
  }
  function verifyIfUserAlreadyHasSkill() {
    return userSkillList?.some(
      (userSkill) => userSkill.userSkills.id === skill.id
    );
  }

  return (
    <Dialog>
      {verifyIfUserAlreadyHasSkill() ? (
        <Button variant="ghost" className="text-green-700 gap-2">
          <span className="text-sm font-light">Você possui essa skill</span>
          <CheckCircle className="w-5 h-5" />
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-muted-foreground gap-2">
            <span className="text-sm font-light">Adicionar skill</span>
            <PlusCircle className="w-5 h-5" />
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar nova skill</DialogTitle>
          <DialogDescription>
            Deseja adicionar a skill {skill.name} a sua lista de skills?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={() => handleAddSkill()}
            >
              Adicionar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
