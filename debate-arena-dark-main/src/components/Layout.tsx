
import { Outlet } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userInterests");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/81596756-2619-4662-8158-63551a3f4c03.png" 
                alt="Debate.io Logo" 
                className="w-8 h-8 mr-2" 
              />
              <h1 
                className="text-2xl font-bold text-primary cursor-pointer" 
                onClick={() => navigate("/topics")}
              >
                Debate.io
              </h1>
            </div>
            <NavigationMenu className="ml-6">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Topics</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <div className="font-medium">Browse topics by category</div>
                      <div className="grid grid-cols-2 gap-2">
                        <NavigationMenuLink className="cursor-pointer hover:bg-muted p-2 rounded-md text-sm">Politics & Governance</NavigationMenuLink>
                        <NavigationMenuLink className="cursor-pointer hover:bg-muted p-2 rounded-md text-sm">Ethics & Morality</NavigationMenuLink>
                        <NavigationMenuLink className="cursor-pointer hover:bg-muted p-2 rounded-md text-sm">Science & Technology</NavigationMenuLink>
                        <NavigationMenuLink className="cursor-pointer hover:bg-muted p-2 rounded-md text-sm">Health & Medicine</NavigationMenuLink>
                      </div>
                      <Button variant="outline" onClick={() => navigate("/interests")} className="mt-2">
                        Change My Interests
                      </Button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Trending</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <div className="font-medium">Today's trending debates</div>
                      <div className="grid grid-cols-1 gap-2">
                        <NavigationMenuLink className="cursor-pointer hover:bg-muted p-2 rounded-md text-sm">
                          Should AI systems have the same rights as humans?
                        </NavigationMenuLink>
                        <NavigationMenuLink className="cursor-pointer hover:bg-muted p-2 rounded-md text-sm">
                          Is universal basic income a viable solution to automation-induced unemployment?
                        </NavigationMenuLink>
                        <NavigationMenuLink className="cursor-pointer hover:bg-muted p-2 rounded-md text-sm">
                          Does social media do more harm than good for society?
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Log out</Button>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-border py-4 mt-auto">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          © 2025 Debate.io - A platform for structured intellectual discourse
        </div>
      </footer>
    </div>
  );
};

export default Layout;
