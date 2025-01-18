// pages/blog/[slug].js
import { getAllPosts, getPostBySlug } from '../../lib/posts';

export default function BlogPost({ post }) {
  if (!post) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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

      <article className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-gray-500 mb-8 block">{post.date}</time>
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  console.log('Available slugs:', posts.map(post => post.slug)); // Debug log

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  console.log('Generated paths:', paths); // Debug log

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  console.log('Attempting to get post with slug:', params.slug); // Debug log
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    console.log('Post not found for slug:', params.slug); // Debug log
    return {
      notFound: true,
    };
  }

  console.log('Post found:', post.title); // Debug log
  return {
    props: {
      post
    }
  };
}