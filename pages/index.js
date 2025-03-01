import { getAllPosts } from '../lib/posts';
import ChatWidget from '../components/ChatWidget';

export default function Home({ recentPosts }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-xl font-semibold text-gray-900">
              Eli Yagel
            </a>
            <div className="flex gap-6">
              <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="/blog" className="text-gray-700 hover:text-gray-900">Blog</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-8 text-gray-900 leading-relaxed">
            Eli Yagel
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
            I am a data analyst with a passion for AI, constantly exploring innovative solutions and building intelligent systems.  
            My work spans data-driven insights and AI-powered automation, including the chatbot on this site.  
            <br /><br />
            This website, like the chatbot, was built using AI and reflects my expertise in data analysis, cloud technologies, and generative AI.  
            The chatbot pulls knowledge from my public GitHub repositories, blog posts, and CV using  
            Retrieval-Augmented Generation (RAG) to provide answers based on my real-world experience.  
            <br /><br />
            <strong>Curious to learn more?</strong>  
            Try out the chatbot and ask about my projects, experience, or the meaning of life!  
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
            Connect With Me
          </h2>
          <div className="flex justify-center gap-8">
            <a 
              href="https://github.com/jank601" 
              className="px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 min-w-[120px] text-center"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/eli-yagel-gale-6108301b3/" 
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 min-w-[120px] text-center"
            >
              LinkedIn
            </a>
            <a 
              href="/resume.pdf" 
              className="px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200 min-w-[120px] text-center"
            >
              Resume
            </a>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12"></div>

        {/* Recent Blog Posts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
            Recent Blog Posts
          </h2>
          <div className="grid gap-6">
            {recentPosts.map((post) => (
              <a 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <time className="text-sm text-gray-500">{post.date}</time>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a 
              href="/blog" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View all posts →
            </a>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12"></div>

        <section className="text-center">
          <p className="text-lg text-gray-600">
            See an issue? have any feedback? <a href="mailto: eli.yagel.work@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium">Contact me</a>
          </p>
        </section>
      </div>
      <ChatWidget />
    </div>
  );
}

// Add this at the bottom of the file
export async function getStaticProps() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 2); // Get only the two most recent posts
  
  return {
    props: {
      recentPosts
    }
  };
}