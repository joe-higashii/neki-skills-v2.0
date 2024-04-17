import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { api } from "@/services/axios";
import { setSessionItem } from "@/services/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SignUpRequest,
  LoginResponse,
  SignUpFormValues,
} from "@/types/authTypes";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <Card className="mx-auto my-32 h-max xl:w-1/3 lg:w-1/2 sm:w-2/3 pb-10 pt-3 px-2 md:pb-20 md:pt-6 md:px-4 ">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 relative ">
        {/* <img
          src="assets/dark.png"
          alt="Logo NekiSkills"
          width={250}
          className="mx-auto mt-0 mb-0 opacity-95"
        /> */}
        <Button
          variant="ghost"
          className="p-0 m-0 absolute left-0 top-0"
          onClick={() => navigate("/")}
        >
          <ArrowLeft />
        </Button>
        <CardHeader className="p-2 flex flex-col space-y-2 text-center ">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Cadastre-se
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Preencha seus dados e faça parte do NekiSkills
          </CardDescription>
        </CardHeader>
        <UserAuthForm />
      </div>
      <ToastContainer />
    </Card>
  );
}

function UserAuthForm() {
  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("O email deve ser válido")
      .required("* Campo obrigatório"),
    password: Yup.string().required("* Campo obrigatório"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais!")
      .required("* Campo obrigatório"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  async function onSubmit(data: SignUpFormValues) {
    const { email: login, password } = data;
    const reqBody: SignUpRequest = {
      login,
      password
    };

    api
      .post("/auth/signup", reqBody)
      .then((res: LoginResponse) => {
        setSessionItem("user", res.data);
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
        setTimeout(() => navigate("/home"), 1500);
      })
      .catch((err) => {
        toast.error(
          err.request.status == 409
            ? "Opa! Parece que alguém já se cadastrou com esse email."
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            className={errors.email ? "border-destructive" : ""}
            {...register("email")}
            id="email"
            placeholder="nome@email.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="py-2 text-muted-foreground text-xs leading-none ">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="relative grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              className={errors.password ? "border-destructive" : ""}
              {...register("password")}
              id="password"
              placeholder="Digite sua senha"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isSubmitting}
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

        <div className="flex flex-col gap-1">
          <Label className="sr-only" htmlFor="confirm-password">
            Confirmar Senha
          </Label>
          <Input
            className={errors.confirmPassword ? "border-destructive" : ""}
            {...register("confirmPassword")}
            id="confirm-password"
            placeholder="Confirme sua senha"
            type={showPassword ? "text" : "password"}
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isSubmitting}
          />
          {errors.confirmPassword && (
            <span className="py-2 text-muted-foreground text-xs leading-none ">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Cadastrar</span>
          )}
        </Button>
      </div>
    </form>
  );
}
