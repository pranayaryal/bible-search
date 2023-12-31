import Head from 'next/head'

const Blog = () => {
  return (

    <div>
      <Head>
        <title>How this search was created</title>
      </Head>
      <h1 className="w-[85%] md:max-w-[1300px] ml-auto mr-auto mt-8 md:mt-12 md:text-center text-2xl md:text-4xl tracking-tight">How this search was created</h1>
      <div className="w-[90%] md:max-w-[1300px] ml-auto mr-auto flex justify-center mt-2 md:mt-8">
        <div className="leading-relaxed">
          <p className="mt-4">This is a semantic search of the bible where we look for meaning instead of an exact match</p>
          <p className="mt-4">I downloaded the bible as a csv file from kaggle
            <a
              className="hover:text-blue-500"
              target="_blank"
              href="https://www.kaggle.com/datasets/oswinrh/bible/"> here.</a>
          </p>
          <p>Then I created embeddings of length 384 using sentence-transformers library in python.</p>
          <p>This was saved in a postgres database using the extension pgvector</p>
          <p className="mt-4">We query this database using the pgvector extension using cosine similarity.</p>
        </div>
      </div>

    </div>
  )
};

export default Blog;
