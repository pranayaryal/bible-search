import Navbar from "@/components/Navbar";

const Blog = () => {
  return (
    <div className="px-8 md:px-24 py-8 md:py-12">
      <Navbar />
      <h1 className="w-[90%] md:max-w-[1300px] ml-auto mr-auto mt-16 text-center text-3xl md:text-4xl">How this search was created</h1>
      <div className="w-[90%] md:max-w-[1300px] ml-auto mr-auto flex justify-center mt-8">
        <div className="leading-relaxed">
          <p className="mt-4">This is a semantic search of the bible where we look for meaning instead of an exact match</p>
          <p className="mt-4">I downloaded the bible as a csv file from
            <a
              className="hover:text-blue-500"
              target="_blank"
              href="https://www.kaggle.com/datasets/oswinrh/bible/"> kaggle.</a>
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