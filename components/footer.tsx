import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:luke@example.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Luke Laniog Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-semibold">Luke Larcena Laniog</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Luke Larcena Laniog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
