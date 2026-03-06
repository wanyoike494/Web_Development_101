// Base API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
  requestId?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  stack?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters?: {
    applied: Record<string, any>;
    available: Record<string, any[]>;
  };
}

// HTTP Request/Response Types
export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retries?: number;
}

export interface ResponseHeaders {
  'content-type': string;
  'cache-control'?: string;
  'x-ratelimit-limit'?: number;
  'x-ratelimit-remaining'?: number;
  'x-ratelimit-reset'?: number;
}

// Cache Types
export interface CacheConfig {
  ttl: number; // Time to live in seconds
  key: string;
  version?: string;
  tags?: string[];
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expires: number;
  version?: string;
  tags?: string[];
}

// WebSocket Types
export interface WebSocketMessage {
  type: 'data' | 'error' | 'status' | 'ping' | 'pong';
  payload?: any;
  timestamp: number;
  id?: string;
}

export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeat?: {
    interval: number;
    message: any;
  };
}

// Rate Limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
  retryAfter?: number; // Seconds to wait before retry
}

// File Upload/Download
export interface FileUploadConfig {
  url: string;
  method?: 'POST' | 'PUT';
  headers?: Record<string, string>;
  field?: string;
  file: File;
  onProgress?: (progress: number) => void;
  timeout?: number;
}

export interface FileDownloadConfig {
  url: string;
  filename?: string;
  headers?: Record<string, string>;
  onProgress?: (progress: number) => void;
  timeout?: number;
}

// Search and Filtering
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  page?: number;
  limit?: number;
}

export interface FilterOption {
  value: any;
  label: string;
  count?: number;
  description?: string;
}

// Data Validation
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: ValidationError[];
}

// Authentication
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  scope?: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      inApp: boolean;
    };
  };
  permissions: string[];
  lastLogin: string;
}

// Export Types
export interface ExportConfig {
  format: 'csv' | 'json' | 'xml' | 'xlsx' | 'pdf';
  filename?: string;
  filters?: Record<string, any>;
  fields?: string[];
  headers?: boolean;
}

// Bulk Operations
export interface BulkOperation {
  operation: 'create' | 'update' | 'delete';
  resource: string;
  items: any[];
  options?: {
    validateOnly?: boolean;
    continueOnError?: boolean;
    batchSize?: number;
  };
}

export interface BulkOperationResult {
  total: number;
  successful: number;
  failed: number;
  errors: Array<{
    item: any;
    error: string;
    index: number;
  }>;
  duration: number;
}
