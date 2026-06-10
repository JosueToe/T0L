import Image from "next/image";

const LOGO_SRC = "/brand/logo-wordmark.png";

type BrandLogoProps = {
  size?: "header" | "footer";
  className?: string;
  priority?: boolean;
};

const sizeConfig = {
  header: {
    width: 180,
    height: 54,
    className: "h-10 w-auto md:h-11",
  },
  footer: {
    width: 200,
    height: 60,
    className: "h-11 w-auto md:h-12",
  },
} as const;

export function BrandLogo({
  size = "header",
  className = "",
  priority,
}: BrandLogoProps) {
  const config = sizeConfig[size];

  return (
    <Image
      src={LOGO_SRC}
      alt="T0L LLC"
      width={config.width}
      height={config.height}
      className={`${config.className} ${className}`.trim()}
      priority={priority ?? size === "header"}
    />
  );
}
