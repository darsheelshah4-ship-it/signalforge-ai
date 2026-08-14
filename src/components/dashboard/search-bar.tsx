import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const EXAMPLES = [
  "Show AI startups launched this week",
  "Find SaaS opportunities in healthcare",
  "What products are trending today?",
  "Which startup raised funding yesterday?",
];

export function SearchBar({
  defaultValue = "",
  autoFocus = false,
  compact = false,
  showExamples = false,
}: {
  defaultValue?: string;
  autoFocus?: boolean;
  compact?: boolean;
  showExamples?: boolean;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState(defaultValue);

  const submit = (q: string) => {
    const query = q.trim();
    if (!query) return;
    navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className={`relative group ${compact ? "" : "max-w-3xl"}`}
      >
        <Search
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35 ${
            compact ? "size-4" : "size-5"
          }`}
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={autoFocus}
          placeholder="Ask anything about startups…"
          className={`w-full rounded-xl border border-white/10 bg-white/4 text-white placeholder:text-white/30 outline-none transition-all focus:border-blue-400/50 focus:bg-white/6 focus:ring-[3px] focus:ring-blue-500/15 ${
            compact ? "h-10 pl-10 pr-10 text-sm" : "h-13 pl-12 pr-28 py-3.5 text-base"
          }`}
        />
        <Button
          type="submit"
          size={compact ? "sm" : "default"}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 gap-1.5"
          disabled={!value.trim()}
        >
          <Sparkles className="size-3.5" />
          {!compact && "Research"}
        </Button>
      </form>
      {showExamples && (
        <div className="mt-4 flex max-w-3xl flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setValue(ex);
                submit(ex);
              }}
              className="rounded-full border border-white/8 bg-white/3 px-3.5 py-1.5 text-xs text-white/55 transition-all hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
