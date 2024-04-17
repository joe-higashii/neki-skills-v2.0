package br.com.itneki.NekiSkills.controller;

import br.com.itneki.NekiSkills.domain.Skill;
import br.com.itneki.NekiSkills.dto.SkillResponseDTO;
import br.com.itneki.NekiSkills.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/skills")
public class SkillController {

    @Autowired
    SkillService service;

    @GetMapping
    @Operation(summary = "Listagem de todas as Skills", description = "Endpoint responsável por retornar todas as skills ou aqueles que se adequam ao filtro searchKey")
    public ResponseEntity<List<SkillResponseDTO>> findAllSkills(
            @RequestParam(defaultValue = "") String searchKey) {
        return new ResponseEntity<>(service.findAllSkills(searchKey), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "ADMIN | Retornar Skill por ID", description = "Endpoint responsável por retornar Skill com base no Id")
    public ResponseEntity<SkillResponseDTO> findSkillById(@PathVariable UUID id){
           return new ResponseEntity<>(service.findSkillById(id), HttpStatus.OK);
    }

    @GetMapping("/image/{id}")
    @Operation(summary = "Retornar Image da Skill por ID", description = "Endpoint responsável por retornar imagem da Skill")
    public ResponseEntity<?> findSkillImage(@PathVariable UUID id) {
        Skill skill = service.findSkillImageById(id);
        if (skill == null) {
            return new ResponseEntity<>(skill, HttpStatus.NOT_FOUND);
        } else {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", "image/jpeg");
            headers.set("Content-Disposition","inline; filename=\" "+ skill.getName() + " image");
            headers.set("Content-length", String.valueOf(skill.getImage().length));
            return new ResponseEntity<>(skill.getImage(), headers, HttpStatus.OK);
        }
    }


    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE,
                             MediaType.APPLICATION_JSON_VALUE })
    @Operation(summary = "ADMIN | Salvar nova Skill", description = "Endpoint responsável por salvar skill e sua imagem")

    public ResponseEntity<Skill> saveSkill(@RequestPart("image") MultipartFile image,
                                           @RequestPart("data") String skill){
        return new ResponseEntity<>(service.saveSkill(skill, image), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(summary = "ADMIN | Atualizar Skill", description = "Endpoint responsável por atualizar skill com base em seu id")

    public ResponseEntity<Skill> updateSkill(@PathVariable("id") UUID id,
                                             @RequestBody Skill skill){
        return new ResponseEntity<>(service.updateSkill(id, skill), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @Operation(summary = "ADMIN | Apagar skill", description = "Endpoint responsável por apagar skill com base em seu id")

    public ResponseEntity<Boolean> deleteSkillById(@PathVariable("id")UUID id){
        boolean isSkillDeleted = service.deleteSkill(id);
        return ResponseEntity.status(isSkillDeleted ? HttpStatus.OK : HttpStatus.NOT_FOUND).build();
    }
}
