import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Send, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    content: "",
    contact: "",
    subject: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    let params = {
      email: formData?.email,
      name: formData?.name,
      send_to: "magarjoel8@gmail.com",
      company_name: "Joel magar",
      content: formData?.content,
      contact: formData?.contact,
    };

    emailjs
      .send("service_44k10g2", "portfolio_templateid123", params, {
        publicKey: "G30jRKTI2kAy25NYn",
      })
      .then(
        () => {
          toast.success("Success");
          setFormData({
            name: "",
            email: "",
            message: "",
            content: "",
            contact: "",
            subject: "",
          });
        },
        (error) => {
          toast.error("error");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="flex  items-center gap-4 w-full  text-primary   mx-auto text-2xl md:text-xl font-bold  mb-10">
          <span className="h-px bg-border flex-1 max-w-full" />
          <span className="font-mono relative w-fit mx-auto text-primary text-xl">
            04. What's next?
          </span>

          <span className="h-px bg-border flex-1 max-w-full" />
        </h2>
        <div className="text-center relative mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-gradient-to-br from-white via-primary w-fit mx-auto to-secondary bg-clip-text">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your next innovative project to life? Let's discuss
            how we can make it happen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-black/50 relative animate-pulse-glow ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageCircle className="h-5 w-5 text-primary" />
                Send a Message
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={onsubmit} className="space-y-6 ">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="glass border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="glass border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-foreground">
                    Number
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Your Number"
                    required
                    className="glass border-border/50 focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="glass border-border/50 focus:border-primary/50 resize-none"
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? "sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-black/50 animate-floating duration-100 ">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/20 ">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">
                      magarjoel8@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50   animate-floating duration-100 ">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-secondary/20 glow-secondary">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Kathmandu, Nepal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card className="bg-black/50  backdrop-blur-sm hover:animate-pulse-glow duration-500">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-semibold text-foreground">
                    Available for Projects
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Currently accepting new projects and collaborations
                </p>
              </CardContent>
            </Card>

            {/* Response Time */}
            <div className="text-center p-4 glass rounded-lg">
              <p className="text-sm text-muted-foreground">
                ⚡ Typical response time:{" "}
                <span className="text-primary font-semibold">24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
