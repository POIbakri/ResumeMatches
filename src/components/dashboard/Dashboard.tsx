import { useState } from 'react';
import { UploadForm } from '../upload/UploadForm';
import { AnalysisHistory } from '../analysis/AnalysisHistory';
import { CandidateHistory } from '../history/CandidateHistory';
import { JobHistory } from '../history/JobHistory';
import { Tabs } from '../layout/Tabs';
import { DashboardStats } from './DashboardStats';
import { DashboardHeader } from './DashboardHeader';
import { RecentActivity } from './RecentActivity';
import { useAuth } from '../../hooks/useAuth';

const tabs = [
  { id: 'new', label: 'New Analysis' },
  { id: 'history', label: 'Analysis History' },
  { id: 'candidates', label: 'Previous Candidates' },
  { id: 'jobs', label: 'Previous Jobs' }
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('new');
  const { session } = useAuth();

  return (
    <div className="space-y-6">
      <DashboardHeader user={session?.user} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardStats />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          
          <div className="mt-6">
            {activeTab === 'new' && <UploadForm />}
            {activeTab === 'history' && <AnalysisHistory />}
            {activeTab === 'candidates' && <CandidateHistory />}
            {activeTab === 'jobs' && <JobHistory />}
          </div>
        </div>
      </div>
    </div>
  );
}