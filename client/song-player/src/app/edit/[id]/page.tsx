"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateSongMutation } from "@/lib/services/api";
import { useRouter } from "next/navigation";
import { genres } from "@/constants/genres";
import { useGetSongQuery } from "@/lib/services/api";
import { useParams } from "next/navigation";
import Spinner from "@/common/components/Spinner";
import toast from "react-hot-toast";
import { UploadButton } from "@uploadthing/react";

const songSchema = z.object({
  title: z.string().nonempty("Title is required"),
  artist: z.string().nonempty("Artist is required"),
  album: z.string().nonempty("Album is required"),
  genre: z.string().nonempty("Genre is required"),
  image: z.string().nonempty("Genre is required"),
});

type FormFields = z.infer<typeof songSchema>;

const EditSongs = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(songSchema),
  });

  const { data: song, error, isLoading } = useGetSongQuery(id);

  if (error) {
    toast.error("Something went wrong");
  }

  if (song) {
    setValue("title", song.title);
    setValue("artist", song.artist);
    setValue("album", song.album);
    setValue("genre", song.genre);
    setValue("image", song.image);
  }

  const [updateSong] = useUpdateSongMutation();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const res = await updateSong({ id, ...data });
    if (res) {
      toast.success("Updated Successfully");
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {song && song.length === 0 ? (
            <p>No song found</p>
          ) : (
            <>
              <div className="mb-5 ">
                <label className="block mb-2  text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  id="text"
                  placeholder="Song Title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Artist
                </label>
                <input
                  type="text"
                  id="artist"
                  placeholder="Artist Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("artist")}
                />
                {errors.artist && (
                  <p className="text-red-500">{errors.artist.message}</p>
                )}
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Album
                </label>
                <input
                  {...register("album")}
                  type="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Album Name"
                  required
                />
                {errors.album && (
                  <p className="text-red-500">{errors.album.message}</p>
                )}
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Genre
                </label>
                <select
                  {...register("genre")}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {genres.map((genre) => {
                    return (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    );
                  })}
                </select>
                {errors.genre && (
                  <p className="text-red-500">{errors.genre.message}</p>
                )}
              </div>
              <div className="mt-5">
                <input type="hidden" {...register("image")} />
                {/* // eslint-disable-next-line 
      // @ts-ignore */}
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: any) => {
                    // Do something with the response
                    setValue("image", res[0].url);
                    toast.success("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast.error("Failed to upload!")
                  }}
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="text-white disabled:cursor-not-allowed w-full mx-auto inset-0 mb-5 bg-primary hover:bg-primaryHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </>
      )}
    </form>
  );
};

export default EditSongs;
