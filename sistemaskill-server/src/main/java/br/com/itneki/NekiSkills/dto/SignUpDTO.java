package br.com.itneki.NekiSkills.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SignUpDTO {
    private String login;
    private String password;
}
