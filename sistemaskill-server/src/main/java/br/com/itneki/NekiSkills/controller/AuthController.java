package br.com.itneki.NekiSkills.controller;

import br.com.itneki.NekiSkills.domain.User;
import br.com.itneki.NekiSkills.domain.UserRole;
import br.com.itneki.NekiSkills.dto.AuthDTO;
import br.com.itneki.NekiSkills.dto.LoginResponseDTO;
import br.com.itneki.NekiSkills.dto.SignUpDTO;
import br.com.itneki.NekiSkills.repository.UserRepository;
import br.com.itneki.NekiSkills.service.security.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;

    @SuppressWarnings("rawtypes")
    @PostMapping("/login")
    @Operation(summary = "Login de usuário", description = "Endpoint responsável por autenticar o usuário e então retornar seu respectivo token")
    @SecurityRequirement(name = "")
    public ResponseEntity login(@RequestBody @Valid AuthDTO data){
        if(this.userRepository.findUserByLogin(data.getLogin()) == null){
            return ResponseEntity.status(404).body("Error: User not found.");
        };
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getLogin(), data.getPassword());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @SuppressWarnings("rawtypes")
    @PostMapping("/signup")
    @Operation(summary = "Cadastro de usuário", description = "Endpoint responsável por salvar um novo usuário e retornar seu respectivo token")
    public ResponseEntity register(@RequestBody @Valid SignUpDTO data){
        if(this.userRepository.findUserByLogin(data.getLogin()) != null){
            return ResponseEntity.status(409).body("Error: User already registered.");
        };

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.getPassword());
        User savedUser = this.userRepository.save(new User(data.getLogin(), encryptedPassword, UserRole.USER));

        var usernamePassword = new UsernamePasswordAuthenticationToken(savedUser.getLogin(), data.getPassword());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }


}
