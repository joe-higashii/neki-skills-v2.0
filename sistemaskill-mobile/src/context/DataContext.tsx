import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../services/axios";
import {
  Skill,
  userSkillRequest,
  userSkillResponse,
} from "../types/skillTypes";
import { AuthContextType } from "../types/authTypes";
import { compararItemsSkill, compararItemsUserSkill } from "../services/utils";

type DataContextProps = {
  children: ReactNode;
};

export type DataContextType = {
  fetchSkills: () => void;
  fetchUserSkills: () => void;
  skillsList: Skill[] | null;
  userSkills: userSkillResponse[] | null;
  setSkillsList: Dispatch<any>;
  linkUserSkill: (data: userSkillRequest) => Promise<void>;
  unlinkUserSkill: (skillId: string) => Promise<void>;
  updateUserSkill: (data: userSkillRequest) => Promise<void>;
};

export const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: DataContextProps) => {
  const [userSkills, setUserSkills] = useState<userSkillResponse[] | null>(
    null
  );
  const [skillsList, setSkillsList] = useState<Skill[] | any>();

  const { getUserId, getToken } = useContext(AuthContext) as AuthContextType;

  const headers = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  async function fetchSkills() {
    try {
      const skillsResponse = await api.get("/skills", headers);
      if (skillsResponse) {
        const SkillResponseList: Skill[] = skillsResponse.data;
        setSkillsList(SkillResponseList.sort(compararItemsSkill));
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  }

  async function fetchUserSkills() {
    try {
      const userSkillsResponse = await api.get(
        `/user-skills/user/${getUserId()}`,
        headers
      );

      if (userSkillsResponse) {
        const UserSkillResponseList: userSkillResponse[] =
          userSkillsResponse.data;
        setUserSkills(UserSkillResponseList.sort(compararItemsUserSkill));
      }
    } catch (error) {
      console.error("Error fetching user skill data:", error);
    }
  }

  async function linkUserSkill(data: userSkillRequest) {
    try {
      await api.post("/user-skills", data, headers);
      await fetchUserSkills();
    } catch (error) {
      console.error("Error linking user skill:", error);
    }
  }

  async function unlinkUserSkill(skillId: string) {
    try {
      await api.delete(`/user-skills/${getUserId()}/${skillId}`, headers);
      await fetchUserSkills();
    } catch (error) {
      console.error("Error unlinking user skill:", error);
    }
  }

  async function updateUserSkill(data: userSkillRequest) {
    try {
      await api.put("/user-skills", data, headers);
      await fetchUserSkills();
    } catch (error) {
      console.error("Error updating user skill:", error);
    }
  }

  return (
    <DataContext.Provider
      value={{
        fetchSkills,
        fetchUserSkills,
        linkUserSkill,
        unlinkUserSkill,
        updateUserSkill,
        skillsList,
        userSkills,
        setSkillsList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
