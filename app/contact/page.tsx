"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Reach out directly via email or phone.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:luke@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                    luke@example.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">+63 123 456 7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Philippines</span>
                </div>
              </CardContent>
            </Card>

            {/* Direct Contact Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Let&apos;s Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  I&apos;m currently available for freelance projects, full-time opportunities, and technical collaborations. The quickest way to reach me is via email.
                </p>
                <Button size="lg" asChild>
                  <a href="mailto:luke@example.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
