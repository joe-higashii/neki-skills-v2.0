package br.com.itneki.NekiSkills.dto;

import br.com.itneki.NekiSkills.domain.UserRole;
import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserResponseDTO {
    private UUID id;
    private String login;
    private String password;
    private UserRole role;
}
