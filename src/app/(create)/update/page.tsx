import { Suspense } from "react";
import UpdatePost from "./code";
import Loading from "@/components/loading";

export default function CodeVerifyPage() {
  return (
    <Suspense fallback={<Loading/>}>
      <UpdatePost />
    </Suspense>
  );
}
