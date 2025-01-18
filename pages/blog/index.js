import { getAllPosts } from '../../lib/posts';

export default function BlogIndex({ posts }) {
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

            <div className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-12 text-center">Blog Posts</h1>
                <div className="grid gap-8">
                {posts.map((post) => {
    console.log('Creating link for post:', post); // Add this debug line
    return (
        <a
            key={post.slug}
            href={`/blog/${post.slug}`} // Explicitly remove .md here
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.excerpt}</p>
            <time className="text-sm text-gray-500">{post.date}</time>
        </a>
    );
})}
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const posts = getAllPosts();
    return {
        props: {
            posts
        }
    };
}