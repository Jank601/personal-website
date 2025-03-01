# Personal Website & Blog

A clean, modern personal website and blog built with Next.js and Tailwind CSS. Features a minimalist design with a responsive layout, blog functionality, integrated analytics, and an interactive chat widget for visitor engagement.

## 🌟 Features

- **Clean, Modern Design** - Minimalist UI with a responsive layout
- **Blog Platform** - Markdown-based blog with dynamic routing
- **Interactive Chat Widget** - AI-powered chat for answering visitor questions about your projects
- **Analytics Integration** - Google Analytics 4 integration for tracking visitor engagement
- **Performance Optimized** - Static site generation for optimal loading speeds
- **Responsive Navigation** - Seamless navigation between home and blog sections

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Content:** Markdown with gray-matter for frontmatter
- **Markdown Processing:** Remark for HTML conversion
- **Chat Widget:** React with UUID for session management, React Markdown for message formatting
- **Syntax Highlighting:** React Syntax Highlighter
- **Analytics:** Google Analytics 4
- **Deployment:** AWS Amplify
- **Backend API:** AWS API Gateway

## 📁 Project Structure

```
├── components/         # React components
│   └── ChatWidget.js   # Interactive chat component
├── lib/
│   └── posts.js        # Blog post utility functions
├── pages/
│   ├── _app.js         # App component with GA integration
│   ├── _document.js    # Custom document component
│   ├── index.js        # Homepage
│   ├── api/            # API routes
│   │   └── chat.js     # Chat API handler
│   └── blog/           # Blog pages
│       ├── index.js    # Blog listing
│       └── [slug].js   # Dynamic blog post pages
├── posts/              # Markdown blog posts
└── styles/
    └── globals.css     # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- AWS Account (for deployment)
- AWS Amplify CLI (for deployment)
- API Key for chat service

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

3. Create a `.env.local` file in the root directory and add your environment variables:
```
REACT_APP_GA_TRACKING_ID=your-ga4-tracking-id
NEXT_PUBLIC_API_KEY=your-chat-api-key
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

## 💬 Chat Widget

The interactive chat widget lets visitors ask questions about your projects. Features include:

- **Markdown Support** - Rich text formatting for responses
- **Syntax Highlighting** - Code snippets with language detection
- **Session Management** - Persistent conversations using UUID tracking
- **Copy to Clipboard** - Easy sharing of code snippets
- **Error Handling** - Graceful handling of API failures
- **Loading States** - Visual feedback during API requests

### Chat API Configuration

The chat widget communicates with an AWS API Gateway endpoint. To configure your own chat service:

1. Update the API endpoint URL in `pages/api/chat.js`
2. Provide your API key in the `.env.local` file
3. Ensure your backend API accepts and responds in the expected format:

Request Format:
```json
{
  "input_text": "User's message",
  "sessionId": "unique-session-id"
}
```

Expected Response:
```json
{
  "message": "Bot's response in markdown format"
}
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

### Chat Widget
- Edit the welcome message in `components/ChatWidget.js`
- Customize styling using Tailwind classes
- Adjust widget position and size as needed

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
        - npm ci --cache .npm --prefer-offline
        - echo "REACT_APP_GA_TRACKING_ID=$REACT_APP_GA_TRACKING_ID" >> .env.production
        - echo "NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY" >> .env.production
    build:
      commands:
        - cat .env.production
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - .npm/**/*
```

6. Add environment variables in the Amplify Console:
   - REACT_APP_GA_TRACKING_ID
   - NEXT_PUBLIC_API_KEY
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