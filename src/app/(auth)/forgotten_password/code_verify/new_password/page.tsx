import { Suspense } from "react";
import CodeVerify from "./code";
import Loading from "@/components/loading";

export default function CodeVerifyPage() {
  return (
    <Suspense fallback={<Loading/>}>
      <CodeVerify />
    </Suspense>
  );
}
