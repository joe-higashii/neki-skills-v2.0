import CircularSlider from "@fseehawer/react-circular-slider";
import { Card, CardContent, CardHeader } from "./ui/card";
import { userSkillResponse } from "@/types/skillTypes";
import EditSkillModal from "./EditSkillModal";
import { useState } from "react";
export default function UserSkillCard({ skill }: { skill: userSkillResponse }) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Card
        className="h-48 w-48
                  min-w-48
                    flex 
                    flex-col 
                    px-3 py-5
                    gap-y-2
                    items-center 
                    justify-between 
                    overflow-hidden
                    hover:cursor-pointer
                    hover:brightness-75
                    "
        onClick={() => setOpenModal(!openModal)}
      >
        <CardHeader className="relative h-full w-full flex justify-center items-center p-0 ">
          <img
            className="
              h-24 w-24
              rounded-full
              z-10
              object-cover
             "
            src={skill.userSkills.imageUrl}
            alt="Imagem da skill"
          />
          <div className="absolute top-[-1] z-0 scale-105">
            <CircularSlider
              width={100}
              min={0}
              max={5}
              initialValue={0}
              dataIndex={skill.skillLevel}
              hideKnob
              hideLabelValue
              progressColorFrom="#00bfbd"
              progressColorTo="#009c9a"
              progressSize={18}
              trackColor="#eeeeee32"
              trackSize={18}
            />
          </div>
        </CardHeader>

        <CardContent className=" h-full w-full flex flex-col justify-center items-center ">
          <h1 className="text-xl font-medium">{skill.userSkills.name}</h1>
          <span className="text-sm font-light text-muted-foreground">
            Nível {skill.skillLevel}/5
          </span>
        </CardContent>
      </Card>
      <EditSkillModal open={openModal} setOpen={setOpenModal} skill={skill} />
    </>
  );
}
