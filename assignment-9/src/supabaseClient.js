import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sknebtnrxbgwezvkalir.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrbmVidG5yeGJnd2V6dmthbGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNDg0ODcsImV4cCI6MTk5MzcyNDQ4N30.o0jiDDmltlc6A9qNamG-Zlci4ilikqGIFdKBXK2XwgM';

export const supabase = createClient(supabaseUrl, supabaseKey)