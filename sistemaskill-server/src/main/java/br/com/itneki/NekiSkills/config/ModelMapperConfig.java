package br.com.itneki.NekiSkills.config;

import br.com.itneki.NekiSkills.domain.Skill;
import br.com.itneki.NekiSkills.domain.User;
import br.com.itneki.NekiSkills.dto.AuthDTO;
import br.com.itneki.NekiSkills.dto.SkillResponseDTO;
import br.com.itneki.NekiSkills.dto.UserResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        var modelMapper = new ModelMapper();
        modelMapper.typeMap(Skill.class, SkillResponseDTO.class).addMappings(mapper -> {
            mapper.map(Skill::getId, SkillResponseDTO::setId);
            mapper.map(Skill::getName, SkillResponseDTO::setName);
            mapper.map(Skill::getDescription, SkillResponseDTO::setDescription);
        });

        modelMapper.typeMap(AuthDTO.class, User.class).addMappings(mapper -> {
            mapper.map(AuthDTO::getLogin, User::setLogin);
            mapper.map(AuthDTO::getPassword, User::setPassword);
        });

        modelMapper.typeMap(User.class, UserResponseDTO.class).addMappings(mapper -> {
            mapper.map(User::getId, UserResponseDTO::setId);
            mapper.map(User::getRole, UserResponseDTO::setRole);
            mapper.map(User::getLogin, UserResponseDTO::setLogin);
            mapper.map(User::getPassword, UserResponseDTO::setPassword);
        });

        return modelMapper;
    }

}
