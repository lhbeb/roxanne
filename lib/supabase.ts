import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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
