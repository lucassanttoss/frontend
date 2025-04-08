export const ArrowIcon = ({
  direction,
  stroke,
}: {
  direction: "left" | "right";
  stroke: string;
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${direction === "right" ? "rotate-180" : ""}`}
  >
    <title>{direction === "left" ? "Página anterior" : "Próxima página"}</title>
    <path
      d="M14 18L8 12L14 6"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchIcon = ({ stroke }: { stroke: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Search</title>
    <path
      d="M11.9167 20.5833C16.7031 20.5833 20.5833 16.7031 20.5833 11.9167C20.5833 7.1302 16.7031 3.25 11.9167 3.25C7.1302 3.25 3.25 7.1302 3.25 11.9167C3.25 16.7031 7.1302 20.5833 11.9167 20.5833Z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.75 22.75L18.0917 18.0917"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
