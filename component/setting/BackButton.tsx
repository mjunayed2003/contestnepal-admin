import { ArrowLeft } from "lucide-react";

interface Props {
  label: string;
  onClick: () => void;
}

export function BackButton({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}