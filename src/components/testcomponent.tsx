"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LeftBar() {
  // random number
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(Math.random());
  }, []);

  return (
    <>
      {randomNumber}

      <Separator />

      <div className={"flex flex-row gap-4"}>
        <Link href={"/test/1"}>1</Link>

        <Link href={"/test/2"}>2</Link>
      </div>
    </>
  );
}
