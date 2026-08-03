CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  requirement TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE INDEX contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);
CREATE INDEX contact_submissions_ip_created_idx ON public.contact_submissions (ip_address, created_at DESC);