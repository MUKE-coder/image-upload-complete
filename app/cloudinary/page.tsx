"use client";
import { UploadCloud, XCircle } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

export default function page() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<String[]>([]);
  console.log(imageUrls);
  function handleImageChange() {
    setImageUrl("");
  }
  function handleRemoveImage(indexToRemove: number) {
    const updatedImages = imageUrls.filter(
      (item, index) => index !== indexToRemove
    );
    setImageUrls(updatedImages);
  }
  return (
    <div>
      <section className="w-full max-w-4xl mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2>Single Image</h2>
          {imageUrl && (
            <button
              onClick={handleImageChange}
              className="bg-slate-800 text-white py-2 px-4 rounded"
            >
              Change
            </button>
          )}
        </div>
        {imageUrl ? (
          <CldImage
            width="300"
            height="300"
            src={imageUrl}
            alt="Description of my image"
          />
        ) : (
          <CldUploadWidget
            uploadPreset="imageUploadPreset"
            onSuccess={(result, { widget }) => {
              console.log(result);
              setImageUrl(result?.info?.url);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <button onClick={() => open()}>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    </label>
                  </div>
                </button>
              );
            }}
          </CldUploadWidget>
        )}
      </section>
      <section className="w-full max-w-4xl mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2>Multiple Images</h2>
        </div>
        {/* <CldImage
            width="300"
            height="300"
            src={imageUrl}
            alt="Description of my image"
          /> */}
        {imageUrls.length >= 1 ? (
          <div className="flex items-center w-full gap-4 flex-wrap p-4">
            {imageUrls.map((item, i) => {
              return (
                <div key={i} className="relative m-3">
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute -right-3 -top-3 bg-slate-800 rounded-full"
                  >
                    <XCircle className="text-red-400" />
                  </button>
                  <CldImage
                    width="300"
                    height="300"
                    src={item}
                    alt="Description of my image"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <CldUploadWidget
            options={{
              sources: ["local", "url", "unsplash"],
              multiple: true,
              maxFiles: 5,
            }}
            uploadPreset="imageUploadPreset"
            onSuccess={(result, { widget }) => {
              console.log(result);
              const url = result?.info?.url;
              console.log(url);
              // setImageUrl(result?.info?.url);
              setImageUrls((prevImages) => [...prevImages, url]);
              // widget.close();
            }}
          >
            {({ open }) => {
              return (
                <button onClick={() => open()}>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    </label>
                  </div>
                </button>
              );
            }}
          </CldUploadWidget>
        )}
      </section>
    </div>
  );
}
