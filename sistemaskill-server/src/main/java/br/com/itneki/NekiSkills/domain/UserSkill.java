package br.com.itneki.NekiSkills.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class UserSkill {
    @EmbeddedId
    @JsonIgnore
    private UserSkillKey id;

    @JsonIgnore
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "fk_usr_cd_id")
    private User user;

    @ManyToOne
    @MapsId("skillId")
    @JoinColumn(name = "fk_skill_cd_id")
    private Skill skill;

    @Column(name = "usr_skill_cd_level")
    private Integer level;
}
