/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'editor-bg': 'var(--editor-bg)',
        'editor-text': 'var(--editor-text)',
        'secondary-bg': 'var(--secondary-bg)',
        'border-color': 'var(--border-color)',
        'active-tab': 'var(--active-tab)',
        'menu-bg': 'var(--menu-bg)',
        'statusbar-bg': 'var(--statusbar-bg)',
        'selection-bg': 'var(--selection-bg)',
        'accent-blue': 'var(--accent-blue)',
        'accent-purple': 'var(--accent-purple)',
        'accent-green': 'var(--accent-green)',
        'keyword': 'var(--keyword-color)',
        'string': 'var(--string-color)',
        'comment': 'var(--comment-color)',
        'number': 'var(--number-color)',
        'type': 'var(--type-color)',
      },
      fontFamily: {
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            code: {
              color: 'var(--accent-orange)',
              background: 'var(--active-tab)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontSize: '0.9em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          }
        },
        invert: {
          css: {
            '--tw-prose-body': 'var(--dark-editor-text)',
            '--tw-prose-headings': 'var(--dark-accent-blue)',
            '--tw-prose-links': 'var(--dark-accent-blue)',
            '--tw-prose-bold': 'var(--dark-editor-text)',
            '--tw-prose-code': 'var(--dark-accent-orange)',
            '--tw-prose-quotes': 'var(--dark-accent-purple)',
            '--tw-prose-bullets': 'var(--dark-accent-blue)',
            a: {
              color: 'var(--dark-accent-blue)',
              '&:hover': {
                color: 'var(--dark-accent-purple)',
              },
            },
          },
        },
        light: {
          css: {
            '--tw-prose-body': 'var(--light-editor-text)',
            '--tw-prose-headings': 'var(--light-accent-blue)',
            '--tw-prose-links': 'var(--light-accent-blue)',
            '--tw-prose-bold': 'var(--light-editor-text)',
            '--tw-prose-code': 'var(--light-accent-orange)',
            '--tw-prose-quotes': 'var(--light-accent-purple)',
            '--tw-prose-bullets': 'var(--light-accent-blue)',
            a: {
              color: 'var(--light-accent-blue)',
              '&:hover': {
                color: 'var(--light-accent-purple)',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};