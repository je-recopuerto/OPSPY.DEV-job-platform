import Image from "next/image";

export default function Hero1() {
  return (
    <>
      <Image
        src={"/bghero.webp"}
        className={"absolute inset-0 z-[-10] object-cover"}
        alt={"hero"}
        layout={"fill"}
        objectFit={"cover"}
        objectPosition={"center"}
        quality={100}
        priority={true}
      />
    </>
  );
}
