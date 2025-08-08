import axios from 'axios';
import type { Note, NewNoteData } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  query: string = '',
  page: number = 1,
  perPage: number = 12,
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (query.trim() !== '') {
    params.search = query;
  }

  try {
    const result = await axios.get<FetchNotesResponse>('/notes', {
      params,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return result.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      (error.code === 'ENOTFOUND' || error.message === 'Network Error')
    ) {
      throw new Error('Network Error');
    }
    throw error;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await axios.get<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      (error.code === 'ENOTFOUND' || error.message === 'Network Error')
    ) {
      throw new Error('Network Error');
    }
    throw error;
  }
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  try {
    const result = await axios.post<Note>('/notes', noteData, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return result.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      (error.code === 'ENOTFOUND' || error.message === 'Network Error')
    ) {
      throw new Error('Network Error');
    }
    throw error;
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
    const result = await axios.delete<Note>(`/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return result.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      (error.code === 'ENOTFOUND' || error.message === 'Network Error')
    ) {
      throw new Error('Network Error');
    }
    throw error;
  }
};
