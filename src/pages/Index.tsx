import { useState } from "react";
import { PainterApp } from "@/components/PainterApp";
import { HomeownerApp } from "@/components/HomeownerApp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Home, ArrowRight } from "lucide-react";

const Index = () => {
  const [userType, setUserType] = useState<'painter' | 'homeowner' | null>(null);

  if (userType === 'painter') {
    return <PainterApp />;
  }

  if (userType === 'homeowner') {
    return <HomeownerApp />;
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="/Property Management App Logo.png" 
              alt="RealWize Pro Logo" 
              className="h-32 max-w-full mx-auto mb-6 object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            Professional Painting Platform
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Connect homeowners with professional painters. Visualize colors, get quotes, and manage projects seamlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-elegant hover:shadow-lg transition-all cursor-pointer group" onClick={() => setUserType('painter')}>
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-glow mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Palette className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Professional Painter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Manage client projects</li>
                <li>• Benjamin Moore color library</li>
                <li>• Automated pricing & quotes</li>
                <li>• Invoice generation</li>
                <li>• Payment processing</li>
                <li>• Review management</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground group-hover:shadow-lg transition-all">
                Enter as Painter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-lg transition-all cursor-pointer group" onClick={() => setUserType('homeowner')}>
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-accent/80 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="w-8 h-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">Homeowner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Upload home photos</li>
                <li>• Visualize paint colors</li>
                <li>• Day/night simulations</li>
                <li>• Get instant quotes</li>
                <li>• Secure payments</li>
                <li>• Leave reviews</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-accent to-accent/80 text-accent-foreground group-hover:shadow-lg transition-all">
                Enter as Homeowner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-white/70">
            Demo Mode - Choose your role to explore the platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
