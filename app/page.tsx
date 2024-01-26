import Image from "next/image";

export default function Home() {
  return (
    <section className="pt-12 bg-gray-50 sm:pt-16 min-h-screen">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-3xl lg:text-4xl lg:leading-tight font-pj">
            Mastering Image Uploads in Your Fullstack NexJ Project: A
            Comprehensive Guide to Four
            <span className="relative inline-flex sm:inline">
              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative"> Powerful Tools </span>
            </span>
          </p>

          <p className="mt-8 text-base text-gray-500 font-inter">
            Explore UploadThing, EdgeStore, and Cloudinary for Seamless Image
            Handling in Your Next Fullstack NexJ Application
          </p>
        </div>
      </div>
    </section>
  );
}
