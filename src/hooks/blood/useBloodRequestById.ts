import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BloodRequest } from '../../types/blood';

export function useBloodRequestById(id: string | undefined) {
  const [request, setRequest] = useState<BloodRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRequest = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blood_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setRequest(data || null);
    } catch (err: any) {
      setError(err);
      console.error('Erro ao buscar pedido por ID:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();

    // Realtime apenas para este ID específico
    if (!id) return;

    const channel = supabase
      .channel(`blood_request_${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blood_requests',
          filter: `id=eq.${id}`,
        },
        () => fetchRequest()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  return {
    request,
    loading,
    error,
    refetch: fetchRequest,
  };
}