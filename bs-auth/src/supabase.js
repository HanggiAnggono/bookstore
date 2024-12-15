const spb = require('@supabase/supabase-js');

const supabase = spb.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
);

module.exports = supabase;
