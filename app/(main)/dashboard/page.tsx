import { redirect } from "next/navigation";
import React from "react";
import { checkUser } from "@/actions/check-user";

const DashboardPage = async () => {
  const user = await checkUser();

  if (!user) redirect("/sign-in");

  return <div>DashboardPage</div>;
};

export default DashboardPage;
