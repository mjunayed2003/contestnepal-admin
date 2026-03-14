"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BackButton } from "./BackButton";
import { CornerBlob } from "./Cornerblob";

interface Props {
  onBack: () => void;
}

export function ChangePassword({ onBack }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw]     = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    if (newPw && newPw === confirm) {
      setSuccess(true);
      setCurrent(""); setNewPw(""); setConfirm("");
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  const fields = [
    { label: "Current Password", value: current, onChange: setCurrent, show: true,        toggle: undefined },
    { label: "New Password",      value: newPw,   onChange: setNewPw,   show: true,        toggle: undefined },
    { label: "Confirm Password",  value: confirm, onChange: setConfirm, show: showConfirm, toggle: () => setShowConfirm((v) => !v) },
  ];

  return (
    <div className="space-y-4">
      <BackButton label="Change Password" onClick={onBack} />

      {/*
        Outer container — full height, gray bg, clips blobs
        min-h matches the page content area so blobs fill the corners
      */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 min-h-[520px] flex items-center justify-center">

        {/*
          TOP-RIGHT blob
          Design specs: width 541px, height 1044px, top 394px, left -155px, angle -137.53deg
          Translated to CSS: positioned at top-right corner
          The SVG viewBox is 803×391 — we scale it via width/height
        */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 420,
            height: 810,
            top: -200,
            right: -120,
            transform: "rotate(-137.53deg)",
            transformOrigin: "center center",
          }}
        >
          <CornerBlob className="w-full h-full" />
        </div>

        {/*
          BOTTOM-LEFT blob — same shape, mirrored (rotate opposite)
        */}
        <div
          className="pointer-events-none absolute"
          style={{
            width: 380,
            height: 730,
            bottom: -180,
            left: -110,
            transform: "rotate(42.47deg)",
            transformOrigin: "center center",
          }}
        >
          <CornerBlob className="w-full h-full" />
        </div>

        {/* Password card */}
        <div className="relative z-10 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm mx-auto">
          <h2 className="mb-6 text-xl font-bold text-[#9B1C1C]">Change Password</h2>

          {success && (
            <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
              Password changed successfully!
            </div>
          )}

          <div className="space-y-4">
            {fields.map(({ label, value, onChange, show, toggle }) => (
              <div key={label} className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-400">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
                  />
                  {toggle && (
                    <button
                      onClick={toggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="mt-2 w-full rounded-lg bg-[#9B1C1C] py-3 text-sm font-semibold text-white hover:bg-[#7f1515] transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}