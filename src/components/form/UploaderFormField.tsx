"use client";

import { useState } from "react";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";
import ImagePreview from "../layouts/image-preview";

interface FormFileUploaderProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
}

const FormFileUploader = <T extends FieldValues>({
  control,
  name,
  label,
  description,
}: FormFileUploaderProps<T>) => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {field.value?.length ? (
              <ImagePreview
                images={field.value}
                editable
                onDelete={(index) => {
                  const urls: string[] = field.value;
                  urls.splice(index, urls.length);
                  field.onChange(urls);
                }}
              />
            ) : (
              <UploadButton
                endpoint={"imageUploader"}
                onUploadBegin={() => {
                  setIsUploading(true);
                }}
                onClientUploadComplete={(res) => {
                  const uploadedFiles = res.map((file) => file.url);
                  field.onChange(uploadedFiles);
                  setIsUploading(false);
                }}
                onUploadError={(error: Error) => {
                  toast.error("Upload failed: " + error.message);
                  setIsUploading(false);
                }}
                appearance={{
                  allowedContent: { display: "none" },
                  button: {
                    width: "100%",
                    background: "blue",
                    cursor: "pointer",
                  },
                }}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFileUploader;
