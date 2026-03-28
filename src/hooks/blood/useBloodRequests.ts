import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BloodRequest } from '../../types/blood';

export function useBloodRequests() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRequests = async (filters?: {
    blood_type?: string;
    status?: string;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('blood_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.blood_type) {
        query = query.eq('blood_type', filters.blood_type);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      setError(err);
      console.error('Erro ao buscar pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel('blood_requests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blood_requests' },
        () => fetchRequests()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  console.log(requests);

  return {
    requests,
    loading,
    error,
    fetchRequests,
  };
}
