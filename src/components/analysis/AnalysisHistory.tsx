import { useAnalysisHistory } from './hooks/useAnalysisHistory';
import { AnalysisCard } from './AnalysisCard';
import { AnalysisDetails } from './AnalysisDetails';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import { EmptyState } from '../feedback/EmptyState';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { ApiError } from '../../lib/errors';
import { ClockIcon, ChevronLeftIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const DATE_FILTERS = [
  { label: 'All Time', value: 'all' },
  { label: 'Last 7 Days', value: '7days' },
  { label: 'Last 30 Days', value: '30days' },
  { label: 'Last 90 Days', value: '90days' }
];

export function AnalysisHistory() {
  const { isLoading, error } = useAnalysisHistory();
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [userAnalyses, setUserAnalyses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const getCurrentUserAnalyses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new ApiError('User not authenticated', 401);

      const { data, error } = await supabase
        .from('analysis')
        .select('*, candidates(name), jobs(title)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserAnalyses(data || []);
    } catch (error) {
      console.error('Error fetching user analyses:', error);
    }
  };

  useEffect(() => {
    getCurrentUserAnalyses();
  }, []);

  const filteredAnalyses = useMemo(() => {
    return userAnalyses.filter(analysis => {
      // Search filter
      const searchTerm = searchQuery.toLowerCase();
      const candidateName = analysis.candidates?.name?.toLowerCase() || '';
      const jobTitle = analysis.jobs?.title?.toLowerCase() || '';
      const matchesSearch = !searchQuery || 
        candidateName.includes(searchTerm) || 
        jobTitle.includes(searchTerm);

      // Date filter
      const analysisDate = new Date(analysis.created_at);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - analysisDate.getTime()) / (1000 * 60 * 60 * 24));

      let matchesDate = true;
      if (dateFilter === '7days') matchesDate = daysDiff <= 7;
      if (dateFilter === '30days') matchesDate = daysDiff <= 30;
      if (dateFilter === '90days') matchesDate = daysDiff <= 90;

      return matchesSearch && matchesDate;
    });
  }, [userAnalyses, searchQuery, dateFilter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading analyses"
        description={error}
      />
    );
  }

  if (!userAnalyses.length) {
    return (
      <EmptyState
        title="No analyses yet"
        description="Start by analyzing a candidate's CV against a job description."
      />
    );
  }

  if (selectedAnalysis) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedAnalysis(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back to History</span>
        </button>
        <AnalysisDetails
          analysisId={selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <ClockIcon className="w-6 h-6 text-purple-600" />
          Analysis History
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          View and compare your previous analyses
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by candidate name or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2 min-w-[200px]">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {DATE_FILTERS.map(filter => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredAnalyses.length === 0 ? (
        <EmptyState
          title="No matching analyses"
          description="Try adjusting your search or filter criteria"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAnalyses.map((analysis) => (
            <div 
              key={analysis.id}
              className="transform transition-all duration-200 hover:scale-[1.02]"
            >
              <AnalysisCard
                analysis={analysis}
                onClick={() => setSelectedAnalysis(analysis.id ?? null)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}