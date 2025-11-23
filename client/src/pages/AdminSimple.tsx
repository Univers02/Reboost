import { useLocation } from "wouter";
import AdminDashboard from "./AdminDashboard";
import AdminLoans from "./AdminLoans";
import AdminUsers from "./AdminUsers";
import AdminContact from "./AdminContact";
import AdminSecurity from "./AdminSecurity";
import { ChatWidget } from "@/components/ChatWidget";

export default function AdminSimple() {
  const [location] = useLocation();

  let content;

  if (location === "/admin" || location === "/admin/") {
    content = <AdminDashboard />;
  } else if (location.startsWith("/admin/loans")) {
    content = <AdminLoans />;
  } else if (location.startsWith("/admin/users")) {
    content = <AdminUsers />;
  } else if (location.startsWith("/admin/contact")) {
    content = <AdminContact />;
  } else if (location.startsWith("/admin/security")) {
    content = <AdminSecurity />;
  } else {
    content = <AdminDashboard />;
  }

  return (
    <>
      {content}
      <ChatWidget />
    </>
  );
}
