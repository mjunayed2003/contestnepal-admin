"use client";

import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { BackButton } from "./BackButton";
import { FAQItem } from "./Types";
import { initialFAQs } from "./SettingData";

interface Props {
  onBack: () => void;
}

export function FAQSection({ onBack }: Props) {
  const [faqs, setFaqs]           = useState<FAQItem[]>(initialFAQs);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQ, setEditQ]         = useState("");
  const [editA, setEditA]         = useState("");
  const [adding, setAdding]       = useState(false);
  const [newQ, setNewQ]           = useState("");
  const [newA, setNewA]           = useState("");
  const nextId = useRef(faqs.length + 1);

  function startEdit(faq: FAQItem) {
    setEditingId(faq.id);
    setEditQ(faq.question);
    setEditA(faq.answer);
  }

  function saveEdit() {
    setFaqs((prev) =>
      prev.map((f) => f.id === editingId ? { ...f, question: editQ, answer: editA } : f)
    );
    setEditingId(null);
  }

  function deleteFaq(id: number) {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  }

  function addFaq() {
    if (!newQ.trim() || !newA.trim()) return;
    setFaqs((prev) => [...prev, { id: nextId.current++, question: newQ, answer: newA }]);
    setNewQ(""); setNewA(""); setAdding(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <BackButton label="Update FAQ" onClick={onBack} />
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-[#9B1C1C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1515] transition-colors"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="w-12 px-5 py-3 text-left text-xs font-semibold text-gray-400">#</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400">Question</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400">Answer</th>
              <th className="w-20 px-5 py-3 text-left text-xs font-semibold text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* Add new row */}
            {adding && (
              <tr className="bg-blue-50/30">
                <td className="px-5 py-3 text-gray-400">—</td>
                <td className="px-5 py-3">
                  <input
                    value={newQ} onChange={(e) => setNewQ(e.target.value)}
                    placeholder="Enter question..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
                  />
                </td>
                <td className="px-5 py-3">
                  <input
                    value={newA} onChange={(e) => setNewA(e.target.value)}
                    placeholder="Enter answer..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40"
                  />
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={addFaq} className="rounded p-1 text-emerald-500 hover:bg-emerald-50">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setAdding(false)} className="rounded p-1 text-red-400 hover:bg-red-50">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {faqs.map((faq, idx) => (
              <tr key={faq.id} className={`hover:bg-gray-50/50 ${editingId === faq.id ? "bg-teal-50/30" : ""}`}>
                <td className="px-5 py-3.5 text-gray-500">{idx + 1}</td>
                <td className="max-w-[220px] px-5 py-3.5">
                  {editingId === faq.id ? (
                    <input value={editQ} onChange={(e) => setEditQ(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40" />
                  ) : (
                    <span className="font-medium text-gray-800">{faq.question}</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-gray-600">
                  {editingId === faq.id ? (
                    <input value={editA} onChange={(e) => setEditA(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#9B1C1C]/40" />
                  ) : (
                    <span className="line-clamp-2">{faq.answer}</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {editingId === faq.id ? (
                      <>
                        <button onClick={saveEdit} className="rounded p-1 text-emerald-500 hover:bg-emerald-50">
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="rounded p-1 text-gray-400 hover:bg-gray-100">
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(faq)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteFaq(faq.id)} className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}