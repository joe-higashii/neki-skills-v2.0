import { AuthContext } from "@/context/AuthContext";
import { AuthContextType } from "@/types/authTypes";
import { useContext } from "react";

export default function WelcomeSection() {
  const { getUsername } = useContext(AuthContext) as AuthContextType;

  return (
    <section className="flex flex-row justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">
          Olá, <span className="capitalize">{getUsername()}</span>
        </h1>
        <span className="text-lg font-light text-muted-foreground">
          Bem-vindo(a)
        </span>
      </div>
    </section>
  );
}
