import React, { useState } from 'react';
import { UploadForm } from '../upload/UploadForm';
import { AnalysisHistory } from '../analysis/AnalysisHistory';
import { Tabs } from '../layout/Tabs';
import { DashboardStats } from './DashboardStats';
import { DashboardHeader } from './DashboardHeader';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { useAuth } from '../../hooks/useAuth';

const tabs = [
  { id: 'new', label: 'New Analysis' },
  { id: 'history', label: 'Analysis History' }
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

      <QuickActions />

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
          </div>
        </div>
      </div>
    </div>
  );
}