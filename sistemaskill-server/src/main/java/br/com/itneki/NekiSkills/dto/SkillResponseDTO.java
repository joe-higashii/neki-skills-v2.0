package br.com.itneki.NekiSkills.dto;

import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SkillResponseDTO {
    private UUID id;
    private String name;
    private String description;
    private String imageUrl;
}
