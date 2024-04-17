package br.com.itneki.NekiSkills.controller;

import br.com.itneki.NekiSkills.domain.User;
import br.com.itneki.NekiSkills.dto.UserResponseDTO;
import br.com.itneki.NekiSkills.service.UserService;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService service;
    @GetMapping
    @Operation(summary = "ADMIN | Listagem de usuários", description = "Endpoint responsável por listar todos os usuários")
    public ResponseEntity<List<UserResponseDTO>> findAllUsers(){
        return new ResponseEntity<>(service.findAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "ADMIN | Usuário por Id", description = "Endpoint responsável por retornar usuário com base em seu id")

    public ResponseEntity<UserResponseDTO> findUserById(@PathVariable UUID id){
        return new ResponseEntity<>(service.findUserById(id), HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "ADMIN | Salvar novo usuário", description = "Endpoint responsável por salvar novo usuário")

    public ResponseEntity<User> saveUser(@RequestBody User user){
        return new ResponseEntity<>(service.saveUser(user), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(summary = "ADMIN | Atualizar usuário", description = "Endpoint responsável por atualizar usuário com base em seu ID")
    public ResponseEntity<User> updateUser(@PathVariable("id") UUID id,
                                             @RequestBody User User){
        return new ResponseEntity<>(service.updateUser(id, User), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @Operation(summary = "ADMIN | Apagar usuário", description = "Endpoint responsável por apagar usuário com base em seu ID")

    public ResponseEntity<Boolean> deleteUserById(@PathVariable("id")UUID id) {
        boolean isUserDeleted = service.deleteUser(id);
        return ResponseEntity.status(isUserDeleted ? HttpStatus.OK : HttpStatus.NOT_FOUND).build();
    }
}
