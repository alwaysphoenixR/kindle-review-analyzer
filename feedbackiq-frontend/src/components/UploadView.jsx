import React, { useState, useEffect, useRef } from 'react';
import { CloudUpload, Lock, AlertTriangle } from 'lucide-react';
import { uploadCSV } from '../api';

const LOADING_MESSAGES = [
  "Reading reviews...",
  "Discovering patterns...",
  "Grouping similar feedback...",
  "Identifying complaints...",
  "Finding feature requests...",
  "Uncovering emerging themes..."
];

export default function UploadView({ onUploadSuccess }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  // Cycle loading messages when uploading
  useEffect(() => {
    let interval;
    if (isUploading) {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % LOADING_MESSAGES.length;
        setLoadingText(LOADING_MESSAGES[index]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  // Simulate smooth progress bar filling if the network upload finishes fast
  const startProgressSimulation = (callback) => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Add random small increment
      currentProgress += Math.random() * 8 + 2;
      if (currentProgress >= 95) {
        currentProgress = 95; // Wait for actual response before hitting 100
        clearInterval(interval);
      }
      setProgress(Math.round(currentProgress));
    }, 200);

    return () => {
      clearInterval(interval);
      setProgress(100);
    };
  };

  const processFile = async (file) => {
    if (!file) return;

    // Check extension
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'csv') {
      setError("Please upload a CSV file (.csv) as required by the API data contract.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setProgress(0);
    setLoadingText(LOADING_MESSAGES[0]);

    const completeProgress = startProgressSimulation();

    try {
      const response = await uploadCSV(file);
      completeProgress();
      
      // Delay slightly so the user sees "100%" completeness
      setTimeout(() => {
        setIsUploading(false);
        if (response && response.reportId) {
          onUploadSuccess(response.reportId);
        } else if (response && response.report && response.report._id) {
          onUploadSuccess(response.report._id);
        } else {
          setError("Upload succeeded, but no report ID was returned.");
        }
      }, 800);

    } catch (err) {
      completeProgress();
      setIsUploading(false);
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to upload and analyze feedback file.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  if (isUploading) {
    return (
      <div 
        className="glass-panel" 
        style={{ 
          maxWidth: '640px', 
          margin: '40px auto', 
          padding: '64px 32px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Glow effect behind */}
        <div 
          className="ambient-glow glow-mint" 
          style={{ width: '300px', height: '300px', top: '10%', left: '25%' }}
        />
        
        <div style={{ marginBottom: '32px', position: 'relative' }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '120px', height: '120px' }}>
            <path d="M30 40 L70 40 L65 80 L35 80 Z" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
            <path d="M70 45 C78 45 78 60 70 60" fill="none" stroke="var(--primary-accent)" strokeWidth="2"></path>
            <rect fill="var(--primary-accent)" height="2" width="30" x="35" y="80"></rect>
            {/* Filling Coffee */}
            <path d="M35 78 L65 78 L62 80 L38 80 Z" fill="#6d4c41">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M35 78 L65 78 L62 80 L38 80 Z; M31 45 L69 45 L65 80 L35 80 Z"></animate>
            </path>
            {/* Steam lines */}
            <g opacity="0.6" stroke="var(--primary-accent)" strokeLinecap="round" strokeWidth="1.5">
              <path d="M40 30 Q45 20 40 10">
                <animate attributeName="d" dur="2s" repeatCount="indefinite" values="M40 30 Q45 20 40 10; M40 35 Q35 25 40 15; M40 30 Q45 20 40 10"></animate>
                <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0;0.6;0"></animate>
              </path>
              <path d="M50 25 Q55 15 50 5">
                <animate attributeName="d" dur="2.5s" repeatCount="indefinite" values="M50 25 Q55 15 50 5; M50 30 Q45 20 50 10; M50 25 Q55 15 50 5"></animate>
                <animate attributeName="opacity" dur="2.5s" repeatCount="indefinite" values="0;0.6;0"></animate>
              </path>
              <path d="M60 30 Q65 20 60 10">
                <animate attributeName="d" dur="2.2s" repeatCount="indefinite" values="M60 30 Q65 20 60 10; M60 35 Q55 25 60 15; M60 30 Q65 20 60 10"></animate>
                <animate attributeName="opacity" dur="2.2s" repeatCount="indefinite" values="0;0.6;0"></animate>
              </path>
            </g>
          </svg>
        </div>
        
        <h2 className="text-headline-md" style={{ marginBottom: '16px' }}>
          Brewing Insights
        </h2>
        
        <div style={{ height: '32px', overflow: 'hidden', position: 'relative', width: '100%' }}>
          <p className="text-body-lg fade-text" style={{ color: 'var(--primary-accent)', transition: 'all 0.5s ease' }}>
            {loadingText}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div 
          style={{ 
            marginTop: '40px', 
            width: '100%', 
            maxWidth: '360px', 
            backgroundColor: '#2a2a2a', 
            borderRadius: '999px', 
            height: '6px', 
            overflow: 'hidden' 
          }}
        >
          <div 
            style={{ 
              backgroundColor: 'var(--primary-accent)', 
              height: '100%', 
              width: `${progress}%`, 
              transition: 'width 0.3s ease-out' 
            }}
          />
        </div>
        <p className="text-label-sm" style={{ marginTop: '12px', opacity: 0.6 }}>
          {progress}% Complete
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ maxWidth: '768px', margin: '40px auto', padding: '48px 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 className="text-headline-lg" style={{ marginBottom: '16px' }}>
          Initiate Analysis
        </h1>
        <p className="text-body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: '512px', margin: '0 auto' }}>
          Upload your raw customer feedback data in CSV format to begin discovering actionable insights.
        </p>
      </div>

      {error && (
        <div 
          style={{ 
            backgroundColor: 'rgba(255, 180, 171, 0.08)', 
            border: '1px solid var(--error)', 
            borderRadius: '8px', 
            padding: '16px', 
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--error)'
          }}
        >
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <p className="text-body-md" style={{ textAlign: 'left' }}>{error}</p>
        </div>
      )}

      {/* Dropzone */}
      <div 
        className={`upload-dropzone ${isDragActive ? 'dragover' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{ minHeight: '320px' }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".csv" 
          style={{ display: 'none' }} 
        />
        
        <CloudUpload 
          size={64} 
          style={{ 
            color: 'var(--primary-accent)', 
            marginBottom: '24px', 
            transition: 'transform 0.3s ease'
          }} 
          className="cloud-icon"
        />

        <h3 className="text-headline-md" style={{ marginBottom: '8px' }}>
          Drop your feedback data here
        </h3>
        <p className="text-label-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '24px' }}>
          Supports CSV (.csv) format
        </p>

        <button className="btn btn-secondary" onClick={handleBrowseClick}>
          Browse Files
        </button>
      </div>

      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px', 
          color: 'var(--on-surface-variant)', 
          marginTop: '32px' 
        }}
      >
        <Lock size={16} style={{ color: 'var(--primary-accent)' }} />
        <span className="text-label-sm" style={{ textTransform: 'none', opacity: 0.8 }}>
          End-to-end encryption. Your data remains secure.
        </span>
      </div>
    </div>
  );
}
