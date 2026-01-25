import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-border flex items-center px-4 justify-between bg-card/50 backdrop-blur-md sticky top-0 z-50">
          <span className="font-display font-bold text-lg">FinDash</span>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r border-border bg-card">
              <div className="flex flex-col h-full py-6">
                <div className="px-6 mb-8">
                  <h2 className="font-display font-bold text-xl">FinDash</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                  <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location === '/' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                    Overview
                  </Link>
                  <Link href="/market" className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location === '/market' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                    Market Data
                  </Link>
                  <Link href="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location === '/settings' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                    Settings
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
