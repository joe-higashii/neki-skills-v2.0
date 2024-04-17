import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function MainCard() {
  return (
    <Card className="h-52 w-full grid grid-cols-2 gap-1.5 items-center px-2">
      <CardContent className=" h-full w-full justify-center flex flex-col gap-5 p-0 px-2">
        <h1 className="text-lg font-normal text-left">
          <b>Aprimore suas habilidades</b> com o NekiSkills
        </h1>
        <Button className="w-full rounded-xl" variant="default">
          Saiba mais
        </Button>
      </CardContent>

      <CardContent className="p-0 m-0 h-48 w-full flex justify-center ">
        <img
          className="h-full w-full object-cover object-center rounded-xl opacity-40 "
          src="https://source.unsplash.com/random?technology"
          alt="Random Image"
        />
      </CardContent>
    </Card>
  );
}
