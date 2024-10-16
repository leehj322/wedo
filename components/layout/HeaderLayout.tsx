import { auth } from "@/auth";

import AuthHeader from "./AuthHeader";
import UnAuthHeader from "./UnAuthHeader";

export default async function HeaderLayout() {
  const session = await auth();

  return (
    <header className="fixed w-full bg-brand-header">
      <div className="lg-medium relative mx-auto flex h-[60px] max-w-[1440px] items-center px-4 tab:px-6">
        {session?.accessToken ? <AuthHeader /> : <UnAuthHeader />}
      </div>
    </header>
  );
}
