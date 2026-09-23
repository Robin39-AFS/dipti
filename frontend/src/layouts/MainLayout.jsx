import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#090B01] text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl">
        
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;