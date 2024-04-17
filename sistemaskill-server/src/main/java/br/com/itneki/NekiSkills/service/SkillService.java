package br.com.itneki.NekiSkills.service;

import br.com.itneki.NekiSkills.domain.Skill;
import br.com.itneki.NekiSkills.dto.SkillResponseDTO;
import br.com.itneki.NekiSkills.repository.SkillRepository;
import br.com.itneki.NekiSkills.utils.UtilsMethods;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.hibernate.query.sqm.sql.ConversionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class SkillService {
    @Autowired
    private SkillRepository repository;

    @Autowired
    private UtilsMethods utilsMethods;

    public List<SkillResponseDTO> findAllSkills(String searchKey) {
        List<Skill> skillList;
        if (searchKey.isEmpty()) {
            skillList = repository.findAll();
        } else {
            skillList = repository.findByNameContainingIgnoreCase(searchKey);
        }
        return skillList.stream()
                .map(skill -> utilsMethods.fromBinaryToUrl(skill.getId(), Optional.of(skill)))
                .toList();
    }

    public SkillResponseDTO findSkillById(UUID id){
        Optional<Skill> skill = repository.findById(id);

        if(skill.isPresent()){
            return utilsMethods.fromBinaryToUrl(id, skill);
        }
        else{
            throw new NoSuchElementException("Error! Skill not found with id: " + id);
        }
    }

    public Skill findSkillImageById(UUID id){
        return repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Error! Skill not found with id: " + id)
        );
    }
    public Skill saveSkill(String jsonSkill, MultipartFile imagem) {
        try{
            Skill skill = convertSkillFromStringJson(jsonSkill);
            skill.setImage(imagem.getBytes());
            return repository.save(skill);
        }catch(IOException e){
            throw new ConversionException("Error! Can't convert skill image to bytes! Caused by:" + e.getCause());
        }
    }
    public Skill updateSkill(UUID id, Skill skill){
        Optional<Skill> skillFound = repository.findById(id);
        if(skillFound.isPresent())
            return repository.save(skill);
        else
            throw new NoSuchElementException("Error! Can't found skill with id: " + id);
    }

    public boolean deleteSkill(UUID id){
        Optional<Skill> skillFound = repository.findById(id);
        if (skillFound.isPresent())
        {
            repository.deleteById(id);
            return true;
        }
        else
            return false;
    }

    private Skill convertSkillFromStringJson(String skillJson) {
        Skill skill;
        try {
            ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
                    false);
            objectMapper.registerModule(new JavaTimeModule());
            skill = objectMapper.readValue(skillJson, Skill.class);
        } catch (IOException err) {
            throw new ConversionException("Error! Failed to convert to Skill Class. Caused by: "+ err.getCause());
        }
        return skill;
    }

}


