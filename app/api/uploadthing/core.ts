import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),
  multipleImageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "JB" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
