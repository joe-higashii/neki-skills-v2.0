package br.com.itneki.NekiSkills.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AuthDTO {
        private String login;
        private String password;
}
