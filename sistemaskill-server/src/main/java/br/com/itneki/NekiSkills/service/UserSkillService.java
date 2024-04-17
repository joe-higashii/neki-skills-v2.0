package br.com.itneki.NekiSkills.service;

import br.com.itneki.NekiSkills.domain.Skill;
import br.com.itneki.NekiSkills.domain.User;
import br.com.itneki.NekiSkills.domain.UserSkill;
import br.com.itneki.NekiSkills.domain.UserSkillKey;
import br.com.itneki.NekiSkills.dto.UserSkillRequestDTO;
import br.com.itneki.NekiSkills.dto.UserSkillResponseDTO;
import br.com.itneki.NekiSkills.repository.SkillRepository;
import br.com.itneki.NekiSkills.repository.UserRepository;
import br.com.itneki.NekiSkills.repository.UserSkillRepository;
import br.com.itneki.NekiSkills.utils.UtilsMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserSkillService {

    @Autowired
    UserSkillRepository repository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SkillRepository skillRepository;

    @Autowired
    UtilsMethods utilsMethods;

    public Page<UserSkillResponseDTO> findUserSkillsByUser(UUID userId, Pageable pageable) {
        userRepository.findById(userId)
                      .orElseThrow(() -> new NoSuchElementException("Error! Cannot find user with id: " + userId));

        Page<UserSkill> userSkillPage = repository.findUserSkillsByUserId(userId, pageable);
        return userSkillPage.map(userSkill -> utilsMethods.userSkillResponseDTOFactory(userSkill));
    }


    public UserSkillResponseDTO updateSkillLevelByUser(UserSkillRequestDTO userSkillRequestDTO) {
        UserSkillKey userSkillKey = new UserSkillKey(userSkillRequestDTO.getUserId(), userSkillRequestDTO.getSkillId());
        Optional<UserSkill> userSkill = repository.findById(userSkillKey);

        if (userSkill.isEmpty()){
            throw new NoSuchElementException("Error! Cannot update UserSkill, id not found: " + userSkillKey);
        }

        User user = userRepository.findById(userSkillRequestDTO.getUserId())
                .orElseThrow(() -> new NoSuchElementException("Error! Cannot find user with id: " + userSkillRequestDTO.getUserId()));

        Skill skill = skillRepository.findById(userSkillRequestDTO.getSkillId())
                .orElseThrow(() -> new NoSuchElementException("Error! Cannot find skill with id: " + userSkillRequestDTO.getSkillId()));

        UserSkill userSkillUpdated = repository.save(new UserSkill(userSkillKey, user, skill, userSkillRequestDTO.getSkillLevel()));

        return utilsMethods.userSkillResponseDTOFactory(userSkillUpdated);
    }

    public UserSkill linkSkillWithUser(UserSkillRequestDTO userSkillRequestDTO) {
        UserSkillKey userSkillKey = new UserSkillKey(userSkillRequestDTO.getUserId(), userSkillRequestDTO.getSkillId());
        User user = userRepository.findById(userSkillRequestDTO.getUserId())
                .orElseThrow(() -> new NoSuchElementException("Error! Cannot find user with id: " + userSkillRequestDTO.getUserId()));
        Skill skill = skillRepository.findById(userSkillRequestDTO.getSkillId())
                .orElseThrow(() -> new NoSuchElementException("Error! Cannot find skill with id: " + userSkillRequestDTO.getSkillId()));
        return repository.save(new UserSkill(userSkillKey, user, skill, userSkillRequestDTO.getSkillLevel()));
    }

    public boolean unlinkSkillWithUser(UUID userId, UUID skillId) {
        UserSkillKey userSkillKey = new UserSkillKey(userId, skillId);

        Optional<UserSkill> userSkillFound = repository.findById(userSkillKey);
        if (userSkillFound.isPresent()) {
            repository.delete(userSkillFound.get());
            return true;
        } else
            throw new NoSuchElementException("Error! User Id or Skill Id cannot be found!");
    }

    public Page<UserSkillResponseDTO> sortUserSkills(UUID userId, Pageable pageable, String sortBy) {
        userRepository.findById(userId)
                      .orElseThrow(() -> new NoSuchElementException("Error! Cannot find user with id: " + userId));
    
        Sort sort = Sort.by(sortBy);
    
        Page<UserSkill> userSkillPage = repository.findUserSkillsByUserId(userId, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort));
        return userSkillPage.map(userSkill -> utilsMethods.userSkillResponseDTOFactory(userSkill));
    }

}
