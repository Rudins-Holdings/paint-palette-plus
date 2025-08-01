import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Camera, Palette, FileText, Star } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    client: "Sarah Johnson",
    address: "123 Oak Street",
    status: "In Progress",
    value: "$3,200",
    rooms: ["Living Room", "Kitchen"],
    colors: ["Benjamin Moore Cloud White", "Benjamin Moore Hale Navy"]
  },
  {
    id: 2,
    client: "Mike Davis",
    address: "456 Pine Avenue",
    status: "Scheduled",
    value: "$1,800",
    rooms: ["Bedroom", "Bathroom"],
    colors: ["Benjamin Moore Simply White", "Benjamin Moore Aegean Teal"]
  },
  {
    id: 3,
    client: "Lisa Chen",
    address: "789 Maple Drive",
    status: "Quote Sent",
    value: "$4,500",
    rooms: ["Entire First Floor"],
    colors: ["Benjamin Moore Decorator's White", "Benjamin Moore Hunter Green"]
  }
];

export const PainterApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Palette className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ProPaint Pro</h1>
                <p className="text-sm text-muted-foreground">Professional Painting Services</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">JP</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-medium">John's Painting Co.</p>
                <p className="text-sm text-muted-foreground">Licensed Painter</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="colors">Color Library</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,540</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Photos Uploaded</CardTitle>
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">Visualization requests</p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Client Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.9</div>
                  <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{project.client}</p>
                        <p className="text-sm text-muted-foreground">{project.address}</p>
                        <div className="flex gap-1">
                          {project.rooms.map((room, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{room}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant={project.status === "In Progress" ? "default" : "outline"}>
                          {project.status}
                        </Badge>
                        <p className="font-bold text-accent">{project.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Projects</h2>
              <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                New Project
              </Button>
            </div>
            
            <div className="grid gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id} className="shadow-elegant">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{project.client}</h3>
                        <p className="text-muted-foreground">{project.address}</p>
                      </div>
                      <Badge variant={project.status === "In Progress" ? "default" : "outline"}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Rooms:</p>
                        <div className="flex gap-2">
                          {project.rooms.map((room, idx) => (
                            <Badge key={idx} variant="secondary">{room}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Selected Colors:</p>
                        <div className="flex gap-2 flex-wrap">
                          {project.colors.map((color, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{color}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <p className="text-xl font-bold text-accent">{project.value}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">Manage Project</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="colors">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Benjamin Moore Color Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Access the complete Benjamin Moore color collection for your projects.</p>
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Browse Colors
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Quote Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Create and manage client quotes with automated pricing.</p>
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Create Quote
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Invoice & Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Generate invoices and collect payments via Stripe or Affirm.</p>
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Create Invoice
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};