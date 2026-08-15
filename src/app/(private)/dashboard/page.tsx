import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";

const DashboardRedirect = () => redirect(ROUTES.home);

export default DashboardRedirect;
