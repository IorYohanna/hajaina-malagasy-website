"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Palette,
  Heart,
  Settings,
  LogOut,
  Handshake,
  BookOpen,
  Briefcase,
} from "lucide-react"; // Added Briefcase icon for services
import Header from "@/components/header";
import Link from "next/link"; // Import Link
import Footer from "@/components/footer"; // Added import

import ImageGenerator from "@/components/image-generator";
import Assistant from "@/components/Assistant";

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    if (!loggedIn) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserEmail(email);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  if (!isLoggedIn) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
              Mon Compte
            </h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Bienvenue, {userEmail} !
            </p>
            {/* <ImageGenerator /> */}
            <Assistant/>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="mt-8 bg-transparent border-gray-300 hover:border-black font-light tracking-[0.1em] uppercase"
            >
              Déconnexion
              <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {userRole === "creator" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
              <Card className="bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Palette className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">
                    Gérer mes Collections
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Ajoutez, modifiez ou supprimez vos collections et pièces.
                  </p>
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
                    Accéder
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">
                    Mes Services
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Gérez les services que vous proposez (stylisme, conseil,
                    etc.).
                  </p>
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
                    Gérer les Services
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Handshake className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">
                    Mes Collaborations
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Gérez vos partenariats et projets collaboratifs.
                  </p>
                  <Link href="/collaborations">
                    <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
                      Voir les Collaborations
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">
                    Mon Blog
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Créez et gérez vos articles de blog éthique et de mode.
                  </p>
                  <Link href="/blog">
                    <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
                      Gérer mon Blog
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">
                    Paramètres du Profil
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Mettez à jour vos informations personnelles et
                    professionnelles.
                  </p>
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
                    Modifier
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {userRole === "amateur" && (
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <Card className="bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">
                    Mes Favoris
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Retrouvez toutes les collections et créations que vous avez
                    aimées.
                  </p>
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
                    Voir mes Favoris
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-light mb-4 serif-font tracking-wide">
                    Paramètres du Compte
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    Gérez vos informations personnelles et vos préférences.
                  </p>
                  <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">
                    Modifier
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
      <Footer /> {/* Added Footer */}
    </div>
  );
}
