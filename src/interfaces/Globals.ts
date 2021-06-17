export interface ConfigRequests {
  baseURL: any;
  headers: Headers;
}

interface Headers {
  Authorization?: string;
  Accept: string;
  'Content-Type': string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
