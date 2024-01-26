"use client";
import {
  type FileState,
  MultiFileDropzone,
} from "@/components/EdgeStoreMultipleFile";
import { SingleImageDropzone } from "@/components/EdgeStoreSingleImage";
import { useEdgeStore } from "@/utils/edgestore";
import React, { useState } from "react";

export default function page() {
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [imageUrls, setImageUrls] = useState<String[]>([]);
  console.log(progress);
  const { edgestore } = useEdgeStore();
  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  console.log(imageUrls);
  return (
    <div>
      <section className="w-full max-w-4xl mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex">
          <h2>Single Image Upload</h2>
        </div>
        <div className="">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
          {progress > 0 && progress < 100 && (
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-4">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {" "}
                {progress}%
              </div>
            </div>
          )}
          {progress > 0 && file && imageUrl ? (
            ""
          ) : (
            <button
              className="py-2.5 px-5 bg-red-500 text-white rounded-sm"
              onClick={async () => {
                if (file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                      // you can use this to show a progress bar
                      // console.log(progress);
                      setProgress(progress);
                    },
                  });
                  // you can run some server action or api here
                  // to add the necessary data to your database
                  console.log(res);
                  setImageUrl(res?.url);
                }
              }}
            >
              Upload
            </button>
          )}
        </div>
      </section>
      <section className="w-full max-w-4xl mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex">
          <h2>Multiple Image Upload</h2>
        </div>
        <div className="">
          <MultiFileDropzone
            value={fileStates}
            onChange={(files) => {
              setFileStates(files);
            }}
            onFilesAdded={async (addedFiles) => {
              setFileStates([...fileStates, ...addedFiles]);
              await Promise.all(
                addedFiles.map(async (addedFileState) => {
                  try {
                    const res = await edgestore.publicImages.upload({
                      file: addedFileState.file,
                      onProgressChange: async (progress) => {
                        updateFileProgress(addedFileState.key, progress);
                        if (progress === 100) {
                          // wait 1 second to set it to complete
                          // so that the user can see the progress bar at 100%
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                          );
                          updateFileProgress(addedFileState.key, "COMPLETE");
                        }
                      },
                    });
                    console.log(res);
                    setImageUrls((prevImages) => [...prevImages, res.url]);
                  } catch (err) {
                    updateFileProgress(addedFileState.key, "ERROR");
                  }
                })
              );
            }}
          />
        </div>
      </section>
    </div>
  );
}
