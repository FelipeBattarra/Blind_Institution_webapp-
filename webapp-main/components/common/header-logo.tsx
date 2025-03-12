import Image from "next/image";
import Link from "next/link";

const HeaderLogo = ({ title }: { title?: string }) => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logo.png" alt="logo" height={28} width={28} />
        <p className="font-semibold text-white font-2xl ml-2.5">{title}</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
