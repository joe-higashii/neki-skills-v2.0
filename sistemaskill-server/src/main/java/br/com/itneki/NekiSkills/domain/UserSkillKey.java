package br.com.itneki.NekiSkills.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class UserSkillKey implements Serializable {
    @Column(name = "fk_usr_cd_id")
    private UUID userId;
    @Column(name = "fk_skill_cd_id")
    private UUID skillId;
}
