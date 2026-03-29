import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { BloodRequest } from "../types/blood";

export function useUserRequests() {
  const [userRequests, setUserRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserRequests = async () => {
    try {
      setLoading(true);

      // 1. Obter o ID do utilizador logado
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Utilizador não autenticado");

      // 2. Filtrar pelo user_id
      const { data, error: queryError } = await supabase
        .from("blood_requests")
        .select("*")
        .eq("user_id", user.id) // Filtro crucial
        .order("created_at", { ascending: false });

      if (queryError) throw queryError;
      setUserRequests(data || []);
    } catch (err: any) {
      setError(err);
      console.error("Erro ao buscar pedidos do utilizador:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRequests();

    // Realtime: Atualiza se houver mudanças apenas nos pedidos do utilizador
    const channel = supabase
      .channel("user_requests_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blood_requests",
        },
        () => fetchUserRequests(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    userRequests,
    loading,
    error,
    refresh: fetchUserRequests,
  };
}
