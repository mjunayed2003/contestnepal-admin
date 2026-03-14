"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Section } from "./Types";
import { PersonalInfo } from "./PersonalInfo";
import { ChangePassword } from "./ChangePassword";
import { TextDocument } from "./TextDocument";
import { FAQSection } from "./FaqSection";
import { termsContent, privacyContent } from "./SettingData";

const menuItems: { key: Section; label: string }[] = [
  { key: "profile",  label: "Edit Personal Information" },
  { key: "password", label: "Change Password"           },
  { key: "terms",    label: "Terms & Conditions"        },
  { key: "privacy",  label: "Privacy Policy"            },
  { key: "faq",      label: "FAQ"                       },
];

export function SettingPage() {
  const [section, setSection] = useState<Section>("menu");
  const back = () => setSection("menu");

  if (section === "profile")  return <PersonalInfo onBack={back} />;
  if (section === "password") return <ChangePassword onBack={back} />;
  if (section === "terms")    return <TextDocument title="Terms & Conditions" initialContent={termsContent}   onBack={back} />;
  if (section === "privacy")  return <TextDocument title="Privacy Policy"     initialContent={privacyContent} onBack={back} />;
  if (section === "faq")      return <FAQSection onBack={back} />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-50">
      {menuItems.map((item) => (
        <button
          key={item.key}
          onClick={() => setSection(item.key)}
          className={`flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50/60 ${
            item.key === "terms" ? "bg-red-50/40" : ""
          }`}
        >
          <span className="text-sm font-medium text-gray-800">{item.label}</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      ))}
    </div>
  );
}