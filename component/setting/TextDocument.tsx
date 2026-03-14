"use client";

import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { BackButton } from "./BackButton";

interface Props {
  title: string;
  initialContent: string;
  onBack: () => void;
}

export function TextDocument({ title, initialContent, onBack }: Props) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <BackButton label={title} onClick={onBack} />
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 rounded-lg bg-[#9B1C1C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1515] transition-colors"
          >
            <Pencil className="h-4 w-4" /> Edit
          </button>
        ) : (
          <button
            onClick={() => setEditing(false)}
            className="flex items-center gap-2 rounded-lg bg-[#9B1C1C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1515] transition-colors"
          >
            <Check className="h-4 w-4" /> Update
          </button>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        {editing && (
          <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-2">
            {["B", "I", "U"].map((t) => (
              <button key={t} className="rounded px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-100">{t}</button>
            ))}
            <div className="mx-1 h-4 w-px bg-gray-200" />
            {["≡", "≡", "≡"].map((t, i) => (
              <button key={i} className="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-100">{t}</button>
            ))}
          </div>
        )}

        {editing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none rounded-b-xl px-6 py-5 text-sm text-gray-700 leading-relaxed focus:outline-none"
            rows={20}
          />
        ) : (
          <div className="px-6 py-5">
            {content.split("\n").map((line, i) => {
              if (line.startsWith("Last Updated:"))
                return <p key={i} className="mb-4 font-semibold text-[#9B1C1C]">{line}</p>;
              if (/^\d+\./.test(line))
                return <p key={i} className="mt-4 mb-1 font-semibold text-gray-800">{line}</p>;
              if (line.startsWith("•"))
                return <p key={i} className="ml-4 text-sm text-gray-700 leading-relaxed">{line}</p>;
              if (line.startsWith("Contact Us"))
                return <p key={i} className="mt-4 font-semibold text-gray-800">{line}</p>;
              if (line === "")
                return <div key={i} className="h-1" />;
              return <p key={i} className="text-sm text-gray-700 leading-relaxed">{line}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}