# Personal Website & Blog

A clean, modern personal website and blog built with Next.js and Tailwind CSS. Features a minimalist design with a responsive layout, blog functionality, and integrated analytics.

## 🌟 Features

- **Clean, Modern Design** - Minimalist UI with a responsive layout
- **Blog Platform** - Markdown-based blog with dynamic routing
- **Analytics Integration** - Google Analytics 4 integration for tracking visitor engagement
- **Performance Optimized** - Static site generation for optimal loading speeds
- **Responsive Navigation** - Seamless navigation between home and blog sections

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Content:** Markdown with gray-matter for frontmatter
- **Markdown Processing:** Remark for HTML conversion
- **Analytics:** Google Analytics 4
- **Deployment:** AWS Amplify

## 📁 Project Structure

```
├── components/         # React components
├── lib/
│   └── posts.js       # Blog post utility functions
├── pages/
│   ├── _app.js        # App component with GA integration
│   ├── _document.js   # Custom document component
│   ├── index.js       # Homepage
│   └── blog/          # Blog pages
│       ├── index.js   # Blog listing
│       └── [slug].js  # Dynamic blog post pages
├── posts/             # Markdown blog posts
└── styles/
    └── globals.css    # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- AWS Account (for deployment)
- AWS Amplify CLI (for deployment)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Jank601/personal-website.git
cd personal-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Google Analytics tracking ID:
```
REACT_APP_GA_TRACKING_ID=your-ga4-tracking-id
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view your site

## 📝 Blog Post Format

Create new blog posts in the `posts` directory using Markdown with frontmatter:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief description of your post"
---

Your post content here...
```

## 🔧 Customization

### Personal Information
Update the personal information in `pages/index.js`:
- Name
- Bio
- Social links
- Resume link

### Styling
- Global styles are managed in `styles/globals.css`
- Tailwind classes are used throughout components
- The site uses a subtle gradient background with clean typography

## 📊 Analytics

The site includes Google Analytics 4 integration:
- Automatic page view tracking
- Route change tracking
- Console logging for debugging

## 🌐 Deployment with AWS Amplify

This site is deployed using AWS Amplify. Here's how to deploy your own instance:

1. Install the AWS Amplify CLI if you haven't already:
```bash
npm install -g @aws-amplify/cli
```

2. Configure the Amplify CLI:
```bash
amplify configure
```

3. Initialize Amplify in your project:
```bash
amplify init
```

4. Push your code to GitHub or your preferred Git provider

5. Set up hosting through the AWS Amplify Console:
   - Go to AWS Amplify Console
   - Click "New App" > "Host web app"
   - Connect your repository
   - Configure build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - yarn install
    build:
      commands:
        - yarn build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

6. Add environment variables in the Amplify Console:
   - REACT_APP_GA_TRACKING_ID
   - Any other environment variables your app needs

7. Deploy! Amplify will automatically build and deploy your site when you push changes to your repository.

### Amplify Features Used
- Continuous deployment from Git
- Build configuration
- Environment variable management
- SSL/TLS certificate management
- Domain management (optional)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Eli Yagel
- GitHub: [@jank601](https://github.com/jank601)
- LinkedIn: [Eli Yagel Gale](https://www.linkedin.com/in/eli-yagel-gale-6108301b3/)

---

⭐️ If you find this template useful, please consider giving it a star!