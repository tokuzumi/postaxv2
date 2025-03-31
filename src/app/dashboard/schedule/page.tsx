import { Suspense } from "react";
import { CreatePostForm } from "@/components/schedule/create-post-form";
import { UpcomingPosts } from "@/components/schedule/upcoming-posts";

export const metadata = {
  title: "Agendar Conteúdo | Postax",
  description: "Agende e gerencie seus posts nas redes sociais",
};

export default async function SchedulePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Agendar Conteúdo</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg">
            <Suspense fallback={<LoadingForm />}>
              <CreatePostForm />
            </Suspense>
          </div>
        </div>
        
        <div>
          <div className="bg-[#1D1F2B] rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Posts Agendados</h2>
            <Suspense fallback={<LoadingPosts />}>
              <UpcomingPosts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingForm() {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-center text-gray-400">
        Carregando formulário...
      </p>
    </div>
  );
}

function LoadingPosts() {
  return (
    <div className="flex items-center justify-center h-40">
      <p className="text-center text-gray-400">
        Carregando posts agendados...
      </p>
    </div>
  );
} 