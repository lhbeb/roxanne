import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://pihwxdkhsopjyedarqxd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaHd4ZGtoc29wanllZGFycXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NDg4MDksImV4cCI6MjA4ODUyNDgwOX0.LSdErv-5vxYn5QlWd97Ct2JsQMWsERTHnXt2lYU3cLc'
)

export type Track = {
    id: string
    title: string
    file_url: string
    duration: string | null
    category: string | null
    thumbnail_url: string | null
    created_at: string
}
