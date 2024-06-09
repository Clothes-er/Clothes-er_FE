import Image from "next/image";

interface PrevArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function PrevArrow({
  className,
  style,
  onClick,
}: PrevArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image
        src="/assets/icons/ic_prev.svg"
        width={24}
        height={24}
        alt="back"
      />
    </div>
  );
}
