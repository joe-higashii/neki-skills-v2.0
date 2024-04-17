package br.com.itneki.NekiSkills.dto;

import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserSkillRequestDTO {
    private UUID userId;
    private UUID skillId;
    private Integer skillLevel;
}
