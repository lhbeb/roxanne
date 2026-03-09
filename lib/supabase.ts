import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pihwxdkhsopjyedarqxd.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaHd4ZGtoc29wanllZGFycXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NDg4MDksImV4cCI6MjA4ODUyNDgwOX0.LSdErv-5vxYn5QlWd97Ct2JsQMWsERTHnXt2lYU3cLc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Track = {
    id: string
    title: string
    file_url: string
    duration: string | null
    category: string | null
    thumbnail_url: string | null
    created_at: string
}
