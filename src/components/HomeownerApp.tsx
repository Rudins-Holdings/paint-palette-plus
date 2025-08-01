import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Upload, Palette, Calculator, FileText, MessageSquare, Home } from "lucide-react";

const mockColors = [
  { name: "Cloud White", code: "OC-130", hex: "#F7F4F1" },
  { name: "Hale Navy", code: "HC-154", hex: "#485a68" },
  { name: "Simply White", code: "OC-117", hex: "#F9F7F4" },
  { name: "Aegean Teal", code: "2136-40", hex: "#4A8A8A" },
  { name: "Decorator's White", code: "OC-149", hex: "#F2F0EA" },
  { name: "Hunter Green", code: "2041-10", hex: "#355E3B" }
];

export const HomeownerApp = () => {
  const [activeTab, setActiveTab] = useState("visualizer");
  const [selectedColor, setSelectedColor] = useState(mockColors[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Home className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">PaintVision</h1>
                <p className="text-sm text-muted-foreground">Visualize Your Dream Home</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-accent text-accent-foreground">SJ</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Homeowner</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="visualizer">Color Visualizer</TabsTrigger>
            <TabsTrigger value="colors">Benjamin Moore</TabsTrigger>
            <TabsTrigger value="calculator">Price Calculator</TabsTrigger>
            <TabsTrigger value="project">My Project</TabsTrigger>
            <TabsTrigger value="feedback">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="visualizer" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Your Home Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Drop your photos here</p>
                  <p className="text-muted-foreground mb-4">Upload photos of rooms you want to paint</p>
                  <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    Choose Files
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Day View Simulation</h3>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Upload photo to see day view</p>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Night View Simulation</h3>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Upload photo to see night view</p>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Benjamin Moore Color Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Input placeholder="Search colors..." className="max-w-md" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockColors.map((color) => (
                    <Card 
                      key={color.code} 
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedColor.code === color.code ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      <CardContent className="p-4">
                        <div 
                          className="w-full h-20 rounded-lg mb-3 border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <h3 className="font-medium text-sm">{color.name}</h3>
                        <p className="text-xs text-muted-foreground">{color.code}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">Selected Color</h3>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <div>
                      <p className="font-medium">{selectedColor.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedColor.code}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Project Cost Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Room Type</label>
                      <select className="w-full p-2 border rounded-md mt-1">
                        <option>Living Room</option>
                        <option>Bedroom</option>
                        <option>Kitchen</option>
                        <option>Bathroom</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Room Size (sq ft)</label>
                      <Input type="number" placeholder="400" className="mt-1" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Paint Quality</label>
                      <select className="w-full p-2 border rounded-md mt-1">
                        <option>Premium ($45/gallon)</option>
                        <option>Standard ($35/gallon)</option>
                        <option>Basic ($25/gallon)</option>
                      </select>
                    </div>
                  </div>
                  
                  <Card className="p-4 bg-muted/20">
                    <h3 className="font-medium mb-4">Cost Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Paint & Materials:</span>
                        <span>$180</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Labor (12 hours):</span>
                        <span>$480</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preparation:</span>
                        <span>$120</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total Estimate:</span>
                        <span className="text-accent">$780</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                      Request Quote
                    </Button>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="project">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  My Painting Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Living Room & Kitchen</h3>
                      <p className="text-sm text-muted-foreground">123 Oak Street</p>
                      <div className="flex gap-2 mt-2">
                        <Badge>Cloud White</Badge>
                        <Badge>Hale Navy</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-2">In Progress</Badge>
                      <p className="font-bold text-accent">$3,200</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline">View Invoice</Button>
                    <Button variant="outline">Make Payment</Button>
                    <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                      Contact Painter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Reviews & Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Share your experience on Thumbtack and Angi</p>
                <div className="flex gap-4">
                  <Button variant="outline">Review on Thumbtack</Button>
                  <Button variant="outline">Review on Angi</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};