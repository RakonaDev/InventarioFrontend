/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaImage } from "react-icons/fa6";
const ImageUpload = ({
  maxNumber,
  title,
  setFieldValue,
  fieldName,
  classNameTitle,
  classNameImg,
}: {
  maxNumber: number;
  title: string;
  setFieldValue: any;
  fieldName: string;
  classNameTitle?: string;
  classNameImg?: string;
}) => {
  const [images, setImages] = useState<ImageListType>([]);
  const [classImages, setClassImages] = useState<string>("");

  const onChange = (imageList: ImageListType) => {
    setFieldValue(
      fieldName,
      imageList.length === 1
        ? [imageList[0].file]
        : imageList.map((img) => img.file)
    );
    setImages(imageList);
    setClassImages(
      (imageList.length === 1 ? "grid-cols-1" : "") ||
        (imageList.length === 2 ? "grid-cols-2" : "") ||
        (imageList.length === 3 ? "grid-cols-3" : "")
    );
  };

  return (
    <>
      <div>
        <p className="font-normal text-black-800 mb-1">{title}</p>
        <ImageUploading
          multiple={maxNumber > 1}
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
        >
          {({
            imageList,
            onImageUpload,
            // @ts-ignore
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div>
              {!(imageList.length > 0) && (
                <button
                  type="button"
                  onClick={onImageUpload}
                  className={`h-[200px] ${
                    classNameTitle ?? ""
                  } border flex flex-col gap-2 items-center justify-center rounded-main w-full ${
                    isDragging
                      ? "border-dashed border-primary-main text-primary-main"
                      : "border-solid text-black-900"
                  }`}
                  {...dragProps}
                >
                  <FaImage className="text-6xl" />
                  Selecciona o arrastra una imagen
                </button>
              )}
              <div className={`grid ${classImages} gap-4`}>
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className={`${
                      classNameImg || "h-[270px]"
                    } pt-12 pb-4 border relative rounded-main w-full flex items-center justify-center`}
                  >
                    <img
                      src={image.dataURL}
                      alt="uploaded"
                      className="h-full block w-[480px] object-center object-contain"
                    />
                    <div className="absolute top-4 flex gap-2 text-black-900 underline right-4 text-sm">
                      <button
                        type="button"
                        onClick={() => onImageUpdate(index)}
                        className="hover:text-green-500 transition-all duration-300 "
                      >
                        Cambiar
                      </button>
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                        className="hover:text-red-500 transition-all duration-300 "
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    </>
  );
};

export default ImageUpload;
