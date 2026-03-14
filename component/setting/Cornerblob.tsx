interface Props {
  className?: string;
}

export function CornerBlob({ className }: Props) {
  return (
    <svg
      width="803"
      height="391"
      viewBox="0 0 803 391"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="397.135"
        cy="426.312"
        rx="270.676"
        ry="522.012"
        transform="rotate(137.527 397.135 426.312)"
        fill="url(#blob-grad)"
      />
      <defs>
        <linearGradient
          id="blob-grad"
          x1="327.533"
          y1="187.056"
          x2="187.888"
          y2="174.17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#990009" />
          <stop offset="0.500625" stopColor="#C21923" />
          <stop offset="1" stopColor="#990009" />
        </linearGradient>
      </defs>
    </svg>
  );
}