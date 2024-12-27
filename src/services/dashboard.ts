import { supabase } from '../lib/supabase';
import { ApiError } from '../lib/errors';

interface DashboardStats {
  totalAnalyses: number;
  totalCandidates: number;
  totalJobs: number;
  recentAnalyses: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new ApiError('User not authenticated', 401);

    const [
      { count: totalAnalyses },
      { count: totalCandidates },
      { count: totalJobs },
      { count: recentAnalyses }
    ] = await Promise.all([
      supabase.from('analysis')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
      supabase.from('candidates')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
      supabase.from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
      supabase.from('analysis')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', oneWeekAgo.toISOString())
    ]);

    return {
      totalAnalyses: totalAnalyses || 0,
      totalCandidates: totalCandidates || 0,
      totalJobs: totalJobs || 0,
      recentAnalyses: recentAnalyses || 0
    };
  } catch (error) {
    throw new ApiError('Failed to fetch dashboard stats', 500);
  }
}