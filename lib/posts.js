import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getAllPosts = () => {
  console.log('Posts directory:', postsDirectory);
  
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    console.log('Found files:', fileNames);

    const allPostsData = fileNames.map(fileName => {
      // Remove .md extension from slug
      const slug = fileName.replace(/\.md$/, '') 
      const fullPath = path.join(postsDirectory, fileName)
      console.log('Reading file:', fullPath);
      
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,  
        ...matterResult.data
      }
    })

    return allPostsData.sort(({ date: a }, { date: b }) => {
      if (a < b) return 1
      if (a > b) return -1
      return 0
    })
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

export function getPostBySlug(slug) {
  console.log('Getting post for slug:', slug);
  // Add .md to the slug when reading the file
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  console.log('Attempting to read file at:', fullPath);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    console.log('File contents found');
    const matterResult = matter(fileContents)

    return {
      slug,
      content: matterResult.content,
      ...matterResult.data
    }
  } catch (error) {
    console.error('Error reading post file:', error);
    return null;
  }
}