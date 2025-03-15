import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FeatureInput from '../feature-input'
import { toast } from "sonner";
import { Plus } from 'lucide-react'
import { useAuth } from "@/authContext";

const formSchema = z.object({
  make: z.string().min(2, { message: "Car make must be at least 2 characters." }),
  model: z.string().min(2, { message: "Car model must be at least 2 characters." }),
  year: z.string().regex(/^\d{4}$/, { message: "Year must be a 4-digit number." }),
  cc: z.coerce.number(),
  torque: z.coerce.number(),
  fuel: z.string(),
  cityMpg: z.coerce.number(),
  hwMpg: z.coerce.number(),
  seats: z.coerce.number(),
  style: z.string(),
  price: z.coerce.number(),
  dealerId: z.coerce.number(),
  features: z.array(z.string()).max(5, "You can only add 5 highlighted features maximum."),
  mainImg: z.optional(
    z.array(z.instanceof(File))
      .max(1, "You can upload up to 1 images only")),
  otherImg: z.optional(
    z.array(z.instanceof(File))
      .max(7, "You can upload up to 7 images only")),
});

type FormValues = z.infer<typeof formSchema>;

const AddCarForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [otherImgs, setotherImgs] = useState<string[]>([]);
  const mainImgInputRef = useRef<HTMLInputElement>(null);
  const otherImgInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dealerId: user ? user.id : -1,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>,
    name: 'mainImg' | 'otherImg',
    setPreviews: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const currentImages = form.getValues(name) || [];
      const newFiles = [...currentImages, ...files].slice(0, 7); // Limit to 7 files
      form.setValue(name, newFiles, { shouldValidate: true });

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prevPreviews => {
        prevPreviews.forEach(URL.revokeObjectURL);
        return newPreviews;
      });
    }
  };

  const removeImage = (
    index: number,
    name: 'mainImg' | 'otherImg',
    setPreviews: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const currentFiles: File[] = form.getValues(name) || [];
    const newFiles = currentFiles.filter((_, i: number) => i !== index);
    form.setValue(name, newFiles, { shouldValidate: true });

    let newPreviews
    if (name === 'mainImg') {
      newPreviews = images.filter((_, i) => i !== index);
      URL.revokeObjectURL(images[index]);
    }
    else {
      newPreviews = otherImgs.filter((_, i) => i !== index);
      URL.revokeObjectURL(otherImgs[index]);
    }
    setPreviews(newPreviews);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData()
      const { mainImg, otherImg, ...fields } = values
      console.log(mainImg, otherImg)

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })

      if (mainImg && mainImg.length > 0) {
        mainImg.forEach(file => {
          formData.append('mainImg', file)
        })
      }
      if (otherImg && otherImg.length > 0) {
        otherImg.forEach(file => {
          formData.append('otherImg', file)
        })
      }
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
      const response = await fetch(`${baseUrl}/car/create`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        toast.message('New Car added.', {
          description: `${data.make} ${data.model} by ${user?.userName} added to database.`
        })
        form.reset()
        setImages([])
        setotherImgs([])
        if (mainImgInputRef.current) {
          mainImgInputRef.current.value = '';
        }
        if (otherImgInputRef.current) {
          otherImgInputRef.current.value = '';
        }
      } else {
        toast('New car not added.')
      }
    } catch (error) {
      toast('Error inserting into database.')
      if (error instanceof Error) {
        console.error(`Error posting car data. ${error.message}`)
      } else {
        console.error(`Error posting car data. ${error}`)
      }
    }
  };

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Form {...form}>
          <FormField
            control={form.control}
            name="dealerId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="hidden" placeholder="e.g., Corolla" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Make</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Toyota" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Corolla" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>cc:</FormLabel>
                    <FormControl>
                      <Input placeholder="engine cc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="torque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>torque:</FormLabel>
                    <FormControl>
                      <Input placeholder="torque:" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fuel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>fuel type</FormLabel>
                    <FormControl>
                      <Input placeholder="fuel type:" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cityMpg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City Miles per Gallon</FormLabel>
                    <FormControl>
                      <Input placeholder="city MpG:" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hwMpg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highway Miles per Gallon</FormLabel>
                    <FormControl>
                      <Input placeholder="highway MpG:" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of seats</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="number of seats" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body style</FormLabel>
                    <FormControl>
                      <Input placeholder="body style (SUV, Sedan,... etc)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <Input placeholder="Price in thai baht" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <FeatureInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mainImg"
              render={() => (
                <FormItem>
                  <FormLabel>Main image</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {images.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-48 object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            onClick={() => removeImage(index, 'mainImg', setImages)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {images.length < 8 && (
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer">
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              handleFileChange(e, 'mainImg', setImages);
                            }}
                            ref={mainImgInputRef}
                            className="sr-only"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload" className="flex flex-col justify-center items-center cursor-pointer">
                            <Plus className="w-8 h-8 text-gray-400" />
                            <span className="text-gray-400">Add more pictures</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherImg"
              render={() => (
                <FormItem>
                  <FormLabel>Interior/Exterior Images</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {otherImgs.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-48 object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            onClick={() => removeImage(index, 'otherImg', setotherImgs)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {otherImgs.length < 8 && (
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer">
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              handleFileChange(e, 'otherImg', setotherImgs);
                            }}
                            ref={otherImgInputRef}
                            className="sr-only"
                            id="other-image-upload"
                          />
                          <label htmlFor="other-image-upload" className="flex flex-col justify-center items-center cursor-pointer">
                            <Plus className="w-8 h-8 text-gray-400" />
                            <span className="text-gray-400">Add more pictures</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddCarForm;
