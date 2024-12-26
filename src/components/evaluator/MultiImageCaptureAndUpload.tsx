"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, Upload, X, Trash2, ImageIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useUploadThing } from "@/utils/uploadthing";
import { uploadStudentAnswerSheets } from "@/actions/evaluation";
import { toast } from "sonner";
import {
  fetchAndSetEvaluators,
  useEvaluatorStore,
} from "@/stores/evaluator-store";

interface ImageFile {
  file: File | null;
  preview: string;
}

interface MultiImageCaptureAndUploadProps {
  evaluator: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>;
  student: Prisma.StudentGetPayload<{}>;
}

/**
 * Returns an array of ImageFile objects representing the images uploaded by the
 * given student for the given evaluation.
 *
 * @param evaluator - The evaluator object containing the evaluation and class
 * information.
 * @param student - The student object containing the student's name and ID.
 * @returns An array of ImageFile objects representing the uploaded images.
 */
function filterStudentUploadedAnswerSheet(
  evaluator: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>,
  student: Prisma.StudentGetPayload<{}>
): ImageFile[] {
  const evaluation = evaluator.evaluation;
  if (!evaluation) return [];

  const studentAnswerSheet = evaluation.answerSheets.find(
    (answerSheet) => answerSheet.studentId === student.id
  );
  if (!studentAnswerSheet) return [];
  return studentAnswerSheet.answerSheet.map((answerSheetUrl) => ({
    file: null,
    preview: answerSheetUrl,
  })) satisfies ImageFile[];
}
/**
 * A component that allows users to capture and upload multiple images.
 *
 * @remarks
 *
 * This component is designed to be used in the context of a student submitting
 * answer sheets for an evaluation. It allows the user to capture and upload
 * multiple images, and displays the images in a scrollable list. The user can
 * remove images from the list by clicking the trash can icon on the image.
 *
 * @param evaluator - The evaluator object containing the evaluation and class
 * information.
 * @param student - The student object containing the student's name and ID.
 * @returns A JSX component that renders a card with a list of images and
 * buttons to capture and upload images.
 */
export default function MultiImageCaptureAndUpload({
  evaluator,
  student,
}: MultiImageCaptureAndUploadProps) {
  const [images, setImages] = useState<ImageFile[]>(
    filterStudentUploadedAnswerSheet(evaluator, student)
  );
  const evaluators = useEvaluatorStore((state) => state.evaluators);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDefaultImagesChanged, setIsDefaultImagesChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
      setIsDefaultImagesChanged(true);
    }
  };

  const handleCameraCapture = () => {
    setIsModalOpen(true);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const closeCamera = () => {
    setIsModalOpen(false);
  };
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `webcam-capture-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          setImages((prevImages) => [
            ...prevImages,
            { file, preview: imageSrc },
          ]);
          setIsDefaultImagesChanged(true);
        });
      closeCamera();
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setIsDefaultImagesChanged(true);
  };

  const handleSubmit = async () => {
    try {
      const imageUrls: string[] = [];
      // to count if there is any image with file (new image)
      let imageWithFile = 0;

      for (const img of images) {
        if (!img.file && img.preview) {
          imageUrls.push(img.preview);
          continue;
        }
        if (img.file) {
          imageWithFile++;
          const uploadData = await startUpload([img.file as File]);
          if (!uploadData) throw new Error("Failed to upload image");
          imageUrls.push(uploadData[0].url);
          continue;
        }
      }

      if (!Boolean(imageWithFile)) throw new Error("No new image selected");

      const evaluation = await uploadStudentAnswerSheets(
        evaluator.id,
        student.id,
        imageUrls
      );

      setIsDefaultImagesChanged(false);
      await fetchAndSetEvaluators();
      return toast.success("Images uploaded successfully");
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message);
      toast.error("Failed to upload images");
    }
  };
  useEffect(() => {
    console.dir(evaluators);
  }, [evaluators]);
  return (
    <Card className="w-full max-w-2xl ">
      <CardContent className="p-6 space-y-4">
        <ScrollArea className="h-64 w-full rounded-md border">
          <div className="flex flex-wrap gap-4 p-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image
                    src={image.preview}
                    width={200}
                    height={200}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 rounded-full w-6 h-6"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {images.length === 0 && (
              <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                <ImageIcon className="mr-2 h-4 w-4" />
                No images selected
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleCameraCapture} variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              Open Camera
            </Button>
            <Button onClick={handleFileUpload} variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Choose Files
            </Button>
          </div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          {isDefaultImagesChanged && (
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={images.length === 0}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </div>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className="p-0 bg-black max-w-full max-h-full h-full sm:max-w-full sm:max-h-full sm:h-full sm:rounded-none">
          <div className="relative h-screen">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
                width: { ideal: window.innerWidth },
                height: { ideal: window.innerHeight },
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between">
              <Button
                onClick={closeCamera}
                variant="outline"
                size="icon"
                className="rounded-full bg-white text-black"
                aria-label="Close camera"
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                onClick={capture}
                variant="outline"
                size="icon"
                className="rounded-full w-16 h-16 bg-white p-1"
                aria-label="Capture photo"
              >
                <div className="w-full h-full rounded-full bg-black"></div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
