import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { db } from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video bg-np-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create New Board</p>
            <span className="text-xs">
              {isPro
                ? "Unlimited Boards"
                : `${MAX_FREE_BOARDS - availableCount} Boards Remaining`}
            </span>
            <Hint
              sideOffset={40}
              description={`Free Workspaces Can Have Upto 5 Open Boards. For Unlimited Boards, Upgrade This Workspace.`}
            >
              <HelpCircle className="h-[14px] w-[14px] absolute bottom-2 right-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full" />
      <Skeleton className="aspect-video h-full w-full" />
      <Skeleton className="aspect-video h-full w-full" />
      <Skeleton className="aspect-video h-full w-full" />
      <Skeleton className="aspect-video h-full w-full" />
      <Skeleton className="aspect-video h-full w-full" />
      <Skeleton className="aspect-video h-full w-full" />
      <Skeleton className="aspect-video h-full w-full" />
    </div>
  );
};