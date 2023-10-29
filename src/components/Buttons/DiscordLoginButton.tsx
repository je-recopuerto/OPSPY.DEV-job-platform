import {Button} from "flowbite-react";
import {FaDiscord} from "react-icons/fa";
import {signIn} from "next-auth/react";

export default function DiscordLoginButton() {
  return (
    <Button
      onClick={async () => await signIn()}
      color={""}
      outline
      pill
    >
      <FaDiscord className={"mx-4 text-2xl"} />
      <p className={"tracking-widest"}>
        Continue with Discord
      </p>
    </Button>
  );
}