import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export function useCreateBloodRequest() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createRequest = async (requestData: {
    patient_name: string;
    blood_type: string;
    bags_quantity: number;
    contact_phone: string;
    description: string;
  }) => {
    if (!user) throw new Error('Usuário não autenticado');

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .insert({
          ...requestData,
          province: user.user_metadata.province,
          hospital: 'MCA',
          user_id: user.id,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  return { createRequest, loading };
}
