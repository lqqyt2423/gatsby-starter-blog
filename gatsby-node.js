const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// pagination
async function createPostPages({ graphql, actions }) {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) { totalCount }
    }
  `)
  const postsPerPage = 10
  const numPages = Math.ceil(result.data.allMarkdownRemark.totalCount / postsPerPage)

  const pageTemp = path.resolve(`./src/templates/blog-page.tsx`)

  for (let i = 1; i <= numPages; i++) {
    createPage({
      path: '/page/' + i,
      component: pageTemp,
      context: {
        page: i,
        limit: postsPerPage,
        skip: (i - 1) * postsPerPage,
        prevPage: i === 1 ? null : `/page/${i-1}`,
        nextPage: i === numPages ? null : `/page/${i+1}`,
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  createPostPages({ graphql, actions })


  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                path
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.path,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // add post path
    createNodeField({
      name: `path`,
      node,
      value: '/post' + value,
    })
  }
}
