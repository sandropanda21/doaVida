import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { BloodRequest } from '../types/blood';

export function useBloodRequests(initialUserId?: string) {
const [requests, setRequests] = useState<BloodRequest[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);
const { user } = useAuth();

const fetchRequests = async (filterUserId?: string) => {
try {
setLoading(true);
let query = supabase
.from('blood_requests')
.select('\*')
.order('created_at', { ascending: false });

      const targetUserId = filterUserId || initialUserId;
      if (targetUserId) {
        query = query.eq('user_id', targetUserId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRequests(data || []);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }

};

const createRequest = async (
requestData: Omit<BloodRequest, 'id' | 'created_at' | 'user_id' | 'status'>
) => {
if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('blood_requests')
      .insert({
        ...requestData,
        user_id: user.id,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    setRequests((prev) => [data, ...prev]);
    return data;

};

const updateRequest = async (id: string, updates: Partial<BloodRequest>) => {
const { data, error } = await supabase
.from('blood_requests')
.update(updates)
.eq('id', id)
.select()
.single();

    if (error) throw error;
    setRequests((prev) => prev.map((r) => (r.id === id ? data : r)));
    return data;

};

const deleteRequest = async (id: string) => {
const { error } = await supabase
.from('blood_requests')
.delete()
.eq('id', id);

    if (error) throw error;
    setRequests((prev) => prev.filter((r) => r.id !== id));

};

useEffect(() => {
fetchRequests();

    const subscription = supabase
      .channel('blood_requests_changes')
      .on(
        'postgres_changes' as any,
        { event: '*', table: 'blood_requests', schema: 'public' },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };

}, []);

return {
requests,
loading,
error,
fetchRequests,
createRequest,
updateRequest,
deleteRequest,
};
}
