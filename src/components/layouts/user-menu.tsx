"use client";
import * as React from "react";
import {
  ChevronsUpDown,
  HouseIcon,
  LogOutIcon,
  ShoppingBagIcon,
  User2Icon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useClerk, useSession } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import ManageClassDialog from "../modal/manage.class";
import { Button } from "../ui/button";

export function UserMenu({}: {}) {
  const { signOut, openUserProfile } = useClerk();
  const { session } = useSession();
  const router = useRouter();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:ring-0"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar>
                  <AvatarImage src={session?.user.imageUrl} alt="@shadcn" />
                  <AvatarFallback>
                    {session?.user.firstName?.at(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{session?.user.fullName}</span>
                <span className="">@{session?.user.username}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            <DropdownMenuItem
              onSelect={() => {
                router.push("/purchases");
              }}
            >
              <ShoppingBagIcon />
              Purchases
            </DropdownMenuItem>{" "}
            <ManageClassDialog
              trigger={
                <Button
                  variant={"ghost"}
                  className="flex justify-start gap-2 w-full text-left px-2 py-1.5"
                >
                  <HouseIcon className="w-4 h-4" /> Classes
                </Button>
              }
            />
            <DropdownMenuItem
              onSelect={() => {
                openUserProfile();
              }}
            >
              <User2Icon />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={async () => {
                try {
                  await signOut();
                } catch (error) {
                  console.log(error);
                }
                router.push("/");
              }}
            >
              <LogOutIcon /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
