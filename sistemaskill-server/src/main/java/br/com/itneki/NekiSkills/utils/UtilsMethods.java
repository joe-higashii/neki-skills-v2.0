package br.com.itneki.NekiSkills.utils;

import br.com.itneki.NekiSkills.domain.Skill;
import br.com.itneki.NekiSkills.domain.UserSkill;
import br.com.itneki.NekiSkills.dto.SkillResponseDTO;
import br.com.itneki.NekiSkills.dto.UserSkillResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Component
public class UtilsMethods {
    @Autowired
    ModelMapper modelMapper;

    /**
     * Função responsável por transformar imagens Binárias em links de referência e então retornar
     * uma SkillResponse que contém dados da Skill e a URL da imagem.
     * @param id
     * @param skill
     * @return SkillResponseDTO
     */
    public SkillResponseDTO fromBinaryToUrl(UUID id, Optional<Skill> skill) {
        if (skill.isEmpty()){
            throw new NoSuchElementException("Error! Skill cannot be null!");
        }

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/skills/image/{id}")
                .buildAndExpand(id)
                .toUri();
        SkillResponseDTO skillResponse = modelMapper.map(skill.get(), SkillResponseDTO.class);
        skillResponse.setImageUrl(uri.toString());
        return skillResponse;
    }

    /**
     * Função responsável por instanciar UserSkillResponse DTO
     *
     * @param userSkill
     * @return instance of UserSkillResponseDTO
     */
    public UserSkillResponseDTO userSkillResponseDTOFactory(UserSkill userSkill) {
        SkillResponseDTO skillResponseDTO = this.fromBinaryToUrl(userSkill.getSkill().getId(), Optional.of(userSkill.getSkill()));
        Integer skillLevel = userSkill.getLevel();
        return new UserSkillResponseDTO(skillResponseDTO, skillLevel);
    }

}
