package br.com.itneki.NekiSkills.repository;

import br.com.itneki.NekiSkills.domain.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;
@Repository
public interface SkillRepository extends JpaRepository<Skill, UUID> {
    List<Skill> findByNameContainingIgnoreCase(String searchKey);
}