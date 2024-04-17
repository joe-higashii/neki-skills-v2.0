import React, { useContext, useState } from "react";
import { Button, Form, YStack, Label, H2 } from "tamagui";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  AuthContextType,
  LoginFormValues,
  LoginRequest,
  SignUpFormValues,
} from "../types/authTypes";
import Input from "../components/auth/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/AuthContext";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("O email deve ser válido")
    .required("* Campo obrigatório"),
  password: Yup.string().required("* Campo obrigatório"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais!")
    .required("* Campo obrigatório"),
});

export default function SignUp() {
  const { signUpUser } = useContext(AuthContext) as AuthContextType;
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const { control, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { errors, isSubmitting } = formState;

  const handleSignUp = (data: SignUpFormValues) => {
    const { email: login, password } = data;
    const reqBody: LoginRequest = {
      login,
      password,
    };
    signUpUser(reqBody);
  };

  return (
    <YStack bg="$backgroundStrong" f={1} jc="center" px={"$5"} gap={"$5"}>
      <H2 mx={"auto"} fontWeight={"600"}>
        Cadastre-se
      </H2>
      <YStack>
        <Form onSubmit={handleSubmit(handleSignUp)} gap="$5">
          {/*Input Email */}
          <YStack gap={"$2"}>
            <Label
              htmlFor="SignUpemail-input"
              fontWeight={"500"}
              fontSize={"$6"}
            >
              Email
            </Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur } }) => (
                <Input
                  id="SignUpemail-input"
                  placeholder="exemplo@email.com"
                  autoCorrect={false}
                  returnKeyType="next"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.email?.message}
                />
              )}
            />
          </YStack>
          {/*Input Senha */}
          <YStack gap={"$2"}>
            <Label
              htmlFor="signUppassword-input"
              fontWeight={"500"}
              fontSize={"$6"}
            >
              Senha
            </Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur } }) => (
                <Input
                  id="signUppassword-input"
                  placeholder="Senha"
                  secureTextEntry={showPassword}
                  autoCorrect={false}
                  returnKeyType="go"
                  style={{ position: "relative" }}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.password?.message}
                  disabled={isSubmitting}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 20,
                top: 45,
              }}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </TouchableOpacity>
          </YStack>

          {/*Input Confirmar Senha */}
          <YStack gap={"$2"}>
            <Label
              htmlFor="passwordConfirm-input"
              fontWeight={"500"}
              fontSize={"$6"}
            >
              Confirme a Senha
            </Label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur } }) => (
                <Input
                  id="passwordConfirm-input"
                  placeholder="Senha"
                  secureTextEntry={showPassword}
                  autoCorrect={false}
                  returnKeyType="go"
                  style={{ position: "relative" }}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.confirmPassword?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </YStack>

          <Form.Trigger asChild>
            <Button
              bg={"#2d939c"}
              fontSize={"$7"}
              h={"$5"}
              disabled={isSubmitting}
            >
              Cadastre-se
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </YStack>
  );
}
