"use client";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { XCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function page() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
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
  // function onSubmit(data){
  //   data.imageUrls=imageUrls;
  //   data.imageUrl=imageUrl
  //   // Make the Api Request
  // }
  return (
    <div>
      <section className="w-full max-w-4xl mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
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
          <Image src={imageUrl} alt="some image" width={300} height={300} />
        ) : (
          <UploadDropzone
            className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
      </section>
      <section className="w-full max-w-4xl mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2>Multiple Image Upload</h2>
        </div>
        {/* <Image src={imageUrl} alt="some image" width={300} height={300} /> */}

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
                  <Image
                    src={item}
                    className="rounded"
                    alt="some image"
                    width={100}
                    height={100}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <UploadDropzone
            className=""
            endpoint="multipleImageUploader"
            onClientUploadComplete={(res: any) => {
              // Do something with the response
              console.log("Files: ", res);
              const urls = res?.map((file: any) => file.url);
              setImageUrls(urls);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
      </section>
    </div>
  );
}
