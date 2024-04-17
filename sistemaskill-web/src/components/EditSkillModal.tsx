import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { userSkillRequest, userSkillResponse } from "@/types/skillTypes";
import { Slider } from "./ui/slider";
import { Label } from "@radix-ui/react-label";
import { useContext, useState } from "react";
import { DataContext, DataContextType } from "@/context/DataContext";
import { AuthContext } from "@/context/AuthContext";
import { AuthContextType } from "@/types/authTypes";
export default function EditSkillModal({
  open,
  setOpen,
  skill,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  skill: userSkillResponse;
}) {
  const [newSkillLevel, setNewSkillLevel] = useState<number>(0);
  const { unlinkUserSkill, updateUserSkill } = useContext(
    DataContext
  ) as DataContextType;
  const { getUserId } = useContext(AuthContext) as AuthContextType;

  function handleRemoveSkill() {
    unlinkUserSkill(skill.userSkills.id);
    setOpen(false);
  }

  function handleEditSkill() {
    const reqSkillBody: userSkillRequest = {
      userId: getUserId(),
      skillId: skill.userSkills.id,
      skillLevel: newSkillLevel,
    };
    updateUserSkill(reqSkillBody);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar skill</DialogTitle>
          <DialogDescription>
            Edite as informações da sua skill
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col items-center justify-center bg-card rounded-2xl p-2 ">
            <img
              src={skill.userSkills.imageUrl}
              alt="Logo da skill"
              className="
              h-24 w-24
              rounded-full
             "
            />
            <span className="font-bold text-lg">{skill.userSkills.name}</span>
            <span className="text-muted-foreground mx-auto text-center text-ellipsis line-clamp-3">
              {skill.userSkills.description}
            </span>
          </div>
          <div className=" flex flex-row justify-between">
            <Label className="font-light" htmlFor="levelSlider">
              Nível da skill
            </Label>
            <span className="font-medium">{newSkillLevel}/5</span>
          </div>

          <Slider
            id="levelSlider"
            min={0}
            max={5}
            step={1}
            defaultValue={[skill.skillLevel]}
            value={[newSkillLevel]}
            onValueChange={(value: number[]) => setNewSkillLevel(value[0])}
            className="cursor-pointer"
          />
        </div>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveSkill()}
            >
              Remover skill
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={() => handleEditSkill()}
            >
              Editar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
