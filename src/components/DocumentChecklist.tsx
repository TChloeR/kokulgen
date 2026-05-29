"use client";

import { useState } from "react";

type SourceLink = { label: string; url: string };

type Doc = {
  id: string;
  name: string;
  description: string | null;
  isMandatory: boolean;
  sourceLinks?: unknown;
};

export default function DocumentChecklist({ documents }: { documents: Doc[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const completed = documents.filter((d) => checked[d.id]).length;

  return (
    <div>
      <div className="mb-3 text-sm text-slate-500">
        {completed} / {documents.length} belge hazır
      </div>
      <ul className="space-y-2">
        {documents.map((doc) => {
          const links: SourceLink[] = Array.isArray(doc.sourceLinks)
            ? (doc.sourceLinks as SourceLink[])
            : [];
          return (
            <li
              key={doc.id}
              onClick={() => toggle(doc.id)}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                checked[doc.id]
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border ${
                  checked[doc.id]
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-300"
                }`}
              >
                {checked[doc.id] && "✓"}
              </span>
              <div className="flex-1">
                <span
                  className={`font-medium ${
                    checked[doc.id] ? "text-emerald-800 line-through" : "text-slate-900"
                  }`}
                >
                  {doc.name}
                  {!doc.isMandatory && (
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      (opsiyonel)
                    </span>
                  )}
                </span>
                {doc.description && (
                  <span className="block text-sm text-slate-500">{doc.description}</span>
                )}
                {links.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                    {links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm font-medium text-emerald-700 hover:underline"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
