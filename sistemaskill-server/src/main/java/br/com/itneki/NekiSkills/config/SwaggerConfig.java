package br.com.itneki.NekiSkills.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "Bearer Auth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
@OpenAPIDefinition(
        info = @Info(
                title = "${api.info.title}",
                version = "${api.info.version}",
                description = "${api.info.description}",
                contact = @Contact(name = "${api.info.contact.name}",
                                         url = "${api.info.contact.url}",
                                         email = "${api.info.contact.email}")
        ),
        security = @SecurityRequirement(name = "Bearer Auth"),
        servers = {
                @Server(url = "/", description = "Default Server URL")
        }
)

public class SwaggerConfig {
}
