const stages = [
  { label: "Draft",           value: 2, color: "text-gray-500",    bg: "bg-gray-50",    border: "border-gray-200" },
  { label: "Active",          value: 4, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { label: "Closed",          value: 1, color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200" },
  { label: "Winner Declared", value: 1, color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200" },
];

export function ContestLifecycle() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 text-base font-semibold text-gray-800">
        Contest Lifecycle Overview
      </h2>
      <div className="flex items-center gap-2">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex flex-1 flex-col items-center justify-center rounded-xl border py-4 ${stage.bg} ${stage.border}`}
            >
              <span className={`text-2xl font-bold ${stage.color}`}>
                {stage.value}
              </span>
              <span className="mt-1 text-xs text-gray-500">{stage.label}</span>
            </div>
            {i < stages.length - 1 && (
              <span className="text-gray-300">›</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}