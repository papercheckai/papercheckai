import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import ManageClassDialog from "../modal/manage.class";

type Props = { breadcrumbs?: { title: string; href: string }[]; page: string };

const SidebarHeader = ({ page, breadcrumbs }: Props) => {
  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-10">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs?.map((breadcrumb) => (
            <>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto">
        <ManageClassDialog />
      </div>
    </header>
  );
};

export default SidebarHeader;
