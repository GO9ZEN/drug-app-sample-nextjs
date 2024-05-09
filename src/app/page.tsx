import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-blue-100 h-[100vh] flex items-center justify-center gap-8 md:flex-row flex-col">
      <Link href="/add-drugs">
        <Button className="bg-green-600">Add New Drugs</Button>
      </Link>
      <Link href="/drugs-list">
        <Button className="bg-green-600">View Drugs List</Button>
      </Link>
    </div>
  );
}
