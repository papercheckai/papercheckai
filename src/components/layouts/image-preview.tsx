import { XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";

type Props = {
  images: string[];
  editable?: boolean;
  onDelete?: (index: number) => void;
};

const ImagePreview = ({ images, editable = false, onDelete }: Props) => {
  return (
    <motion.div
      className="flex gap-2 flex-wrap"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <AnimatePresence>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="h-20 w-20 relative"
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image}
              width={80}
              height={80}
              alt="preview"
              className="w-full h-full object-contain rounded-md"
            />
            {editable && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  className="absolute top-0 right-0 w-fit h-fit p-0.5 rounded-full"
                  variant={"outline"}
                  onClick={() => onDelete?.(index)}
                  type="button"
                  name="delete"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImagePreview;
