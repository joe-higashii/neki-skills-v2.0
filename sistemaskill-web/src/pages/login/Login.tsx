/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import { LogIn, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { api } from "@/services/axios";
import { setLocalItem, setSessionItem } from "@/services/storage";
import "react-toastify/dist/ReactToastify.css";
import {
  AuthContextType,
  LoginFormValues,
  LoginRequest,
  LoginResponse,
} from "@/types/authTypes";

import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    isAuthenticated() ? navigate("/home") : "";
  }, []);

  return (
    <Card className="mx-auto my-32 h-max xl:w-1/3 lg:w-1/2 sm:w-2/3 p-8 md:p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 ">
        {/* <img
          src=""
          alt="Logo NekiSkills"
          width={250}
          className="mx-auto mt-3 mb-0 opacity-95"
        /> */}
        <CardHeader className="flex flex-col space-y-2 text-center pt-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Faça Login
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Digite seus dados abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <UserAuthForm />
      </div>
      <ToastContainer />
    </Card>
  );
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
function UserAuthForm({ className }: UserAuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("O email deve ser válido")
      .required("* Campo obrigatório"),
    password: Yup.string().required("* Campo obrigatório"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { errors, isSubmitting } = formState;

  async function onSubmit(data: LoginFormValues) {
    const { email: login, password } = data;
    const reqBody: LoginRequest = {
      login,
      password,
    };

    api
      .post("/auth/login", reqBody)
      .then((res: LoginResponse) => {
        rememberUser
          ? setLocalItem("user", res.data)
          : setSessionItem("user", res.data);

        toast.success("Cadastro realizado com sucesso, redirecionando...", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: false,
          draggable: false,
          pauseOnHover: false,
          theme: "colored",
        });
        reset();
        navigate("/home");
      })
      .catch((err) => {
        toast.error(
          err.request.status == 404
            ? "Opa! Parece que você ainda não está cadastrado."
            : "Aconteceu algum problema ao realizar sua requisição.",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: false,
            draggable: false,
            pauseOnHover: false,
            theme: "colored",
          }
        );
      });
  }

  return (
    <div className={cn("grid gap-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="nome@email.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              className={errors.email ? "border-destructive" : ""}
              {...register("email")}
            />
            {errors.email && (
              <span className="py-2 text-muted-foreground text-xs leading-none ">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="grid gap-1">
            <div className="relative">
              <Label className="sr-only" htmlFor="password">
                Senha
              </Label>
              <Input
                id="password"
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isSubmitting}
                className={errors.password ? "border-destructive " : ""}
                {...register("password")}
              />
              {showPassword ? (
                <EyeOff
                  className="absolute top-0 bottom-0 my-auto right-3 w-6 h-6 text-gray-500 hover:cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  className="absolute top-0 bottom-0 my-auto right-3 w-6 h-6 text-gray-500 hover:cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            {errors.password && (
              <span className="py-2 text-muted-foreground text-xs leading-none ">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button disabled={isSubmitting}>
            {isSubmitting ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Entrar</span>
            )}
          </Button>
        </div>

        <div className="flex flex-row gap-3 mt-5 w-full items-center justify-start">
          <Checkbox
            onCheckedChange={() => setRememberUser(!rememberUser)}
            id="rememberMe"
          />
          <label
            htmlFor="rememberMe"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Lembrar-me
          </label>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-5 text-muted-foreground">
            Não tem conta?
          </span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isSubmitting}>
        <Link
          to={"/signup"}
          className="flex flex-row gap-2 items-center justify-center"
        >
          {isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Cadastre-se</span>
            </>
          )}
        </Link>
      </Button>
    </div>
  );
}
