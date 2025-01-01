import { supabase } from '../lib/supabase';
import { ApiError } from '../lib/errors';
import { isDuplicateCandidate, isDuplicateJob } from '../lib/utils';

interface DashboardStats {
  totalAnalyses: number;
  uniqueCandidates: number;
  uniqueJobs: number;
  recentAnalyses: number;
  totalCandidates: number;
  totalJobs: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new ApiError('User not authenticated', 401);

    const [
      { count: totalAnalyses },
      { data: candidates },
      { data: jobs },
      { count: recentAnalyses }
    ] = await Promise.all([
      supabase.from('analysis')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
      supabase.from('candidates')
        .select('id, name, cv_text')
        .eq('user_id', user.id),
      supabase.from('jobs')
        .select('id, title, jd_text')
        .eq('user_id', user.id),
      supabase.from('analysis')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', oneWeekAgo.toISOString())
    ]);

    // Count unique candidates
    const uniqueCandidates = candidates?.reduce<Array<typeof candidates[0]>>((acc, current) => {
      const isDuplicate = acc.some(c => 
        isDuplicateCandidate(current.name, current.cv_text, [c])
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []) || [];

    // Count unique jobs
    const uniqueJobs = jobs?.reduce<Array<typeof jobs[0]>>((acc, current) => {
      const isDuplicate = acc.some(j => 
        isDuplicateJob(current.title, current.jd_text, [j])
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []) || [];

    return {
      totalAnalyses: totalAnalyses || 0,
      uniqueCandidates: uniqueCandidates.length,
      uniqueJobs: uniqueJobs.length,
      recentAnalyses: recentAnalyses || 0,
      totalCandidates: uniqueCandidates.length,
      totalJobs: uniqueJobs.length
    };
  } catch (error) {
    console.error('Dashboard stats error:', error);
    throw new ApiError('Failed to fetch dashboard stats', 500);
  }
}