import { AlertTriangle } from "lucide-react";

export function AiNotice() {
  return (
    <div className="card-float relative overflow-hidden p-5 md:p-6">
      <div className="bg-soft-gradient absolute inset-0 opacity-70" aria-hidden />
      <div className="relative flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/80 text-[color:var(--purple-deep)] shadow-sm">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[color:var(--purple-deep)]">
            Responsible AI Notice
          </div>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">
            PhoziFlow AI uses Artificial Intelligence to assist with communication,
            planning and business insights. AI-generated content should always be
            reviewed by a human before being sent to customers or used for business
            decisions. The system does not replace human judgement.
          </p>
        </div>
      </div>
    </div>
  );
}
