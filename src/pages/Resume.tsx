import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

const Resume = () => {
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/caleb-king-resume.pdf';
    link.download = 'caleb-king-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  return (
    <div className="min-h-screen bg-editor-bg py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FileText size={24} className="text-accent-blue mr-2" />
            <h1 className="text-2xl font-bold text-editor-text">Resume</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Zoom Controls */}
            <div className="flex items-center bg-secondary-bg rounded-lg">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-active-tab rounded-l-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={20} className="text-editor-text" />
              </button>
              <span className="px-3 text-editor-text border-x border-border-color">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-active-tab rounded-r-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={20} className="text-editor-text" />
              </button>
            </div>
            
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download size={20} className="mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary-bg rounded-lg overflow-hidden shadow-lg"
        >
          {/* PDF Controls */}
          <div className="flex items-center justify-between border-b border-border-color p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="p-2 hover:bg-active-tab rounded transition-colors"
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} className="text-editor-text" />
              </button>
              <span className="text-editor-text">Page {currentPage}</span>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 hover:bg-active-tab rounded transition-colors"
              >
                <ChevronRight size={20} className="text-editor-text" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div 
            className="overflow-auto bg-editor-bg"
            style={{ height: 'calc(100vh - 300px)' }}
          >
            <div 
              className="min-w-full min-h-full flex items-center justify-center p-8"
              style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
            >
              <object
                data="/resume.pdf"
                type="application/pdf"
                className="w-full h-full"
                style={{ minHeight: '1100px' }}
              >
                <p className="text-editor-text text-center">
                  It appears your browser doesn't support PDF preview.
                  Please use the download button above to view the resume.
                </p>
              </object>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;