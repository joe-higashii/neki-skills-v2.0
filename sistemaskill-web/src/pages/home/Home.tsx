import Header from "@/components/Header";
// import MainCard from "@/components/MainCard";
import { SkillSearchBar } from "@/components/SkillSearchBar";
import UserSkillList from "@/components/UserSkillList";
import WelcomeSection from "@/components/WelcomeSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-y-5 pb-6">
      <Header />
      <main className="w-full h-full flex flex-col gap-y-8 px-4">
        <WelcomeSection />
        <SkillSearchBar />
        {/* <MainCard /> */}
        <UserSkillList />
      </main>
    </div>
  );
}
