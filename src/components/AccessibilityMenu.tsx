import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Type, ZoomIn, Volume2 } from 'lucide-react';
import { Switch } from '@headlessui/react';

const AccessibilityMenu: React.FC = () => {
  const [highContrast, setHighContrast] = React.useState(false);
  const [largeText, setLargeText] = React.useState(false);
  const [screenReader, setScreenReader] = React.useState(false);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const toggleLargeText = () => {
    setLargeText(!largeText);
    document.documentElement.classList.toggle('large-text');
  };

  const toggleScreenReader = () => {
    setScreenReader(!screenReader);
    // Implementation for screen reader toggle
  };

  return (
    <div className="p-4 bg-secondary-bg rounded-lg shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-editor-text flex items-center">
          <Settings size={20} className="mr-2 text-accent-blue" />
          Accessibility Options
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Type size={16} className="text-accent-purple mr-2" />
            <span className="text-editor-text">High Contrast</span>
          </div>
          <Switch
            checked={highContrast}
            onChange={toggleHighContrast}
            className={`${
              highContrast ? 'bg-accent-blue' : 'bg-editor-bg'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className="sr-only">Enable high contrast</span>
            <span
              className={`${
                highContrast ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ZoomIn size={16} className="text-accent-purple mr-2" />
            <span className="text-editor-text">Large Text</span>
          </div>
          <Switch
            checked={largeText}
            onChange={toggleLargeText}
            className={`${
              largeText ? 'bg-accent-blue' : 'bg-editor-bg'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className="sr-only">Enable large text</span>
            <span
              className={`${
                largeText ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Volume2 size={16} className="text-accent-purple mr-2" />
            <span className="text-editor-text">Screen Reader</span>
          </div>
          <Switch
            checked={screenReader}
            onChange={toggleScreenReader}
            className={`${
              screenReader ? 'bg-accent-blue' : 'bg-editor-bg'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className="sr-only">Enable screen reader</span>
            <span
              className={`${
                screenReader ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMenu;