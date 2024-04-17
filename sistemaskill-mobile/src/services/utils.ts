import { Skill, userSkillResponse } from "../types/skillTypes";

export function compararItemsUserSkill(
  a: userSkillResponse,
  b: userSkillResponse
) {
  if (a.userSkills.name > b.userSkills.name) {
    return 1;
  }
  if (a.userSkills.name < b.userSkills.name) {
    return -1;
  }
  return 0;
}
export function compararItemsSkill(a: Skill, b: Skill) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}
