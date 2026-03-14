"use client";

import { useState, useRef } from "react";
import { Camera, Pencil, Check } from "lucide-react";
import { BackButton } from "./BackButton";

interface Props {
  onBack: () => void;
}

export function PersonalInfo({ onBack }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName]       = useState("Admin User");
  const [email, setEmail]     = useState("admin@contestnepal.com");
  const [phone, setPhone]     = useState("9800000000");
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <BackButton label="Personal Information" onClick={onBack} />
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 rounded-lg bg-[#9B1C1C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1515] transition-colors"
          >
            <Pencil className="h-4 w-4" /> Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setEditing(false)}
            className="flex items-center gap-2 rounded-lg bg-[#9B1C1C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1515] transition-colors"
          >
            <Check className="h-4 w-4" /> Save Change
          </button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Avatar card */}
        <div className="flex w-52 shrink-0 flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-8">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
              <div className="flex h-full w-full items-center justify-center bg-[#9B1C1C] text-2xl font-bold text-white">
                AU
              </div>
            </div>
            {editing && (
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-gray-700/70 text-white hover:bg-gray-800/80"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" />
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Profile</p>
            <p className="text-base font-bold text-gray-800">{name}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-4 rounded-xl border border-gray-200 bg-white p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={!editing}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40 ${
                editing ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editing}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40 ${
                editing ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50"
              }`}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="flex gap-2">
              <button className="flex shrink-0 items-center gap-2 rounded-lg bg-[#9B1C1C] px-3 py-2.5 text-sm font-medium text-white">
                🇺🇸 +1
              </button>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly={!editing}
                className={`flex-1 rounded-lg border px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40 ${
                  editing ? "border-gray-300 bg-white" : "border-gray-200 bg-gray-50"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}