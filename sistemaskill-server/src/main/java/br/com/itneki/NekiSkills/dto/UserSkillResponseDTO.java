package br.com.itneki.NekiSkills.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserSkillResponseDTO {
    private SkillResponseDTO userSkills;
    private Integer skillLevel;
}
