import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  YStack,
  Label,
  Checkbox,
  XStack,
  H2,
  CheckboxProps,
  Stack,
} from "tamagui";
import { Eye, EyeOff, Check } from "@tamagui/lucide-icons";
import { TouchableOpacity, Image } from "react-native";
import { Link } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import {
  AuthContextType,
  LoginFormValues,
  LoginRequest,
} from "../types/authTypes";
import { Text } from "tamagui";
import Input from "../components/auth/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/AuthContext";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("O email deve ser válido")
    .required("* Campo obrigatório"),
  password: Yup.string().required("* Campo obrigatório"),
});

export default function Login() {
  const { signInUser } = useContext(AuthContext) as AuthContextType;

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [rememberUser, setRememberUser] = useState<boolean>(false);

  const { control, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { errors, isSubmitting } = formState;

  const handleLogin = (data: LoginFormValues) => {
    const { email: login, password } = data;
    const reqBody: LoginRequest = {
      login,
      password,
    };
    signInUser(reqBody, rememberUser);
  };

  return (
    <YStack bg="$backgroundStrong" f={1} jc="center" px={"$5"} gap={"$5"}>
      <Stack w="100%" px="auto" jc="center" ai="center">
        <Image
          style={{
            width: 190,
            height: 80,
            resizeMode: "contain",
          }}
          source={require("../../assets/dark.png")}
        />
      </Stack>

      <H2 mx={"auto"} fontWeight={"600"}>
        Faça seu Login
      </H2>
      <YStack>
        <Form onSubmit={handleSubmit(handleLogin)} gap="$5">
          {/*Input Email */}
          <YStack gap={"$2"}>
            <Label
              htmlFor="Login_email-input"
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
                  id="Login_email-input"
                  placeholder="exemplo@email.com"
                  returnKeyType="next"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.email?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </YStack>

          {/*Input Senha */}
          <YStack gap={"$2"}>
            <Label
              htmlFor="Login_password-input"
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
                  id="Login_password-input"
                  placeholder="Sua senha"
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

          <CheckBox
            label={"Lembrar-me"}
            rememberCredentials={rememberUser}
            setRememberCredentials={setRememberUser}
          />

          <Form.Trigger asChild>
            <Button
              bg={"#2d939c"}
              fontSize={"$7"}
              h={"$5"}
              disabled={isSubmitting}
            >
              Entrar
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>

      {/* Create Account Component */}
      <XStack ai="center" jc="center" gap={"$2"}>
        <Text fontFamily="$body" fontWeight={"$10"}>
          Ainda não possui uma conta?
        </Text>
        <Link to={"/Signup"}>
          <Text
            fontFamily="$body"
            color="#2d939c"
            fontSize={18}
            fontWeight={"800"}
          >
            Cadastre-se
          </Text>
        </Link>
      </XStack>
    </YStack>
  );
}

type CheckBoxType = CheckboxProps & {
  rememberCredentials?: boolean;
  setRememberCredentials?: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
};
function CheckBox({
  label,
  rememberCredentials,
  setRememberCredentials = () => {},
  ...rest
}: CheckBoxType) {
  return (
    <XStack jc={"flex-start"} ai={"center"} gap={"$3"}>
      <Checkbox
        size="$4"
        id="remember"
        onCheckedChange={() => setRememberCredentials(!rememberCredentials)}
      >
        <Checkbox.Indicator>
          <Check />
        </Checkbox.Indicator>
      </Checkbox>
      <Label size={"$4"} htmlFor={"remember"}>
        {label}
      </Label>
    </XStack>
  );
}
