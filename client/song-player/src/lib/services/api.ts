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
  endpoints: (builder) => ({
    getSongs: builder.query<
      { count: number; songs: Song[] },
      { page: number; q: string; genre: string }
    >({
      query: ({ page, q, genre }) => `songs?page=${page}&q=${q}&genre=${genre}`,
    }),
    getSong: builder.query({
      query: (id) => ({
        url: `/songs/${id}`,
      }),
    }),
    createSong: builder.mutation<Song, object>({
      query: (newSong) => ({
        url: "/songs",
        method: "POST",
        body: newSong,
      }),
    }),
    updateSong: builder.mutation({
      query: ({ id, ...updatedSong }) => ({
        url: `/songs/${id}`,
        method: "PUT",
        body: updatedSong,
      }),
    }),
    deleteSong: builder.mutation({
      query: (id) => ({
        url: `/songs/${id}`,
        method: "DELETE",
      }),
    }),
    getStatistics: builder.query({
      query: () => "/statistics",
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

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const songApi = createApi({
//   reducerPath: "songApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
//   endpoints: (builder) => ({
//     getSongs: builder.query({
//       query: () => "/songs",
//     }),
//     createSong: builder.mutation({
//       query: (newSong) => ({
//         url: "/songs",
//         method: "POST",
//         body: newSong,
//       }),
//     }),
//     updateSong: builder.mutation({
//       query: ({ id, ...updatedSong }) => ({
//         url: `/songs/${id}`,
//         method: "PUT",
//         body: updatedSong,
//       }),
//     }),
//     deleteSong: builder.mutation({
//       query: (id) => ({
//         url: `/songs/${id}`,
//         method: "DELETE",
//       }),
//     }),
//     getStatistics: builder.query({
//       query: () => "/statistics",
//     }),
//   }),
// });

// export const {
//   useGetSongsQuery,
//   useCreateSongMutation,
//   useUpdateSongMutation,
//   useDeleteSongMutation,
//   useGetStatisticsQuery,
// } = songApi;
