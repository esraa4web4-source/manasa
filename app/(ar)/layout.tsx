import { localeMetadata, RootDocument, rootViewport } from "@/components/RootDocument";

export const metadata = localeMetadata("ar");
export const viewport = rootViewport;

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ar">{children}</RootDocument>;
}
