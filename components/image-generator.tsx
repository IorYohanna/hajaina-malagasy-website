"use client";

import { useState } from "react";
import {
  Feather,
} from "lucide-react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setImage(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      const imageUrlObj = data?.choices?.[0]?.message?.images?.[0]?.image_url;
      const imageUrl = imageUrlObj?.url;

      if (typeof imageUrl === "string") {
        setImage(imageUrl);
      } else {
        console.warn("Aucune image trouvée dans la réponse.");
      }
    } catch (error) {
      console.error("Erreur lors de la génération :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Feather className="h-8 w-8 text-black" />
      </div>
      <h3 className="text-2xl font-light mb-4 serif-font tracking-wide text-center text-black">

         Crée ton look unique
      </h3>
      <p className="text-gray-600 mb-4 text-center font-light">
        Imaginez votre pièce de mode parfaite et laissez notre générateur transformer vos idées en images !
      </p>

      <textarea
        className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-white focus:outline-none transition-all mb-4 resize-none"
        rows={4}
        placeholder="Décris ton image... Par exemple: 'Une robe élégante rouge avec des motifs floraux, style vintage'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-gray-300 hover:bg-gray-500 text-black px-6 py-3 w-full rounded-xl font-semibold transition-colors shadow-md disabled:opacity-50"
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Création en cours..." : "Générer l'image"}
      </button>

      {image && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-light mb-2">✨ Voilà ton design !</p>
          <img
            src={image}
            alt="Image générée"
            className="max-w-full rounded-xl shadow-lg border border-gray-200"
          />
        </div>
      )}
    </div>

  );
}
