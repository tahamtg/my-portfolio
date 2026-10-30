"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BreadCrumb() {
    const pathName = usePathname();
    const paths = pathName.split("/").filter(Boolean);

    return (
        <nav aria-label="breadcrumb">
            <Link href="/">خانه</Link>

            {paths.map((path, index) => {
                const href = "/" + paths.slice(0, index + 1).join("/");

                return (
                    <span key={href}>
                        {" / "}
                        <Link href={href}>
                            {path}
                        </Link>
                    </span>
                );
            })}
        </nav>
    );
}