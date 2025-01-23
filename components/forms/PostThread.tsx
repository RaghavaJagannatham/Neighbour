"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";

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
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { isBase64Image } from "@/lib/utils";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");
  const { organization } = useOrganization();

  const [files, setFiles] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      title: "",
      thread: "",
      accountId: userId,
      image: "",
    },
  });

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
  
    const fileReader = new FileReader();
  
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
  
      if (!file.type.includes("image")) {
        alert("Please select a valid image file.");
        return;
      }
  
      fileReader.onload = (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl); // Set base64 preview for the form
        setPreviewImage(imageDataUrl); // Set preview for UI
      };
  
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
  
    const blob = values.image;

    if (blob && files.length > 0) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].fileUrl) {
        values.image = imgRes[0].fileUrl; // Replace base64 with uploaded image URL
      }
    }

    // Check if posting for a community
    const communityId = organization ? organization.id : null; // If the organization is set, post in the community.

    await createThread({
      title: values.title,
      text: values.thread,
      author: userId,
      communityId: communityId, // Ensure community ID is passed if posting in a community
      image: values.image,
      path: pathname,
    });

    router.push("/"); // Redirect after posting
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">Title</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">Content</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">Upload Image</FormLabel>
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Image Preview"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain"
                />
              )}
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="no-focus"
                  onChange={(e) => handleImageUpload(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;



































// "use client";

// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { useOrganization } from "@clerk/nextjs";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { usePathname, useRouter } from "next/navigation";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// import { ThreadValidation } from "@/lib/validations/thread";
// import { createThread } from "@/lib/actions/thread.actions";

// interface Props {
//   userId: string;
// }

// function PostThread({ userId }: Props) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { organization } = useOrganization();

//   const form = useForm<z.infer<typeof ThreadValidation>>({
//     resolver: zodResolver(ThreadValidation),
//     defaultValues: {
//       thread: "",
//       accountId: userId,
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
//     await createThread({
//       text: values.thread,
//       author: userId,
//       communityId: organization ? organization.id : null,
//       path: pathname,
//     });

//     router.push("/");
//   };

//   return (
//     <Form {...form}>
//       <form
//         className='mt-10 flex flex-col justify-start gap-10'
//         onSubmit={form.handleSubmit(onSubmit)}
//       >
//         <FormField
//           control={form.control}
//           name='thread'
//           render={({ field }) => (
//             <FormItem className='flex w-full flex-col gap-3'>
//               <FormLabel className='text-base-semibold text-light-2'>
//                 Content
//               </FormLabel>
//               <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
//                 <Textarea rows={5} {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type='submit' className='bg-primary-500'>
//           Post Thread
//         </Button>
//       </form>
//     </Form>
//   );
// }

// export default PostThread;