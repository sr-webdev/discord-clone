// import { ModeToggle } from "@/components/ui/mode-toggle";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";

const SetupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </header> */}
      {children}
    </>
  );
};

export default SetupLayout;
