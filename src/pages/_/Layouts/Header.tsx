import { memo } from "react";

export const Header: React.VFC = memo(() => {
  return (
    <header className="flex items-center">
      <div>logo</div>
      <nav>
        <ul className="flex items-center">
          <li>header-item</li>
        </ul>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
