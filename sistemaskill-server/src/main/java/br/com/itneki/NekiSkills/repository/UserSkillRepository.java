package br.com.itneki.NekiSkills.repository;

import br.com.itneki.NekiSkills.domain.UserSkill;
import br.com.itneki.NekiSkills.domain.UserSkillKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, UserSkillKey> {
    Page<UserSkill> findUserSkillsByUserId(UUID user_id, Pageable pageable);
    
}
