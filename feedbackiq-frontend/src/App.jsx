import React, { useState } from 'react';
import { Home, BarChart2, Upload } from 'lucide-react';
import LandingView from './components/LandingView';
import UploadView from './components/UploadView';
import DashboardView from './components/DashboardView';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing' | 'upload' | 'dashboard'
  const [activeReportId, setActiveReportId] = useState(null);

  const handleUploadSuccess = (reportId) => {
    setActiveReportId(reportId);
    setActiveTab('dashboard');
  };

  const handleNavigateToUpload = () => {
    setActiveTab('upload');
  };

  return (
    <div className="app-container">
      {/* Background Decorative Blurs */}
      <div 
        className="ambient-glow glow-mint" 
        style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }}
      />
      <div 
        className="ambient-glow glow-lavender" 
        style={{ width: '450px', height: '450px', bottom: '10%', right: '-150px' }}
      />

      {/* Navigation Header */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div 
            className="text-headline-md" 
            style={{ 
              fontWeight: 800, 
              color: 'var(--primary)', 
              letterSpacing: '-0.04em',
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('landing')}
          >
            FeedbackIQ
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="nav-btn" 
              onClick={() => setActiveTab('landing')}
              style={{ 
                color: activeTab === 'landing' ? 'var(--primary-accent)' : 'var(--on-surface-variant)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Home size={16} />
              Platform
            </button>
            <button 
              className="nav-btn" 
              onClick={() => setActiveTab('upload')}
              style={{ 
                color: activeTab === 'upload' ? 'var(--primary-accent)' : 'var(--on-surface-variant)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Upload size={16} />
              Analyze
            </button>
            <button 
              className="nav-btn" 
              onClick={() => setActiveTab('dashboard')}
              style={{ 
                color: activeTab === 'dashboard' ? 'var(--primary-accent)' : 'var(--on-surface-variant)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <BarChart2 size={16} />
              Dashboard
            </button>
          </div>
          
          <div>
            <button 
              className="btn btn-primary text-label-sm"
              onClick={() => {
                setActiveTab('upload');
              }}
            >
              Try Product
            </button>
          </div>
        </div>
      </nav>

      {/* Main View Area */}
      <main className={activeTab === 'landing' ? 'landing-main' : 'main-content'}>
        {activeTab === 'landing' && (
          <LandingView 
            onGetStarted={() => setActiveTab('upload')} 
            onViewDemo={() => setActiveTab('dashboard')} 
          />
        )}
        {activeTab === 'upload' && (
          <UploadView onUploadSuccess={handleUploadSuccess} />
        )}
        {activeTab === 'dashboard' && (
          <DashboardView 
            activeReportId={activeReportId} 
            setActiveReportId={setActiveReportId} 
            onNavigateToUpload={handleNavigateToUpload}
          />
        )}
      </main>

      {/* Footer */}
      <footer 
        style={{ 
          borderTop: '1px solid var(--border-glass)', 
          padding: '24px 0', 
          marginTop: 'auto',
          backgroundColor: 'var(--bg-base)',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <div 
          style={{ 
            maxWidth: 'var(--container-max)', 
            margin: '0 auto', 
            padding: '0 24px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: '16px' 
          }}
        >
          <div 
            style={{ fontWeight: 700, color: 'var(--primary)', cursor: 'pointer' }}
            onClick={() => setActiveTab('landing')}
          >
            FeedbackIQ
          </div>
          
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
            <a href="#" className="nav-link" style={{ fontSize: '13px' }}>Privacy Policy</a>
            <a href="#" className="nav-link" style={{ fontSize: '13px' }}>Terms of Service</a>
            <a href="#" className="nav-link" style={{ fontSize: '13px' }}>Contact Support</a>
          </div>
          
          <div style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
            © 2026 FeedbackIQ. Visionary Insights.
          </div>
        </div>
      </footer>
    </div>
  );
}
