import { FileTextIcon, Pencil2Icon, PersonIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[900px] mx-auto pb-32">
      <TopMenuBar className="hidden md:flex" />
      <MobileBottomMenuBar className="flex md:hidden" />
      {children}
    </main>
  );
}

function TopMenuBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex justify-between items-center mb-12 px-8 py-2 mt-2 bg-white shadow-lg rounded-full ${className}`}
    >
      <div className="font-bold text-black texttext-slate-600-2xl">
        Min Strikkeapp
      </div>
      <ul className="flex gap-8">
        <li>
          <NavLink
            to="/recipes"
            className={({ isActive, isPending }) => {
              return `flex gap-1 items-center py-2 text-sm ${isActive ? "text-black" : "text-slate-600"}`;
            }}
          >
            {({ isActive, isPending }) => {
              return (
                <>
                  <FileTextIcon
                    className="size-5"
                    color={isActive ? "#000000" : "#999999"}
                  />
                  Oppskrifter
                </>
              );
            }}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive, isPending }) => {
              return `flex gap-1 items-center py-2 text-sm ${isActive ? "text-black" : "text-slate-600"}`;
            }}
          >
            {({ isActive, isPending }) => {
              return (
                <>
                  <Pencil2Icon
                    className="size-5"
                    color={isActive ? "#000000" : "#999999"}
                  />
                  Prosjekter
                </>
              );
            }}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive, isPending }) => {
              return `flex gap-1 items-center py-2 text-sm ${isActive ? "text-black" : "text-slate-600"}`;
            }}
          >
            {({ isActive, isPending }) => {
              return (
                <>
                  <PersonIcon
                    className="size-5"
                    color={isActive ? "#000000" : "#999999"}
                  />
                  Profil
                </>
              );
            }}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function MobileBottomMenuBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`fixed z-10 bottom-3 rounded-full bg-white px-4 left-12 right-12 shadow-2xl border-[1px] border-gray-200 ${className}`}
    >
      <div className="grid grid-cols-3 w-full gap-4">
        <NavLink
          to="/recipes"
          className={({ isActive, isPending }) => {
            return `flex flex-col gap-1 items-center py-2 text-[11px] ${isActive ? "font-bold text-black" : "text-slate-600"}`;
          }}
        >
          {({ isActive, isPending }) => {
            return (
              <>
                <FileTextIcon
                  className="size-5"
                  color={isActive ? "#000000" : "#999999"}
                />
                Oppskrifter
              </>
            );
          }}
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive, isPending }) => {
            return `flex flex-col gap-1 items-center py-2 text-[11px] ${isActive ? "font-bold text-black" : "text-slate-600"}`;
          }}
        >
          {({ isActive, isPending }) => {
            return (
              <>
                <Pencil2Icon
                  className="size-5"
                  color={isActive ? "#000000" : "#999999"}
                />
                Prosjekter
              </>
            );
          }}
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive, isPending }) => {
            return `flex flex-col gap-1 items-center py-2 text-[11px] ${isActive ? "font-bold text-black" : "text-slate-600"}`;
          }}
        >
          {({ isActive, isPending }) => {
            return (
              <>
                <PersonIcon
                  className="size-5"
                  color={isActive ? "#000000" : "#999999"}
                />
                Profil
              </>
            );
          }}
        </NavLink>
      </div>
    </div>
  );
}
