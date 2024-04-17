export type Skill = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type userSkillRequest = {
  userId: string | void;
  skillId: string;
  skillLevel: number;
};

export type userSkillResponse = {
  userSkills: Skill;
  skillLevel: number;
};
