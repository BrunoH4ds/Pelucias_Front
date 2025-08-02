import type { Admin } from "@/types/admin";

interface Props {
  user: Admin;
}

export default function SingleLastUserCard({ user }: Props) {
  return (
    <div className="bg-zinc-700 text-gray-200 flex items-center justify-between">
      <div>
        <p className="font-semibold">{user.username}</p>
      </div>
    </div>
  );
}
