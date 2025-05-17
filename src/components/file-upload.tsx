"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/utils/uploadthing";
// import { UploadDropzone, useUploadThing } from "@/utils/uploadthing";

import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: keyof OurFileRouter;
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  // const uploadThing = useUploadThing(endpoint);

  if (value) {
    return (
      <div className="relative h-24 w-24">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button>
          <X
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm cursor-pointer"
          />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      // onChange={(files) => {
      //   console.log("upload onChance");
      //   uploadThing.startUpload(files);
      // }}
      onClientUploadComplete={(res) => {
        onChange(res[0].ufsUrl);
      }}
      onUploadError={(error: Error) => console.log(error)}
    />
  );
};
