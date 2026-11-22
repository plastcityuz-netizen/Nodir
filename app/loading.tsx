import { getI18n } from "@/lib/i18n/server";

export default async function Loading() {
  const { dict } = await getI18n();
  return (
    <div className="wrap pt-32" aria-busy="true" aria-live="polite">
      <span className="sr-only">{dict.common.loading}</span>
      <div className="h-5 w-40 rounded-full skeleton" />
      <div className="mt-6 h-12 w-[76%] rounded-2xl skeleton" />
      <div className="mt-3 h-12 w-[54%] rounded-2xl skeleton" />
      <div className="mt-6 h-4 w-[60%] rounded-full skeleton" />
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-40 rounded-2xl skeleton" />
        ))}
      </div>
      <div className="mt-3 h-[320px] rounded-2xl skeleton" />
    </div>
  );
}
