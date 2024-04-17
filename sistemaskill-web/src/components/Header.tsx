import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
export default function Header() {
  const authContext = useContext(AuthContext);
  if (authContext == null) {
    return null;
  }
  const { logout } = authContext;

  return (
    <header className="h-20 px-6 py-4 flex items-center justify-end border-b object-contain">
      {/* <img
        src="./assets/dark.png"
        alt="Logo NekiSkills"
        height={"100%"}
        width={150}
      /> */}
      <div className="flex items-center gap-3">
        <Separator orientation="vertical" className="h-6" />
        <Button variant={"outline"} onClick={() => logout()}>
          <span>Logout</span>
          <LogOut className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </header>
  );
}
