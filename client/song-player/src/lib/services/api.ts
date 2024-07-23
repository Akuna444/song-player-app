import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Song } from "@/common/types/songs";

// Define a base query function using fetch
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

// Define an API slice with endpoints
export const songApi = createApi({
  reducerPath: "songApi",
  baseQuery: baseQuery,
  tagTypes: ["Song", "Stats"],
  endpoints: (builder) => ({
    getSongs: builder.query<
      { count: number; songs: Song[] },
      { page: number; q: string; genre: string }
    >({
      query: ({ page, q, genre }) => `songs?page=${page}&q=${q}&genre=${genre}`,
      providesTags: ["Song"],
    }),
    getSong: builder.query({
      query: (id) => ({
        url: `/songs/${id}`,
      }),
      providesTags: ["Song"],
    }),
    createSong: builder.mutation<Song, object>({
      query: (newSong) => ({
        url: "/songs",
        method: "POST",
        body: newSong,
      }),
      invalidatesTags: ["Song", "Stats"],
    }),
    updateSong: builder.mutation({
      query: ({ id, ...updatedSong }) => ({
        url: `/songs/${id}`,
        method: "PUT",
        body: updatedSong,
      }),
      invalidatesTags: ["Song", "Stats"],
    }),
    deleteSong: builder.mutation({
      query: (id) => ({
        url: `/songs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Song", "Stats"],
    }),
    getStatistics: builder.query({
      query: () => "/statistics",
      providesTags: ["Stats"],
    }),
    // Add more endpoints as needed
  }),
});

//Export API hooks for usage in components
export const {
  useGetSongsQuery,
  useGetSongQuery,
  useUpdateSongMutation,
  useCreateSongMutation,
  useDeleteSongMutation,
  useGetStatisticsQuery,
} = songApi;
