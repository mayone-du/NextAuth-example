import Link from "next/link";
import { memo } from "react";

export const Header: React.VFC = memo(() => {
  return (
    <header className="flex justify-between items-center">
      <Link href="/">
        <a className="block">LOGO</a>
      </Link>
      <nav>
        <ul className="flex items-center">
          <li>
            <Link href="/sample">
              <a>sample</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
