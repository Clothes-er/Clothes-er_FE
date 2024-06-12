import Image from "next/image";

interface NextArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function NextArrow({
  className,
  style,
  onClick,
}: NextArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image
        src="/assets/icons/ic_next.svg"
        width={24}
        height={24}
        alt="back"
      />
    </div>
  );
}
