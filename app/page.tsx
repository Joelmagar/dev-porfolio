import Image from "next/image";
import { Suspense } from "react";
import PageContent from "./pageContent";
import { Divide } from "lucide-react";

export default function Home() {
  const getLoading = (
    <div className="text-center h-screen w-screen place-content-center">
      Loading...
    </div>
  );
  return (
    <Suspense fallback={getLoading}>
      <PageContent />
    </Suspense>
  );
}
