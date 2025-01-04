interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="flex space-x-1 rounded-xl bg-gray-100/60 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                data-tab={tab.id}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                  }
                `}
              >
                {isActive && (
                  <span 
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 shadow-sm transition-all duration-200"
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
                {isActive && (
                  <span className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-blue-400/0 via-blue-400/70 to-blue-400/0" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Optional: Add a subtle decorative element */}
        <div className="hidden md:block ml-6 h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
      </div>
    </div>
  );
}