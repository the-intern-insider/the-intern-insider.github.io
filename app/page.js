"use client";

import { useState } from "react";
import { X, ChefHat, Loader2, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addIngredient() {
    const trimmed = input.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
    }
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  }

  function removeIngredient(ing) {
    setIngredients((prev) => prev.filter((i) => i !== ing));
  }

  async function getSuggestions() {
    if (ingredients.length === 0) return;
    setLoading(true);
    setRecipes([]);
    setError("");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients })
      });

      if (!res.ok) throw new Error("Request failed.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      setRecipes(JSON.parse(fullText));
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <main className="max-w-3xl mx-auto px-4 py-12 pb-20">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ChefHat className="w-5 h-5 text-orange-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-orange-700">
              Fridge Chef
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-3">
            What can you make tonight?
          </h1>
          <p className="text-stone-500 text-lg max-w-md mx-auto">
            Add the ingredients you have and get instant AI recipe ideas.
          </p>
        </header>

        {/* Ingredient input card */}
        <Card className="mb-6 shadow-md border-stone-200 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-stone-700">
              Your ingredients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g. chicken, garlic, lemon..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="rounded-full bg-stone-50 border-stone-200 focus-visible:ring-orange-400"
              />
              <Button
                variant="outline"
                onClick={addIngredient}
                disabled={!input.trim() || loading}
                className="rounded-full border-stone-200 shrink-0"
              >
                Add
              </Button>
            </div>

            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <Badge
                    key={ing}
                    variant="secondary"
                    className="rounded-full px-3 py-1 bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100 gap-1 text-sm font-medium"
                  >
                    {ing}
                    <button
                      onClick={() => removeIngredient(ing)}
                      aria-label={`Remove ${ing}`}
                      className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 flex-wrap gap-3">
              <span className="text-sm text-stone-400">
                {ingredients.length === 0
                  ? "Add at least one ingredient to start."
                  : `${ingredients.length} ingredient${ingredients.length > 1 ? "s" : ""} added`}
              </span>
              <Button
                onClick={getSuggestions}
                disabled={ingredients.length === 0 || loading}
                className="rounded-full bg-orange-600 hover:bg-orange-700 text-white shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <UtensilsCrossed className="w-4 h-4 mr-2" />
                    What can I make?
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
            {error}
          </p>
        )}

        {/* Recipe results */}
        {recipes.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
              Here&apos;s what you can make
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <Card
                  key={recipe.name}
                  className="border-stone-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-lg leading-snug">
                      {recipe.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {recipe.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-bold uppercase tracking-wider text-orange-700 mb-2">
                      Steps
                    </p>
                    <ol className="space-y-1.5 text-sm text-stone-700 list-decimal list-inside">
                      {recipe.steps.map((step) => (
                        <li key={step} className="leading-snug">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
