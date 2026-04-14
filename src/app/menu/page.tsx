import { redirect } from "next/navigation";

/** The original site's /menu panel was a duplicate of /deli; redirect. */
export default function MenuRedirect() {
  redirect("/deli");
}
