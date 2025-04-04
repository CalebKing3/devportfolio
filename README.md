# KingCaleb.com - IDE-Themed Developer Portfolio

A modern, IDE-inspired developer portfolio website built with React, TypeScript, and Tailwind CSS.

![Portfolio Demo](https://via.placeholder.com/800x400?text=KingCaleb.com+Demo)

## Features

- 💻 IDE-inspired design with dark mode interface
- ⚡ Built with React, TypeScript, and Vite for blazing fast performance
- 🎨 Styled with Tailwind CSS for elegant, responsive design
- 📝 Markdown blog support
- 🔄 Smooth animations with Framer Motion
- 📱 Fully responsive on all devices
- 🧩 Modular components for easy customization
- 🚀 Easy deployment to Vercel

## Live Demo

View the live demo at [kingcaleb.com](https://kingcaleb.com)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Development Options

#### Option 1: Local Development

1. Clone the repository
```bash
git clone https://github.com/calebking3/kingcaleb.com.git
cd kingcaleb.com
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser

#### Option 2: GitHub Codespaces

This repository includes a devcontainer configuration, allowing you to develop directly in your browser with GitHub Codespaces.

1. Click the "Code" button on the GitHub repository
2. Select the "Codespaces" tab
3. Click "Create codespace on main"
4. Wait for the container to build
5. When ready, run `npm run dev` in the terminal
6. The preview will automatically open in a new tab

The devcontainer comes with:
- Node.js 18
- All necessary extensions for React & TypeScript development
- ESLint and Prettier pre-configured
- GitHub CLI for easy interaction with GitHub
- Pre-configured port forwarding for Vite

## Customization

### Personal Information

1. Edit basic information in the following files:
   - `src/pages/Home.tsx` - Landing page content
   - `src/pages/About.tsx` - About page details
   - `src/components/Terminal.tsx` - Terminal commands and responses

### Projects

Modify the projects array in `src/pages/Projects.tsx` to showcase your own projects.

### Resume

Replace the PDF file at `public/CalebKing-Sr.Eng_Director.pdf` with your own resume.

### Blog Articles

Blog articles are stored as markdown files in the `src/content/blog` directory. Each file includes frontmatter with metadata followed by markdown content.

### Theme Colors

Colors are defined as CSS variables in `src/index.css` and can be easily modified to match your preferred color scheme.

## Deployment to Vercel

This project is configured for seamless deployment to Vercel:

### One-Click Deployment

The fastest way to deploy your own version:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcalebking3%2Fkingcaleb.com)

### Manual Setup

1. Push your code to a GitHub repository:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/kingcaleb.com.git
git push -u origin main
```

2. Import your repository on Vercel:
   - Create an account on [Vercel](https://vercel.com) if you don't have one
   - Click "Add New..." > "Project"
   - Select your GitHub repository
   - Keep the default settings for a Vite project
   - Click "Deploy"

3. Configure your custom domain (optional):
   - In the Vercel dashboard, go to your project
   - Click on "Settings" > "Domains"
   - Add your custom domain and follow the instructions to set up DNS records

### Environment Variables

If you need to add environment variables:
1. Go to your project on the Vercel dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add your variables in the format: NAME = value

### Automatic Deployments

Vercel automatically deploys your project when you push changes to your repository. You can configure this behavior in the Vercel dashboard under "Settings" > "Git".

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

### MIT License

```
MIT License

Copyright (c) 2025 Caleb King

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

- IDE theme inspired by modern code editors
- Icons provided by [Lucide React](https://lucide.dev/)
- Motion animations powered by [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by [Caleb King](https://github.com/calebking3)