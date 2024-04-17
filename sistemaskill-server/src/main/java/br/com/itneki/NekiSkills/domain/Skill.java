package br.com.itneki.NekiSkills.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tb_skill")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "skill_cd_id")
    private UUID id;

    @Column(name = "skill_tx_name")
    private String name;

    @Column(name = "skill_tx_description")
    private String description;

    @Lob
    @JdbcTypeCode(Types.BINARY)
    @Column(name = "skill_blob_image")
    private byte[] image;

    @JsonIgnore
    @OneToMany(mappedBy = "skill", cascade=CascadeType.ALL)
    private Set<UserSkill> userSkills;

}
