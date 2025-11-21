import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container px-4 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                SoulPrint
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            Discover your unique cognitive signature through AI-powered analysis.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/40 pt-8">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} SoulPrint. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
