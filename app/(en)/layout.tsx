import { localeMetadata, RootDocument, rootViewport } from "@/components/RootDocument";

export const metadata = localeMetadata("en");
export const viewport = rootViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
